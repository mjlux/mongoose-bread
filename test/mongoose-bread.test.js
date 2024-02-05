"use strict";

const mongoose = require("mongoose");
const { expect } = require("chai");
const mongooseBread = require("../dist/index");
const { MongooseBreadError } = require("../dist/index");

const MONGO_URI =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";

const ProductCustomKeysSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductCustomKeysSchema.plugin(mongooseBread, {
  paramsIdKey: "idCustom",
  bulkIdsKey: "_idsCustom",
  bulkDocsKey: "_docsCustom",
});
const ProductCustomKeys = mongoose.model(
  "ProductCustomKeys",
  ProductCustomKeysSchema
);

const ProductCustomLabelsSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductCustomLabelsSchema.plugin(mongooseBread, {
  customLabels: {
    docs: "docsCustom",
    limit: "limitCustom",
    page: "pageCustom",
    pagingCounter: "pagingCounterCustom",
    hasNextPage: "hasNextPageCustom",
    hasPrevPage: "hasPrevPageCustom",
    nextPage: "nextPageCustom",
    prevPage: "prevPageCustom",
    totalDocs: "totalDocsCustom",
    totalPages: "totalPagesCustom",
    meta: "paginationCustom",
    acknowledged: "acknowledgedCustom",
    modifiedCount: "modifiedCountCustom",
    deletedCount: "deletedCountCustom",
    createdCount: "createdCountCustom",
    readCount: "readCountCustom",
  },
});
const ProductCustomLabels = mongoose.model(
  "ProductCustomLabels",
  ProductCustomLabelsSchema
);

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductSchema.plugin(mongooseBread, {
  searchableFields: ["name"],
});
const Product = mongoose.model("Product", ProductSchema);

const ProductSoftDeleteSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductSoftDeleteSchema.plugin(mongooseBread, {
  searchableFields: ["name"],
  softDelete: true,
  softDeleteOptions: {
    validateBeforeDelete: true,
    indexFields: true,
    deletedAt: true,
    deletedBy: true,
    requestUserIdPath: "auth.user._id",
  },
});
const ProductSoftDelete = mongoose.model(
  "ProductSoftDelete",
  ProductSoftDeleteSchema
);

const ProductTransactionSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductTransactionSchema.plugin(mongooseBread, {
  searchableFields: ["name"],
  runUpdateTransaction: true,
});
const ProductTransaction = mongoose.model(
  "ProductTransaction",
  ProductTransactionSchema
);

const ProductAtlasSearchSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductAtlasSearchSchema.plugin(mongooseBread, {
  searchableFields: ["name", "description"],
  enableAtlasSearch: true,
  atlasSearchIndex: "fulltexttest",
});
const ProductAtlasSearch = mongoose.model(
  "ProductAtlasSearch",
  ProductAtlasSearchSchema
);

const ProductAtlasSearchWrongConfigSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
ProductAtlasSearchWrongConfigSchema.plugin(mongooseBread, {
  searchableFields: ["name", "description"],
  enableAtlasSearch: true,
});
const ProductAtlasSearchWrongConfig = mongoose.model(
  "ProductAtlasSearchWrongConfig",
  ProductAtlasSearchWrongConfigSchema
);

