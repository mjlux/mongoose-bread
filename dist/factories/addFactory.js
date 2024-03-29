"use strict";
function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) ||
    _iterableToArray(a) ||
    _unsupportedIterableToArray(a) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _iterableToArray(a) {
  if (
    ("undefined" != typeof Symbol && null != a[Symbol.iterator]) ||
    null != a["@@iterator"]
  )
    return Array.from(a);
}
function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray(a);
}
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
function addFactory(a) {
  var b = a.customLabels,
    c = b.docs,
    d = b.acknowledged,
    e = b.createdCount,
    f = function (a) {
      var b = _slicedToArray(a, 2),
        f = b[0],
        g = b[1];
      return { [c]: g, [d]: f.acknowledged, [e]: f.createdCount };
    },
    g = toBreadErrorFactory({ [c]: [], [d]: !1, [e]: 0 });
  return function (a) {
    var b = this,
      c = a.bulk,
      d = a.payload,
      e = a.projection,
      h = a.populate,
      i = a.select,
      j = a.sort,
      k = a.lean,
      l = a.limit,
      m = parseLeanFactory(a);
    return this.create(d)
      .then(function mergeCreateAndCount(a) {
        var d = c
          ? {
              _id: {
                $in: _toConsumableArray(
                  a.map(function (a) {
                    return a._id;
                  })
                ),
              },
            }
          : { _id: null === a || void 0 === a ? void 0 : a._id };
        return Promise.all([
          Promise.resolve({ acknowledged: !0, createdCount: c ? a.length : 1 }),
          b
            .find(d, e)
            .populate(h)
            .select(i)
            .sort(j)
            .lean(k)
            .limit(l)
            .orFail()
            .then(m),
        ]);
      })
      .then(f)
      .catch(g);
  };
}
module.exports = addFactory;
