import * as React from 'react';
import * as Router from 'react-router';
import { Route, IndexRoute } from 'react-router';
// Import containers
import { Hello } from './components/hello';

const routeMap = (
  <Route path="/" component={Hello}>
    <IndexRoute component={Hello}/>
  </Route>
);

export default routeMap;
