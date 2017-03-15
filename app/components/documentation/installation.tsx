"use strict";

import * as React from "react";
import ContentHighComponent from "./content";
// styles
const content = require("./installation.md");

export default class InstallationDocumentationComponent
  extends React.PureComponent <{}, {}> {
    public render() {
      return (
        <ContentHighComponent rawHTML={content} />
      );
    }
}
