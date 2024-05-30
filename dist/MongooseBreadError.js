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
function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      "value" in c && (c.writable = !0),
      Object.defineProperty(a, _toPropertyKey(c.key), c);
}
function _createClass(a, b, c) {
  return (
    b && _defineProperties(a.prototype, b),
    c && _defineProperties(a, c),
    Object.defineProperty(a, "prototype", { writable: !1 }),
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
function _classCallCheck(b, a) {
  if (!(b instanceof a))
    throw new TypeError("Cannot call a class as a function");
}
function _callSuper(a, b, c) {
  return (
    (b = _getPrototypeOf(b)),
    _possibleConstructorReturn(
      a,
      _isNativeReflectConstruct()
        ? Reflect.construct(b, c || [], _getPrototypeOf(a).constructor)
        : b.apply(a, c)
    )
  );
}
function _possibleConstructorReturn(a, b) {
  if (b && ("object" == typeof b || "function" == typeof b)) return b;
  if (void 0 !== b)
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  return _assertThisInitialized(a);
}
function _assertThisInitialized(a) {
  if (void 0 === a)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return a;
}
function _inherits(a, b) {
  if ("function" != typeof b && null !== b)
    throw new TypeError("Super expression must either be null or a function");
  (a.prototype = Object.create(b && b.prototype, {
    constructor: { value: a, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(a, "prototype", { writable: !1 }),
    b && _setPrototypeOf(a, b);
}
function _wrapNativeSuper(a) {
  var b = "function" == typeof Map ? new Map() : void 0;
  return (
    (_wrapNativeSuper = function (a) {
      function c() {
        return _construct(a, arguments, _getPrototypeOf(this).constructor);
      }
      if (null === a || !_isNativeFunction(a)) return a;
      if ("function" != typeof a)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== b) {
        if (b.has(a)) return b.get(a);
        b.set(a, c);
      }
      return (
        (c.prototype = Object.create(a.prototype, {
          constructor: {
            value: c,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        _setPrototypeOf(c, a)
      );
    }),
    _wrapNativeSuper(a)
  );
}
function _construct(a, b, c) {
  if (_isNativeReflectConstruct())
    return Reflect.construct.apply(null, arguments);
  var d = [null];
  d.push.apply(d, b);
  var e = new (a.bind.apply(a, d))();
  return c && _setPrototypeOf(e, c.prototype), e;
}
function _isNativeReflectConstruct() {
  try {
    var a = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
  } catch (a) {}
  return (_isNativeReflectConstruct = function () {
    return !!a;
  })();
}
function _isNativeFunction(a) {
  try {
    return -1 !== Function.toString.call(a).indexOf("[native code]");
  } catch (b) {
    return "function" == typeof a;
  }
}
function _setPrototypeOf(a, b) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (a, b) {
          return (a.__proto__ = b), a;
        }),
    _setPrototypeOf(a, b)
  );
}
function _getPrototypeOf(a) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (a) {
          return a.__proto__ || Object.getPrototypeOf(a);
        }),
    _getPrototypeOf(a)
  );
}
var defaultOptions = {
    message: "MongooseBread encountered an error",
    details: "",
    issuer: "MongooseBread",
    statusCode: 500,
    result: {},
  },
  MongooseBreadError = (function (a) {
    function b(a) {
      var c;
      _classCallCheck(this, b);
      var d = _objectSpread(_objectSpread({}, defaultOptions), a);
      return (
        (c = _callSuper(this, b, [d.message])),
        (c.details = d.details),
        (c.issuer = d.issuer),
        (c.statusCode = d.statusCode),
        (c.result = d.result),
        c
      );
    }
    return _inherits(b, a), _createClass(b);
  })(_wrapNativeSuper(Error));
module.exports = MongooseBreadError;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZWZhdWx0T3B0aW9ucyIsIm1lc3NhZ2UiLCJkZXRhaWxzIiwiaXNzdWVyIiwic3RhdHVzQ29kZSIsInJlc3VsdCIsIk1vbmdvb3NlQnJlYWRFcnJvciIsImEiLCJiIiwib3B0aW9ucyIsImMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfb3B0aW9ucyIsIl9vYmplY3RTcHJlYWQiLCJfY2FsbFN1cGVyIiwiX2luaGVyaXRzIiwiX2NyZWF0ZUNsYXNzIiwiX3dyYXBOYXRpdmVTdXBlciIsIkVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9Nb25nb29zZUJyZWFkRXJyb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gIG1lc3NhZ2U6IFwiTW9uZ29vc2VCcmVhZCBlbmNvdW50ZXJlZCBhbiBlcnJvclwiLFxuICBkZXRhaWxzOiBcIlwiLFxuICBpc3N1ZXI6IFwiTW9uZ29vc2VCcmVhZFwiLFxuICBzdGF0dXNDb2RlOiA1MDAsXG4gIHJlc3VsdDoge30sXG59O1xuXG5jbGFzcyBNb25nb29zZUJyZWFkRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBjb25zdCBfb3B0aW9ucyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcblxuICAgIHN1cGVyKF9vcHRpb25zLm1lc3NhZ2UpO1xuICAgIHRoaXMuZGV0YWlscyA9IF9vcHRpb25zLmRldGFpbHM7XG4gICAgdGhpcy5pc3N1ZXIgPSBfb3B0aW9ucy5pc3N1ZXI7XG4gICAgdGhpcy5zdGF0dXNDb2RlID0gX29wdGlvbnMuc3RhdHVzQ29kZTtcbiAgICB0aGlzLnJlc3VsdCA9IF9vcHRpb25zLnJlc3VsdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vbmdvb3NlQnJlYWRFcnJvcjtcbiJdLCJtYXBwaW5ncyI6Imt4SEFBTSxDQUFBQSxjQUFjLENBQUcsQ0FDckJDLE9BQU8sQ0FBRSxvQ0FBb0MsQ0FDN0NDLE9BQU8sQ0FBRSxFQUFFLENBQ1hDLE1BQU0sQ0FBRSxlQUFlLENBQ3ZCQyxVQUFVLENBQUUsR0FBRyxDQUNmQyxNQUFNLENBQUUsQ0FBQyxDQUNYLENBQUMsQ0FFS0Msa0JBQWtCLFVBQUFDLENBQUEsRUFDdEIsU0FBQUMsRUFBWUMsQ0FBTyxDQUFFLEtBQUFDLENBQUEsQ0FBQUMsZUFBQSxNQUFBSCxDQUFBLEVBQ25CLEdBQU0sQ0FBQUksQ0FBUSxDQUFBQyxhQUFBLENBQUFBLGFBQUEsSUFBUWIsY0FBYyxFQUFLUyxDQUFPLENBQUUsQ0FBQyxPQUFBQyxDQUFBLENBQUFJLFVBQUEsTUFBQU4sQ0FBQSxFQUU3Q0ksQ0FBUSxDQUFDWCxPQUFPLEdBQ3RCUyxDQUFBLENBQUtSLE9BQU8sQ0FBR1UsQ0FBUSxDQUFDVixPQUFPLENBQy9CUSxDQUFBLENBQUtQLE1BQU0sQ0FBR1MsQ0FBUSxDQUFDVCxNQUFNLENBQzdCTyxDQUFBLENBQUtOLFVBQVUsQ0FBR1EsQ0FBUSxDQUFDUixVQUFVLENBQ3JDTSxDQUFBLENBQUtMLE1BQU0sQ0FBR08sQ0FBUSxDQUFDUCxNQUFNLENBQUFLLENBQy9CLENBQUMsT0FBQUssU0FBQSxDQUFBUCxDQUFBLENBQUFELENBQUEsRUFBQVMsWUFBQSxDQUFBUixDQUFBLEdBQUFTLGdCQUFBLENBVDhCQyxLQUFLLEdBWXRDQyxNQUFNLENBQUNDLE9BQU8sQ0FBR2Qsa0JBQWtCIiwiaWdub3JlTGlzdCI6W119
