import * as React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Router, Route, hashHistory } from "react-router";
import { Provider } from "react-redux";
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import * as ReactDom from "react-dom";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import * as createLogger from "redux-logger";
import * as ReactDOMServer from "react-dom/server";
import routes from './routes';
import * as Immutable from 'immutable';

const routerMid = routerMiddleware(hashHistory);


const logger = createLogger({
  stateTransformer: (state) => {
    const newState:any = {};
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

const store = createStore(
  rootReducer,
  applyMiddleware(routerMid, thunkMiddleware, logger)
);

const appHistory = syncHistoryWithStore(
  hashHistory,
  store
);


if (process.env.NODE_ENV !== "production") {
  ReactDom.render(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>,
    document.getElementById("isomorphic-lambda")
  );
} else {
  const HTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Router history={appHistory} children={routes} />
    </Provider>,
  );
}
