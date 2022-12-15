const { resolveResult } = require('../helper'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  'GET /api/session/user': resolveResult({
    username: 'ourai',
    nickname: '欧雷',
    permissions: {
      otaku: ['animation:read', 'animation:edit', 'comic:read', 'game:read'],
      spreadsheet: ['spreadsheet:edit'],
    },
  }),
};
