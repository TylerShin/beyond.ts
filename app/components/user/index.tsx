import * as React from "react";
import Helmet from "react-helmet";
// redux environment
import { connect } from "react-redux";
import { Dispatch } from "redux";
// reducer
import { IAppState } from "../../rootReducer";
import { IUserStateManager } from "./reducer";
// styles
import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./user.scss");

interface IGithubUserContainerProps {
  dispatch: Dispatch<any>;
  githubUserState: IUserStateManager;
}

function mapStateToProps(state: IAppState) {
  return {
    githubUserState: state.githubUser,
  };
}

@withStyles<typeof GithubUserContainer>(styles)
class GithubUserContainer extends React.PureComponent<IGithubUserContainerProps, {}> {
  public render() {
    const { githubUserState } = this.props;

    if (githubUserState.get("meta").get("isLoading")) {
      return <h1>Loading . . .</h1>;
    }

    if (
      githubUserState
        .get("data")
        .get("user")
        .isEmpty() &&
      githubUserState.get("meta").get("isFailedFetching")
    ) {
      return <h1>Error Occured</h1>;
    }

    const username = githubUserState.getIn(["data", "user", "name"]);

    return (
      <div className={styles.container}>
        <Helmet title={`Github User - ${username}`} />
        <h1>Who made this project?</h1>
        <h2>{username}</h2>
        <img src={githubUserState.getIn(["data", "user", "avatar_url"])} />
        <div>{githubUserState.getIn(["data", "user", "bio"])}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GithubUserContainer);
