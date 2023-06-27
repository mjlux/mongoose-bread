"use strict";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,_toPropertyKey(c.key),c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),Object.defineProperty(a,"prototype",{writable:!1}),a}function _classPrivateMethodInitSpec(a,b){_checkPrivateRedeclaration(a,b),b.add(a)}function _classPrivateFieldInitSpec(a,b,c){_checkPrivateRedeclaration(a,b),b.set(a,c)}function _checkPrivateRedeclaration(a,b){if(b.has(a))throw new TypeError("Cannot initialize the same private elements twice on an object")}function _defineProperty(a,b,c){return b=_toPropertyKey(b),b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toPropertyKey(a){var b=_toPrimitive(a,"string");return"symbol"==typeof b?b:b+""}function _toPrimitive(a,b){if("object"!=typeof a||null===a)return a;var c=a[Symbol.toPrimitive];if(c!==void 0){var d=c.call(a,b||"default");if("object"!=typeof d)return d;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===b?String:Number)(a)}function _classPrivateFieldGet(a,b){var c=_classExtractFieldDescriptor(a,b,"get");return _classApplyDescriptorGet(a,c)}function _classApplyDescriptorGet(a,b){return b.get?b.get.call(a):b.value}function _classPrivateMethodGet(a,b,c){if(!b.has(a))throw new TypeError("attempted to get private field on non-instance");return c}function _classPrivateFieldSet(a,b,c){var d=_classExtractFieldDescriptor(a,b,"set");return _classApplyDescriptorSet(a,d,c),c}function _classExtractFieldDescriptor(a,b,c){if(!b.has(a))throw new TypeError("attempted to "+c+" private field on non-instance");return b.get(a)}function _classApplyDescriptorSet(a,b,c){if(b.set)b.set.call(a,c);else{if(!b.writable)throw new TypeError("attempted to set read only private field");b.value=c}}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f,g,h=[],i=!0,j=!1;try{if(f=(c=c.call(a)).next,0===b){if(Object(c)!==c)return;i=!1}else for(;!(i=(d=f.call(c)).done)&&(h.push(d.value),h.length!==b);i=!0);}catch(a){j=!0,e=a}finally{try{if(!i&&null!=c.return&&(g=c.return(),Object(g)!==g))return}finally{if(j)throw e}}return h}}function _arrayWithHoles(a){if(Array.isArray(a))return a}var SelectExcludeErrorMessage="Calls to select() and exclude() are exclusive - make sure to call only select() or exclude()",removeNullAndUndefinedStrings=function(a){var b=_slicedToArray(a,2),c=b[0],d=b[1];return"undefined"!=c&&"null"!=c&&"undefined"!=d&&"null"!=d},removeLeadingAndTrailingSlash=function(a){return(a+"").replace(/^\/|\/$/g,"")},isArray=Array.isArray,_baseUrl=new WeakMap,_protocol=new WeakMap,_endpoint=new WeakMap,_hash=new WeakMap,_paths=new WeakMap,_parameters=new WeakMap,_selectCalled=new WeakMap,_excludeCalled=new WeakMap,_compare=new WeakMap,_extractHash=new WeakSet,_applyProtocol=new WeakSet,_addCompare=new WeakSet,BreadUrlBuilder=function(){function a(b){if(_classCallCheck(this,a),_classPrivateMethodInitSpec(this,_addCompare),_classPrivateMethodInitSpec(this,_applyProtocol),_classPrivateMethodInitSpec(this,_extractHash),_classPrivateFieldInitSpec(this,_baseUrl,{writable:!0,value:void 0}),_classPrivateFieldInitSpec(this,_protocol,{writable:!0,value:a.HTTPS}),_classPrivateFieldInitSpec(this,_endpoint,{writable:!0,value:""}),_classPrivateFieldInitSpec(this,_hash,{writable:!0,value:""}),_classPrivateFieldInitSpec(this,_paths,{writable:!0,value:[]}),_classPrivateFieldInitSpec(this,_parameters,{writable:!0,value:new Map}),_classPrivateFieldInitSpec(this,_selectCalled,{writable:!0,value:!1}),_classPrivateFieldInitSpec(this,_excludeCalled,{writable:!0,value:!1}),_classPrivateFieldInitSpec(this,_compare,{writable:!0,value:{value:void 0,history:new Set,invert:!1}}),"string"!=typeof b)throw new Error("invalid argument - expected String - @BreadUrlBuilder()");_classPrivateFieldSet(this,_baseUrl,_classPrivateMethodGet(this,_extractHash,_extractHash2).call(this,b))}return _createClass(a,[{key:"protocol",value:function protocol(b){var c=[a.FORCE_HTTP,a.HTTPS];if(!c.includes(b))throw new Error(`invalid argument - expected BreadUrlBuilder.FORCE_HTTP|BreadUrlBuilder.HTTPS - @protocol()`);return _classPrivateFieldSet(this,_protocol,b),this}},{key:"port",value:function port(a){if("number"!=typeof a)throw new Error("invalid argument - expected Number - @port()");var b=new URL(_classPrivateFieldGet(this,_baseUrl));return a!=+b.port&&_classPrivateFieldSet(this,_baseUrl,b.href.replace(b.host,`${b.hostname}:${a}`)),this}},{key:"endpoint",value:function endpoint(a){if("string"!=typeof a)throw new Error("invalid argument - expected String - @endpoint()");return _classPrivateFieldSet(this,_endpoint,_classPrivateMethodGet(this,_extractHash,_extractHash2).call(this,a)),this}},{key:"hash",value:function hash(a){if("string"!=typeof a)throw new Error("invalid argument - expected String - @hash()");return _classPrivateFieldSet(this,_hash,a.startsWith("#")?a:`#${a}`),this}},{key:"setPath",value:function setPath(a){return this.clearPath().addPath(a)}},{key:"addPath",value:function addPath(a){if(!a.toString)throw new Error("invalid argument - expected stringifyable - @addPath()");return _classPrivateFieldGet(this,_paths).push(a),this}},{key:"addToPath",value:function addToPath(a){return this.addPath(a)}},{key:"addParameter",value:function addParameter(a,b){if(!a||!b)return this;if("string"!=typeof a||!["string","number"].includes(typeof b))throw new Error("invalid argument - expected String - @addParameter()");return _classPrivateFieldGet(this,_parameters).set(a,b),this}},{key:"lean",value:function lean(){var a=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];return _classPrivateFieldGet(this,_parameters).set("lean",!!a),this}},{key:"leanWithId",value:function leanWithId(){var a=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];return _classPrivateFieldGet(this,_parameters).set("leanWithId",!!a),this}},{key:"leanWithout_id",value:function leanWithout_id(){var a=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];return _classPrivateFieldGet(this,_parameters).set("leanWithout_id",!!a),this}},{key:"search",value:function search(a){if(!a)return _classPrivateFieldGet(this,_parameters).delete("search"),this;if("string"!=typeof a)throw new Error("invalid argument - expected String - @search()");return _classPrivateFieldGet(this,_parameters).set("search",a),this}},{key:"limit",value:function limit(a){if("number"!=typeof a)throw new Error("invalid argument - expected Number - @limit()");return _classPrivateFieldGet(this,_parameters).set("limit",a),this}},{key:"page",value:function page(a){if("number"!=typeof a)throw new Error("invalid argument - expected Number - @page()");return _classPrivateFieldGet(this,_parameters).set("page",a),this}},{key:"addSort",value:function addSort(b,c){if(!_classPrivateFieldGet(this,_parameters).has("sort"))return this.sort(b,c);var d=a.ASC,e=a.DESC;if(!b)throw new Error("invalid argument 'sort' - expected String - @addSort()");if(c!=d&&c!=e)throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @addSort()");var f=new Set(_classPrivateFieldGet(this,_parameters).get("sort").split(" "));b=b.trim().split(" ").map(function(a){return a.replace(/-/g,"")}),b.forEach(function(a){f.delete(a),f.delete(`-${a}`)}),b=b.map(function(a){return c===e?`-${a}`:a});var g=_toConsumableArray(new Set(b));return _classPrivateFieldGet(this,_parameters).set("sort",[].concat(_toConsumableArray(f),_toConsumableArray(g)).join(" ")),this}},{key:"addToSort",value:function addToSort(a,b){return this.addSort(a,b)}},{key:"sort",value:function sort(b,c){var d=a.ASC,e=a.DESC;if(!b)throw new Error("invalid argument 'sort' - expected String - @sort()");if(c!=d&&c!=e)throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @sort()");b=b.trim().split(" ").map(function(a){return a.replace(/-/g,"")}).map(function(a){return c===e?`-${a}`:a});var f=_toConsumableArray(new Set(b));return _classPrivateFieldGet(this,_parameters).set("sort",f.join(" ")),this}},{key:"select",value:function select(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";if(_classPrivateFieldGet(this,_excludeCalled))throw new Error(SelectExcludeErrorMessage);if(_classPrivateFieldSet(this,_selectCalled,!0),"string"==typeof a&&(a=a.split(" ")),!isArray(a))throw new Error("invalid argument - expected String|Array - @select()");return a=a.map(function(a){return a.replace(/-/g,"")}).join(" "),_classPrivateFieldGet(this,_parameters).set("select",a),this}},{key:"exclude",value:function exclude(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";if(_classPrivateFieldGet(this,_selectCalled))throw new Error(SelectExcludeErrorMessage);if(_classPrivateFieldSet(this,_excludeCalled,!0),"string"==typeof a&&(a=a.split(" ")),!isArray(a))throw new Error("invalid argument - expected String|Array - @exclude()");return a=a.map(function(a){return`-${(a.replace(/-/g),"")}`}).join(" "),_classPrivateFieldGet(this,_parameters).set("select",a),this}},{key:"projection",value:function projection(a){if("object"!=typeof a)throw new Error("invalid argument - expected Object - @projection()");return _classPrivateFieldGet(this,_parameters).set("projection",JSON.stringify(a)),this}},{key:"query",value:function query(a){if("object"!=typeof a)throw new Error("invalid argument - expected Object - @query()");return _classPrivateFieldGet(this,_parameters).set("query",JSON.stringify(a)),this}},{key:"populate",value:function populate(a){if(!("object"==typeof a||isArray(a)))throw new Error("invalid argument - expected Object|Array - @populate()");return _classPrivateFieldGet(this,_parameters).set("populate",JSON.stringify(a)),this}},{key:"with",value:function _with(a){if("string"!=typeof a)throw new Error("invalid argument - expected String - @with()");return _classPrivateFieldGet(this,_compare).history.add(a),_classPrivateFieldGet(this,_compare).value=a,this}},{key:"without",value:function without(a){if(!(_classPrivateFieldGet(this,_parameters).has(a)||_classPrivateFieldGet(this,_compare).history.has(a)))return this;if("string"!=typeof a)throw new Error("invalid argument - expected String - @withOut()");var b=Array.from(_classPrivateFieldGet(this,_parameters)).filter(function(b){var c=_slicedToArray(b,1),d=c[0];return!d.startsWith(a)});return _classPrivateFieldSet(this,_parameters,new URLSearchParams(b)),_classPrivateFieldGet(this,_compare).history.delete(a),this}},{key:"greaterThan",value:function greaterThan(a){return _classPrivateMethodGet(this,_addCompare,_addCompare2).call(this,a,{at:"greaterThan",comparison:"gt"})}},{key:"lessThan",value:function lessThan(a){return _classPrivateMethodGet(this,_addCompare,_addCompare2).call(this,a,{at:"lessThan",comparison:"lt"})}},{key:"greaterThanEqual",value:function greaterThanEqual(a){return _classPrivateMethodGet(this,_addCompare,_addCompare2).call(this,a,{at:"greaterThanEqual",comparison:"gte"})}},{key:"lessThanEqual",value:function lessThanEqual(a){return _classPrivateMethodGet(this,_addCompare,_addCompare2).call(this,a,{at:"lessThanEqual",comparison:"lte"})}},{key:"equalTo",value:function equalTo(a){return _classPrivateMethodGet(this,_addCompare,_addCompare2).call(this,a,{at:"equalTo",comparison:_classPrivateFieldGet(this,_compare).invert?"ne":"eq"})}},{key:"gt",value:function gt(a){return this.greaterThan(a)}},{key:"lt",value:function lt(a){return this.lessThan(a)}},{key:"eq",value:function eq(a){return this.equalTo(a)}},{key:"ne",value:function ne(a){return this.not.equalTo(a)}},{key:"gte",value:function gte(a){return this.greaterThanEqual(a)}},{key:"lte",value:function lte(a){return this.lessThanEqual(a)}},{key:"to",get:function get(){return this}},{key:"be",get:function get(){return this}},{key:"and",get:function get(){return this}},{key:"but",get:function get(){return this}},{key:"not",get:function get(){return _classPrivateFieldGet(this,_compare).invert=!_classPrivateFieldGet(this,_compare).invert,this}},{key:"resetToBaseUrl",value:function resetToBaseUrl(){return _classPrivateFieldSet(this,_endpoint,""),_classPrivateFieldSet(this,_paths,[]),_classPrivateFieldSet(this,_parameters,new Map),_classPrivateFieldSet(this,_hash,""),this}},{key:"resetToEndpoint",value:function resetToEndpoint(){return _classPrivateFieldSet(this,_paths,[]),_classPrivateFieldSet(this,_parameters,new Map),_classPrivateFieldSet(this,_hash,""),this}},{key:"clearPath",value:function clearPath(){return _classPrivateFieldSet(this,_paths,[]),this.search(!1),this}},{key:"clearParameter",value:function clearParameter(){return _classPrivateFieldSet(this,_parameters,new Map),this}},{key:"clearHash",value:function clearHash(){return _classPrivateFieldSet(this,_hash,""),this}},{key:"getParameter",value:function getParameter(a){return _classPrivateFieldGet(this,_parameters).get(a)}},{key:"getLean",value:function getLean(){return _classPrivateFieldGet(this,_parameters).get("lean")}},{key:"getLeanWithId",value:function getLeanWithId(){return _classPrivateFieldGet(this,_parameters).get("leanWithId")}},{key:"getLeanWithout_id",value:function getLeanWithout_id(){return _classPrivateFieldGet(this,_parameters).get("leanWithout_id")}},{key:"getSearch",value:function getSearch(){return _classPrivateFieldGet(this,_parameters).get("search")}},{key:"getLimit",value:function getLimit(){return _classPrivateFieldGet(this,_parameters).get("limit")}},{key:"getPage",value:function getPage(){return _classPrivateFieldGet(this,_parameters).get("page")}},{key:"getSort",value:function getSort(){return _classPrivateFieldGet(this,_parameters).get("sort")}},{key:"getSelect",value:function getSelect(){return _classPrivateFieldGet(this,_parameters).get("select")}},{key:"getProjection",value:function getProjection(){return _classPrivateFieldGet(this,_parameters).get("projection")}},{key:"getQuery",value:function getQuery(){return _classPrivateFieldGet(this,_parameters).get("query")}},{key:"getPopulate",value:function getPopulate(){return _classPrivateFieldGet(this,_parameters).get("populate")}},{key:"getURL",value:function getURL(){return this.get()}},{key:"get",value:function get(){_classPrivateMethodGet(this,_applyProtocol,_applyProtocol2).call(this);var a=[_classPrivateFieldGet(this,_endpoint)].concat(_toConsumableArray(_classPrivateFieldGet(this,_paths))).map(removeLeadingAndTrailingSlash).join("/"),b=new URL(a,_classPrivateFieldGet(this,_baseUrl));return Array.from(_classPrivateFieldGet(this,_parameters)).filter(removeNullAndUndefinedStrings).forEach(function(a){var c=_slicedToArray(a,2),d=c[0],e=c[1];return b.searchParams.append(d,e)}),new URL(b.href.concat(_classPrivateFieldGet(this,_hash)))}},{key:"toUrlString",value:function toUrlString(){return this.toString()}},{key:"toString",value:function toString(){return this.get().href}}]),a}();function _extractHash2(a){var b=this;return a.includes("#")?a.replace(/#.*$/,function(a){return _classPrivateFieldSet(b,_hash,a),""}):a}function _applyProtocol2(){var a=new URL(_classPrivateFieldGet(this,_baseUrl));if(!a.protocol.includes("https")){var b=_classPrivateFieldGet(this,_protocol)===BreadUrlBuilder.FORCE_HTTP?"http:":"https:";_classPrivateFieldSet(this,_baseUrl,a.href.replace(a.protocol,b))}}function _addCompare2(a,b){return _classPrivateFieldGet(this,_compare).value?(_classPrivateFieldGet(this,_compare).invert=!1,_classPrivateFieldGet(this,_parameters).set(`${_classPrivateFieldGet(this,_compare).value}[${b.comparison}]`,a),this):this}_defineProperty(BreadUrlBuilder,"ASC",Symbol("asc")),_defineProperty(BreadUrlBuilder,"DESC",Symbol("desc")),_defineProperty(BreadUrlBuilder,"HTTPS",Symbol("https")),_defineProperty(BreadUrlBuilder,"FORCE_HTTP",Symbol("http")),module.exports=BreadUrlBuilder;