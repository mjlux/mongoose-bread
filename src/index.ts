import { Schema } from "mongoose";
import { checkSchema } from "./RequestValidator.js";

import helperFactory from "./factories/helperFactory.js";
import browseFactory from "./factories/browseFactory.js";
import readFactory from "./factories/readFactory.js";
import editFactory from "./factories/editFactory.js";
import addFactory from "./factories/addFactory.js";
import destroyFactory from "./factories/destroyFactory.js";
import softDeleteFactory from "./factories/softDeleteFactory.js";
import rehabilitateFactory from "./factories/rehabilitateFactory.js";

type SoftDeleteOptions = {
  overrideMethods: boolean,
  validateBeforeDelete: boolean,
  indexFields: boolean | Array<string>,
  deletedAt: boolean,
  deletedBy: boolean,
  requestUserIdPath: string,
}

type CustomLabels = {
  docs: string,
  limit: string,
  page: string,
  pagingCounter: string,
  hasNextPage: string,
  hasPrevPage: string,
  nextPage: string,
  prevPage: string,
  totalDocs: string,
  totalPages: string,
  meta: string,
  acknowledged: string,
  modifiedCount: string,
  deletedCount: string,
  createdCount: string,
  readCount: string,
}

export type PluginOptions = {
  defaultPageSize: number,
  maxPageSize: number,
  searchableFields: Array<string>,
  blacklistedFields: Array<string>,
  paramsIdKey: string,
  bulkIdsKey: string,
  bulkDocsKey: string,
  softDelete: boolean,
  softDeleteOptions?: SoftDeleteOptions,
  select: string,
  projection: Object,
  collation: Object,
  pagination: boolean,
  allowDiskUse: boolean,
  forceCountFn: boolean,
  useCustomCountFn: boolean,
  useEstimatedCount: boolean,
  lean: boolean,
  leanWithId: boolean,
  leanWithout_id: boolean,
  customFind: "find" | "findOne" | "findDeleted" | "findOneDeleted",
  customLabels?: CustomLabels,
}

export type MongooseBread = {
  (schema:Schema, pluginOptions:PluginOptions): void;
  options?:PluginOptions
}

const defaultPluginOptions:PluginOptions = {
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

const mongooseBread:MongooseBread = function (schema, pluginOptions) {
  const mongooseBreadOptions:PluginOptions = mongooseBread.options;

  const _softDeleteOptions:SoftDeleteOptions = {
    ...defaultPluginOptions.softDeleteOptions,
    ...mongooseBreadOptions?.softDeleteOptions,
    ...pluginOptions.softDeleteOptions,
  };

  const _pluginOptions:PluginOptions = {
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
module.exports.MongooseBreadError = require("./MongooseBreadError.js");
module.exports.BreadUrlBuilder = require("./BreadUrlBuilder.js");
