import { TypedRecord, makeTypedFactory } from "typed-immutable-record";
import { IReduxAction } from "../../../api/actionType";
import { ACTION_TYPES } from "../../../actions/actionTypes";

export interface IGithubUserData {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
export interface IGithubUserDataRecord extends TypedRecord<IGithubUserDataRecord>, IGithubUserData {}

export const defaultGitHubUser: IGithubUserData = {
  login: "",
  id: 0,
  avatar_url: "",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "",
  site_admin: false,
  name: "",
  company: "",
  blog: "",
  location: "",
  email: null,
  hireable: false,
  bio: "",
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: "",
};

export const GithubUserDataFactory = makeTypedFactory<IGithubUserData, IGithubUserDataRecord>(defaultGitHubUser);

export const INITIAL_GITHUB_USER_DATA_RECORD = GithubUserDataFactory();

export function reducer(state = INITIAL_GITHUB_USER_DATA_RECORD, action: IReduxAction<any>): IGithubUserDataRecord {
  switch (action.type) {
    case ACTION_TYPES.SUCCEEDED_TO_FETCH_GITHUB_USER: {
      return action.payload.user;
    }

    case ACTION_TYPES.GLOBAL_LOCATION_CHANGE: {
      return INITIAL_GITHUB_USER_DATA_RECORD;
    }

    default:
      return state;
  }
}
