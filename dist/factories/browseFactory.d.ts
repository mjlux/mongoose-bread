import { PluginOptions } from "..";
import { BulkReadOptions, PaginationOptions } from "./helperFactory";
type BrowseResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    pagination: {};
    readCount: number;
};
type BrowseFn = (options: PaginationOptions & BulkReadOptions) => Promise<BrowseResult>;
export default function browseFactory(pluginOptions: PluginOptions): BrowseFn;
export {};
