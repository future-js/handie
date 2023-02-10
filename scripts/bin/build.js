/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const { existsSync, readdirSync, statSync, readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const {
  CONFIG_ROOT_PATH,
  REACT_APP_DIR,
  getPkgPath,
  getPkgType,
  needCopySrc,
  needCopySfc,
  skipLibCheck,
} = require('../helper');

function buildApp(type) {
  if (type === 'vue') {
    execSync('vue-cli-service build', { stdio: 'inherit' });
  } else if (type === 'react') {
    execSync(`cross-env APP_ROOT=${REACT_APP_DIR} umi build`, { stdio: 'inherit' });
  }
}

function copyTsconfig(pkgDirPath, pkgType, libCheckSkipped) {
  const configFilePath = resolve(pkgDirPath, './tsconfig.json');
  const fileSuffix = ['react', 'vue'].includes(pkgType) ? '-' + pkgType : '';
  const tsconfig = JSON.parse(
    readFileSync(`${CONFIG_ROOT_PATH}/tsconfig-build${fileSuffix}.json`, 'utf8').toString().trim(),
  );

  if (libCheckSkipped) {
    tsconfig.compilerOptions.skipLibCheck = true;
  }

  execSync(`touch ${configFilePath}`, { stdio: 'inherit', cwd: pkgDirPath });
  writeFileSync(configFilePath, JSON.stringify(tsconfig));
}

function replaceSfcScriptFileType(dirPath) {
  readdirSync(dirPath).forEach(baseName => {
    const fullPath = `${dirPath}/${baseName}`;

    if (statSync(fullPath).isDirectory()) {
      replaceSfcScriptFileType(fullPath);
    } else if (fullPath.endsWith('.vue')) {
      writeFileSync(
        fullPath,
        readFileSync(fullPath).toString().replace(' lang="ts"', '').replace('.ts"', '.js"'),
      );
    }
  });
}

function buildPkg(pkgName) {
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

function execute(subCmd = 'app', ...args) {
  if (subCmd === 'app') {
    buildApp(args[0] || 'vue');
  } else if (subCmd === 'pkg') {
    buildPkg(args[0]);
  }
}

module.exports = { execute };
