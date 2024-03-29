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
var helperFactory = require("./factories/helperFactory"),
  browseFactory = require("./factories/browseFactory"),
  readFactory = require("./factories/readFactory"),
  editFactory = require("./factories/editFactory"),
  addFactory = require("./factories/addFactory"),
  destroyFactory = require("./factories/destroyFactory"),
  softDeleteFactory = require("./factories/softDeleteFactory"),
  rehabilitateFactory = require("./factories/rehabilitateFactory"),
  _require = require("./RequestValidator"),
  checkSchema = _require.checkSchema,
  defaultPluginOptions = {
    defaultPageSize: 10,
    maxPageSize: 100,
    searchableFields: [],
    enableAtlasSearch: !1,
    atlasSearchIndex: "",
    blacklistedFields: [],
    paramsIdKey: "id",
    bulkIdsKey: "_ids",
    bulkDocsKey: "_docs",
    runUpdateTransaction: !1,
    runUpdateValidators: !0,
    softDelete: !1,
    softDeleteOptions: {
      overrideMethods: !0,
      validateBeforeDelete: !0,
      indexFields: !0,
      deletedAt: !0,
      deletedBy: !1,
      requestUserIdPath: "",
    },
    select: "",
    projection: {},
    collation: {},
    pagination: !0,
    allowDiskUse: !1,
    forceCountFn: !1,
    useCustomCountFn: !1,
    useEstimatedCount: !1,
    lean: !1,
    leanWithId: !1,
    leanWithout_id: !1,
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
      meta: "pagination",
      acknowledged: "acknowledged",
      modifiedCount: "modifiedCount",
      deletedCount: "deletedCount",
      createdCount: "createdCount",
      readCount: "readCount",
    },
  };
function mongooseBread(a, b) {
  var c = mongooseBread.options || {},
    d = _objectSpread(
      _objectSpread(
        _objectSpread({}, defaultPluginOptions.softDeleteOptions),
        c.softDeleteOptions
      ),
      b.softDeleteOptions
    ),
    e = _objectSpread(
      _objectSpread(
        _objectSpread(_objectSpread({}, defaultPluginOptions), c),
        b
      ),
      {},
      { softDeleteOptions: d }
    ),
    f = e.searchableFields;
  if (
    (f &&
      f.length &&
      (e.searchableFields = checkSchema(a).getSearchableFieldsOfTypeString(f)),
    checkSchema(a).hasMongoosePaginateV2AlreadyInstalled("index.js"),
    a.plugin(require("mongoose-paginate-v2")),
    (a.statics.browse = browseFactory(e)),
    (a.statics.read = readFactory(e)),
    (a.statics.edit = editFactory(e)),
    (a.statics.add = addFactory(e)),
    (a.statics.destroy = destroyFactory(e)),
    e.runUpdateValidators &&
      ["findOneAndUpdate", "updateMany", "updateOne", "update"].forEach(
        function (b) {
          a.pre(b, function () {
            this.setOptions({ runValidators: !0 });
          });
        }
      ),
    e.softDelete)
  ) {
    checkSchema(a).hasMongooseDeleteAlreadyInstalled("index.js");
    var g = e.softDeleteOptions;
    if (((g.overrideMethods = !0), g.indexFields)) {
      var h = g.deletedBy,
        i = g.requestUserIdPath;
      g.deletedBy = h && i && "string" == typeof i;
      var j = ["deleted"];
      g.deletedAt && j.push("deletedAt"),
        g.deletedBy && j.push("deletedBy"),
        (g.indexFields = j);
    }
    a.plugin(require("mongoose-delete"), g),
      (a.statics.softDelete = softDeleteFactory(e)),
      (a.statics.rehabilitate = rehabilitateFactory(e));
  }
  a.statics.breadHelper = function () {
    return helperFactory(a, e);
  };
}
(module.exports = mongooseBread),
  (module.exports.mongooseBread = mongooseBread),
  (module.exports.MongooseBreadError = require("./MongooseBreadError"));
