import * as React from "react";
import * as ReactDom from "react-dom";
import * as ReactDOMServer from "react-dom/server";

import { Hello } from "./components/hello";

if (process.env.NODE_ENV !== 'production') {
  ReactDom.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('isomorphic-lambda')
  );
} else {
  const HTML = ReactDOMServer.renderToString(
    <Hello compiler="TypeScript" framework="React" />
  );
}
