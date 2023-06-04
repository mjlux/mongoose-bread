"use strict";

var MongooseBreadError = require("./MongooseBreadError");
var _require = require("mongoose"),
  isValidObjectId = _require.isValidObjectId;

/**
 * @param {Object} request
 * @returns {Object}
 */
function checkRequest(request) {
  var validators = {
    paramsIdIsValid(paramsIdKey, issuer) {
      if (!request.params || !request.params[paramsIdKey]) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.params.${paramsIdKey} to be set`,
          details: `Make sure you have a :${paramsIdKey} parameter defined in your Router URL definition`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      if (!request.params || !isValidObjectId(request.params[paramsIdKey])) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.params.${paramsIdKey} to be a valid ObjectId`,
          details: `Make sure you have passed a valid ObjectId for the :${paramsIdKey} parameter`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    },
    bodyIsNotAnArray(issuer) {
      if (Array.isArray(request.body)) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.body to be an Object`,
          details: `If passed ObjectId as request.params parameter make sure to pass an Object in request.body - got Array`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    },
    hasBody(issuer) {
      if (!request.body) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.body to be set`,
          details: `Make sure you have a JSON Object in request.body`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    },
    hasBodyProperty(property, issuer) {
      if (!request.body[property]) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.body.${property} to be set`,
          details: `Make sure request.body.${property} is not undefined`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    },
    bodyPropertyIsArray(property, issuer) {
      if (!Array.isArray(request.body[property])) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.body.${property} to be an array`,
          details: `Make sure request.body.${property} is an array`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    },
    bodyPropertyArrayIncludesOnlyObjectIds(property, issuer) {
      var includesOnlyObjectIds = request.body[property].reduce(function (valid, id) {
        if (!valid) return false;
        return isValidObjectId(id);
      }, true);
      if (!includesOnlyObjectIds) {
        throw new MongooseBreadError({
          message: `mongooseBread helper "${issuer}" expects request.body.${property} to include only valid ObjectIds`,
          details: `Make sure request.body.${property} array only includes valid ObjectIds`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${issuer}`
        });
      }
      return validators;
    }
    // xxx(issuer) {

    //     return validators
    // },
  };

  return validators;
}
function checkSchema(schema) {
  var validators = {
    hasMongoosePaginateV2AlreadyInstalled(issuer) {
      if (schema.statics.paginate) {
        throw new MongooseBreadError({
          message: `MongooseBread "${issuer}" detected already installed dependency`,
          details: `Make sure "mongoose-paginage-v2" is not installed manually - mongoose-bread will set it up automatically`,
          statusCode: 500,
          issuer: `MongooseBread ${issuer}`
        });
      }
      return validators;
    },
    hasMongooseDeleteAlreadyInstalled(issuer) {
      if (schema.statics.findDeleted) {
        throw new MongooseBreadError({
          message: `MongooseBread "${issuer}" detected already installed dependency`,
          details: `Make sure "mongoose-delete" is not installed manually - mongoose-bread will set it up automatically`,
          statusCode: 500,
          issuer: `MongooseBread ${issuer}`
        });
      }
      return validators;
    }
  };
  return validators;
}
module.exports = {
  checkRequest,
  checkSchema
};