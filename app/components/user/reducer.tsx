import { fromJS } from "immutable";
import { IReduxAction } from "../../typings/actionType";
import { IStateManager } from "../../rootReducer";

type IUserStateKeys = "meta" | "user" | "data" | "isLoading" | "isFailedFetching" | "name" | "bio" |
  "avatar_url";

export interface IUserStateManager extends IStateManager<IUserMetaState, IUserDataState> {
  getIn(keyPath: IUserStateKeys[]): any;
  setIn(keyPath: IUserStateKeys[], value: any): IUserStateManager;
  withMutations(mutator: (mutable: IUserStateManager) => IUserStateManager): IUserStateManager;
}

interface IUserMetaState {
  get(key: "isLoading"): boolean;
  get(key: "isFailedFetching"): boolean;

  set(key: "isLoading", value: boolean): IUserMetaState;
  set(key: "isFailedFetching", value: boolean): IUserMetaState;
}

interface IUserDataState {
  get(key: "user"): any; // TODO: Change any to IUserImmutable inteface
  set(key: "user", value: any): IUserDataState; // TODO: Change any to IUserImmutable inteface
}

export const GITHUB_USER_INITIAL_STATE: IUserStateManager = fromJS({
  meta: {
    isLoading: false,
    isFailedFetching: false,
  },
  data: {
    user: {},
  },
});

export function reducer(state = GITHUB_USER_INITIAL_STATE, action: IReduxAction<any>): IUserStateManager {
  switch (action.type) {
    case "START_TO_GET_GITHUB_USER_INFORMATION": {
      return state.withMutations((currentState: IUserStateManager) => {
        return currentState
          .setIn(["meta", "isLoading"], true)
          .setIn(["meta", "isFailedFetching"], false);
      });
    }

    case "RECEIVED_GITHUB_USER_INFORMATION": {
      return state.withMutations((currentState) => {
        return currentState
          .setIn(["meta", "isLoading"], false)
          .setIn(["meta", "isFailedFetching"], false)
          .setIn(["data", "user"], action.payload.user);
      });
    }

    case "FAILED_TO_GET_GITHUB_USER_INFORMATION": {
      return state.withMutations((currentState: IUserStateManager) => {
        return currentState
          .setIn(["meta", "isLoading"], false)
          .setIn(["meta", "isFailedFetching"], true);
      });
    }

    default:
      return state;
  }
}
