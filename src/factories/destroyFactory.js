const toBreadErrorFactory = require("./toBreadErrorFactory");

function destroyFactory(pluginOptions) {
  const { softDelete } = pluginOptions;
  const { docs, acknowledged, deletedCount } = pluginOptions.customLabels;
  const toBreadResult = ([result, _docs]) => ({
    [docs]: _docs,
    [acknowledged]: result.acknowledged ?? !!result.ok,
    [deletedCount]: result.deletedCount,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [deletedCount]: 0,
  });

  return function destroy(options) {
    const { bulk, query } = options;
    const destroyQueryMethod = bulk ? "deleteMany" : "deleteOne";
    const findQueryMethod = softDelete ? "findDeleted" : "find";
    const _query = softDelete
      ? { $and: [query, { deleted: { $eq: true } }] }
      : query;

    const mergeDestroyAndDocs = (_docs) =>
      Promise.all([
        this[destroyQueryMethod](_query).orFail(),
        Promise.resolve(_docs),
      ]);

    return this[findQueryMethod](_query, { _id: 1 })
      .then(mergeDestroyAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = destroyFactory;
