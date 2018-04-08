#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const vendorPath = path.resolve(__dirname, "../../dist");
const bowerPath = path.resolve(__dirname, "../../bower_components");

const excludedComponents = [];

if ( !fs.existsSync(vendorPath) ) {
  execSync(`mkdir ${vendorPath}`);
}

process.argv.slice(2).forEach(function( componentName ) {
  let regexpCore = "\\-(\\d+\\.?)+";
  let vendorName = componentName.replace((new RegExp(regexpCore)), "");

  if ( (new RegExp(`${regexpCore}\$`)).test(componentName) && !excludedComponents.includes(vendorName) ) {
    let targetPath = path.resolve(vendorPath, vendorName);

    if ( fs.existsSync(targetPath) ) {
      execSync(`rm -rf ${targetPath}`);
    }

    execSync(`cp -R ${path.resolve(bowerPath, componentName)} ${targetPath}`);
  }
});
