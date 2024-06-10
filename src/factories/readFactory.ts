import { Model } from "mongoose";
import { MongooseBreadOptions, MongooseBreadReadOptions } from "../../types";

const parseLeanFactory = require("./parseLeanFactory");
const toBreadErrorFactory = require("./toBreadErrorFactory");

function readFactory(pluginOptions:MongooseBreadOptions) {
  const { docs, acknowledged, readCount } = pluginOptions.customLabels;
  const toBreadResult = (result:any) => ({
    [docs]: [result],
    [acknowledged]: true,
    [readCount]: 1,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [readCount]: 0,
  });

  return function read(this:Model<any>, options:MongooseBreadOptions & MongooseBreadReadOptions) {
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

    // @ts-ignore
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
