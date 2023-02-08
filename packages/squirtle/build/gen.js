/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const tsconfig = JSON.parse(
  readFileSync(resolve(__dirname, './tsconfig-build.json'), 'utf8').toString().trim(),
);
const configFilePath = resolve(__dirname, '../tsconfig.json');

execSync(`touch ${configFilePath}`);
writeFileSync(configFilePath, JSON.stringify(tsconfig));
