#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const vendorPath = path.resolve(__dirname, "../../dist");
const bowerPath = path.resolve(__dirname, "../../bower_components");

if ( !fs.existsSync(vendorPath) ) {
  execSync(`mkdir ${vendorPath}`);
}

process.argv.slice(2).forEach(function( componentName ) {
  let vendorName = componentName.replace(/\-(\d+\.?)+/, "");
  let targetPath = path.resolve(vendorPath, vendorName);

  if ( fs.existsSync(targetPath) ) {
    execSync(`rm -rf ${targetPath}`);
  }

  execSync(`cp -R ${path.resolve(bowerPath, componentName)} ${targetPath}`);
});
