"use strict";

import * as React from "react";
import ContentHighComponent from "./content";
// styles
const content = require("./basicSettings.md");

interface IBasicSettingsDocumentationComponentProps {}

export default class BasicSettingsDocumentationComponent
  extends React.PureComponent <IBasicSettingsDocumentationComponentProps, {}> {
    public render() {
      return (
        <ContentHighComponent rawHTML={content} />
      );
    }
}
