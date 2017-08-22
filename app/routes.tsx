import * as React from "react";
import { Route, RouteProps } from "react-router-dom";
// containers
import RootComponent from "./components/root";
import HomeComponent from "./components/home";
import DocumentationComponent from "./components/documentation";

// store
//import { store } from "./";

interface ILazyRouteProps extends RouteProps {
  loadData?: Function;
}

export const routesMapServer: ILazyRouteProps[] = [
  {
    path: "/docs",
    component: DocumentationComponent,
  },
  {
    path: "/",
    component: HomeComponent,
  },
];

const routesMap = (
  <RootComponent>
    <Route path="/" component={HomeComponent} exact />
    <Route path="/docs" component={DocumentationComponent} exact />
  </RootComponent>
);

export default routesMap;
