const MongooseBreadError = require("../MongooseBreadError");

function toBreadErrorFactory(result = {}) {
  return function toBreadError(error) {
    if (error.message.startsWith("No document found")) {
      throw new MongooseBreadError({
        message: "Not Found",
        details: error.message,
        statusCode: 404,
        result: { ...result },
      });
    }
    throw error;
  };
}

module.exports = toBreadErrorFactory;
