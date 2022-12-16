/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process');

const { REACT_APP_DIR } = require('../helper');

function execute(type = 'vue', ...args) {
  if (type === 'vue') {
    execSync('vue-cli-service serve', { stdio: 'inherit' });
  } else if (type === 'react') {
    execSync(`cross-env APP_ROOT=${REACT_APP_DIR} umi dev`, { stdio: 'inherit' });
  }
}

module.exports = { execute };