describe("mongoose-bread", async function () {
  before(function (done) {
    mongoose.connect(
      MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      done
    );
  });

  before(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new ProductCustomKeys({
          name: `ProductCustomKeys #${i + 1}`,
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return ProductCustomKeys.create(products);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new ProductCustomLabels({
          name: `ProductCustomLabels #${i + 1}`,
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return ProductCustomLabels.create(products);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new Product({
          name: `Product #${i + 1}`,
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return Product.create(products);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new ProductSoftDelete({
          name: `ProductSoftDelete #${i + 1}`,
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return ProductSoftDelete.create(products);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new Product({
          name: `Product #${i + 1}`,
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return ProductTransaction.create(products);
  });

  before(async function () {
    let products = new Array(10).fill(undefined).map(
      (_, i) =>
        new Product({
          name: `Product #${i + 1}`,
          description: "This is product number " + (i + 1),
          price: (i + 1) * 10,
          currency: i < 5 ? "EUR" : "USD",
        })
    );
    return ProductAtlasSearch.create(products);
  });

  describe("with custom property access Keys", function () {
    it("reads a document correctly", function () {
      return ProductCustomKeys.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = { params: { idCustom: doc._id } };
          const options = ProductCustomKeys.breadHelper().createReadOptions({
            ...mockRequest,
          });
          return ProductCustomKeys.read(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc.name).to.equal("temp");
        });
    });

    it("edits many documents correctly", function () {
      return ProductCustomKeys.create([
        { name: "doc#1", currency: "EUR" },
        { name: "doc#2", currency: "EUR" },
      ])
        .then((docs) => {
          const mockRequest = {
            body: {
              _idsCustom: docs.map((d) => d._id),
              _docsCustom: [{ currency: "USD" }],
            },
          };
          const options = ProductCustomKeys.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductCustomKeys.edit(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(2);
          const doc0 = result.docs[0];
          expect(doc0).to.be.an.instanceOf(Object);
          expect(doc0.name).to.equal("doc#1");
          expect(doc0.currency).to.equal("USD");
          const doc1 = result.docs[1];
          expect(doc1).to.be.an.instanceOf(Object);
          expect(doc1.name).to.equal("doc#2");
          expect(doc1.currency).to.equal("USD");
        });
    });

    it("adds many documents correctly", function () {
      const mockRequest = {
        body: {
          _docsCustom: [
            { name: "temp#1", price: 5, currency: "USD" },
            { name: "temp#2", price: 50, currency: "EUR" },
          ],
        },
      };
      const options = ProductCustomKeys.breadHelper().createAddOptions({
        ...mockRequest,
      });
      return ProductCustomKeys.add(options).then((result) => {
        expect(result).to.be.an.instanceOf(Object);
        expect(result).to.have.property("createdCount");
        expect(result).to.have.property("acknowledged");
        expect(result.docs).to.be.an.instanceOf(Array);
        expect(result.docs).to.have.length(2);
        const doc0 = result.docs[0];
        expect(doc0).to.be.an.instanceOf(Object);
        expect(doc0.name).to.equal("temp#1");
        expect(doc0.price).to.equal(5);
        expect(doc0.currency).to.equal("USD");
        const doc1 = result.docs[1];
        expect(doc1).to.be.an.instanceOf(Object);
        expect(doc1.name).to.equal("temp#2");
        expect(doc1.price).to.equal(50);
        expect(doc1.currency).to.equal("EUR");
      });
    });

    it("destroys a document correctly", function () {
      return ProductCustomKeys.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = { params: { idCustom: doc._id } };
          const options = ProductCustomKeys.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return Promise.all([
            ProductCustomKeys.destroy(options),
            Promise.resolve(doc),
          ]);
        })
        .then(([result, doc]) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.acknowledged).to.equal(true);
          expect(result.deletedCount).to.equal(1);
          return ProductCustomKeys.findById(doc._id);
        })
        .then((doc) => {
          expect(doc).to.be.null;
        });
    });

    it("destroys many documents correctly", function () {
      return ProductCustomKeys.create([
        { name: "a" },
        { name: "b" },
        { name: "c" },
      ])
        .then((docs) => {
          const mockRequest = { body: { _idsCustom: docs.map((d) => d._id) } };
          const options = ProductCustomKeys.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return ProductCustomKeys.destroy(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.acknowledged).to.equal(true);
          expect(result.deletedCount).to.equal(3);
        });
    });
  }); // end with custom property access Keys

  describe("with custom Labels", function () {
    it("applies customLabels on browse result", function () {
      const mockRequest = {};
      const options = ProductCustomLabels.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      return ProductCustomLabels.browse(options).then((result) => {
        expect(result).to.have.keys([
          "docsCustom",
          "paginationCustom",
          "acknowledgedCustom",
          "readCountCustom",
        ]);
        expect(result).to.have.property("paginationCustom").with.keys([
          "offset", // autogenerated and not customizable
          "limitCustom",
          "pageCustom",
          "pagingCounterCustom",
          "hasNextPageCustom",
          "hasPrevPageCustom",
          "nextPageCustom",
          "prevPageCustom",
          "totalDocsCustom",
          "totalPagesCustom",
        ]);
      });
    });

    it("applies customLabels on read result", function () {
      return ProductCustomLabels.findOne()
        .then((doc) => {
          const mockRequest = { params: { id: doc._id } };
          const options = ProductCustomLabels.breadHelper().createReadOptions({
            ...mockRequest,
          });
          return ProductCustomLabels.read(options);
        })
        .then((result) => {
          expect(result).to.have.keys([
            "docsCustom",
            "acknowledgedCustom",
            "readCountCustom",
          ]);
        });
    });

    it("applies customLabels on edit result", function () {
      return ProductCustomLabels.findOne()
        .then((doc) => {
          const mockRequest = { params: { id: doc._id }, body: {} };
          const options = ProductCustomLabels.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductCustomLabels.edit(options);
        })
        .then((result) => {
          expect(result).to.have.keys([
            "docsCustom",
            "acknowledgedCustom",
            "modifiedCountCustom",
          ]);
        });
    });

    it("applies customLabels on add result", function () {
      const mockRequest = { body: {} };
      const options = ProductCustomLabels.breadHelper().createAddOptions({
        ...mockRequest,
      });
      return ProductCustomLabels.add(options).then((result) => {
        expect(result).to.have.keys([
          "docsCustom",
          "acknowledgedCustom",
          "createdCountCustom",
        ]);
      });
    });

    it("applies customLabels on destroy result", function () {
      return ProductCustomLabels.findOne()
        .then((doc) => {
          const mockRequest = { params: { id: doc._id } };
          const options = ProductCustomLabels.breadHelper().createDeleteOptions(
            { ...mockRequest }
          );
          return ProductCustomLabels.destroy(options);
        })
        .then((result) => {
          expect(result).to.have.keys([
            "docsCustom",
            "deletedCountCustom",
            "acknowledgedCustom",
          ]);
        });
    });
  }); // end with custom Labels

  describe("with softDelete", function () {
    it("adds plugin methods to Model", function () {
      expect(ProductSoftDelete.browse).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.read).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.edit).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.add).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.softDelete).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.destroy).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.rehabilitate).to.be.an.instanceOf(Function);
    });

    it("adds plugin helper getter method to Model", function () {
      expect(ProductSoftDelete.breadHelper).to.be.an.instanceOf(Function);
    });

    it("adds plugin helper methods to Model via helper getter", function () {
      expect(
        ProductSoftDelete.breadHelper().createBrowseOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createBrowseDeletedOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createReadOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createReadDeletedOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createEditOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createAddOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createDeleteOptions
      ).to.be.an.instanceOf(Function);
      expect(
        ProductSoftDelete.breadHelper().createRehabilitateOptions
      ).to.be.an.instanceOf(Function);
    });

    it("leaves the dependency methods intact", function () {
      expect(ProductSoftDelete.paginate).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.delete).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.deleteById).to.be.an.instanceOf(Function);
      expect(ProductSoftDelete.restore).to.be.an.instanceOf(Function);
    });

    it("throws Error if invalid request is passed to helper methods", function () {
      let mockRequest, fn;
      const helper = ProductSoftDelete.breadHelper();

      const { createReadDeletedOptions, createRehabilitateOptions } = helper;

      mockRequest = {};
      fn = createReadDeletedOptions.bind(helper, { ...mockRequest });
      expect(fn, "readDeletedOptions - empty request").to.throw(
        'mongooseBread helper "createReadDeletedOptions" expects request.params.id to be set'
      );
      fn = createRehabilitateOptions.bind(helper, { ...mockRequest });
      expect(fn, "rehabilitateOptions - empty request").to.throw(
        'mongooseBread helper "createRehabilitateOptions" expects request.body to be set'
      );

      mockRequest = { params: { id: "invalid id" } };
      fn = createReadDeletedOptions.bind(helper, { ...mockRequest });
      expect(fn, "readDeletedOptions - invalid params.id").to.throw(
        'mongooseBread helper "createReadDeletedOptions" expects request.params.id to be a valid ObjectId'
      );
      fn = createRehabilitateOptions.bind(helper, { ...mockRequest });
      expect(fn, "rehabilitateOptions - invalid params.id").to.throw(
        'mongooseBread helper "createRehabilitateOptions" expects request.params.id to be a valid ObjectId'
      );

      mockRequest = { body: {} };
      fn = createReadDeletedOptions.bind(helper, { ...mockRequest });
      expect(fn, "readDeletedOptions - empty request.body").to.throw(
        'mongooseBread helper "createReadDeletedOptions" expects request.params.id to be set'
      );
      fn = createRehabilitateOptions.bind(helper, { ...mockRequest });
      expect(fn, "rehabilitateOptions - empty request.body").to.throw(
        'mongooseBread helper "createRehabilitateOptions" expects request.body._ids to be set'
      );

      mockRequest = {
        body: { _ids: "invalid type - should be array but is string" },
      };
      fn = createReadDeletedOptions.bind(helper, { ...mockRequest });
      expect(fn, "readDeletedOptions - invalid body._ids").to.throw(
        'mongooseBread helper "createReadDeletedOptions" expects request.params.id to be set'
      );
      fn = createRehabilitateOptions.bind(helper, { ...mockRequest });
      expect(fn, "rehabilitateOptions - invalid body._ids").to.throw(
        'mongooseBread helper "createRehabilitateOptions" expects request.body._ids to be an array'
      );

      mockRequest = { params: { id: "64719c5415594e6bc75b6edc" }, body: [] };
      fn = createRehabilitateOptions.bind(helper, { ...mockRequest });
      expect(
        fn,
        "rehabilitateOptions - valid params.id & body is empty Array"
      ).to.throw(
        'mongooseBread helper "createRehabilitateOptions" expects request.body to be an Object'
      );
    });

    it("parses requests with helper methods correctly", function () {
      let mockRequest = {};
      const browseDeletedOptions =
        ProductSoftDelete.breadHelper().createBrowseDeletedOptions({
          ...mockRequest,
        });
      mockRequest = { params: { id: "6470bd3ff7cfba0acb59c044" } };
      const readDeletedOptions =
        ProductSoftDelete.breadHelper().createReadDeletedOptions({
          ...mockRequest,
        });
      mockRequest = { params: { id: "6470bd3ff7cfba0acb59c044" } };
      const rehabilitateOptions =
        ProductSoftDelete.breadHelper().createRehabilitateOptions({
          ...mockRequest,
        });
      mockRequest = { body: { _ids: ["6470bd3ff7cfba0acb59c044"] } };
      const bulkRehabilitateOptions =
        ProductSoftDelete.breadHelper().createRehabilitateOptions({
          ...mockRequest,
        });

      expect(browseDeletedOptions).to.be.an.instanceOf(Object);
      expect(browseDeletedOptions).to.include.keys([
        "query",
        "paginateOptions",
      ]);
      expect(browseDeletedOptions)
        .property("paginateOptions")
        .to.include.keys(["customFind", "customCount"]);
      expect(browseDeletedOptions)
        .property("paginateOptions")
        .that.has.property("customFind")
        .to.equal("findDeleted");
      expect(browseDeletedOptions)
        .property("paginateOptions")
        .that.has.property("customCount")
        .to.equal("countDocumentsDeleted");
      expect(readDeletedOptions).to.be.an.instanceOf(Object);
      expect(readDeletedOptions).to.include.keys([
        "query",
        "select",
        "customFind",
        "customCount",
      ]);
      expect(readDeletedOptions)
        .property("customFind")
        .to.equal("findOneDeleted");
      expect(readDeletedOptions).property("customCount").to.equal(false);
      expect(rehabilitateOptions).to.be.an.instanceOf(Object);
      expect(rehabilitateOptions).to.include.keys(["query"]);
      expect(bulkRehabilitateOptions).to.be.an.instanceOf(Object);
      expect(bulkRehabilitateOptions).to.include.keys(["query", "bulk"]);
      expect(bulkRehabilitateOptions).property("bulk").to.equal(true);
    });

    it("browses a collection without query object in request", function () {
      const mockRequest = {};
      const options = ProductSoftDelete.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.browse(options).then((result) => {
        expect(result.docs).to.have.length(10);
        expect(result.pagination.totalDocs).to.equal(10);
        expect(result.pagination.limit).to.equal(10);
        expect(result.pagination.page).to.equal(1);
        expect(result.pagination.offset).to.equal(0);
        expect(result.pagination.pagingCounter).to.equal(1);
        expect(result.pagination.hasPrevPage).to.equal(false);
        expect(result.pagination.hasNextPage).to.equal(false);
        expect(result.pagination.prevPage).to.equal(null);
        expect(result.pagination.nextPage).to.equal(null);
        expect(result.pagination.totalPages).to.equal(1);
      });
    });

    it("hides an easteregg", function () {
      expect(true).to.be.true; // thank you for reading this code :)
    });

    it("browses a limited collection", function () {
      const mockRequest = { query: { limit: 5 } };
      const options = ProductSoftDelete.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.browse(options).then((result) => {
        expect(result.docs).to.have.length(5);
      });
    });

    it("selects the correct page", function () {
      const mockRequest = { query: { limit: 5, page: 2 } };
      const options = ProductSoftDelete.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.browse(options).then((result) => {
        expect(result.docs).to.have.length(5);
        expect(result.pagination.page).to.equal(2);
        expect(result.pagination.hasPrevPage).to.equal(true);
      });
    });

    it("executes a search request correctly", function () {
      const mockRequest = { query: { search: "5" } };
      const options = ProductSoftDelete.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.browse(options).then((result) => {
        expect(result.docs).to.have.length(1);
        expect(result.docs[0].name).to.equal("ProductSoftDelete #5");
      });
    });

    it("executes a search request with utf-8 chars correctly", function () {
      return ProductSoftDelete.create([
        { name: "ä" },
        { name: "ö" },
        { name: "ü" },
      ])
        .then(() => {
          const mockRequest = { query: { search: "ö" } };
          const options = ProductSoftDelete.breadHelper().createBrowseOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.browse(options);
        })
        .then((result) => {
          expect(result.docs).to.have.length(1);
          expect(result.pagination.totalDocs).to.equal(1);
        });
    });

    it("reads a document correctly", function () {
      return ProductSoftDelete.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = { params: { id: doc._id } };
          const options = ProductSoftDelete.breadHelper().createReadOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.read(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc.name).to.equal("temp");
        });
    });

    it("edits a document correctly", function () {
      return ProductSoftDelete.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = {
            params: { id: doc._id },
            body: { currency: "USD" },
          };
          const options = ProductSoftDelete.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.edit(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc.name).to.equal("temp");
          expect(doc.currency).to.equal("USD");
        });
    });

    it("edits many documents correctly", function () {
      return ProductSoftDelete.create([
        { name: "doc#1", currency: "EUR" },
        { name: "doc#2", currency: "EUR" },
      ])
        .then((docs) => {
          const ids = docs.map((d) => d._id);
          const mockRequest = {
            body: { _ids: [...ids], _docs: [{ currency: "USD" }] },
          };
          const options = ProductSoftDelete.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.edit(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(2);
          const doc0 = result.docs[0];
          expect(doc0).to.be.an.instanceOf(Object);
          expect(doc0.name).to.equal("doc#1");
          expect(doc0.currency).to.equal("USD");
          const doc1 = result.docs[1];
          expect(doc1).to.be.an.instanceOf(Object);
          expect(doc1.name).to.equal("doc#2");
          expect(doc1.currency).to.equal("USD");
        });
    });

    it("adds a document correctly", function () {
      const mockRequest = { body: { name: "temp", price: 5, currency: "USD" } };
      const options = ProductSoftDelete.breadHelper().createAddOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.add(options).then((result) => {
        expect(result).to.be.an.instanceOf(Object);
        expect(result.docs).to.be.an.instanceOf(Array);
        expect(result.docs).to.have.length(1);
        const doc = result.docs[0];
        expect(doc).to.be.an.instanceOf(Object);
        expect(doc.name).to.equal("temp");
        expect(doc.price).to.equal(5);
        expect(doc.currency).to.equal("USD");
      });
    });

    it("adds many documents correctly", function () {
      const mockRequest = {
        body: {
          _docs: [
            { name: "temp#1", price: 5, currency: "USD" },
            { name: "temp#2", price: 50, currency: "EUR" },
          ],
        },
      };
      const options = ProductSoftDelete.breadHelper().createAddOptions({
        ...mockRequest,
      });
      return ProductSoftDelete.add(options).then((result) => {
        expect(result).to.be.an.instanceOf(Object);
        expect(result).to.have.property("createdCount");
        expect(result).to.have.property("acknowledged");
        expect(result.docs).to.be.an.instanceOf(Array);
        expect(result.docs).to.have.length(2);
        const doc0 = result.docs[0];
        expect(doc0).to.be.an.instanceOf(Object);
        expect(doc0.name).to.equal("temp#1");
        expect(doc0.price).to.equal(5);
        expect(doc0.currency).to.equal("USD");
        const doc1 = result.docs[1];
        expect(doc1).to.be.an.instanceOf(Object);
        expect(doc1.name).to.equal("temp#2");
        expect(doc1.price).to.equal(50);
        expect(doc1.currency).to.equal("EUR");
      });
    });

    it("softDeletes a document correctly", function () {
      return ProductSoftDelete.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = {
            auth: { user: { _id: "647192388b1018356aab3d10" } },
            params: { id: doc._id },
          };
          const options = ProductSoftDelete.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return Promise.all([
            ProductSoftDelete.softDelete(options),
            Promise.resolve(doc),
          ]);
        })
        .then(([result, doc]) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          expect(result.acknowledged).to.equal(true);
          expect(result.modifiedCount).to.equal(1);

          const mockRequest = { params: { id: doc._id } };
          const options =
            ProductSoftDelete.breadHelper().createReadDeletedOptions({
              ...mockRequest,
            });
          return ProductSoftDelete.read(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc.deleted).to.equal(true);
          expect(doc.deletedBy.toString()).to.equal("647192388b1018356aab3d10");
        });
    });

    it("softDeletes many documents correctly", function () {
      return ProductSoftDelete.create([
        { name: "a" },
        { name: "b" },
        { name: "c" },
      ])
        .then((docs) => {
          const mockRequest = {
            auth: { user: { _id: "647192388b1018356aab3d10" } },
            body: { _ids: docs.map((d) => d._id) },
          };
          const options = ProductSoftDelete.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.softDelete(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(3);
          expect(result.acknowledged).to.equal(true);
          expect(result.modifiedCount).to.equal(3);
          const mockRequest = {
            query: { query: `{ "name": { "$in": ["a", "b", "c"] } }` },
          };
          const options =
            ProductSoftDelete.breadHelper().createBrowseDeletedOptions({
              ...mockRequest,
            });
          return ProductSoftDelete.browse(options);
        })
        .then((result) => {
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs[0].deleted).to.equal(true);
          expect(result.docs[1].deleted).to.equal(true);
          expect(result.docs[2].deleted).to.equal(true);
          expect(result.docs[0].deletedBy.toString()).to.equal(
            "647192388b1018356aab3d10"
          );
          expect(result.docs[1].deletedBy.toString()).to.equal(
            "647192388b1018356aab3d10"
          );
          expect(result.docs[2].deletedBy.toString()).to.equal(
            "647192388b1018356aab3d10"
          );
        });
    });

    it("destroys a softDeleted document correctly", function () {
      return ProductSoftDelete.create({ name: "temp", deleted: true })
        .then((doc) => {
          const mockRequest = {
            auth: { user: { _id: "647192388b1018356aab3d10" } },
            params: { id: doc._id },
          };
          const options = ProductSoftDelete.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return Promise.all([
            ProductSoftDelete.destroy(options),
            Promise.resolve(doc),
          ]);
        })
        .then(([result, doc]) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.acknowledged).to.equal(true);
          expect(result.deletedCount).to.equal(1);
          return ProductSoftDelete.findById(doc._id);
        })
        .then((doc) => {
          expect(doc).to.be.null;
        });
    });

    it("destroys many softDeleted documents correctly", function () {
      return ProductSoftDelete.create([
        { name: "a", deleted: true },
        { name: "b", deleted: true },
        { name: "c", deleted: true },
      ])
        .then((docs) => {
          const mockRequest = {
            auth: { user: { _id: "647192388b1018356aab3d10" } },
            body: { _ids: docs.map((d) => d._id) },
          };
          const options = ProductSoftDelete.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.destroy(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.acknowledged).to.equal(true);
          expect(result.deletedCount).to.equal(3);
        });
    });

    it("rehabilitates a softDeleted document correctly", function () {
      return ProductSoftDelete.create({ name: "temp", deleted: true })
        .then((doc) => {
          const mockRequest = { params: { id: doc._id } };
          const options =
            ProductSoftDelete.breadHelper().createRehabilitateOptions({
              ...mockRequest,
            });
          return Promise.all([
            ProductSoftDelete.rehabilitate(options),
            Promise.resolve(doc),
          ]);
        })
        .then(([result, _doc]) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          expect(result.modifiedCount).to.equal(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc._id.toString()).to.equal(_doc._id.toString());
        });
    });

    it("rehabilitates many softDeleted documents correctly", function () {
      return ProductSoftDelete.create([
        { name: "a", deleted: true },
        { name: "b", deleted: true },
        { name: "c", deleted: true },
      ])
        .then((docs) => {
          const mockRequest = { body: { _ids: docs.map((d) => d._id) } };
          const options =
            ProductSoftDelete.breadHelper().createRehabilitateOptions({
              ...mockRequest,
            });
          return Promise.all([
            ProductSoftDelete.rehabilitate(options),
            Promise.resolve(docs),
          ]);
        })
        .then(([result, _docs]) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(3);
          expect(result.modifiedCount).to.equal(3);
          const _doc = _docs[0];
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc._id.toString()).to.equal(_doc._id.toString());
        });
    });

    it("prevents destruction of a document that has not been softDeleted before", function () {
      return ProductSoftDelete.create({ name: "temp", deleted: false })
        .then((doc) => {
          const mockRequest = {
            auth: { user: { _id: "647192388b1018356aab3d10" } },
            params: { id: doc._id },
          };
          const options = ProductSoftDelete.breadHelper().createDeleteOptions({
            ...mockRequest,
          });
          return ProductSoftDelete.destroy(options);
        })
        .catch((error) => {
          expect(error).to.be.an.instanceOf(MongooseBreadError);
          expect(error.message).not.to.equal(null);
          expect(error.details).not.to.equal(null);
          expect(error.statusCode).not.to.equal(null);
          expect(error.result).not.to.equal(null);
        });
    });
  }); // end with softDelete

  describe("without softDelete", function () {
    it("adds plugin methods to Model", function () {
      expect(Product.browse).to.be.an.instanceOf(Function);
      expect(Product.read).to.be.an.instanceOf(Function);
      expect(Product.edit).to.be.an.instanceOf(Function);
      expect(Product.add).to.be.an.instanceOf(Function);
      expect(Product.destroy).to.be.an.instanceOf(Function);
    });

    it("adds plugin helper getter method to Model", function () {
      expect(Product.breadHelper).to.be.an.instanceOf(Function);
    });

    it("adds plugin helper methods to Model via helper getter", function () {
      expect(Product.breadHelper().createBrowseOptions).to.be.an.instanceOf(
        Function
      );
      expect(Product.breadHelper().createReadOptions).to.be.an.instanceOf(
        Function
      );
      expect(Product.breadHelper().createEditOptions).to.be.an.instanceOf(
        Function
      );
      expect(Product.breadHelper().createAddOptions).to.be.an.instanceOf(
        Function
      );
      expect(Product.breadHelper().createDeleteOptions).to.be.an.instanceOf(
        Function
      );
    });

    it("leaves the dependency methods intact", function () {
      expect(Product.paginate).to.be.an.instanceOf(Function);
    });

    it("does not add softDelete methods to Model", function () {
      expect(Product.softDelete).to.equal(undefined);
      expect(Product.rehabilitate).to.equal(undefined);
      expect(Product.softDelete).to.equal(undefined);
      expect(Product.softDelete).to.equal(undefined);
    });

    it("does not add softDelete plugin helper methods to Model via helper getter", function () {
      expect(Product.breadHelper().createBrowseDeletedOptions).to.equal(
        undefined
      );
      expect(Product.breadHelper().createReadDeletedOptions).to.equal(
        undefined
      );
      expect(Product.breadHelper().createRehabilitateOptions).to.equal(
        undefined
      );
    });

    it("throws Error if invalid request is passed to helper methods", function () {
      let mockRequest, fn;
      const helper = Product.breadHelper();

      const { createReadOptions, createEditOptions, createDeleteOptions } =
        helper;

      mockRequest = {};
      fn = createReadOptions.bind(helper, { ...mockRequest });
      expect(fn, "readOptions - empty request").to.throw(
        'mongooseBread helper "createReadOptions" expects request.params.id to be set'
      );
      fn = createEditOptions.bind(helper, { ...mockRequest });
      expect(fn, "editOptions - empty request").to.throw(
        'mongooseBread helper "createEditOptions" expects request.body to be set'
      );
      fn = createDeleteOptions.bind(helper, { ...mockRequest });
      expect(fn, "deleteOptions - empty request").to.throw(
        'mongooseBread helper "createDeleteOptions" expects request.body to be set'
      );

      mockRequest = { params: { id: "invalid id" } };
      fn = createReadOptions.bind(helper, { ...mockRequest });
      expect(fn, "readOptions - invalid params.id").to.throw(
        'mongooseBread helper "createReadOptions" expects request.params.id to be a valid ObjectId'
      );
      fn = createEditOptions.bind(helper, { ...mockRequest });
      expect(fn, "editOptions - invalid params.id").to.throw(
        'mongooseBread helper "createEditOptions" expects request.params.id to be a valid ObjectId'
      );
      fn = createDeleteOptions.bind(helper, { ...mockRequest });
      expect(fn, "deleteOptions - invalid params.id").to.throw(
        'mongooseBread helper "createDeleteOptions" expects request.params.id to be a valid ObjectId'
      );

      mockRequest = { body: {} };
      fn = createReadOptions.bind(helper, { ...mockRequest });
      expect(fn, "readOptions - empty request.body").to.throw(
        'mongooseBread helper "createReadOptions" expects request.params.id to be set'
      );
      fn = createEditOptions.bind(helper, { ...mockRequest });
      expect(fn, "editOptions - empty request.body").to.throw(
        'mongooseBread helper "createEditOptions" expects request.body._ids to be set'
      );
      fn = createDeleteOptions.bind(helper, { ...mockRequest });
      expect(fn, "deleteOptions - empty request.body").to.throw(
        'mongooseBread helper "createDeleteOptions" expects request.body._ids to be set'
      );

      mockRequest = {
        body: { _ids: "invalid type - should be array but is string" },
      };
      fn = createReadOptions.bind(helper, { ...mockRequest });
      expect(fn, "readOptions - invalid body._ids").to.throw(
        'mongooseBread helper "createReadOptions" expects request.params.id to be set'
      );
      fn = createEditOptions.bind(helper, { ...mockRequest });
      expect(fn, "editOptions - invalid body._ids").to.throw(
        'mongooseBread helper "createEditOptions" expects request.body._ids to be an array'
      );
      fn = createDeleteOptions.bind(helper, { ...mockRequest });
      expect(fn, "deleteOptions - invalid body._ids").to.throw(
        'mongooseBread helper "createDeleteOptions" expects request.body._ids to be an array'
      );

      mockRequest = { params: { id: "64719c5415594e6bc75b6edc" }, body: [] };
      fn = createEditOptions.bind(helper, { ...mockRequest });
      expect(
        fn,
        "editOptions - valid params.id & body is empty Array"
      ).to.throw(
        'mongooseBread helper "createEditOptions" expects request.body to be an Object'
      );
      fn = createDeleteOptions.bind(helper, { ...mockRequest });
      expect(
        fn,
        "deleteOptions - valid params.id & body is empty Array"
      ).to.throw(
        'mongooseBread helper "createDeleteOptions" expects request.body to be an Object'
      );
    });

    it("parses requests with helper methods correctly", function () {
      let mockRequest = {};
      const browseOptions = Product.breadHelper().createBrowseOptions({
        ...mockRequest,
      });
      mockRequest = { params: { id: "6470bd3ff7cfba0acb59c044" } };
      const readOptions = Product.breadHelper().createReadOptions({
        ...mockRequest,
      });
      mockRequest = {
        params: { id: "6470bd3ff7cfba0acb59c044" },
        body: { price: 1 },
      };
      const editOptions = Product.breadHelper().createEditOptions({
        ...mockRequest,
      });
      mockRequest = { body: { price: 1 } };
      const addOptions = Product.breadHelper().createAddOptions({
        ...mockRequest,
      });
      mockRequest = { params: { id: "6470bd3ff7cfba0acb59c044" } };
      const deleteOptions = Product.breadHelper().createDeleteOptions({
        ...mockRequest,
      });
      mockRequest = {
        body: {
          _ids: ["6470bd3ff7cfba0acb59c044"],
          _docs: [{ price: 1 }, { price: 100 }],
        },
      };
      const bulkEditOptions = Product.breadHelper().createEditOptions({
        ...mockRequest,
      });
      mockRequest = { body: { _ids: ["6470bd3ff7cfba0acb59c044"] } };
      const bulkDeleteOptions = Product.breadHelper().createDeleteOptions({
        ...mockRequest,
      });
      mockRequest = { body: { _docs: [{ price: 1 }, { price: 100 }] } };
      const bulkAddOptions = Product.breadHelper().createAddOptions({
        ...mockRequest,
      });

      expect(browseOptions).to.be.an.instanceOf(Object);
      expect(browseOptions).to.include.keys(["query", "paginateOptions"]);
      expect(readOptions).to.be.an.instanceOf(Object);
      expect(readOptions).to.include.keys(["query", "select", "customFind"]);
      expect(editOptions).to.be.an.instanceOf(Object);
      expect(editOptions).to.include.keys(["query", "payload"]);
      expect(addOptions).to.be.an.instanceOf(Object);
      expect(addOptions).to.include.keys(["payload"]);
      expect(deleteOptions).to.be.an.instanceOf(Object);
      expect(deleteOptions).to.include.keys(["query", "userId"]);
      expect(deleteOptions).property("userId").to.equal(null);

      expect(bulkEditOptions).to.be.an.instanceOf(Object);
      expect(bulkEditOptions).to.include.keys(["bulk", "payload", "query"]);
      expect(bulkEditOptions).property("bulk").to.equal(true);
      expect(bulkEditOptions).property("payload").to.have.keys(["price"]);
      expect(bulkEditOptions)
        .property("payload")
        .to.be.an.instanceOf(Object)
        .with.property("price")
        .which.equals(100);

      expect(bulkAddOptions).to.be.an.instanceOf(Object);
      expect(bulkAddOptions).to.include.keys(["bulk", "payload"]);
      expect(bulkAddOptions).property("bulk").to.equal(true);
      expect(bulkAddOptions)
        .property("payload")
        .to.be.an.instanceOf(Array)
        .with.length(2)
        .to.have.deep.members([{ price: 1 }, { price: 100 }]);

      expect(bulkDeleteOptions).to.include.keys(["bulk", "query", "userId"]);
      expect(bulkDeleteOptions).to.be.an.instanceOf(Object);
      expect(bulkDeleteOptions).property("userId").to.equal(null);
      expect(bulkDeleteOptions).property("bulk").to.equal(true);
    });
  }); // end without softDelete

  describe("with transaction", function () {
    it("edits a document correctly", function () {
      return ProductTransaction.create({ name: "temp" })
        .then((doc) => {
          const mockRequest = {
            params: { id: doc._id },
            body: { currency: "USD" },
          };
          const options = ProductTransaction.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductTransaction.edit(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(1);
          const doc = result.docs[0];
          expect(doc).to.be.an.instanceOf(Object);
          expect(doc.name).to.equal("temp");
          expect(doc.currency).to.equal("USD");
        });
    });

    it("edits many documents correctly", function () {
      return ProductTransaction.create([
        { name: "doc#1", currency: "EUR" },
        { name: "doc#2", currency: "EUR" },
      ])
        .then((docs) => {
          const ids = docs.map((d) => d._id);
          const mockRequest = {
            body: { _ids: [...ids], _docs: [{ currency: "USD" }] },
          };
          const options = ProductTransaction.breadHelper().createEditOptions({
            ...mockRequest,
          });
          return ProductTransaction.edit(options);
        })
        .then((result) => {
          expect(result).to.be.an.instanceOf(Object);
          expect(result.docs).to.be.an.instanceOf(Array);
          expect(result.docs).to.have.length(2);
          const doc0 = result.docs[0];
          expect(doc0).to.be.an.instanceOf(Object);
          expect(doc0.name).to.equal("doc#1");
          expect(doc0.currency).to.equal("USD");
          const doc1 = result.docs[1];
          expect(doc1).to.be.an.instanceOf(Object);
          expect(doc1.name).to.equal("doc#2");
          expect(doc1.currency).to.equal("USD");
        });
    });
  }); // end with transaction

  describe("with AtlasSearch enabled", function () {
    it("falls back to regex search query if wrongly configured", function () {
      return new Promise((resolve) => {
        const mockRequest = { query: { search: "5" } };
        const options =
          ProductAtlasSearchWrongConfig.breadHelper().createBrowseOptions({
            ...mockRequest,
          });
        resolve(options);
      }).then((result) => {
        expect(result).to.be.an.instanceOf(Object);
        expect(result.query).to.be.an.instanceOf(Object);
        expect(result.query).to.have.keys(["$or"]);
        expect(result.query.$or).to.be.an.instanceOf(Array);
        expect(result.query.$or[0]).to.be.an.instanceOf(Object);
        expect(result.query.$or[0])
          .to.have.property("name")
          .with.keys(["$regex", "$options"]);
      });
    });

    it("creates a $search query", function () {
      return new Promise((resolve) => {
        const mockRequest = { query: { search: "5" } };
        const options = ProductAtlasSearch.breadHelper().createBrowseOptions({
          ...mockRequest,
        });
        resolve(options);
      }).then((result) => {
        expect(result).to.be.an.instanceOf(Object);
        expect(result.query).to.be.an.instanceOf(Object);
        expect(result.query).to.have.keys(["$search"]);
        expect(result.query)
          .to.have.property("$search")
          .with.keys(["index", "text"]);
        expect(result.query.$search.index).to.equal("fulltexttest");
      });
    });

    it("throws an error in test enviroment", function () {
      return ProductAtlasSearch.create({ name: "temp" })
        .then(() => {
          const options = ProductAtlasSearch.breadHelper().createBrowseOptions({
            query: { search: "5" },
          });

          return ProductAtlasSearch.browse(options);
        })
        .catch((err) => {
          expect(err.toString().startsWith("MongoServerError:")).to.be.true;
        });
    });
  }); // end Atlas Search

  after(function (done) {
    mongoose.connection.db.dropDatabase(() => mongoose.disconnect(done));
  });
});
