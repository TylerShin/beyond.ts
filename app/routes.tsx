import * as React from "react";
import * as Router from "react-router";
import { IndexRoute, Route } from "react-router";
// containers
import RootComponent from "./components/root";
import HomeComponent from "./components/home";
import GithubUserContainer from "./components/user";
import DocumentationComponent from "./components/documentation";
import IntroDocumentationComponent from "./components/documentation/intro";
import AdvancedSettingsDocumentationComponent from "./components//documentation/advanced";
import InstallationDocumentationComponent from "./components/documentation/installation";
import BeforeStartDocumentationComponent from "./components/documentation/beforeStart";
import BasicSettingsDocumentationComponent from "./components/documentation/basicSettings";
// actions
import { getUserInfo } from "./components/user/actions";
// store
//import { store } from "./";

const createRoute = (store) => {
  return ([
    <Route path="/" component={RootComponent}>
      <Route
        path="users/:username"
        getComponent={async (nextState: Router.RouterState, callback: Function) => {
          const newUsername = nextState.params["username"];
          try {
            await store.dispatch(getUserInfo(newUsername));
            callback(null, GithubUserContainer);
          } catch (err) {
            // return callback(null, Status404);
            throw err;
          }
        }}
      />
      <Route path="docs" component={DocumentationComponent}>
        <Route path="beforestart" component={BeforeStartDocumentationComponent} />
        <Route path="installation" component={InstallationDocumentationComponent} />
        <Route path="basicsettings" component={BasicSettingsDocumentationComponent} />
        <Route path="advancedsettings" component={AdvancedSettingsDocumentationComponent} />
        <IndexRoute component={IntroDocumentationComponent} />
      </Route>
      <IndexRoute component={HomeComponent} />
    </Route>,
  ]);
}

export default createRoute;
