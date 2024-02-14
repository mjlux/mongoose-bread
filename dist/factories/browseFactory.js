"use strict";
function ownKeys(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b &&
      (d = d.filter(function (b) {
        return Object.getOwnPropertyDescriptor(a, b).enumerable;
      })),
      c.push.apply(c, d);
  }
  return c;
}
function _objectSpread(a) {
  for (var b, c = 1; c < arguments.length; c++)
    (b = null == arguments[c] ? {} : arguments[c]),
      c % 2
        ? ownKeys(Object(b), !0).forEach(function (c) {
            _defineProperty(a, c, b[c]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
        : ownKeys(Object(b)).forEach(function (c) {
            Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c));
          });
  return a;
}
function _defineProperty(a, b, c) {
  return (
    (b = _toPropertyKey(b)),
    b in a
      ? Object.defineProperty(a, b, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[b] = c),
    a
  );
}
function _toPropertyKey(a) {
  var b = _toPrimitive(a, "string");
  return "symbol" == typeof b ? b : b + "";
}
function _toPrimitive(a, b) {
  if ("object" != typeof a || null === a) return a;
  var c = a[Symbol.toPrimitive];
  if (c !== void 0) {
    var d = c.call(a, b || "default");
    if ("object" != typeof d) return d;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === b ? String : Number)(a);
}
var toBreadErrorFactory = require("./toBreadErrorFactory");
function browseFactory(a) {
  function b(a, b) {
    var c = b.query,
      d = b.paginateOptions,
      e = d.limit,
      f = d.projection,
      g = [c, { $limit: e }];
    return (
      f && g.push({ $project: _objectSpread({}, f) }),
      a.aggregate(g).then(function (a) {
        return {
          docs: a,
          pagination: {
            totalDocs: a.length,
            offset: 0,
            limit: e,
            totalPages: 1,
            page: 1,
            pagingCounter: 1,
            hasPrevPage: !1,
            hasNextPage: !1,
            prevPage: null,
            nextPage: null,
          },
        };
      })
    );
  }
  var c = a.customLabels,
    d = c.docs,
    e = c.acknowledged,
    f = c.readCount,
    g = function (a) {
      return _objectSpread(
        _objectSpread({}, a),
        {},
        { [e]: !0, [f]: a[d].length }
      );
    },
    h = toBreadErrorFactory({ [d]: [], [e]: !1, [f]: 0 });
  return function (c) {
    var d = this;
    c = _objectSpread(_objectSpread({}, a), c);
    var e = c,
      f = e.query,
      i = e.paginateOptions,
      j = e.enableAtlasSearch,
      k = e.atlasSearchIndex,
      l = i.lean,
      m = i.leanWithId,
      n = i.leanWithout_id,
      o = i.customLabels,
      p = i.customCount;
    if (j && k)
      return b(this, c)
        .then(void 0)
        .then(g)
        .catch(h);
    p &&
      this[p] &&
      "function" == typeof this[p] &&
      (i.useCustomCountFn = function () {
        return d[p]();
      });
    var q =
      l && m && n
        ? function (a) {
            var b = o.docs;
            return (
              a[b].forEach(function (a) {
                a._id && delete a._id;
              }),
              a
            );
          }
        : function (a) {
            return a;
          };
    return this.paginate(f, i).then(q).then(g).catch(h);
  };
}
module.exports = browseFactory;
