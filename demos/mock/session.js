const { mockGetCurrentUser } = require('../common/modules/session/mock'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  'GET /api/session/user': mockGetCurrentUser(),
};
