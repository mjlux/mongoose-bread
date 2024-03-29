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
    (b = _toPropertyKey(b)),
    b in a
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
  if ("object" != typeof a || null === a) return a;
  var c = a[Symbol.toPrimitive];
  if (c !== void 0) {
    var d = c.call(a, b || "default");
    if ("object" != typeof d) return d;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === b ? String : Number)(a);
}
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
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
function _createSuper(a) {
  var b = _isNativeReflectConstruct();
  return function () {
    var c,
      d = _getPrototypeOf(a);
    if (b) {
      var e = _getPrototypeOf(this).constructor;
      c = Reflect.construct(d, arguments, e);
    } else c = d.apply(this, arguments);
    return _possibleConstructorReturn(this, c);
  };
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
      if ("undefined" != typeof b) {
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
function _construct() {
  return (
    (_construct = _isNativeReflectConstruct()
      ? Reflect.construct.bind()
      : function (b, c, d) {
          var e = [null];
          e.push.apply(e, c);
          var a = Function.bind.apply(b, e),
            f = new a();
          return d && _setPrototypeOf(f, d.prototype), f;
        }),
    _construct.apply(null, arguments)
  );
}
function _isNativeReflectConstruct() {
  if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" == typeof Proxy) return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch (a) {
    return !1;
  }
}
function _isNativeFunction(a) {
  return -1 !== Function.toString.call(a).indexOf("[native code]");
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
      var d;
      _classCallCheck(this, b);
      var e = _objectSpread(_objectSpread({}, defaultOptions), a);
      return (
        (d = c.call(this, e.message)),
        (d.details = e.details),
        (d.issuer = e.issuer),
        (d.statusCode = e.statusCode),
        (d.result = e.result),
        d
      );
    }
    _inherits(b, a);
    var c = _createSuper(b);
    return _createClass(b);
  })(_wrapNativeSuper(Error));
module.exports = MongooseBreadError;
