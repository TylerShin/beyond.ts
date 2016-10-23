'use strict';

const fs = require('fs');
const ssrBuffer = fs.readFileSync('./dist/bundle.js');
const ssrString = ssrBuffer.toString();
const ssr = eval(ssrString);

module.exports.SSR = (event, context, callback) => {
  console.log('event ===================================', event);
  console.log('context ===================================', context);
  const renderingResult = ssr.serverSideRender('/users/tylorshin', 'https://scriptPath.scriptPathHere');
  renderingResult.then((result) => {
    callback(null, result);
  });
}
