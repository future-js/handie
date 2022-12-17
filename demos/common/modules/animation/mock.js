/* eslint-disable @typescript-eslint/no-var-requires */

const { resolveMatched, getPagination, getPaginated, resolveResult } = require('../../utils/mock');
const dataSource = require('./data.json');

const animations = Object.keys(dataSource).map(id => ({ id, ...dataSource[id] }));

function mockGetList(query) {
  const { title = '', description = '' } = query;
  const matched = resolveMatched(animations, { title, description });
  const pagination = getPagination(query);

  return resolveResult(getPaginated(matched, pagination), {
    extra: { ...pagination, total: matched.length },
  });
}

function mockGetOne(params) {
  const { id } = params;
  const data = animations.find(({ id: animeId }) => animeId === id);

  return data
    ? resolveResult({ ...data, id })
    : resolveResult(undefined, {
        success: false,
        code: '404',
        message: `动画 \`${id}\` 不存在`,
      });
}

function mockDeleteOne(params) {
  const { id } = params;
  const index = animations.findIndex(({ id: animeId }) => animeId === id);

  return index > -1
    ? resolveResult(animations.splice(index, 1)[0])
    : resolveResult(undefined, {
        success: false,
        code: '404',
        message: `动画 \`${id}\` 不存在`,
      });
}

function mockDeleteList(query) {
  const ids = (query.ids || '').split(',');
  const deleted = [];
  const indexes = [];

  for (let i = 0, j = animations.length; ids.length > 0 && i < j; i++) {
    const anime = animations[i];
    const idIndex = ids.indexOf(anime.id);

    if (idIndex > -1) {
      indexes.push(i);
      deleted.push(anime);
      ids.splice(idIndex, 1);
    }
  }

  indexes.reverse().forEach(idx => animations.splice(idx, 1));

  return resolveResult(deleted);
}

module.exports = { mockGetList, mockGetOne, mockDeleteOne, mockDeleteList };
