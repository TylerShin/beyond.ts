import * as React from "react";
// import * as Router from "react-router";
import { IndexRoute, Route } from "react-router";
// containers
import RootComponent from "./components/root";
import HomeComponent from "./components/home";
// store
// import { appStore } from "./";

const routeMap = ([
  <Route path="/" component={RootComponent}>
    <IndexRoute component={HomeComponent} />
  </Route>,
]);

export default routeMap;
