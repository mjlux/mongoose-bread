import { PluginOptions } from "..";
import { BulkDeleteOptions, PaginationOptions, SingleDeleteOptions } from "./helperFactory";
import toBreadErrorFactory from "./toBreadErrorFactory";

type DeleteResult = {
  docs: Array<unknown>,
  acknowledged: boolean,
  modifiedCount: number
}

type DeleteFn = (options:PaginationOptions & (SingleDeleteOptions | BulkDeleteOptions)) => Promise<DeleteResult>

export default function softDeleteFactory(pluginOptions:PluginOptions):DeleteFn {
  const { deletedBy } = pluginOptions.softDeleteOptions;
  const { docs, acknowledged, modifiedCount } = pluginOptions.customLabels;
  const toBreadResult = ([result, _docs]) => ({
    [docs]: _docs,
    [acknowledged]: result.acknowledged ?? true,
    [modifiedCount]: result.modifiedCount ?? result.nModified,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [modifiedCount]: 0,
  });

  return function softDelete(options) {
    const { userId, query } = options;

    const mergeSoftDeleteAndDocs = (_docs) =>
      Promise.all([
        deletedBy && userId
          ? this.delete(query, userId).orFail()
          : this.delete(query).orFail(),
        Promise.resolve(_docs),
      ]);

    return this.findWithDeleted(query, { _id: 1 })
      .then(mergeSoftDeleteAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = softDeleteFactory;
