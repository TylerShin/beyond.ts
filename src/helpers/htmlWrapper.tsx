export function staticHTMLWrapper(
  reactDom: string,
  scriptPath: string,
  initialState: string, // JSON stringified string
  css: string
): string {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Vingle Desktop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
      </head>
      <body>
        <script>window.__INITIAL_STATE__=${initialState}</script>
        <div id="vingle-web">
          ${reactDom}
        </div>
        <script src="${scriptPath}"></script>
      </body>
    </html>
  `;
};
