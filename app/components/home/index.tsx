import * as React from "react";
import Helmet from "react-helmet";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./home.scss");

interface IHomeComponentProps {}

@withStyles<typeof HomeComponent>(styles)
export default class HomeComponent extends React.PureComponent<IHomeComponentProps, {}> {
  public render() {
    return (
      <div className={styles.homeWrapper}>
        <Helmet title="react-universal-in-serverless" />
        <h2>
          <b>Hello</b> Universal React + Serverless!
        </h2>
        <div>You can start any universal rendering react app with serverless architecture in 5 minutes!</div>
      </div>
    );
  }
}
