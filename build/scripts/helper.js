const fs = require("fs");
const path = require("path");

const BOWER_COMPONENT_NAME_SUFFIX = "\\-(\\d+\\.?)+";
const BOWER_INCLUDED_COMPONENTS = ["buds", "suitcss-sass", "tangram", "trick"];
const BOWER_EXCLUDED_COMPONENTS = ["admin-lte", "h-ui-admin", "materialize"];
const BOWER_DIST_PATH = path.resolve(__dirname, "../../dist/jquery");
const BOWER_VENDOR_PATH = path.resolve(__dirname, "../../src/core/vendors");

function isBowerComponentNameValid( componentName ) {
  return (new RegExp(`${BOWER_COMPONENT_NAME_SUFFIX}\$`)).test(componentName);
}

function resolveBowerComponentName( rawName ) {
  return rawName.replace((new RegExp(BOWER_COMPONENT_NAME_SUFFIX)), "");
}

module.exports = {
  BOWER_INCLUDED_COMPONENTS,
  BOWER_EXCLUDED_COMPONENTS,
  BOWER_DIST_PATH,
  BOWER_VENDOR_PATH,
  isBowerComponentNameValid,
  resolveBowerComponentName
};
