import * as Redux from "redux";
import * as GithubUserState from "./reducers/state/githubUserPage";
import * as GithubUserData from "./reducers/data/githubUser";
import { routerReducer } from "react-router-redux";

export interface IAppState {
  routing?: any;
  // state
  githubUserState: GithubUserState.IGithubUserPageStateRecord;
  // data
  githubUserData: GithubUserData.IGithubUserDataRecord;
}

export const initialState: IAppState = {
  githubUserState: GithubUserState.INITIAL_GITHUB_USER_PAGE_STATE_RECORD,
  githubUserData: GithubUserData.INITIAL_GITHUB_USER_DATA_RECORD,
};

export const rootReducer = Redux.combineReducers<IAppState>({
  routing: routerReducer,
  githubUserState: GithubUserState.reducer,
  githubUserData: GithubUserData.reducer,
});
