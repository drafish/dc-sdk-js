var expect = require('chai').expect
var util = require('../src/common/util.js')

describe('util test', function () {
  it('random string length should be 32', function () {
    expect(util.random().length).to.be.equal(32)
  })

  it('uuid string length should be 46', function () {
    expect(util.uuid().length).to.be.equal(46)
  })

  var arr = ['aa', 'bb', 'cc']
  it('index of cc should be 3', function () {
    expect(util.indexOf(arr, 'cc')).to.be.equal(2)
  })

  it('index of dd should be -1', function () {
    expect(util.indexOf(arr, 'dd')).to.be.equal(-1)
  })
})
