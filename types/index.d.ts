import { FilterQuery, PaginateOptions } from "mongoose";

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
	customFind: "find" | "findOne" | "findDeleted" | "findOneDeleted";
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

type MongooseBreadSoftDeleteHelperOptions = {
	__breadSoftDeleteHelperOptions?: {
		issuer: string;
		customFind: string;
		customCount: "countDocuments" | "countDocumentsDeleted";
	};
};

type MongooseBreadErrorOptions = {
	message: string;
	details: string;
	issuer: string;
	statusCode: number;
	result: Record<string, any>;
};

type ExpressQuery = {
	[key: string]: undefined | string | string[] | ExpressQuery | ExpressQuery[];
};

type MongooseBreadBrowseOptions = {
	query: FilterQuery<any>;
	paginateOptions: PaginateOptions & {
		leanWithout_id: boolean;
		customCount: "countDocuments" | "countDocumentsDeleted";
	};
};

type MongooseBreadReadOptions = PaginateOptions & {
	query: FilterQuery<any>;
};

type MongooseBreadAddOptions = {
	bulk: boolean;
	payload: any;
	projection: Record<string, any>;
	populate: string | string[];
	select: string;
	sort: string;
	lean: boolean;
	limit: number;
};

type MongooseBreadRehabilitateOptions = {
	query: FilterQuery<any>;
};
type MongooseBreadSoftDeleteOptions = {
	query: FilterQuery<any>;
	userId: string;
};

type MongooseBreadDestroyOptions = {
	query: FilterQuery<any>;
	bulk: boolean;
};

type LeanOptions = {
	lean: boolean;
	leanWithId: boolean;
	leanWithout_id: boolean;
};
