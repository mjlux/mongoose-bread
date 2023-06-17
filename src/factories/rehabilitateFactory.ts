import { PluginOptions } from "..";
import { BulkRehabilitateOptions, PaginationOptions, SingleRehabilitateOptions } from "./helperFactory";
import toBreadErrorFactory from "./toBreadErrorFactory";

type RehabilitateResult = {
  docs: Array<unknown>,
  acknowledged: boolean,
  modifiedCount: number
}

type RehabilitateFn = (options:PaginationOptions & (SingleRehabilitateOptions | BulkRehabilitateOptions)) => Promise<RehabilitateResult>

export default function rehabilitateFactory(pluginOptions:PluginOptions):RehabilitateFn {
  const { docs, modifiedCount, acknowledged } = pluginOptions.customLabels;
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

  return function rehabilitate(options) {
    const { query } = options;

    const mergeRestoreAndDocs = (_docs) =>
      Promise.all([this.restore(query), Promise.resolve(_docs)]);

    return this.findWithDeleted(query, { _id: 1 })
      .then(mergeRestoreAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = rehabilitateFactory;
