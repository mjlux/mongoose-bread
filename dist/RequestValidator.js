"use strict";
var mongoose = require("mongoose"),
  MongooseBreadError = require("./MongooseBreadError"),
  _require = require("mongoose"),
  isValidObjectId = _require.isValidObjectId;
function checkRequest(a) {
  var b = {
    paramsIdIsValid(c, d) {
      if (!a.params || !a.params[c])
        throw new MongooseBreadError({
          message: `mongooseBread helper "${d}" expects request.params.${c} to be set`,
          details: `Make sure you have a :${c} parameter defined in your Router URL definition`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${d}`,
        });
      if (!a.params || !isValidObjectId(a.params[c]))
        throw new MongooseBreadError({
          message: `mongooseBread helper "${d}" expects request.params.${c} to be a valid ObjectId`,
          details: `Make sure you have passed a valid ObjectId for the :${c} parameter`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${d}`,
        });
      return b;
    },
    bodyIsNotAnArray(c) {
      if (Array.isArray(a.body))
        throw new MongooseBreadError({
          message: `mongooseBread helper "${c}" expects request.body to be an Object`,
          details: `If passed ObjectId as request.params parameter make sure to pass an Object in request.body - got Array`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${c}`,
        });
      return b;
    },
    hasBody(c) {
      if (!a.body)
        throw new MongooseBreadError({
          message: `mongooseBread helper "${c}" expects request.body to be set`,
          details: `Make sure you have a JSON Object in request.body`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${c}`,
        });
      return b;
    },
    hasBodyProperty(c, d) {
      if (!a.body[c])
        throw new MongooseBreadError({
          message: `mongooseBread helper "${d}" expects request.body.${c} to be set`,
          details: `Make sure request.body.${c} is not undefined`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${d}`,
        });
      return b;
    },
    bodyPropertyIsArray(c, d) {
      if (!Array.isArray(a.body[c]))
        throw new MongooseBreadError({
          message: `mongooseBread helper "${d}" expects request.body.${c} to be an array`,
          details: `Make sure request.body.${c} is an array`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${d}`,
        });
      return b;
    },
    bodyPropertyArrayIncludesOnlyObjectIds(c, d) {
      var e = a.body[c].reduce(function (a, b) {
        return !!a && isValidObjectId(b);
      }, !0);
      if (!e)
        throw new MongooseBreadError({
          message: `mongooseBread helper "${d}" expects request.body.${c} to include only valid ObjectIds`,
          details: `Make sure request.body.${c} array only includes valid ObjectIds`,
          statusCode: 400,
          issuer: `MongooseBreadHelper ${d}`,
        });
      return b;
    },
  };
  return b;
}
function checkSchema(a) {
  var b = {
    hasMongoosePaginateV2AlreadyInstalled(c) {
      if (a.statics.paginate)
        throw new MongooseBreadError({
          message: `MongooseBread "${c}" detected already installed dependency`,
          details: `Make sure "mongoose-paginage-v2" is not installed manually - mongoose-bread will set it up automatically`,
          statusCode: 500,
          issuer: `MongooseBread ${c}`,
        });
      return b;
    },
    hasMongooseDeleteAlreadyInstalled(c) {
      if (a.statics.findDeleted)
        throw new MongooseBreadError({
          message: `MongooseBread "${c}" detected already installed dependency`,
          details: `Make sure "mongoose-delete" is not installed manually - mongoose-bread will set it up automatically`,
          statusCode: 500,
          issuer: `MongooseBread ${c}`,
        });
      return b;
    },
    getSearchableFieldsOfTypeString(b) {
      var c = b.filter(function (b) {
        var c = a.path(b);
        if (c instanceof mongoose.Schema.Types.String) return !0;
        var d = c instanceof mongoose.Schema.Types.Array,
          e = c.caster && c.caster instanceof mongoose.Schema.Types.String;
        return (
          !!(d && e) ||
          (console.warn(
            `schema.path(${b}) is not of type String or String[] - searchableField ${b} has been removed`
          ),
          !1)
        );
      });
      return c;
    },
  };
  return b;
}
module.exports = { checkRequest, checkSchema };
