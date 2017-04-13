#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const pkg = require("../../package.json");

const rootPath = path.resolve(__dirname, "../..");
const releasePath = path.resolve(rootPath, "../handie-dist");

fs.readdirSync(releasePath).forEach(function( dir ) {
  let p = path.resolve(releasePath, dir);

  if ( fs.statSync(p).isDirectory() && dir.charAt(0) !== "." ) {
    execSync(`rm -rf ${p}`);
  }
});

execSync("cp -R dist/ ../handie-dist/", {cwd: rootPath});
execSync(`git add . && git commit -m "Built on ${new Date()}" && git tag -a v${pkg.version} && git push`, {cwd: releasePath});
