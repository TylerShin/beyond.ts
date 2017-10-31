import { Dispatch } from "redux";
import GithubAPI from "../../api/github";
import { ACTION_TYPES } from "../actionTypes";
import { GithubUserDataFactory } from "../../reducers/data/githubUser/index";

export function fetchGithubUser(username: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch({
      type: ACTION_TYPES.GITHUB_USER_PAGE_START_TO_FETCH_USER,
    });
    try {
      const result = await GithubAPI.getUserInfo(username);
      const user = GithubUserDataFactory(result.data);

      dispatch({
        type: ACTION_TYPES.SUCCEEDED_TO_FETCH_GITHUB_USER,
        payload: {
          user,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.GITHUB_USER_PAGE_FAILED_TO_FETCH_USER,
      });
    }
  };
}
