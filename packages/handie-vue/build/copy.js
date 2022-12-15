/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve: resolvePath } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const pkg = JSON.parse(
  readFileSync(resolvePath(__dirname, '../package.json'), 'utf8').toString().trim(),
);

pkg.main = pkg.module = pkg.typings = 'index.ts';

delete pkg.files;
delete pkg.scripts;

const configFilePath = resolvePath(__dirname, '../dist/package.json');

execSync(`touch ${configFilePath}`);
writeFileSync(configFilePath, JSON.stringify(pkg, null, 2));
