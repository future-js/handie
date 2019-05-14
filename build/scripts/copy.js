#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

const bowerPath = path.resolve(__dirname, "../../bower_components");

const {
    BOWER_INCLUDED_COMPONENTS,
    BOWER_EXCLUDED_COMPONENTS,
    BOWER_DIST_PATH,
    BOWER_VENDOR_PATH,
    isBowerComponentNameValid,
    resolveBowerComponentName
  } = require("./helper");

[BOWER_VENDOR_PATH].forEach(pathname => {
  if ( !fs.existsSync(pathname) ) {
    execSync(`mkdir ${pathname}`);
  }
});

process.argv.slice(2).forEach(componentName => {
  const vendorName = resolveBowerComponentName(componentName);

  if ( isBowerComponentNameValid(componentName) && !BOWER_EXCLUDED_COMPONENTS.includes(vendorName) ) {
    const targetPath = path.resolve(BOWER_INCLUDED_COMPONENTS.includes(vendorName) ? BOWER_VENDOR_PATH : BOWER_DIST_PATH, vendorName);

    if ( fs.existsSync(targetPath) ) {
      execSync(`rm -rf ${targetPath}`);
    }

    execSync(`cp -R ${path.resolve(bowerPath, componentName)} ${targetPath}`);
  }
});
