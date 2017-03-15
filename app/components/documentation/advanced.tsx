"use strict";

import * as React from "react";
import ContentHighComponent from "./content";
// styles
const content = require("./advanced.md");

export default class AdvancedSettingsDocumentationComponent
  extends React.PureComponent <{}, {}> {
    public render() {
      return (
        <ContentHighComponent rawHTML={content} />
      );
    }
}
