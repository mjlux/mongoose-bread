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
var parseLeanFactory = require("./parseLeanFactory"),
  toBreadErrorFactory = require("./toBreadErrorFactory");
function editFactory(a) {
  function b(a, b) {
    var c = b.query,
      d = b.payload,
      e = b.projection,
      f = b.populate,
      g = b.select,
      h = b.sort,
      k = b.lean,
      l = b.limit,
      m = parseLeanFactory(b);
    return a
      .startSession()
      .then(function updateWithSession(b) {
        return (
          b.startTransaction(),
          Promise.all([Promise.resolve(b), a.updateMany(c, d, { session: b })])
        );
      })
      .then(function fetchDocs(b) {
        var d = _slicedToArray(b, 2),
          i = d[0],
          j = d[1];
        return Promise.all([
          Promise.resolve(i),
          Promise.resolve(j),
          a
            .find(c, e)
            .session(i)
            .populate(f)
            .select(g)
            .sort(h)
            .lean(k)
            .limit(l)
            .orFail()
            .then(m),
        ]);
      })
      .then(function commitTransaction(a) {
        var b = _slicedToArray(a, 3),
          c = b[0],
          d = b[1],
          e = b[2];
        return Promise.all([
          Promise.resolve(c),
          Promise.resolve(d),
          Promise.resolve(e),
          c.commitTransaction(),
        ]);
      })
      .then(function endSession(a) {
        var b = _slicedToArray(a, 3),
          c = b[0],
          d = b[1],
          e = b[2];
        return c.endSession(), [d, e];
      })
      .then(i)
      .catch(j);
  }
  function c(a, b) {
    var c = b.query,
      d = b.payload,
      e = b.projection,
      f = b.populate,
      g = b.select,
      h = b.sort,
      k = b.lean,
      l = b.limit,
      m = parseLeanFactory(b);
    return a
      .updateMany(c, d)
      .then(function mergeUpdateAndDocs(b) {
        return Promise.all([
          Promise.resolve(b),
          a
            .find(c, e)
            .populate(f)
            .select(g)
            .sort(h)
            .lean(k)
            .limit(l)
            .orFail()
            .then(m),
        ]);
      })
      .then(i)
      .catch(j);
  }
  var d = a.runUpdateTransaction,
    e = a.customLabels,
    f = e.docs,
    g = e.acknowledged,
    h = e.modifiedCount,
    i = function (a) {
      var b,
        c,
        d = _slicedToArray(a, 2),
        e = d[0],
        i = d[1];
      return {
        [f]: i,
        [g]: null === (b = e.acknowledged) || void 0 === b || b,
        [h]: null !== (c = e.modifiedCount) && void 0 !== c ? c : e.nModified,
      };
    },
    j = toBreadErrorFactory({ [f]: [], [g]: !1, [h]: 0 });
  return function (a) {
    return d ? b(this, a) : c(this, a);
  };
}
module.exports = editFactory;
