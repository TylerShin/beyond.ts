"use strict";

import * as React from "react";
// styles
import { withStyles } from "../../helpers/withStylesHelper";
const styles = require("./documentation.scss");

interface IContentHighComponentProps {
  rawHTML: string;
}

@withStyles <typeof ContentHighComponent>(styles)
export default class ContentHighComponent extends React.PureComponent <IContentHighComponentProps, {}> {
  public render() {
    return (
      <div dangerouslySetInnerHTML={this.createMarkup()} />
    );
  }

  private createMarkup() {
    return { __html: this.props.rawHTML };
  }
}
