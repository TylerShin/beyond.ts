import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { applyMiddleware, createStore } from "redux";
import { createMemoryHistory } from "history";
import { StaticRouter, matchPath } from "react-router-dom";
import Helmet from "react-helmet";
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
import routes, { routesMapServer } from "./routes";
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
  let stringifiedInitialReduxState: string;

  await Promise.all(
    routesMapServer
      .filter(route => {
        const match = matchPath<any>(requestUrl, route);
        return !!match;
      })
      .slice(0, 1)
      .map(route => {
        const match = matchPath<any>(requestUrl, route);
        if (match && route.loadData) {
          return route.loadData();
        }
      }),
  );

  const renderedHTML = ReactDOMServer.renderToString(
    <CssInjector>
      <Provider store={store}>
        <StaticRouter location={requestUrl}>
          {routes}
        </StaticRouter>
      </Provider>
    </CssInjector>,
  );

  const head = Helmet.rewind();
  const cssArr = Array.from(css);
  const fullHTML: string = await staticHTMLWrapper(
    renderedHTML,
    scriptPath,
    stringifiedInitialReduxState,
    cssArr.join(""),
    head,
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
      const bundledJsForBrowserPath = `https://s3.amazonaws.com/${DeployConfig.AWS_S3_BUCKET}/${DeployConfig.AWS_S3_FOLDER_PREFIX}/${version}/bundleBrowser.js`;
      const response = await serverSideRender(requestPath, bundledJsForBrowserPath);
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
      context.succeed({
        statusCode: 500,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(e.meesage),
      });
    }
  }
}
