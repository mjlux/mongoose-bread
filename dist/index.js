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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJoZWxwZXJGYWN0b3J5IiwicmVxdWlyZSIsImJyb3dzZUZhY3RvcnkiLCJyZWFkRmFjdG9yeSIsImVkaXRGYWN0b3J5IiwiYWRkRmFjdG9yeSIsImRlc3Ryb3lGYWN0b3J5Iiwic29mdERlbGV0ZUZhY3RvcnkiLCJyZWhhYmlsaXRhdGVGYWN0b3J5IiwiX3JlcXVpcmUiLCJjaGVja1NjaGVtYSIsImRlZmF1bHRQbHVnaW5PcHRpb25zIiwiZGVmYXVsdFBhZ2VTaXplIiwibWF4UGFnZVNpemUiLCJzZWFyY2hhYmxlRmllbGRzIiwiZW5hYmxlQXRsYXNTZWFyY2giLCJhdGxhc1NlYXJjaEluZGV4IiwiYmxhY2tsaXN0ZWRGaWVsZHMiLCJwYXJhbXNJZEtleSIsImJ1bGtJZHNLZXkiLCJidWxrRG9jc0tleSIsInJ1blVwZGF0ZVRyYW5zYWN0aW9uIiwicnVuVXBkYXRlVmFsaWRhdG9ycyIsInNvZnREZWxldGUiLCJzb2Z0RGVsZXRlT3B0aW9ucyIsIm92ZXJyaWRlTWV0aG9kcyIsInZhbGlkYXRlQmVmb3JlRGVsZXRlIiwiaW5kZXhGaWVsZHMiLCJkZWxldGVkQXQiLCJkZWxldGVkQnkiLCJyZXF1ZXN0VXNlcklkUGF0aCIsInNlbGVjdCIsInByb2plY3Rpb24iLCJjb2xsYXRpb24iLCJwYWdpbmF0aW9uIiwiYWxsb3dEaXNrVXNlIiwiZm9yY2VDb3VudEZuIiwidXNlQ3VzdG9tQ291bnRGbiIsInVzZUVzdGltYXRlZENvdW50IiwibGVhbiIsImxlYW5XaXRoSWQiLCJsZWFuV2l0aG91dF9pZCIsImN1c3RvbUZpbmQiLCJjdXN0b21MYWJlbHMiLCJkb2NzIiwibGltaXQiLCJwYWdlIiwicGFnaW5nQ291bnRlciIsImhhc05leHRQYWdlIiwiaGFzUHJldlBhZ2UiLCJuZXh0UGFnZSIsInByZXZQYWdlIiwidG90YWxEb2NzIiwidG90YWxQYWdlcyIsIm1ldGEiLCJhY2tub3dsZWRnZWQiLCJtb2RpZmllZENvdW50IiwiZGVsZXRlZENvdW50IiwiY3JlYXRlZENvdW50IiwicmVhZENvdW50IiwibW9uZ29vc2VCcmVhZCIsInNjaGVtYSIsInBsdWdpbk9wdGlvbnMiLCJtb25nb29zZUJyZWFkT3B0aW9ucyIsIm9wdGlvbnMiLCJfc29mdERlbGV0ZU9wdGlvbnMiLCJfb2JqZWN0U3ByZWFkIiwiX3BsdWdpbk9wdGlvbnMiLCJsZW5ndGgiLCJnZXRTZWFyY2hhYmxlRmllbGRzT2ZUeXBlU3RyaW5nIiwiaGFzTW9uZ29vc2VQYWdpbmF0ZVYyQWxyZWFkeUluc3RhbGxlZCIsInBsdWdpbiIsInN0YXRpY3MiLCJicm93c2UiLCJyZWFkIiwiZWRpdCIsImFkZCIsImRlc3Ryb3kiLCJmb3JFYWNoIiwibWV0aG9kIiwicHJlIiwic2V0T3B0aW9ucyIsInJ1blZhbGlkYXRvcnMiLCJoYXNNb25nb29zZURlbGV0ZUFscmVhZHlJbnN0YWxsZWQiLCJwdXNoIiwicmVoYWJpbGl0YXRlIiwiYnJlYWRIZWxwZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiTW9uZ29vc2VCcmVhZEVycm9yIl0sInNvdXJjZXMiOlsiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhlbHBlckZhY3RvcnkgPSByZXF1aXJlKFwiLi9mYWN0b3JpZXMvaGVscGVyRmFjdG9yeVwiKTtcbmNvbnN0IGJyb3dzZUZhY3RvcnkgPSByZXF1aXJlKFwiLi9mYWN0b3JpZXMvYnJvd3NlRmFjdG9yeVwiKTtcbmNvbnN0IHJlYWRGYWN0b3J5ID0gcmVxdWlyZShcIi4vZmFjdG9yaWVzL3JlYWRGYWN0b3J5XCIpO1xuY29uc3QgZWRpdEZhY3RvcnkgPSByZXF1aXJlKFwiLi9mYWN0b3JpZXMvZWRpdEZhY3RvcnlcIik7XG5jb25zdCBhZGRGYWN0b3J5ID0gcmVxdWlyZShcIi4vZmFjdG9yaWVzL2FkZEZhY3RvcnlcIik7XG5jb25zdCBkZXN0cm95RmFjdG9yeSA9IHJlcXVpcmUoXCIuL2ZhY3Rvcmllcy9kZXN0cm95RmFjdG9yeVwiKTtcbmNvbnN0IHNvZnREZWxldGVGYWN0b3J5ID0gcmVxdWlyZShcIi4vZmFjdG9yaWVzL3NvZnREZWxldGVGYWN0b3J5XCIpO1xuY29uc3QgcmVoYWJpbGl0YXRlRmFjdG9yeSA9IHJlcXVpcmUoXCIuL2ZhY3Rvcmllcy9yZWhhYmlsaXRhdGVGYWN0b3J5XCIpO1xuY29uc3QgeyBjaGVja1NjaGVtYSB9ID0gcmVxdWlyZShcIi4vUmVxdWVzdFZhbGlkYXRvclwiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7dHlwZW9mIGRlZmF1bHRQbHVnaW5PcHRpb25zfSBNb25nb29zZUJyZWFkT3B0aW9uc1xuICovXG5cbi8qKlxuICogQG5hbWUgZGVmYXVsdFBsdWdpbk9wdGlvbnNcbiAqL1xuY29uc3QgZGVmYXVsdFBsdWdpbk9wdGlvbnMgPSB7XG4gIGRlZmF1bHRQYWdlU2l6ZTogMTAsXG4gIG1heFBhZ2VTaXplOiAxMDAsXG4gIHNlYXJjaGFibGVGaWVsZHM6IFtdLFxuICBlbmFibGVBdGxhc1NlYXJjaDogZmFsc2UsXG4gIGF0bGFzU2VhcmNoSW5kZXg6IFwiXCIsXG4gIGJsYWNrbGlzdGVkRmllbGRzOiBbXSxcbiAgcGFyYW1zSWRLZXk6IFwiaWRcIixcbiAgYnVsa0lkc0tleTogXCJfaWRzXCIsXG4gIGJ1bGtEb2NzS2V5OiBcIl9kb2NzXCIsXG4gIHJ1blVwZGF0ZVRyYW5zYWN0aW9uOiBmYWxzZSxcbiAgcnVuVXBkYXRlVmFsaWRhdG9yczogdHJ1ZSxcbiAgc29mdERlbGV0ZTogZmFsc2UsXG4gIHNvZnREZWxldGVPcHRpb25zOiB7XG4gICAgb3ZlcnJpZGVNZXRob2RzOiB0cnVlLFxuICAgIHZhbGlkYXRlQmVmb3JlRGVsZXRlOiB0cnVlLFxuICAgIGluZGV4RmllbGRzOiB0cnVlLFxuICAgIGRlbGV0ZWRBdDogdHJ1ZSxcbiAgICBkZWxldGVkQnk6IGZhbHNlLFxuICAgIHJlcXVlc3RVc2VySWRQYXRoOiBcIlwiLFxuICB9LFxuXG4gIC8qIEluaGVyaXRlZCBmcm9tIG1vbmdvb3NlLXBhZ2luYXRlLXYyICovXG4gIHNlbGVjdDogXCJcIixcbiAgcHJvamVjdGlvbjoge30sXG4gIGNvbGxhdGlvbjoge30sXG4gIHBhZ2luYXRpb246IHRydWUsXG4gIGFsbG93RGlza1VzZTogZmFsc2UsXG4gIGZvcmNlQ291bnRGbjogZmFsc2UsXG4gIHVzZUN1c3RvbUNvdW50Rm46IGZhbHNlLFxuICB1c2VFc3RpbWF0ZWRDb3VudDogZmFsc2UsXG4gIGxlYW46IGZhbHNlLFxuICBsZWFuV2l0aElkOiBmYWxzZSwgLy8gb3ZlcnJpZGUgbW9uZ29vc2UtcGFnaW5hdGUtdjIgZGVmYXVsdCAtIHdhcyB0cnVlXG4gIGxlYW5XaXRob3V0X2lkOiBmYWxzZSwgLy8gYWRkaXRpb25hbCBtb25nb29zZS1icmVhZCBvcHRpb24gdG8gcmVtb3ZlICdfaWQnIGZyb20gbGVhbiByZXN1bHRzXG4gIGN1c3RvbUZpbmQ6IFwiZmluZFwiLFxuICBjdXN0b21MYWJlbHM6IHtcbiAgICBkb2NzOiBcImRvY3NcIixcbiAgICBsaW1pdDogXCJsaW1pdFwiLFxuICAgIHBhZ2U6IFwicGFnZVwiLFxuICAgIHBhZ2luZ0NvdW50ZXI6IFwicGFnaW5nQ291bnRlclwiLFxuICAgIGhhc05leHRQYWdlOiBcImhhc05leHRQYWdlXCIsXG4gICAgaGFzUHJldlBhZ2U6IFwiaGFzUHJldlBhZ2VcIixcbiAgICBuZXh0UGFnZTogXCJuZXh0UGFnZVwiLFxuICAgIHByZXZQYWdlOiBcInByZXZQYWdlXCIsXG4gICAgdG90YWxEb2NzOiBcInRvdGFsRG9jc1wiLFxuICAgIHRvdGFsUGFnZXM6IFwidG90YWxQYWdlc1wiLFxuICAgIG1ldGE6IFwicGFnaW5hdGlvblwiLFxuICAgIGFja25vd2xlZGdlZDogXCJhY2tub3dsZWRnZWRcIixcbiAgICBtb2RpZmllZENvdW50OiBcIm1vZGlmaWVkQ291bnRcIixcbiAgICBkZWxldGVkQ291bnQ6IFwiZGVsZXRlZENvdW50XCIsXG4gICAgY3JlYXRlZENvdW50OiBcImNyZWF0ZWRDb3VudFwiLFxuICAgIHJlYWRDb3VudDogXCJyZWFkQ291bnRcIixcbiAgfSxcbn07XG5cbi8qKlxuICogTWFpbiBQbHVnaW4gZnVuY3Rpb24gdG8gdXNlIHdpdGggU2NoZW1hLnBsdWdpbigpXG4gKiBAcGFyYW0ge21vbmdvb3NlLlR5cGVzLlNjaGVtYX0gc2NoZW1hIFRoZSBTY2hlbWEgbW9uZ29vc2UtYnJlYWQgaXMgYWRkZWQgdG8gYXMgcGx1Z2luIC0gcHJvdmlkZWQgYnkgbW9uZ29vc2VcbiAqIEBwYXJhbSB7TW9uZ29vc2VCcmVhZE9wdGlvbnN9IHBsdWdpbk9wdGlvbnMgQ29uZmlnIG9mIG1vbmdvb3NlLWJyZWFkIHBsdWdpblxuICovXG5mdW5jdGlvbiBtb25nb29zZUJyZWFkKHNjaGVtYSwgcGx1Z2luT3B0aW9ucykge1xuICAvKipcbiAgICogQHR5cGUge01vbmdvb3NlQnJlYWRPcHRpb25zfVxuICAgKi9cbiAgY29uc3QgbW9uZ29vc2VCcmVhZE9wdGlvbnMgPSBtb25nb29zZUJyZWFkLm9wdGlvbnMgfHwge307XG5cbiAgY29uc3QgX3NvZnREZWxldGVPcHRpb25zID0ge1xuICAgIC4uLmRlZmF1bHRQbHVnaW5PcHRpb25zLnNvZnREZWxldGVPcHRpb25zLFxuICAgIC4uLm1vbmdvb3NlQnJlYWRPcHRpb25zLnNvZnREZWxldGVPcHRpb25zLFxuICAgIC4uLnBsdWdpbk9wdGlvbnMuc29mdERlbGV0ZU9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3QgX3BsdWdpbk9wdGlvbnMgPSB7XG4gICAgLi4uZGVmYXVsdFBsdWdpbk9wdGlvbnMsXG4gICAgLi4ubW9uZ29vc2VCcmVhZE9wdGlvbnMsXG4gICAgLi4ucGx1Z2luT3B0aW9ucyxcbiAgICBzb2Z0RGVsZXRlT3B0aW9uczogX3NvZnREZWxldGVPcHRpb25zLFxuICB9O1xuXG4gIC8vIHZhbGlkYXRlIHNlYXJjaGFibGVGaWVsZHMgLSBpZiBlbmFibGVkXG4gIGNvbnN0IHsgc2VhcmNoYWJsZUZpZWxkcyB9ID0gX3BsdWdpbk9wdGlvbnM7XG4gIGlmIChzZWFyY2hhYmxlRmllbGRzICYmIHNlYXJjaGFibGVGaWVsZHMubGVuZ3RoKSB7XG4gICAgX3BsdWdpbk9wdGlvbnMuc2VhcmNoYWJsZUZpZWxkcyA9XG4gICAgICBjaGVja1NjaGVtYShzY2hlbWEpLmdldFNlYXJjaGFibGVGaWVsZHNPZlR5cGVTdHJpbmcoc2VhcmNoYWJsZUZpZWxkcyk7XG4gIH1cbiAgLy8gcmVnaXN0ZXIgbW9uZ29vc2UtcGFnaW5hdGUtdjIgZGVwZW5kZW5jeVxuICBjaGVja1NjaGVtYShzY2hlbWEpLmhhc01vbmdvb3NlUGFnaW5hdGVWMkFscmVhZHlJbnN0YWxsZWQoXCJpbmRleC5qc1wiKTtcbiAgc2NoZW1hLnBsdWdpbihyZXF1aXJlKFwibW9uZ29vc2UtcGFnaW5hdGUtdjJcIikpO1xuXG4gIC8vIHJlZ2lzdGVyIFBsdWdpbiBtZXRob2RzXG4gIHNjaGVtYS5zdGF0aWNzLmJyb3dzZSA9IGJyb3dzZUZhY3RvcnkoX3BsdWdpbk9wdGlvbnMpO1xuICBzY2hlbWEuc3RhdGljcy5yZWFkID0gcmVhZEZhY3RvcnkoX3BsdWdpbk9wdGlvbnMpO1xuICBzY2hlbWEuc3RhdGljcy5lZGl0ID0gZWRpdEZhY3RvcnkoX3BsdWdpbk9wdGlvbnMpO1xuICBzY2hlbWEuc3RhdGljcy5hZGQgPSBhZGRGYWN0b3J5KF9wbHVnaW5PcHRpb25zKTtcbiAgc2NoZW1hLnN0YXRpY3MuZGVzdHJveSA9IGRlc3Ryb3lGYWN0b3J5KF9wbHVnaW5PcHRpb25zKTtcblxuICAvLyBhZGQgcnVuVmFsaWRhdG9ycyBvcHRpb24gdG8gdXBkYXRlIGhvb2tzXG4gIGlmIChfcGx1Z2luT3B0aW9ucy5ydW5VcGRhdGVWYWxpZGF0b3JzKSB7XG4gICAgW1wiZmluZE9uZUFuZFVwZGF0ZVwiLCBcInVwZGF0ZU1hbnlcIiwgXCJ1cGRhdGVPbmVcIiwgXCJ1cGRhdGVcIl0uZm9yRWFjaChcbiAgICAgIChtZXRob2QpID0+IHtcbiAgICAgICAgc2NoZW1hLnByZShtZXRob2QsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnNldE9wdGlvbnMoeyBydW5WYWxpZGF0b3JzOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgb3B0aW9uYWwgbW9uZ29vc2UtZGVsZXRlIGRlcGVuZGVuY3lcbiAgaWYgKF9wbHVnaW5PcHRpb25zLnNvZnREZWxldGUpIHtcbiAgICBjaGVja1NjaGVtYShzY2hlbWEpLmhhc01vbmdvb3NlRGVsZXRlQWxyZWFkeUluc3RhbGxlZChcImluZGV4LmpzXCIpO1xuICAgIGNvbnN0IHsgc29mdERlbGV0ZU9wdGlvbnMgfSA9IF9wbHVnaW5PcHRpb25zO1xuICAgIHNvZnREZWxldGVPcHRpb25zLm92ZXJyaWRlTWV0aG9kcyA9IHRydWU7XG4gICAgaWYgKHNvZnREZWxldGVPcHRpb25zLmluZGV4RmllbGRzKSB7XG4gICAgICBjb25zdCB7IGRlbGV0ZWRCeSwgcmVxdWVzdFVzZXJJZFBhdGggfSA9IHNvZnREZWxldGVPcHRpb25zO1xuICAgICAgY29uc3QgZGVsZXRlQnlJc1ZhbGlkID1cbiAgICAgICAgZGVsZXRlZEJ5ICYmIHJlcXVlc3RVc2VySWRQYXRoICYmIHR5cGVvZiByZXF1ZXN0VXNlcklkUGF0aCA9PSBcInN0cmluZ1wiO1xuICAgICAgc29mdERlbGV0ZU9wdGlvbnMuZGVsZXRlZEJ5ID0gZGVsZXRlQnlJc1ZhbGlkO1xuICAgICAgY29uc3QgaW5kZXhGaWVsZHMgPSBbXCJkZWxldGVkXCJdO1xuICAgICAgaWYgKHNvZnREZWxldGVPcHRpb25zLmRlbGV0ZWRBdCkgaW5kZXhGaWVsZHMucHVzaChcImRlbGV0ZWRBdFwiKTtcbiAgICAgIGlmIChzb2Z0RGVsZXRlT3B0aW9ucy5kZWxldGVkQnkpIGluZGV4RmllbGRzLnB1c2goXCJkZWxldGVkQnlcIik7XG4gICAgICBzb2Z0RGVsZXRlT3B0aW9ucy5pbmRleEZpZWxkcyA9IGluZGV4RmllbGRzO1xuICAgIH1cbiAgICBzY2hlbWEucGx1Z2luKHJlcXVpcmUoXCJtb25nb29zZS1kZWxldGVcIiksIHNvZnREZWxldGVPcHRpb25zKTtcbiAgICBzY2hlbWEuc3RhdGljcy5zb2Z0RGVsZXRlID0gc29mdERlbGV0ZUZhY3RvcnkoX3BsdWdpbk9wdGlvbnMpO1xuICAgIHNjaGVtYS5zdGF0aWNzLnJlaGFiaWxpdGF0ZSA9IHJlaGFiaWxpdGF0ZUZhY3RvcnkoX3BsdWdpbk9wdGlvbnMpO1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgSGVscGVyIEZ1bmN0aW9uc1xuICBzY2hlbWEuc3RhdGljcy5icmVhZEhlbHBlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gaGVscGVyRmFjdG9yeShzY2hlbWEsIF9wbHVnaW5PcHRpb25zKTtcbiAgfTtcbn1cblxuLyoqIEBtb2R1bGUgKi9cbm1vZHVsZS5leHBvcnRzID0gbW9uZ29vc2VCcmVhZDtcbm1vZHVsZS5leHBvcnRzLm1vbmdvb3NlQnJlYWQgPSBtb25nb29zZUJyZWFkO1xubW9kdWxlLmV4cG9ydHMuTW9uZ29vc2VCcmVhZEVycm9yID0gcmVxdWlyZShcIi4vTW9uZ29vc2VCcmVhZEVycm9yXCIpO1xuIl0sIm1hcHBpbmdzIjoibW5DQUFNLENBQUFBLGFBQWEsQ0FBR0MsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQ3BEQyxhQUFhLENBQUdELE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUNwREUsV0FBVyxDQUFHRixPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FDaERHLFdBQVcsQ0FBR0gsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQ2hESSxVQUFVLENBQUdKLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUM5Q0ssY0FBYyxDQUFHTCxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FDdERNLGlCQUFpQixDQUFHTixPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FDNURPLG1CQUFtQixDQUFHUCxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQVEsUUFBQSxDQUM5Q1IsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQTdDUyxXQUFXLENBQUFELFFBQUEsQ0FBWEMsV0FBVyxDQVNiQyxvQkFBb0IsQ0FBRyxDQUMzQkMsZUFBZSxDQUFFLEVBQUUsQ0FDbkJDLFdBQVcsQ0FBRSxHQUFHLENBQ2hCQyxnQkFBZ0IsQ0FBRSxFQUFFLENBQ3BCQyxpQkFBaUIsR0FBTyxDQUN4QkMsZ0JBQWdCLENBQUUsRUFBRSxDQUNwQkMsaUJBQWlCLENBQUUsRUFBRSxDQUNyQkMsV0FBVyxDQUFFLElBQUksQ0FDakJDLFVBQVUsQ0FBRSxNQUFNLENBQ2xCQyxXQUFXLENBQUUsT0FBTyxDQUNwQkMsb0JBQW9CLEdBQU8sQ0FDM0JDLG1CQUFtQixHQUFNLENBQ3pCQyxVQUFVLEdBQU8sQ0FDakJDLGlCQUFpQixDQUFFLENBQ2pCQyxlQUFlLEdBQU0sQ0FDckJDLG9CQUFvQixHQUFNLENBQzFCQyxXQUFXLEdBQU0sQ0FDakJDLFNBQVMsR0FBTSxDQUNmQyxTQUFTLEdBQU8sQ0FDaEJDLGlCQUFpQixDQUFFLEVBQ3JCLENBQUMsQ0FHREMsTUFBTSxDQUFFLEVBQUUsQ0FDVkMsVUFBVSxDQUFFLENBQUMsQ0FBQyxDQUNkQyxTQUFTLENBQUUsQ0FBQyxDQUFDLENBQ2JDLFVBQVUsR0FBTSxDQUNoQkMsWUFBWSxHQUFPLENBQ25CQyxZQUFZLEdBQU8sQ0FDbkJDLGdCQUFnQixHQUFPLENBQ3ZCQyxpQkFBaUIsR0FBTyxDQUN4QkMsSUFBSSxHQUFPLENBQ1hDLFVBQVUsR0FBTyxDQUNqQkMsY0FBYyxHQUFPLENBQ3JCQyxVQUFVLENBQUUsTUFBTSxDQUNsQkMsWUFBWSxDQUFFLENBQ1pDLElBQUksQ0FBRSxNQUFNLENBQ1pDLEtBQUssQ0FBRSxPQUFPLENBQ2RDLElBQUksQ0FBRSxNQUFNLENBQ1pDLGFBQWEsQ0FBRSxlQUFlLENBQzlCQyxXQUFXLENBQUUsYUFBYSxDQUMxQkMsV0FBVyxDQUFFLGFBQWEsQ0FDMUJDLFFBQVEsQ0FBRSxVQUFVLENBQ3BCQyxRQUFRLENBQUUsVUFBVSxDQUNwQkMsU0FBUyxDQUFFLFdBQVcsQ0FDdEJDLFVBQVUsQ0FBRSxZQUFZLENBQ3hCQyxJQUFJLENBQUUsWUFBWSxDQUNsQkMsWUFBWSxDQUFFLGNBQWMsQ0FDNUJDLGFBQWEsQ0FBRSxlQUFlLENBQzlCQyxZQUFZLENBQUUsY0FBYyxDQUM1QkMsWUFBWSxDQUFFLGNBQWMsQ0FDNUJDLFNBQVMsQ0FBRSxXQUNiLENBQ0YsQ0FBQyxDQU9ELFFBQVMsQ0FBQUMsYUFBYUEsQ0FBQ0MsQ0FBTSxDQUFFQyxDQUFhLENBQUUsSUFJdEMsQ0FBQUMsQ0FBb0IsQ0FBR0gsYUFBYSxDQUFDSSxPQUFPLEVBQUksQ0FBQyxDQUFDLENBRWxEQyxDQUFrQixDQUFBQyxhQUFBLENBQUFBLGFBQUEsQ0FBQUEsYUFBQSxJQUNuQnZELG9CQUFvQixDQUFDYSxpQkFBaUIsRUFDdEN1QyxDQUFvQixDQUFDdkMsaUJBQWlCLEVBQ3RDc0MsQ0FBYSxDQUFDdEMsaUJBQWlCLENBQ25DLENBRUsyQyxDQUFjLENBQUFELGFBQUEsQ0FBQUEsYUFBQSxDQUFBQSxhQUFBLENBQUFBLGFBQUEsSUFDZnZELG9CQUFvQixFQUNwQm9ELENBQW9CLEVBQ3BCRCxDQUFhLE1BQ2hCdEMsaUJBQWlCLENBQUV5QyxDQUFrQixFQUN0QyxDQUdPbkQsQ0FBZ0IsQ0FBS3FELENBQWMsQ0FBbkNyRCxnQkFBZ0IsQ0E0QnhCLEdBM0JJQSxDQUFnQixFQUFJQSxDQUFnQixDQUFDc0QsTUFBTSxHQUM3Q0QsQ0FBYyxDQUFDckQsZ0JBQWdCLENBQzdCSixXQUFXLENBQUNtRCxDQUFNLENBQUMsQ0FBQ1EsK0JBQStCLENBQUN2RCxDQUFnQixDQUFDLEVBR3pFSixXQUFXLENBQUNtRCxDQUFNLENBQUMsQ0FBQ1MscUNBQXFDLENBQUMsVUFBVSxDQUFDLENBQ3JFVCxDQUFNLENBQUNVLE1BQU0sQ0FBQ3RFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBRzlDNEQsQ0FBTSxDQUFDVyxPQUFPLENBQUNDLE1BQU0sQ0FBR3ZFLGFBQWEsQ0FBQ2lFLENBQWMsQ0FBQyxDQUNyRE4sQ0FBTSxDQUFDVyxPQUFPLENBQUNFLElBQUksQ0FBR3ZFLFdBQVcsQ0FBQ2dFLENBQWMsQ0FBQyxDQUNqRE4sQ0FBTSxDQUFDVyxPQUFPLENBQUNHLElBQUksQ0FBR3ZFLFdBQVcsQ0FBQytELENBQWMsQ0FBQyxDQUNqRE4sQ0FBTSxDQUFDVyxPQUFPLENBQUNJLEdBQUcsQ0FBR3ZFLFVBQVUsQ0FBQzhELENBQWMsQ0FBQyxDQUMvQ04sQ0FBTSxDQUFDVyxPQUFPLENBQUNLLE9BQU8sQ0FBR3ZFLGNBQWMsQ0FBQzZELENBQWMsQ0FBQyxDQUduREEsQ0FBYyxDQUFDN0MsbUJBQW1CLEVBQ3BDLENBQUMsa0JBQWtCLENBQUUsWUFBWSxDQUFFLFdBQVcsQ0FBRSxRQUFRLENBQUMsQ0FBQ3dELE9BQU8sQ0FDL0QsU0FBQ0MsQ0FBTSxDQUFLLENBQ1ZsQixDQUFNLENBQUNtQixHQUFHLENBQUNELENBQU0sQ0FBRSxVQUFZLENBQzdCLElBQUksQ0FBQ0UsVUFBVSxDQUFDLENBQUVDLGFBQWEsR0FBTyxDQUFDLENBQ3pDLENBQUMsQ0FDSCxDQUNGLENBQUMsQ0FJQ2YsQ0FBYyxDQUFDNUMsVUFBVSxDQUFFLENBQzdCYixXQUFXLENBQUNtRCxDQUFNLENBQUMsQ0FBQ3NCLGlDQUFpQyxDQUFDLFVBQVUsQ0FBQyxDQUNqRSxHQUFRLENBQUEzRCxDQUFpQixDQUFLMkMsQ0FBYyxDQUFwQzNDLGlCQUFpQixDQUV6QixHQURBQSxDQUFpQixDQUFDQyxlQUFlLEdBQU8sQ0FDcENELENBQWlCLENBQUNHLFdBQVcsQ0FBRSxJQUN6QixDQUFBRSxDQUFTLENBQXdCTCxDQUFpQixDQUFsREssU0FBUyxDQUFFQyxDQUFpQixDQUFLTixDQUFpQixDQUF2Q00saUJBQWlCLENBR3BDTixDQUFpQixDQUFDSyxTQUFTLENBRHpCQSxDQUFTLEVBQUlDLENBQWlCLEVBQWdDLFFBQVEsRUFBcEMsTUFBTyxDQUFBQSxDQUNFLENBQzdDLEdBQU0sQ0FBQUgsQ0FBVyxDQUFHLENBQUMsU0FBUyxDQUFDLENBQzNCSCxDQUFpQixDQUFDSSxTQUFTLEVBQUVELENBQVcsQ0FBQ3lELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDMUQ1RCxDQUFpQixDQUFDSyxTQUFTLEVBQUVGLENBQVcsQ0FBQ3lELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDOUQ1RCxDQUFpQixDQUFDRyxXQUFXLENBQUdBLENBQ2xDLENBQ0FrQyxDQUFNLENBQUNVLE1BQU0sQ0FBQ3RFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFFdUIsQ0FBaUIsQ0FBQyxDQUM1RHFDLENBQU0sQ0FBQ1csT0FBTyxDQUFDakQsVUFBVSxDQUFHaEIsaUJBQWlCLENBQUM0RCxDQUFjLENBQUMsQ0FDN0ROLENBQU0sQ0FBQ1csT0FBTyxDQUFDYSxZQUFZLENBQUc3RSxtQkFBbUIsQ0FBQzJELENBQWMsQ0FDbEUsQ0FHQU4sQ0FBTSxDQUFDVyxPQUFPLENBQUNjLFdBQVcsQ0FBRyxVQUFZLENBQ3ZDLE1BQU8sQ0FBQXRGLGFBQWEsQ0FBQzZELENBQU0sQ0FBRU0sQ0FBYyxDQUM3QyxDQUNGLENBR0FvQixNQUFNLENBQUNDLE9BQU8sQ0FBRzVCLGFBQWEsQ0FDOUIyQixNQUFNLENBQUNDLE9BQU8sQ0FBQzVCLGFBQWEsQ0FBR0EsYUFBYSxDQUM1QzJCLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDQyxrQkFBa0IsQ0FBR3hGLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==
