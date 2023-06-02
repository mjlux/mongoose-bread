# mongoose-bread

A pagination and softdelete library for [Mongoose](http://mongoosejs.com).

## Why This Plugin

mongoose-bread is a pagination and softdelete library for quick feature-rich setup of JSON apis.
This plugin abstracts the complex task of setting up paramterized collection queries by applying the
**BREAD** convention as Resource methods. So you can **B**rowse **R**ead **E**dit **A**dd and **D**estroy a resource by calling the respective method. It creates consistent query results and makes data consumption a lot more predictable. It concerns itself only with the data access layer of your application, for data analysis and post-query mutations implement a service layer as you see fit.

## Dependencies

mongoose-bread is build upon

- mongoose-paginate-v2 for pagination  
  [mongoose-paginate-v2](https://github.com/aravindnc/mongoose-paginate-v2)
  [![npm version](https://img.shields.io/npm/v/mongoose-paginate-v2.svg)](https://www.npmjs.com/package/mongoose-paginate-v2)
  [![Build Status](https://travis-ci.com/aravindnc/mongoose-paginate-v2.svg?branch=master)](https://travis-ci.com/aravindnc/mongoose-paginate-v2)
  [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/aravindnc/mongoose-paginate-v2/issues)
  [![Downloads](https://img.shields.io/npm/dm/mongoose-paginate-v2.svg)](https://img.shields.io/npm/dm/mongoose-paginate-v2.svg)
  [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Faravindnc%2Fmongoose-paginate-v2.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Faravindnc%2Fmongoose-paginate-v2?ref=badge_shield)

- mongoose-delete for soft deletes  
  [mongoose-delete](https://github.com/dsanel/mongoose-delete)
  [![Build Status](https://github.com/dsanel/mongoose-delete/workflows/Test/badge.svg)](https://github.com/dsanel/mongoose-delete/actions/workflows/test.yml)

## Recommended Packages

mongoose-bread recommends the use of the following package(s)

- For easy parsing of json requests  
  [body-parser](https://github.com/expressjs/body-parser)

## Installation

```sh
npm install mongoose-bread
```

## Quick Use

```js
/** server.js **/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongooseBread = require("mongoose-bread");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);
productSchema.plugin(mongooseBread, {
  searchableFields: ["name", "currency"],
});
mongoose.model("Product", productSchema);

const app = express();
const port = 3000;

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");

  app.use(bodyParser.json());

  app.get("/api/v1/products", async (req, res, next) => {
    try {
      const options = Product.breadHelper().createBrowseOptions(req);
      const result = await Product.browse(options);
      res.status(200).json({
        message: req.query.search ? "search" : "browse",
        result,
      });
    } catch (error) {
      next(error);
    }
  });

  // fetch all 404 requests
  app.all("*", (req, res, next) => {
    const error = new Error("not found");
    error.statusCode = 404;
    next(error);
  });

  // global error handler
  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
      message: err.message || "Something went wrong",
      status: err.statusCode || 500,
      result: null,
    });
    next();
  });

  // run server
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main().catch((err) => console.error(err));
```

## Options

Set global options

```js
/** server.js **/

/* your imports */

const { mongooseBread } = require("mongoose-bread");
mongooseBread.options = {
  /* your global mongooseBread options */
};

/* your server code */
```

Set Schema options - overrides global options

```js
/** Models/Product.js **/

/* your Schema setup */

productSchema.plugin(mongooseBread, {
  /* your Product mongooseBread options */
});

/* your Model setup */
```

```js
/** Controller/ProductController.js **/

const Product = require("../Models/Product");

// helper function
function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports = {
  browse: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createBrowseOptions(req);
    const result = await Product.browse(options);
    res.status(200).json({
      message: req.query.search ? "search" : "browse",
      result,
    });
  }),
  browseDeleted: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createBrowseDeletedOptions(req);
    const result = await Product.browse(options);
    res.status(200).json({
      message: req.query.search ? "searchDeleted" : "browseDeleted",
      result,
    });
  }),
  read: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createReadOptions(req);
    const result = await Product.read(options);
    res.status(200).json({ message: "read", result });
  }),
  readDeleted: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createReadDeletedOptions(req);
    const result = await Product.read(options);
    res.status(200).json({ message: "readDeleted", result });
  }),
  edit: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createEditOptions(req);
    const result = await Product.edit(options);
    res.status(200).json({ message: "edit", result });
  }),
  add: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createAddOptions(req);
    const result = await Product.add(options);
    res.status(200).json({ message: "add", result });
  }),
  softDelete: catchAsync(async (req, res, next) => {
    const result = await Product.softDelete(req.params.id);
    res.status(200).json({ message: "softDelete", result });
  }),
  hardDelete: catchAsync(async (req, res, next) => {
    const result = await Product.hardDelete(req.params.id);
    res.status(200).json({ message: "hardDelete", result });
  }),
  softDeleteMany: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createDeleteOptions(req);
    const result = await Product.softDeleteMany(options);
    res.status(200).json({ message: "softDeleteMany", result });
  }),
  hardDeleteMany: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createDeleteOptions(req);
    const result = await Product.hardDeleteMany(options);
    res.status(200).json({ message: "hardDeleteMany", result });
  }),
  rehabilitate: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createRehabilitateOptions(req);
    const result = await Product.rehabilitate(options);
    res.status(200).json({ message: "rehabilitate", result });
  }),
  rehabilitateMany: catchAsync(async (req, res, next) => {
    const options = Product.breadHelper().createRehabilitateOptions(req);
    const result = await Product.rehabilitateMany(options);
    res.status(200).json({ message: "rehabilitateMany", result });
  }),
};
```

```js
/** Routes/ProductRoutes.js **/

const express = require("express");
const ProductController = require("../Controller/ProductController");
const router = express.Router();

router.use(/* your auth middleware */);
router.use(/* your permission middleware */);

router.get("/bin/:id", /* middleware */ ProductController.readDeleted);
router.patch("/bin/:id", /* middleware */ ProductController.rehabilitate);
router.delete("/bin/:id", /* middleware */ ProductController.destroy);
router.get("/bin", /* middleware */ ProductController.browseDeleted);
router.patch("/bin", /* middleware */ ProductController.rehabilitate);
router.delete("/bin", /* middleware */ ProductController.destroy);
router.get("/:id", /* middleware */ ProductController.read);
router.patch("/:id", /* middleware */ ProductController.edit);
router.delete("/:id", /* middleware */ ProductController.softDelete);
router.get("/", /* middleware */ ProductController.browse);
router.patch("/", /* middleware */ ProductController.edit);
router.delete("/", /* middleware */ ProductController.softDelete);
router.post("/", /* middleware */ ProductController.add);

module.exports = router;
```

```js
/** server.js **/

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ProductRoutes = require("./Routes/ProductRoutes");
const { mongooseBread } = require("mongoose-bread");
mongooseBread.options = {
  /* your global mongooseBread options */
};

const app = express();
const port = 3000;

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");

  app.use(bodyParser.json());
  app.use("/api/v1/products", ProductRoutes);
  app.all("*", (req, res, next) => {
    const error = new Error("not found");
    error.statusCode = 404;
    next(error);
  });
  app.use((err, req, res, next) => {
    console.error(util.inspect(err, false, null, true));
    res.status(err.statusCode || 500).json({
      message: err.message || "Something went wrong",
      status: err.statusCode || 500,
      result: null,
    });
    next();
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main().catch((err) => console.error(err));
```

Frontend

```js
async function xxx() {
  const response = await fetch("api.example.org/users", { method: GET });
  const json = await response.json();
}

async function xxx() {
  const response = await fetch(
    "api.example.org/users/647100d55232ea5c4b16e33d",
    { method: GET }
  );
  const json = await response.json();
}

async function xxx() {
  const response = await fetch("api.example.org/users/bin", { method: GET });
  const json = await response.json();
}

async function xxx() {
  const response = await fetch(
    "api.example.org/users/bin/647100d55232ea5c4b16e33d",
    { method: GET }
  );
  const json = await response.json();
}
```

## Advanced Usage

### Prevent certain fields to be passed

By default this plugin allows a custom query to be passed via request.query as JSON string.  
api.example.com/products?query="{"protection":"disable"}"  
This can be harmfull if used by users without admin privileges  
To disable this functionality remove the request.query.query key via middleware before the Controller

```js
/** Routes/ProductRoutes.js **/

router.get(
  "/",
  (req, res, next) => {
    delete req.query.sort;
    delete req.query.query;
    delete req.query.projection;
    //...
    next();
  },
  ProductController.browse
);
```

### Sample Usage

### With custom return labels

Now developers can specify the return field names if they want. Below are the list of attributes whose name can be changed.

- totalDocs
- docs
- limit
- page
- nextPage
- prevPage
- hasNextPage
- hasPrevPage
- totalPages
- pagingCounter
- meta

You should pass the names of the properties you wish to changes using `customLabels` object in options.
Set the property to false to remove it from the result.
Same query with custom labels

```javascript
const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "itemsList",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};
```

### Use helper-class for passing query object into Model.paginate()

#### Zero limit

You can use `limit=0` to get only metadata:

#### Set custom default options for all queries

config.js:

```javascript
var mongoosePaginate = require("mongoose-paginate-v2");

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 20,
};
```

#### Fetch all docs without pagination

If you need to fetch all the documents in the collection without applying a limit. Then set `pagination` as false,

### Pagination for Sub-Documents

Inherited from mongoose-paginate-v2 but not used by mongoose-bread so far  
If you want to paginate your sub-documents, here is the method you can use.

```js
var query = { name: "John" };
var option = {
  select: "name follower",
  pagingOptions: {
    // your populate option
    populate: {
      path: "follower",
    },
    page: 2,
    limit: 10,
  },
};

// Only one document (which object key with name John) will be return
const result = await Book.paginateSubDocs(query, option);
```

#### AllowDiskUse for large datasets

Sets the allowDiskUse option, which allows the MongoDB server to use more than 100 MB for query. This option can let you work around `QueryExceededMemoryLimitNoDiskUseAllowed` errors from the MongoDB server.

**Note that this option requires MongoDB server >= 4.4. Setting this option is a no-op for MongoDB 4.2 and earlier.**

```js
const options = {
  limit: 10,
  page: 1,
  allowDiskUse: true,
};

Model.paginate({}, options, function (err, result) {
  // Result
});
```

Below are some references to understand more about preferences,

- <https://github.com/Automattic/mongoose/blob/master/lib/query.js#L1008>
- <https://docs.mongodb.com/manual/core/read-preference/>
- <http://mongodb.github.io/node-mongodb-native/driver-articles/anintroductionto1_1and2_2.html#read-preferences>

## Known Issues

### For Mongoose < 6.0.0

There are few operators that this plugin does not support natively, below are the list and suggested replacements.

- $where: $expr
- $near: $geoWithin with \$center
- $nearSphere: $geoWithin with \$centerSphere

But we have added another option. So if you need to use $near and $nearSphere please set `forceCountFn` as true and try running the query.

```js
const options = {
  lean: true,
  limit: 10,
  page: 1,
  forceCountFn: true,
};

Model.paginate({}, options, function (err, result) {
  // Result
});
```

### For Mongoose > 6.0.0

$geoNear, $near, and $nearSphere may not work (Untested). This will be updated in the future plugin versions.

## Development

- Ensure all tests pass before you commit by running `npm run test`. In order to run the tests, you need to have the Mongo Deamon running locally.
- There are pre-commit hooks that run to ensure the _files you've changed_ are formatted correctly.
- Optionally you can manually run `npm run lint && npm run prettier` to lint and format every relevant file
- If using VS Code, install eslint and prettier for easy editor integration.

## Changelog

[View Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
