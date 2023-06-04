"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BreadUrlBuilder", {
  enumerable: true,
  get: function get() {
    return _BreadUrlBuilder.default;
  }
});
Object.defineProperty(exports, "MongooseBreadError", {
  enumerable: true,
  get: function get() {
    return _MongooseBreadError.default;
  }
});
exports.default = void 0;
exports.mongooseBread = mongooseBread;
var _MongooseBreadError = _interopRequireDefault(require("./MongooseBreadError"));
var _BreadUrlBuilder = _interopRequireDefault(require("./BreadUrlBuilder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var helperFactory = require("./factories/helperFactory");
var browseFactory = require("./factories/browseFactory");
var readFactory = require("./factories/readFactory");
var editFactory = require("./factories/editFactory");
var addFactory = require("./factories/addFactory");
var destroyFactory = require("./factories/destroyFactory");
var softDeleteFactory = require("./factories/softDeleteFactory");
var rehabilitateFactory = require("./factories/rehabilitateFactory");
var _require = require("./RequestValidator"),
  checkSchema = _require.checkSchema;
var defaultPluginOptions = {
  defaultPageSize: 10,
  maxPageSize: 100,
  searchableFields: [],
  blacklistedFields: [],
  paramsIdKey: "id",
  bulkIdsKey: "_ids",
  bulkDocsKey: "_docs",
  softDelete: false,
  softDeleteOptions: {
    overrideMethods: true,
    validateBeforeDelete: true,
    indexFields: true,
    deletedAt: true,
    deletedBy: false,
    requestUserIdPath: ""
  },
  /* Inherited from mongoose-paginate-v2 */
  select: "",
  projection: {},
  collation: {},
  pagination: true,
  allowDiskUse: false,
  forceCountFn: false,
  useCustomCountFn: false,
  useEstimatedCount: false,
  lean: false,
  leanWithId: false,
  // override mongoose-paginate-v2 default - was true
  leanWithout_id: false,
  // additional mongoose-bread option to remove '_id' from lean results
  customFind: "find",
  customLabels: {
    docs: "docs",
    limit: "limit",
    page: "page",
    pagingCounter: "pagingCounter",
    hasNextPage: "hasNextPage",
    hasPrevPage: "hasPrevPage",
    nextPage: "nextPage",
    prevPage: "prevPage",
    totalDocs: "totalDocs",
    totalPages: "totalPages",
    meta: null,
    acknowledged: "acknowledged",
    modifiedCount: "modifiedCount",
    deletedCount: "deletedCount",
    createdCount: "createdCount",
    readCount: "readCount"
  }
};
function mongooseBread(schema, pluginOptions) {
  var mongooseBreadOptions = mongooseBread.options || {};
  var _softDeleteOptions = _objectSpread(_objectSpread(_objectSpread({}, defaultPluginOptions.softDeleteOptions), mongooseBreadOptions.softDeleteOptions), pluginOptions.softDeleteOptions);
  var _pluginOptions = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, defaultPluginOptions), mongooseBreadOptions), pluginOptions), {}, {
    softDeleteOptions: _softDeleteOptions
  });

  // register mongoose-paginate-v2 dependency
  checkSchema(schema).hasMongoosePaginateV2AlreadyInstalled("index.js");
  schema.plugin(require("mongoose-paginate-v2"));

  // register Plugin methods
  schema.statics.browse = browseFactory(_pluginOptions);
  schema.statics.read = readFactory(_pluginOptions);
  schema.statics.edit = editFactory(_pluginOptions);
  schema.statics.add = addFactory(_pluginOptions);
  schema.statics.destroy = destroyFactory(_pluginOptions);

  // register optional mongoose-delete dependency
  if (_pluginOptions.softDelete) {
    checkSchema(schema).hasMongooseDeleteAlreadyInstalled("index.js");
    var softDeleteOptions = _pluginOptions.softDeleteOptions;
    softDeleteOptions.overrideMethods = true;
    if (softDeleteOptions.indexFields) {
      var deletedBy = softDeleteOptions.deletedBy,
        requestUserIdPath = softDeleteOptions.requestUserIdPath;
      var deleteByIsValid = deletedBy && requestUserIdPath && typeof requestUserIdPath == "string";
      softDeleteOptions.deletedBy = deleteByIsValid;
      var indexFields = ["deleted"];
      if (softDeleteOptions.deletedAt) indexFields.push("deletedAt");
      if (softDeleteOptions.deletedBy) indexFields.push("deletedBy");
      softDeleteOptions.indexFields = indexFields;
    }
    schema.plugin(require("mongoose-delete"), softDeleteOptions);
    schema.statics.softDelete = softDeleteFactory(_pluginOptions);
    schema.statics.rehabilitate = rehabilitateFactory(_pluginOptions);
  }

  // register Helper Functions
  schema.statics.breadHelper = function () {
    return helperFactory(schema, _pluginOptions);
  };
}
if (module) {
  module.exports = mongooseBread;
  module.exports.mongooseBread = mongooseBread;
  module.exports.MongooseBreadError = require("./MongooseBreadError");
}
var _default = mongooseBread;
exports.default = _default;