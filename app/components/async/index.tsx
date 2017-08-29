import * as React from "react";
import Helmet from "react-helmet";
import { connect, Dispatch } from "react-redux";
import { withStyles } from "../../helpers/withStylesHelper";
import { IAppState } from "../../rootReducer";
const styles = require("./async.scss");

interface IAsyncExampleProps {
  appState: IAppState;
  dispatch: Dispatch<any>;
}

function mapStateToProps(appState: IAppState) {
  return {
    appState,
  };
}

@withStyles<typeof AsyncExample>(styles)
class AsyncExample extends React.PureComponent<IAsyncExampleProps, any> {
  public render() {
    return (
      <div className={styles.container}>
        <Helmet title={`Github User`} />
        <h1>Who made this project?</h1>
        {/* <h2>{username}</h2>
      <img src={githubUserState.getIn(["data", "user", "avatar_url"])} />
      <div>{githubUserState.getIn(["data", "user", "bio"])}</div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AsyncExample);
