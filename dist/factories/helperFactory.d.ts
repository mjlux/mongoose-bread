import { PluginOptions, RequestQuery } from "..";
import { FilterQuery, ObjectId, PaginateOptions, Schema } from "mongoose";
type BreadSoftDeleteHelperOptions = {
    customCount: string;
    customFind: string;
    issuer: string;
};
type PaginationOptions = PaginateOptions & PluginOptions & BreadSoftDeleteHelperOptions;
type SingleReadOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    select: string;
    customFind: string;
};
type BulkReadOptions = {
    query: FilterQuery<RequestQuery>;
    paginateOptions: PaginationOptions;
};
type SingleEditOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    payload: {};
};
type BulkEditOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
    }>;
    payload: {};
    bulk: boolean;
};
type SingleAddOptions = {
    payload: {};
};
type BulkAddOptions = {
    payload: Array<unknown>;
    bulk: boolean;
};
type SingleDeleteOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    userId: ObjectId | null;
};
type BulkDeleteOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
    }>;
    userId: ObjectId | null;
    bulk: boolean;
};
type SingleRehabilitateOptions = {
    query: FilterQuery<{
        _id: ObjectId;
        deleted: boolean;
    }>;
};
type BulkRehabilitateOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
        deleted: boolean;
    }>;
    bulk: boolean;
};
type HelperMethods = {
    createBrowseOptions: (request: any) => BulkReadOptions;
    createReadOptions: (request: any) => PaginationOptions & SingleReadOptions;
    createEditOptions: (request: any) => PaginationOptions & (SingleEditOptions | BulkEditOptions);
    createAddOptions: (request: any) => PaginationOptions & (SingleAddOptions | BulkAddOptions);
    createDeleteOptions: (request: any) => PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions);
};
type SoftDeleteHelperMethods = {
    createBrowseDeletedOptions: (request: any) => BulkReadOptions;
    createReadDeletedOptions: (request: any) => PaginationOptions & SingleReadOptions;
    createRehabilitateOptions(request: any): (request: any) => PaginationOptions & (SingleRehabilitateOptions | BulkRehabilitateOptions);
};
export default function Factory(schema: Schema, pluginOptions: PluginOptions): HelperMethods | (HelperMethods & SoftDeleteHelperMethods);
export {};
