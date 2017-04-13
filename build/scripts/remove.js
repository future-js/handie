#!/usr/bin/env node

const path = require("path");
const execSync = require("child_process").execSync;

process.argv.slice(2).forEach(function( componentName ) {
  execSync(`rm -rf ${path.join(path.resolve(__dirname, "../../dist"), componentName.replace(/\-(\d+\.?)+/, ""))}`);
});
