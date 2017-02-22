import * as React from "react";
// styles
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./documentation.scss");

interface IDocumentationComponentProps {
}

@withStyles<typeof DocumentationComponent>(styles)
export default class DocumentationComponent extends React.PureComponent<IDocumentationComponentProps, {}> {
  public render() {
    return (
      <div className={styles.documentContainerWrapper}>
        <div className={`container ${styles.contentWrapper}`}>
          <div className={styles.leftContainer}>
            <ul className={styles.navigationWrapper}>
              <li>Why Serverless?</li>
              <li>Before Start</li>
              <li>Installation</li>
              <li>Basic Settings</li>
              <li>Advanced Settings</li>
            </ul>
          </div>
          <div className={styles.rightContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
