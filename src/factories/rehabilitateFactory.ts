import { SoftDeleteModel } from "mongoose-delete";
import { MongooseBreadOptions, MongooseBreadRehabilitateOptions } from "../../types";
import { Model } from "mongoose";

const toBreadErrorFactory = require("./toBreadErrorFactory");

function rehabilitateFactory(pluginOptions: MongooseBreadOptions) {
	const { docs, modifiedCount, acknowledged } = pluginOptions.customLabels;
	const toBreadResult = ([result, _docs]: [any, any[]]) => ({
		[docs]: _docs,
		[acknowledged]: result.acknowledged ?? true,
		[modifiedCount]: result.modifiedCount ?? result.nModified,
	});
	const toBreadError = toBreadErrorFactory({
		[docs]: [],
		[acknowledged]: false,
		[modifiedCount]: 0,
	});

	return function rehabilitate(this: Model<any> & SoftDeleteModel<any>, options: MongooseBreadRehabilitateOptions) {
		const { query } = options;
		const mergeRestoreAndDocs = (_docs: any) => Promise.all([this.restore(query), Promise.resolve(_docs)]);
		return this.findWithDeleted(query, { _id: 1 }).then(mergeRestoreAndDocs).then(toBreadResult).catch(toBreadError);
	};
}

module.exports = rehabilitateFactory;
