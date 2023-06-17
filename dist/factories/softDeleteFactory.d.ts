import { PluginOptions } from "..";
import { BulkDeleteOptions, PaginationOptions, SingleDeleteOptions } from "./helperFactory";
type DeleteResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    modifiedCount: number;
};
type DeleteFn = (options: PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions)) => Promise<DeleteResult>;
export default function softDeleteFactory(pluginOptions: PluginOptions): DeleteFn;
export {};
