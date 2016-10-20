import * as React from 'react';
import * as Router from 'react-router';
import { Route, IndexRoute } from 'react-router';
// Import containers
import Hello, { fetch } from './components/hello';


const routeMap = (
  <Route path="/">
    <Route 
      path="/users/:username"
      getComponent={(nextState: Router.RouterState, callback: Function) => {
        fetch(nextState.params["username"])
          .then(() => { callback(null, Hello); })
          .catch((e: Error) => {
            console.log(e);
            callback(null, Hello); // TODO: Should change this to 404 page.
          });
        }}
    />    
    <IndexRoute component={Hello}/>
  </Route>
);

export default routeMap;
