const toBreadErrorFactory = require("./toBreadErrorFactory");

function softDeleteFactory(pluginOptions) {
  const { deletedBy } = pluginOptions.softDeleteOptions;
  const { docs, acknowledged, modifiedCount } = pluginOptions.customLabels;
  const toBreadResult = ([result, _docs]) => ({
    [docs]: _docs,
    [acknowledged]: result.acknowledged ?? true,
    [modifiedCount]: result.modifiedCount ?? result.nModified,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [modifiedCount]: 0,
  });

  return function softDelete(options) {
    const { userId, query } = options;

    const mergeSoftDeleteAndDocs = (_docs) =>
      Promise.all([
        deletedBy && userId
          ? this.delete(query, userId).orFail()
          : this.delete(query).orFail(),
        Promise.resolve(_docs),
      ]);

    return this.findWithDeleted(query, { _id: 1 })
      .then(mergeSoftDeleteAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = softDeleteFactory;
