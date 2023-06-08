# mongoose-bread Options

## Default Options

This list shows all mongoose-bread default Options followed by a explanation for each

- defaultPageSize: 10
- maxPageSize: 100
- searchableFields: []
- blacklistedFields: []
- paramsIdKey: 'id'
- bulkIdsKey: '\_ids'
- bulkDocsKey: '\_docs'
- softDelete: false
- softDeleteOptions:
  - overrideMethods: true
  - validateBeforeDelete: true
  - indexFields: true
  - deletedAt: true
  - deletedBy: false
  - requestUserIdPath: ''

Inherited from mongoose-paginate-v2 [Documentation](https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback)

- select: ''
- projection: {}
- collation: {}
- pagination: true
- allowDiskUse: false
- forceCountFn: false
- useCustomCountFn: false 👈 **used by mongoose-bread helper for softDelete**
- useEstimatedCount: false
- lean: false
- leanWithId: false 👈 **override mongoose-paginate-v2 default - was true**
- leanWithout_id: false 👈 **additional mongoose-bread option to remove '\_id' from lean results**
- customFind: 'find'
- customLabels:
  - docs: 'docs'
  - meta: 'pagination'
  - limit: 'limit'
  - page: 'page'
  - pagingCounter: 'pagingCounter'
  - hasNextPage: 'hasNextPage'
  - hasPrevPage: 'hasPrevPage'
  - nextPage: 'nextPage'
  - prevPage: 'prevPage'
  - totalDocs: 'totalDocs'
  - totalPages: 'totalPages'
  - acknowledged: 'acknowledged' 👈 **additional mongoose-bread label**
  - modifiedCount: 'modifiedCount' 👈 **additional mongoose-bread label**
  - deletedCount: 'deletedCount' 👈 **additional mongoose-bread label**
  - createdCount: 'createdCount' 👈 **additional mongoose-bread label**
  - readCount: 'readCount' 👈 **additional mongoose-bread label**
- options: DELETED 🚩 **NEVER USE THIS** leads to infinite loop in mongoose-paginate-v2 helper

> mongoose-bread will delete the **options** property within the helper() methods  
> and avoids "Maximum Call Stack Size Exceeded" Error by doing so

### Explanations

**defaultPageSize:`Number`** - default: 10

> limits queries to return 10 documents if no value is provided by request.query

**maxPageSize:`Number`** - default: 100

> limits queries to return a maximum of 100 documents regardless of request.query value

**searchableFields:`Array<String>`** - default: []

> 📢 **Disables search functionality if empty Array**  
> Contains the Schema property names to include in search query  
> in example  
> searchableFields = ['title', 'description', 'excerpt']  
> request.query.search = "best js tutorials"  
> will search 'title', 'description' and 'excerpt' for **best** or **js** or **tutorials**

**blacklistedFields:`Array<String>`** - default: []

> creates projection  
> in example  
> blacklistedFields = ['name', 'age']  
> results in: User.find({}, {name: 0, age: 0})

**paramsIdKey:`String`** - default: 'id'

> expected **request.params[key]:`ObjectId`** to identify a single Resource  
> in example  
> url send: GET:https://test.org/books/6478d57784fabdbf127d0a2a  
> recieved by: router.get( books/:**id**, BookController.read )  
> results in: request.params.**id** = 6478d57784fabdbf127d0a2a

**bulkIdsKey:`String`** - default: '\_ids'

> expected **request.body[key]:`Array<ObjectId>`** for bulk edit() add() destroy() softDelete() rehabilitate()  
> i.e. request.body: { **\_ids**: ['6478d57784fabdbf127d0a2a', '6478d57784fqwef127d0a2a'] }

**bulkDocsKey:`String`** - default: '\_docs'

> expected **request.body[key]:`Array<any>`** for bulk edit() add() destroy() softDelete() rehabilitate()  
> i.e. request.body: { **\_docs**: [{name: 'newDoc#1'}, {name: 'newDoc#2'}] }

**softDelete:`Boolean`** - default: false

> disabled by default  
> If enabled it adds softDelete methods to Schema and helpers

**softDeleteOptions:`Object`**

> Is only necessary if softDelete = true

**softDeleteOptions.overrideMethods:`Boolean`** - default: true

> this value will always be true when softDelete is enabled  
> **find()** **findOne()** **count()** are strictly necessary to be overridden for mongoose-bread to work properly

**softDeleteOptions.validateBeforeDelete:`Boolean`** - default: true

> run Schema validators before deletion

**softDeleteOptions.indexFields:`Boolean`** - default: true

