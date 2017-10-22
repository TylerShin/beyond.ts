import * as React from "react";
import { Route, Switch } from "react-router-dom";
// containers
import Root from "./components/root";
import DocumentationComponent from "./components/documentation";
import AdvancedSettingsDocumentationComponent from "./components//documentation/advanced";
import InstallationDocumentationComponent from "./components/documentation/installation";
import BeforeStartDocumentationComponent from "./components/documentation/beforeStart";
import BasicSettingsDocumentationComponent from "./components/documentation/basicSettings";
// import HomeComponent from "./components/home";
import GithubUserContainer from "./components/user";
// import IntroDocumentationComponent from "./components/documentation/intro";

const rootRoutes = (
  <div>
    <Root>
      <Switch>
        <Route exact path="docs" component={DocumentationComponent} />
        <Route exact path="beforestart" component={BeforeStartDocumentationComponent} />
        <Route exact path="installation" component={InstallationDocumentationComponent} />
        <Route exact path="basicsettings" component={BasicSettingsDocumentationComponent} />
        <Route exact path="advancedsettings" component={AdvancedSettingsDocumentationComponent} />
        <Route path="users/:username" component={GithubUserContainer} />
      </Switch>
    </Root>
  </div>
);

export default rootRoutes;
