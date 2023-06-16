import { ObjectId, Schema } from "mongoose";
import { checkRequest } from "./RequestValidator";
import { PluginOptions, SoftDeleteOptions } from ".";
import MongooseBreadError from "./MongooseBreadError";

type RequestQuery = {
  select: string,
  query: string,
  search: string,
  projection: ProjectionRecord,
  limit: number | string,
}

type SearchQueryRecord = Record<string, { $regex: string, $options: string }>
type ProjectionRecord = Record<string, number>
type IssuerOptions = { issuer: string }

export function parseSelect(query: RequestQuery): string {
  const fields: Array<string> = query.select
    ? Array.from(new Set([...query.select.split(",")]))
    : [];
  return fields.join(" ");
}

export function parseQuery(query: RequestQuery, options: PluginOptions, schema: Schema): string {
  if (query.query) return query.query;

  return query.search
    ? parseSearchFilter(query, options)
    : parseQueryFilter(query, schema);
}

export function parseSearchFilter(query: RequestQuery, options: PluginOptions): string {
  const { searchableFields } = options;
  if (!Array.isArray(searchableFields) || !searchableFields.length) {
    throw new MongooseBreadError({
      message: "Search is not availabe for this resource",
      details: 'To enable search provide an "searchableFields" Array to the plugin registration options',
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
    }, new Array<SearchQueryRecord>);

  return JSON.stringify({ $or: searchQuery });
}

export function parseQueryFilter(query: RequestQuery, schema: Schema): string {
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

export function parseProjection(query: RequestQuery, options: PluginOptions): ProjectionRecord {
  if (query.projection) return query.projection;
  if (!Array.isArray(options.blacklistedFields)) return {};
  return options.blacklistedFields.reduce(
    (obj, field) => ({ ...obj, [field]: 0 }),
    {}
  );
}

export function parseLimit(query: RequestQuery, options: PluginOptions): number {
  const { maxPageSize, defaultPageSize } = options;
  const _limit = (typeof query.limit == 'string') ? parseInt(query.limit) : query.limit
  return query.limit
    ? Math.min(_limit, maxPageSize)
    : defaultPageSize;
}

export function parseRequestParamsId(request, pluginOptions: PluginOptions, options: IssuerOptions) {
  const { paramsIdKey } = pluginOptions;
  const { issuer } = options;
  checkRequest(request)
    .paramsIdIsValid(paramsIdKey, issuer)
    .bodyIsNotAnArray(issuer);
  return request.params[paramsIdKey];
}

export function parseEditRequestBody(request, pluginOptions: PluginOptions, options: IssuerOptions) {
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

export function parseAddRequestBody(request, pluginOptions: PluginOptions, options: IssuerOptions) {
  const { bulkDocsKey } = pluginOptions;
  const { issuer } = options;

  checkRequest(request)
    .hasBody(issuer)
    .hasBodyProperty(bulkDocsKey, issuer)
    .bodyPropertyIsArray(bulkDocsKey, issuer);

  return [...request.body[bulkDocsKey]];
}

export function parseRequestBodyIds(request, pluginOptions: PluginOptions, options: IssuerOptions): Array<ObjectId> {
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

export function parseRequestUserIdPath(request, options: SoftDeleteOptions): ObjectId {
  try {
    const { requestUserIdPath } = options;
    const userId = requestUserIdPath.split(".").reduce((user, key) => {
      if (key in user) {
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
      statusCode: 400,
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
