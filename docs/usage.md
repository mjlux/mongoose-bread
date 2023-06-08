# Usage

This documentation shows a minimal project setup to understand how to utilize mongoose-bread

## Project Structure

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

## Global Plugin Options

For all options see: [Options Documentation](./options.md)

Setup Global Plugin Options `server.js`

```js
const { mongooseBread } = require("mongoose-bread")
mongooseBread.options = {
  /* your global mongooseBread options */
  defaultPageSize: 20, // default: 10
  maxPageSize: 50, // default: 100
  paramsIdKey: "productId", // default: id
  bulkIdsKey: "_changeManyIds", // default: '_ids'
  bulkDocsKey: "_changeManyDocs", // default: _docs
  allowDiskUse: true, // default: false
  customLabels: { // optional - set custom keys for results
    docs: "documents", // default: 'docs'
    meta: "myPaginationData", // default: 'pagination'
    limit: "maxResultSize", // default: 'limit'
    page: "page", // default: 'page'
    pagingCounter: "currentPageFirstDocumentStartIndex", // default: 'pagingCounter'
    hasNextPage: "nextPageAvailable", // default: 'hasNextPage'
    hasPrevPage: "previousPageAvailable", // default: 'hasPrevPage'
    nextPage: "nextPageNumber", // default: 'nextPage'
    prevPage: "previousPageNumber", // default: 'prevPage'
    totalDocs: "documentsTotal", // default: 'totalDocs'
    totalPages: "pagesTotal", // default: 'totalPages'
    acknowledged: "success", // default: 'acknowledged'
    modifiedCount: "modifiedDocumentsAmount", // default: 'modifiedCount'
    deletedCount: "deletedDocumentsAmount", // default: 'deletedCount'
    createdCount: "createdDocumentsAmount", // default: 'createdCount'
    readCount: "readDocumentsAmount", // default: 'readCount'
  },
}
```

> The customLabels properties set the keys of [returned values](./returnvalues.md) accordingly

## Schema Options

For all options see: [Options Documentation](./options.md)

Setup Options when adding mongoose-bread plugin to a schema `Models/Product.js`

> This overrides the Global Options for productSchema

```js
const mongoose = require("mongoose")
const mongooseBread = require("mongoose-bread")

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    currency: String,
  },
  { timestamps: true }
)

productSchema.plugin(mongooseBread, {
  /* your mongooseBread options */
  defaultPageSize: 10,
  maxPageSize: 100,
  searchableFields: ["name", "currency"],
  blacklistedFields: ['__v', 'deleted', 'createdAt', 'updatedAt'],
  softDelete: true,
})

module.exports = mongoose.model("Product", productSchema)
```

## Controller

Use plugin methods in Controller `Controller/ProductController.js`

```js
const Product = require("../Models/Product")
const breadHelper = Product.breadHelper()

const { catchAsync } = require("../my/utils/library")

const browseProducts = catchAsync(async (req, res, next) => {
    const options = breadHelper.createBrowseOptions(req)
    const result = await Product.browse(options)

    res.status(200).json({
      message: req.query.search ? "search" : "browse",
      result,
    })
})

module.exports = { browseProducts }
```

For examples of all available methods and their respective output see: [Return Values Documentation](./returnvalues.md)

### catchAsync 

This is a simple function wrapper to pass all Errors to the global Error Handler in `server.js`.  
This avoids to use try catch blocks in all Controller methods.

```js
function catchAsync(fn) {
  return (req, res, next) => { fn(req, res, next).catch(next) }
}
```

## Routes

The following example applies for Schemas with softDelete enabled

Setup Routes `Routes/ProductRoutes.js`

```js
// imports

router.use( /* your auth middleware */ )
router.use( /* your permission middleware */ )

router.get(    '/bin/:id', /* middleware */, ProductController.readDeleted)
router.patch(  '/bin/:id', /* middleware */, ProductController.rehabilitate)
router.delete( '/bin/:id', /* middleware */, ProductController.destroy)
router.get(    '/bin',     /* middleware */, ProductController.browseDeleted)
router.patch(  '/bin',     /* middleware */, ProductController.rehabilitate)
router.delete( '/bin',     /* middleware */, ProductController.destroy)
router.get(    '/:id',     /* middleware */, ProductController.read)
router.patch(  '/:id',     /* middleware */, ProductController.edit)
router.delete( '/:id',     /* middleware */, ProductController.softDelete)
router.get(    '/',        /* middleware */, ProductController.browseProducts)
router.patch(  '/',        /* middleware */, ProductController.edit)
router.delete( '/',        /* middleware */, ProductController.softDelete)
router.post(   '/',        /* middleware */, ProductController.add)

module.exports = router
```

Register Routes `server.js`

```js
// imports

const app = express()
app.use(bodyParser.json()) // recommended package "body-parser"
app.use("/api/v1/products", ProductRoutes)
```

## Error Handling

If something goes wrong, i.e. An invalid ObjectId is passed to the breadHelper or the requested Query does not yield proper results, then mongoose-bread will throw a `MongooseBreadError`

This makes detection of the Error type in the global Error Handler quite convient

Handle MongooseBreadError `server.js`

```js
// app setup

app.use((error, req, res, next) => {

  if (error instanceof MongooseBreadError) {

    // logger info
    const { details, issuer } = error
    console.log( details, issuer )

    // error details provided by mongooseBreadError
    return res.status( error.statusCode ).json({
      message: error.message,
      status: error.statusCode,
      result: error.result,
    }) 
    
  }

  // generic error response
  return res.status(500).json({
    message: 'Something went wrong',
    status: 500,
    result: null
  })    

})
```

Example MongooseBreadError if searchableFields is an empty Array and `request.query.search` is set

```js
{
  message: 'Search is not availabe for this resource',
  details: 'To enable search provide an "searchableFields" Array to the plugin registration options',
  issuer: 'MongooseBreadHelper parseSearchFilter',
  statusCode: 404,
  result: {}
}
```


## Advanced Usage

### Prevent certain fields to be passed

By default this plugin allows a custom query to be passed via request.query as JSON string.  
`api.example.com/products?query="{"protection":"disable"}"`  
This can be harmfull if used by users without admin privileges  
To disable this functionality remove the `request.query.query` key

* via middleware (recommended) `Routes/ProductRoutes.js`

```js
const sanitizeBreadRequestMiddleware = (req, res, next) => {
  delete req.query.sort
  delete req.query.query
  delete req.query.projection
  //...
  next()
}

router.get(
  "/",
  sanitizeBreadRequestMiddleware,
  ProductController.browse
)
```

* or in the Controller before helper call `Controller/ProductController.js`

```js
const Product = require("../Models/Product")

module.exports = {
  browse: catchAsync(async (req, res, next) => {

    delete req.query.sort
    delete req.query.query
    delete req.query.projection
    //...

    const options = Product.breadHelper().createBrowseOptions(req)
    const result = await Product.browse(options)

    res.status(200).json({
      message: req.query.search ? "search" : "browse",
      result,
    })
  }),
}
```

For all options see: [Options Documentation](./options.md)
