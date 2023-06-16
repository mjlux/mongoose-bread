export type BreadErrorOptions = {
    message: string;
    details?: string;
    issuer: string;
    statusCode: number;
    result?: object;
};
export default class MongooseBreadError extends Error {
    readonly details: string;
    readonly issuer: string;
    readonly statusCode: number;
    readonly result: object;
    constructor(options: BreadErrorOptions);
}
