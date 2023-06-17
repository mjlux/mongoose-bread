import MongooseBreadError from "../MongooseBreadError";

export default function toBreadErrorFactory(result = {}) {
  return function toBreadError(error: Error) {
    if (error.message.startsWith("No document found")) {
      throw new MongooseBreadError({
        message: "Not Found",
        details: error.message,
        statusCode: 404,
        result: { ...result },
        issuer: "db Error"
      });
    }
    throw error;
  };
}

module.exports = toBreadErrorFactory;
