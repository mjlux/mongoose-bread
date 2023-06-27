"use strict";

const mongoose = require("mongoose");
const { expect } = require("chai");
const { BreadUrlBuilder } = require("../dist/index");

describe("BreadUrlBuilder", function () {
  it("is instantiable", function () {
    const testBreadUrlBuilderInstance = new BreadUrlBuilder(
      "http://api.test.com"
    );
    expect(testBreadUrlBuilderInstance).to.not.be.null;
    expect(testBreadUrlBuilderInstance).to.not.be.undefined;
  });

  it("throws Error for invalid Urls", function () {
    expect(() => new BreadUrlBuilder("").get()).to.throw("Invalid URL");
  });

  it("throws Error if select() and exclude() are called on the same instance", function () {
    expect(() => new BreadUrlBuilder("").select("").exclude("")).to.throw(
      "Calls to select() and exclude() are exclusive - make sure to call only select() or exclude()"
    );
  });

  it("casts toString when used in Template string", function () {
    expect(`${new BreadUrlBuilder("https://api.test.org/")}`).to.equal(
      "https://api.test.org/"
    );
  });

  it("sets the protocol to https", function () {
    expect(`${new BreadUrlBuilder("http://api.test.org")}`).to.equal(
      "https://api.test.org/"
    );

    const testBreadUrlBuilderInstance = new BreadUrlBuilder(
      "http://api.test.org"
    ).protocol(BreadUrlBuilder.HTTPS);
    expect(`${testBreadUrlBuilderInstance}`).to.equal("https://api.test.org/");
  });

  it("allows reset to http by explicitly setting the protocol to BreadUrlBuilder.FORCE_HTTP", function () {
    const testBreadUrlBuilderInstance = new BreadUrlBuilder(
      "http://api.test.org"
    ).protocol(BreadUrlBuilder.FORCE_HTTP);
    expect(`${testBreadUrlBuilderInstance}`).to.equal("http://api.test.org/");
  });

  it("has chainable methods", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .port(8080)
      .search("test")
      .limit(5)
      .getURL();

    expect(testUrl).to.not.be.null;
    expect(testUrl).to.not.be.undefined;
  });

  it("creates a paramertized URL", function () {
    const { ASC } = BreadUrlBuilder;
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .protocol(BreadUrlBuilder.FORCE_HTTP)
      .port(3000)
      .endpoint("/products")
      .hash("headline")
      .addPath("/new")
      .addToPath(new mongoose.Types.ObjectId("6478d57784fabdbf127d0a2a"))
      .addParameter("customParameter", 12)
      .lean(false)
      .leanWithId(false)
      .leanWithout_id(false)
      .search("price")
      .limit(100)
      .page(5)
      .sort("-price", ASC)
      .select("name")
      .getURL();

    expect(`${testUrl}`).to.equal(
      "http://api.test.org:3000/products/new/6478d57784fabdbf127d0a2a?customParameter=12&lean=false&leanWithId=false&leanWithout_id=false&search=price&limit=100&page=5&sort=price&select=name#headline"
    );
  });

  it('resets to endpoint with added path when .setPath() is used"', function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .addPath("/products/123/details/")
      .addPath("newest")
      .addToPath("456/")
      .addPath("/orange")
      .setPath("reset");
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/reset"
    );

    const userId = "6478d57784fabdbf127d0a2a";
    testUrl.clearPath().addPath("/member/friend/").setPath("reset").addToPath(userId);
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/reset/6478d57784fabdbf127d0a2a"
    );
  });

  it('adds "/" seperated path with one call to .addPath()"', function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .addPath("/products/123/details/")
      .addPath("newest")
      .addToPath("456/")
      .addPath("/orange");
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/products/123/details/newest/456/orange"
    );

    const userId = "6478d57784fabdbf127d0a2a";
    testUrl.clearPath().addPath("/member/friend/").addToPath(userId);
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/member/friend/6478d57784fabdbf127d0a2a"
    );
  });

  it("adds compare parameters", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .with("price")
      .greaterThan(100)
      .and.lessThan(1000)
      .with("views")
      .equalTo(123)
      .and.with("name")
      .not.equalTo("Moritz")
      .but.with("friendsAmount")
      .greaterThan(8);

    expect(`${testUrl}`).to.equal(
      "https://api.test.org/?price%5Bgt%5D=100&price%5Blt%5D=1000&views%5Beq%5D=123&name%5Bne%5D=Moritz&friendsAmount%5Bgt%5D=8"
    );
  });

  it("removes parameters", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .addParameter("chicken", "GackGack")
      .with("price")
      .greaterThan(100)
      .and.lessThan(1000);
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/?chicken=GackGack&price%5Bgt%5D=100&price%5Blt%5D=1000"
    );
    testUrl.without("unknownKey");
    expect(`${testUrl}`, "ignore unset params").to.equal(
      "https://api.test.org/?chicken=GackGack&price%5Bgt%5D=100&price%5Blt%5D=1000"
    );
    testUrl.without("chicken");
    expect(`${testUrl}`, "remove param").to.equal(
      "https://api.test.org/?price%5Bgt%5D=100&price%5Blt%5D=1000"
    );
    testUrl.without("price");
    expect(`${testUrl}`, "remove compare").to.equal("https://api.test.org/");
  });

  it("concats sorts", function () {
    const { ASC, DESC } = BreadUrlBuilder;
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .sort("friends", ASC)
      .addSort("views", DESC);

    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=friends+-views");
    
    testUrl.addSort("name angle reach", ASC)

    expect(testUrl.getSort()).to.equal("friends -views name angle reach");
    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=friends+-views+name+angle+reach");
  });

  it("adds unique sorts", function () {
    const { ASC, DESC } = BreadUrlBuilder;
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .sort("friends friends friends friends friends friends", ASC)
      .addSort("views", DESC);

    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=friends+-views");
    
    testUrl.addSort("    name name name name name     ", ASC)

    expect(testUrl.getSort()).to.equal("friends -views name");
    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=friends+-views+name");
  });

  it("explicitly set sort on .sort() call", function () {
    const { ASC, DESC } = BreadUrlBuilder;
    const testUrl = new BreadUrlBuilder("http://api.test.org")
      .addSort("friends", ASC)
      .addToSort("views", DESC);

    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=friends+-views");

    testUrl.sort('createdAt', DESC)
    expect(`${testUrl}`).to.equal("https://api.test.org/?sort=-createdAt");
  });

  it("adds projection as JSON string", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org#test").projection({
      title: 0,
      age: 0,
    });

    // console.log(testUrl.get().searchParams.get('projection'))
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/?projection=%7B%22title%22%3A0%2C%22age%22%3A0%7D#test"
    );
    const jsonString = testUrl.get().searchParams.get("projection");
    expect(jsonString).to.equal('{"title":0,"age":0}');
    const projection = JSON.parse(jsonString);
    expect(projection).with.property("title").to.equal(0);
  });

  it("adds query as JSON string", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org#test")
      .endpoint("books")
      .query({
        title: { $in: ["dracula", "vampires"] },
        age: { $and: [{ $gt: 5 }, { $lt: 20 }] },
      });

    expect(`${testUrl}`).to.equal(
      "https://api.test.org/books?query=%7B%22title%22%3A%7B%22%24in%22%3A%5B%22dracula%22%2C%22vampires%22%5D%7D%2C%22age%22%3A%7B%22%24and%22%3A%5B%7B%22%24gt%22%3A5%7D%2C%7B%22%24lt%22%3A20%7D%5D%7D%7D#test"
    );
    const jsonString = testUrl.get().searchParams.get("query");
    expect(jsonString).to.equal(
      '{"title":{"$in":["dracula","vampires"]},"age":{"$and":[{"$gt":5},{"$lt":20}]}}'
    );
    const query = JSON.parse(jsonString);
    expect(query).to.be.an.instanceOf(Object).with.property("title");
    expect(query)
      .property("age")
      .to.have.property("$and")
      .which.is.an.instanceOf(Array)
      .with.deep.members([{ $gt: 5 }, { $lt: 20 }]);
  });

  it("accepts Array|Object for populate", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org#test")
      .endpoint("books")
      .populate({ author: 1 });

    const objQuery = JSON.parse(testUrl.get().searchParams.get("populate"));
    expect(objQuery).to.be.an.instanceOf(Object).with.property("author");

    testUrl.populate(["author", "publisher"]);
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/books?populate=%5B%22author%22%2C%22publisher%22%5D#test"
    );
    const jsonString = testUrl.get().searchParams.get("populate");
    expect(jsonString).to.equal('["author","publisher"]');
    const arrQuery = JSON.parse(jsonString);
    expect(arrQuery)
      .to.be.an.instanceOf(Array)
      .with.members(["author", "publisher"]);
  });

  it("resets the Url", function () {
    const testUrl = new BreadUrlBuilder("http://api.test.org#test")
      .endpoint("products")
      .addPath(new mongoose.Types.ObjectId("647915f96cd4bbcb546def4c"))
      .addPath("details")
      .projection({ title: 0, age: 0 });
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/products/647915f96cd4bbcb546def4c/details?projection=%7B%22title%22%3A0%2C%22age%22%3A0%7D#test"
    );

    testUrl.clearHash();
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/products/647915f96cd4bbcb546def4c/details?projection=%7B%22title%22%3A0%2C%22age%22%3A0%7D"
    );

    testUrl.hash("footer").clearParameter();
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/products/647915f96cd4bbcb546def4c/details#footer"
    );

    testUrl.search("new").clearPath();
    expect(`${testUrl}`).to.equal(
      "https://api.test.org/products#footer"
    );

    testUrl
      .addPath("old")
      .hash("#header")
      .search("Weihnachtskarten")
      .resetToEndpoint();
    expect(`${testUrl}`).to.equal("https://api.test.org/products");

    testUrl.addPath("new").addParameter("title", "Dune").resetToBaseUrl();
    expect(`${testUrl}`).to.equal("https://api.test.org/");
  });
});
