const { checkRequest } = require("./RequestValidator");
const MongooseBreadError = require("./mongooseBreadError");

function parseSelect(query) {
  const fields = query.select
    ? Array.from(new Set([...query.select.split(",")]))
    : [];
  return fields.join(" ");
}

function parseQuery(query, options, schema) {
  if (query.query) return query.query;

  return query.search
    ? parseSearchFilter(query, options)
    : parseQueryFilter(query, schema);
}

function parseSearchFilter(query, options) {
  const { searchableFields } = options;
  if (!Array.isArray(searchableFields) || !searchableFields.length) {
    throw new MongooseBreadError({
      message: "Search is not availabe for this resource",
      details:
        'To enable search provide an "searchableFields" Array to the plugin registration options',
      statusCode: 404,
      issuer: `MongooseBreadHelper parseSearchFilter`,
    });
  }

  const searchQuery = query.search
    .split(" ")
    .reduce((fieldQueriesCollection, searchTerm) => {
      const fieldQueries = searchableFields.map((field) => {
        return { [field]: { $regex: searchTerm, $options: "i" } };
      });
      return fieldQueriesCollection.concat(fieldQueries);
    }, []);

  return JSON.stringify({ $or: searchQuery });
}

function parseQueryFilter(query, schema) {
  const keys = Object.keys(schema.paths);
  const sanitizedFilter = Object.keys(query).reduce(
    (filter, key) => {
      if (!keys.includes(key)) delete filter[key];
      return filter;
    },
    { ...query }
  );
  return JSON.stringify(sanitizedFilter).replace(
    /\b(gt|gte|lt|lte|in|eq|ne)\b/g,
    (m) => `$${m}`
  );
}

function parseProjection(query, options) {
  if (query.projection) return query.projection;
  if (!Array.isArray(options.blacklistedFields)) return {};
  return options.blacklistedFields.reduce(
    (obj, field) => ({ ...obj, [field]: 0 }),
    {}
  );
}

function parseLimit(query, options) {
  const { maxPageSize, defaultPageSize } = options;
  return query.limit
    ? Math.min(parseInt(query.limit), maxPageSize)
    : defaultPageSize;
}

function parseRequestParamsId(request, pluginOptions, options) {
  const { paramsIdKey } = pluginOptions;
  const { issuer } = options;
  checkRequest(request)
    .paramsIdIsValid(paramsIdKey, issuer)
    .bodyIsNotAnArray(issuer);
  return request.params[paramsIdKey];
}

function parseEditRequestBody(request, pluginOptions, options) {
  const { bulkDocsKey } = pluginOptions;
  const { issuer } = options;

  checkRequest(request)
    .hasBody(issuer)
    .hasBodyProperty(bulkDocsKey, issuer)
    .bodyPropertyIsArray(bulkDocsKey, issuer);

  // merge edit documents to single Object
  return request.body[bulkDocsKey].reduce((acc, doc) => {
    return Object.assign(acc, doc);
  }, {});
}

function parseAddRequestBody(request, pluginOptions, options) {
  const { bulkDocsKey } = pluginOptions;
  const { issuer } = options;

  checkRequest(request)
    .hasBody(issuer)
    .hasBodyProperty(bulkDocsKey, issuer)
    .bodyPropertyIsArray(bulkDocsKey, issuer);

  return [...request.body[bulkDocsKey]];
}

function parseRequestBodyIds(request, pluginOptions, options) {
  const { bulkIdsKey } = pluginOptions;
  const { issuer } = options;

  checkRequest(request)
    .hasBody(issuer)
    .hasBodyProperty(bulkIdsKey, issuer)
    .bodyPropertyIsArray(bulkIdsKey, issuer)
    .bodyPropertyArrayIncludesOnlyObjectIds(bulkIdsKey, issuer);

  const bodyIds = [...request.body[bulkIdsKey]];
  delete request.body[bulkIdsKey];

  return bodyIds;
}

function parseRequestUserIdPath(request, options) {
  try {
    const { requestUserIdPath } = options;
    const userId = requestUserIdPath.split(".").reduce((user, key) => {
      if (Object.hasOwnProperty.call(user, key)) {
        return user[key];
      }

      throw new Error(
        `requestUserIdPathError: could not resolve request.${requestUserIdPath} - @key: ${key} - check softDeleteOptions.requestUserIdPath to match a path to userId:ObjectId`
      );
    }, request);
    return userId;
  } catch (error) {
    throw new MongooseBreadError({
      message: error.message,
      details: JSON.stringify({ request, options }),
      issuer: `MongooseBreadHelper parseRequestUserIdPath`,
    });
  }
}

module.exports = {
  parseSelect,
  parseQuery,
  parseSearchFilter,
  parseQueryFilter,
  parseProjection,
  parseLimit,
  parseRequestParamsId,
  parseEditRequestBody,
  parseAddRequestBody,
  parseRequestBodyIds,
  parseRequestUserIdPath,
};
