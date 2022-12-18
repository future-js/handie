/* eslint-disable @typescript-eslint/no-var-requires */

const { pick } = require('@handie/runtime-core');

const { resolveResult } = require('../../utils/mock');
const { DEMO_USER } = require('./helper');

function mockGetCurrentUser() {
  return resolveResult({
    ...pick(DEMO_USER, ['username', 'nickname']),
    permissions: {
      otaku: ['animation:read', 'animation:edit', 'comic:read', 'game:read'],
      spreadsheet: ['spreadsheet:edit'],
    },
  });
}

module.exports = { mockGetCurrentUser };
