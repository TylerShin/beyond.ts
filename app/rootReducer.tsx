import * as Redux from "redux";
import { routerReducer } from "react-router-redux";

export interface IAppState {
  routing?: any;
}

export const initialState: IAppState = {
};

export const rootReducer = Redux.combineReducers({
  routing: routerReducer,
});
