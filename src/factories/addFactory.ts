import { Model } from "mongoose";

const parseLeanFactory = require("./parseLeanFactory");
const toBreadErrorFactory = require("./toBreadErrorFactory");

function addFactory(pluginOptions:MongooseBreadOptions) {
  const { docs, acknowledged, createdCount } = pluginOptions.customLabels;
  const toBreadResult = ([result, _docs] : [any, any]) => ({
    [docs]: _docs,
    [acknowledged]: result.acknowledged,
    [createdCount]: result.createdCount,
  });
  const toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [createdCount]: 0,
  });

  return function add(this:Model<any>, options:MongooseBreadAddOptions) {
    const { bulk, payload, projection, populate, select, sort, lean, limit } =
      options;
    const parseLean = parseLeanFactory(options);

    const mergeCreateAndCount = (result:any) => {
      const query = bulk
        ? { _id: { $in: [...result.map((d:any) => d._id)] } }
        : { _id: result?._id };

      return Promise.all([
        Promise.resolve({
          acknowledged: true,
          createdCount: bulk ? result.length : 1,
        }),
        this.find(query, projection)
          .populate(populate)
          .select(select)
          .sort(sort)
          .lean(lean)
          .limit(limit)
          .orFail()
          .then(parseLean),
      ]);
    };

    return this.create(payload)
      .then(mergeCreateAndCount)
      .then(toBreadResult)
      .catch(toBreadError);
  };
}

module.exports = addFactory;
