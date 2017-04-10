#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const pkg = require("../../bower.json");

fs.readdirSync("../../dist").forEach(function( d ) {
  if ( d !== pkg.name ) {
    execSync(`rm -rf ${d}`);
  }
});
