function resolveMatched(collection, search, includeFuzzy = false) {
  let resolved = [...collection];

  Object.entries(search).forEach(([field, keyword]) => {
    if (keyword) {
      const keywords = keyword.split('');

      resolved = resolved.filter(item => {
        if (!item[field]) {
          return false;
        }

        if (item[field].includes(keyword)) {
          return true;
        }

        return includeFuzzy ? keywords.some(kw => item[field].includes(kw)) : false;
      });
    }
  });

  return resolved;
}

function getPagination(query = {}) {
  const { pageNum = 1, pageSize = 20 } = query;

  return { pageNum: +pageNum, pageSize: +pageSize };
}

function getPaginated(dataSource, { pageNum, pageSize }) {
  const startAt = (pageNum - 1) * pageSize;

  return dataSource.slice(startAt, startAt + pageSize);
}

function resolveResult(data, others = {}) {
  return { success: true, data, ...others };
}

module.exports = { resolveMatched, getPagination, getPaginated, resolveResult };
