"use strict";
function ownKeys(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b &&
      (d = d.filter(function (b) {
        return Object.getOwnPropertyDescriptor(a, b).enumerable;
      })),
      c.push.apply(c, d);
  }
  return c;
}
function _objectSpread(a) {
  for (var b, c = 1; c < arguments.length; c++)
    (b = null == arguments[c] ? {} : arguments[c]),
      c % 2
        ? ownKeys(Object(b), !0).forEach(function (c) {
            _defineProperty(a, c, b[c]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
        : ownKeys(Object(b)).forEach(function (c) {
            Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c));
          });
  return a;
}
function _defineProperty(a, b, c) {
  return (
    (b = _toPropertyKey(b)) in a
      ? Object.defineProperty(a, b, {
          value: c,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (a[b] = c),
    a
  );
}
function _toPropertyKey(a) {
  var b = _toPrimitive(a, "string");
  return "symbol" == typeof b ? b : b + "";
}
function _toPrimitive(a, b) {
  if ("object" != typeof a || !a) return a;
  var c = a[Symbol.toPrimitive];
  if (void 0 !== c) {
    var d = c.call(a, b || "default");
    if ("object" != typeof d) return d;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === b ? String : Number)(a);
}
var toBreadErrorFactory = require("./toBreadErrorFactory");
function browseFactory(a) {
  function b(a, b) {
    var c = b.query,
      d = b.paginateOptions,
      e = d.limit,
      f = d.projection,
      g = [c, { $limit: e }];
    return (
      f && g.push({ $project: _objectSpread({}, f) }),
      a.aggregate(g).then(function (a) {
        return {
          docs: a,
          pagination: {
            totalDocs: a.length,
            offset: 0,
            limit: e,
            totalPages: 1,
            page: 1,
            pagingCounter: 1,
            hasPrevPage: !1,
            hasNextPage: !1,
            prevPage: null,
            nextPage: null,
          },
        };
      })
    );
  }
  var c = a.customLabels,
    d = c.docs,
    e = c.acknowledged,
    f = c.readCount,
    g = function (a) {
      return _objectSpread(
        _objectSpread({}, a),
        {},
        { [e]: !0, [f]: a[d].length }
      );
    },
    h = toBreadErrorFactory({ [d]: [], [e]: !1, [f]: 0 });
  return function (c) {
    var d = this;
    c = _objectSpread(_objectSpread({}, a), c);
    var e = c,
      f = e.query,
      i = e.paginateOptions,
      j = e.enableAtlasSearch,
      k = e.atlasSearchIndex,
      l = i.lean,
      m = i.leanWithId,
      n = i.leanWithout_id,
      o = i.customLabels,
      p = i.customCount;
    if (j && k)
      return b(this, c)
        .then(void 0)
        .then(g)
        .catch(h);
    p &&
      this[p] &&
      "function" == typeof this[p] &&
      (i.useCustomCountFn = function () {
        return d[p]();
      });
    var q =
      l && m && n
        ? function (a) {
            var b = o.docs;
            return (
              a[b].forEach(function (a) {
                a._id && delete a._id;
              }),
              a
            );
          }
        : function (a) {
            return a;
          };
    return this.paginate(f, i).then(q).then(g).catch(h);
  };
}
module.exports = browseFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0b0JyZWFkRXJyb3JGYWN0b3J5IiwicmVxdWlyZSIsImJyb3dzZUZhY3RvcnkiLCJwbHVnaW5PcHRpb25zIiwicnVuQXRsYXNTZWFyY2giLCJtb2RlbCIsIm9wdGlvbnMiLCJxdWVyeSIsInBhZ2luYXRlT3B0aW9ucyIsImxpbWl0IiwicHJvamVjdGlvbiIsInBpcGVsaW5lIiwiJGxpbWl0IiwicHVzaCIsIiRwcm9qZWN0IiwiX29iamVjdFNwcmVhZCIsImFnZ3JlZ2F0ZSIsInRoZW4iLCJkb2NzIiwicGFnaW5hdGlvbiIsInRvdGFsRG9jcyIsImxlbmd0aCIsIm9mZnNldCIsInRvdGFsUGFnZXMiLCJwYWdlIiwicGFnaW5nQ291bnRlciIsImhhc1ByZXZQYWdlIiwiaGFzTmV4dFBhZ2UiLCJwcmV2UGFnZSIsIm5leHRQYWdlIiwiYyIsImN1c3RvbUxhYmVscyIsImFja25vd2xlZGdlZCIsInJlYWRDb3VudCIsInRvQnJlYWRSZXN1bHQiLCJyZXN1bHQiLCJ0b0JyZWFkRXJyb3IiLCJkIiwiZSIsImVuYWJsZUF0bGFzU2VhcmNoIiwiYXRsYXNTZWFyY2hJbmRleCIsImxlYW4iLCJsZWFuV2l0aElkIiwibGVhbldpdGhvdXRfaWQiLCJjdXN0b21Db3VudCIsImNhdGNoIiwidXNlQ3VzdG9tQ291bnRGbiIsInJlbW92ZV9pZCIsImRvY3NLZXkiLCJmb3JFYWNoIiwiZG9jIiwiX2lkIiwicGFnaW5hdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3Rvcmllcy9icm93c2VGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHRvQnJlYWRFcnJvckZhY3RvcnkgPSByZXF1aXJlKFwiLi90b0JyZWFkRXJyb3JGYWN0b3J5XCIpO1xuXG4vKipcbiAqIEZhY3RvcnkgZnVuY3Rpb24gdG8gY3JlYXRlIE1vZGVsLmJyb3dzZSgpIG1ldGhvZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuTW9uZ29vc2VCcmVhZE9wdGlvbnN9IHBsdWdpbk9wdGlvbnMgQ29uZmlnIG9mIG1vbmdvb3NlLWJyZWFkIHBsdWdpblxuICovXG5mdW5jdGlvbiBicm93c2VGYWN0b3J5KHBsdWdpbk9wdGlvbnMpIHtcbiAgY29uc3QgeyBkb2NzLCBhY2tub3dsZWRnZWQsIHJlYWRDb3VudCB9ID0gcGx1Z2luT3B0aW9ucy5jdXN0b21MYWJlbHM7XG4gIGNvbnN0IHRvQnJlYWRSZXN1bHQgPSAocmVzdWx0KSA9PiAoe1xuICAgIC4uLnJlc3VsdCxcbiAgICBbYWNrbm93bGVkZ2VkXTogdHJ1ZSxcbiAgICBbcmVhZENvdW50XTogcmVzdWx0W2RvY3NdLmxlbmd0aCxcbiAgfSk7XG4gIGNvbnN0IHRvQnJlYWRFcnJvciA9IHRvQnJlYWRFcnJvckZhY3Rvcnkoe1xuICAgIFtkb2NzXTogW10sXG4gICAgW2Fja25vd2xlZGdlZF06IGZhbHNlLFxuICAgIFtyZWFkQ291bnRdOiAwLFxuICB9KTtcblxuICBmdW5jdGlvbiBydW5BdGxhc1NlYXJjaChtb2RlbCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgcXVlcnksIHBhZ2luYXRlT3B0aW9ucyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCB7IGxpbWl0LCBwcm9qZWN0aW9uIH0gPSBwYWdpbmF0ZU9wdGlvbnM7XG5cbiAgICBjb25zdCBwaXBlbGluZSA9IFtxdWVyeSwgeyAkbGltaXQ6IGxpbWl0IH1dO1xuXG4gICAgaWYgKHByb2plY3Rpb24pIHtcbiAgICAgIHBpcGVsaW5lLnB1c2goeyAkcHJvamVjdDogeyAuLi5wcm9qZWN0aW9uIH0gfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGVsLmFnZ3JlZ2F0ZShwaXBlbGluZSkudGhlbigoZG9jcykgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZG9jcyxcbiAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgIHRvdGFsRG9jczogZG9jcy5sZW5ndGgsXG4gICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgIGxpbWl0OiBsaW1pdCxcbiAgICAgICAgICB0b3RhbFBhZ2VzOiAxLFxuICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgcGFnaW5nQ291bnRlcjogMSxcbiAgICAgICAgICBoYXNQcmV2UGFnZTogZmFsc2UsXG4gICAgICAgICAgaGFzTmV4dFBhZ2U6IGZhbHNlLFxuICAgICAgICAgIHByZXZQYWdlOiBudWxsLFxuICAgICAgICAgIG5leHRQYWdlOiBudWxsLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge2ltcG9ydCgnLi4vaW5kZXgnKS5Nb25nb29zZUJyZWFkT3B0aW9uc30gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiBicm93c2Uob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7IC4uLnBsdWdpbk9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcblxuICAgIGNvbnN0IHsgcXVlcnksIHBhZ2luYXRlT3B0aW9ucywgZW5hYmxlQXRsYXNTZWFyY2gsIGF0bGFzU2VhcmNoSW5kZXggfSA9XG4gICAgICBvcHRpb25zO1xuICAgIGNvbnN0IHsgbGVhbiwgbGVhbldpdGhJZCwgbGVhbldpdGhvdXRfaWQsIGN1c3RvbUxhYmVscywgY3VzdG9tQ291bnQgfSA9XG4gICAgICBwYWdpbmF0ZU9wdGlvbnM7XG5cbiAgICBpZiAoZW5hYmxlQXRsYXNTZWFyY2ggJiYgYXRsYXNTZWFyY2hJbmRleCkge1xuICAgICAgcmV0dXJuIHJ1bkF0bGFzU2VhcmNoKHRoaXMsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJlbW92ZV9pZClcbiAgICAgICAgLnRoZW4odG9CcmVhZFJlc3VsdClcbiAgICAgICAgLmNhdGNoKHRvQnJlYWRFcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY3VzdG9tQ291bnQgJiZcbiAgICAgIHRoaXNbY3VzdG9tQ291bnRdICYmXG4gICAgICB0eXBlb2YgdGhpc1tjdXN0b21Db3VudF0gPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgcGFnaW5hdGVPcHRpb25zLnVzZUN1c3RvbUNvdW50Rm4gPSAoKSA9PiB0aGlzW2N1c3RvbUNvdW50XSgpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZV9pZCA9ICEobGVhbiAmJiBsZWFuV2l0aElkICYmIGxlYW5XaXRob3V0X2lkKVxuICAgICAgPyAocmVzdWx0KSA9PiByZXN1bHRcbiAgICAgIDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRvY3NLZXkgPSBjdXN0b21MYWJlbHMuZG9jcztcbiAgICAgICAgICByZXN1bHRbZG9jc0tleV0uZm9yRWFjaCgoZG9jKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jLl9pZCkgZGVsZXRlIGRvYy5faWQ7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgIHJldHVybiB0aGlzLnBhZ2luYXRlKHF1ZXJ5LCBwYWdpbmF0ZU9wdGlvbnMpXG4gICAgICAudGhlbihyZW1vdmVfaWQpXG4gICAgICAudGhlbih0b0JyZWFkUmVzdWx0KVxuICAgICAgLmNhdGNoKHRvQnJlYWRFcnJvcik7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnJvd3NlRmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6ImduQ0FBQSxHQUFNLENBQUFBLG1CQUFtQixDQUFHQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FNNUQsUUFBUyxDQUFBQyxhQUFhQSxDQUFDQyxDQUFhLENBQUUsQ0FhcEMsUUFBUyxDQUFBQyxDQUFjQSxDQUFDQyxDQUFLLENBQUVDLENBQU8sQ0FBRSxJQUM5QixDQUFBQyxDQUFLLENBQXNCRCxDQUFPLENBQWxDQyxLQUFLLENBQUVDLENBQWUsQ0FBS0YsQ0FBTyxDQUEzQkUsZUFBZSxDQUN0QkMsQ0FBSyxDQUFpQkQsQ0FBZSxDQUFyQ0MsS0FBSyxDQUFFQyxDQUFVLENBQUtGLENBQWUsQ0FBOUJFLFVBQVUsQ0FFbkJDLENB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
