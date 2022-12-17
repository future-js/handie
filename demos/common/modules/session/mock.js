const { resolveResult } = require('../../utils/mock'); // eslint-disable-line @typescript-eslint/no-var-requires

function mockGetCurrentUser() {
  return resolveResult({
    username: 'ourai',
    nickname: '欧雷',
    permissions: {
      otaku: ['animation:read', 'animation:edit', 'comic:read', 'game:read'],
      spreadsheet: ['spreadsheet:edit'],
    },
  });
}

module.exports = { mockGetCurrentUser };
