## Usage

Consider the following Project structure

```
📂 root
┣ 📂 Controller
┃ ┗ ProductController.js
┣ 📂 Models
┃ ┗ Product.js
┣ 📂 Routes
┃ ┗ ProductRoutes.js
┗ server.js
```

Add plugin to a schema

```js
/** Models/Product.js **/

const mongoose = require("mongoose");
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
  /* your mongooseBread options */
  // maxPageSize: 100,
  // defaultPageSize: 10,
  searchableFields: ["name", "currency"],
  // blacklistedFields: ['__v', 'deleted', 'createdAt', 'updatedAt'],
  // softDelete: true,
});

module.exports = mongoose.model("Product", productSchema);
```

Use plugin methods in Controller

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
};
```

Setup Routes

```js
/** Routes/ProductRoutes.js **/

const express = require("express");
const ProductController = require("../Controller/ProductController");
const router = express.Router();

router.use(/* your auth middleware */);
router.use(/* your permission middleware */);
router.get("/", ProductController.browse);

module.exports = router;
```

Register Routes

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

## Advanced Usage

### Prevent certain fields to be passed

By default this plugin allows a custom query to be passed via request.query as JSON string.  
`api.example.com/products?query="{"protection":"disable"}"`  
This can be harmfull if used by users without admin privileges  
To disable this functionality remove the `request.query.query` key

via middleware `Routes/ProductRoutes.js`

```js
const sanitizeBreadRequest = (req, res, next) => {
  delete req.query.sort;
  delete req.query.query;
  delete req.query.projection;
  //...
  next();
}

router.get(
  "/",
  sanitizeBreadRequest,
  ProductController.browse
);
```

or in the Controller before helper call `Controller/ProductController.js`

```js
const Product = require("../Models/Product");

module.exports = {
  browse: catchAsync(async (req, res, next) => {

    delete req.query.sort;
    delete req.query.query;
    delete req.query.projection;
    //...

    const options = Product.breadHelper().createBrowseOptions(req);
    const result = await Product.browse(options);

    res.status(200).json({
      message: req.query.search ? "search" : "browse",
      result,
    });
  }),
};
```
