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
function rehabilitateFactory(a) {
  var b = a.customLabels,
    c = b.docs,
    d = b.modifiedCount,
    e = b.acknowledged,
    f = function (a) {
      var b,
        f,
        g = _slicedToArray(a, 2),
        h = g[0],
        i = g[1];
      return {
        [c]: i,
        [e]: null === (b = h.acknowledged) || void 0 === b || b,
        [d]: null !== (f = h.modifiedCount) && void 0 !== f ? f : h.nModified,
      };
    },
    g = toBreadErrorFactory({ [c]: [], [e]: !1, [d]: 0 });
  return function (a) {
    var b = this,
      c = a.query;
    return this.findWithDeleted(c, { _id: 1 })
      .then(function mergeRestoreAndDocs(a) {
        return Promise.all([b.restore(c), Promise.resolve(a)]);
      })
      .then(f)
      .catch(g);
  };
}
module.exports = rehabilitateFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0b0JyZWFkRXJyb3JGYWN0b3J5IiwicmVxdWlyZSIsInJlaGFiaWxpdGF0ZUZhY3RvcnkiLCJwbHVnaW5PcHRpb25zIiwiYiIsImN1c3RvbUxhYmVscyIsImRvY3MiLCJtb2RpZmllZENvdW50IiwiYWNrbm93bGVkZ2VkIiwidG9CcmVhZFJlc3VsdCIsImEiLCJmIiwiZyIsIl9zbGljZWRUb0FycmF5IiwicmVzdWx0IiwiX2RvY3MiLCJuTW9kaWZpZWQiLCJ0b0JyZWFkRXJyb3IiLCJvcHRpb25zIiwicXVlcnkiLCJmaW5kV2l0aERlbGV0ZWQiLCJfaWQiLCJ0aGVuIiwibWVyZ2VSZXN0b3JlQW5kRG9jcyIsIlByb21pc2UiLCJhbGwiLCJyZXN0b3JlIiwicmVzb2x2ZSIsImNhdGNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mYWN0b3JpZXMvcmVoYWJpbGl0YXRlRmFjdG9yeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB0b0JyZWFkRXJyb3JGYWN0b3J5ID0gcmVxdWlyZShcIi4vdG9CcmVhZEVycm9yRmFjdG9yeVwiKTtcblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBNb2RlbC5yZWhhYmlsaXRhdGUoKSBtZXRob2RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbmRleCcpLk1vbmdvb3NlQnJlYWRPcHRpb25zfSBwbHVnaW5PcHRpb25zIENvbmZpZyBvZiBtb25nb29zZS1icmVhZCBwbHVnaW5cbiAqL1xuZnVuY3Rpb24gcmVoYWJpbGl0YXRlRmFjdG9yeShwbHVnaW5PcHRpb25zKSB7XG4gIGNvbnN0IHsgZG9jcywgbW9kaWZpZWRDb3VudCwgYWNrbm93bGVkZ2VkIH0gPSBwbHVnaW5PcHRpb25zLmN1c3RvbUxhYmVscztcbiAgY29uc3QgdG9CcmVhZFJlc3VsdCA9IChbcmVzdWx0LCBfZG9jc10pID0+ICh7XG4gICAgW2RvY3NdOiBfZG9jcyxcbiAgICBbYWNrbm93bGVkZ2VkXTogcmVzdWx0LmFja25vd2xlZGdlZCA/PyB0cnVlLFxuICAgIFttb2RpZmllZENvdW50XTogcmVzdWx0Lm1vZGlmaWVkQ291bnQgPz8gcmVzdWx0Lm5Nb2RpZmllZCxcbiAgfSk7XG4gIGNvbnN0IHRvQnJlYWRFcnJvciA9IHRvQnJlYWRFcnJvckZhY3Rvcnkoe1xuICAgIFtkb2NzXTogW10sXG4gICAgW2Fja25vd2xlZGdlZF06IGZhbHNlLFxuICAgIFttb2RpZmllZENvdW50XTogMCxcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlaGFiaWxpdGF0ZShvcHRpb25zKSB7XG4gICAgY29uc3QgeyBxdWVyeSB9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IG1lcmdlUmVzdG9yZUFuZERvY3MgPSAoX2RvY3MpID0+XG4gICAgICBQcm9taXNlLmFsbChbdGhpcy5yZXN0b3JlKHF1ZXJ5KSwgUHJvbWlzZS5yZXNvbHZlKF9kb2NzKV0pO1xuXG4gICAgcmV0dXJuIHRoaXMuZmluZFdpdGhEZWxldGVkKHF1ZXJ5LCB7IF9pZDogMSB9KVxuICAgICAgLnRoZW4obWVyZ2VSZXN0b3JlQW5kRG9jcylcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWhhYmlsaXRhdGVGYWN0b3J5O1xuIl0sIm1hcHBpbmdzIjoiNHVDQUFBLEdBQU0sQ0FBQUEsbUJBQW1CLENBQUdDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQU01RCxRQUFTLENBQUFDLG1CQUFtQkEsQ0FBQ0MsQ0FBYSxDQUFFLEtBQUFDLENBQUEsQ0FDSUQsQ0FBYSxDQUFDRSxZQUFZLENBQWhFQyxDQUFJLENBQUFGLENBQUEsQ0FBSkUsSUFBSSxDQUFFQyxDQUFhLENBQUFILENBQUEsQ0FBYkcsYUFBYSxDQUFFQyxDQUFZLENBQUFKLENBQUEsQ0FBWkksWUFBWSxDQUNuQ0MsQ0FBYSxDQUFHLFFBQUFBLENBQUFDLENBQUEsTUFBQU4sQ0FBQSxDQUFBTyxDQUFBLENBQUFDLENBQUEsQ0FBQUMsY0FBQSxDQUFBSCxDQUFBLElBQUVJLENBQU0sQ0FBQUYsQ0FBQSxJQUFFRyxDQUFLLENBQUFILENBQUEsVUFBTyxDQUMxQyxDQUFDTixDQUFJLEVBQUdTLENBQUssQ0FDYixDQUFDUCxDQUFZLFVBQUFKLENBQUEsQ0FBR1UsQ0FBTSxDQUFDTixZQUFZLFlBQUFKLENBQUEsRUFBQUEsQ0FBUSxDQUMzQyxDQUFDRyxDQUFhLFVBQUFJLENBQUEsQ0FBR0csQ0FBTSxDQUFDUCxhQUFhLFlBQUFJLENBQUEsQ0FBQUEsQ0FBQSxDQUFJRyxDQUFNLENBQUNFLFNBQ2xELENBQUMsQ0FBQyxDQUNJQyxDQUFZLENBQUdqQixtQkFBbUIsQ0FBQyxDQUN2QyxDQUFDTSxDQUFJLEVBQUcsRUFBRSxDQUNWLENBQUNFLENBQVksSUFBUSxDQUNyQixDQUFDRCxDQUFhLEVBQUcsQ0FDbkIsQ0FBQyxDQUFDLENBRUYsTUFBTyxVQUFzQlcsQ0FBTyxDQUFFLEtBQUFkLENBQUEsTUFDNUJlLENBQUssQ0FBS0QsQ0FBTyxDQUFqQkMsS0FBSyxDQUtiLE1BQU8sS0FBSSxDQUFDQyxlQUFlLENBQUNELENBQUssQ0FBRSxDQUFFRSxHQUFHLENBQUUsQ0FBRSxDQUFDLENBQUMsQ0FDM0NDLElBQUksQ0FKcUIsUUFBdEIsQ0FBQUMsbUJBQW1CQSxDQUFJUixDQUFLLFFBQ2hDLENBQUFTLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQUNyQixDQUFJLENBQUNzQixPQUFPLENBQUNQLENBQUssQ0FBQyxDQUFFSyxPQUFPLENBQUNHLE9BQU8sQ0FBQ1osQ0FBSyxDQUFDLENBQUMsQ0FBQyxDQUdqQyxDQUFDLENBQ3pCTyxJQUFJLENBQUNiLENBQWEsQ0FBQyxDQUNuQm1CLEtBQUssQ0FBQ1gsQ0FBWSxDQUN2QixDQUNGLENBRUFZLE1BQU0sQ0FBQ0MsT0FBTyxDQUFHNUIsbUJBQW1CIiwiaWdub3JlTGlzdCI6W119
