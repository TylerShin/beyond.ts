import * as React from "react";
import { Link } from "react-router-dom";
// styles
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./documentation.scss");

interface IDocumentationComponentProps {}

@withStyles<typeof DocumentationComponent>(styles)
export default class DocumentationComponent extends React.PureComponent<IDocumentationComponentProps, {}> {
  public render() {
    return (
      <div className={styles.documentContainerWrapper}>
        <div className={`container ${styles.contentWrapper}`}>
          <div className={styles.leftContainer}>
            <ul className={styles.navigationWrapper}>
              <li>
                <Link to="/docs">Why Serverless?</Link>
              </li>
              <li>
                <Link to="/docs/beforestart">Before Start</Link>
              </li>
              <li>
                <Link to="/docs/installation">Installation</Link>
              </li>
              <li>
                <Link to="/docs/basicsettings">Basic Settings</Link>
              </li>
              <li>
                <Link to="/docs/advancedsettings">Advanced Settings</Link>
              </li>
            </ul>
          </div>
          <div className={styles.rightContainer}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
