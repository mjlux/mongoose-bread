const defaultOptions = {
  message: "MongooseBread encountered an error",
  details: "",
  issuer: "MongooseBread",
  statusCode: 500,
  result: {},
};

class MongooseBreadError extends Error {
  constructor(options) {
    const _options = { ...defaultOptions, ...options };

    super(_options.message);
    this.details = _options.details;
    this.issuer = _options.issuer;
    this.statusCode = _options.statusCode;
    this.result = _options.result;
  }
}

module.exports = MongooseBreadError;
