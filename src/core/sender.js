import { isSupportWs } from '../common/util'
import Ws from '../common/ws'
import Ajax from '../common/ajax'

export default class Sender {
  constructor (options) {
    this.serverUrl = options.serverUrl
    this.wsUrl = options.wsUrl
  }

  initWs () {
    if (isSupportWs()) {
      this.ws = new Ws({ url: this.wsUrl })
      this.ws.open()
    }
  }

  closeWs () {
    this.ws && this.ws.close()
  }

  async send (params) {
    // if (this.ws && this.ws.isOpen()) {
    //   this.ws.send(JSON.stringify(params))
    // } else {
      let ajax = new Ajax({
        url: this.serverUrl,
        method: 'POST'
      })

      let res = await ajax.send(params)

      return res
    // }
  }

}
