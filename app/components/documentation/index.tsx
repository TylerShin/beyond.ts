import * as React from "react";
import { withRouter, Route, Switch, Link, RouteComponentProps } from "react-router-dom";
import IntroDocumentationComponent from "../../components/documentation/intro";
import AdvancedSettingsDocumentationComponent from "../../components//documentation/advanced";
import InstallationDocumentationComponent from "../../components/documentation/installation";
import BeforeStartDocumentationComponent from "../../components/documentation/beforeStart";
import BasicSettingsDocumentationComponent from "../../components/documentation/basicSettings";
// styles
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./documentation.scss");

interface IDocumentationComponentProps extends RouteComponentProps<null> {}

@withRouter
@withStyles<typeof DocumentationComponent>(styles)
export default class DocumentationComponent extends React.PureComponent<IDocumentationComponentProps, {}> {
  public render() {
    const { match } = this.props;

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
          <div className={styles.rightContainer}>
            <Switch>
              <Route exact path={match.url} component={IntroDocumentationComponent} />
              <Route exact path={`${match.url}/beforestart`} component={BeforeStartDocumentationComponent} />
              <Route exact path={`${match.url}/installation`} component={InstallationDocumentationComponent} />
              <Route exact path={`${match.url}/basicsettings`} component={BasicSettingsDocumentationComponent} />
              <Route exact path={`${match.url}/advancedsettings`} component={AdvancedSettingsDocumentationComponent} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
