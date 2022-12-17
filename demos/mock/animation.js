const {
  mockGetList,
  mockGetOne,
  mockDeleteOne,
  mockDeleteList,
} = require('../common/modules/animation/mock'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  'GET /api/animations': (req, res) => res.json(mockGetList(req.query)),
  'GET /api/animations/:id': (req, res) => res.json(mockGetOne(req.params)),
  'DELETE /api/animations': (req, res) => res.json(mockDeleteList(req.query)),
  'DELETE /api/animations/:id': (req, res) => res.json(mockDeleteOne(req.params)),
};
