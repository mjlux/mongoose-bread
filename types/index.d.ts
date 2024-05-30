type MongooseBreadPlugin = {
	options?: Partial<MongooseBreadOptions>;
	(schema: Schema, pluginOptions: Partial<MongooseBreadOptions>): void;
};

type MongooseBreadOptions = {
	defaultPageSize: number;
	maxPageSize: number;
	searchableFields: string[];
	enableAtlasSearch: boolean;
	atlasSearchIndex: string;
	blacklistedFields: string[];
	paramsIdKey: string;
	bulkIdsKey: string;
	bulkDocsKey: string;
	runUpdateTransaction: boolean;
	runUpdateValidators: boolean;
	softDelete: boolean;
	softDeleteOptions: {
		overrideMethods: boolean;
		validateBeforeDelete: boolean;
		indexFields: boolean | string[];
		deletedAt: boolean;
		deletedBy: boolean | string;
		requestUserIdPath: string;
	};

	/* Inherited from mongoose-paginate-v2 */
	select: string;
	projection: Record<string, any>;
	collation: Record<string, any>;
	pagination: boolean;
	allowDiskUse: boolean;
	forceCountFn: boolean;
	useCustomCountFn: boolean;
	useEstimatedCount: boolean;
	lean: boolean;
	leanWithId: boolean; // override mongoose-paginate-v2 default - was true
	leanWithout_id: boolean; // additional mongoose-bread option to remove '_id' from lean results
	customFind: string;
	customLabels: {
		docs: string;
		limit: string;
		page: string;
		pagingCounter: string;
		hasNextPage: string;
		hasPrevPage: string;
		nextPage: string;
		prevPage: string;
		totalDocs: string;
		totalPages: string;
		meta: string;
		acknowledged: string;
		modifiedCount: string;
		deletedCount: string;
		createdCount: string;
		readCount: string;
	};
};
