const PACKAGE_INFO = require("../../package.json");
const LIB_NAME = PACKAGE_INFO.name;
const CSS_DIST = `./dist/${LIB_NAME}/stylesheets`
const JS_DIST = `./dist/${LIB_NAME}/javascripts`;

module.exports = {
  PACKAGE_INFO,
  LIB_NAME,
  CSS_DIST,
  JS_DIST
};
