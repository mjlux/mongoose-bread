"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = require("./RequestValidator"),
  checkRequest = _require.checkRequest;
var MongooseBreadError = require("./mongooseBreadError");
function parseSelect(query) {
  var fields = query.select ? Array.from(new Set(_toConsumableArray(query.select.split(",")))) : [];
  return fields.join(" ");
}
function parseQuery(query, options, schema) {
  if (query.query) return query.query;
  return query.search ? parseSearchFilter(query, options) : parseQueryFilter(query, schema);
}
function parseSearchFilter(query, options) {
  var searchableFields = options.searchableFields;
  if (!Array.isArray(searchableFields) || !searchableFields.length) {
    throw new MongooseBreadError({
      message: "Search is not availabe for this resource",
      details: 'To enable search provide an "searchableFields" Array to the plugin registration options',
      statusCode: 404,
      issuer: `MongooseBreadHelper parseSearchFilter`
    });
  }
  var searchQuery = query.search.split(" ").reduce(function (fieldQueriesCollection, searchTerm) {
    var fieldQueries = searchableFields.map(function (field) {
      return {
        [field]: {
          $regex: searchTerm,
          $options: "i"
        }
      };
    });
    return fieldQueriesCollection.concat(fieldQueries);
  }, []);
  return JSON.stringify({
    $or: searchQuery
  });
}
function parseQueryFilter(query, schema) {
  var keys = Object.keys(schema.paths);
  var sanitizedFilter = Object.keys(query).reduce(function (filter, key) {
    if (!keys.includes(key)) delete filter[key];
    return filter;
  }, _objectSpread({}, query));
  return JSON.stringify(sanitizedFilter).replace(/\b(gt|gte|lt|lte|in|eq|ne)\b/g, function (m) {
    return `$${m}`;
  });
}
function parseProjection(query, options) {
  if (query.projection) return query.projection;
  if (!Array.isArray(options.blacklistedFields)) return {};
  return options.blacklistedFields.reduce(function (obj, field) {
    return _objectSpread(_objectSpread({}, obj), {}, {
      [field]: 0
    });
  }, {});
}
function parseLimit(query, options) {
  var maxPageSize = options.maxPageSize,
    defaultPageSize = options.defaultPageSize;
  return query.limit ? Math.min(parseInt(query.limit), maxPageSize) : defaultPageSize;
}
function parseRequestParamsId(request, pluginOptions, options) {
  var paramsIdKey = pluginOptions.paramsIdKey;
  var issuer = options.issuer;
  checkRequest(request).paramsIdIsValid(paramsIdKey, issuer).bodyIsNotAnArray(issuer);
  return request.params[paramsIdKey];
}
function parseEditRequestBody(request, pluginOptions, options) {
  var bulkDocsKey = pluginOptions.bulkDocsKey;
  var issuer = options.issuer;
  checkRequest(request).hasBody(issuer).hasBodyProperty(bulkDocsKey, issuer).bodyPropertyIsArray(bulkDocsKey, issuer);

  // merge edit documents to single Object
  return request.body[bulkDocsKey].reduce(function (acc, doc) {
    return Object.assign(acc, doc);
  }, {});
}
function parseAddRequestBody(request, pluginOptions, options) {
  var bulkDocsKey = pluginOptions.bulkDocsKey;
  var issuer = options.issuer;
  checkRequest(request).hasBody(issuer).hasBodyProperty(bulkDocsKey, issuer).bodyPropertyIsArray(bulkDocsKey, issuer);
  return _toConsumableArray(request.body[bulkDocsKey]);
}
function parseRequestBodyIds(request, pluginOptions, options) {
  var bulkIdsKey = pluginOptions.bulkIdsKey;
  var issuer = options.issuer;
  checkRequest(request).hasBody(issuer).hasBodyProperty(bulkIdsKey, issuer).bodyPropertyIsArray(bulkIdsKey, issuer).bodyPropertyArrayIncludesOnlyObjectIds(bulkIdsKey, issuer);
  var bodyIds = _toConsumableArray(request.body[bulkIdsKey]);
  delete request.body[bulkIdsKey];
  return bodyIds;
}
function parseRequestUserIdPath(request, options) {
  try {
    var requestUserIdPath = options.requestUserIdPath;
    var userId = requestUserIdPath.split(".").reduce(function (user, key) {
      if (Object.hasOwnProperty.call(user, key)) {
        return user[key];
      }
      throw new Error(`requestUserIdPathError: could not resolve request.${requestUserIdPath} - @key: ${key} - check softDeleteOptions.requestUserIdPath to match a path to userId:ObjectId`);
    }, request);
    return userId;
  } catch (error) {
    throw new MongooseBreadError({
      message: error.message,
      details: JSON.stringify({
        request,
        options
      }),
      issuer: `MongooseBreadHelper parseRequestUserIdPath`
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
  parseRequestUserIdPath
};