import * as React from "react";
import shallowCompare = require("react-addons-shallow-compare");
import { withStyles } from "../../helpers/withStylesHelper";

const styles = require("./home.scss");

interface IHomeComponentProps {
}

@withStyles<typeof HomeComponent>(styles)
export default class HomeComponent extends React.Component<IHomeComponentProps, {}> {
  public shouldComponentUpdate(nextProps: IHomeComponentProps, nextState: null) {
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    return (
      <div className={styles.homeWrapper}>
        <h2><b>Hello</b> Universal React + Serverless!</h2>
        <div>
          You can start any universal rendering react app with serverless architecture in 5 minutes!
        </div>
      </div>
    );
  }
}
