const url = require('../js/urlChecker')
console.log('TYpe of url', typeof(url))

test('Does not return undefined', () => {
    expect(url('http://www.mysite.com')).toBeDefined()
})