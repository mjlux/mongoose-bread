import { PluginOptions } from "..";
import { PaginationOptions, SingleReadOptions } from "./helperFactory";
type ReadResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    readCount: number;
};
type ReadFn = (options: PaginationOptions & SingleReadOptions) => Promise<ReadResult>;
export default function readFactory(pluginOptions: PluginOptions): ReadFn;
export {};
