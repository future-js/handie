const { mockGetList } = require('../common/modules/game/mock'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  'GET /api/games': (req, res) => res.json(mockGetList(req.query)),
};
