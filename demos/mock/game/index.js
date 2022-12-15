const { getPagination, getPaginated, resolveResult } = require('../helper'); // eslint-disable-line @typescript-eslint/no-var-requires
const dataSource = require('./data.json'); // eslint-disable-line @typescript-eslint/no-var-requires

const games = Object.keys(dataSource).map(id => ({ id, ...dataSource[id] }));

module.exports = {
  'GET /api/games': (req, res) => {
    const { pageSize, pageNum } = getPagination(req.query);

    return res.json(
      resolveResult(getPaginated(games, { pageSize, pageNum }), {
        extra: { pageNum, pageSize, total: games.length },
      }),
    );
  },
};
