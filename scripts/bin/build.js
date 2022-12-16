/* eslint-disable @typescript-eslint/no-var-requires */

const { existsSync } = require('fs');
const { execSync } = require('child_process');

const { REACT_APP_DIR, getPkgPath } = require('../helper');

function execute(subCmd = 'app', ...args) {
  if (subCmd === 'app') {
    const type = args[0] || 'vue';

    if (type === 'vue') {
      execSync('vue-cli-service build', { stdio: 'inherit' });
    } else if (type === 'react') {
      execSync(`cross-env APP_ROOT=${REACT_APP_DIR} umi build`, { stdio: 'inherit' });
    }
  } else if (subCmd === 'pkg') {
    const pkgDirPath = getPkgPath(args[0]);

    if (existsSync(pkgDirPath)) {
      execSync('npm run build', { stdio: 'inherit', cwd: pkgDirPath });
    }
  }
}

module.exports = { execute };
