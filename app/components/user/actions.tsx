import { fromJS } from "immutable";
import { Dispatch } from "redux";
import GithubAPI from "../../api/github";

export function getUserInfo(username: string) {
  return async (dispatch: Dispatch<any>) => { // TODO: Change any to specific type
    dispatch({
      type: "START_TO_GET_GITHUB_USER_INFORMATION",
    });
    try {
      const result = await GithubAPI.getUserInfo(username);
      const user = fromJS(result.data);
      dispatch({
        type: "RECEIVED_GITHUB_USER_INFORMATION",
        payload: {
          user,
        },
      });
    } catch (err) {
      dispatch({
        type: "FAILED_TO_GET_GITHUB_USER_INFORMATION",
      });
    }
  };
}
