import { PluginOptions, RequestQuery } from "..";
import { FilterQuery, ObjectId, PaginateOptions, Schema } from "mongoose";
type BreadSoftDeleteHelperOptions = {
    customCount: string;
    customFind: string;
    issuer: string;
};
export type PaginationOptions = PaginateOptions & PluginOptions & BreadSoftDeleteHelperOptions;
export type SingleReadOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    select: string;
    customFind: string;
};
export type BulkReadOptions = {
    query: FilterQuery<RequestQuery>;
    paginateOptions: PaginationOptions;
};
export type SingleEditOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    payload: {};
    bulk?: boolean;
};
export type BulkEditOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
    }>;
    payload: {};
    bulk: boolean;
};
export type SingleAddOptions = {
    payload: {};
    bulk?: boolean;
};
export type BulkAddOptions = {
    payload: Array<unknown>;
    bulk: boolean;
};
export type SingleDeleteOptions = {
    query: FilterQuery<{
        _id: ObjectId;
    }>;
    userId: ObjectId | null;
    bulk?: boolean;
};
export type BulkDeleteOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
    }>;
    userId: ObjectId | null;
    bulk: boolean;
};
export type SingleRehabilitateOptions = {
    query: FilterQuery<{
        _id: ObjectId;
        deleted: boolean;
    }>;
    bulk?: boolean;
};
export type BulkRehabilitateOptions = {
    query: FilterQuery<{
        _id: {
            $in: Array<ObjectId>;
        };
        deleted: boolean;
    }>;
    bulk: boolean;
};
export type HelperMethods = {
    createBrowseOptions: (request: any) => BulkReadOptions;
    createReadOptions: (request: any) => PaginationOptions & SingleReadOptions;
    createEditOptions: (request: any) => PaginationOptions & (SingleEditOptions | BulkEditOptions);
    createAddOptions: (request: any) => PaginationOptions & (SingleAddOptions | BulkAddOptions);
    createDeleteOptions: (request: any) => PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions);
};
export type SoftDeleteHelperMethods = {
    createBrowseDeletedOptions: (request: any) => BulkReadOptions;
    createReadDeletedOptions: (request: any) => PaginationOptions & SingleReadOptions;
    createRehabilitateOptions(request: any): (request: any) => PaginationOptions & (SingleRehabilitateOptions | BulkRehabilitateOptions);
};
export default function Factory(schema: Schema, pluginOptions: PluginOptions): HelperMethods | (HelperMethods & SoftDeleteHelperMethods);
export {};
