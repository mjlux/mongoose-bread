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

/**
 *
 * @param {String} str
 * @returns {Boolean}
 */
function convertStringToBoolean(str) {
  return typeof str === "string" ? str === "true" || str === "1" : false;
}

/**
 *
 * @param {mongoose.Types.Schema} schema The Schema mongoose-bread is added to as plugin - provided by mongoose
 * @param {import('../index').MongooseBreadOptions} pluginOptions
 * @returns {(typeof helperMethods | typeof softDeleteHelperMethods)}
 */
function Factory(schema, pluginOptions = {}) {
  // read - single or bulk (browse)
  function createSingleReadOptions(request) {
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
  function createBulkReadOptions(request) {
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
    const paginationParams = new PaginationParameters(_request);
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
  function createSingleEditOptions(request) {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createEditOptions",
    });

    return {
      payload: request.body,
      query: { _id: idParam },
    };
  }
  function createBulkEditOptions(request) {
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
  function createSingleAddOptions(request) {
    const newDocument = request.body;
    return {
      payload: newDocument,
    };
  }
  function createBulkAddOptions(request) {
    const newDocuments = parseAddRequestBody(request, pluginOptions, {
      issuer: "createAddOptions",
    });
    return {
      bulk: true,
      payload: newDocuments,
    };
  }
  // delete - single or bulk
  function createSingleDeleteOptions(request) {
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
  function createBulkDeleteOptions(request) {
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
  function createSingleRehabilitateOptions(request) {
    const idParam = parseRequestParamsId(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });
    return {
      query: { _id: idParam, deleted: true },
    };
  }
  function createBulkRehabilitateOptions(request) {
    const bodyIds = parseRequestBodyIds(request, pluginOptions, {
      issuer: "createRehabilitateOptions",
    });

    return {
      bulk: true,
      query: { _id: { $in: [...bodyIds] }, deleted: true },
    };
  }

  /**
   * @name helperMethods
   */
  const helperMethods = {
    createBrowseOptions(request) {
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

  /**
   * @name softDeleteHelperMethods
   */
  const softDeleteHelperMethods = {
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

  return softDeleteHelperMethods;
}

module.exports = Factory;
