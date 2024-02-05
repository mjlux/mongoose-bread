const toBreadErrorFactory = require("./toBreadErrorFactory");

function browseFactory(pluginOptions) {
  const { docs, acknowledged, readCount } = pluginOptions.customLabels;
  const toBreadResult = (result) => ({
    ...result,
    [acknowledged]: true,
    [readCount]: result[docs].length,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [readCount]: 0,
  });

  function runAtlasSearch(model, options) {
    const { query, paginateOptions } = options;
    const { limit, projection } = paginateOptions;

    const pipeline = [query, { $limit: limit }];

    if (projection) {
      pipeline.push({ $project: { ...projection } });
    }

    return model.aggregate(pipeline).then((docs) => {
      return {
        docs,
        pagination: {
          totalDocs: docs.length,
          offset: 0,
          limit: limit,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        },
      };
    });
  }

  return function browse(options) {
    options = { ...pluginOptions, ...options };

    const { query, paginateOptions, enableAtlasSearch, atlasSearchIndex } =
      options;
    const { lean, leanWithId, leanWithout_id, customLabels, customCount } =
      paginateOptions;

    if (enableAtlasSearch && atlasSearchIndex) {
      return runAtlasSearch(this, options)
        .then(remove_id)
        .then(toBreadResult)
        .catch(toBreadError);
    }

    if (
      customCount &&
      this[customCount] &&
      typeof this[customCount] === "function"
    ) {
      paginateOptions.useCustomCountFn = () => this[customCount]();
    }

    const remove_id = !(lean && leanWithId && leanWithout_id)
      ? (result) => result
      : (result) => {
          const docsKey = customLabels.docs;
          result[docsKey].forEach((doc) => {
            if (doc._id) delete doc._id;
          });
          return result;
        };

    return this.paginate(query, paginateOptions)
      .then(remove_id)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = browseFactory;
