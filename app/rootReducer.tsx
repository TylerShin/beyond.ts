import * as Redux from "redux";
import * as githubUserReducer from "./components/user/reducer";
import { routerReducer } from "react-router-redux";

export interface IAppState {
  routing?: any;
  githubUser: githubUserReducer.IUserStateManager;
}

export const initialState: IAppState = {
  githubUser: githubUserReducer.GITHUB_USER_INITIAL_STATE,
};

export interface IStateManager<T, S> {
  get(key: "meta"): T;
  get(key: "data"): S;

  set(key: "meta", value: T): IStateManager<T, S>;
  set(key: "data", value: S): IStateManager<T, S>;
}

export const rootReducer = Redux.combineReducers({
  routing: routerReducer,
  githubUser: githubUserReducer.reducer,
});
