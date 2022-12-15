/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { readdirSync, statSync, readFileSync, writeFileSync } = require('fs');

function replaceScriptFileType(dir) {
  readdirSync(resolve(__dirname, dir)).forEach(baseName => {
    const filePath = `${dir}/${baseName}`;
    const fullPath = resolve(__dirname, filePath);

    if (statSync(fullPath).isDirectory()) {
      replaceScriptFileType(filePath);
    } else if (fullPath.endsWith('.vue')) {
      writeFileSync(
        fullPath,
        readFileSync(fullPath).toString().replace(' lang="ts"', '').replace('.ts"', '.js"'),
      );
    }
  });
}

replaceScriptFileType('../dist');
