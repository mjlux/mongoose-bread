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
function destroyFactory(a) {
  var b = a.softDelete,
    c = a.customLabels,
    d = c.docs,
    e = c.acknowledged,
    f = c.deletedCount,
    g = function (a) {
      var b,
        c = _slicedToArray(a, 2),
        g = c[0],
        h = c[1];
      return {
        [d]: h,
        [e]: null !== (b = g.acknowledged) && void 0 !== b ? b : !!g.ok,
        [f]: g.deletedCount,
      };
    },
    h = toBreadErrorFactory({ [d]: [], [e]: !1, [f]: 0 });
  return function (a) {
    var c = this,
      d = a.bulk,
      e = a.query,
      f = d ? "deleteMany" : "deleteOne",
      i = b ? "findDeleted" : "find",
      j = b ? { $and: [e, { deleted: { $eq: !0 } }] } : e;
    return this[i](j, { _id: 1 })
      .then(function mergeDestroyAndDocs(a) {
        return Promise.all([c[f](j).orFail(), Promise.resolve(a)]);
      })
      .then(g)
      .catch(h);
  };
}
module.exports = destroyFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0b0JyZWFkRXJyb3JGYWN0b3J5IiwicmVxdWlyZSIsImRlc3Ryb3lGYWN0b3J5IiwicGx1Z2luT3B0aW9ucyIsInNvZnREZWxldGUiLCJjIiwiY3VzdG9tTGFiZWxzIiwiZG9jcyIsImFja25vd2xlZGdlZCIsImRlbGV0ZWRDb3VudCIsInRvQnJlYWRSZXN1bHQiLCJhIiwiYiIsIl9zbGljZWRUb0FycmF5IiwicmVzdWx0IiwiX2RvY3MiLCJvayIsInRvQnJlYWRFcnJvciIsIm9wdGlvbnMiLCJidWxrIiwicXVlcnkiLCJkZXN0cm95UXVlcnlNZXRob2QiLCJmaW5kUXVlcnlNZXRob2QiLCJfcXVlcnkiLCIkYW5kIiwiZGVsZXRlZCIsIiRlcSIsIl9pZCIsInRoZW4iLCJtZXJnZURlc3Ryb3lBbmREb2NzIiwiUHJvbWlzZSIsImFsbCIsIm9yRmFpbCIsInJlc29sdmUiLCJjYXRjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yaWVzL2Rlc3Ryb3lGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRvQnJlYWRFcnJvckZhY3RvcnkgPSByZXF1aXJlKFwiLi90b0JyZWFkRXJyb3JGYWN0b3J5XCIpO1xuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIE1vZGVsLmRlc3Ryb3koKSBtZXRob2RcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9pbmRleCcpLk1vbmdvb3NlQnJlYWRPcHRpb25zfSBwbHVnaW5PcHRpb25zIENvbmZpZyBvZiBtb25nb29zZS1icmVhZCBwbHVnaW5cbiAqL1xuZnVuY3Rpb24gZGVzdHJveUZhY3RvcnkocGx1Z2luT3B0aW9ucykge1xuICBjb25zdCB7IHNvZnREZWxldGUgfSA9IHBsdWdpbk9wdGlvbnM7XG4gIGNvbnN0IHsgZG9jcywgYWNrbm93bGVkZ2VkLCBkZWxldGVkQ291bnQgfSA9IHBsdWdpbk9wdGlvbnMuY3VzdG9tTGFiZWxzO1xuICBjb25zdCB0b0JyZWFkUmVzdWx0ID0gKFtyZXN1bHQsIF9kb2NzXSkgPT4gKHtcbiAgICBbZG9jc106IF9kb2NzLFxuICAgIFthY2tub3dsZWRnZWRdOiByZXN1bHQuYWNrbm93bGVkZ2VkID8/ICEhcmVzdWx0Lm9rLFxuICAgIFtkZWxldGVkQ291bnRdOiByZXN1bHQuZGVsZXRlZENvdW50LFxuICB9KTtcbiAgY29uc3QgdG9CcmVhZEVycm9yID0gdG9CcmVhZEVycm9yRmFjdG9yeSh7XG4gICAgW2RvY3NdOiBbXSxcbiAgICBbYWNrbm93bGVkZ2VkXTogZmFsc2UsXG4gICAgW2RlbGV0ZWRDb3VudF06IDAsXG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiBkZXN0cm95KG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGJ1bGssIHF1ZXJ5IH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGRlc3Ryb3lRdWVyeU1ldGhvZCA9IGJ1bGsgPyBcImRlbGV0ZU1hbnlcIiA6IFwiZGVsZXRlT25lXCI7XG4gICAgY29uc3QgZmluZFF1ZXJ5TWV0aG9kID0gc29mdERlbGV0ZSA/IFwiZmluZERlbGV0ZWRcIiA6IFwiZmluZFwiO1xuICAgIGNvbnN0IF9xdWVyeSA9IHNvZnREZWxldGVcbiAgICAgID8geyAkYW5kOiBbcXVlcnksIHsgZGVsZXRlZDogeyAkZXE6IHRydWUgfSB9XSB9XG4gICAgICA6IHF1ZXJ5O1xuXG4gICAgY29uc3QgbWVyZ2VEZXN0cm95QW5kRG9jcyA9IChfZG9jcykgPT5cbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpc1tkZXN0cm95UXVlcnlNZXRob2RdKF9xdWVyeSkub3JGYWlsKCksXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShfZG9jcyksXG4gICAgICBdKTtcblxuICAgIHJldHVybiB0aGlzW2ZpbmRRdWVyeU1ldGhvZF0oX3F1ZXJ5LCB7IF9pZDogMSB9KVxuICAgICAgLnRoZW4obWVyZ2VEZXN0cm95QW5kRG9jcylcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZXN0cm95RmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6IjR1Q0FBQSxHQUFNLENBQUFBLG1CQUFtQixDQUFHQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FNNUQsUUFBUyxDQUFBQyxjQUFjQSxDQUFDQyxDQUFhLENBQUUsSUFDN0IsQ0FBQUMsQ0FBVSxDQUFLRCxDQUFhLENBQTVCQyxVQUFVLENBQUFDLENBQUEsQ0FDMkJGLENBQWEsQ0FBQ0csWUFBWSxDQUEvREMsQ0FBSSxDQUFBRixDQUFBLENBQUpFLElBQUksQ0FBRUMsQ0FBWSxDQUFBSCxDQUFBLENBQVpHLFlBQVksQ0FBRUMsQ0FBWSxDQUFBSixDQUFBLENBQVpJLFlBQVksQ0FDbENDLENBQWEsQ0FBRyxRQUFBQSxDQUFBQyxDQUFBLE1BQUFDLENBQUEsQ0FBQVAsQ0FBQSxDQUFBUSxjQUFBLENBQUFGLENBQUEsSUFBRUcsQ0FBTSxDQUFBVCxDQUFBLElBQUVVLENBQUssQ0FBQVYsQ0FBQSxVQUFPLENBQzFDLENBQUNFLENBQUksRUFBR1EsQ0FBSyxDQUNiLENBQUNQLENBQVksVUFBQUksQ0FBQSxDQUFHRSxDQUFNLENBQUNOLFlBQVksWUFBQUksQ0FBQSxDQUFBQSxDQUFBLENBQUksQ0FBQyxDQUFDRSxDQUFNLENBQUNFLEVBQUUsQ0FDbEQsQ0FBQ1AsQ0FBWSxFQUFHSyxDQUFNLENBQUNMLFlBQ3pCLENBQUMsQ0FBQyxDQUNJUSxDQUFZLENBQUdqQixtQkFBbUIsQ0FBQyxDQUN2QyxDQUFDTyxDQUFJLEVBQUcsRUFBRSxDQUNWLENBQUNDLENBQVksSUFBUSxDQUNyQixDQUFDQyxDQUFZLEVBQUcsQ0FDbEIsQ0FBQyxDQUFDLENBRUYsTUFBTyxVQUFpQlMsQ0FBTyxDQUFFLEtBQUFiLENBQUEsTUFDdkJjLENBQUksQ0FBWUQsQ0FBTyxDQUF2QkMsSUFBSSxDQUFFQyxDQUFLLENBQUtGLENBQU8sQ0FBakJFLEtBQUssQ0FDYkMsQ0FBa0IsQ0FBR0YsQ0FBSSxDQUFHLFlBQVksQ0FBRyxXQUFXLENBQ3RERyxDQUFlLENBQUdsQixDQUFVLENBQUcsYUFBYSxDQUFHLE1BQU0sQ0FDckRtQixDQUFNLENBQUduQixDQUFVLENBQ3JCLENBQUVvQixJQUFJLENBQUUsQ0FBQ0osQ0FBSyxDQUFFLENBQUVLLE9BQU8sQ0FBRSxDQUFFQyxHQUFHLEdBQU8sQ0FBRSxDQUFDLENBQUUsQ0FBQyxDQUM3Q04sQ0FBSyxDQVFULE1BQU8sS0FBSSxDQUFDRSxDQUFlLENBQUMsQ0FBQ0MsQ0FBTSxDQUFFLENBQUVJLEdBQUcsQ0FBRSxDQUFFLENBQUMsQ0FBQyxDQUM3Q0MsSUFBSSxDQVBxQixRQUF0QixDQUFBQyxtQkFBbUJBLENBQUlkLENBQUssUUFDaEMsQ0FBQWUsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FDVjFCLENBQUksQ0FBQ2dCLENBQWtCLENBQUMsQ0FBQ0UsQ0FBTSxDQUFDLENBQUNTLE1BQU0sQ0FBQyxDQUFDLENBQ3pDRixPQUFPLENBQUNHLE9BQU8sQ0FBQ2xCLENBQUssQ0FBQyxDQUN2QixDQUFDLENBR3VCLENBQUMsQ0FDekJhLElBQUksQ0FBQ2xCLENBQWEsQ0FBQyxDQUNuQndCLEtBQUssQ0FBQ2pCLENBQVksQ0FDdkIsQ0FDRixDQUVBa0IsTUFBTSxDQUFDQyxPQUFPLENBQUdsQyxjQUFjIiwiaWdub3JlTGlzdCI6W119
