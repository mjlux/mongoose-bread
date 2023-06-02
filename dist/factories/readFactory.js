"use strict";

var parseLeanFactory = require("./parseLeanFactory");
var toBreadErrorFactory = require("./toBreadErrorFactory");
function readFactory(pluginOptions) {
  var _pluginOptions$custom = pluginOptions.customLabels,
    docs = _pluginOptions$custom.docs,
    acknowledged = _pluginOptions$custom.acknowledged,
    readCount = _pluginOptions$custom.readCount;
  var toBreadResult = function toBreadResult(result) {
    return {
      [docs]: [result],
      [acknowledged]: true,
      [readCount]: 1
    };
  };
  var toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [readCount]: 0
  });
  return function read(options) {
    var customFind = options.customFind,
      query = options.query,
      projection = options.projection,
      populate = options.populate,
      select = options.select,
      sort = options.sort,
      lean = options.lean,
      limit = options.limit;
    var parseLean = parseLeanFactory(options);
    return this[customFind](query, projection).populate(populate).select(select).sort(sort).lean(lean).limit(limit).orFail().then(parseLean).then(toBreadResult).catch(toBreadError);
  };
}
module.exports = readFactory;