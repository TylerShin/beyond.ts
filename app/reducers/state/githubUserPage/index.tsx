import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { IReduxAction } from "../../../api/actionType";
import { IAsyncFunctionResultState } from "../../../api/asyncFunction";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export interface IGithubUserPageState extends IAsyncFunctionResultState {}
export interface IGithubUserPageStateRecord extends TypedRecord<IGithubUserPageStateRecord>, IGithubUserPageState {}

export const defaultGitHubUserPageState: IGithubUserPageState = {
  isLoading: false,
  hasError: false,
};

export const GithubUserPageStateFactory = makeTypedFactory<IGithubUserPageState, IGithubUserPageStateRecord>(
  defaultGitHubUserPageState,
);

export const INITIAL_GITHUB_USER_PAGE_STATE_RECORD = GithubUserPageStateFactory();

export function reducer(
  state = INITIAL_GITHUB_USER_PAGE_STATE_RECORD,
  action: IReduxAction<any>,
): IGithubUserPageStateRecord {
  switch (action.type) {
    case ACTION_TYPES.GITHUB_USER_PAGE_START_TO_FETCH_USER: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", true).set("hasError", false);
      });
    }

    case ACTION_TYPES.SUCCEEDED_TO_FETCH_GITHUB_USER: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", false);
      });
    }

    case ACTION_TYPES.GITHUB_USER_PAGE_FAILED_TO_FETCH_USER: {
      return state.withMutations(currentState => {
        return currentState.set("isLoading", false).set("hasError", true);
      });
    }

    default:
      return state;
  }
}
