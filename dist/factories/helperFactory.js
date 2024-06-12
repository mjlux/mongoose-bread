"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return(b=_toPropertyKey(b))in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toPropertyKey(a){var b=_toPrimitive(a,"string");return"symbol"==typeof b?b:b+""}function _toPrimitive(a,b){if("object"!=typeof a||!a)return a;var c=a[Symbol.toPrimitive];if(void 0!==c){var d=c.call(a,b||"default");if("object"!=typeof d)return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)}var _require=require("mongoose-paginate-v2"),PaginationParameters=_require.PaginationParameters,_require2=require("../Parser"),parseSelect=_require2.parseSelect,parseQuery=_require2.parseQuery,parseProjection=_require2.parseProjection,parseLimit=_require2.parseLimit,parseRequestParamsId=_require2.parseRequestParamsId,parseEditRequestBody=_require2.parseEditRequestBody,parseAddRequestBody=_require2.parseAddRequestBody,parseRequestBodyIds=_require2.parseRequestBodyIds,parseRequestUserIdPath=_require2.parseRequestUserIdPath;function convertStringToBoolean(a){return!("string"!=typeof a)&&("true"===a||"1"===a)}function Factory(a,b){function c(a){var c,d,e=(null===(c=a.__breadSoftDeleteHelperOptions)||void 0===c?void 0:c.issuer)||"createReadOptions",f=(null===(d=a.__breadSoftDeleteHelperOptions)||void 0===d?void 0:d.customFind)||"findOne",g=parseRequestParamsId(a,b,{issuer:e}),h=parseSelect(a.query||{});return{query:{_id:g},select:h,customFind:f}}function d(c){var d,e=Object.assign({},b,c.__breadSoftDeleteHelperOptions),f=c.query?_objectSpread({},c.query):{},g={query:_objectSpread(_objectSpread(_objectSpread({},e),f),{},{limit:parseLimit(f,e),query:parseQuery(f,e,a),projection:parseProjection(f,e),options:null===(d=c.query)||void 0===d?void 0:d.options})};delete g.query.options;var h=new PaginationParameters(g),i=h.getQuery(),j=h.getOptions();return j.customFind=e.customFind||"find",j.customCount=e.customCount||!1,j.leanWithout_id=f.leanWithout_id?convertStringToBoolean(f.leanWithout_id):e.leanWithout_id,{query:i,paginateOptions:j}}function e(a){var c=parseRequestParamsId(a,b,{issuer:"createEditOptions"});return{payload:a.body,query:{_id:c}}}function f(a){var c=parseRequestBodyIds(a,b,{issuer:"createEditOptions"}),d=parseEditRequestBody(a,b,{issuer:"createEditOptions"});return{bulk:!0,payload:d,query:{_id:{$in:_toConsumableArray(c)}}}}function g(a){var b=a.body;return{payload:b}}function h(a){var c=parseAddRequestBody(a,b,{issuer:"createAddOptions"});return{bulk:!0,payload:c}}function i(a){var c=parseRequestParamsId(a,b,{issuer:"createDeleteOptions"}),d=b.softDelete,e=b.softDeleteOptions,f=e.deletedBy,g=e.requestUserIdPath,h=d&&f&&g?parseRequestUserIdPath(a,{requestUserIdPath:g}):null;return{query:{_id:c},userId:h}}function j(a){var c=b.softDelete,d=b.softDeleteOptions,e=d.deletedBy,f=d.requestUserIdPath,g=parseRequestBodyIds(a,b,{issuer:"createDeleteOptions"}),h=c&&e&&f?parseRequestUserIdPath(a,{requestUserIdPath:f}):null;return{bulk:!0,userId:h,query:{_id:{$in:_toConsumableArray(g)}}}}function k(a){var c=parseRequestParamsId(a,b,{issuer:"createRehabilitateOptions"});return{query:{_id:c,deleted:!0}}}function l(a){var c=parseRequestBodyIds(a,b,{issuer:"createRehabilitateOptions"});return{bulk:!0,query:{_id:{$in:_toConsumableArray(c)},deleted:!0}}}var m={createBrowseOptions(a){var b=d(a);return b},createReadOptions(a){var b=this.createBrowseOptions(a),d=b.paginateOptions,e=c(a);return _objectSpread(_objectSpread({},d),e)},createEditOptions(a){var c=this.createBrowseOptions(a),d=c.paginateOptions,g=b.paramsIdKey,h=a.params&&a.params[g]?e(a):f(a);return _objectSpread(_objectSpread({},d),h)},createAddOptions(a){var c=b.bulkDocsKey,d=this.createBrowseOptions(a),e=d.paginateOptions,f=Object.hasOwnProperty.call(a.body,c)?h(a):g(a);return _objectSpread(_objectSpread({},e),f)},createDeleteOptions(a){var c=b.paramsIdKey,d=this.createBrowseOptions(a),e=d.paginateOptions,f=a.params&&a.params[c]?i(a):j(a);return _objectSpread(_objectSpread({},e),f)}};if(!b.softDelete)return m;var n=_objectSpread(_objectSpread({},m),{},{createBrowseDeletedOptions(a){a.__breadSoftDeleteHelperOptions={customFind:"findDeleted",customCount:"countDocumentsDeleted",issuer:"createBrowseDeletedOptions"};var b=this.createBrowseOptions(a);return delete a.__breadSoftDeleteHelperOptions,b},createReadDeletedOptions(a){a.__breadSoftDeleteHelperOptions={customFind:"findOneDeleted",customCount:"countDocumentsDeleted",issuer:"createReadDeletedOptions"};var b=this.createReadOptions(a);return delete a.__breadSoftDeleteHelperOptions,b},createRehabilitateOptions(a){var c=b.paramsIdKey,d=this.createBrowseOptions(a),e=d.paginateOptions,f=a.params&&a.params[c]?k(a):l(a);return _objectSpread(_objectSpread({},e),f)}});return n}module.exports=Factory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiUGFnaW5hdGlvblBhcmFtZXRlcnMiLCJfcmVxdWlyZSIsIl9yZXF1aXJlMiIsInBhcnNlU2VsZWN0IiwicGFyc2VRdWVyeSIsInBhcnNlUHJvamVjdGlvbiIsInBhcnNlTGltaXQiLCJwYXJzZVJlcXVlc3RQYXJhbXNJZCIsInBhcnNlRWRpdFJlcXVlc3RCb2R5IiwicGFyc2VBZGRSZXF1ZXN0Qm9keSIsInBhcnNlUmVxdWVzdEJvZHlJZHMiLCJwYXJzZVJlcXVlc3RVc2VySWRQYXRoIiwiY29udmVydFN0cmluZ1RvQm9vbGVhbiIsInN0ciIsIkZhY3RvcnkiLCJzY2hlbWEiLCJwbHVnaW5PcHRpb25zIiwiY3JlYXRlU2luZ2xlUmVhZE9wdGlvbnMiLCJyZXF1ZXN0IiwiYyIsImQiLCJpc3N1ZXIiLCJfX2JyZWFkU29mdERlbGV0ZUhlbHBlck9wdGlvbnMiLCJjdXN0b21GaW5kIiwiaWRQYXJhbSIsInNlbGVjdCIsInF1ZXJ5IiwiX2lkIiwiY3JlYXRlQnVsa1JlYWRPcHRpb25zIiwiX29wdGlvbnMiLCJPYmplY3QiLCJhc3NpZ24iLCJfcXVlcnkiLCJfb2JqZWN0U3ByZWFkIiwiX3JlcXVlc3QiLCJsaW1pdCIsInByb2plY3Rpb24iLCJvcHRpb25zIiwicGFnaW5hdGlvblBhcmFtcyIsImdldFF1ZXJ5IiwicGFnaW5hdGVPcHRpb25zIiwiZ2V0T3B0aW9ucyIsImN1c3RvbUNvdW50IiwibGVhbldpdGhvdXRfaWQiLCJjcmVhdGVTaW5nbGVFZGl0T3B0aW9ucyIsInBheWxvYWQiLCJib2R5IiwiY3JlYXRlQnVsa0VkaXRPcHRpb25zIiwiYm9keUlkcyIsImJ1bGsiLCIkaW4iLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJjcmVhdGVTaW5nbGVBZGRPcHRpb25zIiwibmV3RG9jdW1lbnQiLCJjcmVhdGVCdWxrQWRkT3B0aW9ucyIsIm5ld0RvY3VtZW50cyIsImNyZWF0ZVNpbmdsZURlbGV0ZU9wdGlvbnMiLCJzb2Z0RGVsZXRlIiwic29mdERlbGV0ZU9wdGlvbnMiLCJkZWxldGVkQnkiLCJyZXF1ZXN0VXNlcklkUGF0aCIsInVzZXJJZCIsImNyZWF0ZUJ1bGtEZWxldGVPcHRpb25zIiwiY3JlYXRlU2luZ2xlUmVoYWJpbGl0YXRlT3B0aW9ucyIsImRlbGV0ZWQiLCJjcmVhdGVCdWxrUmVoYWJpbGl0YXRlT3B0aW9ucyIsImhlbHBlck1ldGhvZHMiLCJjcmVhdGVCcm93c2VPcHRpb25zIiwiY3JlYXRlUmVhZE9wdGlvbnMiLCJiIiwiY3JlYXRlRWRpdE9wdGlvbnMiLCJwYXJhbXNJZEtleSIsInBhcmFtcyIsImNyZWF0ZUFkZE9wdGlvbnMiLCJidWxrRG9jc0tleSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImNyZWF0ZURlbGV0ZU9wdGlvbnMiLCJzb2Z0RGVsZXRlSGVscGVyTWV0aG9kcyIsImNyZWF0ZUJyb3dzZURlbGV0ZWRPcHRpb25zIiwiY3JlYXRlUmVhZERlbGV0ZWRPcHRpb25zIiwiY3JlYXRlUmVoYWJpbGl0YXRlT3B0aW9ucyIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvZmFjdG9yaWVzL2hlbHBlckZhY3RvcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5pbXBvcnQgeyBNb25nb29zZUJyZWFkT3B0aW9ucywgTW9uZ29vc2VCcmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcImV4cHJlc3NcIjtcblxuY29uc3QgeyBQYWdpbmF0aW9uUGFyYW1ldGVycyB9ID0gcmVxdWlyZShcIm1vbmdvb3NlLXBhZ2luYXRlLXYyXCIpO1xuY29uc3Qge1xuICBwYXJzZVNlbGVjdCxcbiAgcGFyc2VRdWVyeSxcbiAgcGFyc2VQcm9qZWN0aW9uLFxuICBwYXJzZUxpbWl0LFxuICBwYXJzZVJlcXVlc3RQYXJhbXNJZCxcbiAgcGFyc2VFZGl0UmVxdWVzdEJvZHksXG4gIHBhcnNlQWRkUmVxdWVzdEJvZHksXG4gIHBhcnNlUmVxdWVzdEJvZHlJZHMsXG4gIHBhcnNlUmVxdWVzdFVzZXJJZFBhdGgsXG59ID0gcmVxdWlyZShcIi4uL1BhcnNlclwiKTtcblxuZnVuY3Rpb24gY29udmVydFN0cmluZ1RvQm9vbGVhbihzdHI6c3RyaW5nKSB7XG4gIHJldHVybiB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiID8gc3RyID09PSBcInRydWVcIiB8fCBzdHIgPT09IFwiMVwiIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIEZhY3Rvcnkoc2NoZW1hOlNjaGVtYSwgcGx1Z2luT3B0aW9uczpNb25nb29zZUJyZWFkT3B0aW9ucykge1xuICAvLyByZWFkIC0gc2luZ2xlIG9yIGJ1bGsgKGJyb3dzZSlcbiAgZnVuY3Rpb24gY3JlYXRlU2luZ2xlUmVhZE9wdGlvbnMocmVxdWVzdDpSZXF1ZXN0ICYgTW9uZ29vc2VCcmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zKSB7XG4gICAgY29uc3QgaXNzdWVyID1cbiAgICAgIHJlcXVlc3QuX19icmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zPy5pc3N1ZXIgfHwgXCJjcmVhdGVSZWFkT3B0aW9uc1wiO1xuICAgIGNvbnN0IGN1c3RvbUZpbmQgPVxuICAgICAgcmVxdWVzdC5fX2JyZWFkU29mdERlbGV0ZUhlbHBlck9wdGlvbnM/LmN1c3RvbUZpbmQgfHwgXCJmaW5kT25lXCI7XG5cbiAgICBjb25zdCBpZFBhcmFtID0gcGFyc2VSZXF1ZXN0UGFyYW1zSWQocmVxdWVzdCwgcGx1Z2luT3B0aW9ucywgeyBpc3N1ZXIgfSk7XG4gICAgY29uc3Qgc2VsZWN0ID0gcGFyc2VTZWxlY3QocmVxdWVzdC5xdWVyeSB8fCB7fSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHsgX2lkOiBpZFBhcmFtIH0sXG4gICAgICBzZWxlY3QsXG4gICAgICBjdXN0b21GaW5kLFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlQnVsa1JlYWRPcHRpb25zKHJlcXVlc3Q6UmVxdWVzdCAmIE1vbmdvb3NlQnJlYWRTb2Z0RGVsZXRlSGVscGVyT3B0aW9ucykge1xuICAgIGNvbnN0IF9vcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgcGx1Z2luT3B0aW9ucyxcbiAgICAgIHJlcXVlc3QuX19icmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zXG4gICAgKTtcblxuICAgIGNvbnN0IF9xdWVyeSA9IHJlcXVlc3QucXVlcnkgPyB7IC4uLnJlcXVlc3QucXVlcnkgfSA6IHt9O1xuXG4gICAgY29uc3QgX3JlcXVlc3QgPSB7XG4gICAgICBxdWVyeToge1xuICAgICAgICAuLi5fb3B0aW9ucyxcbiAgICAgICAgLi4uX3F1ZXJ5LFxuICAgICAgICBsaW1pdDogcGFyc2VMaW1pdChfcXVlcnksIF9vcHRpb25zKSxcbiAgICAgICAgcXVlcnk6IHBhcnNlUXVlcnkoX3F1ZXJ5LCBfb3B0aW9ucywgc2NoZW1hKSxcbiAgICAgICAgcHJvamVjdGlvbjogcGFyc2VQcm9qZWN0aW9uKF9xdWVyeSwgX29wdGlvbnMpLFxuICAgICAgICBvcHRpb25zOiByZXF1ZXN0LnF1ZXJ5Py5vcHRpb25zXG4gICAgICB9LFxuICAgIH07XG4gICAgZGVsZXRlIF9yZXF1ZXN0LnF1ZXJ5Lm9wdGlvbnM7IC8vICEhISBsZWFkcyB0byBpbmlmaW5pdGUgcmVjdXJzaXZlIGxvb3AgaWYgc2V0XG4gICAgY29uc3QgcGFnaW5hdGlvblBhcmFtcyA9IG5ldyBQYWdpbmF0aW9uUGFyYW1ldGVycyhfcmVxdWVzdCk7XG4gICAgY29uc3QgcXVlcnkgPSBwYWdpbmF0aW9uUGFyYW1zLmdldFF1ZXJ5KCk7XG4gICAgY29uc3QgcGFnaW5hdGVPcHRpb25zID0gcGFnaW5hdGlvblBhcmFtcy5nZXRPcHRpb25zKCk7XG4gICAgcGFnaW5hdGVPcHRpb25zLmN1c3RvbUZpbmQgPSBfb3B0aW9ucy5jdXN0b21GaW5kIHx8IFwiZmluZFwiO1xuICAgIHBhZ2luYXRlT3B0aW9ucy5jdXN0b21Db3VudCA9IF9vcHRpb25zLmN1c3RvbUNvdW50IHx8IGZhbHNlO1xuICAgIHBhZ2luYXRlT3B0aW9ucy5sZWFuV2l0aG91dF9pZCA9IF9xdWVyeS5sZWFuV2l0aG91dF9pZFxuICAgICAgPyBjb252ZXJ0U3RyaW5nVG9Cb29sZWFuKF9xdWVyeS5sZWFuV2l0aG91dF9pZCBhcyBzdHJpbmcpXG4gICAgICA6IF9vcHRpb25zLmxlYW5XaXRob3V0X2lkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJ5LFxuICAgICAgcGFnaW5hdGVPcHRpb25zLFxuICAgIH07XG4gIH1cbiAgLy8gZWRpdCAtIHNpbmdsZSBvciBidWxrXG4gIGZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUVkaXRPcHRpb25zKHJlcXVlc3Q6UmVxdWVzdCkge1xuICAgIGNvbnN0IGlkUGFyYW0gPSBwYXJzZVJlcXVlc3RQYXJhbXNJZChyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCB7XG4gICAgICBpc3N1ZXI6IFwiY3JlYXRlRWRpdE9wdGlvbnNcIixcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYXlsb2FkOiByZXF1ZXN0LmJvZHksXG4gICAgICBxdWVyeTogeyBfaWQ6IGlkUGFyYW0gfSxcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZUJ1bGtFZGl0T3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICBjb25zdCBib2R5SWRzID0gcGFyc2VSZXF1ZXN0Qm9keUlkcyhyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCB7XG4gICAgICBpc3N1ZXI6IFwiY3JlYXRlRWRpdE9wdGlvbnNcIixcbiAgICB9KTtcbiAgICBjb25zdCBwYXlsb2FkID0gcGFyc2VFZGl0UmVxdWVzdEJvZHkocmVxdWVzdCwgcGx1Z2luT3B0aW9ucywge1xuICAgICAgaXNzdWVyOiBcImNyZWF0ZUVkaXRPcHRpb25zXCIsXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnVsazogdHJ1ZSxcbiAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICBxdWVyeTogeyBfaWQ6IHsgJGluOiBbLi4uYm9keUlkc10gfSB9LFxuICAgIH07XG4gIH1cbiAgLy8gYWRkIC0gc2luZ2xlIG9yIGJ1bGtcbiAgZnVuY3Rpb24gY3JlYXRlU2luZ2xlQWRkT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICBjb25zdCBuZXdEb2N1bWVudCA9IHJlcXVlc3QuYm9keTtcbiAgICByZXR1cm4ge1xuICAgICAgcGF5bG9hZDogbmV3RG9jdW1lbnQsXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVCdWxrQWRkT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICBjb25zdCBuZXdEb2N1bWVudHMgPSBwYXJzZUFkZFJlcXVlc3RCb2R5KHJlcXVlc3QsIHBsdWdpbk9wdGlvbnMsIHtcbiAgICAgIGlzc3VlcjogXCJjcmVhdGVBZGRPcHRpb25zXCIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJ1bGs6IHRydWUsXG4gICAgICBwYXlsb2FkOiBuZXdEb2N1bWVudHMsXG4gICAgfTtcbiAgfVxuICAvLyBkZWxldGUgLSBzaW5nbGUgb3IgYnVsa1xuICBmdW5jdGlvbiBjcmVhdGVTaW5nbGVEZWxldGVPcHRpb25zKHJlcXVlc3Q6UmVxdWVzdCkge1xuICAgIGNvbnN0IGlkUGFyYW0gPSBwYXJzZVJlcXVlc3RQYXJhbXNJZChyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCB7XG4gICAgICBpc3N1ZXI6IFwiY3JlYXRlRGVsZXRlT3B0aW9uc1wiLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgc29mdERlbGV0ZSwgc29mdERlbGV0ZU9wdGlvbnMgfSA9IHBsdWdpbk9wdGlvbnM7XG4gICAgY29uc3QgeyBkZWxldGVkQnksIHJlcXVlc3RVc2VySWRQYXRoIH0gPSBzb2Z0RGVsZXRlT3B0aW9ucztcblxuICAgIGNvbnN0IHVzZXJJZCA9XG4gICAgICBzb2Z0RGVsZXRlICYmIGRlbGV0ZWRCeSAmJiByZXF1ZXN0VXNlcklkUGF0aFxuICAgICAgICA/IHBhcnNlUmVxdWVzdFVzZXJJZFBhdGgocmVxdWVzdCwgeyByZXF1ZXN0VXNlcklkUGF0aCB9KVxuICAgICAgICA6IG51bGw7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcXVlcnk6IHsgX2lkOiBpZFBhcmFtIH0sXG4gICAgICB1c2VySWQsXG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVCdWxrRGVsZXRlT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICBjb25zdCB7IHNvZnREZWxldGUsIHNvZnREZWxldGVPcHRpb25zIH0gPSBwbHVnaW5PcHRpb25zO1xuICAgIGNvbnN0IHsgZGVsZXRlZEJ5LCByZXF1ZXN0VXNlcklkUGF0aCB9ID0gc29mdERlbGV0ZU9wdGlvbnM7XG5cbiAgICBjb25zdCBib2R5SWRzID0gcGFyc2VSZXF1ZXN0Qm9keUlkcyhyZXF1ZXN0LCBwbHVnaW5PcHRpb25zLCB7XG4gICAgICBpc3N1ZXI6IFwiY3JlYXRlRGVsZXRlT3B0aW9uc1wiLFxuICAgIH0pO1xuXG4gICAgY29uc3QgdXNlcklkID1cbiAgICAgIHNvZnREZWxldGUgJiYgZGVsZXRlZEJ5ICYmIHJlcXVlc3RVc2VySWRQYXRoXG4gICAgICAgID8gcGFyc2VSZXF1ZXN0VXNlcklkUGF0aChyZXF1ZXN0LCB7IHJlcXVlc3RVc2VySWRQYXRoIH0pXG4gICAgICAgIDogbnVsbDtcblxuICAgIHJldHVybiB7XG4gICAgICBidWxrOiB0cnVlLFxuICAgICAgdXNlcklkLFxuICAgICAgcXVlcnk6IHsgX2lkOiB7ICRpbjogWy4uLmJvZHlJZHNdIH0gfSxcbiAgICB9O1xuICB9XG4gIC8vIHJlaGFiaWxpdGF0ZSAtIHNpbmdsZSBvciBidWxrXG4gIGZ1bmN0aW9uIGNyZWF0ZVNpbmdsZVJlaGFiaWxpdGF0ZU9wdGlvbnMocmVxdWVzdDpSZXF1ZXN0KSB7XG4gICAgY29uc3QgaWRQYXJhbSA9IHBhcnNlUmVxdWVzdFBhcmFtc0lkKHJlcXVlc3QsIHBsdWdpbk9wdGlvbnMsIHtcbiAgICAgIGlzc3VlcjogXCJjcmVhdGVSZWhhYmlsaXRhdGVPcHRpb25zXCIsXG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHF1ZXJ5OiB7IF9pZDogaWRQYXJhbSwgZGVsZXRlZDogdHJ1ZSB9LFxuICAgIH07XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlQnVsa1JlaGFiaWxpdGF0ZU9wdGlvbnMocmVxdWVzdDpSZXF1ZXN0KSB7XG4gICAgY29uc3QgYm9keUlkcyA9IHBhcnNlUmVxdWVzdEJvZHlJZHMocmVxdWVzdCwgcGx1Z2luT3B0aW9ucywge1xuICAgICAgaXNzdWVyOiBcImNyZWF0ZVJlaGFiaWxpdGF0ZU9wdGlvbnNcIixcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBidWxrOiB0cnVlLFxuICAgICAgcXVlcnk6IHsgX2lkOiB7ICRpbjogWy4uLmJvZHlJZHNdIH0sIGRlbGV0ZWQ6IHRydWUgfSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaGVscGVyTWV0aG9kcyA9IHtcbiAgICBjcmVhdGVCcm93c2VPcHRpb25zKHJlcXVlc3Q6UmVxdWVzdCkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IGNyZWF0ZUJ1bGtSZWFkT3B0aW9ucyhyZXF1ZXN0KTtcblxuICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgfSxcbiAgICBjcmVhdGVSZWFkT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHsgcGFnaW5hdGVPcHRpb25zIH0gPSB0aGlzLmNyZWF0ZUJyb3dzZU9wdGlvbnMocmVxdWVzdCk7XG4gICAgICBjb25zdCBvcHRpb25zID0gY3JlYXRlU2luZ2xlUmVhZE9wdGlvbnMocmVxdWVzdCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnBhZ2luYXRlT3B0aW9ucyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG4gICAgfSxcbiAgICBjcmVhdGVFZGl0T3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHsgcGFnaW5hdGVPcHRpb25zIH0gPSB0aGlzLmNyZWF0ZUJyb3dzZU9wdGlvbnMocmVxdWVzdCk7XG4gICAgICBjb25zdCB7IHBhcmFtc0lkS2V5IH0gPSBwbHVnaW5PcHRpb25zO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9XG4gICAgICAgIHJlcXVlc3QucGFyYW1zICYmIHJlcXVlc3QucGFyYW1zW3BhcmFtc0lkS2V5XVxuICAgICAgICAgID8gY3JlYXRlU2luZ2xlRWRpdE9wdGlvbnMocmVxdWVzdClcbiAgICAgICAgICA6IGNyZWF0ZUJ1bGtFZGl0T3B0aW9ucyhyZXF1ZXN0KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucGFnaW5hdGVPcHRpb25zLFxuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZUFkZE9wdGlvbnMocmVxdWVzdDpSZXF1ZXN0KSB7XG4gICAgICBjb25zdCB7IGJ1bGtEb2NzS2V5IH0gPSBwbHVnaW5PcHRpb25zO1xuICAgICAgY29uc3QgeyBwYWdpbmF0ZU9wdGlvbnMgfSA9IHRoaXMuY3JlYXRlQnJvd3NlT3B0aW9ucyhyZXF1ZXN0KTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVlc3QuYm9keSwgYnVsa0RvY3NLZXkpXG4gICAgICAgID8gY3JlYXRlQnVsa0FkZE9wdGlvbnMocmVxdWVzdClcbiAgICAgICAgOiBjcmVhdGVTaW5nbGVBZGRPcHRpb25zKHJlcXVlc3QpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5wYWdpbmF0ZU9wdGlvbnMsXG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICB9O1xuICAgIH0sXG4gICAgY3JlYXRlRGVsZXRlT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHsgcGFyYW1zSWRLZXkgfSA9IHBsdWdpbk9wdGlvbnM7XG4gICAgICBjb25zdCB7IHBhZ2luYXRlT3B0aW9ucyB9ID0gdGhpcy5jcmVhdGVCcm93c2VPcHRpb25zKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9XG4gICAgICAgIHJlcXVlc3QucGFyYW1zICYmIHJlcXVlc3QucGFyYW1zW3BhcmFtc0lkS2V5XVxuICAgICAgICAgID8gY3JlYXRlU2luZ2xlRGVsZXRlT3B0aW9ucyhyZXF1ZXN0KVxuICAgICAgICAgIDogY3JlYXRlQnVsa0RlbGV0ZU9wdGlvbnMocmVxdWVzdCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnBhZ2luYXRlT3B0aW9ucyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG4gICAgfSxcbiAgfTtcblxuICBpZiAoIXBsdWdpbk9wdGlvbnMuc29mdERlbGV0ZSkge1xuICAgIHJldHVybiBoZWxwZXJNZXRob2RzO1xuICB9XG5cbiAgY29uc3Qgc29mdERlbGV0ZUhlbHBlck1ldGhvZHMgPSB7XG4gICAgLi4uaGVscGVyTWV0aG9kcyxcbiAgICBjcmVhdGVCcm93c2VEZWxldGVkT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QgJiBNb25nb29zZUJyZWFkU29mdERlbGV0ZUhlbHBlck9wdGlvbnMpIHtcbiAgICAgIHJlcXVlc3QuX19icmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zID0ge1xuICAgICAgICBjdXN0b21GaW5kOiBcImZpbmREZWxldGVkXCIsXG4gICAgICAgIGN1c3RvbUNvdW50OiBcImNvdW50RG9jdW1lbnRzRGVsZXRlZFwiLFxuICAgICAgICBpc3N1ZXI6IFwiY3JlYXRlQnJvd3NlRGVsZXRlZE9wdGlvbnNcIixcbiAgICAgIH07XG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVCcm93c2VPcHRpb25zKHJlcXVlc3QpO1xuICAgICAgZGVsZXRlIHJlcXVlc3QuX19icmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zO1xuXG4gICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9LFxuICAgIGNyZWF0ZVJlYWREZWxldGVkT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QgJiBNb25nb29zZUJyZWFkU29mdERlbGV0ZUhlbHBlck9wdGlvbnMpIHtcbiAgICAgIHJlcXVlc3QuX19icmVhZFNvZnREZWxldGVIZWxwZXJPcHRpb25zID0ge1xuICAgICAgICBjdXN0b21GaW5kOiBcImZpbmRPbmVEZWxldGVkXCIsXG4gICAgICAgIGN1c3RvbUNvdW50OiBcImNvdW50RG9jdW1lbnRzRGVsZXRlZFwiLFxuICAgICAgICBpc3N1ZXI6IFwiY3JlYXRlUmVhZERlbGV0ZWRPcHRpb25zXCIsXG4gICAgICB9O1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlUmVhZE9wdGlvbnMocmVxdWVzdCk7XG4gICAgICBkZWxldGUgcmVxdWVzdC5fX2JyZWFkU29mdERlbGV0ZUhlbHBlck9wdGlvbnM7XG5cbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH0sXG4gICAgY3JlYXRlUmVoYWJpbGl0YXRlT3B0aW9ucyhyZXF1ZXN0OlJlcXVlc3QpIHtcbiAgICAgIGNvbnN0IHsgcGFyYW1zSWRLZXkgfSA9IHBsdWdpbk9wdGlvbnM7XG4gICAgICBjb25zdCB7IHBhZ2luYXRlT3B0aW9ucyB9ID0gdGhpcy5jcmVhdGVCcm93c2VPcHRpb25zKHJlcXVlc3QpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9XG4gICAgICAgIHJlcXVlc3QucGFyYW1zICYmIHJlcXVlc3QucGFyYW1zW3BhcmFtc0lkS2V5XVxuICAgICAgICAgID8gY3JlYXRlU2luZ2xlUmVoYWJpbGl0YXRlT3B0aW9ucyhyZXF1ZXN0KVxuICAgICAgICAgIDogY3JlYXRlQnVsa1JlaGFiaWxpdGF0ZU9wdGlvbnMocmVxdWVzdCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnBhZ2luYXRlT3B0aW9ucyxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gc29mdERlbGV0ZUhlbHBlck1ldGhvZHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6IjhrRUFJaUNBLE9BQU8sQ0FBQyxzQkFB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