"use strict";
function _slicedToArray(a, b) {
  return (
    _arrayWithHoles(a) ||
    _iterableToArrayLimit(a, b) ||
    _unsupportedIterableToArray(a, b) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ("string" == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      "Object" === c && a.constructor && (c = a.constructor.name),
      "Map" === c || "Set" === c
        ? Array.from(a)
        : "Arguments" === c ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit(a, b) {
  var c =
    null == a
      ? null
      : ("undefined" != typeof Symbol && a[Symbol.iterator]) || a["@@iterator"];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = !0,
      j = !1;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = !1;
      } else
        for (
          ;
          !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b);
          i = !0
        );
    } catch (a) {
      (j = !0), (e = a);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g))
          return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles(a) {
  if (Array.isArray(a)) return a;
}
var toBreadErrorFactory = require("./toBreadErrorFactory");
function softDeleteFactory(a) {
  var b = a.softDeleteOptions.deletedBy,
    c = a.customLabels,
    d = c.docs,
    e = c.acknowledged,
    f = c.modifiedCount,
    g = function (a) {
      var b,
        c,
        g = _slicedToArray(a, 2),
        h = g[0],
        i = g[1];
      return {
        [d]: i,
        [e]: null === (b = h.acknowledged) || void 0 === b || b,
        [f]: null !== (c = h.modifiedCount) && void 0 !== c ? c : h.nModified,
      };
    },
    h = toBreadErrorFactory({ [d]: [], [e]: !1, [f]: 0 });
  return function (a) {
    var c = this,
      d = a.userId,
      e = a.query;
    return this.findWithDeleted(e, { _id: 1 })
      .then(function mergeSoftDeleteAndDocs(a) {
        return Promise.all([
          b && d ? c.delete(e, d).orFail() : c.delete(e).orFail(),
          Promise.resolve(a),
        ]);
      })
      .then(g)
      .catch(h);
  };
}
module.exports = softDeleteFactory;
