/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve: resolvePath } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const tsconfig = JSON.parse(
  readFileSync(resolvePath(__dirname, './tsconfig-build.json'), 'utf8').toString().trim(),
);

tsconfig.compilerOptions.paths = {};
tsconfig.include = ['src'];

const configFilePath = resolvePath(__dirname, '../tsconfig.json');

execSync(`touch ${configFilePath}`);
writeFileSync(configFilePath, JSON.stringify(tsconfig));
