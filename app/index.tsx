import * as Immutable from "immutable";
import * as React from "react";
import * as ReactDom from "react-dom";
import { History, createBrowserHistory, createHashHistory, createMemoryHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
// server
import { serverSideRender, handler as lambdaHandler } from "./server";
// redux middlewares
import * as ReactRouterRedux from "react-router-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
// helpers
import EnvChecker from "./helpers/envChecker";
import CssInjector from "./helpers/cssInjector";
// root reducer
import { rootReducer, initialState, IAppState } from "./rootReducer";
// routes
import routes from "./routes";

// Load bootstrap
// If you don't want to use Bootstrap delete below lines and relevant packages
if (!EnvChecker.isServer()) {
  (window as any).jQuery = (window as any).$ = require("jquery");
  (window as any).Tether = require("tether");
  require("bootstrap");
}

let history: History;
if (EnvChecker.isServer()) {
  history = createMemoryHistory();
} else {
  if (EnvChecker.isDev()) {
    history = createHashHistory();
  } else {
    history = createBrowserHistory();
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
  store = createStore(rootReducer, AppInitialState, applyMiddleware(routerMid, thunkMiddleware));
} else {
  const logger = createLogger({
    stateTransformer: state => {
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

  store = createStore(rootReducer, AppInitialState, applyMiddleware(routerMid, thunkMiddleware, logger));
}

export const appStore = store;

// Browser Side Rendering to develop React Web-app
if (!EnvChecker.isServer()) {
  ReactDom.render(
    <CssInjector>
      <Provider store={store}>
        <Router history={history} children={routes} />
      </Provider>
    </CssInjector>,
    document.getElementById("react-app"),
  );
}

// Server Side Rendering to test Server Side Rendering
if (EnvChecker.isServer() && process.env.SSR_TEST) {
  serverSideRender("/users/tylorshin", "mockedScriptPath")
    .then((res: any) => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

// Lambda handler
export const handler = lambdaHandler;
