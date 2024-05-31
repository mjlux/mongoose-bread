import { Model } from "mongoose";
import { SoftDeleteModel } from "mongoose-delete";

const toBreadErrorFactory = require("./toBreadErrorFactory");

/**
 * Factory function to create Model.destroy() method
 * @param {import('../index').MongooseBreadOptions} pluginOptions Config of mongoose-bread plugin
 */
function destroyFactory(pluginOptions: MongooseBreadOptions) {
	const { softDelete } = pluginOptions;
	const { docs, acknowledged, deletedCount } = pluginOptions.customLabels;
	const toBreadResult = ([result, _docs]: [any, any]) => ({
		[docs]: _docs,
		[acknowledged]: result.acknowledged ?? !!result.ok,
		[deletedCount]: result.deletedCount,
	});
	const toBreadError = toBreadErrorFactory({
		[docs]: [],
		[acknowledged]: false,
		[deletedCount]: 0,
	});

	return function destroy(this: Model<any> | SoftDeleteModel<any>, options: MongooseBreadDestroyOptions) {
		const { bulk, query } = options;
		const destroyQueryMethod = bulk ? "deleteMany" : "deleteOne";
		const findQueryMethod = softDelete ? "findDeleted" : "find";
		const _query = softDelete ? { $and: [query, { deleted: { $eq: true } }] } : query;

		const mergeDestroyAndDocs = (_docs: any) =>
			Promise.all([
				// @ts-ignore
				this[destroyQueryMethod](_query).orFail(),
				Promise.resolve(_docs),
			]);

		// @ts-ignore
		return this[findQueryMethod](_query, { _id: 1 })
      .then(mergeDestroyAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
	};
}

module.exports = destroyFactory;
