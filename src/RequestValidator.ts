import { Request } from "express";
import { Schema, SchemaType } from "mongoose";

const mongoose = require("mongoose");
const MongooseBreadError = require("./MongooseBreadError");
const { isValidObjectId } = require("mongoose");

function checkRequest(request: Request) {
	const validators = {
		paramsIdIsValid(paramsIdKey: string, issuer: string) {
			if (!request.params || !request.params[paramsIdKey]) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.params.${paramsIdKey} to be set`,
					details: `Make sure you have a :${paramsIdKey} parameter defined in your Router URL definition`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			if (!request.params || !isValidObjectId(request.params[paramsIdKey])) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.params.${paramsIdKey} to be a valid ObjectId`,
					details: `Make sure you have passed a valid ObjectId for the :${paramsIdKey} parameter`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		bodyIsNotAnArray(issuer: string) {
			if (Array.isArray(request.body)) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.body to be an Object`,
					details: `If passed ObjectId as request.params parameter make sure to pass an Object in request.body - got Array`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		hasBody(issuer: string) {
			if (!request.body) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.body to be set`,
					details: `Make sure you have a JSON Object in request.body`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		hasBodyProperty(property: string, issuer: string) {
			if (!request.body[property]) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.body.${property} to be set`,
					details: `Make sure request.body.${property} is not undefined`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		bodyPropertyIsArray(property: string, issuer: string) {
			if (!Array.isArray(request.body[property])) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.body.${property} to be an array`,
					details: `Make sure request.body.${property} is an array`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		bodyPropertyArrayIncludesOnlyObjectIds(property: string, issuer: string) {
			const includesOnlyObjectIds = request.body[property].reduce((valid: boolean, id: unknown) => {
				if (!valid) return false;
				return isValidObjectId(id);
			}, true);
			if (!includesOnlyObjectIds) {
				throw new MongooseBreadError({
					message: `mongooseBread helper "${issuer}" expects request.body.${property} to include only valid ObjectIds`,
					details: `Make sure request.body.${property} array only includes valid ObjectIds`,
					statusCode: 400,
					issuer: `MongooseBreadHelper ${issuer}`,
				});
			}
			return validators;
		},
		// xxx(issuer:string) {

		//     return validators
		// },
	};
	return validators;
}

function checkSchema(schema: Schema) {
	const validators = {
		hasMongoosePaginateV2AlreadyInstalled(issuer: string) {
			if (schema.statics.paginate) {
				throw new MongooseBreadError({
					message: `MongooseBread "${issuer}" detected already installed dependency`,
					details: `Make sure "mongoose-paginage-v2" is not installed manually - mongoose-bread will set it up automatically`,
					statusCode: 500,
					issuer: `MongooseBread ${issuer}`,
				});
			}
			return validators;
		},
		hasMongooseDeleteAlreadyInstalled(issuer: string) {
			if (schema.statics.findDeleted) {
				throw new MongooseBreadError({
					message: `MongooseBread "${issuer}" detected already installed dependency`,
					details: `Make sure "mongoose-delete" is not installed manually - mongoose-bread will set it up automatically`,
					statusCode: 500,
					issuer: `MongooseBread ${issuer}`,
				});
			}
			return validators;
		},
		getSearchableFieldsOfTypeString(searchableFields: string[]) {
			const validFields = searchableFields.filter((field) => {
				const path: SchemaType = schema.path(field);
				if (path instanceof Schema.Types.String) return true;
				const isArray = path instanceof Schema.Types.Array;
				if (isArray && path.caster && path.caster instanceof Schema.Types.String) return true;
        const warningMessage = `schema.path(${field}) is not of type String or String[] - searchableField ${field} has been removed`
				console.warn(warningMessage);
				return false;
			});
			return validFields;
		},
	};
	return validators;
}

module.exports = {
	checkRequest,
	checkSchema,
};
