import * as React from "react";
import { IndexRoute, Route } from "react-router";
// containers
import RootComponent from "./components/root";
import HomeComponent from "./components/home";
import DocumentationComponent from "./components/documentation";
import IntroDocumentationComponent from "./components/documentation/intro";
import AdvancedSettingsDocumentationComponent from "./components//documentation/advanced";
import InstallationDocumentationComponent from "./components/documentation/installation";
import BeforeStartDocumentationComponent from "./components/documentation/beforeStart";
import BasicSettingsDocumentationComponent from "./components/documentation/basicSettings";
// store
//import { store } from "./";

const createRoute = store => {
  return [
    <Route path="/" component={RootComponent}>
      <Route path="docs" component={DocumentationComponent}>
        <Route path="beforestart" component={BeforeStartDocumentationComponent} />
        <Route path="installation" component={InstallationDocumentationComponent} />
        <Route path="basicsettings" component={BasicSettingsDocumentationComponent} />
        <Route path="advancedsettings" component={AdvancedSettingsDocumentationComponent} />
        <IndexRoute component={IntroDocumentationComponent} />
      </Route>
      <IndexRoute component={HomeComponent} />
    </Route>,
  ];
};

export default createRoute;
