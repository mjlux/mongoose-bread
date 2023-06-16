import { PaginationParameters } from "mongoose-paginate-v2";
import {
  parseSelect,
  parseQuery,
  parseProjection,
  parseLimit,
  parseRequestParamsId,
  parseEditRequestBody,
  parseAddRequestBody,
  parseRequestBodyIds,
  parseRequestUserIdPath,
} from "../Parser";
import { PluginOptions, RequestQuery } from "..";
import { FilterQuery, ObjectId, PaginateOptions, Schema } from "mongoose";

type BreadSoftDeleteHelperOptions = {
  customCount: string,
  customFind: string,
  issuer: string
}

type PaginationOptions = PaginateOptions & PluginOptions & BreadSoftDeleteHelperOptions

type SingleReadOptions = {
  query: FilterQuery<{ _id: ObjectId }>,
  select: string,
  customFind: string,
}
type BulkReadOptions = {
  query: FilterQuery<RequestQuery>,
  paginateOptions: PaginationOptions,
}
type SingleEditOptions = {
  query: FilterQuery<{ _id: ObjectId }>,
  payload: {},
}
type BulkEditOptions = {
  query: FilterQuery<{ _id: { $in: Array<ObjectId> } }>,
  payload: {},
  bulk: boolean,
}
type SingleAddOptions = {
  payload: {},
}
type BulkAddOptions = {
  payload: Array<unknown>,
  bulk: boolean,
}
type SingleDeleteOptions = {
  query: FilterQuery<{ _id: ObjectId }>,
  userId: ObjectId | null,
}
type BulkDeleteOptions = {
  query: FilterQuery<{ _id: { $in: Array<ObjectId> } }>,
  userId: ObjectId | null,
  bulk: boolean,
}
type SingleRehabilitateOptions = {
  query: FilterQuery<{ _id: ObjectId, deleted: boolean }>,
}
type BulkRehabilitateOptions = {
  query: FilterQuery<{ _id: { $in: Array<ObjectId> }, deleted: boolean }>,
  bulk: boolean,
}

type HelperMethods = {
  createBrowseOptions: (request) => BulkReadOptions,
  createReadOptions: (request) => PaginationOptions & SingleReadOptions,
  createEditOptions: (request) => PaginationOptions & (SingleEditOptions | BulkEditOptions),

  createAddOptions: (request) => PaginationOptions & (SingleAddOptions | BulkAddOptions),
  createDeleteOptions: (request) => PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions),
}

type SoftDeleteHelperMethods = {
  createBrowseDeletedOptions: (request) => BulkReadOptions,
  createReadDeletedOptions: (request) => PaginationOptions & SingleReadOptions,
  createRehabilitateOptions(request): (request) => PaginationOptions & (SingleRehabilitateOptions | BulkRehabilitateOptions),
};

function convertStringToBoolean(str: string): boolean {
  return (typeof str === "string") ? (str === "true" || str === "1") : false;
}

export default function Factory(schema: Schema, pluginOptions: PluginOptions): HelperMethods | (HelperMethods & SoftDeleteHelperMethods) {
  // read - single or bulk (browse)
  function createSingleReadOptions(request):SingleReadOptions {
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
  function createBulkReadOptions(request): BulkReadOptions {
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
      },
    };
    delete _request.query.options; // !!! leads to inifinite recursive loop if set
    const paginationParams = new PaginationParameters<unknown, PaginationOptions>(_request);
    const query = paginationParams.getQuery();
    const paginateOptions = paginationParams.getOptions();
    paginateOptions.customFind = _options.customFind || "find";
    paginateOptions.customCount = _options.customCount || false;
    paginateOptions.leanWithout_id = _query.leanWithout_id
      ? convertStringToBoolean(_query.leanWithout_id)
      : _options.leanWithout_id;

    return {
      query,
      paginateOptions,
    };
  }
  // edit - single or bulk
  function createSingleEditOptions(request):SingleEditOptions {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createEditOptions",
    });

    return {
      payload: request.body,
      query: { _id: idParam },
    };
  }
  function createBulkEditOptions(request):BulkEditOptions {
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
  function createSingleAddOptions(request):SingleAddOptions {
    const newDocument = request.body;
    return {
      payload: newDocument,
    };
  }
  function createBulkAddOptions(request):BulkAddOptions {
    const newDocuments = parseAddRequestBody(request, pluginOptions, {
      issuer: "createAddOptions",
    });
    return {
      bulk: true,
      payload: newDocuments,
    };
  }
  // delete - single or bulk
  function createSingleDeleteOptions(request):SingleDeleteOptions {
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
  function createBulkDeleteOptions(request):BulkDeleteOptions {
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
  function createSingleRehabilitateOptions(request):SingleRehabilitateOptions {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });
    return {
      query: { _id: idParam, deleted: true },
    };
  }
  function createBulkRehabilitateOptions(request):BulkRehabilitateOptions {
    const bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });

    return {
      bulk: true,
      query: { _id: { $in: [...bodyIds] }, deleted: true },
    };
  }

  const helperMethods: HelperMethods = {
    createBrowseOptions(request){
      const options = createBulkReadOptions(request);

      return options;
    },
    createReadOptions(request) {
      const { paginateOptions } = this.createBrowseOptions(request);
      const options = createSingleReadOptions(request);

      return {
        ...paginateOptions,
        ...options,
      };
    },
    createEditOptions(request) {
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
    createAddOptions(request) {
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
    createDeleteOptions(request) {
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

  return {
    ...helperMethods,
    createBrowseDeletedOptions(request) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findDeleted",
        customCount: "countDocumentsDeleted",
        issuer: "createBrowseDeletedOptions",
      };
      const options = this.createBrowseOptions(request);
      delete request.__breadSoftDeleteHelperOptions;

      return options;
    },
    createReadDeletedOptions(request) {
      request.__breadSoftDeleteHelperOptions = {
        customFind: "findOneDeleted",
        // no "customCount" necessary - findOneDeleted always yields 1 result
        issuer: "createReadDeletedOptions",
      };
      const options = this.createReadOptions(request);
      delete request.__breadSoftDeleteHelperOptions;

      return options;
    },
    createRehabilitateOptions(request) {
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
}

module.exports = Factory;
