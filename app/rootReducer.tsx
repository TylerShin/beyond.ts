import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

export interface IAppState {
  routing?: any;
}

export const initialState: IAppState = {};

export interface IStateManager<T, S> {
  get(key: "meta"): T;
  get(key: "data"): S;

  set(key: "meta", value: T): IStateManager<T, S>;
  set(key: "data", value: S): IStateManager<T, S>;
}

export const rootReducer = Redux.combineReducers({
  routing: routerReducer,
});
