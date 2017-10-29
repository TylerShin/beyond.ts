import * as React from "react";
import { Provider } from "react-redux";
import * as ReactDOMServer from "react-dom/server";
import { createMemoryHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { StaticRouter, matchPath } from "react-router-dom";
// interfaces
import * as LambdaProxy from "./typings/lambda";
// redux middlewares
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
// helpers
import { staticHTMLWrapper } from "./helpers/htmlWrapper";
import CssInjector, { css } from "./helpers/cssInjector";
import EnvChecker from "./helpers/envChecker";
import { RootRoutes, serverRootRoutes } from "./routes";
// deploy
import * as fs from "fs";
import * as DeployConfig from "../scripts/builds/config";
import { rootReducer, initialState } from "./rootReducer";

export async function serverSideRender(requestUrl: string, scriptPath: string) {
  let stringifiedInitialReduxState: string;

  const promises: Promise<any>[] = [];
  const history = createMemoryHistory();
  const routerMid: Redux.Middleware = ReactRouterRedux.routerMiddleware(history);
  const AppInitialState = initialState;

  const store = createStore(
    rootReducer,
    AppInitialState,
    // TODO: Add InitialState and Define State types to change 'any' type
    applyMiddleware(routerMid, thunkMiddleware),
  );

  serverRootRoutes.some(route => {
    const match = matchPath(requestUrl, route);

    if (match && route.loadData) {
      promises.push(route.loadData(match));
    }
    return !!match;
  });

  await Promise.all(promises).then(data => {
    console.log(data);
  });

  const renderedHTML = ReactDOMServer.renderToString(
    <CssInjector>
      <StaticRouter location={requestUrl}>
        <Provider store={store}>{RootRoutes}</Provider>
      </StaticRouter>
    </CssInjector>,
  );

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
