import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDom from "react-dom";
import * as ReactDOMServer from "react-dom/server";
import { applyMiddleware, createStore } from "redux";
import { RouterContext, match, Router, createMemoryHistory, browserHistory, hashHistory } from "react-router";
import { Provider } from "react-redux";
// interfaces
import * as LambdaProxy from "./typings/lambda";
// redux middlewares
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import * as createLogger from "redux-logger";
import { History } from "history";
// helpers
import { staticHTMLWrapper } from "./helpers/htmlWrapper";
import EnvChecker from "./helpers/envChecker";
import CssInjector, { css } from "./helpers/cssInjector";
// root reducer
import { rootReducer, initialState, IAppState } from "./rootReducer";
// routes
import routes from "./routes";
// deploy files
const fs = require("fs");
import * as DeployConfig from "../scripts/builds/config";

let history: History;
if (EnvChecker.isServer()) {
  history = createMemoryHistory();
} else {
  if (EnvChecker.isDev()) {
    history = hashHistory;
  } else {
    history = browserHistory;
  }
}

const routerMid: Redux.Middleware = ReactRouterRedux.routerMiddleware(history);

// Create store
let AppInitialState: IAppState;
if (!EnvChecker.isServer()) {
  try {
    const appInitialState: any = {};
    const __INITIAL_STATE__ = (window as any).__INITIAL_STATE__;

    for (let k in __INITIAL_STATE__) {
      if (__INITIAL_STATE__.hasOwnProperty(k)) {
        appInitialState[k] = Immutable.fromJS(__INITIAL_STATE__[k]);
      }
    }
    AppInitialState = appInitialState as IAppState;

  } catch (err) {
    console.error(err);
    console.warn("There is no initial state from server");
    AppInitialState = initialState;
  }
}

let store: any;
if (EnvChecker.isServer() || !EnvChecker.isDev()) {
  store = createStore(
    rootReducer,
    AppInitialState,
    // TODO: Add InitialState and Define State types to change 'any' type
    applyMiddleware(routerMid, thunkMiddleware),
  );
} else {
  // Set logger middleware to convert from ImmutableJS to plainJS
  const logger = createLogger({
    stateTransformer: (state) => {
      const newState: any = {}; // HACK: Should assign proper type later
      for (const i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }
      return newState;
    },
  });

  store = createStore(
    rootReducer,
    AppInitialState,
    applyMiddleware(routerMid, thunkMiddleware, logger),
  );
}

// Create history with store
const appHistory = ReactRouterRedux.syncHistoryWithStore(
  history,
  store,
);

export const appStore = store;

/**************************************
 * ************************************
 * ACTUAL RENDERING LOGIC
 * ************************************
 **************************************/
async function serverSideRender(requestUrl: string, scriptPath: string) {
  let renderedHTML: string;
  let stringifiedInitialReduxState: string;

  await new Promise<string>((resolve, reject) => {
    match({ routes, location: requestUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.log(error);
        reject(error);
      } else if (redirectLocation) {
        resolve();
        // TODO: do redirect and give 302
      } else if (renderProps) {
        stringifiedInitialReduxState = JSON.stringify(store.getState());

        try {
          renderedHTML = ReactDOMServer.renderToString(
            <CssInjector>
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            </CssInjector>,
          );
        } catch (e) {
          console.log(e);
          reject(e);
        }
        resolve(renderedHTML);
      } else {
        console.log("404 Error");
        reject(new Error("404x"));
      }
    });
  });
  const cssArr = Array.from(css);
  const fullHTML: string = await staticHTMLWrapper(
    renderedHTML,
    scriptPath,
    stringifiedInitialReduxState,
    cssArr.join(""),
  );
  return fullHTML;
}

if (!EnvChecker.isServer()) {
  ReactDom.render(
    <CssInjector>
      <Provider store={store}>
        <Router history={appHistory} children={routes} />
      </Provider>
    </CssInjector>,
    document.getElementById("react-app"),
  );
}

if (process.env.SSR_TEST) {
  serverSideRender("/", "mockedScriptPath")
    .then((res: any) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function handler(event: LambdaProxy.Event, context: LambdaProxy.Context): Promise<LambdaProxy.Response> {
  if (EnvChecker.isServer()) {
    const LAMBDA_SERVICE_NAME = "serverless-unviversal-app";
    const path = event.path;
    const version = fs.readFileSync("./version");

    let requestPath: string;
    if (path === `/${LAMBDA_SERVICE_NAME}`) {
      requestPath = "/";
    } else {
      requestPath = path.replace(`/${LAMBDA_SERVICE_NAME}`, "");
    }

    try {
      const bundledJsForBrowserPath
        = `https://s3.amazonaws.com/${DeployConfig.AWS_S3_BUCKET}/${DeployConfig.AWS_S3_FOLDER_PREFIX}/${version}/bundleBrowser.js`;
      const response = await serverSideRender(requestPath, bundledJsForBrowserPath); // NOTE: Should change this address

      console.log(response);
      context.succeed({
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        },
        body: response,
      });
    } catch (e) {
      console.error(e);
      console.error(e.meesage);
    }
  }
};
