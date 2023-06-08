# bread snippets

## Setup

If your are using VSCode you'll find some handy shortcuts through the use of snippets.  
So mongoose-bread provides them for your convience (and mine) too.  
Just add the file "bread.code-snippets" in `.vscode/bread.code-snippets` to your own `.vscode` folder.  
If you don't have one yet - it belongs in the root of your project.

## But why not make an extension out of it?

Every project has its own needs and setups, so providing a extension to write the shortcuts for everyone seems like an impossible task. The idea behind these snippets is to give you a quick setup so you can play with mongoose-bread faster. After that tailor the snippets to your needs. You can even put the `.vscode` folder in your repo and make setups for everyone on your team consistent.

## Usage

To use the snippets just type "bread" (maybe hit <kbd>CMD</kbd> | <kbd>CTRL</kbd> + <kbd>Space</kbd>) in any `javascript` or `typescript` file, then select the one you need.  

These snippets are provided.

- global Options
- Router
- softDelete Router
- Model
- softDelete Model
- Controller
- softDelete Controller

For everyone who is not using VSCode, here is the output of all the snippets:  

## global Options

```javascript
/* use in server|main|index.js */

// set global mongoose-bread options
const { mongooseBread } = require('mongoose-bread')
mongooseBread.options = {
    defaultPageSize: 10, // limits queries to return 10 documents - default: 10
    maxPageSize: 100, // limits queries to return 100 documents max - default: 100
    paramsIdKey: 'id', // expected request.params.id to identify a single Resource - default: id
    // i.e. https://test.org/books/6478d57784fabdbf127d0a2a
    // => router.get(books/:id, BookController.read)
    // => request.params.id = 6478d57784fabdbf127d0a2a

    bulkIdsKey: '_ids', // expected request.body._ids - default: '_ids'
    // Used for bulk edit|add|destroy|softDelete|rehabilitate 

    bulkDocsKey: '_docs', // expected request.body._docs with Array<any> - default: _docs
    // Used for bulk|edit|add
    // => request.body: { _docs: [{name: 'newDoc#1'}, {name: 'newDoc#2'}] }

    allowDiskUse: false, // allow MongoDB queries to use more than 100 MB - default: false
    customLabels: { // optional - set custom keys for results
        docs: 'docs', // default: 'docs'
        meta: 'pagination', // default: 'pagination'
        limit: 'limit', // default: 'limit'
        page: 'page', // default: 'page'
        pagingCounter: 'pagingCounter', // default: 'pagingCounter'
        hasNextPage: 'hasNextPage', // default: 'hasNextPage'
        hasPrevPage: 'hasPrevPage', // default: 'hasPrevPage'
        nextPage: 'nextPage', // default: 'nextPage'
        prevPage: 'prevPage', // default: 'prevPage'
        totalDocs: 'totalDocs', // default: 'totalDocs'
        totalPages: 'totalPages', // default: 'totalPages'
        acknowledged: 'acknowledged', // default: 'acknowledged'
        modifiedCount: 'modifiedCount', // default: 'modifiedCount'
        deletedCount: 'deletedCount', // default: 'deletedCount'
        createdCount: 'createdCount', // default: 'createdCount'
        readCount: 'readCount', // default: 'readCount'
    },
}
```

## Router

```javascript
const express = require("express");
const ResourceController = require("../Controller/ResourceController");

const router = express.Router()
router.use(auth-middleware)

/* use "bread softDelete Router" snippet if pluginOptions.softDelete = true */

router.get(   '/:id', middleware, ResourceController.read)
router.patch( '/:id', middleware, ResourceController.edit)
router.delete('/:id', middleware, ResourceController.destroy)
router.get(   '/',    middleware, ResourceController.browse)
router.patch( '/',    middleware, ResourceController.edit)
router.delete('/',    middleware, ResourceController.destroy)
router.post(  '/',    middleware, ResourceController.add)

module.exports = router
```

## softDelete Router

```javascript
const express = require("express");
const ResourceController = require("../Controller/ResourceController");

const router = express.Router()
router.use(auth-middleware)

/* use "bread Router" snippet if pluginOptions.softDelete = false */

router.get(   '/bin/:id', middleware, ResourceController.readDeleted)
router.patch( '/bin/:id', middleware, ResourceController.rehabilitate)
router.delete('/bin/:id', middleware, ResourceController.destroy)
router.get(   '/bin',     middleware, ResourceController.browseDeleted)
router.patch( '/bin',     middleware, ResourceController.rehabilitate)
router.delete('/bin',     middleware, ResourceController.destroy)
router.get(   '/:id',     middleware, ResourceController.read)
router.patch( '/:id',     middleware, ResourceController.edit)
router.delete('/:id',     middleware, ResourceController.softDelete)
router.get(   '/',        middleware, ResourceController.browse)
router.patch( '/',        middleware, ResourceController.edit)
router.delete('/',        middleware, ResourceController.softDelete)
router.post(  '/',        middleware, ResourceController.add)

module.exports = router
```

