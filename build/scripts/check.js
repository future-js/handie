#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const pkg = require("../../bower.json");

const distDir = path.resolve(__dirname, "../../dist");

if ( !require("fs").existsSync(distDir) ) {
  execSync(`mkdir ${distDir}`);
}

let libs = fs.readdirSync(distDir);

if ( libs.length === 0 || libs[0] === pkg.name ) {
  execSync("npm run embed", {
    cwd: path.resolve(__dirname, "../..")
  });
}
