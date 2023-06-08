const helperFactory = require("./factories/helperFactory");
const browseFactory = require("./factories/browseFactory");
const readFactory = require("./factories/readFactory");
const editFactory = require("./factories/editFactory");
const addFactory = require("./factories/addFactory");
const destroyFactory = require("./factories/destroyFactory");
const softDeleteFactory = require("./factories/softDeleteFactory");
const rehabilitateFactory = require("./factories/rehabilitateFactory");
const { checkSchema } = require("./RequestValidator");

const defaultPluginOptions = {
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
    requestUserIdPath: "",
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
  leanWithId: false, // override mongoose-paginate-v2 default - was true
  leanWithout_id: false, // additional mongoose-bread option to remove '_id' from lean results
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

function mongooseBread(schema, pluginOptions) {
  const mongooseBreadOptions = mongooseBread.options || {};

  const _softDeleteOptions = {
    ...defaultPluginOptions.softDeleteOptions,
    ...mongooseBreadOptions.softDeleteOptions,
    ...pluginOptions.softDeleteOptions,
  };

  const _pluginOptions = {
    ...defaultPluginOptions,
    ...mongooseBreadOptions,
    ...pluginOptions,
    softDeleteOptions: _softDeleteOptions,
  };

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
    const { softDeleteOptions } = _pluginOptions;
    softDeleteOptions.overrideMethods = true;
    if (softDeleteOptions.indexFields) {
      const { deletedBy, requestUserIdPath } = softDeleteOptions;
      const deleteByIsValid =
        deletedBy && requestUserIdPath && typeof requestUserIdPath == "string";
      softDeleteOptions.deletedBy = deleteByIsValid;
      const indexFields = ["deleted"];
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

module.exports = mongooseBread;
module.exports.mongooseBread = mongooseBread;
module.exports.MongooseBreadError = require("./MongooseBreadError");
module.exports.BreadUrlBuilder = require("./BreadUrlBuilder");
