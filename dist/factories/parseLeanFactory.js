"use strict";

function parseLeanFactory(options) {
  var lean = options.lean,
    leanWithId = options.leanWithId,
    leanWithout_id = options.leanWithout_id;
  return !(lean && leanWithId) ? function skip(result) {
    return result;
  } : function parseLean(result) {
    if (Array.isArray(result)) {
      result.forEach(function (doc) {
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