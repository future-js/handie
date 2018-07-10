const PACKAGE_INFO = require("../../src/jquery/package.json");
const LIB_NAME = "handie";
const CSS_DIST = `./dist/jquery/${LIB_NAME}/stylesheets`
const JS_DIST = `./dist/jquery/${LIB_NAME}/javascripts`;
const TMP_DIR = `./.${LIB_NAME}-tmp`;

module.exports = {
  PACKAGE_INFO,
  LIB_NAME,
  CSS_DIST,
  JS_DIST,
  TMP_DIR
};
