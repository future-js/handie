/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve: resolvePath } = require('path');

const ROOT_PATH = resolvePath(__dirname, '../');
const DEMO_ROOT_DIR = 'demos';
const VUE_APP_DIR = `${DEMO_ROOT_DIR}/vue`;
const REACT_APP_DIR = `${DEMO_ROOT_DIR}/react`;
const DEPLOY_ROOT_PATH = resolvePath(__dirname, '../../.tmp/futurejs-handie');

const pkgRootPath = `${ROOT_PATH}/packages`;
const pkgSourceDirMap = {
  core: 'runtime-core',
  'shell:vue': 'handie-vue',
  'shell:react': 'handie-react',
  'widget:vue': 'bulbasaur',
  'widget:react': 'squirtle',
  'starter:antd': 'starter-antd',
  'starter:umi': 'starter-umi',
};

Object.values(pkgSourceDirMap).forEach(dirName => (pkgSourceDirMap[dirName] = dirName));

function getPkgPath(pkgName) {
  return `${pkgRootPath}/${pkgSourceDirMap[pkgName]}`;
}

module.exports = {
  ROOT_PATH,
  DEMO_ROOT_DIR,
  VUE_APP_DIR,
  REACT_APP_DIR,
  DEPLOY_ROOT_PATH,
  getPkgPath,
};
