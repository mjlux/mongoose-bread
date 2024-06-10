import { PaginateModel, PipelineStage } from "mongoose";
import { MongooseBreadBrowseOptions, MongooseBreadOptions } from "../../types";

const toBreadErrorFactory = require("./toBreadErrorFactory");

function browseFactory(pluginOptions: MongooseBreadOptions) {
	const { docs, acknowledged, readCount } = pluginOptions.customLabels;
	const toBreadResult = (result: any) => ({
		...result,
		[acknowledged]: true,
		[readCount]: result[docs].length,
	});
	const toBreadError = toBreadErrorFactory({
		[docs]: [],
		[acknowledged]: false,
		[readCount]: 0,
	});

	function runAtlasSearch(model: PaginateModel<any>, options: MongooseBreadOptions & MongooseBreadBrowseOptions) {
		const { query, paginateOptions } = options;
		const { limit, projection } = paginateOptions;

		const pipeline: PipelineStage[] = [query as PipelineStage];
		if (limit) pipeline.push({ $limit: limit });
		if (projection) pipeline.push({ $project: { ...projection } });

		return model.aggregate(pipeline).then((docs: any[]) => {
			return {
				docs,
				pagination: {
					totalDocs: docs.length,
					offset: 0,
					limit: limit,
					totalPages: 1,
					page: 1,
					pagingCounter: 1,
					hasPrevPage: false,
					hasNextPage: false,
					prevPage: null,
					nextPage: null,
				},
			};
		});
	}

	return function browse(
		this: PaginateModel<any> & { countDocumentsDeleted?: () => Promise<number> },
		options: MongooseBreadBrowseOptions
	) {
		const _options: MongooseBreadOptions & MongooseBreadBrowseOptions = { ...pluginOptions, ...options };

		const { query, paginateOptions, enableAtlasSearch, atlasSearchIndex } = _options;
		const { lean, leanWithId, leanWithout_id, customLabels, customCount } = paginateOptions;

		const remove_id = !(lean && leanWithId && leanWithout_id)
			? (result: any) => result
			: (result: any) => {
					let docsKey = "docs";
					if (customLabels && customLabels.docs && typeof customLabels.docs == "string") {
						docsKey = customLabels.docs;
					}
					result[docsKey].forEach((doc: any) => {
						if (doc._id) delete doc._id;
					});
					return result;
			  };

		if (enableAtlasSearch && atlasSearchIndex) {
			return runAtlasSearch(this, _options).then(remove_id).then(toBreadResult).catch(toBreadError);
		}

		if (customCount && this[customCount] && typeof this[customCount] === "function") {
			// @ts-ignore
			paginateOptions.useCustomCountFn = () => this[customCount]();
		}

		return this.paginate(query, paginateOptions).then(remove_id).then(toBreadResult).catch(toBreadError);
	};
}

module.exports = browseFactory;
