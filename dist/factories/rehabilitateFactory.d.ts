import { PluginOptions } from "..";
import { BulkRehabilitateOptions, PaginationOptions, SingleRehabilitateOptions } from "./helperFactory";
type RehabilitateResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    modifiedCount: number;
};
type RehabilitateFn = (options: PaginationOptions & (SingleRehabilitateOptions | BulkRehabilitateOptions)) => Promise<RehabilitateResult>;
export default function rehabilitateFactory(pluginOptions: PluginOptions): RehabilitateFn;
export {};
