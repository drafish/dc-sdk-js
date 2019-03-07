import Sender from './sender'
import Params from './params'
import Onload from './listener/onload'
import config from '../config'

export default class DataCF {
  constructor () {

    if (typeof _XT === 'undefined') throw TypeError('必须定义全局配置变量 _XT，配置指定的请求Url。示例： let _XT = []')

    let ctx = {}

    // 解析 配置项
    for (let i in _XT) {
      switch (_XT[i][0]) {
        case 'token':
          config.token = _XT[i][1]
          break
        case 'channelCode':
          config.channelCode = _XT[i][1]
          break
        case 'serverUrl':
          config.serverUrl = _XT[i][1]
          break
        case 'wsUrl':
          config.wsUrl = _XT[i][1]
          break
        default:
          break
      }
    }

    let params = new Params({token: config.token, channelCode: config.channelCode})
    params.setDevice()

    let sender = new Sender({serverUrl: config.serverUrl, wsUrl: config.wsUrl})

    ctx.params = params
    ctx.sender = sender
    ctx.config = config

    this.ctx = ctx
  }

  async start () {
    let onload = new Onload(this.ctx)
    this.ctx.onload = onload

    onload.add()
  }

  storeUserId (_userId) {
    sessionStorage.setItem('userId', _userId)
  }

  // 采集自定义事件类型
  /**
   * @method dispatch 采集自动以事件
   * @parame eType 参数，触发的动作（点击还是滚动），如 click
   * @parame element 触发的对象信息，如果不采集，传 false
   * @parame extraInfo 定制化的事件额外对象参数，sdk 提供格式
   **/
  dispatch (eType, element, extraInfo) {
    let device = this.ctx.params.device
    let header = this.ctx.params.getHeader()
    let customEvent = this.ctx.params.getEvent({
      type: eType,
      data: extraInfo
    })

    if (element) {
      let target = element
      customEvent.pageElement = '{nodeName:' + target.nodeName + ',title:' + target.title + ',text:' + target.innerHTML + '}'
    }

    this.ctx.sender.send({
      device,
      header,
      event: [customEvent]
    })
  }

  getDeviceId () {
    return localStorage.getItem('deviceId')
  }

}
