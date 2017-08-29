import { TypedRecord, makeTypedFactory } from "typed-immutable-record";

interface IAsyncPage {
  isLoading: boolean;
  isFailed: boolean;
}

interface IAsyncPageRecord extends TypedRecord<IAsyncPageRecord>, IAsyncPage {}

const defaultAsyncPageState = {
  isLoading: false,
  isFailed: false,
};

export const AsyncPageFactory = makeTypedFactory<IAsyncPage, IAsyncPageRecord>(defaultAsyncPageState);

export const ASYNC_PAGE_INITIAL_STATE = AsyncPageFactory();

// export function reducer(state = ASYNC_PAGE_INITIAL_STATE, action: IReduxAction<any>): IUserStateManager {
//   switch (action.type) {
//     case "START_TO_GET_GITHUB_USER_INFORMATION": {
//       return state.withMutations((currentState: IUserStateManager) => {
//         return currentState
//           .setIn(["meta", "isLoading"], true)
//           .setIn(["meta", "isFailedFetching"], false);
//       });
//     }

//     case "RECEIVED_GITHUB_USER_INFORMATION": {
//       return state.withMutations((currentState) => {
//         return currentState
//           .setIn(["meta", "isLoading"], false)
//           .setIn(["meta", "isFailedFetching"], false)
//           .setIn(["data", "user"], action.payload.user);
//       });
//     }

//     case "FAILED_TO_GET_GITHUB_USER_INFORMATION": {
//       return state.withMutations((currentState: IUserStateManager) => {
//         return currentState
//           .setIn(["meta", "isLoading"], false)
//           .setIn(["meta", "isFailedFetching"], true);
//       });
//     }

//     default:
//       return state;
//   }
// }
