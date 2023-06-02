function parseLeanFactory(options) {
  const { lean, leanWithId, leanWithout_id } = options;

  return !(lean && leanWithId)
    ? function skip(result) {
        return result;
      }
    : function parseLean(result) {
        if (Array.isArray(result)) {
          result.forEach((doc) => {
            if (doc._id) doc.id = String(doc._id);
            if (leanWithout_id) delete doc._id;
          });
        } else if (result._id) {
          result.id = String(result._id);
          if (leanWithout_id) delete result._id;
        }
        return result;
      };
}

module.exports = parseLeanFactory;
