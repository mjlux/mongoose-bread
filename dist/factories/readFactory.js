"use strict";var parseLeanFactory=require("./parseLeanFactory"),toBreadErrorFactory=require("./toBreadErrorFactory");function readFactory(a){var b=a.customLabels,c=b.docs,d=b.acknowledged,e=b.readCount,f=function(a){return{[c]:[a],[d]:!0,[e]:1}},g=toBreadErrorFactory({[c]:[],[d]:!1,[e]:0});return function(a){var b=a.customFind,c=a.query,d=a.projection,e=a.populate,h=a.select,i=a.sort,j=a.lean,k=a.limit,l=parseLeanFactory(a);return this[b](c,d).populate(e).select(h).sort(i).lean(j).limit(k).orFail().then(l).then(f).catch(g)}}module.exports=readFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXJzZUxlYW5GYWN0b3J5IiwicmVxdWlyZSIsInRvQnJlYWRFcnJvckZhY3RvcnkiLCJyZWFkRmFjdG9yeSIsInBsdWdpbk9wdGlvbnMiLCJiIiwiY3VzdG9tTGFiZWxzIiwiZG9jcyIsImFja25vd2xlZGdlZCIsInJlYWRDb3VudCIsInRvQnJlYWRSZXN1bHQiLCJyZXN1bHQiLCJ0b0JyZWFkRXJyb3IiLCJvcHRpb25zIiwiY3VzdG9tRmluZCIsInF1ZXJ5IiwicHJvamVjdGlvbiIsInBvcHVsYXRlIiwic2VsZWN0Iiwic29ydCIsImxlYW4iLCJsaW1pdCIsInBhcnNlTGVhbiIsIm9yRmFpbCIsInRoZW4iLCJjYXRjaCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yaWVzL3JlYWRGYWN0b3J5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgeyBNb25nb29zZUJyZWFkT3B0aW9ucywgTW9uZ29vc2VCcmVhZFJlYWRPcHRpb25zIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IHBhcnNlTGVhbkZhY3RvcnkgPSByZXF1aXJlKFwiLi9wYXJzZUxlYW5GYWN0b3J5XCIpO1xuY29uc3QgdG9CcmVhZEVycm9yRmFjdG9yeSA9IHJlcXVpcmUoXCIuL3RvQnJlYWRFcnJvckZhY3RvcnlcIik7XG5cbmZ1bmN0aW9uIHJlYWRGYWN0b3J5KHBsdWdpbk9wdGlvbnM6TW9uZ29vc2VCcmVhZE9wdGlvbnMpIHtcbiAgY29uc3QgeyBkb2NzLCBhY2tub3dsZWRnZWQsIHJlYWRDb3VudCB9ID0gcGx1Z2luT3B0aW9ucy5jdXN0b21MYWJlbHM7XG4gIGNvbnN0IHRvQnJlYWRSZXN1bHQgPSAocmVzdWx0OmFueSkgPT4gKHtcbiAgICBbZG9jc106IFtyZXN1bHRdLFxuICAgIFthY2tub3dsZWRnZWRdOiB0cnVlLFxuICAgIFtyZWFkQ291bnRdOiAxLFxuICB9KTtcbiAgY29uc3QgdG9CcmVhZEVycm9yID0gdG9CcmVhZEVycm9yRmFjdG9yeSh7XG4gICAgW2RvY3NdOiBbXSxcbiAgICBbYWNrbm93bGVkZ2VkXTogZmFsc2UsXG4gICAgW3JlYWRDb3VudF06IDAsXG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbiByZWFkKHRoaXM6TW9kZWw8YW55Piwgb3B0aW9uczpNb25nb29zZUJyZWFkT3B0aW9ucyAmIE1vbmdvb3NlQnJlYWRSZWFkT3B0aW9ucykge1xuICAgIGNvbnN0IHtcbiAgICAgIGN1c3RvbUZpbmQsXG4gICAgICBxdWVyeSxcbiAgICAgIHByb2plY3Rpb24sXG4gICAgICBwb3B1bGF0ZSxcbiAgICAgIHNlbGVjdCxcbiAgICAgIHNvcnQsXG4gICAgICBsZWFuLFxuICAgICAgbGltaXQsXG4gICAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgcGFyc2VMZWFuID0gcGFyc2VMZWFuRmFjdG9yeShvcHRpb25zKTtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gdGhpc1tjdXN0b21GaW5kXShxdWVyeSwgcHJvamVjdGlvbilcbiAgICAgIC5wb3B1bGF0ZShwb3B1bGF0ZSlcbiAgICAgIC5zZWxlY3Qoc2VsZWN0KVxuICAgICAgLnNvcnQoc29ydClcbiAgICAgIC5sZWFuKGxlYW4pXG4gICAgICAubGltaXQobGltaXQpXG4gICAgICAub3JGYWlsKClcbiAgICAgIC50aGVuKHBhcnNlTGVhbilcbiAgICAgIC50aGVuKHRvQnJlYWRSZXN1bHQpXG4gICAgICAuY2F0Y2godG9CcmVhZEVycm9yKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFkRmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6ImdCQUdNLENBQUFBLGdCQUFnQixDQUFHQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FDaERDLG1CQUFtQixDQUFHRCxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FFNUQsUUFBUyxDQUFBRSxXQUFXQSxDQUFDQyxDQUFrQyxDQUFFLEtBQUFDLENBQUEsQ0FDYkQsQ0FBYSxDQUFDRSxZQUFZLENBQTVEQyxDQUFJLENBQUFGLENBQUEsQ0FBSkUsSUFBSSxDQUFFQyxDQUFZLENBQUFILENBQUEsQ0FBWkcsWUFBWSxDQUFFQyxDQUFTLENBQUFKLENBQUEsQ0FBVEksU0FBUyxDQUMvQkMsQ0FBYSxDQUFHLFFBQUFBLENBQUNDLENBQVUsUUFBTSxDQUNyQyxDQUFDSixDQUFJLEVBQUcsQ0FBQ0ksQ0FBTSxDQUFDLENBQ2hCLENBQUNILENBQVksSUFBTyxDQUNwQixDQUFDQyxDQUFTLEVBQUcsQ0FDZixDQUFDLENBQUMsQ0FDSUcsQ0FBWSxDQUFHVixtQkFBbUIsQ0FBQyxDQUN2QyxDQUFDSyxDQUFJLEVBQUcsRUFBRSxDQUNWLENBQUNDLENBQVksSUFBUSxDQUNyQixDQUFDQyxDQUFTLEVBQUcsQ0FDZixDQUFDLENBQUMsQ0FFRixNQUFPLFVBQStCSSxDQUF1RCxDQUFFLElBRTNGLENBQUFDLENBQVUsQ0FRUkQsQ0FBTyxDQVJUQyxVQUFVLENBQ1ZDLENBQUssQ0FPSEYsQ0FBTyxDQVBURSxLQUFLLENBQ0xDLENBQVUsQ0FNUkgsQ0FBTyxDQU5URyxVQUFVLENBQ1ZDLENBQVEsQ0FLTkosQ0FBTyxDQUxUSSxRQUFRLENBQ1JDLENBQU0sQ0FJSkwsQ0FBTyxDQUpUSyxNQUFNLENBQ05DLENBQUksQ0FHRk4sQ0FBTyxDQUhUTSxJQUFJLENBQ0pDLENBQUksQ0FFRlAsQ0FBTyxDQUZUTyxJQUFJLENBQ0pDLENBQUssQ0FDSFIsQ0FBTyxDQURUUSxLQUFLLENBRURDLENBQVMsQ0FBR3RCLGdCQUFnQixDQUFDYSxDQUFPLENBQUMsQ0FHM0MsTUFBTyxLQUFJLENBQUNDLENBQVUsQ0FBQyxDQUFDQyxDQUFLLENBQUVDLENBQVUsQ0FBQyxDQUN2Q0MsUUFBUSxDQUFDQSxDQUFRLENBQUMsQ0FDbEJDLE1BQU0sQ0FBQ0EsQ0FBTSxDQUFDLENBQ2RDLElBQUksQ0FBQ0EsQ0FBSSxDQUFDLENBQ1ZDLElBQUksQ0FBQ0EsQ0FBSSxDQUFDLENBQ1ZDLEtBQUssQ0FBQ0EsQ0FBSyxDQUFDLENBQ1pFLE1BQU0sQ0FBQyxDQUFDLENBQ1JDLElBQUksQ0FBQ0YsQ0FBUyxDQUFDLENBQ2ZFLElBQUksQ0FBQ2QsQ0FBYSxDQUFDLENBQ25CZSxLQUFLLENBQUNiLENBQVksQ0FDdkIsQ0FDRixDQUVBYyxNQUFNLENBQUNDLE9BQU8sQ0FBR3hCLFdBQVciLCJpZ25vcmVMaXN0IjpbXX0=