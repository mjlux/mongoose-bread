import { ObjectId, Schema } from "mongoose";
import { PluginOptions, RequestQuery, SoftDeleteOptions } from ".";
type IssuerOptions = {
    issuer: string;
};
export declare function parseSelect(query: RequestQuery): string;
export declare function parseQuery(query: RequestQuery, options: PluginOptions, schema: Schema): string;
export declare function parseSearchFilter(query: RequestQuery, options: PluginOptions): string;
export declare function parseQueryFilter(query: RequestQuery, schema: Schema): string;
export declare function parseProjection(query: RequestQuery, options: PluginOptions): Record<string, number>;
export declare function parseLimit(query: RequestQuery, options: PluginOptions): number;
export declare function parseRequestParamsId(request: any, pluginOptions: PluginOptions, options: IssuerOptions): ObjectId;
export declare function parseEditRequestBody(request: any, pluginOptions: PluginOptions, options: IssuerOptions): Record<string, unknown>;
export declare function parseAddRequestBody(request: any, pluginOptions: PluginOptions, options: IssuerOptions): Array<Record<string, unknown>>;
export declare function parseRequestBodyIds(request: any, pluginOptions: PluginOptions, options: IssuerOptions): Array<ObjectId>;
export declare function parseRequestUserIdPath(request: any, options: SoftDeleteOptions): ObjectId;
export {};
