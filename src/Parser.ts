import { Request } from "express";
import { Schema } from "mongoose";
import { ExpressQuery, MongooseBreadErrorOptions, MongooseBreadOptions } from "../types";

const { checkRequest } = require("./RequestValidator");
const MongooseBreadError = require("./MongooseBreadError");

function parseSelect(query: ExpressQuery) {
	let fields: string[] = [];
	if (query.select && typeof query.select == "string") {
		fields = Array.from(new Set(query.select.split(",")));
	}
	return fields.join(" ");
}

function parseQuery(query: ExpressQuery, options: MongooseBreadOptions, schema: Schema) {
	if (query.query) return query.query;

	return query.search ? parseSearchFilter(query, options) : parseQueryFilter(query, schema);
}

function parseSearchFilter(query: ExpressQuery, options: MongooseBreadOptions) {
	const { searchableFields } = options;
	if (!Array.isArray(searchableFields) || !searchableFields.length) {
		throw new MongooseBreadError({
			message: "Search is not availabe for this resource",
			details: 'To enable search provide an "searchableFields" Array to the plugin registration options',
			statusCode: 404,
			issuer: `MongooseBreadHelper parseSearchFilter`,
		});
	}

	if (options.enableAtlasSearch && options.atlasSearchIndex) {
		const searchQuery = {
			$search: {
				index: options.atlasSearchIndex,
				text: {
					query: query.search,
					path: searchableFields,
				},
			},
		};
		return JSON.stringify(searchQuery);
	} else if (query.search && typeof query.search == "string") {
		const searchQuery = query.search
			.split(" ")
			.reduce((fieldQueriesCollection: Record<string, any>[], searchTerm: string) => {
				const fieldQueries = searchableFields.map((field) => {
					return { [field]: { $regex: searchTerm, $options: "i" } };
				});
				return fieldQueriesCollection.concat(fieldQueries);
			}, []);

		return JSON.stringify({ $or: searchQuery });
	}
}

function parseQueryFilter(query: ExpressQuery, schema: Schema) {
	const keys = Object.keys(schema.paths);
	const sanitizedFilter = Object.keys(query).reduce(
		(filter, key) => {
			if (!keys.includes(key)) delete filter[key];
			return filter;
		},
		{ ...query }
	);
	return JSON.stringify(sanitizedFilter).replace(/\b(gt|gte|lt|lte|in|eq|ne)\b/g, (m) => `$${m}`);
}

function parseProjection(query: ExpressQuery, options: MongooseBreadOptions) {
	if (query.projection) return query.projection;
	if (!Array.isArray(options.blacklistedFields)) return {};
	return options.blacklistedFields.reduce((obj, field) => ({ ...obj, [field]: 0 }), {});
}

function parseLimit(query: ExpressQuery, options: MongooseBreadOptions) {
	const { maxPageSize, defaultPageSize } = options;
	let limit = defaultPageSize;
	if (query.limit) {
		if (typeof query.limit == "string") limit = parseInt(query.limit);
		if (typeof query.limit == "number") limit = query.limit;
	}
	return Math.min(limit, maxPageSize);
}

function parseRequestParamsId(
	request: Request,
	pluginOptions: MongooseBreadOptions,
	errorOptions: MongooseBreadErrorOptions
) {
	const { paramsIdKey } = pluginOptions;
	const { issuer } = errorOptions;
	checkRequest(request).paramsIdIsValid(paramsIdKey, issuer).bodyIsNotAnArray(issuer);
	return request.params[paramsIdKey];
}

function parseEditRequestBody(
	request: Request,
	pluginOptions: MongooseBreadOptions,
	errorOptions: MongooseBreadErrorOptions
) {
	const { bulkDocsKey } = pluginOptions;
	const { issuer } = errorOptions;

	checkRequest(request).hasBody(issuer).hasBodyProperty(bulkDocsKey, issuer).bodyPropertyIsArray(bulkDocsKey, issuer);

	// merge edit documents to single Object
	return request.body[bulkDocsKey].reduce((acc: Record<string, any>, doc: Record<string, any>) => {
		return Object.assign(acc, doc);
	}, {});
}

function parseAddRequestBody(
	request: Request,
	pluginOptions: MongooseBreadOptions,
	errorOptions: MongooseBreadErrorOptions
) {
	const { bulkDocsKey } = pluginOptions;
	const { issuer } = errorOptions;

	checkRequest(request).hasBody(issuer).hasBodyProperty(bulkDocsKey, issuer).bodyPropertyIsArray(bulkDocsKey, issuer);

	return [...request.body[bulkDocsKey]];
}

function parseRequestBodyIds(
	request: Request,
	pluginOptions: MongooseBreadOptions,
	errorOptions: MongooseBreadErrorOptions
) {
	const { bulkIdsKey } = pluginOptions;
	const { issuer } = errorOptions;

	checkRequest(request)
		.hasBody(issuer)
		.hasBodyProperty(bulkIdsKey, issuer)
		.bodyPropertyIsArray(bulkIdsKey, issuer)
		.bodyPropertyArrayIncludesOnlyObjectIds(bulkIdsKey, issuer);

	const bodyIds = [...request.body[bulkIdsKey]];
	delete request.body[bulkIdsKey];

	return bodyIds;
}

function parseRequestUserIdPath(request: Request, options: { requestUserIdPath: string }) {
	try {
		const { requestUserIdPath } = options;
		const userId = requestUserIdPath.split(".").reduce((user: Record<string, any>, key: string) => {
			if (key in user) return user[key];
			const errorMessage = `requestUserIdPathError: could not resolve request.${requestUserIdPath} - @key: ${key} - check softDeleteOptions.requestUserIdPath to match a path to userId:ObjectId`;
			throw new Error(errorMessage);
		}, request);
		return userId;
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new MongooseBreadError({
				message: error.message,
				details: JSON.stringify({ request, options }),
				issuer: `MongooseBreadHelper parseRequestUserIdPath`,
			});
		}
		throw error;
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
