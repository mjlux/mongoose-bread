import { ClientSession, Document, Model, SessionOperation, SessionStarter } from "mongoose";
import { MongooseBreadEditOptions, MongooseBreadOptions } from "../../types";

const parseLeanFactory = require("./parseLeanFactory");
const toBreadErrorFactory = require("./toBreadErrorFactory");

function editFactory(pluginOptions:MongooseBreadOptions) {
  const { runUpdateTransaction } = pluginOptions;
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

  function runWithTransaction(Model:Model<any>, options:MongooseBreadEditOptions) {
    const { query, payload, projection, populate, select, sort, lean, limit } =
      options;
    const parseLean = parseLeanFactory(options);

    const updateWithSession = (session:ClientSession) => {
      session.startTransaction();
      return Promise.all([
        Promise.resolve(session),
        Model.updateMany(query, payload, { session }),
      ]);
    };

    const fetchDocs = ([session, updateResult]: [ClientSession, any]) => {
      return Promise.all([
        Promise.resolve(session),
        Promise.resolve(updateResult),
        Model.find(query, projection)
          .session(session)
          .populate(populate as string)
          .select(select)
          .sort(sort as string)
          .lean(lean)
          .limit(limit as number)
          .orFail()
          .then(parseLean),
      ]);
    };

    const commitTransaction = ([session, updateResult, _docs]: [ClientSession, any, any[]]) => {
      return Promise.all([
        Promise.resolve(session),
        Promise.resolve(updateResult),
        Promise.resolve(_docs),
        session.commitTransaction(),
      ]);
    };

    const endSession = ([session, updateResult, _docs, _]: [ClientSession, any, any[], any]): [any, any[]] => {
      session.endSession();
      return [updateResult, _docs];
    };

    return Model.startSession()
      .then(updateWithSession)
      .then(fetchDocs)
      .then(commitTransaction)
      .then(endSession)
      .then(toBreadResult)
      .catch(toBreadError);
  } // end runWithTransaction

  function runRaw(Model:Model<any>, options:MongooseBreadEditOptions) {
    const { query, payload, projection, populate, select, sort, lean, limit } =
      options;
    const parseLean = parseLeanFactory(options);

    const mergeUpdateAndDocs = (result:any) =>
      Promise.all([
        Promise.resolve(result),
        Model.find(query, projection)
          .populate(populate as string)
          .select(select)
          .sort(sort as string)
          .lean(lean)
          .limit(limit as number)
          .orFail()
          .then(parseLean),
      ]);

    return Model.updateMany(query, payload)
      .then(mergeUpdateAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  }

  return function edit(this:Model<any>, options:MongooseBreadEditOptions) {
    return runUpdateTransaction
      ? runWithTransaction(this, options)
      : runRaw(this, options);
  };
}

module.exports = editFactory;
