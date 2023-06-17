const SelectExcludeErrorMessage =
  "Calls to select() and exclude() are exclusive - make sure to call only select() or exclude()";
const removeNullAndUndefinedStrings = ([k, v]) =>
  k != "undefined" && k != "null" && v != "undefined" && v != "null";
const removeLeadingAndTrailingSlash = (s) => String(s).replace(/^\/|\/$/g, "");
const { isArray } = Array;

type Stringifyable = string | { toString: () => string }

export default class BreadUrlBuilder {
  static ASC = Symbol("asc");
  static DESC = Symbol("desc");
  static HTTPS = Symbol("https");
  static FORCE_HTTP = Symbol("http");

  #baseUrl;
  #protocol = BreadUrlBuilder.HTTPS;
  #endpoint = "";
  #hash = "";
  #paths = new Array<Stringifyable>();
  #parameters = new Map();

  #_selectCalled = false;
  #_excludeCalled = false;
  #_compare = {
    value: undefined,
    history: new Set(),
    invert: false,
  };

  constructor($baseUrl:string) {
    if (typeof $baseUrl != "string")
      throw new Error("invalid argument - expected String - @BreadUrlBuilder()");
    this.#baseUrl = this.#extractHash($baseUrl);
  }

  #extractHash($url) {
    if (!$url.includes("#")) return $url;
    return $url.replace(/#.*$/, (hash) => {
      this.#hash = hash;
      return "";
    });
  }
  #applyProtocol() {
    const baseUrl = new URL(this.#baseUrl);
    if (!baseUrl.protocol.includes("https")) {
      const newProtocol =
        this.#protocol === BreadUrlBuilder.FORCE_HTTP ? "http:" : "https:";
      this.#baseUrl = baseUrl.href.replace(baseUrl.protocol, newProtocol);
    }
  }
  #addCompare($value, $options) {
    if (!this.#_compare.value) return this;
    if (!$options.types.includes(typeof $value))
      throw new Error(
        `invalid argument - expected ${$options.types.join("|")} - @${$options.at
        }()`
      );
    this.#_compare.invert = false;
    this.#parameters.set(
      `${this.#_compare.value}[${$options.comparison}]`,
      $value
    );
    return this;
  }

  protocol($protocol:symbol) {
    const allowedProtocols = [
      BreadUrlBuilder.FORCE_HTTP,
      BreadUrlBuilder.HTTPS,
    ];
    if (!allowedProtocols.includes($protocol))
      throw new Error(
        `invalid argument - expected BreadUrlBuilder.FORCE_HTTP|BreadUrlBuilder.HTTPS - @protocol()`
      );
    this.#protocol = $protocol;
    return this;
  }
  port($port:number) {
    if (typeof $port != "number")
      throw new Error("invalid argument - expected Number - @port()");
    const baseUrl = new URL(this.#baseUrl);
    if ($port != Number(baseUrl.port)) {
      this.#baseUrl = baseUrl.href.replace(
        baseUrl.host,
        `${baseUrl.hostname}:${$port}`
      );
    }
    return this;
  }
  endpoint($endpoint:string) {
    if (typeof $endpoint != "string")
      throw new Error("invalid argument - expected String - @endpoint()");
    this.#endpoint = this.#extractHash($endpoint);
    return this;
  }
  hash($hash:string) {
    if (typeof $hash != "string")
      throw new Error("invalid argument - expected String - @hash()");
    this.#hash = $hash.startsWith("#") ? $hash : `#${$hash}`;
    return this;
  }
  setPath($path:Stringifyable) {
    return this.clearPath().addPath($path)
  }
  addPath($path:Stringifyable) {
    if (!$path.toString)
      throw new Error("invalid argument - expected stringifyable - @addPath()");
    this.#paths.push($path);
    return this;
  }
  addToPath($path:Stringifyable) {
    return this.addPath($path);
  }
  addParameter($parameter:string, $value:string | number) {
    if (!$parameter || !$value) return this;
    if (
      typeof $parameter != "string" ||
      !["string", "number"].includes(typeof $value)
    )
      throw new Error("invalid argument - expected String - @addParameter()");
    this.#parameters.set($parameter, $value);
    return this;
  }
  lean($lean = true) {
    this.#parameters.set("lean", !!$lean);
    return this;
  }
  leanWithId($leanWithId = true) {
    this.#parameters.set("leanWithId", !!$leanWithId);
    return this;
  }
  leanWithout_id($leanWithout_id = true) {
    this.#parameters.set("leanWithout_id", !!$leanWithout_id);
    return this;
  }
  search($search:string) {
    if (!$search) {
      this.#parameters.delete("search");
      return this;
    }
    if (typeof $search != "string")
      throw new Error("invalid argument - expected String - @search()");
    this.#parameters.set("search", $search);
    return this;
  }
  limit($limit:number) {
    if (typeof $limit != "number")
      throw new Error("invalid argument - expected Number - @limit()");
    this.#parameters.set("limit", $limit);
    return this;
  }
  page($page:number) {
    if (typeof $page != "number")
      throw new Error("invalid argument - expected Number - @page()");
    this.#parameters.set("page", $page);
    return this;
  }
  addSort($sort:string, $order:symbol) {
    if( !this.#parameters.has("sort") )
      return this.sort($sort, $order);

    const { ASC, DESC } = BreadUrlBuilder;
    if (!$sort)
      throw new Error("invalid argument 'sort' - expected String - @addSort()");

    if (!($order == ASC || $order == DESC))
      throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @addSort()");

    const existingSort = new Set(this.#parameters.get("sort").split(" "))

    let _sort = $sort
      .trim()
      .split(" ")
      .map(s => s.replace(/-/g, ""))
      
    _sort.forEach( s => {
      existingSort.delete(s)
      existingSort.delete(`-${s}`)
    })

    _sort = _sort.map(s => ($order === DESC) ? `-${s}` : s)
    const uniqueFields = [...new Set(_sort)]
    this.#parameters.set("sort", [...existingSort, ...uniqueFields].join(" "));
    return this;
  }
  addToSort($sort:string, $order:symbol) {
    return this.addSort($sort, $order)
  }
  sort($sort:string, $order:symbol) {
    const { ASC, DESC } = BreadUrlBuilder;

    if (!$sort)
      throw new Error("invalid argument 'sort' - expected String - @sort()");

    if (!($order == ASC || $order == DESC))
      throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @sort()");

    const _sort = $sort
      .trim()
      .split(" ")
      .map(s => s.replace(/-/g, ""))
      .map(s => ($order === DESC) ? `-${s}` : s)

    const uniqueFields = [...new Set(_sort)]
    this.#parameters.set("sort", uniqueFields.join(" "));

    return this;
  }
  select($fields:string | Array<string> = "") {
    if (this.#_excludeCalled) throw new Error(SelectExcludeErrorMessage);
    this.#_selectCalled = true;
    if (typeof $fields === "string") $fields = $fields.split(" ");
    if (!isArray($fields))
      throw new Error("invalid argument - expected String|Array - @select()");
    $fields = $fields.map((field) => field.replace(/-/g, "")).join(" ");
    this.#parameters.set("select", $fields);
    return this;
  }
  exclude($fields:string | Array<string> = "") {
    if (this.#_selectCalled) throw new Error(SelectExcludeErrorMessage);
    this.#_excludeCalled = true;
    if (typeof $fields === "string") $fields = $fields.split(" ");
    if (!isArray($fields))
      throw new Error("invalid argument - expected String|Array - @exclude()");
    $fields = $fields.map((field) => `-${field.replace(/-/g, "")}`).join(" ");
    this.#parameters.set("select", $fields);
    return this;
  }
  projection($projection:object) {
    if (typeof $projection != "object")
      throw new Error("invalid argument - expected Object - @projection()");
    this.#parameters.set("projection", JSON.stringify($projection));
    return this;
  }
  query($query:object) {
    if (typeof $query != "object")
      throw new Error("invalid argument - expected Object - @query()");
    this.#parameters.set("query", JSON.stringify($query));
    return this;
  }
  populate($populate:Array<string> | {path:string, select?: string, match?: object, options?: object}) {
    if (!(typeof $populate == "object" || isArray($populate)))
      throw new Error("invalid argument - expected Object|Array - @populate()");
    this.#parameters.set("populate", JSON.stringify($populate));
    return this;
  }

  // --------- COMPARE FNS -------------

  with($key:string) {
    if (typeof $key != "string")
      throw new Error("invalid argument - expected String - @with()");
    this.#_compare.history.add($key);
    this.#_compare.value = $key;
    return this;
  }
  withOut($key:string) {
    if (!(this.#parameters.has($key) || this.#_compare.history.has($key)))
      return this;
    if (typeof $key != "string")
      throw new Error("invalid argument - expected String - @withOut()");
    const params = Array.from(this.#parameters).filter(
      ([key]) => !key.startsWith($key)
    );
    this.#parameters = new Map(params);
    this.#_compare.history.delete($key);
    return this;
  }
  greaterThan($value:string|number) {
    return this.#addCompare($value, {
      at: "greaterThan",
      types: ["number"],
      comparison: "gt",
    });
  }
  lessThan($value:string|number) {
    return this.#addCompare($value, {
      at: "lessThan",
      types: ["number"],
      comparison: "lt",
    });
  }
  greaterThanEqual($value:string|number) {
    return this.#addCompare($value, {
      at: "greaterThanEqual",
      types: ["number"],
      comparison: "gte",
    });
  }
  lessThanEqual($value:string|number) {
    return this.#addCompare($value, {
      at: "lessThanEqual",
      types: ["number"],
      comparison: "lte",
    });
  }
  equalTo($value:string|number) {
    const comparison = this.#_compare.invert ? "ne" : "eq";
    return this.#addCompare($value, {
      at: "equalTo",
      types: ["string", "number"],
      comparison,
    });
  }
  gt($value:string|number) {
    return this.greaterThan($value);
  }
  lt($value:string|number) {
    return this.lessThan($value);
  }
  eq($value:string|number) {
    return this.equalTo($value);
  }
  ne($value:string|number) {
    return this.not.equalTo($value);
  }
  gte($value:string|number) {
    return this.greaterThanEqual($value);
  }
  lte($value:string|number) {
    return this.lessThanEqual($value);
  }
  get to() {
    return this;
  }
  get be() {
    return this;
  }
  get and() {
    return this;
  }
  get but() {
    return this;
  }
  get not() {
    this.#_compare.invert = !this.#_compare.invert;
    return this;
  }
  // --------- RESET & CLEAR  -----------

  resetToBaseUrl() {
    this.#endpoint = "";
    this.#paths = new Array<string>();
    this.#parameters = new Map();
    this.#hash = "";
    return this;
  }
  resetToEndpoint() {
    this.#paths = new Array<string>();
    this.#parameters = new Map();
    this.#hash = "";
    return this;
  }
  clearPath() {
    this.#paths = new Array<string>();
    this.search('')
    return this;
  }
  clearParameter() {
    this.#parameters = new Map();
    return this;
  }
  clearHash() {
    this.#hash = "";
    return this;
  }

  // --------- GETTER  -----------

  getParameter($key:string):boolean|string|number{ return this.#parameters.get($key) }
  getLean():boolean{ return this.#parameters.get("lean") }
  getLeanWithId():boolean{ return this.#parameters.get("leanWithId") }
  getLeanWithout_id():boolean{ return this.#parameters.get("leanWithout_id") }
  getSearch():string{ return this.#parameters.get("search") }
  getLimit():string|number{ return this.#parameters.get("limit") }
  getPage():number{ return this.#parameters.get("page") }
  getSort():string{ return this.#parameters.get("sort") }
  getSelect():string{ return this.#parameters.get("select") }
  getProjection():string{ return this.#parameters.get("projection") }
  getQuery():string{ return this.#parameters.get("query") }
  getPopulate():string{ return this.#parameters.get("populate") }

  getURL() { return this.get(); }
  get() {
    this.#applyProtocol();
    const endpoint = [this.#endpoint, ...this.#paths]
      .map(removeLeadingAndTrailingSlash)
      .join("/");
    const url = new URL(endpoint, this.#baseUrl);
    Array.from(this.#parameters)
      .filter(removeNullAndUndefinedStrings)
      .forEach(([key, value]) => url.searchParams.append(key, value));

    return new URL(url.href.concat(this.#hash));
  }

  toUrlString() {
    return this.toString();
  }
  toString() {
    return this.get().href;
  }
}

module.exports = BreadUrlBuilder;
