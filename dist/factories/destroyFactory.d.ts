import { BulkDeleteOptions, PaginationOptions, SingleDeleteOptions } from "./helperFactory";
type DestroyResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    deletedCount: number;
};
type DestroyFn = (options: PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions)) => Promise<DestroyResult>;
export default function destroyFactory(pluginOptions: any): DestroyFn;
export {};