## Model

```javascript
const mongoose = require("mongoose");
const bread = require("mongoose-bread");

const resourceSchema = new mongoose.Schema({
    name: String,
    
}, {
    timestamps: true,
});

resourceSchema.plugin(bread, {
    /* lean gets query results as plain js objects - can improve query speed  */
    // lean: false, // default: false
    // leanWithId: false, // default: false
    // leanWithout_id: false, // default: false

    /* if searchableFields is ommited search will be disabled for resource */
    searchableFields: ['name'],

    /* exclude blacklistedFields from all query results */
    blacklistedFields: ['__v', 'createdAt', 'updatedAt'],
})

module.exports = mongoose.model('resource', resourceSchema);
```

## softDelete Model

```javascript
const mongoose = require("mongoose");
const bread = require("mongoose-bread");

const resourceSchema = new mongoose.Schema({
    name: String,
    
}, {
    timestamps: true,
});

resourceSchema.plugin(bread, {
    /* lean gets query results as plain js objects - can improve query speed  */
    // lean: false, // default: false
    // leanWithId: false, // default: false
    // leanWithout_id: false, // default: false

    /* if searchableFields is ommited search will be disabled for resource */
    searchableFields: ['name'],

    /* exclude blacklistedFields from all query results */
    blacklistedFields: ['__v', 'deleted', 'deletedAt', 'deletedBy', 'createdAt', 'updatedAt'],

    /* enables softDelete */
    softDelete: true,
    softDeleteOptions: {
        deletedAt: true, // default: true
        deletedBy: true, // default: false
        requestUserIdPath: 'auth.user.id' // default: ''
    }
})

module.exports = mongoose.model('resource', resourceSchema);
```

## Controller

```javascript
const Resource = require("../Models/Resource")

function catchAsync(fn) { return (req, res, next) => { fn(req, res, next).catch(next) } }

/* use "bread softDelete Controller" snippet if pluginOptions.softDelete = true */

module.exports = {
    browse: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createBrowseOptions(req)
        const result = await Resource.browse(options)
        res.status(200).json({
            message: req.query.search ? 'search' : 'browse',
            result,
        })
    }),
    read: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createReadOptions(req)
        const result = await Resource.read(options)
        res.status(200).json({ message: 'read', result })
    }),
    edit: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createEditOptions(req)
        const result = await Resource.edit(options)
        res.status(200).json({ message: 'edit', result })
    }),
    add: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createAddOptions(req)
        const result = await Resource.add(options)
        res.status(200).json({ message: 'add', result })
    }),
    destroy: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createDeleteOptions(req)
        const result = await Resource.destroy(options)
        res.status(200).json({ message: 'destroy', result })
    }),
}
```

## softDelete Controller

```javascript
const Resource = require("../Models/Resource")

function catchAsync(fn) { return (req, res, next) => { fn(req, res, next).catch(next) } }

/* use "bread Controller" snippet if pluginOptions.softDelete = false */

module.exports = {
    browse: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createBrowseOptions(req)
        const result = await Resource.browse(options)
        res.status(200).json({
            message: req.query.search ? 'search' : 'browse',
            result,
        })
    }),
    read: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createReadOptions(req)
        const result = await Resource.read(options)
        res.status(200).json({ message: 'read', result })
    }),
    edit: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createEditOptions(req)
        const result = await Resource.edit(options)
        res.status(200).json({ message: 'edit', result })
    }),
    add: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createAddOptions(req)
        const result = await Resource.add(options)
        res.status(200).json({ message: 'add', result })
    }),
    destroy: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createDeleteOptions(req)
        const result = await Resource.destroy(options)
        res.status(200).json({ message: 'destroy', result })
    }),

    /* softDelete methods */
    browseDeleted: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createBrowseDeletedOptions(req)
        const result = await Resource.browse(options)
        res.status(200).json({
            message: req.query.search ? 'searchDeleted' : 'browseDeleted',
            result,
        })
    }),
    readDeleted: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createReadDeletedOptions(req)
        const result = await Resource.read(options)
        res.status(200).json({ message: 'readDeleted', result })
    }),
    softDelete: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createDeleteOptions(req)
        const result = await Resource.softDelete(options)
        res.status(200).json({ message: 'softDelete', result })
    }),
    rehabilitate: catchAsync(async (req, res) => {
        const options = Resource.breadHelper().createRehabilitateOptions(req)
        const result = await Resource.rehabilitate(options)
        res.status(200).json({ message: 'rehabilitate', result })
    }),
    
}
```