> creates indicies for  
> 'deleted'  
> and 'deletedAt' (if softDeleteOptions.deletedAt = true)  
> and 'deletedBy' (if softDeleteOptions.deletedBy = true)

**softDeleteOptions.deletedAt:`Boolean`** - default: true

> if true adds field 'deletedAt':Date to Schema

**softDeleteOptions.deletedBy:`Boolean`** - default: false

> if true adds field 'deletedBy':`ObjectId` to Schema  
> Must be used in combination with requestUserIdPath to work

**softDeleteOptions.requestUserIdPath:`String`** - default: ''

> If deletedBy is set to true provide a path to extract the id of a **User** from the request object  
> i.e. requestUserIdPath = 'auth.user.\_id' -> request.auth.user.\_id  
> This path must resolve a ObjectId

For options inherited from mongoose-paginate-v2 consult the [Documentation](https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback)

## Set Global Options

> If you're using VSCode the use of "bread" snippet "global Options" for quick setup of common options is recommended

Snippet "global Options" Output:

```js
/* use in server|main|index.js */

// set global mongoose-bread options
const { mongooseBread } = require("mongoose-bread");
mongooseBread.options = {
  defaultPageSize: 10, // limits queries to return 10 documents - default: 10
  maxPageSize: 100, // limits queries to return 100 documents max - default: 100
  paramsIdKey: "id", // expected request.params.id to identify a single Resource - default: id
  // i.e. https://test.org/books/6478d57784fabdbf127d0a2a
  // => router.get(books/:id, BookController.read)
  // => request.params.id = 6478d57784fabdbf127d0a2a

  bulkIdsKey: "_ids", // expected request.body._ids - default: '_ids'
  // Used for bulk edit|add|destroy|softDelete|rehabilitate

  bulkDocsKey: "_docs", // expected request.body._docs with Array<any> - default: _docs
  // Used for bulk|edit|add
  // => request.body: { _docs: [{name: 'newDoc#1'}, {name: 'newDoc#2'}] }

  allowDiskUse: false, // allow MongoDB queries to use more than 100 MB - default: false
  customLabels: {
    // optional - set custom keys for results
    docs: "docs", // default: 'docs'
    meta: "pagination", // default: 'pagination'
    limit: "limit", // default: 'limit'
    page: "page", // default: 'page'
    pagingCounter: "pagingCounter", // default: 'pagingCounter'
    hasNextPage: "hasNextPage", // default: 'hasNextPage'
    hasPrevPage: "hasPrevPage", // default: 'hasPrevPage'
    nextPage: "nextPage", // default: 'nextPage'
    prevPage: "prevPage", // default: 'prevPage'
    totalDocs: "totalDocs", // default: 'totalDocs'
    totalPages: "totalPages", // default: 'totalPages'
    acknowledged: "acknowledged", // default: 'acknowledged'
    modifiedCount: "modifiedCount", // default: 'modifiedCount'
    deletedCount: "deletedCount", // default: 'deletedCount'
    createdCount: "createdCount", // default: 'createdCount'
    readCount: "readCount", // default: 'readCount'
  },
};
```

## Set Schema Options

> If you're using VSCode the use of "bread" snippets "Model" or "softDelete Model" for quick setup of common options is recommended

Snippet "Model" Output:

```js
const mongoose = require("mongoose");
const bread = require("mongoose-bread");

const resourceSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

resourceSchema.plugin(bread, {
  /* lean gets query results as plain js objects - can improve query speed  */
  // lean: false, // default: false
  // leanWithId: false, // default: false
  // leanWithout_id: false, // default: false

  /* if searchableFields is ommited search will be disabled for resource */
  searchableFields: ["name"],

  /* exclude blacklistedFields from all query results */
  blacklistedFields: ["__v", "createdAt", "updatedAt"],
});

module.exports = mongoose.model("resource", resourceSchema);
```

Snippet "softDelete Model" Output:

```js
const mongoose = require("mongoose");
const bread = require("mongoose-bread");

const resourceSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

resourceSchema.plugin(bread, {
  /* lean gets query results as plain js objects - can improve query speed  */
  // lean: false, // default: false
  // leanWithId: false, // default: false
  // leanWithout_id: false, // default: false

  /* if searchableFields is ommited search will be disabled for resource */
  searchableFields: ["name"],

  /* exclude blacklistedFields from all query results */
  blacklistedFields: [
    "__v",
    "deleted",
    "deletedAt",
    "deletedBy",
    "createdAt",
    "updatedAt",
  ],

  /* enables softDelete */
  softDelete: true,
  softDeleteOptions: {
    deletedAt: true, // default: true
    deletedBy: true, // default: false
    requestUserIdPath: "auth.user.id", // default: ''
  },
});

module.exports = mongoose.model("resource", resourceSchema);
```

