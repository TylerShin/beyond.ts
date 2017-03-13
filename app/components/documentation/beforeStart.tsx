"use strict";

import * as React from "react";
import ContentHighComponent from "./content";
// styles
const content = require("./beforeStart.md");

interface IBeforeStartDocumentationComponentProps {}

export default class BeforeStartDocumentationComponent
  extends React.PureComponent <IBeforeStartDocumentationComponentProps, {}> {
    public render() {
      return (
        <ContentHighComponent rawHTML={content} />
      );
    }
}
