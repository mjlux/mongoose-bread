"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var parseLeanFactory = require("./parseLeanFactory");
var toBreadErrorFactory = require("./toBreadErrorFactory");
function editFactory(pluginOptions) {
  var _pluginOptions$custom = pluginOptions.customLabels,
    docs = _pluginOptions$custom.docs,
    acknowledged = _pluginOptions$custom.acknowledged,
    modifiedCount = _pluginOptions$custom.modifiedCount;
  var toBreadResult = function toBreadResult(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      result = _ref2[0],
      _docs = _ref2[1];
    return {
      [docs]: _docs,
      [acknowledged]: result.acknowledged,
      [modifiedCount]: result.modifiedCount
    };
  };
  var toBreadError = toBreadErrorFactory({
    [docs]: [],
    [acknowledged]: false,
    [modifiedCount]: 0
  });
  return function edit(options) {
    var _this = this;
    var query = options.query,
      payload = options.payload,
      projection = options.projection,
      populate = options.populate,
      select = options.select,
      sort = options.sort,
      lean = options.lean,
      limit = options.limit;
    var parseLean = parseLeanFactory(options);
    var mergeUpdateAndDocs = function mergeUpdateAndDocs(result) {
      return Promise.all([Promise.resolve(result), _this.find(query, projection).populate(populate).select(select).sort(sort).lean(lean).limit(limit).orFail().then(parseLean)]);
    };
    return this.updateMany(query, payload).then(mergeUpdateAndDocs).then(toBreadResult).catch(toBreadError);
  };
}
module.exports = editFactory;