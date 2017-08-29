import axios from "axios";

export default class GithubAPI {
  public static getUserInfo(username: string) {
    return axios.get(`https://api.github.com/users/${username}`);
  }
}
