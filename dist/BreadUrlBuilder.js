"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var SelectExcludeErrorMessage = "Calls to select() and exclude() are exclusive - make sure to call only select() or exclude()";
var removeNullAndUndefinedStrings = function removeNullAndUndefinedStrings(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    k = _ref2[0],
    v = _ref2[1];
  return k != "undefined" && k != "null" && v != "undefined" && v != "null";
};
var removeLeadingAndTrailingSlash = function removeLeadingAndTrailingSlash(s) {
  return String(s).replace(/^\/|\/$/g, "");
};
var isArray = Array.isArray;
var _baseUrl = /*#__PURE__*/new WeakMap();
var _protocol = /*#__PURE__*/new WeakMap();
var _endpoint = /*#__PURE__*/new WeakMap();
var _hash = /*#__PURE__*/new WeakMap();
var _paths = /*#__PURE__*/new WeakMap();
var _parameters = /*#__PURE__*/new WeakMap();
var _selectCalled = /*#__PURE__*/new WeakMap();
var _excludeCalled = /*#__PURE__*/new WeakMap();
var _compare = /*#__PURE__*/new WeakMap();
var _extractHash = /*#__PURE__*/new WeakSet();
var _applyProtocol = /*#__PURE__*/new WeakSet();
var _addCompare = /*#__PURE__*/new WeakSet();
var BreadUrlBuilder = /*#__PURE__*/function () {
  function BreadUrlBuilder($baseUrl) {
    _classCallCheck(this, BreadUrlBuilder);
    _classPrivateMethodInitSpec(this, _addCompare);
    _classPrivateMethodInitSpec(this, _applyProtocol);
    _classPrivateMethodInitSpec(this, _extractHash);
    _classPrivateFieldInitSpec(this, _baseUrl, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _protocol, {
      writable: true,
      value: BreadUrlBuilder.HTTPS
    });
    _classPrivateFieldInitSpec(this, _endpoint, {
      writable: true,
      value: ""
    });
    _classPrivateFieldInitSpec(this, _hash, {
      writable: true,
      value: ""
    });
    _classPrivateFieldInitSpec(this, _paths, {
      writable: true,
      value: new Array()
    });
    _classPrivateFieldInitSpec(this, _parameters, {
      writable: true,
      value: new Map()
    });
    _classPrivateFieldInitSpec(this, _selectCalled, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _excludeCalled, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _compare, {
      writable: true,
      value: {
        value: undefined,
        history: new Set(),
        invert: false
      }
    });
    if (typeof $baseUrl != "string") throw new Error("invalid param - expected String - @BreadUrlBuilder()");
    _classPrivateFieldSet(this, _baseUrl, _classPrivateMethodGet(this, _extractHash, _extractHash2).call(this, $baseUrl));
  }
  _createClass(BreadUrlBuilder, [{
    key: "protocol",
    value: function protocol($protocol) {
      var allowedProtocols = [BreadUrlBuilder.FORCE_HTTP, BreadUrlBuilder.HTTPS];
      if (!allowedProtocols.includes($protocol)) throw new Error(`invalid param - expected BreadUrlBuilder.FORCE_HTTP|BreadUrlBuilder.HTTPS - @protocol()`);
      _classPrivateFieldSet(this, _protocol, $protocol);
      return this;
    }
  }, {
    key: "port",
    value: function port($port) {
      if (typeof $port != "number") throw new Error("invalid param - expected Number - @port()");
      var baseUrl = new URL(_classPrivateFieldGet(this, _baseUrl));
      if ($port != Number(baseUrl.port)) {
        _classPrivateFieldSet(this, _baseUrl, baseUrl.href.replace(baseUrl.host, `${baseUrl.hostname}:${$port}`));
      }
      return this;
    }
  }, {
    key: "endpoint",
    value: function endpoint($endpoint) {
      if (typeof $endpoint != "string") throw new Error("invalid param - expected String - @endpoint()");
      _classPrivateFieldSet(this, _endpoint, _classPrivateMethodGet(this, _extractHash, _extractHash2).call(this, $endpoint));
      return this;
    }
  }, {
    key: "hash",
    value: function hash($hash) {
      if (typeof $hash != "string") throw new Error("invalid param - expected String - @hash()");
      _classPrivateFieldSet(this, _hash, $hash.startsWith("#") ? $hash : `#${$hash}`);
      return this;
    }
  }, {
    key: "addPath",
    value: function addPath($path) {
      if (!$path.toString) throw new Error("invalid param - expected stringifyable - @addPath()");
      _classPrivateFieldGet(this, _paths).push($path);
      return this;
    }
  }, {
    key: "addToPath",
    value: function addToPath($path) {
      return this.addPath($path);
    }
  }, {
    key: "addParameter",
    value: function addParameter($parameter, $value) {
      if (!$parameter || !$value) return this;
      if (typeof $parameter != "string" || !["string", "number"].includes(typeof $value)) throw new Error("invalid param - expected String - @addParameter()");
      _classPrivateFieldGet(this, _parameters).set($parameter, $value);
      return this;
    }
  }, {
    key: "lean",
    value: function lean() {
      var $lean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      _classPrivateFieldGet(this, _parameters).set("lean", !!$lean);
      return this;
    }
  }, {
    key: "leanWithId",
    value: function leanWithId() {
      var $leanWithId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      _classPrivateFieldGet(this, _parameters).set("leanWithId", !!$leanWithId);
      return this;
    }
  }, {
    key: "leanWithout_id",
    value: function leanWithout_id() {
      var $leanWithout_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      _classPrivateFieldGet(this, _parameters).set("leanWithout_id", !!$leanWithout_id);
      return this;
    }
  }, {
    key: "search",
    value: function search($search) {
      if (!$search) {
        _classPrivateFieldGet(this, _parameters).delete("search");
        return this;
      }
      if (typeof $search != "string") throw new Error("invalid param - expected String - @search()");
      _classPrivateFieldGet(this, _parameters).set("search", $search);
      return this;
    }
  }, {
    key: "limit",
    value: function limit($limit) {
      if (typeof $limit != "number") throw new Error("invalid param - expected Number - @limit()");
      _classPrivateFieldGet(this, _parameters).set("limit", $limit);
      return this;
    }
  }, {
    key: "page",
    value: function page($page) {
      if (typeof $page != "number") throw new Error("invalid param - expected Number - @page()");
      _classPrivateFieldGet(this, _parameters).set("page", $page);
      return this;
    }
    /**
     *
     * @param {String|Array} $sort
     * @param {BreadUrlBuilder.ASC|BreadUrlBuilder.DESC} $order
     * @returns BreadUrlBuilder
     */
  }, {
    key: "sort",
    value: function sort($sort, $order) {
      if (!$sort) throw new Error("invalid param - expected String|Array - @sort()");
      var DESC = BreadUrlBuilder.DESC;
      if (typeof $sort === "string") $sort = $sort.split(" ");
      if (!Array.isArray($sort)) throw new Error("invalid param - expected String|Array - @sort()");
      $sort = $sort.map(function (s) {
        return s.replace(/-/g, "");
      }).map(function (s) {
        return $order === DESC ? `-${s}` : s;
      }).join(" ");
      if (_classPrivateFieldGet(this, _parameters).has("sort")) {
        $sort = _classPrivateFieldGet(this, _parameters).get("sort").concat(" ", $sort);
      }
      _classPrivateFieldGet(this, _parameters).set("sort", $sort);
      return this;
    }
  }, {
    key: "sortRaw",
    value: function sortRaw($sort) {
      if (typeof $sort != "string") throw new Error("invalid param - expected String - @sortRaw()");
      _classPrivateFieldGet(this, _parameters).set("sort", $sort);
      return this;
    }
    /**
     * @param {Sting|Array} $fields
     * @returns BreadUrlBuilder
     */
  }, {
    key: "select",
    value: function select() {
      var $fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (_classPrivateFieldGet(this, _excludeCalled)) throw new Error(SelectExcludeErrorMessage);
      _classPrivateFieldSet(this, _selectCalled, true);
      if (typeof $fields === "string") $fields = $fields.split(" ");
      if (!isArray($fields)) throw new Error("invalid param - expected String|Array - @select()");
      $fields = $fields.map(function (field) {
        return field.replace(/-/g, "");
      }).join(" ");
      _classPrivateFieldGet(this, _parameters).set("select", $fields);
      return this;
    }
    /**
     * @param {Sting|Array} $fields
     * @returns BreadUrlBuilder
     */
  }, {
    key: "exclude",
    value: function exclude() {
      var $fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (_classPrivateFieldGet(this, _selectCalled)) throw new Error(SelectExcludeErrorMessage);
      _classPrivateFieldSet(this, _excludeCalled, true);
      if (typeof $fields === "string") $fields = $fields.split(" ");
      if (!isArray($fields)) throw new Error("invalid param - expected String|Array - @exclude()");
      $fields = $fields.map(function (field) {
        return `-${(field.replace(/-/g), "")}`;
      }).join(" ");
      _classPrivateFieldGet(this, _parameters).set("select", $fields);
      return this;
    }
  }, {
    key: "projection",
    value: function projection($projection) {
      if (typeof $projection != "object") throw new Error("invalid param - expected Object - @projection()");
      _classPrivateFieldGet(this, _parameters).set("projection", JSON.stringify($projection));
      return this;
    }
  }, {
    key: "query",
    value: function query($query) {
      if (typeof $query != "object") throw new Error("invalid param - expected Object - @query()");
      _classPrivateFieldGet(this, _parameters).set("query", JSON.stringify($query));
      return this;
    }
  }, {
    key: "populate",
    value: function populate($populate) {
      if (!(typeof $populate == "object" || isArray($populate))) throw new Error("invalid param - expected Object|Array - @populate()");
      _classPrivateFieldGet(this, _parameters).set("populate", JSON.stringify($populate));
      return this;
    }

    // --------- COMPARE FNS -------------
  }, {
    key: "with",
    value: function _with($key) {
      if (typeof $key != "string") throw new Error("invalid param - expected String - @with()");
      _classPrivateFieldGet(this, _compare).history.add($key);
      _classPrivateFieldGet(this, _compare).value = $key;
      return this;
    }
  }, {
    key: "withOut",
    value: function withOut($key) {
      if (!(_classPrivateFieldGet(this, _parameters).has($key) || _classPrivateFieldGet(this, _compare).history.has($key))) return this;
      if (typeof $key != "string") throw new Error("invalid param - expected String - @withOut()");
      var params = Array.from(_classPrivateFieldGet(this, _parameters)).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
          key = _ref4[0];
        return !key.startsWith($key);
      });
      _classPrivateFieldSet(this, _parameters, new URLSearchParams(params));
      _classPrivateFieldGet(this, _compare).history.delete($key);
      return this;
    }
  }, {
    key: "greaterThan",
    value: function greaterThan($value) {
      return _classPrivateMethodGet(this, _addCompare, _addCompare2).call(this, $value, {
        at: "greaterThan",
        types: ["number"],
        comparison: "gt"
      });
    }
  }, {
    key: "lessThan",
    value: function lessThan($value) {
      return _classPrivateMethodGet(this, _addCompare, _addCompare2).call(this, $value, {
        at: "lessThan",
        types: ["number"],
        comparison: "lt"
      });
    }
  }, {
    key: "greaterThanEqual",
    value: function greaterThanEqual($value) {
      return _classPrivateMethodGet(this, _addCompare, _addCompare2).call(this, $value, {
        at: "greaterThanEqual",
        types: ["number"],
        comparison: "gte"
      });
    }
  }, {
    key: "lessThanEqual",
    value: function lessThanEqual($value) {
      return _classPrivateMethodGet(this, _addCompare, _addCompare2).call(this, $value, {
        at: "lessThanEqual",
        types: ["number"],
        comparison: "lte"
      });
    }
  }, {
    key: "equalTo",
    value: function equalTo($value) {
      var comparison = _classPrivateFieldGet(this, _compare).invert ? "ne" : "eq";
      return _classPrivateMethodGet(this, _addCompare, _addCompare2).call(this, $value, {
        at: "equalTo",
        types: ["string", "number"],
        comparison
      });
    }
  }, {
    key: "gt",
    value: function gt($value) {
      return this.greaterThan($value);
    }
  }, {
    key: "lt",
    value: function lt($value) {
      return this.lessThan($value);
    }
  }, {
    key: "eq",
    value: function eq($value) {
      return this.equalTo($value);
    }
  }, {
    key: "ne",
    value: function ne($value) {
      return this.not.equalTo($value);
    }
  }, {
    key: "gte",
    value: function gte($value) {
      return this.greaterThanEqual($value);
    }
  }, {
    key: "lte",
    value: function lte($value) {
      return this.lessThanEqual($value);
    }
  }, {
    key: "to",
    get: function get() {
      return this;
    }
  }, {
    key: "be",
    get: function get() {
      return this;
    }
  }, {
    key: "and",
    get: function get() {
      return this;
    }
  }, {
    key: "but",
    get: function get() {
      return this;
    }
  }, {
    key: "not",
    get: function get() {
      _classPrivateFieldGet(this, _compare).invert = !_classPrivateFieldGet(this, _compare).invert;
      return this;
    }
    // --------- RESET & CLEAR  -----------
  }, {
    key: "resetToBaseUrl",
    value: function resetToBaseUrl() {
      _classPrivateFieldSet(this, _endpoint, "");
      _classPrivateFieldSet(this, _paths, new Array());
      _classPrivateFieldSet(this, _parameters, new Map());
      _classPrivateFieldSet(this, _hash, "");
      return this;
    }
  }, {
    key: "resetToEndpoint",
    value: function resetToEndpoint() {
      _classPrivateFieldSet(this, _paths, new Array());
      _classPrivateFieldSet(this, _parameters, new Map());
      _classPrivateFieldSet(this, _hash, "");
      return this;
    }
  }, {
    key: "clearPath",
    value: function clearPath() {
      _classPrivateFieldSet(this, _paths, new Array());
      return this;
    }
  }, {
    key: "clearParameter",
    value: function clearParameter() {
      _classPrivateFieldSet(this, _parameters, new Map());
      return this;
    }
  }, {
    key: "clearHash",
    value: function clearHash() {
      _classPrivateFieldSet(this, _hash, "");
      return this;
    }

    // --------- GETTER  -----------
  }, {
    key: "getURL",
    value: function getURL() {
      return this.get();
    }
  }, {
    key: "get",
    value: function get() {
      _classPrivateMethodGet(this, _applyProtocol, _applyProtocol2).call(this);
      var endpoint = [_classPrivateFieldGet(this, _endpoint)].concat(_toConsumableArray(_classPrivateFieldGet(this, _paths))).map(removeLeadingAndTrailingSlash).join("/");
      var url = new URL(endpoint, _classPrivateFieldGet(this, _baseUrl));
      Array.from(_classPrivateFieldGet(this, _parameters)).filter(removeNullAndUndefinedStrings).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          value = _ref6[1];
        return url.searchParams.append(key, value);
      });
      return new URL(url.href.concat(_classPrivateFieldGet(this, _hash)));
    }
  }, {
    key: "toUrlString",
    value: function toUrlString() {
      return this.toString();
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.get().href;
    }
  }]);
  return BreadUrlBuilder;
}();
function _extractHash2($url) {
  var _this = this;
  if (!$url.includes("#")) return $url;
  return $url.replace(/#.*$/, function (hash) {
    _classPrivateFieldSet(_this, _hash, hash);
    return "";
  });
}
function _applyProtocol2() {
  var baseUrl = new URL(_classPrivateFieldGet(this, _baseUrl));
  if (!baseUrl.protocol.includes("https")) {
    var newProtocol = _classPrivateFieldGet(this, _protocol) === BreadUrlBuilder.FORCE_HTTP ? "http:" : "https:";
    _classPrivateFieldSet(this, _baseUrl, baseUrl.href.replace(baseUrl.protocol, newProtocol));
  }
}
function _addCompare2($value, $options) {
  if (!_classPrivateFieldGet(this, _compare).value) return this;
  if (!$options.types.includes(typeof $value)) throw new Error(`invalid param - expected ${$options.types.join("|")} - @${$options.at}()`);
  _classPrivateFieldGet(this, _compare).invert = false;
  _classPrivateFieldGet(this, _parameters).set(`${_classPrivateFieldGet(this, _compare).value}[${$options.comparison}]`, $value);
  return this;
}
_defineProperty(BreadUrlBuilder, "ASC", Symbol("asc"));
_defineProperty(BreadUrlBuilder, "DESC", Symbol("desc"));
_defineProperty(BreadUrlBuilder, "HTTPS", Symbol("https"));
_defineProperty(BreadUrlBuilder, "FORCE_HTTP", Symbol("http"));
if (module) {
  module.exports = BreadUrlBuilder;
}
var _default = BreadUrlBuilder;
exports.default = _default;