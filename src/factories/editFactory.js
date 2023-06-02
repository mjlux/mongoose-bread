const parseLeanFactory = require("./parseLeanFactory");
const toBreadErrorFactory = require("./toBreadErrorFactory");

function editFactory(pluginOptions) {
  const { docs, acknowledged, modifiedCount } = pluginOptions.customLabels;
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

  return function edit(options) {
    const { query, payload, projection, populate, select, sort, lean, limit } =
      options;
    const parseLean = parseLeanFactory(options);

    const mergeUpdateAndDocs = (result) =>
      Promise.all([
        Promise.resolve(result),
        this.find(query, projection)
          .populate(populate)
          .select(select)
          .sort(sort)
          .lean(lean)
          .limit(limit)
          .orFail()
          .then(parseLean),
      ]);

    return this.updateMany(query, payload)
      .then(mergeUpdateAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = editFactory;
