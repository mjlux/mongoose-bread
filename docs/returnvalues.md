# mongoose-bread return values

## browse()

```js
const request = {}

const options = Product.breadHelper().createBrowseOptions(request)
const result = await Product.browse(options)
result => {
    docs: [
        {
            _id: "647591f040fffc377c114e73",
            name: "Name of Doc#1",
        },
        {
            _id: "64759b44fe48f6fca413a002",
            name: "Name of Doc#2",
        },
        /* [...] */
        {
            _id: "64759b44fe48f6fca413a002",
            name: "Name of Doc#10",
        }
    ],
    pagination: {
        totalDocs: 81,
        offset: 0,
        limit: 10,
        totalPages: 9,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null,
        nextPage: 2,
    },
    acknowledged: true,
    readCount: 10
}
```

## browse() - deleted

> Only available if "softDelete" option is true

Returns only softDeleted documents  
The difference to regular browse is a different helper function call

```js
const request = {}

const options = Product.breadHelper().createBrowseDeletedOptions(request)
const result = await Product.browse(options)
result => {
    docs: [
        {
            _id: "647591f040fffc377c114e73",
            name: "Name of Doc#1",
        },
        {
            _id: "64759b44fe48f6fca413a002",
            name: "Name of Doc#2",
        },
        /* [...] */
        {
            _id: "64759b44fe48f6fca413a002",
            name: "Name of Doc#10",
        }
    ],
    pagination: {
        totalDocs: 81,
        offset: 0,
        limit: 10,
        totalPages: 9,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: true,
        prevPage: null,
        nextPage: 2,
    },
    acknowledged: true,
    readCount: 10
}
```

## read()

```js
const request = {
    params: { id: "6475a31419d882f0025fcc06" }
}

const options = Product.breadHelper().createReadOptions(request)
const result = await Product.read(options)
result => {
    docs: [
        {
            _id: "6475a31419d882f0025fcc06",
            name: "Name of Doc#12",
        }
    ],
    acknowledged: true,
    readCount: 1
}
```

## read() - deleted

> Only available if "softDelete" option is true

Returns a softDeleted document  
The difference to regular read is a different helper function call

```js
const request = {
    params: { id: "6475a31419d882f0025fcc06" }
}

const options = Product.breadHelper().createReadDeletedOptions(request)
const result = await Product.read(options)
result => {
    docs: [
        {
            _id: "6475a31419d882f0025fcc06",
            name: "Name of Doc#12",
        }
    ],
    acknowledged: true,
    readCount: 1
}
```

## edit()

```js
const request = {
    params: { id: "6475a31419d882f0025fcc06" },
    body: { name: "new Name" }
}

const options = Product.breadHelper().createEditOptions(request)
const result = await Product.edit(options)
result => {
    docs: [
        {
            _id: "6475a31419d882f0025fcc06",
            name: "new Name",
        }
    ],
    acknowledged: true,
    modifiedCount: 1
}
```

## edit() - bulk

```js
const request = {
    body: {
        _ids: [ "6475a31419d882f0025fcc06", "64761520db7954c18413b2cd" ],
        _docs: [{ name: "new Name for all Docs" }]
    }
}

const options = Product.breadHelper().createEditOptions(request)
const result = await Product.edit(options)
result => {
    docs: [
        {
            _id: "6475a31419d882f0025fcc06",
            name: "new Name for all Docs",
        },
        {
            _id: "64761520db7954c18413b2cd",
            name: "new Name for all Docs",
        }
    ],
    acknowledged: true,
    modifiedCount: 2
}
```

## add()

```js
const request = {
    body: { name: "brand New Doc" }
}

const options = Product.breadHelper().createAddOptions(request)
const result = await Product.add(options)
result => {
    docs: [
        {
            _id: "6477624f1970ea11e93ff85d",
            name: "brand New Doc",
        }
    ],
    acknowledged: true,
    createdCount: 1
}
```

## add() - bulk

