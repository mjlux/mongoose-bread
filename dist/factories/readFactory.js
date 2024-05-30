"use strict";
var parseLeanFactory = require("./parseLeanFactory"),
  toBreadErrorFactory = require("./toBreadErrorFactory");
function readFactory(a) {
  var b = a.customLabels,
    c = b.docs,
    d = b.acknowledged,
    e = b.readCount,
    f = function (a) {
      return { [c]: [a], [d]: !0, [e]: 1 };
    },
    g = toBreadErrorFactory({ [c]: [], [d]: !1, [e]: 0 });
  return function (a) {
    var b = a.customFind,
      c = a.query,
      d = a.projection,
      e = a.populate,
      h = a.select,
      i = a.sort,
      j = a.lean,
      k = a.limit,
      l = parseLeanFactory(a);
    return this[b](c, d)
      .populate(e)
      .select(h)
      .sort(i)
      .lean(j)
      .limit(k)
      .orFail()
      .then(l)
      .then(f)
      .catch(g);
  };
}
module.exports = readFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXJzZUxlYW5GYWN0b3J5IiwicmVxdWlyZSIsInRvQnJlYWRFcnJvckZhY3RvcnkiLCJyZWFkRmFjdG9yeSIsInBsdWdpbk9wdGlvbnMiLCJiIiwiY3VzdG9tTGFiZWxzIiwiZG9jcyIsImFja25vd2xlZGdlZCIsInJlYWRDb3VudCIsInRvQnJlYWRSZXN1bHQiLCJyZXN1bHQiLCJ0b0JyZWFkRXJyb3IiLCJvcHRpb25zIiwiY3VzdG9tRmluZCIsInF1ZXJ5IiwicHJvamVjdGlvbiIsInBvcHVsYXRlIiwic2VsZWN0Iiwic29ydCIsImxlYW4iLCJsaW1pdCIsInBhcnNlTGVhbiIsIm9yRmFpbCIsInRoZW4iLCJjYXRjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yaWVzL3JlYWRGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhcnNlTGVhbkZhY3RvcnkgPSByZXF1aXJlKFwiLi9wYXJzZUxlYW5GYWN0b3J5XCIpO1xuY29uc3QgdG9CcmVhZEVycm9yRmFjdG9yeSA9IHJlcXVpcmUoXCIuL3RvQnJlYWRFcnJvckZhY3RvcnlcIik7XG5cbi8qKlxuICogRmFjdG9yeSBmdW5jdGlvbiB0byBjcmVhdGUgTW9kZWwucmVhZCgpIG1ldGhvZFxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4JykuTW9uZ29vc2VCcmVhZE9wdGlvbnN9IHBsdWdpbk9wdGlvbnMgQ29uZmlnIG9mIG1vbmdvb3NlLWJyZWFkIHBsdWdpblxuICovXG5mdW5jdGlvbiByZWFkRmFjdG9yeShwbHVnaW5PcHRpb25zKSB7XG4gIGNvbnN0IHsgZG9jcywgYWNrbm93bGVkZ2VkLCByZWFkQ291bnQgfSA9IHBsdWdpbk9wdGlvbnMuY3VzdG9tTGFiZWxzO1xuICBjb25zdCB0b0JyZWFkUmVzdWx0ID0gKHJlc3VsdCkgPT4gKHtcbiAgICBbZG9jc106IFtyZXN1bHRdLFxuICAgIFthY2tub3dsZWRnZWRdOiB0cnVlLFxuICAgIFtyZWFkQ291bnRdOiAxLFxuICB9KTtcbiAgY29uc3QgdG9CcmVhZEVycm9yID0gdG9CcmVhZEVycm9yRmFjdG9yeSh7XG4gICAgW2RvY3NdOiBbXSxcbiAgICBbYWNrbm93bGVkZ2VkXTogZmFsc2UsXG4gICAgW3JlYWRDb3VudF06IDAsXG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiByZWFkKG9wdGlvbnMpIHtcbiAgICBjb25zdCB7XG4gICAgICBjdXN0b21GaW5kLFxuICAgICAgcXVlcnksXG4gICAgICBwcm9qZWN0aW9uLFxuICAgICAgcG9wdWxhdGUsXG4gICAgICBzZWxlY3QsXG4gICAgICBzb3J0LFxuICAgICAgbGVhbixcbiAgICAgIGxpbWl0LFxuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHBhcnNlTGVhbiA9IHBhcnNlTGVhbkZhY3Rvcnkob3B0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpc1tjdXN0b21GaW5kXShxdWVyeSwgcHJvamVjdGlvbilcbiAgICAgIC5wb3B1bGF0ZShwb3B1bGF0ZSlcbiAgICAgIC5zZWxlY3Qoc2VsZWN0KVxuICAgICAgLnNvcnQoc29ydClcbiAgICAgIC5sZWFuKGxlYW4pXG4gICAgICAubGltaXQobGltaXQpXG4gICAgICAub3JGYWlsKClcbiAgICAgIC50aGVuKHBhcnNlTGVhbilcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFkRmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6ImdCQUFNLENBQUFBLGdCQUFnQixDQUFHQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FDaERDLG1CQUFtQixDQUFHRCxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FNNUQsUUFBUyxDQUFBRSxXQUFXQSxDQUFDQyxDQUFhLENBQUUsS0FBQUMsQ0FBQSxDQUNRRCxDQUFhLENBQUNFLFlBQVksQ0FBNURDLENBQUksQ0FBQUYsQ0FBQSxDQUFKRSxJQUFJLENBQUVDLENBQVksQ0FBQUgsQ0FBQSxDQUFaRyxZQUFZLENBQUVDLENBQVMsQ0FBQUosQ0FBQSxDQUFUSSxTQUFTLENBQy9CQyxDQUFhLENBQUcsUUFBQUEsQ0FBQ0MsQ0FBTSxRQUFNLENBQ2pDLENBQUNKLENBQUksRUFBRyxDQUFDSSxDQUFNLENBQUMsQ0FDaEIsQ0FBQ0gsQ0FBWSxJQUFPLENBQ3BCLENBQUNDLENBQVMsRUFBRyxDQUNmLENBQUMsQ0FBQyxDQUNJRyxDQUFZLENBQUdWLG1CQUFtQixDQUFDLENBQ3ZDLENBQUNLLENBQUksRUFBRyxFQUFFLENBQ1YsQ0FBQ0MsQ0FBWSxJQUFRLENBQ3JCLENBQUNDLENBQVMsRUFBRyxDQUNmLENBQUMsQ0FBQyxDQUVGLE1BQU8sVUFBY0ksQ0FBTyxDQUFFLElBRTFCLENBQUFDLENBQVUsQ0FRUkQsQ0FBTyxDQVJUQyxVQUFVLENBQ1ZDLENBQUssQ0FPSEYsQ0FBTyxDQVBURSxLQUFLLENBQ0xDLENBQVUsQ0FNUkgsQ0FBTyxDQU5URyxVQUFVLENBQ1ZDLENBQVEsQ0FLTkosQ0FBTyxDQUxUSSxRQUFRLENBQ1JDLENBQU0sQ0FJSkwsQ0FBTyxDQUpUSyxNQUFNLENBQ05DLENBQUksQ0FHRk4sQ0FBTyxDQUhUTSxJQUFJLENBQ0pDLENBQUksQ0FFRlAsQ0FBTyxDQUZUTyxJQUFJLENBQ0pDLENBQUssQ0FDSFIsQ0FBTyxDQURUUSxLQUFLLENBRURDLENBQVMsQ0FBR3RCLGdCQUFnQixDQUFDYSxDQUFPLENBQUMsQ0FFM0MsTUFBTyxLQUFJLENBQUNDLENBQVUsQ0FBQyxDQUFDQyxDQUFLLENBQUVDLENBQVUsQ0FBQyxDQUN2Q0MsUUFBUSxDQUFDQSxDQUFRLENBQUMsQ0FDbEJDLE1BQU0sQ0FBQ0EsQ0FBTSxDQUFDLENBQ2RDLElBQUksQ0FBQ0EsQ0FBSSxDQUFDLENBQ1ZDLElBQUksQ0FBQ0EsQ0FBSSxDQUFDLENBQ1ZDLEtBQUssQ0FBQ0EsQ0FBSyxDQUFDLENBQ1pFLE1BQU0sQ0FBQyxDQUFDLENBQ1JDLElBQUksQ0FBQ0YsQ0FBUyxDQUFDLENBQ2ZFLElBQUksQ0FBQ2QsQ0FBYSxDQUFDLENBQ25CZSxLQUFLLENBQUNiLENBQVksQ0FDdkIsQ0FDRixDQUVBYyxNQUFNLENBQUNDLE9BQU8sQ0FBR3hCLFdBQVciLCJpZ25vcmVMaXN0IjpbXX0=
