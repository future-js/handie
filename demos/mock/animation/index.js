const { resolveMatched, getPagination, getPaginated, resolveResult } = require('../helper'); // eslint-disable-line @typescript-eslint/no-var-requires
const dataSource = require('./data.json'); // eslint-disable-line @typescript-eslint/no-var-requires

const animations = Object.keys(dataSource).map(id => ({ id, ...dataSource[id] }));

module.exports = {
  'GET /api/animations': (req, res) => {
    const { title = '', description = '' } = req.query;
    const matched = resolveMatched(animations, { title, description });
    const pagination = getPagination(req.query);

    return res.json(
      resolveResult(getPaginated(matched, pagination), {
        extra: { ...pagination, total: matched.length },
      }),
    );
  },
  'GET /api/animations/:id': (req, res) => {
    const { id } = req.params;
    const data = animations.find(({ id: animeId }) => animeId === id);

    return data
      ? res.json(resolveResult({ ...data, id }))
      : res.json(
          resolveResult(undefined, {
            success: false,
            code: '404',
            message: `动画 \`${id}\` 不存在`,
          }),
        );
  },
  'DELETE /api/animations': (req, res) => {
    const ids = (req.query.ids || '').split(',');
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

    return res.json(resolveResult(deleted));
  },
  'DELETE /api/animations/:id': (req, res) => {
    const { id } = req.params;
    const index = animations.findIndex(({ id: animeId }) => animeId === id);

    return index > -1
      ? res.json(resolveResult(animations.splice(index, 1)[0]))
      : res.json(
          resolveResult(undefined, {
            success: false,
            code: '404',
            message: `动画 \`${id}\` 不存在`,
          }),
        );
  },
};
