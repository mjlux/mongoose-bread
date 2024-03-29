"use strict";
var parseLeanFactory = require("./parseLeanFactory"),
  toBreadErrorFactory = require("./toBreadErrorFactory");
function readFactory(a) {
  var b = a.customLabels,
    c = b.docs,
    d = b.acknowledged,
    e = b.readCount,
    f = function (a) {
      return { [c]: [a], [d]: !0, [e]: 1 };
    },
    g = toBreadErrorFactory({ [c]: [], [d]: !1, [e]: 0 });
  return function (a) {
    var b = a.customFind,
      c = a.query,
      d = a.projection,
      e = a.populate,
      h = a.select,
      i = a.sort,
      j = a.lean,
      k = a.limit,
      l = parseLeanFactory(a);
    return this[b](c, d)
      .populate(e)
      .select(h)
      .sort(i)
      .lean(j)
      .limit(k)
      .orFail()
      .then(l)
      .then(f)
      .catch(g);
  };
}
module.exports = readFactory;
