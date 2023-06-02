# BreadUrlBuilder

Expressive Url Builder tailored to construct mongoose-bread requests  
Needs a bit more testing in actual use but the unit tests say it's working like a champ

Have a look at the unit tests to get an idea of what's possible

````js
describe('BreadUrlBuilder', function () {

    it('is instantiable', function () {
        const testBreadUrlBuilderInstance = new BreadUrlBuilder('http://api.test.com')
        expect(testBreadUrlBuilderInstance).to.not.be.null
        expect(testBreadUrlBuilderInstance).to.not.be.undefined
    })

    it('throws Error for invalid Urls', function () {
        expect(() => new BreadUrlBuilder('')
            .get()
        ).to.throw('Invalid URL')
    })

    it('throws Error if select() and exclude() are called on the same instance', function () {
        expect(() => new BreadUrlBuilder('')
            .select('')
            .exclude('')
        ).to.throw('Calls to select()  [...] ly select() or exclude()')
    })

    it('casts toString when used in Template string', function () {
        expect(`${new BreadUrlBuilder('https://api.test.org/')}`)
            .to.equal('https://api.test.org/')
    })

    it('sets the protocol to https', function () {
        expect(`${new BreadUrlBuilder('http://api.test.org')}`)
            .to.equal('https://api.test.org/')

        const testBreadUrlBuilderInstance = new BreadUrlBuilder('http://api.test.org')
            .protocol(BreadUrlBuilder.HTTPS)

        expect(`${testBreadUrlBuilderInstance}`)
            .to.equal('https://api.test.org/')
    })

    it('allows reset to http by explicitly setting the protocol to BreadUrlBuilder.FORCE_HTTP', function () {
        const testBreadUrlBuilderInstance = new BreadUrlBuilder('http://api.test.org')
            .protocol(BreadUrlBuilder.FORCE_HTTP)

        expect(`${testBreadUrlBuilderInstance}`)
            .to.equal('http://api.test.org/')
    })

    it('has chainable methods', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .port(8080)
            .search('test')
            .limit(5)
            .getURL()

        expect(testUrl).to.not.be.null
        expect(testUrl).to.not.be.undefined
    })

    it('creates a paramertized URL', function () {
        const { ASC } = BreadUrlBuilder
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .protocol(BreadUrlBuilder.FORCE_HTTP)
            .port(3000)
            .endpoint('/products')
            .hash('headline')
            .addPath('/new')
            .addToPath(new mongoose.Types.ObjectId('6478d57784fabdbf127d0a2a'))
            .addParameter('customParameter', 12)
            .lean(false)
            .leanWithId(false)
            .leanWithout_id(false)
            .search('price')
            .limit(100)
            .page(5)
            .sort('-price', ASC)
            .select('name')
            .getURL()

        expect(`${testUrl}`)
            .to.equal('http://api.test.o [...] rt=price&select=name#headline')
    })

    it('adds "/" seperated path with one call to .addPath()"', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .addPath('/products/123/details/')
            .addPath('newest')
            .addToPath('456/')
            .addPath('/orange')

        expect(`${testUrl}`)
            .to.equal('https://api.tes [...] west/456/orange')

        const userId = '6478d57784fabdbf127d0a2a'
        testUrl.clearPath()
            .addPath('/member/friend/')
            .addToPath(userId)

        expect(`${testUrl}`)
            .to.equal('https://api.te [...] 57784fabdbf127d0a2a')
    })

    it('adds compare parameters', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .with('price').greaterThan(100).and.lessThan(1000)
            .with('views').equalTo(123)
            .and.with('name').not.equalTo('Moritz')
            .but.with('friendsAmount').greaterThan(8)

        expect(`${testUrl}`)
            .to.equal('https://api.te [...] sAmount%5Bgt%5D=8')
    })

    it('removes parameters', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .addParameter('chicken', 'GackGack')
            .with('price').greaterThan(100).and.lessThan(1000)

        expect(`${testUrl}`)
            .to.equal('https://api. [...] price%5Blt%5D=1000')

        testUrl.withOut('unknownKey')
        expect(`${testUrl}`, 'ignore unset params')
            .to.equal('https://api.test.org/?chicken=Ga [...] t%5D=1000')

        testUrl.withOut('chicken')
        expect(`${testUrl}`, 'remove param')
            .to.equal('https://api.test. [...] &price%5Blt%5D=1000')

        testUrl.withOut('price')
        expect(`${testUrl}`, 'remove compare')
            .to.equal('https://api.test.org/')
    })

    it('concats sorts', function () {
        const { ASC, DESC } = BreadUrlBuilder
        const testUrl = new BreadUrlBuilder('http://api.test.org')
            .sort('friends', ASC)
            .sort('views', DESC)

        expect(`${testUrl}`)
            .to.equal('https://api.test.org/?sort=friends+-views')
    })

    it('adds projection as JSON string', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org#test')
            .projection({ title: 0, age: 0 })

        expect(`${testUrl}`)
            .to.equal('https://api.test.o [...] 22%3A0%2C%22age%22%3A0%7D#test')

        const jsonString = testUrl.get().searchParams.get('projection')
        expect(jsonString)
            .to.equal('{"title":0,"age":0}')

        const projection = JSON.parse(jsonString)
        expect(projection)
            .with.property('title')
            .to.equal(0)

    })

    it('adds query as JSON string', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org#test')
            .endpoint('books')
            .query({
                title: { $in: ['dracula', 'vampires'] },
                age: { $and: [{ $gt: 5 }, { $lt: 20 }] }
            })

        expect(`${testUrl}`)
            .to.equal('https://api. [...] D%5D%7D%7D#test')

        const jsonString = testUrl.get().searchParams.get('query')
        expect(jsonString)
            .to.equal('{"title":{"$in":["d [...] "$lt":20}]}}')

        const query = JSON.parse(jsonString)
        expect(query)
            .to.be.an.instanceOf(Object)
            .with.property('title')
        expect(query)
            .property('age')
            .to.have.property('$and')
            .which.is.an.instanceOf(Array)
            .with.deep.members([{ $gt: 5 }, { $lt: 20 }])
    })

    it('accepts Array|Object for populate', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org#test')
            .endpoint('books')
            .populate({ author: 1 })

        const objQuery = JSON.parse(testUrl.get().searchParams.get('populate'))
        expect(objQuery)
            .to.be.an.instanceOf(Object)
            .with.property('author')

        testUrl.populate(['author', 'publisher'])
        expect(`${testUrl}`)
            .to.equal('https://api.tes [...] blisher%22%5D#test')

        const jsonString = testUrl.get().searchParams.get('populate')
        expect(jsonString)
            .to.equal('["author","publisher"]')

        const arrQuery = JSON.parse(jsonString)
        expect(arrQuery)
            .to.be.an.instanceOf(Array)
            .with.members(["author", "publisher"])
    })

    it('resets the Url', function () {
        const testUrl = new BreadUrlBuilder('http://api.test.org#test')
            .endpoint('products')
            .addPath(new mongoose.Types.ObjectId('647915f96cd4bbcb546def4c'))
            .addPath('details')
            .projection({ title: 0, age: 0 })

        expect(`${testUrl}`)
            .to.equal('https://api.te [...] A0%7D#test')

        testUrl.clearHash()
        expect(`${testUrl}`)
            .to.equal('https://api.tes [...] e%22%3A0%7D')

        testUrl.hash('footer').clearParameter()
        expect(`${testUrl}`)
            .to.equal('https://api.tes [...] ef4c/details#footer')

        testUrl.search('new').clearPath()
        expect(`${testUrl}`)
            .to.equal('https://api.test.org/products?search=new#footer')

        testUrl
            .addPath('old')
            .hash('#header')
            .search('Weihnachtskarten')
            .resetToEndpoint()

        expect(`${testUrl}`)
            .to.equal('https://api.test.org/products')

        testUrl
            .addPath('new')
            .addParameter('title', 'Dune')
            .resetToBaseUrl()

        expect(`${testUrl}`)
            .to.equal('https://api.test.org/')
    })
})

```
````