```js
const request = {
    body: {
        _docs: [
            { name: "brand New Doc#1" },
            { name: "brand New Doc#2" }
        ]
    }
}

const options = Product.breadHelper().createAddOptions(request)
const result = await Product.add(options)
result => {
    docs: [
        {
            _id: "647762611970ea11e93ff860",
            name: "brand New Doc#1",
        },
        {
            _id: "647762611970ea11e93ff861",
            name: "brand New Doc#2",
        }
    ],
    acknowledged: true,
    createdCount: 2
}
```

## destroy()

> destroy docs include "\_id" only

```js
const request = {
    params: { id: "6475a31219d882f0025fcc03" }
}

const options = Product.breadHelper().createDeleteOptions(request)
const result = await Product.destroy(options)
result => {
    docs: [
        {
            _id: "6475a31219d882f0025fcc03"
        }
    ],
    acknowledged: true,
    deletedCount: 1
}
```

## destroy() - bulk

> destroy docs include "\_id" only

Only deletes matching documents.  
If only a subset of send ids are found it will be reflected in the result.  
If no ids are found it throws an error

```js
const request = {
    body: {
        _ids: [ "647591f040fffc377c114e73", "647617e24de71bee455feacf" ]
    }
}

const options = Product.breadHelper().createDeleteOptions(request)
const result = await Product.destroy(options)
result => {
    docs: [
        {
            _id: "647591f040fffc377c114e73"
        },
        {
            _id: "647617e24de71bee455feacf"
        }
    ],
    acknowledged: true,
    deletedCount: 2
}
```

## softDelete()

> Only available if "softDelete" option is true

> softDelete docs include "\_id" only

```js
const request = {
    params: { id: "647617e24de71bee455feacf" }
}

const options = Product.breadHelper().createDeleteOptions(request)
const result = await Product.softDelete(options)
result => {
    docs: [
        {
            _id: "647617e24de71bee455feacf"
        }
    ],
    acknowledged: true,
    modifiedCount: 1
}
```

## softDelete() - bulk

> Only available if "softDelete" option is true

> softDelete docs include "\_id" only

Only deletes matching documents.  
If only a subset of send ids are found it will be reflected in the result.  
If no ids are found it throws an error

```js
const request = {
    body: {
        _ids: [
            "647591f040fffc377c114e73",
            "64759b44fe48f6fca413a002",
            /* [...] */
            "6475a31219d882f0025fcc03"
        ]
    }
}

const options = Product.breadHelper().createDeleteOptions(request)
const result = await Product.softDelete(options)
result => {
    docs: [
        {
            _id: "647591f040fffc377c114e73"
        },
        {
            _id: "64759b44fe48f6fca413a002"
        },
        /* [...] */
        {
            _id: "6475a31219d882f0025fcc03"
        }
    ],
    acknowledged: true,
    modifiedCount: 5
}
```

## rehabilitate()

> Only available if "softDelete" option is true

> rehabilitate docs include "\_id" only

```js
const request = {
    params: { id: "647617e24de71bee455feacf" }
}

const options = Product.breadHelper().createRehabilitateOptions(request)
const result = await Product.rehabilitate(options)
result => {
    docs: [
        {
            _id: "647617e24de71bee455feacf"
        }
    ],
    acknowledged: true,
    modifiedCount: 1
}
```

## rehabilitate() - bulk

> Only available if "softDelete" option is true

> rehabilitate docs include "\_id" only

Only rehabilitates matching documents.  
If only a subset of send ids are found it will be reflected in the result.  
If no ids are found it throws an error

```js
const request = {
    body: {
        _ids: [
            "647591f040fffc377c114e73",
            "64759b44fe48f6fca413a002",
            /* [...] */
            "6475a31219d882f0025fcc03",
        ]
    }
}

const options = Product.breadHelper().createRehabilitateOptions(request)
const result = await Product.rehabilitate(options)
result => {
    docs: [
        {
            _id: "647591f040fffc377c114e73"
        },
        {
            _id: "64759b44fe48f6fca413a002"
        },
        /* [...] */
        {
            _id: "6475a31219d882f0025fcc03"
        }
    ],
    acknowledged: true,
    modifiedCount: 5
}
```
