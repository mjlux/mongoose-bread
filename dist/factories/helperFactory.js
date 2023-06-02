"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require("mongoose-paginate-v2"),
  PaginationParameters = _require.PaginationParameters;
var _require2 = require("../Parser"),
  parseSelect = _require2.parseSelect,
  parseQuery = _require2.parseQuery,
  parseProjection = _require2.parseProjection,
  parseLimit = _require2.parseLimit,
  parseRequestParamsId = _require2.parseRequestParamsId,
  parseEditRequestBody = _require2.parseEditRequestBody,
  parseAddRequestBody = _require2.parseAddRequestBody,
  parseRequestBodyIds = _require2.parseRequestBodyIds,
  parseRequestUserIdPath = _require2.parseRequestUserIdPath;
function convertStringToBoolean(str) {
  return typeof str === "string" ? str === "true" || str === "1" : false;
}
function Factory(schema) {
  var pluginOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // read - single or bulk (browse)
  function createSingleReadOptions(request) {
    var _request$__breadSoftD, _request$__breadSoftD2;
    var issuer = ((_request$__breadSoftD = request.__breadSoftDeleteHelperOptions) === null || _request$__breadSoftD === void 0 ? void 0 : _request$__breadSoftD.issuer) || "createReadOptions";
    var customFind = ((_request$__breadSoftD2 = request.__breadSoftDeleteHelperOptions) === null || _request$__breadSoftD2 === void 0 ? void 0 : _request$__breadSoftD2.customFind) || "findOne";
    var idParam = parseRequestParamsId(request, pluginOptions, {
      issuer
    });
    var select = parseSelect(request.query || {});
    return {
      query: {
        _id: idParam
      },
      select,
      customFind
    };
  }
  function createBulkReadOptions(request) {
    var _options = Object.assign({}, pluginOptions, request.__breadSoftDeleteHelperOptions);
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
    paginateOptions.customFind = _options.customFind || "find";
    paginateOptions.customCount = _options.customCount || false;
    paginateOptions.leanWithout_id = _query.leanWithout_id ? convertStringToBoolean(_query.leanWithout_id) : _options.leanWithout_id;
    return {
      query,
      paginateOptions
    };
  }
  // edit - single or bulk
  function createSingleEditOptions(request) {
    var idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createEditOptions"
    });
    return {
      payload: request.body,
      query: {
        _id: idParam
      }
    };
  }
  function createBulkEditOptions(request) {
    var bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createEditOptions"
    });
    var payload = parseEditRequestBody(request, pluginOptions, {
      issuer: "createEditOptions"
    });
    return {
      bulk: true,
      payload: payload,
      query: {
        _id: {
          $in: _toConsumableArray(bodyIds)
        }
      }
    };
  }
  // add - single or bulk
  function createSingleAddOptions(request) {
    var newDocument = request.body;
    return {
      payload: newDocument
    };
  }
  function createBulkAddOptions(request) {
    var newDocuments = parseAddRequestBody(request, pluginOptions, {
      issuer: "createAddOptions"
    });
    return {
      bulk: true,
      payload: newDocuments
    };
  }
  // delete - single or bulk
  function createSingleDeleteOptions(request) {
    var idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createDeleteOptions"
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
      issuer: "createDeleteOptions"
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
    var idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createRehabilitateOptions"
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
      issuer: "createRehabilitateOptions"
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
  var helperMethods = {
    createBrowseOptions(request) {
      var options = createBulkReadOptions(request);
      return options;
    },
    createReadOptions(request) {
      var _this$createBrowseOpt = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt.paginateOptions;
      var options = createSingleReadOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), options);
    },
    createEditOptions(request) {
      var _this$createBrowseOpt2 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt2.paginateOptions;
      var paramsIdKey = pluginOptions.paramsIdKey;
      var options = request.params && request.params[paramsIdKey] ? createSingleEditOptions(request) : createBulkEditOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), options);
    },
    createAddOptions(request) {
      var bulkDocsKey = pluginOptions.bulkDocsKey;
      var _this$createBrowseOpt3 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt3.paginateOptions;
      var options = Object.hasOwnProperty.call(request.body, bulkDocsKey) ? createBulkAddOptions(request) : createSingleAddOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), options);
    },
    createDeleteOptions(request) {
      var paramsIdKey = pluginOptions.paramsIdKey;
      var _this$createBrowseOpt4 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt4.paginateOptions;
      var options = request.params && request.params[paramsIdKey] ? createSingleDeleteOptions(request) : createBulkDeleteOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), options);
    }
  };
  if (!pluginOptions.softDelete) {
    return helperMethods;
  }
  return _objectSpread(_objectSpread({}, helperMethods), {}, {
    createBrowseDeletedOptions(request) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findDeleted",
        customCount: "countDeleted",
        issuer: "createBrowseDeletedOptions"
      };
      var options = this.createBrowseOptions(request);
      delete request.__breadSoftDeleteHelperOptions;
      return options;
    },
    createReadDeletedOptions(request) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findOneDeleted",
        // no "customCount" necessary - findOneDeleted always yields 1 result
        issuer: "createReadDeletedOptions"
      };
      var options = this.createReadOptions(request);
      delete request.__breadSoftDeleteHelperOptions;
      return options;
    },
    createRehabilitateOptions(request) {
      var paramsIdKey = pluginOptions.paramsIdKey;
      var _this$createBrowseOpt5 = this.createBrowseOptions(request),
        paginateOptions = _this$createBrowseOpt5.paginateOptions;
      var options = request.params && request.params[paramsIdKey] ? createSingleRehabilitateOptions(request) : createBulkRehabilitateOptions(request);
      return _objectSpread(_objectSpread({}, paginateOptions), options);
    }
  });
}
module.exports = Factory;