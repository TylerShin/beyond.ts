/// <reference path="../node_modules/@types/redux/index.d.ts"/>
/// <reference path="../node_modules/@types/react-router-redux/index.d.ts"/>

import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Router, Route, createMemoryHistory, hashHistory } from "react-router";
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

if (!IS_PROD) {
  ReactDom.render(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>,
    document.getElementById("isomorphic-lambda")
  );
} else {
  const renderedHTML: string = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>
  );
  const fullHTML: string = staticHTMLWrapper(
    renderedHTML,
    'http://s3.aaaa.bbb.com/bundle.js',
    'initialState'
  );
  console.log(fullHTML); // Just make function and return this value to Lambda callback
}
