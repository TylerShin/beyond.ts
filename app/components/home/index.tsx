import * as React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./home.scss");

interface IHomeComponentProps {}

@withStyles<typeof HomeComponent>(styles)
export default class HomeComponent extends React.PureComponent<IHomeComponentProps, {}> {
  public render() {
    return (
      <div className={styles.homeWrapper}>
        <Helmet title="react-universal-in-serverless" />
        <div className={styles.homeWrapperBackground} />
        <div className={styles.homeContent}>
          <h2 className={styles.headline}>Hello Universal React + Serverless!</h2>
          <div className={styles.subHeadline}>
            You can start universal rendering React web app with Serverless Framework!
          </div>
          <Link to="/docs" className={styles.linkButton}>
            Go To Docs
          </Link>
        </div>
      </div>
    );
  }
}
