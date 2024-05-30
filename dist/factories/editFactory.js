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
var parseLeanFactory = require("./parseLeanFactory"),
  toBreadErrorFactory = require("./toBreadErrorFactory");
function editFactory(a) {
  function b(a, b) {
    var c = b.query,
      d = b.payload,
      e = b.projection,
      f = b.populate,
      g = b.select,
      h = b.sort,
      k = b.lean,
      l = b.limit,
      m = parseLeanFactory(b);
    return a
      .startSession()
      .then(function updateWithSession(b) {
        return (
          b.startTransaction(),
          Promise.all([Promise.resolve(b), a.updateMany(c, d, { session: b })])
        );
      })
      .then(function fetchDocs(b) {
        var d = _slicedToArray(b, 2),
          i = d[0],
          j = d[1];
        return Promise.all([
          Promise.resolve(i),
          Promise.resolve(j),
          a
            .find(c, e)
            .session(i)
            .populate(f)
            .select(g)
            .sort(h)
            .lean(k)
            .limit(l)
            .orFail()
            .then(m),
        ]);
      })
      .then(function commitTransaction(a) {
        var b = _slicedToArray(a, 3),
          c = b[0],
          d = b[1],
          e = b[2];
        return Promise.all([
          Promise.resolve(c),
          Promise.resolve(d),
          Promise.resolve(e),
          c.commitTransaction(),
        ]);
      })
      .then(function endSession(a) {
        var b = _slicedToArray(a, 3),
          c = b[0],
          d = b[1],
          e = b[2];
        return c.endSession(), [d, e];
      })
      .then(i)
      .catch(j);
  }
  function c(a, b) {
    var c = b.query,
      d = b.payload,
      e = b.projection,
      f = b.populate,
      g = b.select,
      h = b.sort,
      k = b.lean,
      l = b.limit,
      m = parseLeanFactory(b);
    return a
      .updateMany(c, d)
      .then(function mergeUpdateAndDocs(b) {
        return Promise.all([
          Promise.resolve(b),
          a
            .find(c, e)
            .populate(f)
            .select(g)
            .sort(h)
            .lean(k)
            .limit(l)
            .orFail()
            .then(m),
        ]);
      })
      .then(i)
      .catch(j);
  }
  var d = a.runUpdateTransaction,
    e = a.customLabels,
    f = e.docs,
    g = e.acknowledged,
    h = e.modifiedCount,
    i = function (a) {
      var b,
        c,
        d = _slicedToArray(a, 2),
        e = d[0],
        i = d[1];
      return {
        [f]: i,
        [g]: null === (b = e.acknowledged) || void 0 === b || b,
        [h]: null !== (c = e.modifiedCount) && void 0 !== c ? c : e.nModified,
      };
    },
    j = toBreadErrorFactory({ [f]: [], [g]: !1, [h]: 0 });
  return function (a) {
    return d ? b(this, a) : c(this, a);
  };
}
module.exports = editFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXJzZUxlYW5GYWN0b3J5IiwicmVxdWlyZSIsInRvQnJlYWRFcnJvckZhY3RvcnkiLCJlZGl0RmFjdG9yeSIsInBsdWdpbk9wdGlvbnMiLCJydW5XaXRoVHJhbnNhY3Rpb24iLCJNb2RlbCIsIm9wdGlvbnMiLCJxdWVyeSIsInBheWxvYWQiLCJwcm9qZWN0aW9uIiwicG9wdWxhdGUiLCJzZWxlY3QiLCJzb3J0IiwibGVhbiIsImxpbWl0IiwicGFyc2VMZWFuIiwic3RhcnRTZXNzaW9uIiwidGhlbiIsInVwZGF0ZVdpdGhTZXNzaW9uIiwic2Vzc2lvbiIsInN0YXJ0VHJhbnNhY3Rpb24iLCJQcm9taXNlIiwiYWxsIiwicmVzb2x2ZSIsInVwZGF0ZU1hbnkiLCJmZXRjaERvY3MiLCJiIiwiZCIsIl9zbGljZWRUb0FycmF5IiwidXBkYXRlUmVzdWx0IiwiZmluZCIsIm9yRmFpbCIsImNvbW1pdFRyYW5zYWN0aW9uIiwiYSIsIl9kb2NzIiwiZW5kU2Vzc2lvbiIsInRvQnJlYWRSZXN1bHQiLCJjYXRjaCIsInRvQnJlYWRFcnJvciIsInJ1blJhdyIsIm1lcmdlVXBkYXRlQW5kRG9jcyIsInJlc3VsdCIsInJ1blVwZGF0ZVRyYW5zYWN0aW9uIiwiZSIsImN1c3RvbUxhYmVscyIsImRvY3MiLCJhY2tub3dsZWRnZWQiLCJtb2RpZmllZENvdW50IiwiYyIsIm5Nb2RpZmllZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yaWVzL2VkaXRGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhcnNlTGVhbkZhY3RvcnkgPSByZXF1aXJlKFwiLi9wYXJzZUxlYW5GYWN0b3J5XCIpO1xuY29uc3QgdG9CcmVhZEVycm9yRmFjdG9yeSA9IHJlcXVpcmUoXCIuL3RvQnJlYWRFcnJvckZhY3RvcnlcIik7XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgTW9kZWwuZWRpdCgpIG1ldGhvZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuTW9uZ29vc2VCcmVhZE9wdGlvbnN9IHBsdWdpbk9wdGlvbnMgQ29uZmlnIG9mIG1vbmdvb3NlLWJyZWFkIHBsdWdpblxuICovXG5mdW5jdGlvbiBlZGl0RmFjdG9yeShwbHVnaW5PcHRpb25zKSB7XG4gIGNvbnN0IHsgcnVuVXBkYXRlVHJhbnNhY3Rpb24gfSA9IHBsdWdpbk9wdGlvbnM7XG4gIGNvbnN0IHsgZG9jcywgYWNrbm93bGVkZ2VkLCBtb2RpZmllZENvdW50IH0gPSBwbHVnaW5PcHRpb25zLmN1c3RvbUxhYmVscztcbiAgY29uc3QgdG9CcmVhZFJlc3VsdCA9IChbcmVzdWx0LCBfZG9jc10pID0+ICh7XG4gICAgW2RvY3NdOiBfZG9jcyxcbiAgICBbYWNrbm93bGVkZ2VkXTogcmVzdWx0LmFja25vd2xlZGdlZCA/PyB0cnVlLFxuICAgIFttb2RpZmllZENvdW50XTogcmVzdWx0Lm1vZGlmaWVkQ291bnQgPz8gcmVzdWx0Lm5Nb2RpZmllZCxcbiAgfSk7XG4gIGNvbnN0IHRvQnJlYWRFcnJvciA9IHRvQnJlYWRFcnJvckZhY3Rvcnkoe1xuICAgIFtkb2NzXTogW10sXG4gICAgW2Fja25vd2xlZGdlZF06IGZhbHNlLFxuICAgIFttb2RpZmllZENvdW50XTogMCxcbiAgfSk7XG5cbiAgZnVuY3Rpb24gcnVuV2l0aFRyYW5zYWN0aW9uKE1vZGVsLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBxdWVyeSwgcGF5bG9hZCwgcHJvamVjdGlvbiwgcG9wdWxhdGUsIHNlbGVjdCwgc29ydCwgbGVhbiwgbGltaXQgfSA9XG4gICAgICBvcHRpb25zO1xuICAgIGNvbnN0IHBhcnNlTGVhbiA9IHBhcnNlTGVhbkZhY3Rvcnkob3B0aW9ucyk7XG5cbiAgICBjb25zdCB1cGRhdGVXaXRoU2Vzc2lvbiA9IChzZXNzaW9uKSA9PiB7XG4gICAgICBzZXNzaW9uLnN0YXJ0VHJhbnNhY3Rpb24oKTtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIFByb21pc2UucmVzb2x2ZShzZXNzaW9uKSxcbiAgICAgICAgTW9kZWwudXBkYXRlTWFueShxdWVyeSwgcGF5bG9hZCwgeyBzZXNzaW9uIH0pLFxuICAgICAgXSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGZldGNoRG9jcyA9IChbc2Vzc2lvbiwgdXBkYXRlUmVzdWx0XSkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHNlc3Npb24pLFxuICAgICAgICBQcm9taXNlLnJlc29sdmUodXBkYXRlUmVzdWx0KSxcbiAgICAgICAgTW9kZWwuZmluZChxdWVyeSwgcHJvamVjdGlvbilcbiAgICAgICAgICAuc2Vzc2lvbihzZXNzaW9uKVxuICAgICAgICAgIC5wb3B1bGF0ZShwb3B1bGF0ZSlcbiAgICAgICAgICAuc2VsZWN0KHNlbGVjdClcbiAgICAgICAgICAuc29ydChzb3J0KVxuICAgICAgICAgIC5sZWFuKGxlYW4pXG4gICAgICAgICAgLmxpbWl0KGxpbWl0KVxuICAgICAgICAgIC5vckZhaWwoKVxuICAgICAgICAgIC50aGVuKHBhcnNlTGVhbiksXG4gICAgICBdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY29tbWl0VHJhbnNhY3Rpb24gPSAoW3Nlc3Npb24sIHVwZGF0ZVJlc3VsdCwgX2RvY3NdKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoc2Vzc2lvbiksXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSh1cGRhdGVSZXN1bHQpLFxuICAgICAgICBQcm9taXNlLnJlc29sdmUoX2RvY3MpLFxuICAgICAgICBzZXNzaW9uLmNvbW1pdFRyYW5zYWN0aW9uKCksXG4gICAgICBdKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZW5kU2Vzc2lvbiA9IChbc2Vzc2lvbiwgdXBkYXRlUmVzdWx0LCBfZG9jc10pID0+IHtcbiAgICAgIHNlc3Npb24uZW5kU2Vzc2lvbigpO1xuICAgICAgcmV0dXJuIFt1cGRhdGVSZXN1bHQsIF9kb2NzXTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE1vZGVsLnN0YXJ0U2Vzc2lvbigpXG4gICAgICAudGhlbih1cGRhdGVXaXRoU2Vzc2lvbilcbiAgICAgIC50aGVuKGZldGNoRG9jcylcbiAgICAgIC50aGVuKGNvbW1pdFRyYW5zYWN0aW9uKVxuICAgICAgLnRoZW4oZW5kU2Vzc2lvbilcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfSAvLyBlbmQgcnVuV2l0aFRyYW5zYWN0aW9uXG5cbiAgZnVuY3Rpb24gcnVuUmF3KE1vZGVsLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBxdWVyeSwgcGF5bG9hZCwgcHJvamVjdGlvbiwgcG9wdWxhdGUsIHNlbGVjdCwgc29ydCwgbGVhbiwgbGltaXQgfSA9XG4gICAgICBvcHRpb25zO1xuICAgIGNvbnN0IHBhcnNlTGVhbiA9IHBhcnNlTGVhbkZhY3Rvcnkob3B0aW9ucyk7XG5cbiAgICBjb25zdCBtZXJnZVVwZGF0ZUFuZERvY3MgPSAocmVzdWx0KSA9PlxuICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICBQcm9taXNlLnJlc29sdmUocmVzdWx0KSxcbiAgICAgICAgTW9kZWwuZmluZChxdWVyeSwgcHJvamVjdGlvbilcbiAgICAgICAgICAucG9wdWxhdGUocG9wdWxhdGUpXG4gICAgICAgICAgLnNlbGVjdChzZWxlY3QpXG4gICAgICAgICAgLnNvcnQoc29ydClcbiAgICAgICAgICAubGVhbihsZWFuKVxuICAgICAgICAgIC5saW1pdChsaW1pdClcbiAgICAgICAgICAub3JGYWlsKClcbiAgICAgICAgICAudGhlbihwYXJzZUxlYW4pLFxuICAgICAgXSk7XG5cbiAgICByZXR1cm4gTW9kZWwudXBkYXRlTWFueShxdWVyeSwgcGF5bG9hZClcbiAgICAgIC50aGVuKG1lcmdlVXBkYXRlQW5kRG9jcylcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBlZGl0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gcnVuVXBkYXRlVHJhbnNhY3Rpb25cbiAgICAgID8gcnVuV2l0aFRyYW5zYWN0aW9uKHRoaXMsIG9wdGlvbnMpXG4gICAgICA6IHJ1blJhdyh0aGlzLCBvcHRpb25zKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlZGl0RmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6Iit1Q0FBTSxDQUFBQSxnQkFBZ0IsQ0FBR0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQ2hEQyxtQkFBbUIsQ0FBR0QsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBTTVELFFBQVMsQ0FBQUUsV0FBV0EsQ0FBQ0MsQ0FBYSxDQUFFLENBY2xDLFFBQVMsQ0FBQUMsQ0FBa0JBLENBQUNDLENBQUssQ0FBRUMsQ0FBTyxDQUFFLElBQ2xDLENBQUFDLENBQUssQ0FDWEQsQ0FBTyxDQUREQyxLQUFLLENBQUVDLENBQU8sQ0FDcEJGLENBQU8sQ0FETUUsT0FBTyxDQUFFQyxDQUFVLENBQ2hDSCxDQUFPLENBRGVHLFVBQVUsQ0FBRUMsQ0FBUSxDQUMxQ0osQ0FBTyxDQUQyQkksUUFBUSxDQUFFQyxDQUFNLENBQ2xETCxDQUFPLENBRHFDSyxNQUFNLENBQUVDLENBQUksQ0FDeEROLENBQU8sQ0FENkNNLElBQUksQ0FBRUMsQ0FBSSxDQUM5RFAsQ0FBTyxDQURtRE8sSUFBSSxDQUFFQyxDQUFLLENBQ3JFUixDQUFPLENBRHlEUSxLQUFLLENBRWpFQyxDQUFTLENBQUdoQixnQkFBZ0IsQ0FBQ08sQ0FBTyxDQUFDLENBd0MzQyxNQUFPLENBQUFELENBQUssQ0FBQ1csWUFBWSxDQUFDLENBQUMsQ0FDeEJDLElBQUksQ0F2Q21CLFFBQXBCLENBQUFDLGlCQUFpQkEsQ0FBSUMsQ0FBTyxDQUFLLENBRXJDLE1BREEsQ0FBQUEsQ0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQ25CQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxDQUNq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
