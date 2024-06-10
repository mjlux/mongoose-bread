import { Model, Query } from "mongoose";
import { MongooseBreadOptions, MongooseBreadSoftDeleteOptions } from "../../types";
import { SoftDeleteModel } from "mongoose-delete";

const toBreadErrorFactory = require("./toBreadErrorFactory");

/**
 * Factory function to create Model.softDelete() method
 * @param {import('../index').MongooseBreadOptions} pluginOptions Config of mongoose-bread plugin
 */
function softDeleteFactory(pluginOptions: MongooseBreadOptions) {
	const { deletedBy } = pluginOptions.softDeleteOptions;
	const { docs, acknowledged, modifiedCount } = pluginOptions.customLabels;
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

	return function softDelete(this: Model<any> & SoftDeleteModel<any>, options:MongooseBreadSoftDeleteOptions) {
		const { userId, query } = options;

		const mergeSoftDeleteAndDocs = (_docs: any) =>
			Promise.all([
				deletedBy && userId ? this.delete(query, userId).orFail() : this.delete(query).orFail(),
				Promise.resolve(_docs),
			]);

		const findQuery = this.findWithDeleted(query, { _id: 1 }) as Query<any, any>;

		return findQuery.then(mergeSoftDeleteAndDocs).then(toBreadResult).catch(toBreadError);
	};
}

module.exports = softDeleteFactory;
