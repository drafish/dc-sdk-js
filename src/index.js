// 低版本浏览器支持，最低支持到IE8
require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
// require('core-js/features/array/map')
require('core-js/features/function/bind')
require('core-js/features/promise')

const DataCF = require('./core').default

let dataCF = new DataCF()

dataCF.start()

window.sdk = {
  storeUserId: dataCF.storeUserId.bind(dataCF),
  dispatch: dataCF.dispatch.bind(dataCF),
  getDeviceId: dataCF.getDeviceId
}
