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
var _require = require("mongoose-paginate-v2"),
  PaginationParameters = _require.PaginationParameters;
var MongooseBreadError = require("./mongooseBreadError");
var _require2 = require("./RequestValidator"),
  check = _require2.check;
function parseSelect(query) {
  var fields = query.select ? Array.from(new Set(_toConsumableArray(query.select.split(',')))) : [];
  return fields.join(' ');
}
function parseQuery(query, options, schema) {
  if (query.query) return query.query;
  return query.search ? parseSearchFilter(query, options) : parseQueryFilter(query, schema);
}
function parseSearchFilter(query, options) {
  var searchableFields = options.searchableFields;
  if (!Array.isArray(searchableFields) || !searchableFields.length) {
    throw new MongooseBreadError({
      message: 'Search is not availabe for this resource',
      details: 'To enable search provide an "searchableFields" Array to the plugin registration options',
      statusCode: 404,
      issuer: `MongooseBreadHelper parseSearchFilter`
    });
  }
  var searchTerm = query.search;
  var searchQuery = searchableFields.map(function (field) {
    return {
      [field]: {
        $regex: searchTerm,
        $options: 'i'
      }
    };
  });
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
function parseRequestParamsId(request, options) {
  var issuer = options.issuer;
  check(request).paramsIdIsValid(issuer).bodyIsNotAnArray(issuer);
  return request.params.id;
}

// function parseEditRequestBody(request, pluginOptions, options) {
//     const { bulkIdsKey, bulkDocsKey } = pluginOptions
//     const { issuer } = options

//     check(request)
//         .hasBody(issuer)
//         .hasBodyProperty(bulkIdsKey, issuer)
//         .hasBodyProperty(bulkDocsKey, issuer)
//         .bodyPropertyIsArray(bulkIdsKey, issuer)
//         .bodyPropertyIsArray(bulkDocsKey, issuer)

//     return [...request.body[bulkDocsKey]]
// }

function parseAddRequestBody(request, pluginOptions, options) {
  var bulkDocsKey = pluginOptions.bulkDocsKey;
  var issuer = options.issuer;
  check(request).hasBody(issuer).hasBodyProperty(bulkDocsKey, issuer).bodyPropertyIsArray(bulkDocsKey, issuer);
  return _toConsumableArray(request.body[bulkDocsKey]);
}
function parseRequestBodyIds(request, pluginOptions, options) {
  var bulkIdsKey = pluginOptions.bulkIdsKey;
  var issuer = options.issuer;
  check(request).hasBody(issuer).hasBodyProperty(bulkIdsKey, issuer).bodyPropertyIsArray(bulkIdsKey, issuer).bodyPropertyArrayIncludesOnlyObjectIds(bulkIdsKey, issuer);
  var bodyIds = _toConsumableArray(request.body[bulkIdsKey]);
  delete request.body[bulkIdsKey];
  return bodyIds;
}
function parseRequestUserIdPath(request, options) {
  try {
    var requestUserIdPath = options.requestUserIdPath;
    var userId = requestUserIdPath.split('.').reduce(function (user, key) {
      return user[key];
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
function parseStringToBool(str) {
  return typeof str === 'string' ? str === 'true' || str === '1' : false;
}
function Factory(schema) {
  var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // read - single or bulk (browse)
  function createSingleReadOptions(request, options) {
    var idParam = parseRequestParamsId(request, {
      issuer: (options === null || options === void 0 ? void 0 : options.issuer) || 'createReadOptions'
    });
    var select = parseSelect(request.query || {});
    return {
      query: {
        _id: idParam
      },
      select,
      customFind: (options === null || options === void 0 ? void 0 : options.customFind) || 'findOne'
    };
  }
  function createBulkReadOptions(request, options) {
    var _options = _objectSpread(_objectSpread({}, pluginOptions), options);
    var _query = request.query ? _objectSpread({}, request.query) : {};
    var _request = {
      query: _objectSpread(_objectSpread(_objectSpread({}, _options), _query), {}, {
        limit: parseLimit(_query, _options),
        query: parseQuery(_query, _options, schema),
        projection: parseProjection(_query, _options)
      })
    };
    delete _request.query.options; // !!! leads to inifinite recursive loop if set
    var paginationParams = new PaginationParameters(_request);
    var query = paginationParams.getQuery();
    var paginateOptions = paginationParams.getOptions();
    paginateOptions.customFind = _options.customFind || 'find';
    paginateOptions.customCount = _options.customCount || false;
    paginateOptions.leanWithout_id = _query.leanWithout_id ? parseStringToBool(_query.leanWithout_id) : _options.leanWithout_id;
    return {
      query,
      paginateOptions
    };
  }
  // edit - single or bulk
  function createSingleEditOptions(request) {
    var idParam = parseRequestParamsId(request, {
      issuer: 'createEditOptions'
    });
    return {
      payload: {
        $set: _objectSpread({}, request.body)
      },
      query: {
        _id: idParam
      }
    };
  }
  function createBulkEditOptions(request) {
    var bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: 'createEditOptions'
    });
    return {
      bulk: true,
      payload: {
        $set: _objectSpread({}, request.body)
      },
      query: {
        _id: {
          $in: _toConsumableArray(bodyIds)
        }
      }
    };
  }
  // add - single or bulk
  function createSingleAddOptions(request) {
    return {
      payload: request.body
    };
  }
  function createBulkAddOptions(request) {
    var body = parseAddRequestBody(request, pluginOptions, {
      issuer: 'createAddOptions'
    });
    return {
      bulk: true,
      payload: body
    };
  }
  // delete - single or bulk
  function createSingleDeleteOptions(request) {
    var idParam = parseRequestParamsId(request, {
      issuer: 'createDeleteOptions'
    });
    var softDelete = pluginOptions.softDelete,
      softDeleteOptions = pluginOptions.softDeleteOptions;
    var deletedBy = softDeleteOptions.deletedBy,
      requestUserIdPath = softDeleteOptions.requestUserIdPath;
    var userId = softDelete && deletedBy && requestUserIdPath ? parseRequestUserIdPath(request, {
      requestUserIdPath
    }) : null;
    return {
      query: {
        _id: idParam
      },
      userId
    };
  }
  function createBulkDeleteOptions(request) {
    var softDelete = pluginOptions.softDelete,
      softDeleteOptions = pluginOptions.softDeleteOptions;
    var deletedBy = softDeleteOptions.deletedBy,
      requestUserIdPath = softDeleteOptions.requestUserIdPath;
    var bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: 'createDeleteOptions'
    });
    var userId = softDelete && deletedBy && requestUserIdPath ? parseRequestUserIdPath(request, {
      requestUserIdPath
    }) : null;
    return {
      bulk: true,
      userId,
      query: {
        _id: {
          $in: _toConsumableArray(bodyIds)
        }
      }
    };
  }
  // rehabilitate - single or bulk
  function createSingleRehabilitateOptions(request) {
    var idParam = parseRequestParamsId(request, {
      issuer: 'createRehabilitateOptions'
    });
    return {
      query: {
        _id: idParam,
        deleted: true
      }
    };
  }
  function createBulkRehabilitateOptions(request) {
    var bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: 'createRehabilitateOptions'
    });
    return {
      bulk: true,
      query: {
        _id: {
          $in: _toConsumableArray(bodyIds)
        },
        deleted: true
      }
    };
  }
  return {
    createBrowseOptions(request, options) {
      return createBulkReadOptions(request, options);
    },
    createBrowseDeletedOptions(request) {
      return this.createBrowseOptions(request, {
        customFind: 'findDeleted',
        customCount: 'countDeleted'
      });
    },
    createReadOptions(request, options) {
      var _this$createBrowseOpt = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt.paginateOptions;
      var _options = createSingleReadOptions(request, options);
      return _objectSpread(_objectSpread({}, paginateOptions), _options);
    },
    createReadDeletedOptions(request) {
      return this.createReadOptions(request, {
        customFind: 'findOneDeleted',
        issuer: 'createReadDeletedOptions'
      });
    },
    createEditOptions(request) {
      var _request$params;
      var _this$createBrowseOpt2 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt2.paginateOptions;
      var _options = (_request$params = request.params) !== null && _request$params !== void 0 && _request$params.id ? createSingleEditOptions(request) : createBulkEditOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), _options);
    },
    createAddOptions(request) {
      var _this$createBrowseOpt3 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt3.paginateOptions;
      var _options = Array.isArray(request.body) ? createBulkAddOptions(request) : createSingleAddOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), _options);
    },
    createDeleteOptions(request) {
      var _request$params2;
      var _this$createBrowseOpt4 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt4.paginateOptions;
      var _options = (_request$params2 = request.params) !== null && _request$params2 !== void 0 && _request$params2.id ? createSingleDeleteOptions(request) : createBulkDeleteOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), _options);
    },
    createRehabilitateOptions(request) {
      var _request$params3;
      var _this$createBrowseOpt5 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt5.paginateOptions;
      var _options = (_request$params3 = request.params) !== null && _request$params3 !== void 0 && _request$params3.id ? createSingleRehabilitateOptions(request) : createBulkRehabilitateOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), _options);
    }
  };
}
module.exports = Factory;