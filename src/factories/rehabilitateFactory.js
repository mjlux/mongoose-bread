const toBreadErrorFactory = require("./toBreadErrorFactory");

function rehabilitateFactory(pluginOptions) {
  const { docs, modifiedCount, acknowledged } = pluginOptions.customLabels;
  const toBreadResult = ([result, _docs]) => ({
    [docs]: _docs,
    [acknowledged]: result.acknowledged,
    [modifiedCount]: result.modifiedCount,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [modifiedCount]: 0,
  });

  return function rehabilitate(options) {
    const { query } = options;

    const mergeRestoreAndDocs = (_docs) =>
      Promise.all([this.restore(query), Promise.resolve(_docs)]);

    return this.findWithDeleted(query, { _id: 1 })
      .then(mergeRestoreAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = rehabilitateFactory;
