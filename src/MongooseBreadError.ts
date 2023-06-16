export type BreadErrorOptions = {
  message: string,
  details?: string,
  issuer: string,
  statusCode: number,
  result: object,
};

const defaultOptions:BreadErrorOptions = {
  message: "MongooseBread encountered an error",
  details: "",
  issuer: "MongooseBread",
  statusCode: 500,
  result: {},
};

export class MongooseBreadError extends Error {

  readonly details: string
  readonly issuer: string
  readonly statusCode: number
  readonly result: object

  constructor(options: BreadErrorOptions) {
    const _options:BreadErrorOptions = { ...defaultOptions, ...options };

    super(_options.message);
    this.details = _options.details;
    this.issuer = _options.issuer;
    this.statusCode = _options.statusCode;
    this.result = _options.result;
  }
}

module.exports = MongooseBreadError;
