import { BulkReadOptions, PaginationOptions } from "./helperFactory";
type BrowseResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    pagination: {};
    createdCount: number;
};
type BrowseFn = (options: PaginationOptions & BulkReadOptions) => Promise<BrowseResult>;
export default function browseFactory(pluginOptions: any): BrowseFn;
export {};
