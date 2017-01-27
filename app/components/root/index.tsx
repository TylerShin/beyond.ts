import * as React from "react";
import shallowCompare = require("react-addons-shallow-compare");
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./root.scss");

interface IRootComponentProps {
}

@withStyles<typeof RootComponent>(styles)
export default class RootComponent extends React.Component<IRootComponentProps, {}> {
  public shouldComponentUpdate(nextProps: IRootComponentProps, nextState: null) {
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    return (
      <div>
        {this.props.children}      
      </div>
    );
  }
}
