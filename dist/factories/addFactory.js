"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(b,c){if(b){if("string"==typeof b)return _arrayLikeToArray(b,c);var a={}.toString.call(b).slice(8,-1);return"Object"===a&&b.constructor&&(a=b.constructor.name),"Map"===a||"Set"===a?Array.from(b):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(b,c):void 0}}function _arrayLikeToArray(b,c){(null==c||c>b.length)&&(c=b.length);for(var d=0,f=Array(c);d<c;d++)f[d]=b[d];return f}function _iterableToArrayLimit(b,c){var d=null==b?null:"undefined"!=typeof Symbol&&b[Symbol.iterator]||b["@@iterator"];if(null!=d){var g,h,j,k,l=[],a=!0,m=!1;try{if(j=(d=d.call(b)).next,0===c){if(Object(d)!==d)return;a=!1}else for(;!(a=(g=j.call(d)).done)&&(l.push(g.value),l.length!==c);a=!0);}catch(a){m=!0,h=a}finally{try{if(!a&&null!=d.return&&(k=d.return(),Object(k)!==k))return}finally{if(m)throw h}}return l}}function _arrayWithHoles(a){if(Array.isArray(a))return a}var parseLeanFactory=require("./parseLeanFactory"),toBreadErrorFactory=require("./toBreadErrorFactory");function addFactory(a){var b=a.customLabels,c=b.docs,d=b.acknowledged,e=b.createdCount,f=function(a){var b=_slicedToArray(a,2),f=b[0],g=b[1];return{[c]:g,[d]:f.acknowledged,[e]:f.createdCount}},g=toBreadErrorFactory({[c]:[],[d]:!1,[e]:0});return function(a){var b=this,c=a.bulk,d=a.payload,e=a.projection,h=a.populate,i=a.select,j=a.sort,k=a.lean,l=a.limit,m=parseLeanFactory(a);return this.create(d).then(function mergeCreateAndCount(a){var d=c?{_id:{$in:_toConsumableArray(a.map(function(a){return a._id}))}}:{_id:null===a||void 0===a?void 0:a._id};return Promise.all([Promise.resolve({acknowledged:!0,createdCount:c?a.length:1}),b.find(d,e).populate(h).select(i).sort(j).lean(k).limit(l).orFail().then(m)])}).then(f).catch(g)}}module.exports=addFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwYXJzZUxlYW5GYWN0b3J5IiwicmVxdWlyZSIsInRvQnJlYWRFcnJvckZhY3RvcnkiLCJhZGRGYWN0b3J5IiwicGx1Z2luT3B0aW9ucyIsImIiLCJjdXN0b21MYWJlbHMiLCJkb2NzIiwiYWNrbm93bGVkZ2VkIiwiY3JlYXRlZENvdW50IiwidG9CcmVhZFJlc3VsdCIsImEiLCJfc2xpY2VkVG9BcnJheSIsInJlc3VsdCIsIl9kb2NzIiwidG9CcmVhZEVycm9yIiwib3B0aW9ucyIsImJ1bGsiLCJwYXlsb2FkIiwicHJvamVjdGlvbiIsInBvcHVsYXRlIiwic2VsZWN0Iiwic29ydCIsImxlYW4iLCJsaW1pdCIsInBhcnNlTGVhbiIsImNyZWF0ZSIsInRoZW4iLCJtZXJnZUNyZWF0ZUFuZENvdW50IiwicXVlcnkiLCJfaWQiLCIkaW4iLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJtYXAiLCJkIiwiUHJvbWlzZSIsImFsbCIsInJlc29sdmUiLCJsZW5ndGgiLCJmaW5kIiwib3JGYWlsIiwiY2F0Y2giLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3Rvcmllcy9hZGRGYWN0b3J5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IHBhcnNlTGVhbkZhY3RvcnkgPSByZXF1aXJlKFwiLi9wYXJzZUxlYW5GYWN0b3J5XCIpO1xuY29uc3QgdG9CcmVhZEVycm9yRmFjdG9yeSA9IHJlcXVpcmUoXCIuL3RvQnJlYWRFcnJvckZhY3RvcnlcIik7XG5cbmZ1bmN0aW9uIGFkZEZhY3RvcnkocGx1Z2luT3B0aW9uczpNb25nb29zZUJyZWFkT3B0aW9ucykge1xuICBjb25zdCB7IGRvY3MsIGFja25vd2xlZGdlZCwgY3JlYXRlZENvdW50IH0gPSBwbHVnaW5PcHRpb25zLmN1c3RvbUxhYmVscztcbiAgY29uc3QgdG9CcmVhZFJlc3VsdCA9IChbcmVzdWx0LCBfZG9jc10gOiBbYW55LCBhbnldKSA9PiAoe1xuICAgIFtkb2NzXTogX2RvY3MsXG4gICAgW2Fja25vd2xlZGdlZF06IHJlc3VsdC5hY2tub3dsZWRnZWQsXG4gICAgW2NyZWF0ZWRDb3VudF06IHJlc3VsdC5jcmVhdGVkQ291bnQsXG4gIH0pO1xuICBjb25zdCB0b0JyZWFkRXJyb3IgPSB0b0JyZWFkRXJyb3JGYWN0b3J5KHtcbiAgICBbZG9jc106IFtdLFxuICAgIFthY2tub3dsZWRnZWRdOiBmYWxzZSxcbiAgICBbY3JlYXRlZENvdW50XTogMCxcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGFkZCh0aGlzOk1vZGVsPGFueT4sIG9wdGlvbnM6TW9uZ29vc2VCcmVhZEFkZE9wdGlvbnMpIHtcbiAgICBjb25zdCB7IGJ1bGssIHBheWxvYWQsIHByb2plY3Rpb24sIHBvcHVsYXRlLCBzZWxlY3QsIHNvcnQsIGxlYW4sIGxpbWl0IH0gPVxuICAgICAgb3B0aW9ucztcbiAgICBjb25zdCBwYXJzZUxlYW4gPSBwYXJzZUxlYW5GYWN0b3J5KG9wdGlvbnMpO1xuXG4gICAgY29uc3QgbWVyZ2VDcmVhdGVBbmRDb3VudCA9IChyZXN1bHQ6YW55KSA9PiB7XG4gICAgICBjb25zdCBxdWVyeSA9IGJ1bGtcbiAgICAgICAgPyB7IF9pZDogeyAkaW46IFsuLi5yZXN1bHQubWFwKChkOmFueSkgPT4gZC5faWQpXSB9IH1cbiAgICAgICAgOiB7IF9pZDogcmVzdWx0Py5faWQgfTtcblxuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICBhY2tub3dsZWRnZWQ6IHRydWUsXG4gICAgICAgICAgY3JlYXRlZENvdW50OiBidWxrID8gcmVzdWx0Lmxlbmd0aCA6IDEsXG4gICAgICAgIH0pLFxuICAgICAgICB0aGlzLmZpbmQocXVlcnksIHByb2plY3Rpb24pXG4gICAgICAgICAgLnBvcHVsYXRlKHBvcHVsYXRlKVxuICAgICAgICAgIC5zZWxlY3Qoc2VsZWN0KVxuICAgICAgICAgIC5zb3J0KHNvcnQpXG4gICAgICAgICAgLmxlYW4obGVhbilcbiAgICAgICAgICAubGltaXQobGltaXQpXG4gICAgICAgICAgLm9yRmFpbCgpXG4gICAgICAgICAgLnRoZW4ocGFyc2VMZWFuKSxcbiAgICAgIF0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5jcmVhdGUocGF5bG9hZClcbiAgICAgIC50aGVuKG1lcmdlQ3JlYXRlQW5kQ291bnQpXG4gICAgICAudGhlbih0b0JyZWFkUmVzdWx0KVxuICAgICAgLmNhdGNoKHRvQnJlYWRFcnJvcik7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkRmFjdG9yeTtcbiJdLCJtYXBwaW5ncyI6Imd3REFFTSxDQUFBQSxnQkFBZ0IsQ0FBR0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQ2hEQyxtQkFBbUIsQ0FBR0QsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBRTVELFFBQVMsQ0FBQUUsVUFBVUEsQ0FBQ0MsQ0FBa0MsQ0FBRSxLQUFBQyxDQUFBLENBQ1RELENBQWEsQ0FBQ0UsWUFBWSxDQUEvREMsQ0FBSSxDQUFBRixDQUFBLENBQUpFLElBQUksQ0FBRUMsQ0FBWSxDQUFBSCxDQUFBLENBQVpHLFlBQVksQ0FBRUMsQ0FBWSxDQUFBSixDQUFBLENBQVpJLFlBQVksQ0FDbENDLENBQWEsQ0FBRyxRQUFBQSxDQUFBQyxDQUFBLE1BQUFOLENBQUEsQ0FBQU8sY0FBQSxDQUFBRCxDQUFBLElBQUVFLENBQU0sQ0FBQVIsQ0FBQSxJQUFFUyxDQUFLLENBQUFULENBQUEsVUFBb0IsQ0FDdkQsQ0FBQ0UsQ0FBSSxFQUFHTyxDQUFLLENBQ2IsQ0FBQ04sQ0FBWSxFQUFHSyxDQUFNLENBQUNMLFlBQVksQ0FDbkMsQ0FBQ0MsQ0FBWSxFQUFHSSxDQUFNLENBQUNKLFlBQ3pCLENBQUMsQ0FBQyxDQUNJTSxDQUFZLENBQUdiLG1CQUFtQixDQUFDLENBQ3ZDLENBQUNLLENBQUksRUFBRyxFQUFFLENBQ1YsQ0FBQ0MsQ0FBWSxJQUFRLENBQ3JCLENBQUNDLENBQVksRUFBRyxDQUNsQixDQUFDLENBQUMsQ0FFRixNQUFPLFVBQThCTyxDQUErQixDQUFFLEtBQUFYLENBQUEsTUFDNURZLENBQUksQ0FDVkQsQ0FBTyxDQUREQyxJQUFJLENBQUVDLENBQU8sQ0FDbkJGLENBQU8sQ0FES0UsT0FBTyxDQUFFQyxDQUFVLENBQy9CSCxDQUFPLENBRGNHLFVBQVUsQ0FBRUMsQ0FBUSxDQUN6Q0osQ0FBTyxDQUQwQkksUUFBUSxDQUFFQyxDQUFNLENBQ2pETCxDQUFPLENBRG9DSyxNQUFNLENBQUVDLENBQUksQ0FDdkROLENBQU8sQ0FENENNLElBQUksQ0FBRUMsQ0FBSSxDQUM3RFAsQ0FBTyxDQURrRE8sSUFBSSxDQUFFQyxDQUFLLENBQ3BFUixDQUFPLENBRHdEUSxLQUFLLENBRWhFQyxDQUFTLENBQUd6QixnQkFBZ0IsQ0FBQ2dCLENBQU8sQ0FBQyxDQXVCM0MsTUFBTyxLQUFJLENBQUNVLE1BQU0sQ0FBQ1IsQ0FBTyxDQUFDLENBQ3hCUyxJQUFJLENBdEJxQixRQUF0QixDQUFBQyxtQkFBbUJBLENBQUlmLENBQVUsQ0FBSyxDQUMxQyxHQUFNLENBQUFnQixDQUFLLENBQUdaLENBQUksQ0FDZCxDQUFFYSxHQUFHLENBQUUsQ0FBRUMsR0FBRyxDQUFBQyxrQkFBQSxDQUFNbkIsQ0FBTSxDQUFDb0IsR0FBRyxDQUFDLFNBQUNDLENBQUssUUFBSyxDQUFBQSxDQUFDLENBQUNKLEdBQUcsRUFBQyxDQUFFLENBQUUsQ0FBQyxDQUNuRCxDQUFFQSxHQUFHLFFBQUVqQixDQUFNLFdBQU5BLENBQU0sUUFBTkEsQ0FBTSxDQUFFaUIsR0FBSSxDQUFDLENBRXhCLE1BQU8sQ0FBQUssT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FDakJELE9BQU8sQ0FBQ0UsT0FBTyxDQUFDLENBQ2Q3QixZQUFZLEdBQU0sQ0FDbEJDLFlBQVksQ0FBRVEsQ0FBSSxDQUFHSixDQUFNLENBQUN5QixNQUFNLENBQUcsQ0FDdkMsQ0FBQyxDQUFDLENBQ0ZqQyxDQUFJLENBQUNrQyxJQUFJLENBQUNWLENBQUssQ0FBRVYsQ0FBVSxDQUFDLENBQ3pCQyxRQUFRLENBQUNBLENBQVEsQ0FBQyxDQUNsQkMsTUFBTSxDQUFDQSxDQUFNLENBQUMsQ0FDZEMsSUFBSSxDQUFDQSxDQUFJLENBQUMsQ0FDVkMsSUFBSSxDQUFDQSxDQUFJLENBQUMsQ0FDVkMsS0FBSyxDQUFDQSxDQUFLLENBQUMsQ0FDWmdCLE1BQU0sQ0FBQyxDQUFDLENBQ1JiLElBQUksQ0FBQ0YsQ0FBUyxDQUFDLENBQ25CLENBQ0gsQ0FHMkIsQ0FBQyxDQUN6QkUsSUFBSSxDQUFDakIsQ0FBYSxDQUFDLENBQ25CK0IsS0FBSyxDQUFDMUIsQ0FBWSxDQUN2QixDQUNGLENBRUEyQixNQUFNLENBQUNDLE9BQU8sQ0FBR3hDLFVBQVUiLCJpZ25vcmVMaXN0IjpbXX0=