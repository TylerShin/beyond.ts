'use strict';

const fs = require('fs');
const ssrBuffer = fs.readFileSync('./dist/bundle.js');
const ssrString = ssrBuffer.toString();
const ssr = eval(ssrString);

module.exports.SSR = (event, context, callback) => {
  console.log('event ===================================', event);
  console.log('context ===================================', context);
  console.log('callback ===================================', callback);
  ssr.serverSideRender('/', 'https://scriptPath.scriptPathHere')
    .then((result) => {
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin" : "*"
        },
       body: result,
      };
      console.log(result);
      context.done(null, response);
    })
    .catch((err) => {
      console.error(err);
    });
}
