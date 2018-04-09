#!/usr/bin/env node

const path = require("path");
const execSync = require("child_process").execSync;
const pkg = require("../../bower.json");

execSync(`bower uninstall ${Object.keys(pkg.devDependencies).join(" ")}`, {
  cwd: path.resolve(__dirname, "../..")
});
