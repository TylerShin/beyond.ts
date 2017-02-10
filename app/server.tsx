import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { applyMiddleware, createStore } from "redux";
import { RouterContext, match, createMemoryHistory } from "react-router";
import { Provider } from "react-redux";
// interfaces
import * as LambdaProxy from "./typings/lambda";
// redux middlewares
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
// helpers
import { staticHTMLWrapper } from "./helpers/htmlWrapper";
import CssInjector, { css } from "./helpers/cssInjector";
import EnvChecker from "./helpers/envChecker";
// root reducer
import { rootReducer, initialState } from "./rootReducer";
// routes
import routes from "./routes";
// deploy
import * as fs from "fs";
import * as DeployConfig from "../scripts/builds/config";

const history = createMemoryHistory();
const routerMid: Redux.Middleware = ReactRouterRedux.routerMiddleware(history);

// Create store
const AppInitialState = initialState;

const store = createStore(
  rootReducer,
  AppInitialState,
  // TODO: Add InitialState and Define State types to change 'any' type
  applyMiddleware(routerMid, thunkMiddleware),
);

export async function serverSideRender(requestUrl: string, scriptPath: string) {
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

// Lambda Handler
export async function handler(event: LambdaProxy.Event, context: LambdaProxy.Context) {
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
