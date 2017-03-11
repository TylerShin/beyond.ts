"use strict";

import * as React from "react";
// styles
import {withStyles} from "../../helpers/withStylesHelper";
const styles = require("./documentation.scss");
const content = require("./beforeStart.md");

interface IBeforeStartDocumentationComponentProps {}

@withStyles < typeof BeforeStartDocumentationComponent > (styles)
export default class BeforeStartDocumentationComponent extends React.PureComponent < IBeforeStartDocumentationComponentProps, {} > {
  public render() {
    console.log(content);
    return (
      <div>
      </div>
    );
  }
}
