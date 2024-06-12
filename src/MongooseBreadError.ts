import { MongooseBreadErrorOptions } from "../types"

module.exports = class MongooseBreadError extends Error {

  message = "MongooseBread encountered an error"
  details = ""
  issuer = "MongooseBread"
  statusCode = 500
  result = {}

  constructor(options:Partial<MongooseBreadErrorOptions>) {
    super(options.message);
    if(options.message) this.message = options.message;
    if(options.details) this.details = options.details;
    if(options.issuer) this.issuer = options.issuer;
    if(options.statusCode) this.statusCode = options.statusCode;
    if(options.result) this.result = options.result;
  }
}