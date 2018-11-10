#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const execSync = require('child_process').execSync;

const pkg = require('../../src/jquery/package.json');

const distDir = '../handie-dist';

const rootPath = path.resolve(__dirname, '../..');
const releasePath = path.resolve(rootPath, distDir);

let changeLog = fs.readFileSync(path.join(rootPath, 'src/jquery/CHANGELOG.md'), 'utf8');
let commitMsg = changeLog.match(new RegExp(`\#\#\#\u0020${pkg.version}([^\#]+)`));

if ( commitMsg ) {
  commitMsg = `Release ${pkg.version}${commitMsg[1].trimRight()}`;
}
else {
  commitMsg = `Release on ${new Date()}`;
}

fs.readdirSync(releasePath).forEach(function( dir ) {
  let p = path.resolve(releasePath, dir);

  if ( fs.statSync(p).isDirectory() && dir.charAt(0) !== '.' ) {
    execSync(`rm -rf ${p}`);
  }
});

execSync(`cp -R dist/jquery/ ${distDir} && cp src/jquery/*.md ${distDir}`, {cwd: rootPath});
execSync(`git add . && git commit -m "${commitMsg}" && git tag -a v${pkg.version} -m "${pkg.version}" && git push --tags && git push --all`, {cwd: releasePath});
