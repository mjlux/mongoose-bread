"use strict";
function parseLeanFactory(a) {
  var b = a.lean,
    c = a.leanWithId,
    d = a.leanWithout_id;
  return b && c
    ? function (a) {
        return (
          Array.isArray(a)
            ? a.forEach(function (a) {
                a._id && (a.id = a._id + ""), d && delete a._id;
              })
            : a._id && ((a.id = a._id + ""), d && delete a._id),
          a
        );
      }
    : function (a) {
        return a;
      };
}
module.exports = parseLeanFactory;
