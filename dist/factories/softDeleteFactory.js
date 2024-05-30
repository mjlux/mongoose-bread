"use strict";
function _slicedToArray(a, b) {
  return (
    _arrayWithHoles(a) ||
    _iterableToArrayLimit(a, b) ||
    _unsupportedIterableToArray(a, b) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(b, c) {
  if (b) {
    if ("string" == typeof b) return _arrayLikeToArray(b, c);
    var a = {}.toString.call(b).slice(8, -1);
    return (
      "Object" === a && b.constructor && (a = b.constructor.name),
      "Map" === a || "Set" === a
        ? Array.from(b)
        : "Arguments" === a ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
        ? _arrayLikeToArray(b, c)
        : void 0
    );
  }
}
function _arrayLikeToArray(b, c) {
  (null == c || c > b.length) && (c = b.length);
  for (var d = 0, f = Array(c); d < c; d++) f[d] = b[d];
  return f;
}
function _iterableToArrayLimit(b, c) {
  var d =
    null == b
      ? null
      : ("undefined" != typeof Symbol && b[Symbol.iterator]) || b["@@iterator"];
  if (null != d) {
    var g,
      h,
      j,
      k,
      l = [],
      a = !0,
      m = !1;
    try {
      if (((j = (d = d.call(b)).next), 0 === c)) {
        if (Object(d) !== d) return;
        a = !1;
      } else
        for (
          ;
          !(a = (g = j.call(d)).done) && (l.push(g.value), l.length !== c);
          a = !0
        );
    } catch (a) {
      (m = !0), (h = a);
    } finally {
      try {
        if (!a && null != d.return && ((k = d.return()), Object(k) !== k))
          return;
      } finally {
        if (m) throw h;
      }
    }
    return l;
  }
}
function _arrayWithHoles(a) {
  if (Array.isArray(a)) return a;
}
var toBreadErrorFactory = require("./toBreadErrorFactory");
function softDeleteFactory(a) {
  var b = a.softDeleteOptions.deletedBy,
    c = a.customLabels,
    d = c.docs,
    e = c.acknowledged,
    f = c.modifiedCount,
    g = function (a) {
      var b,
        c,
        g = _slicedToArray(a, 2),
        h = g[0],
        i = g[1];
      return {
        [d]: i,
        [e]: null === (b = h.acknowledged) || void 0 === b || b,
        [f]: null !== (c = h.modifiedCount) && void 0 !== c ? c : h.nModified,
      };
    },
    h = toBreadErrorFactory({ [d]: [], [e]: !1, [f]: 0 });
  return function (a) {
    var c = this,
      d = a.userId,
      e = a.query;
    return this.findWithDeleted(e, { _id: 1 })
      .then(function mergeSoftDeleteAndDocs(a) {
        return Promise.all([
          b && d ? c.delete(e, d).orFail() : c.delete(e).orFail(),
          Promise.resolve(a),
        ]);
      })
      .then(g)
      .catch(h);
  };
}
module.exports = softDeleteFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0b0JyZWFkRXJyb3JGYWN0b3J5IiwicmVxdWlyZSIsInNvZnREZWxldGVGYWN0b3J5IiwicGx1Z2luT3B0aW9ucyIsImRlbGV0ZWRCeSIsInNvZnREZWxldGVPcHRpb25zIiwiYyIsImN1c3RvbUxhYmVscyIsImRvY3MiLCJhY2tub3dsZWRnZWQiLCJtb2RpZmllZENvdW50IiwidG9CcmVhZFJlc3VsdCIsImEiLCJiIiwiZyIsIl9zbGljZWRUb0FycmF5IiwicmVzdWx0IiwiX2RvY3MiLCJuTW9kaWZpZWQiLCJ0b0JyZWFkRXJyb3IiLCJvcHRpb25zIiwidXNlcklkIiwicXVlcnkiLCJmaW5kV2l0aERlbGV0ZWQiLCJfaWQiLCJ0aGVuIiwibWVyZ2VTb2Z0RGVsZXRlQW5kRG9jcyIsIlByb21pc2UiLCJhbGwiLCJkZWxldGUiLCJvckZhaWwiLCJyZXNvbHZlIiwiY2F0Y2giLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3Rvcmllcy9zb2Z0RGVsZXRlRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b0JyZWFkRXJyb3JGYWN0b3J5ID0gcmVxdWlyZShcIi4vdG9CcmVhZEVycm9yRmFjdG9yeVwiKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBNb2RlbC5zb2Z0RGVsZXRlKCkgbWV0aG9kXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW5kZXgnKS5Nb25nb29zZUJyZWFkT3B0aW9uc30gcGx1Z2luT3B0aW9ucyBDb25maWcgb2YgbW9uZ29vc2UtYnJlYWQgcGx1Z2luXG4gKi9cbmZ1bmN0aW9uIHNvZnREZWxldGVGYWN0b3J5KHBsdWdpbk9wdGlvbnMpIHtcbiAgY29uc3QgeyBkZWxldGVkQnkgfSA9IHBsdWdpbk9wdGlvbnMuc29mdERlbGV0ZU9wdGlvbnM7XG4gIGNvbnN0IHsgZG9jcywgYWNrbm93bGVkZ2VkLCBtb2RpZmllZENvdW50IH0gPSBwbHVnaW5PcHRpb25zLmN1c3RvbUxhYmVscztcbiAgY29uc3QgdG9CcmVhZFJlc3VsdCA9IChbcmVzdWx0LCBfZG9jc10pID0+ICh7XG4gICAgW2RvY3NdOiBfZG9jcyxcbiAgICBbYWNrbm93bGVkZ2VkXTogcmVzdWx0LmFja25vd2xlZGdlZCA/PyB0cnVlLFxuICAgIFttb2RpZmllZENvdW50XTogcmVzdWx0Lm1vZGlmaWVkQ291bnQgPz8gcmVzdWx0Lm5Nb2RpZmllZCxcbiAgfSk7XG4gIGNvbnN0IHRvQnJlYWRFcnJvciA9IHRvQnJlYWRFcnJvckZhY3Rvcnkoe1xuICAgIFtkb2NzXTogW10sXG4gICAgW2Fja25vd2xlZGdlZF06IGZhbHNlLFxuICAgIFttb2RpZmllZENvdW50XTogMCxcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHNvZnREZWxldGUob3B0aW9ucykge1xuICAgIGNvbnN0IHsgdXNlcklkLCBxdWVyeSB9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IG1lcmdlU29mdERlbGV0ZUFuZERvY3MgPSAoX2RvY3MpID0+XG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIGRlbGV0ZWRCeSAmJiB1c2VySWRcbiAgICAgICAgICA/IHRoaXMuZGVsZXRlKHF1ZXJ5LCB1c2VySWQpLm9yRmFpbCgpXG4gICAgICAgICAgOiB0aGlzLmRlbGV0ZShxdWVyeSkub3JGYWlsKCksXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShfZG9jcyksXG4gICAgICBdKTtcblxuICAgIHJldHVybiB0aGlzLmZpbmRXaXRoRGVsZXRlZChxdWVyeSwgeyBfaWQ6IDEgfSlcbiAgICAgIC50aGVuKG1lcmdlU29mdERlbGV0ZUFuZERvY3MpXG4gICAgICAudGhlbih0b0JyZWFkUmVzdWx0KVxuICAgICAgLmNhdGNoKHRvQnJlYWRFcnJvcik7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc29mdERlbGV0ZUZhY3Rvcnk7XG4iXSwibWFwcGluZ3MiOiI0dUNBQUEsR0FBTSxDQUFBQSxtQkFBbUIsQ0FBR0MsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBTTVELFFBQVMsQ0FBQUMsaUJBQWlCQSxDQUFDQyxDQUFhLENBQUUsSUFDaEMsQ0FBQUMsQ0FBUyxDQUFLRCxDQUFhLENBQUNFLGlCQUFpQixDQUE3Q0QsU0FBUyxDQUFBRSxDQUFBLENBQzZCSCxDQUFhLENBQUNJLFlBQVksQ0FBaEVDLENBQUksQ0FBQUYsQ0FBQSxDQUFKRSxJQUFJLENBQUVDLENBQVksQ0FBQUgsQ0FBQSxDQUFaRyxZQUFZLENBQUVDLENBQWEsQ0FBQUosQ0FBQSxDQUFiSSxhQUFhLENBQ25DQyxDQUFhLENBQUcsUUFBQUEsQ0FBQUMsQ0FBQSxNQUFBQyxDQUFBLENBQUFQLENBQUEsQ0FBQVEsQ0FBQSxDQUFBQyxjQUFBLENBQUFILENBQUEsSUFBRUksQ0FBTSxDQUFBRixDQUFBLElBQUVHLENBQUssQ0FBQUgsQ0FBQSxVQUFPLENBQzFDLENBQUNOLENBQUksRUFBR1MsQ0FBSyxDQUNiLENBQUNSLENBQVksVUFBQUksQ0FBQSxDQUFHRyxDQUFNLENBQUNQLFlBQVksWUFBQUksQ0FBQSxFQUFBQSxDQUFRLENBQzNDLENBQUNILENBQWEsVUFBQUosQ0FBQSxDQUFHVSxDQUFNLENBQUNOLGFBQWEsWUFBQUosQ0FBQSxDQUFBQSxDQUFBLENBQUlVLENBQU0sQ0FBQ0UsU0FDbEQsQ0FBQyxDQUFDLENBQ0lDLENBQVksQ0FBR25CLG1CQUFtQixDQUFDLENBQ3ZDLENBQUNRLENBQUksRUFBRyxFQUFFLENBQ1YsQ0FBQ0MsQ0FBWSxJQUFRLENBQ3JCLENBQUNDLENBQWEsRUFBRyxDQUNuQixDQUFDLENBQUMsQ0FFRixNQUFPLFVBQW9CVSxDQUFPLENBQUUsS0FBQWQsQ0FBQSxNQUMxQmUsQ0FBTSxDQUFZRCxDQUFPLENBQXpCQyxNQUFNLENBQUVDLENBQUssQ0FBS0YsQ0FBTyxDQUFqQkUsS0FBSyxDQVVyQixNQUFPLEtBQUksQ0FBQ0MsZUFBZSxDQUFDRCxDQUFLLENBQUUsQ0FBRUUsR0FBRyxDQUFFLENBQUUsQ0FBQyxDQUFDLENBQzNDQyxJQUFJLENBVHdCLFFBQXpCLENBQUFDLHNCQUFzQkEsQ0FBSVQsQ0FBSyxRQUNuQyxDQUFBVSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUNWeEIsQ0FBUyxFQUFJaUIsQ0FBTSxDQUNmZixDQUFJLENBQUN1QixNQUFNLENBQUNQLENBQUssQ0FBRUQsQ0FBTSxDQUFDLENBQUNTLE1BQU0sQ0FBQyxDQUFDLENBQ25DeEIsQ0FBSSxDQUFDdUIsTUFBTSxDQUFDUCxDQUFLLENBQUMsQ0FBQ1EsTUFBTSxDQUFDLENBQUMsQ0FDL0JILE9BQU8sQ0FBQ0ksT0FBTyxDQUFDZCxDQUFLLENBQUMsQ0FDdkIsQ0FBQyxDQUcwQixDQUFDLENBQzVCUSxJQUFJLENBQUNkLENBQWEsQ0FBQyxDQUNuQnFCLEtBQUssQ0FBQ2IsQ0FBWSxDQUN2QixDQUNGLENBRUFjLE1BQU0sQ0FBQ0MsT0FBTyxDQUFHaEMsaUJBQWlCIiwiaWdub3JlTGlzdCI6W119
