import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

import { Hello } from "./components/hello";

ReactDOMServer.renderToString(
  <Hello compiler="TypeScript" framework="React" />
);
