/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve: resolvePath } = require('path');

const ROOT_PATH = resolvePath(__dirname, '../');
const CONFIG_ROOT_PATH = `${ROOT_PATH}/configs`;
const DEMO_ROOT_DIR = 'demos';
const VUE_APP_DIR = `${DEMO_ROOT_DIR}/vue`;
const REACT_APP_DIR = `${DEMO_ROOT_DIR}/react`;
const DEPLOY_ROOT_PATH = resolvePath(__dirname, '../../.tmp/futurejs-handie');

const pkgRootPath = `${ROOT_PATH}/packages`;
const pkgSourceMap = require(`${CONFIG_ROOT_PATH}/npm-package.json`);

Object.values(pkgSourceMap).forEach(config => (pkgSourceMap[config.dirName] = config));

function getPkgPath(pkgName) {
  return `${pkgRootPath}/${pkgSourceMap[pkgName].dirName}`;
}

function getPkgType(pkgName) {
  return pkgSourceMap[pkgName].pkgType || 'unknown';
}

function needCopySrc(pkgName) {
  return pkgSourceMap[pkgName].copySource;
}

function needCopySfc(pkgName) {
  return ['widget:vue', 'bulbasaur'].includes(pkgName);
}

function skipLibCheck(pkgName) {
  return ['starter:umi', 'starter-umi'].includes(pkgName);
}

module.exports = {
  ROOT_PATH,
  CONFIG_ROOT_PATH,
  DEMO_ROOT_DIR,
  VUE_APP_DIR,
  REACT_APP_DIR,
  DEPLOY_ROOT_PATH,
  getPkgPath,
  getPkgType,
  needCopySrc,
  needCopySfc,
  skipLibCheck,
};
