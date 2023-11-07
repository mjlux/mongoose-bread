const parseLeanFactory = require("./parseLeanFactory");
const toBreadErrorFactory = require("./toBreadErrorFactory");

function editFactory(pluginOptions) {
  const { runUpdateTransaction } = pluginOptions;
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

  function runWithTransaction(Model, options){
    const { query, payload, projection, populate, select, sort, lean, limit } = options;
    const parseLean = parseLeanFactory(options);

    const updateWithSession = session => {
      session.startTransaction()
      return Promise.all([
        Promise.resolve(session),
        Model.updateMany(query, payload, {session})
      ])
    }

    const fetchDocs = ([session, updateResult]) => {
      return Promise.all([
        Promise.resolve(session),
        Promise.resolve(updateResult),
        Model.find(query, projection)
          .session(session)
          .populate(populate)
          .select(select)
          .sort(sort)
          .lean(lean)
          .limit(limit)
          .orFail()
          .then(parseLean)
      ])
    }

    const commitTransaction = ([session, updateResult, _docs]) => {
      return Promise.all([
        Promise.resolve(session),
        Promise.resolve(updateResult),
        Promise.resolve(_docs), 
        session.commitTransaction()
      ])
    }

    const endSession = ([session, updateResult, _docs]) => {
      session.endSession()
      return [updateResult, _docs]
    }

    return Model.startSession()
      .then(updateWithSession)
      .then(fetchDocs)
      .then(commitTransaction)
      .then(endSession)
      .then(toBreadResult)
      .catch(toBreadError)

  } // end runWithTransaction

  function runRaw(Model, options){
    const { query, payload, projection, populate, select, sort, lean, limit } = options;
    const parseLean = parseLeanFactory(options);

    const mergeUpdateAndDocs = (result) =>
      Promise.all([
        Promise.resolve(result),
        Model.find(query, projection)
          .populate(populate)
          .select(select)
          .sort(sort)
          .lean(lean)
          .limit(limit)
          .orFail()
          .then(parseLean),
      ]);

    return Model.updateMany(query, payload)
      .then(mergeUpdateAndDocs)
      .then(toBreadResult)
      .catch(toBreadError);
  }

  return function edit(options) {

    return runUpdateTransaction 
      ? runWithTransaction(this, options) 
      : runRaw(this, options)
    
  };
}

module.exports = editFactory;
