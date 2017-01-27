const tsPreProcessor = require("ts-jest/preprocessor.js");


module.exports = {
  process: function(src, path, config) {
    if (path.endsWith('.scss') || path.endsWith('.css') || path.endsWith('.sass')) {
      return "module.exports = new Proxy({}, { get: function (target, name) { return name; } });";
    }

    if (path.endsWith('.svg')) {
      const pathArr = path.split('/');
      const iconFileName = pathArr[pathArr.length - 1].replace(".svg", "");
      return `module.exports = "${iconFileName}";`;
    }

    const typeParsedResult = tsPreProcessor.process(src, path, config);

    return typeParsedResult;
  }
}
