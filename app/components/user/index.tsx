import * as React from "react";
import Helmet from "react-helmet";
// redux environment
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
// reducer
import { IAppState } from "../../rootReducer";
// styles
import { withStyles } from "../../helpers/withStylesHelper";
import { IGithubUserPageStateRecord } from "../../reducers/state/githubUserPage";
import { IGithubUserDataRecord } from "../../reducers/data/githubUser";
import { fetchGithubUser } from "../../actions/githubUser";
const styles = require("./user.scss");

interface IGithubUserPageParams {
  username: string;
}

interface IGithubUserContainerProps extends RouteComponentProps<IGithubUserPageParams> {
  dispatch: Dispatch<any>;
  userPageState: IGithubUserPageStateRecord;
  user: IGithubUserDataRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    userPageState: state.githubUserState,
    user: state.githubUserData,
  };
}

@withRouter
@withStyles<typeof GithubUserContainer>(styles)
class GithubUserContainer extends React.PureComponent<IGithubUserContainerProps, {}> {
  public componentDidMount() {
    const { user, dispatch, match } = this.props;
    if (user.name === "" && !!match.params.username) {
      dispatch(fetchGithubUser(match.params.username));
    }
  }

  public componentWillReceiveProps(nextProps: IGithubUserContainerProps) {
    const { dispatch } = this.props;
    if (this.props.match.params.username !== nextProps.match.params.username) {
      dispatch(fetchGithubUser(nextProps.match.params.username));
    }
  }

  public render() {
    const { user } = this.props;

    return (
      <div className={styles.container}>
        <Helmet title={`Github User - ${user.name}`} />
        <h1>Who made this project?</h1>
        <h2>{user.name}</h2>
        <img src={user.avatar_url} />
        <div>{user.location}</div>
        <div>{user.bio}</div>
        <div>{user.blog}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(GithubUserContainer);
