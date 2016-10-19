import * as React from 'react';
import * as Router from 'react-router';
import { Route, IndexRoute } from 'react-router';
// Import containers
import Hello, { fetch } from './components/hello';


const routeMap = (
  <Route path="/">
    <Route 
      path="/posts/:postId"
      getComponent={(nextState: Router.RouterState, callback: Function) => {
        fetch(nextState.params["postId"])
          .then(() => { callback(null, Hello); })
          .catch((e: Error) => {
            callback(null, Hello); // TODO: Should change this to 404 page.
          });
        }}
    />    
    <IndexRoute component={Hello}/>
  </Route>
);

export default routeMap;
