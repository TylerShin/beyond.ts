import * as React from "react";
// components
import NavbarComponent from "../navbar";
// styles
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./root.scss");

interface IRootComponentProps {
}

@withStyles<typeof RootComponent>(styles)
export default class RootComponent extends React.PureComponent<IRootComponentProps, {}> {
  public render() {
    return (
      <div>
        <NavbarComponent />
        {this.props.children}
      </div>
    );
  }
}
