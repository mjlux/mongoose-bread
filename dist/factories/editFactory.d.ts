import { BulkEditOptions, PaginationOptions, SingleEditOptions } from "./helperFactory";
type EditResult = {
    docs: Array<unknown>;
    acknowledged: boolean;
    createdCount: number;
};
type EditFn = (options: PaginationOptions & (SingleEditOptions | BulkEditOptions)) => Promise<EditResult>;
export default function editFactory(pluginOptions: any): EditFn;
export {};
