import { PluginOptions } from "..";
import { PaginationOptions, SingleReadOptions } from "./helperFactory";

import parseLeanFactory from "./parseLeanFactory";
import toBreadErrorFactory from "./toBreadErrorFactory";

type ReadResult = {
  docs: Array<unknown>,
  acknowledged: boolean,
  readCount: number
}

type ReadFn = (options:PaginationOptions & SingleReadOptions) => Promise<ReadResult>

export default function readFactory(pluginOptions:PluginOptions):ReadFn {
  const { docs, acknowledged, readCount } = pluginOptions.customLabels;
  const toBreadResult = (result) => ({
    [docs]: [result],
    [acknowledged]: true,
    [readCount]: 1,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [readCount]: 0,
  });

  return function read(options) {
    const {
      customFind,
      query,
      projection,
      populate,
      select,
      sort,
      lean,
      limit,
    } = options;
    const parseLean = parseLeanFactory(options);

    return this[customFind](query, projection)
      .populate(populate)
      .select(select)
      .sort(sort)
      .lean(lean)
      .limit(limit)
      .orFail()
      .then(parseLean)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = readFactory;
