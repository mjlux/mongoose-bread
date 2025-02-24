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
var _require = require("./RequestValidator"),
  checkRequest = _require.checkRequest,
  MongooseBreadError = require("./MongooseBreadError");
function parseSelect(a) {
  var b = a.select
    ? Array.from(new Set(_toConsumableArray(a.select.split(","))))
    : [];
  return b.join(" ");
}
function parseQuery(a, b, c) {
  return a.query
    ? a.query
    : a.search
    ? parseSearchFilter(a, c, b)
    : parseQueryFilter(a, c);
}
function removeKeysThatAreNotInSchema(a, b) {
  var c = Object.keys(b.paths);
  return Object.keys(a).reduce(function (a, b) {
    return c.includes(b) || delete a[b], a;
  }, _objectSpread({}, a));
}
function jsonStringFromQueryWithComparison(a) {
  return JSON.stringify(a).replace(
    /\b(gt|gte|lt|lte|in|nin|eq|ne)\b/g,
    function (a) {
      return `$${a}`;
    }
  );
}
function escapeRegExp(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function parseSearchFilter(a, b, c) {
  var d = c.searchableFields;
  if (!Array.isArray(d) || !d.length)
    throw new MongooseBreadError({
      message: "Search is not availabe for this resource",
      details:
        'To enable search provide an "searchableFields" Array to the plugin registration options',
      statusCode: 404,
      issuer: `MongooseBreadHelper parseSearchFilter`,
    });
  var e = removeKeysThatAreNotInSchema(a, b);
  if (c.enableAtlasSearch && c.atlasSearchIndex) {
    var f = _objectSpread(
      _objectSpread({}, e),
      {},
      {
        $search: {
          index: c.atlasSearchIndex,
          text: { query: a.search, path: d },
        },
      }
    );
    return jsonStringFromQueryWithComparison(f);
  }
  var g = escapeRegExp(a.search)
    .split(" ")
    .reduce(function (a, b) {
      var c = d.map(function (a) {
        return { [a]: { $regex: b, $options: "i" } };
      });
      return a.concat(c);
    }, []);
  return jsonStringFromQueryWithComparison(
    _objectSpread(_objectSpread({}, e), {}, { $or: g })
  );
}
function parseQueryFilter(a, b) {
  var c = removeKeysThatAreNotInSchema(a, b);
  return jsonStringFromQueryWithComparison(c);
}
function parseProjection(a, b) {
  return a.projection
    ? a.projection
    : Array.isArray(b.blacklistedFields)
    ? b.blacklistedFields.reduce(function (a, b) {
        return _objectSpread(_objectSpread({}, a), {}, { [b]: 0 });
      }, {})
    : {};
}
function parseLimit(a, b) {
  var c = b.maxPageSize,
    d = b.defaultPageSize;
  return a.limit ? Math.min(parseInt(a.limit), c) : d;
}
function parseRequestParamsId(a, b, c) {
  var d = b.paramsIdKey,
    e = c.issuer;
  return checkRequest(a).paramsIdIsValid(d, e).bodyIsNotAnArray(e), a.params[d];
}
function parseEditRequestBody(a, b, c) {
  var d = b.bulkDocsKey,
    e = c.issuer;
  return (
    checkRequest(a).hasBody(e).hasBodyProperty(d, e).bodyPropertyIsArray(d, e),
    a.body[d].reduce(function (a, b) {
      return Object.assign(a, b);
    }, {})
  );
}
function parseAddRequestBody(a, b, c) {
  var d = b.bulkDocsKey,
    e = c.issuer;
  return (
    checkRequest(a).hasBody(e).hasBodyProperty(d, e).bodyPropertyIsArray(d, e),
    _toConsumableArray(a.body[d])
  );
}
function parseRequestBodyIds(a, b, c) {
  var d = b.bulkIdsKey,
    e = c.issuer;
  checkRequest(a)
    .hasBody(e)
    .hasBodyProperty(d, e)
    .bodyPropertyIsArray(d, e)
    .bodyPropertyArrayIncludesOnlyObjectIds(d, e);
  var f = _toConsumableArray(a.body[d]);
  return delete a.body[d], f;
}
function parseRequestUserIdPath(a, b) {
  try {
    var c = b.requestUserIdPath,
      d = c.split(".").reduce(function (a, b) {
        if (b in a) return a[b];
        throw new Error(
          `requestUserIdPathError: could not resolve request.${c} - @key: ${b} - check softDeleteOptions.requestUserIdPath to match a path to userId:ObjectId`
        );
      }, a);
    return d;
  } catch (c) {
    throw new MongooseBreadError({
      message: c.message,
      details: JSON.stringify({ request: a, options: b }),
      issuer: `MongooseBreadHelper parseRequestUserIdPath`,
    });
  }
}
module.exports = {
  parseSelect,
  parseQuery,
  parseSearchFilter,
  parseQueryFilter,
  parseProjection,
  parseLimit,
  parseRequestParamsId,
  parseEditRequestBody,
  parseAddRequestBody,
  parseRequestBodyIds,
  parseRequestUserIdPath,
};