## Reserved Options

These are internally used Options. These will be set by the Resource.helper() methods.  
They can be overridden **after** a call to a helper method to force specific values.

- customCount
- query
- offset
- page
- limit
- sort
- select
- projection
- collation
- populate

### Explanation

**customCount:'count'|'countDeleted'|'countWithDeleted'**

> used for SoftDelete

**query:`Object`**

> contains the MongoDB query  
> heavily used by helper() methods

**offset:`Number`**

> "page" is the mongoose-bread way to to select a subset of documents.  
> "offset" takes precedence over "page" so it is available for hard overrides if needed.  
> Use offset or page exclusively

**page:`Number`**

> mongoose-bread intended way to to select a subset of documents.  
> if not set "page" will default to 1

**limit:`Number`**

> if not set limit will be set to "defaultPageSize" by mongoose-bread helper() and is limited to a maximum value of options.maxPageSize

**sort:`Object`|Array\<String>**

> Determines sorting of a collection  
> i.e. "sort"='-name \_id' sorts results descending by name then ascending by \_id  
> sort as object: "sort"={ name: -1, \_id: 1 }

**select:`Object`|String**

> the fields to in- or exclude from resulting documents

> 📢 if the "blacklistedFields" is set "select" only allows excluding of fields

> To exclude fields preceed their names with "-"  
> "select"='-balance -creditscore' will exclude "balance" and "creditscore" from queried documents  
> It is recommended to define only exclusion of fields

**projection:`Object`|String**

> see: [Projection Documentation](<https://mongoosejs.com/docs/api/query.html#Query.prototype.projection()>)  
> used by "blacklistedFields" option to exclude fields from documents

**collation:`Object`|String**

> see: [Collation Documentation](<https://mongoosejs.com/docs/api/aggregate.html#Aggregate.prototype.collation()>)  
> Used for aggregations, which mongoose-bread is not build around  
> mongoose-bread may behave unexpected when "collation" is set

**populate:`Object`|String**

> see: [Populate Documentation](<https://mongoosejs.com/docs/api/query.html#Query.prototype.populate()>)

> **String** `'bestFriend'` populates  
> `User.schema.bestFriend{ type:Schema.Types.ObjectId, ref:'User' }`

> **String** `'friends.friend'` populates collection  
> `User.schema.friends[{ friend:{ type: Schema.Types.ObjectId, ref:'User' }}]`

> **Array\<String>** `['bestFriend', 'friends.friend']` populates both

> **Object** `{path: 'bestFriend'}` populates  
> `User.schema.bestFriend{ type:Schema.Types.ObjectId, ref:'User' }`

> **Object** `{path: 'friends.friend'}` populates collection  
> `User.schema.friends[{friend:{type: Schema.Types.ObjectId, ref:'User'}}]`

> **Array\<Object>** `[{path: 'bestFriend'}, {path: 'friends.friend'}]` populates both

**options:`Object`**

> 🚩 **NEVER USE THIS**

> mongoose-bread will delete the **options** property within the helper() methods because it leads to infinite loop in mongoose&#8209;paginate&#8209;v2 pagination helper and by doings so avoids "Maximum Call Stack Size Exceeded" Error

> inherited from mongoose-paginate-v2 - kept for documenting its strange behavior

see: mongoose-paginate-v2 [Documentation](https://github.com/aravindnc/mongoose-paginate-v2#modelpaginatequery-options-callback)

## Advanced Options

Sets read preferences for MongoDB  
Below are some references to understand more about preferences,

- <https://github.com/Automattic/mongoose/blob/master/lib/query.js#L1008>
- <https://docs.mongodb.com/manual/core/read-preference/>
- <http://mongodb.github.io/node-mongodb-native/driver-articles/anintroductionto1_1and2_2.html#read-preferences>

**read:`Object`**

> Determines the MongoDB nodes from which to read  
> [Documentation](<https://mongoosejs.com/docs/api/query.html#Query.prototype.read()>)

**read.pref:`'primary'|'p'|'primaryPreferred'|'pp'|'secondary'|'s'|'secondaryPreferred'|'sp'|'nearest'|'n'`**

> [Documentation](<https://mongoosejs.com/docs/api/query.html#Query.prototype.read()>)

**read.tags:`Array<Object>`**

> optional Array of tags for the query  
> example from documentation: [{ dc:'sf', s: 1 },{ dc:'ma', s: 2 }]  
> [Documentation](<https://mongoosejs.com/docs/api/query.html#Query.prototype.read()>)
