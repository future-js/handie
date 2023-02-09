/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { existsSync, readdirSync, statSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const {
  REACT_APP_DIR,
  getPkgPath,
  getPkgType,
  needCopySrc,
  needCopySfc,
  skipLibCheck,
} = require('../helper');

function copyTsconfig(pkgDirPath, pkgType, libCheckSkipped) {
  const configFilePath = resolve(pkgDirPath, './tsconfig.json');
  const tsconfig = JSON.parse(
    readFileSync(resolve(__dirname, `../../configs/tsconfig-build-${pkgType}.json`), 'utf8')
      .toString()
      .trim(),
  );

  if (libCheckSkipped) {
    tsconfig.compilerOptions.skipLibCheck = true;
  }

  execSync(`touch ${configFilePath}`, { stdio: 'inherit', cwd: pkgDirPath });
  writeFileSync(configFilePath, JSON.stringify(tsconfig));
}

function replaceSfcScriptFileType(dir) {
  readdirSync(resolve(__dirname, dir)).forEach(baseName => {
    const filePath = `${dir}/${baseName}`;
    const fullPath = resolve(__dirname, filePath);

    if (statSync(fullPath).isDirectory()) {
      replaceSfcScriptFileType(filePath);
    } else if (fullPath.endsWith('.vue')) {
      writeFileSync(
        fullPath,
        readFileSync(fullPath).toString().replace(' lang="ts"', '').replace('.ts"', '.js"'),
      );
    }
  });
}

function execute(subCmd = 'app', ...args) {
  if (subCmd === 'app') {
    const type = args[0] || 'vue';

    if (type === 'vue') {
      execSync('vue-cli-service build', { stdio: 'inherit' });
    } else if (type === 'react') {
      execSync(`cross-env APP_ROOT=${REACT_APP_DIR} umi build`, { stdio: 'inherit' });
    }
  } else if (subCmd === 'pkg') {
    const pkgName = args[0];
    const pkgDirPath = getPkgPath(pkgName);

    if (!existsSync(pkgDirPath)) {
      return;
    }

    copyTsconfig(pkgDirPath, getPkgType(pkgName), skipLibCheck(pkgName));

    const cmds = ['rimraf dist'];

    if (needCopySrc(pkgName)) {
      cmds.push('mkdir dist', 'cp -R src/* dist');
    }

    cmds.push('tsc', 'rimraf tsconfig.json');

    execSync(cmds.join(' && '), { stdio: 'inherit', cwd: pkgDirPath });

    if (needCopySfc(pkgName)) {
      replaceSfcScriptFileType(`${pkgDirPath}/dist`);
    }
  }
}

module.exports = { execute };
