"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var toBreadErrorFactory = require("./toBreadErrorFactory");
function browseFactory(pluginOptions) {
  var _pluginOptions$custom = pluginOptions.customLabels,
    docs = _pluginOptions$custom.docs,
    acknowledged = _pluginOptions$custom.acknowledged,
    readCount = _pluginOptions$custom.readCount;
  var toBreadResult = function toBreadResult(result) {
    return _objectSpread(_objectSpread({}, result), {}, {
      [acknowledged]: true,
      [readCount]: result[docs].length
    });
  };
  var toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [readCount]: 0
  });
  return function browse(options) {
    var _this = this;
    options = _objectSpread(_objectSpread({}, pluginOptions), options);
    var _options = options,
      query = _options.query,
      paginateOptions = _options.paginateOptions;
    var lean = paginateOptions.lean,
      leanWithId = paginateOptions.leanWithId,
      leanWithout_id = paginateOptions.leanWithout_id,
      customLabels = paginateOptions.customLabels,
      customCount = paginateOptions.customCount;
    if (customCount && this[customCount] && typeof this[customCount] === "function") {
      paginateOptions.useCustomCountFn = function () {
        return _this[customCount]();
      };
    }
    var remove_id = !(lean && leanWithId && leanWithout_id) ? function (result) {
      return result;
    } : function (result) {
      var docsKey = customLabels.docs;
      result[docsKey].forEach(function (doc) {
        if (doc._id) delete doc._id;
      });
      return result;
    };
    return this.paginate(query, paginateOptions).then(remove_id).then(toBreadResult).catch(toBreadError);
  };
}
module.exports = browseFactory;