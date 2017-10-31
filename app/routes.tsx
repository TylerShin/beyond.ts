import * as React from "react";
import { Store } from "redux";
import { Route, Switch } from "react-router-dom";
// containers
import Root from "./components/root";
import DocumentationComponent from "./components/documentation";
import AdvancedSettingsDocumentationComponent from "./components//documentation/advanced";
import InstallationDocumentationComponent from "./components/documentation/installation";
import BeforeStartDocumentationComponent from "./components/documentation/beforeStart";
import BasicSettingsDocumentationComponent from "./components/documentation/basicSettings";
import HomeComponent from "./components/home";
import GithubUserContainer from "./components/user";
// import IntroDocumentationComponent from "./components/documentation/intro";
import { fetchGithubUser } from "./actions/githubUser/index";
import { IAppState } from "./rootReducer";

interface IServerRoutesMap {
  path: string;
  component: any;
  exact?: boolean;
  loadData: (store: Store<IAppState>, params: any) => Promise<any> | null;
}

export const serverRootRoutes: IServerRoutesMap[] = [
  {
    path: "/docs",
    exact: true,
    component: DocumentationComponent,
    loadData: null,
  },
  {
    path: "/beforestart",
    exact: true,
    component: BeforeStartDocumentationComponent,
    loadData: null,
  },
  {
    path: "/installation",
    exact: true,
    component: InstallationDocumentationComponent,
    loadData: null,
  },
  {
    path: "/basicsettings",
    exact: true,
    component: BasicSettingsDocumentationComponent,
    loadData: null,
  },
  {
    path: "/advancedsettings",
    exact: true,
    component: AdvancedSettingsDocumentationComponent,
    loadData: null,
  },
  {
    path: "/users/:username",
    component: GithubUserContainer,
    loadData: async (store, username: string) => {
      await store.dispatch(fetchGithubUser(username));
    },
  },
];

export const RootRoutes = () => (
  <div>
    <Root>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/docs" component={DocumentationComponent} />
        <Route exact path="/beforestart" component={BeforeStartDocumentationComponent} />
        <Route exact path="/installation" component={InstallationDocumentationComponent} />
        <Route exact path="/basicsettings" component={BasicSettingsDocumentationComponent} />
        <Route exact path="/advancedsettings" component={AdvancedSettingsDocumentationComponent} />
        <Route path="/users/:username" component={GithubUserContainer} />
      </Switch>
    </Root>
  </div>
);
