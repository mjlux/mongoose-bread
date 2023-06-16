import { Schema } from "mongoose";
type RequestValidators = {
    paramsIdIsValid: (paramsIdKey: string, issuer: string) => RequestValidators;
    bodyIsNotAnArray: (issuer: string) => RequestValidators;
    hasBody: (issuer: string) => RequestValidators;
    hasBodyProperty: (property: string, issuer: string) => RequestValidators;
    bodyPropertyIsArray: (property: string, issuer: string) => RequestValidators;
    bodyPropertyArrayIncludesOnlyObjectIds: (property: string, issuer: string) => RequestValidators;
};
type SchemaValidators = {
    hasMongoosePaginateV2AlreadyInstalled: (issuer: string) => SchemaValidators;
    hasMongooseDeleteAlreadyInstalled: (issuer: string) => SchemaValidators;
};
export declare function checkRequest(request: any): RequestValidators;
export declare function checkSchema(schema: Schema): SchemaValidators;
export {};
