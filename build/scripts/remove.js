#!/usr/bin/env node

const path = require("path");
const execSync = require("child_process").execSync;

const {
    BOWER_INCLUDED_COMPONENTS,
    BOWER_DIST_PATH,
    BOWER_VENDOR_PATH,
    resolveBowerComponentName
  } = require("./helper");

process.argv.slice(2).forEach(componentName => {
  const vendorName = resolveBowerComponentName(componentName);

  execSync(`rm -rf ${path.join(BOWER_INCLUDED_COMPONENTS.includes(vendorName) ? BOWER_VENDOR_PATH : BOWER_DIST_PATH, vendorName)}`);
});
