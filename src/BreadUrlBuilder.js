const SelectExcludeErrorMessage =
  "Calls to select() and exclude() are exclusive - make sure to call only select() or exclude()";
const removeNullAndUndefinedStrings = ([k, v]) =>
  k != "undefined" && k != "null" && v != "undefined" && v != "null";
const removeLeadingAndTrailingSlash = (s) => String(s).replace(/^\/|\/$/g, "");
const { isArray } = Array;

class BreadUrlBuilder {
  static ASC = Symbol("asc");
  static DESC = Symbol("desc");
  static HTTPS = Symbol("https");
  static FORCE_HTTP = Symbol("http");

  #baseUrl;
  #protocol = BreadUrlBuilder.HTTPS;
  #endpoint = "";
  #hash = "";
  #paths = new Array();
  #parameters = new Map();

  #_selectCalled = false;
  #_excludeCalled = false;
  #_compare = {
    value: undefined,
    history: new Set(),
    invert: false,
  };

  constructor($baseUrl) {
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
    this.#_compare.invert = false;
    this.#parameters.set(
      `${this.#_compare.value}[${$options.comparison}]`,
      $value
    );
    return this;
  }

  protocol($protocol) {
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
  port($port) {
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
  endpoint($endpoint) {
    if (typeof $endpoint != "string")
      throw new Error("invalid argument - expected String - @endpoint()");
    this.#endpoint = this.#extractHash($endpoint);
    return this;
  }
  hash($hash) {
    if (typeof $hash != "string")
      throw new Error("invalid argument - expected String - @hash()");
    this.#hash = $hash.startsWith("#") ? $hash : `#${$hash}`;
    return this;
  }
  setPath($path) {
    return this.clearPath().addPath($path)
  }
  addPath($path) {
    if (!$path.toString)
      throw new Error("invalid argument - expected stringifyable - @addPath()");
    this.#paths.push($path);
    return this;
  }
  addToPath($path) {
    return this.addPath($path);
  }
  addParameter($parameter, $value) {
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
  search($search) {
    if (!$search) {
      this.#parameters.delete("search");
      return this;
    }
    if (typeof $search != "string")
      throw new Error("invalid argument - expected String - @search()");
    this.#parameters.set("search", $search);
    return this;
  }
  limit($limit) {
    if (typeof $limit != "number")
      throw new Error("invalid argument - expected Number - @limit()");
    this.#parameters.set("limit", $limit);
    return this;
  }
  page($page) {
    if (typeof $page != "number")
      throw new Error("invalid argument - expected Number - @page()");
    this.#parameters.set("page", $page);
    return this;
  }
  
  /**
   *
   * @param {String} $sort
   * @param {BreadUrlBuilder.ASC|BreadUrlBuilder.DESC} $order
   * @returns BreadUrlBuilder
   */
  addSort($sort, $order) {
    if( !this.#parameters.has("sort") )
      return this.sort($sort, $order);

    const { ASC, DESC } = BreadUrlBuilder;
    if (!$sort)
      throw new Error("invalid argument 'sort' - expected String - @addSort()");

    if (!($order == ASC || $order == DESC))
      throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @addSort()");

    const existingSort = new Set(this.#parameters.get("sort").split(" "))

    $sort = $sort
      .trim()
      .split(" ")
      .map(s => s.replace(/-/g, ""))
      
    $sort.forEach( s => {
      existingSort.delete(s)
      existingSort.delete(`-${s}`)
    })

    $sort = $sort.map(s => ($order === DESC) ? `-${s}` : s)
    const uniqueFields = [...new Set($sort)]
    this.#parameters.set("sort", [...existingSort, ...uniqueFields].join(" "));
    return this;
  }
  addToSort($sort, $order) {
    return this.addSort($sort, $order)
  }
  sort($sort, $order) {
    const { ASC, DESC } = BreadUrlBuilder;

    if (!$sort)
      throw new Error("invalid argument 'sort' - expected String - @sort()");

    if (!($order == ASC || $order == DESC))
      throw new Error("invalid argument 'order' - expected BreadUrlBuilder.ASC|BreadUrlBuilder.DESC - @sort()");

    $sort = $sort
      .trim()
      .split(" ")
      .map(s => s.replace(/-/g, ""))
      .map(s => ($order === DESC) ? `-${s}` : s)

    const uniqueFields = [...new Set($sort)]
    this.#parameters.set("sort", uniqueFields.join(" "));

    return this;
  }
  /**
   * @param {Sting|Array} $fields
   * @returns BreadUrlBuilder
   */
  select($fields = "") {
    if (this.#_excludeCalled) throw new Error(SelectExcludeErrorMessage);
    this.#_selectCalled = true;
    if (typeof $fields === "string") $fields = $fields.split(" ");
    if (!isArray($fields))
      throw new Error("invalid argument - expected String|Array - @select()");
    $fields = $fields.map((field) => field.replace(/-/g, "")).join(" ");
    this.#parameters.set("select", $fields);
    return this;
  }
  /**
   * @param {Sting|Array} $fields
   * @returns BreadUrlBuilder
   */
  exclude($fields = "") {
    if (this.#_selectCalled) throw new Error(SelectExcludeErrorMessage);
    this.#_excludeCalled = true;
    if (typeof $fields === "string") $fields = $fields.split(" ");
    if (!isArray($fields))
      throw new Error("invalid argument - expected String|Array - @exclude()");
    $fields = $fields.map((field) => `-${(field.replace(/-/g), "")}`).join(" ");
    this.#parameters.set("select", $fields);
    return this;
  }
  projection($projection) {
    if (typeof $projection != "object")
      throw new Error("invalid argument - expected Object - @projection()");
    this.#parameters.set("projection", JSON.stringify($projection));
    return this;
  }
  query($query) {
    if (typeof $query != "object")
      throw new Error("invalid argument - expected Object - @query()");
    this.#parameters.set("query", JSON.stringify($query));
    return this;
  }
  populate($populate) {
    if (!(typeof $populate == "object" || isArray($populate)))
      throw new Error("invalid argument - expected Object|Array - @populate()");
    this.#parameters.set("populate", JSON.stringify($populate));
    return this;
  }

  // --------- COMPARE FNS -------------

  with($key) {
    if (typeof $key != "string")
      throw new Error("invalid argument - expected String - @with()");
    this.#_compare.history.add($key);
    this.#_compare.value = $key;
    return this;
  }
  without($key) {
    if (!(this.#parameters.has($key) || this.#_compare.history.has($key)))
      return this;
    if (typeof $key != "string")
      throw new Error("invalid argument - expected String - @withOut()");
    const params = Array.from(this.#parameters).filter(
      ([key]) => !key.startsWith($key)
    );
    this.#parameters = new URLSearchParams(params);
    this.#_compare.history.delete($key);
    return this;
  }
  greaterThan($value) {
    return this.#addCompare($value, {
      at: "greaterThan",
      comparison: "gt",
    });
  }
  lessThan($value) {
    return this.#addCompare($value, {
      at: "lessThan",
      comparison: "lt",
    });
  }
  greaterThanEqual($value) {
    return this.#addCompare($value, {
      at: "greaterThanEqual",
      comparison: "gte",
    });
  }
  lessThanEqual($value) {
    return this.#addCompare($value, {
      at: "lessThanEqual",
      comparison: "lte",
    });
  }
  equalTo($value) {
    return this.#addCompare($value, {
      at: "equalTo",
      comparison: this.#_compare.invert ? "ne" : "eq",
    });
  }
  gt($value) {
    return this.greaterThan($value);
  }
  lt($value) {
    return this.lessThan($value);
  }
  eq($value) {
    return this.equalTo($value);
  }
  ne($value) {
    return this.not.equalTo($value);
  }
  gte($value) {
    return this.greaterThanEqual($value);
  }
  lte($value) {
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
    this.#paths = new Array();
    this.#parameters = new Map();
    this.#hash = "";
    return this;
  }
  resetToEndpoint() {
    this.#paths = new Array();
    this.#parameters = new Map();
    this.#hash = "";
    return this;
  }
  clearPath() {
    this.#paths = new Array();
    this.search(false)
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

  getParameter($key){ return this.#parameters.get($key) }
  getLean(){ return this.#parameters.get("lean") }
  getLeanWithId(){ return this.#parameters.get("leanWithId") }
  getLeanWithout_id(){ return this.#parameters.get("leanWithout_id") }
  getSearch(){ return this.#parameters.get("search") }
  getLimit(){ return this.#parameters.get("limit") }
  getPage(){ return this.#parameters.get("page") }
  getSort(){ return this.#parameters.get("sort") }
  getSelect(){ return this.#parameters.get("select") }
  getProjection(){ return this.#parameters.get("projection") }
  getQuery(){ return this.#parameters.get("query") }
  getPopulate(){ return this.#parameters.get("populate") }
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
