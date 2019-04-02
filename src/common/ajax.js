import { IEVersion } from './util'

export default class Ajax {
  constructor (options) {
    let ieVersion = IEVersion()

    let xhr
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()

      // XDomainRequest可以支持到IE8以下的浏览器，但我懒得测了，所以干脆写死了，IE8以下都不管了
      if ([8, 9].indexOf(ieVersion) > -1) {
        console.log('use XDomainRequest')
        xhr = new XDomainRequest()
      }
    } else {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }

    xhr.open(options.method, options.url)

    // 显示关闭withCredentials，这样就不会发送cookie
    xhr.withCredentials = false

    this.xhr = xhr
    this.ieVersion = ieVersion
  }

  send (data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    } else {
      data = null
    }

    let xhr = this.xhr
    return new Promise((resolve) => {
      xhr.send(data)

      if ([8, 9].indexOf(this.ieVersion) > -1) {
        xhr.onload = function () {
          resolve(JSON.parse(xhr.responseText))
        }
      } else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText))
          }
        }
      }
    })
  }
}
