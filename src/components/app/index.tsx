import * as React from "react";

const withStyles: (x: any) => Function = require("isomorphic-style-loader/lib/withStyles").default;
const styles = require("./app.scss");

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <h1 className={styles.title}>Hello World!</h1>
        <div>This component is synchronously loaded!</div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
