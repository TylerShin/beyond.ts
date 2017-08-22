import * as Helmet from "react-helmet";

export function staticHTMLWrapper(
  reactDom: string,
  scriptPath: string,
  initialState: string,
  css: string,
  helmetData?: Helmet.HelmetData,
) {
  return `
    <!doctype html>
    <html ${helmetData ? helmetData.htmlAttributes.toString() : ""}>
    <head>
        <meta charset="utf-8">
        ${helmetData ? helmetData.title.toString() : ""}
        ${helmetData ? helmetData.meta.toString() : ""}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        ${helmetData ? helmetData.link.toString() : ""}

        <style type="text/css">${css}</style>
      </head>
      <body>
        <script>window.__INITIAL_STATE__=${initialState}</script>
        <div id="react-app">
          ${reactDom}
        </div>
        <script src="${scriptPath}"></script>
      </body>
    </html>
  `;
}
