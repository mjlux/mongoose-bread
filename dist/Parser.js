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
    (b = _toPropertyKey(b)) in a
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
  if ("object" != typeof a || !a) return a;
  var c = a[Symbol.toPrimitive];
  if (void 0 !== c) {
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
function _unsupportedIterableToArray(b, c) {
  if (b) {
    if ("string" == typeof b) return _arrayLikeToArray(b, c);
    var a = {}.toString.call(b).slice(8, -1);
    return (
      "Object" === a && b.constructor && (a = b.constructor.name),
      "Map" === a || "Set" === a
        ? Array.from(b)
        : "Arguments" === a ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
        ? _arrayLikeToArray(b, c)
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
function _arrayLikeToArray(b, c) {
  (null == c || c > b.length) && (c = b.length);
  for (var d = 0, f = Array(c); d < c; d++) f[d] = b[d];
  return f;
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
    ? parseSearchFilter(a, b)
    : parseQueryFilter(a, c);
}
function parseSearchFilter(a, b) {
  var c = b.searchableFields;
  if (!Array.isArray(c) || !c.length)
    throw new MongooseBreadError({
      message: "Search is not availabe for this resource",
      details:
        'To enable search provide an "searchableFields" Array to the plugin registration options',
      statusCode: 404,
      issuer: `MongooseBreadHelper parseSearchFilter`,
    });
  if (b.enableAtlasSearch && b.atlasSearchIndex) {
    var d = {
      $search: {
        index: b.atlasSearchIndex,
        text: { query: a.search, path: c },
      },
    };
    return JSON.stringify(d);
  }
  var e = a.search.split(" ").reduce(function (a, b) {
    var d = c.map(function (a) {
      return { [a]: { $regex: b, $options: "i" } };
    });
    return a.concat(d);
  }, []);
  return JSON.stringify({ $or: e });
}
function parseQueryFilter(a, b) {
  var c = Object.keys(b.paths),
    d = Object.keys(a).reduce(function (a, b) {
      return c.includes(b) || delete a[b], a;
    }, _objectSpread({}, a));
  return JSON.stringify(d).replace(
    /\b(gt|gte|lt|lte|in|eq|ne)\b/g,
    function (a) {
      return `$${a}`;
    }
  );
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2hlY2tSZXF1ZXN0IiwiX3JlcXVpcmUiLCJNb25nb29zZUJyZWFkRXJyb3IiLCJwYXJzZVNlbGVjdCIsInF1ZXJ5IiwiZmllbGRzIiwic2VsZWN0IiwiQXJyYXkiLCJmcm9tIiwiU2V0IiwiX3RvQ29uc3VtYWJsZUFycmF5Iiwic3BsaXQiLCJqb2luIiwicGFyc2VRdWVyeSIsIm9wdGlvbnMiLCJzY2hlbWEiLCJzZWFyY2giLCJwYXJzZVNlYXJjaEZpbHRlciIsInBhcnNlUXVlcnlGaWx0ZXIiLCJzZWFyY2hhYmxlRmllbGRzIiwiaXNBcnJheSIsImxlbmd0aCIsIm1lc3NhZ2UiLCJkZXRhaWxzIiwic3RhdHVzQ29kZSIsImlzc3VlciIsImVuYWJsZUF0bGFzU2VhcmNoIiwiYXRsYXNTZWFyY2hJbmRleCIsInNlYXJjaFF1ZXJ5IiwiJHNlYXJjaCIsImluZGV4IiwidGV4dCIsInBhdGgiLCJKU09OIiwic3RyaW5naWZ5IiwicmVkdWNlIiwiZmllbGRRdWVyaWVzQ29sbGVjdGlvbiIsInNlYXJjaFRlcm0iLCJmaWVsZFF1ZXJpZXMiLCJtYXAiLCJmaWVsZCIsIiRyZWdleCIsIiRvcHRpb25zIiwiY29uY2F0IiwiJG9yIiwia2V5cyIsIk9iamVjdCIsInBhdGhzIiwic2FuaXRpemVkRmlsdGVyIiwiZmlsdGVyIiwia2V5IiwiaW5jbHVkZXMiLCJfb2JqZWN0U3ByZWFkIiwicmVwbGFjZSIsIm0iLCJwYXJzZVByb2plY3Rpb24iLCJwcm9qZWN0aW9uIiwiYmxhY2tsaXN0ZWRGaWVsZHMiLCJvYmoiLCJwYXJzZUxpbWl0IiwibWF4UGFnZVNpemUiLCJkZWZhdWx0UGFnZVNpemUiLCJsaW1pdCIsIk1hdGgiLCJtaW4iLCJwYXJzZUludCIsInBhcnNlUmVxdWVzdFBhcmFtc0lkIiwicmVxdWVzdCIsInBsdWdpbk9wdGlvbnMiLCJwYXJhbXNJZEtleSIsInBhcmFtc0lkSXNWYWxpZCIsImJvZHlJc05vdEFuQXJyYXkiLCJwYXJhbXMiLCJwYXJzZUVkaXRSZXF1ZXN0Qm9keSIsImJ1bGtEb2NzS2V5IiwiaGFzQm9keSIsImhhc0JvZHlQcm9wZXJ0eSIsImJvZHlQcm9wZXJ0eUlzQXJyYXkiLCJib2R5IiwiYWNjIiwiZG9jIiwiYXNzaWduIiwicGFyc2VBZGRSZXF1ZXN0Qm9keSIsInBhcnNlUmVxdWVzdEJvZHlJZHMiLCJidWxrSWRzS2V5IiwiYm9keVByb3BlcnR5QXJyYXlJbmNsdWRlc09ubHlPYmplY3RJZHMiLCJib2R5SWRzIiwicGFyc2VSZXF1ZXN0VXNlcklkUGF0aCIsInJlcXVlc3RVc2VySWRQYXRoIiwidXNlcklkIiwidXNlciIsIkVycm9yIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL1BhcnNlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNoZWNrUmVxdWVzdCB9ID0gcmVxdWlyZShcIi4vUmVxdWVzdFZhbGlkYXRvclwiKTtcbmNvbnN0IE1vbmdvb3NlQnJlYWRFcnJvciA9IHJlcXVpcmUoXCIuL01vbmdvb3NlQnJlYWRFcnJvclwiKTtcblxuZnVuY3Rpb24gcGFyc2VTZWxlY3QocXVlcnkpIHtcbiAgY29uc3QgZmllbGRzID0gcXVlcnkuc2VsZWN0XG4gICAgPyBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLnF1ZXJ5LnNlbGVjdC5zcGxpdChcIixcIildKSlcbiAgICA6IFtdO1xuICByZXR1cm4gZmllbGRzLmpvaW4oXCIgXCIpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5LCBvcHRpb25zLCBzY2hlbWEpIHtcbiAgaWYgKHF1ZXJ5LnF1ZXJ5KSByZXR1cm4gcXVlcnkucXVlcnk7XG5cbiAgcmV0dXJuIHF1ZXJ5LnNlYXJjaFxuICAgID8gcGFyc2VTZWFyY2hGaWx0ZXIocXVlcnksIG9wdGlvbnMpXG4gICAgOiBwYXJzZVF1ZXJ5RmlsdGVyKHF1ZXJ5LCBzY2hlbWEpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVNlYXJjaEZpbHRlcihxdWVyeSwgb3B0aW9ucykge1xuICBjb25zdCB7IHNlYXJjaGFibGVGaWVsZHMgfSA9IG9wdGlvbnM7XG4gIGlmICghQXJyYXkuaXNBcnJheShzZWFyY2hhYmxlRmllbGRzKSB8fCAhc2VhcmNoYWJsZUZpZWxkcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgTW9uZ29vc2VCcmVhZEVycm9yKHtcbiAgICAgIG1lc3NhZ2U6IFwiU2VhcmNoIGlzIG5vdCBhdmFpbGFiZSBmb3IgdGhpcyByZXNvdXJjZVwiLFxuICAgICAgZGV0YWlsczpcbiAgICAgICAgJ1RvIGVuYWJsZSBzZWFyY2ggcHJvdmlkZSBhbiBcInNlYXJjaGFibGVGaWVsZHNcIiBBcnJheSB0byB0aGUgcGx1Z2luIHJlZ2lzdHJhdGlvbiBvcHRpb25zJyxcbiAgICAgIHN0YXR1c0NvZGU6IDQwNCxcbiAgICAgIGlzc3VlcjogYE1vbmdvb3NlQnJlYWRIZWxwZXIgcGFyc2VTZWFyY2hGaWx0ZXJgLFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuZW5hYmxlQXRsYXNTZWFyY2ggJiYgb3B0aW9ucy5hdGxhc1NlYXJjaEluZGV4KSB7XG4gICAgY29uc3Qgc2VhcmNoUXVlcnkgPSB7XG4gICAgICAkc2VhcmNoOiB7XG4gICAgICAgIGluZGV4OiBvcHRpb25zLmF0bGFzU2VhcmNoSW5kZXgsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICBxdWVyeTogcXVlcnkuc2VhcmNoLFxuICAgICAgICAgIHBhdGg6IHNlYXJjaGFibGVGaWVsZHMsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHNlYXJjaFF1ZXJ5KTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzZWFyY2hRdWVyeSA9IHF1ZXJ5LnNlYXJjaFxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLnJlZHVjZSgoZmllbGRRdWVyaWVzQ29sbGVjdGlvbiwgc2VhcmNoVGVybSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZFF1ZXJpZXMgPSBzZWFyY2hhYmxlRmllbGRzLm1hcCgoZmllbGQpID0+IHtcbiAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB7ICRyZWdleDogc2VhcmNoVGVybSwgJG9wdGlvbnM6IFwiaVwiIH0gfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWVsZFF1ZXJpZXNDb2xsZWN0aW9uLmNvbmNhdChmaWVsZFF1ZXJpZXMpO1xuICAgICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHsgJG9yOiBzZWFyY2hRdWVyeSB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5RmlsdGVyKHF1ZXJ5LCBzY2hlbWEpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNjaGVtYS5wYXRocyk7XG4gIGNvbnN0IHNhbml0aXplZEZpbHRlciA9IE9iamVjdC5rZXlzKHF1ZXJ5KS5yZWR1Y2UoXG4gICAgKGZpbHRlciwga2V5KSA9PiB7XG4gICAgICBpZiAoIWtleXMuaW5jbHVkZXMoa2V5KSkgZGVsZXRlIGZpbHRlcltrZXldO1xuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9LFxuICAgIHsgLi4ucXVlcnkgfVxuICApO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc2FuaXRpemVkRmlsdGVyKS5yZXBsYWNlKFxuICAgIC9cXGIoZ3R8Z3RlfGx0fGx0ZXxpbnxlcXxuZSlcXGIvZyxcbiAgICAobSkgPT4gYCQke219YFxuICApO1xufVxuXG5mdW5jdGlvbiBwYXJzZVByb2plY3Rpb24ocXVlcnksIG9wdGlvbnMpIHtcbiAgaWYgKHF1ZXJ5LnByb2plY3Rpb24pIHJldHVybiBxdWVyeS5wcm9qZWN0aW9uO1xuICBpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5ibGFja2xpc3RlZEZpZWxkcykpIHJldHVybiB7fTtcbiAgcmV0dXJuIG9wdGlvbnMuYmxhY2tsaXN0ZWRGaWVsZHMucmVkdWNlKFxuICAgIChvYmosIGZpZWxkKSA9PiAoeyAuLi5vYmosIFtmaWVsZF06IDAgfSksXG4gICAge31cbiAgKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VMaW1pdChxdWVyeSwgb3B0aW9ucykge1xuICBjb25zdCB7IG1heFBhZ2VTaXplLCBkZWZhdWx0UGFnZVNpemUgfSA9IG9wdGlvbnM7XG4gIHJldHVybiBxdWVyeS5saW1pdFxuICAgID8gTWF0aC5taW4ocGFyc2VJbnQocXVlcnkubGltaXQpLCBtYXhQYWdlU2l6ZSlcbiAgICA6IGRlZmF1bHRQYWdlU2l6ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZXF1ZXN0UGFyYW1zSWQocmVxdWVzdCwgcGx1Z2luT3B0aW9ucywgb3B0aW9ucykge1xuICBjb25zdCB7IHBhcmFtc0lkS2V5IH0gPSBwbHVnaW5PcHRpb25zO1xuICBjb25zdCB7IGlzc3VlciB9ID0gb3B0aW9ucztcbiAgY2hlY2tSZXF1ZXN0KHJlcXVlc3QpXG4gICAgLnBhcmFtc0lkSXNWYWxpZChwYXJhbXNJZEtleSwgaXNzdWVyKVxuICAgIC5ib2R5SXNOb3RBbkFycmF5KGlzc3Vlcik7XG4gIHJldHVybiByZXF1ZXN0LnBhcmFtc1twYXJhbXNJZEtleV07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRWRpdFJlcXVlc3RCb2R5KHJlcXVlc3QsIHBsdWdpbk9wdGlvbnMsIG9wdGlvbnMpIHtcbiAgY29uc3QgeyBidWxrRG9jc0tleSB9ID0gcGx1Z2luT3B0aW9ucztcbiAgY29uc3QgeyBpc3N1ZXIgfSA9IG9wdGlvbnM7XG5cbiAgY2hlY2tSZXF1ZXN0KHJlcXVlc3QpXG4gICAgLmhhc0JvZHkoaXNzdWVyKVxuICAgIC5oYXNCb2R5UHJvcGVydHkoYnVsa0RvY3NLZXksIGlzc3VlcilcbiAgICAuYm9keVByb3BlcnR5SXNBcnJheShidWxrRG9jc0tleSwgaXNzdWVyKTtcblxuICAvLyBtZXJnZSBlZGl0IGRvY3VtZW50cyB0byBzaW5nbGUgT2JqZWN0XG4gIHJldHVybiByZXF1ZXN0LmJvZHlbYnVsa0RvY3NLZXldLnJlZHVjZSgoYWNjLCBkb2MpID0+IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhY2MsIGRvYyk7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VBZGRSZXF1ZXN0Qm9keShyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCBvcHRpb25zKSB7XG4gIGNvbnN0IHsgYnVsa0RvY3NLZXkgfSA9IHBsdWdpbk9wdGlvbnM7XG4gIGNvbnN0IHsgaXNzdWVyIH0gPSBvcHRpb25zO1xuXG4gIGNoZWNrUmVxdWVzdChyZXF1ZXN0KVxuICAgIC5oYXNCb2R5KGlzc3VlcilcbiAgICAuaGFzQm9keVByb3BlcnR5KGJ1bGtEb2NzS2V5LCBpc3N1ZXIpXG4gICAgLmJvZHlQcm9wZXJ0eUlzQXJyYXkoYnVsa0RvY3NLZXksIGlzc3Vlcik7XG5cbiAgcmV0dXJuIFsuLi5yZXF1ZXN0LmJvZHlbYnVsa0RvY3NLZXldXTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZXF1ZXN0Qm9keUlkcyhyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCBvcHRpb25zKSB7XG4gIGNvbnN0IHsgYnVsa0lkc0tleSB9ID0gcGx1Z2luT3B0aW9ucztcbiAgY29uc3QgeyBpc3N1ZXIgfSA9IG9wdGlvbnM7XG5cbiAgY2hlY2tSZXF1ZXN0KHJlcXVlc3QpXG4gICAgLmhhc0JvZHkoaXNzdWVyKVxuICAgIC5oYXNCb2R5UHJvcGVydHkoYnVsa0lkc0tleSwgaXNzdWVyKVxuICAgIC5ib2R5UHJvcGVydHlJc0FycmF5KGJ1bGtJZHNLZXksIGlzc3VlcilcbiAgICAuYm9keVByb3BlcnR5QXJyYXlJbmNsdWRlc09ubHlPYmplY3RJZHMoYnVsa0lkc0tleSwgaXNzdWVyKTtcblxuICBjb25zdCBib2R5SWRzID0gWy4uLnJlcXVlc3QuYm9keVtidWxrSWRzS2V5XV07XG4gIGRlbGV0ZSByZXF1ZXN0LmJvZHlbYnVsa0lkc0tleV07XG5cbiAgcmV0dXJuIGJvZHlJZHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVxdWVzdFVzZXJJZFBhdGgocmVxdWVzdCwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGNvbnN0IHsgcmVxdWVzdFVzZXJJZFBhdGggfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgdXNlcklkID0gcmVxdWVzdFVzZXJJZFBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgodXNlciwga2V5KSA9PiB7XG4gICAgICBpZiAoa2V5IGluIHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIHVzZXJba2V5XTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgcmVxdWVzdFVzZXJJZFBhdGhFcnJvcjogY291bGQgbm90IHJlc29sdmUgcmVxdWVzdC4ke3JlcXVlc3RVc2VySWRQYXRofSAtIEBrZXk6ICR7a2V5fSAtIGNoZWNrIHNvZnREZWxldGVPcHRpb25zLnJlcXVlc3RVc2VySWRQYXRoIHRvIG1hdGNoIGEgcGF0aCB0byB1c2VySWQ6T2JqZWN0SWRgXG4gICAgICApO1xuICAgIH0sIHJlcXVlc3QpO1xuICAgIHJldHVybiB1c2VySWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgbmV3IE1vbmdvb3NlQnJlYWRFcnJvcih7XG4gICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLFxuICAgICAgZGV0YWlsczogSlNPTi5zdHJpbmdpZnkoeyByZXF1ZXN0LCBvcHRpb25zIH0pLFxuICAgICAgaXNzdWVyOiBgTW9uZ29vc2VCcmVhZEhlbHBlciBwYXJzZVJlcXVlc3RVc2VySWRQYXRoYCxcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2VTZWxlY3QsXG4gIHBhcnNlUXVlcnksXG4gIHBhcnNlU2VhcmNoRmlsdGVyLFxuICBwYXJzZVF1ZXJ5RmlsdGVyLFxuICBwYXJzZVByb2plY3Rpb24sXG4gIHBhcnNlTGltaXQsXG4gIHBhcnNlUmVxdWVzdFBhcmFtc0lkLFxuICBwYXJzZUVkaXRSZXF1ZXN0Qm9keSxcbiAgcGFyc2VBZGRSZXF1ZXN0Qm9keSxcbiAgcGFyc2VSZXF1ZXN0Qm9keUlkcyxcbiAgcGFyc2VSZXF1ZXN0VXNlcklkUGF0aCxcbn07XG4iXSwibWFwcGluZ3MiOiI4a0VBQXlCQSxPQUFPLENB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
