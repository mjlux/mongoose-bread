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

Import the plugin in your Model `Models/Product.js`

```js
const mongooseBread = require('mongoose-bread')
```

Add the plugin to your Schema

```js
ProductSchema.plugin(mongooseBread, { /* options */ })
```

In your Controller make use of breadHelper() and methods provided by the plugin `Controller/ProductController.js`

Import the Model

```js
const Product = require('../Models/Product')
```

Add Controller method - i.e. `browseProducts()`

```js
ProductController.browseProducts = async (req, res) => {
  const options = Product.breadHelper().createBrowseOptions(req)
  const result = await Product.browse(options)
  res.status(200).json(result)
}
```

Add a Route to use browseProducts() `server.js`

```js
// your imports
const ProductController = require('../Controller/ProductController')

// your express setup
app.get('/api/v1/products', ProductController.browseProducts)
```

With your server running you can now paginate, search and filter the results.  
Select only specific fields to return.  
Make the output lean ...and much more.  
All through the parameters in your URL.

A call to `https://myapp.com/api/v1/products?page=2&limit=5&select=name+price&sort=quantity`  
responds with 5 products, sorted by quantity, on page 2 with only `name` and `price` selected

## Usage

For a thorough example setup see: [Usage Documentation](./docs/usage.md)
## Snippets

We have them - use them

## Typescript

Looking for wizards

## Development

- Ensure all tests pass before you commit by running `npm run test`. In order to run the tests, you need to have the Mongo Deamon running locally.
- There are pre-commit hooks that run to ensure the _files you've changed_ are formatted correctly.
- Optionally you can manually run `npm run lint && npm run prettier` to lint and format every relevant file
- If using VS Code, install eslint and prettier for easy editor integration.

## License

[MIT](LICENSE)