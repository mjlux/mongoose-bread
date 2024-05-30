"use strict";function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,_toPropertyKey(c.key),c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),Object.defineProperty(a,"prototype",{writable:!1}),a}function _classCallCheck(b,a){if(!(b instanceof a))throw new TypeError("Cannot call a class as a function")}function _callSuper(a,b,c){return b=_getPrototypeOf(b),_possibleConstructorReturn(a,_isNativeReflectConstruct()?Reflect.construct(b,c||[],_getPrototypeOf(a).constructor):b.apply(a,c))}function _possibleConstructorReturn(a,b){if(b&&("object"==typeof b||"function"==typeof b))return b;if(void 0!==b)throw new TypeError("Derived constructors may only return object or undefined");return _assertThisInitialized(a)}function _assertThisInitialized(a){if(void 0===a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function");a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,writable:!0,configurable:!0}}),Object.defineProperty(a,"prototype",{writable:!1}),b&&_setPrototypeOf(a,b)}function _wrapNativeSuper(a){var b="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(a){function c(){return _construct(a,arguments,_getPrototypeOf(this).constructor)}if(null===a||!_isNativeFunction(a))return a;if("function"!=typeof a)throw new TypeError("Super expression must either be null or a function");if(void 0!==b){if(b.has(a))return b.get(a);b.set(a,c)}return c.prototype=Object.create(a.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(c,a)},_wrapNativeSuper(a)}function _construct(a,b,c){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var d=[null];d.push.apply(d,b);var e=new(a.bind.apply(a,d));return c&&_setPrototypeOf(e,c.prototype),e}function _isNativeReflectConstruct(){try{var a=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(a){}return(_isNativeReflectConstruct=function(){return!!a})()}function _isNativeFunction(a){try{return-1!==Function.toString.call(a).indexOf("[native code]")}catch(b){return"function"==typeof a}}function _setPrototypeOf(a,b){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(a,b){return a.__proto__=b,a},_setPrototypeOf(a,b)}function _getPrototypeOf(a){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(a){return a.__proto__||Object.getPrototypeOf(a)},_getPrototypeOf(a)}function _defineProperty(a,b,c){return(b=_toPropertyKey(b))in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toPropertyKey(a){var b=_toPrimitive(a,"string");return"symbol"==typeof b?b:b+""}function _toPrimitive(a,b){if("object"!=typeof a||!a)return a;var c=a[Symbol.toPrimitive];if(void 0!==c){var d=c.call(a,b||"default");if("object"!=typeof d)return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)}var MongooseBreadError=function(a){function b(a){var c;return _classCallCheck(this,b),c=_callSuper(this,b,[a.message]),_defineProperty(c,"message","MongooseBread encountered an error"),_defineProperty(c,"details",""),_defineProperty(c,"issuer","MongooseBread"),_defineProperty(c,"statusCode",500),_defineProperty(c,"result",{}),a.message&&(c.message=a.message),a.details&&(c.details=a.details),a.issuer&&(c.issuer=a.issuer),a.statusCode&&(c.statusCode=a.statusCode),a.result&&(c.result=a.result),c}return _inherits(b,a),_createClass(b)}(_wrapNativeSuper(Error));module.exports=MongooseBreadError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNb25nb29zZUJyZWFkRXJyb3IiLCJhIiwiYiIsIm9wdGlvbnMiLCJjIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2NhbGxTdXBlciIsIm1lc3NhZ2UiLCJfZGVmaW5lUHJvcGVydHkiLCJkZXRhaWxzIiwiaXNzdWVyIiwic3RhdHVzQ29kZSIsInJlc3VsdCIsIl9pbmhlcml0cyIsIl9jcmVhdGVDbGFzcyIsIl93cmFwTmF0aXZlU3VwZXIiLCJFcnJvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvTW9uZ29vc2VCcmVhZEVycm9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIE1vbmdvb3NlQnJlYWRFcnJvciBleHRlbmRzIEVycm9yIHtcblxuICBtZXNzYWdlID0gXCJNb25nb29zZUJyZWFkIGVuY291bnRlcmVkIGFuIGVycm9yXCJcbiAgZGV0YWlscyA9IFwiXCJcbiAgaXNzdWVyID0gXCJNb25nb29zZUJyZWFkXCJcbiAgc3RhdHVzQ29kZSA9IDUwMFxuICByZXN1bHQgPSB7fVxuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6UGFydGlhbDxNb25nb29zZUJyZWFkRXJyb3JPcHRpb25zPikge1xuICAgIHN1cGVyKG9wdGlvbnMubWVzc2FnZSk7XG4gICAgaWYob3B0aW9ucy5tZXNzYWdlKSB0aGlzLm1lc3NhZ2UgPSBvcHRpb25zLm1lc3NhZ2U7XG4gICAgaWYob3B0aW9ucy5kZXRhaWxzKSB0aGlzLmRldGFpbHMgPSBvcHRpb25zLmRldGFpbHM7XG4gICAgaWYob3B0aW9ucy5pc3N1ZXIpIHRoaXMuaXNzdWVyID0gb3B0aW9ucy5pc3N1ZXI7XG4gICAgaWYob3B0aW9ucy5zdGF0dXNDb2RlKSB0aGlzLnN0YXR1c0NvZGUgPSBvcHRpb25zLnN0YXR1c0NvZGU7XG4gICAgaWYob3B0aW9ucy5yZXN1bHQpIHRoaXMucmVzdWx0ID0gb3B0aW9ucy5yZXN1bHQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb25nb29zZUJyZWFkRXJyb3I7XG4iXSwibWFwcGluZ3MiOiJnckdBQU0sQ0FBQUEsa0JBQWtCLFVBQUFDLENBQUEsRUFRdEIsU0FBQUMsRUFBWUMsQ0FBMEMsQ0FBRSxLQUFBQyxDQUFBLFFBQUFDLGVBQUEsTUFBQUgsQ0FBQSxFQUFBRSxDQUFBLENBQUFFLFVBQUEsTUFBQUosQ0FBQSxFQUNoREMsQ0FBTyxDQUFDSSxPQUFPLEdBQUFDLGVBQUEsQ0FBQUosQ0FBQSxXQVBiLG9DQUFvQyxFQUFBSSxlQUFBLENBQUFKLENBQUEsV0FDcEMsRUFBRSxFQUFBSSxlQUFBLENBQUFKLENBQUEsVUFDSCxlQUFlLEVBQUFJLGVBQUEsQ0FBQUosQ0FBQSxjQUNYLEdBQUcsRUFBQUksZUFBQSxDQUFBSixDQUFBLFVBQ1AsQ0FBQyxDQUFDLEVBSU5ELENBQU8sQ0FBQ0ksT0FBTyxHQUFFSCxDQUFBLENBQUtHLE9BQU8sQ0FBR0osQ0FBTyxDQUFDSSxPQUFPLEVBQy9DSixDQUFPLENBQUNNLE9BQU8sR0FBRUwsQ0FBQSxDQUFLSyxPQUFPLENBQUdOLENBQU8sQ0FBQ00sT0FBTyxFQUMvQ04sQ0FBTyxDQUFDTyxNQUFNLEdBQUVOLENBQUEsQ0FBS00sTUFBTSxDQUFHUCxDQUFPLENBQUNPLE1BQU0sRUFDNUNQLENBQU8sQ0FBQ1EsVUFBVSxHQUFFUCxDQUFBLENBQUtPLFVBQVUsQ0FBR1IsQ0FBTyxDQUFDUSxVQUFVLEVBQ3hEUixDQUFPLENBQUNTLE1BQU0sR0FBRVIsQ0FBQSxDQUFLUSxNQUFNLENBQUdULENBQU8sQ0FBQ1MsTUFBTSxFQUFBUixDQUNqRCxDQUFDLE9BQUFTLFNBQUEsQ0FBQVgsQ0FBQSxDQUFBRCxDQUFBLEVBQUFhLFlBQUEsQ0FBQVosQ0FBQSxHQUFBYSxnQkFBQSxDQWY4QkMsS0FBSyxHQWtCdENDLE1BQU0sQ0FBQ0MsT0FBTyxDQUFHbEIsa0JBQWtCIiwiaWdub3JlTGlzdCI6W119