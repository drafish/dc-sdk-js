// 低版本浏览器支持，最低支持到IE8
require('core-js/fn/object/define-property')
require('core-js/fn/object/create')
require('core-js/fn/object/assign')
require('core-js/fn/array/for-each')
require('core-js/fn/array/index-of')
require('core-js/fn/array/map')
require('core-js/fn/function/bind')
require('core-js/fn/promise')

const DataCF = require('./core').default

let dataCF = new DataCF()

dataCF.start()

window.sdk = {
  storeUserId: dataCF.storeUserId.bind(dataCF),
  dispatch: dataCF.dispatch.bind(dataCF),
  getDeviceId: dataCF.getDeviceId
}
