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
function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
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
var _require = require("mongoose-paginate-v2"),
  PaginationParameters = _require.PaginationParameters,
  _require2 = require("../Parser"),
  parseSelect = _require2.parseSelect,
  parseQuery = _require2.parseQuery,
  parseProjection = _require2.parseProjection,
  parseLimit = _require2.parseLimit,
  parseRequestParamsId = _require2.parseRequestParamsId,
  parseEditRequestBody = _require2.parseEditRequestBody,
  parseAddRequestBody = _require2.parseAddRequestBody,
  parseRequestBodyIds = _require2.parseRequestBodyIds,
  parseRequestUserIdPath = _require2.parseRequestUserIdPath;
function convertStringToBoolean(a) {
  return !("string" != typeof a) && ("true" === a || "1" === a);
}
function Factory(a) {
  function b(a) {
    var b,
      c,
      d =
        (null === (b = a.__breadSoftDeleteHelperOptions) || void 0 === b
          ? void 0
          : b.issuer) || "createReadOptions",
      e =
        (null === (c = a.__breadSoftDeleteHelperOptions) || void 0 === c
          ? void 0
          : c.customFind) || "findOne",
      f = parseRequestParamsId(a, l, { issuer: d }),
      g = parseSelect(a.query || {});
    return { query: { _id: f }, select: g, customFind: e };
  }
  function c(b) {
    var c = Object.assign({}, l, b.__breadSoftDeleteHelperOptions),
      d = b.query ? _objectSpread({}, b.query) : {},
      e = {
        query: _objectSpread(
          _objectSpread(_objectSpread({}, c), d),
          {},
          {
            limit: parseLimit(d, c),
            query: parseQuery(d, c, a),
            projection: parseProjection(d, c),
          }
        ),
      };
    delete e.query.options;
    var f = new PaginationParameters(e),
      g = f.getQuery(),
      h = f.getOptions();
    return (
      (h.customFind = c.customFind || "find"),
      (h.customCount = c.customCount || !1),
      (h.leanWithout_id = d.leanWithout_id
        ? convertStringToBoolean(d.leanWithout_id)
        : c.leanWithout_id),
      { query: g, paginateOptions: h }
    );
  }
  function d(a) {
    var b = parseRequestParamsId(a, l, { issuer: "createEditOptions" });
    return { payload: a.body, query: { _id: b } };
  }
  function e(a) {
    var b = parseRequestBodyIds(a, l, { issuer: "createEditOptions" }),
      c = parseEditRequestBody(a, l, { issuer: "createEditOptions" });
    return {
      bulk: !0,
      payload: c,
      query: { _id: { $in: _toConsumableArray(b) } },
    };
  }
  function f(a) {
    var b = a.body;
    return { payload: b };
  }
  function g(a) {
    var b = parseAddRequestBody(a, l, { issuer: "createAddOptions" });
    return { bulk: !0, payload: b };
  }
  function h(a) {
    var b = parseRequestParamsId(a, l, { issuer: "createDeleteOptions" }),
      c = l.softDelete,
      d = l.softDeleteOptions,
      e = d.deletedBy,
      f = d.requestUserIdPath,
      g =
        c && e && f
          ? parseRequestUserIdPath(a, { requestUserIdPath: f })
          : null;
    return { query: { _id: b }, userId: g };
  }
  function i(a) {
    var b = l.softDelete,
      c = l.softDeleteOptions,
      d = c.deletedBy,
      e = c.requestUserIdPath,
      f = parseRequestBodyIds(a, l, { issuer: "createDeleteOptions" }),
      g =
        b && d && e
          ? parseRequestUserIdPath(a, { requestUserIdPath: e })
          : null;
    return {
      bulk: !0,
      userId: g,
      query: { _id: { $in: _toConsumableArray(f) } },
    };
  }
  function j(a) {
    var b = parseRequestParamsId(a, l, { issuer: "createRehabilitateOptions" });
    return { query: { _id: b, deleted: !0 } };
  }
  function k(a) {
    var b = parseRequestBodyIds(a, l, { issuer: "createRehabilitateOptions" });
    return {
      bulk: !0,
      query: { _id: { $in: _toConsumableArray(b) }, deleted: !0 },
    };
  }
  var l = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {},
    m = {
      createBrowseOptions(a) {
        var b = c(a);
        return b;
      },
      createReadOptions(a) {
        var c = this.createBrowseOptions(a),
          d = c.paginateOptions,
          e = b(a);
        return _objectSpread(_objectSpread({}, d), e);
      },
      createEditOptions(a) {
        var b = this.createBrowseOptions(a),
          c = b.paginateOptions,
          f = l.paramsIdKey,
          g = a.params && a.params[f] ? d(a) : e(a);
        return _objectSpread(_objectSpread({}, c), g);
      },
      createAddOptions(a) {
        var b = l.bulkDocsKey,
          c = this.createBrowseOptions(a),
          d = c.paginateOptions,
          e = Object.hasOwnProperty.call(a.body, b) ? g(a) : f(a);
        return _objectSpread(_objectSpread({}, d), e);
      },
      createDeleteOptions(a) {
        var b = l.paramsIdKey,
          c = this.createBrowseOptions(a),
          d = c.paginateOptions,
          e = a.params && a.params[b] ? h(a) : i(a);
        return _objectSpread(_objectSpread({}, d), e);
      },
    };
  if (!l.softDelete) return m;
  var n = _objectSpread(
    _objectSpread({}, m),
    {},
    {
      createBrowseDeletedOptions(a) {
        a.__breadSoftDeleteHelperOptions = {
          customFind: "findDeleted",
          customCount: "countDocumentsDeleted",
          issuer: "createBrowseDeletedOptions",
        };
        var b = this.createBrowseOptions(a);
        return delete a.__breadSoftDeleteHelperOptions, b;
      },
      createReadDeletedOptions(a) {
        a.__breadSoftDeleteHelperOptions = {
          customFind: "findOneDeleted",
          issuer: "createReadDeletedOptions",
        };
        var b = this.createReadOptions(a);
        return delete a.__breadSoftDeleteHelperOptions, b;
      },
      createRehabilitateOptions(a) {
        var b = l.paramsIdKey,
          c = this.createBrowseOptions(a),
          d = c.paginateOptions,
          e = a.params && a.params[b] ? j(a) : k(a);
        return _objectSpread(_objectSpread({}, d), e);
      },
    }
  );
  return n;
}
module.exports = Factory;
