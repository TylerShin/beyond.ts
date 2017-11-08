import * as React from "react";
import { Store } from "redux";
import { Route, Switch } from "react-router-dom";
// containers
import Root from "./components/root";
import DocumentationComponent from "./components/documentation";
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
    component: DocumentationComponent,
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
        <Route path="/docs" component={DocumentationComponent} />
        <Route path="/users/:username" component={GithubUserContainer} />
      </Switch>
    </Root>
  </div>
);
