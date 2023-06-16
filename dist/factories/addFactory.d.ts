import { PluginOptions } from "..";
import { BulkAddOptions, PaginationOptions, SingleAddOptions } from "./helperFactory";
type AddResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    createdCount: number;
};
type AddFn = (options: PaginationOptions & (SingleAddOptions | BulkAddOptions)) => Promise<AddResult>;
export default function addFactory(pluginOptions: PluginOptions): AddFn;
export {};
