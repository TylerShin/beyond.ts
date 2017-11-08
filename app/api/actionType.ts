import { Action } from "redux";

export interface IReduxAction<T> extends Action {
  payload?: T;
}
