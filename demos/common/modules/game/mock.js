/* eslint-disable @typescript-eslint/no-var-requires */

const { getPagination, getPaginated, resolveResult } = require('../../utils/mock');
const dataSource = require('./data.json');

const games = Object.keys(dataSource).map(id => ({ id, ...dataSource[id] }));

function mockGetList(query) {
  const { pageSize, pageNum } = getPagination(query);

  return resolveResult(getPaginated(games, { pageSize, pageNum }), {
    extra: { pageNum, pageSize, total: games.length },
  });
}

module.exports = { mockGetList };
