/// <reference path="../node_modules/@types/redux/index.d.ts"/>
/// <reference path="../node_modules/@types/react-router-redux/index.d.ts"/>

import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { RouterContext, match, Router, Route, createMemoryHistory, hashHistory } from "react-router";
import { History } from "history";
import { Provider } from "react-redux";
import * as ReactRouterRedux from 'react-router-redux';
import * as ReactDom from "react-dom";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import * as createLogger from "redux-logger";
import * as ReactDOMServer from "react-dom/server";
import routes from './routes';
import * as Immutable from 'immutable';
import { staticHTMLWrapper } from './helpers/htmlWrapper';

const IS_PROD: boolean = (process.env.NODE_ENV === "production");
const IS_STAGING: boolean = (process.env.NODE_ENV === "staging");

let history: History;
if (IS_PROD) {
  history = createMemoryHistory(); // HACK: You should get request path to sync it with redux store(maybe)
} else {
  history = hashHistory;
}

const routerMid: Redux.Middleware = ReactRouterRedux.routerMiddleware(history);

// Create store
let store: any;
if (IS_PROD) {
  store = createStore(
    rootReducer,
    // TODO: Add InitialState and Define State types to change 'any' type
    applyMiddleware(routerMid, thunkMiddleware)
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
    applyMiddleware(routerMid, thunkMiddleware, logger)
  );
}

// Create history with store
let appHistory: ReactRouterRedux.ReactRouterReduxHistory;
if (IS_PROD) {
  appHistory = ReactRouterRedux.syncHistoryWithStore(
    history,
    store
  );
} else {
  appHistory = ReactRouterRedux.syncHistoryWithStore(
    hashHistory,
    store
  );
}

export const appStore = store;

/**************************************
 * ************************************
 * ACTUAL RENDERING LOGIC
 * ************************************
 **************************************/

// This function is executed at Lambda.
export async function serverSideRender(requestUrl: string, scriptPath: string) {
  // Note that requestUrl here should be the full URL path from
  // the original request, including the query string.
  let renderedHTML: string;
  let stringifiedInitialReduxState: string;

  const htmlResult: string = await new Promise<string>((resolve, reject) => {
    match({ routes, location: requestUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
        // TODO: give 500 page
      } else if (redirectLocation) {
        resolve();
        // TODO: do redirect and give 302
      } else if (renderProps) {
        let { params } = renderProps;
        let { query } = renderProps.location;
        stringifiedInitialReduxState = JSON.stringify(store.getState());
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        renderedHTML = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        resolve(renderedHTML);
      } else {
        reject(new Error("404x"))
        // TODO: give 404 page
      }
    });
  });

  const fullHTML: string = staticHTMLWrapper(
    renderedHTML,
    scriptPath,
    stringifiedInitialReduxState
  );
  return Promise.resolve(fullHTML);
}

if (!IS_PROD) {
  ReactDom.render(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>,
    document.getElementById("isomorphic-lambda")
  );
}
