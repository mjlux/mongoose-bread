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

  return function browse(options) {
    options = { ...pluginOptions, ...options };

    const { query, paginateOptions } = options;
    const { lean, leanWithId, leanWithout_id, customLabels, customCount } =
      paginateOptions;

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
