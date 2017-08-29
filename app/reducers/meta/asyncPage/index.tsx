import { AnyAction } from "redux";
import { ASYNC_PAGE_INITIAL_STATE, IAsyncPageRecord } from "./records";
import { ACTION_TYPES } from "../../../actions/actionList";

export function reducer(state = ASYNC_PAGE_INITIAL_STATE, action: AnyAction): IAsyncPageRecord {
  switch (action.type) {
    case ACTION_TYPES.START_TO_FETCHING_GITHUB_ACCOUNT: {
      return state.set("isLoading", true);
    }

    case ACTION_TYPES.SUCCEED_TO_FETCHING_GITHUB_ACCOUNT: {
      return state.withMutations(currentState => currentState.set("isLoading", false).set("isFailed", false));
    }

    case ACTION_TYPES.FAIL_TO_FETCHING_GITHUB_ACCOUNT: {
      return state.withMutations(currentState => currentState.set("isLoading", false).set("isFailed", true));
    }

    default:
      return state;
  }
}
