import { Schema } from "mongoose";
import { MongooseBreadOptions, MongooseBreadSoftDeleteHelperOptions } from "../../types";
import { Request } from "express";

const { PaginationParameters } = require("mongoose-paginate-v2");
const {
  parseSelect,
  parseQuery,
  parseProjection,
  parseLimit,
  parseRequestParamsId,
  parseEditRequestBody,
  parseAddRequestBody,
  parseRequestBodyIds,
  parseRequestUserIdPath,
} = require("../Parser");

function convertStringToBoolean(str:string) {
  return typeof str === "string" ? str === "true" || str === "1" : false;
}

function Factory(schema:Schema, pluginOptions:MongooseBreadOptions) {
  // read - single or bulk (browse)
  function createSingleReadOptions(request:Request & MongooseBreadSoftDeleteHelperOptions) {
    const issuer =
      request.__breadSoftDeleteHelperOptions?.issuer || "createReadOptions";
    const customFind =
      request.__breadSoftDeleteHelperOptions?.customFind || "findOne";

    const idParam = parseRequestParamsId(request, pluginOptions, { issuer });
    const select = parseSelect(request.query || {});

    return {
      query: { _id: idParam },
      select,
      customFind,
    };
  }
  function createBulkReadOptions(request:Request & MongooseBreadSoftDeleteHelperOptions) {
    const _options = Object.assign(
      {},
      pluginOptions,
      request.__breadSoftDeleteHelperOptions
    );

    const _query = request.query ? { ...request.query } : {};

    const _request = {
      query: {
        ..._options,
        ..._query,
        limit: parseLimit(_query, _options),
        query: parseQuery(_query, _options, schema),
        projection: parseProjection(_query, _options),
        options: request.query?.options
      },
    };
    delete _request.query.options; // !!! leads to inifinite recursive loop if set
    const paginationParams = new PaginationParameters(_request);
    const query = paginationParams.getQuery();
    const paginateOptions = paginationParams.getOptions();
    paginateOptions.customFind = _options.customFind || "find";
    paginateOptions.customCount = _options.customCount || false;
    paginateOptions.leanWithout_id = _query.leanWithout_id
      ? convertStringToBoolean(_query.leanWithout_id as string)
      : _options.leanWithout_id;

    return {
      query,
      paginateOptions,
    };
  }
  // edit - single or bulk
  function createSingleEditOptions(request:Request) {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createEditOptions",
    });

    return {
      payload: request.body,
      query: { _id: idParam },
    };
  }
  function createBulkEditOptions(request:Request) {
    const bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createEditOptions",
    });
    const payload = parseEditRequestBody(request, pluginOptions, {
      issuer: "createEditOptions",
    });

    return {
      bulk: true,
      payload: payload,
      query: { _id: { $in: [...bodyIds] } },
    };
  }
  // add - single or bulk
  function createSingleAddOptions(request:Request) {
    const newDocument = request.body;
    return {
      payload: newDocument,
    };
  }
  function createBulkAddOptions(request:Request) {
    const newDocuments = parseAddRequestBody(request, pluginOptions, {
      issuer: "createAddOptions",
    });
    return {
      bulk: true,
      payload: newDocuments,
    };
  }
  // delete - single or bulk
  function createSingleDeleteOptions(request:Request) {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createDeleteOptions",
    });
    const { softDelete, softDeleteOptions } = pluginOptions;
    const { deletedBy, requestUserIdPath } = softDeleteOptions;

    const userId =
      softDelete && deletedBy && requestUserIdPath
        ? parseRequestUserIdPath(request, { requestUserIdPath })
        : null;

    return {
      query: { _id: idParam },
      userId,
    };
  }
  function createBulkDeleteOptions(request:Request) {
    const { softDelete, softDeleteOptions } = pluginOptions;
    const { deletedBy, requestUserIdPath } = softDeleteOptions;

    const bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createDeleteOptions",
    });

    const userId =
      softDelete && deletedBy && requestUserIdPath
        ? parseRequestUserIdPath(request, { requestUserIdPath })
        : null;

    return {
      bulk: true,
      userId,
      query: { _id: { $in: [...bodyIds] } },
    };
  }
  // rehabilitate - single or bulk
  function createSingleRehabilitateOptions(request:Request) {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });
    return {
      query: { _id: idParam, deleted: true },
    };
  }
  function createBulkRehabilitateOptions(request:Request) {
    const bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });

    return {
      bulk: true,
      query: { _id: { $in: [...bodyIds] }, deleted: true },
    };
  }

  const helperMethods = {
    createBrowseOptions(request:Request) {
      const options = createBulkReadOptions(request);

      return options;
    },
    createReadOptions(request:Request) {
      const { paginateOptions } = this.createBrowseOptions(request);
      const options = createSingleReadOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
    createEditOptions(request:Request) {
      const { paginateOptions } = this.createBrowseOptions(request);
      const { paramsIdKey } = pluginOptions;
      const options =
        request.params && request.params[paramsIdKey]
          ? createSingleEditOptions(request)
          : createBulkEditOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
    createAddOptions(request:Request) {
      const { bulkDocsKey } = pluginOptions;
      const { paginateOptions } = this.createBrowseOptions(request);

      const options = Object.hasOwnProperty.call(request.body, bulkDocsKey)
        ? createBulkAddOptions(request)
        : createSingleAddOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
    createDeleteOptions(request:Request) {
      const { paramsIdKey } = pluginOptions;
      const { paginateOptions } = this.createBrowseOptions(request);
      const options =
        request.params && request.params[paramsIdKey]
          ? createSingleDeleteOptions(request)
          : createBulkDeleteOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
  };

  if (!pluginOptions.softDelete) {
    return helperMethods;
  }

  const softDeleteHelperMethods = {
    ...helperMethods,
    createBrowseDeletedOptions(request:Request & MongooseBreadSoftDeleteHelperOptions) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findDeleted",
        customCount: "countDocumentsDeleted",
        issuer: "createBrowseDeletedOptions",
      };
      const options = this.createBrowseOptions(request);
      delete request.__breadSoftDeleteHelperOptions;

      return options;
    },
    createReadDeletedOptions(request:Request & MongooseBreadSoftDeleteHelperOptions) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findOneDeleted",
        customCount: "countDocumentsDeleted",
        issuer: "createReadDeletedOptions",
      };
      const options = this.createReadOptions(request);
      delete request.__breadSoftDeleteHelperOptions;

      return options;
    },
    createRehabilitateOptions(request:Request) {
      const { paramsIdKey } = pluginOptions;
      const { paginateOptions } = this.createBrowseOptions(request);
      const options =
        request.params && request.params[paramsIdKey]
          ? createSingleRehabilitateOptions(request)
          : createBulkRehabilitateOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
  };

  return softDeleteHelperMethods;
}

module.exports = Factory;
