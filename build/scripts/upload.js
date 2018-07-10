#!/usr/bin/env node

const path = require("path");
const exec = require("child_process").exec;

const pkg = require("../../src/jquery/package.json");

const cdn = process.argv.slice(2).shift();
const cmdStr = `b3 upload --silent=false --interactive=false --remote=handie/${pkg.version} --${cdn === "wantu" ? "qiniu" : "wantu"}=false`;

const child = exec(cmdStr, {
    cwd: path.resolve(__dirname, `../../../handie-dist`),
    maxBuffer: 5 * 1024 * 1024
  }, ( err, stdout, stderr ) => {
    if ( err ) {
      console.error(`exec error: ${err}`);
      return;
    }

    if ( stderr ) {
      console.log(`stderr: ${stderr}`);
    }
  });

child.stdout.on("data", function( data ) {
  console.log(data.toString());
});
