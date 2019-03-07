var expect = require('chai').expect

describe('config test', function () {
  it('domain should be www.test.com', function () {
    process.env.NODE_ENV = 'test'
    var config = require('../src/config')
    expect(config.domain).to.be.equal('www.test.com')
  })
})
