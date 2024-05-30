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
var MongooseBreadError = require("../MongooseBreadError");
function toBreadErrorFactory() {
  var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {};
  return function (b) {
    if (b.message.startsWith("No document found"))
      throw new MongooseBreadError({
        message: "Not Found",
        details: b.message,
        statusCode: 404,
        result: _objectSpread({}, a),
      });
    throw b;
  };
}
module.exports = toBreadErrorFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNb25nb29zZUJyZWFkRXJyb3IiLCJyZXF1aXJlIiwidG9CcmVhZEVycm9yRmFjdG9yeSIsInJlc3VsdCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImVycm9yIiwibWVzc2FnZSIsInN0YXJ0c1dpdGgiLCJkZXRhaWxzIiwic3RhdHVzQ29kZSIsIl9vYmplY3RTcHJlYWQiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ZhY3Rvcmllcy90b0JyZWFkRXJyb3JGYWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IE1vbmdvb3NlQnJlYWRFcnJvciA9IHJlcXVpcmUoXCIuLi9Nb25nb29zZUJyZWFkRXJyb3JcIik7XG5cbmZ1bmN0aW9uIHRvQnJlYWRFcnJvckZhY3RvcnkocmVzdWx0ID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvQnJlYWRFcnJvcihlcnJvcikge1xuICAgIGlmIChlcnJvci5tZXNzYWdlLnN0YXJ0c1dpdGgoXCJObyBkb2N1bWVudCBmb3VuZFwiKSkge1xuICAgICAgdGhyb3cgbmV3IE1vbmdvb3NlQnJlYWRFcnJvcih7XG4gICAgICAgIG1lc3NhZ2U6IFwiTm90IEZvdW5kXCIsXG4gICAgICAgIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UsXG4gICAgICAgIHN0YXR1c0NvZGU6IDQwNCxcbiAgICAgICAgcmVzdWx0OiB7IC4uLnJlc3VsdCB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRocm93IGVycm9yO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvQnJlYWRFcnJvckZhY3Rvcnk7XG4iXSwibWFwcGluZ3MiOiJnbkNBQUEsR0FBTSxDQUFBQSxrQkFBa0IsQ0FBR0MsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBRTNELFFBQVMsQ0FBQUMsbUJBQW1CQSxDQUFBLENBQWMsSUFBYixDQUFBQyxDQUFNLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFBRCxTQUFBLGFBQUFBLFNBQUEsSUFBRyxDQUFDLENBQUMsQ0FDdEMsTUFBTyxVQUFzQkUsQ0FBSyxDQUFFLENBQ2xDLEdBQUlBLENBQUssQ0FBQ0MsT0FBTyxDQUFDQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FDL0MsS0FBTSxJQUFJLENBQUFSLGtCQUFrQixDQUFDLENBQzNCTyxPQUFPLENBQUUsV0FBVyxDQUNwQkUsT0FBTyxDQUFFSCxDQUFLLENBQUNDLE9BQU8sQ0FDdEJHLFVBQVUsQ0FBRSxHQUFHLENBQ2ZQLE1BQU0sQ0FBQVEsYUFBQSxJQUFPUixDQUFNLENBQ3JCLENBQUMsQ0FBQyxDQUVKLEtBQU0sQ0FBQUcsQ0FDUixDQUNGLENBRUFNLE1BQU0sQ0FBQ0MsT0FBTyxDQUFHWCxtQkFBbUIiLCJpZ25vcmVMaXN0IjpbXX0=
