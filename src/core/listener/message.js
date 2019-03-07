import Listener from '../../common/listener'

export default class Message extends Listener {
  constructor (ctx) {
    super(window, 'message')

    this.ctx = ctx
    this.sender = ctx.sender
    this.params = ctx.params
    this.config = ctx.config

    let iframe
    let iframeSrc = this.config.iframe
    try {
      iframe = document.createElement('iframe')
      iframe.id = 'frame'
      iframe.name = 'frame'
      iframe.src = iframeSrc
      iframe.style.display = 'none'
    } catch (e) {
      iframe = document.createElement('<iframe id="iframe" name="frame" src="' + iframeSrc + '" style="display: none"></iframe>')
    }
    document.body.appendChild(iframe)
    let iframeData = {
      type: 'loaded'
    }
    iframe.onload = function () {
      iframe.contentWindow.postMessage(JSON.stringify(iframeData), '*')
    }

    this.iframe = iframe
  }

  async handler (event) {
    // console.log(`${this.type} event trigged`)
    
    let _eventData = event.data && typeof event.data === 'string' && JSON.parse(event.data)

    // console.log('iframe data: ', _eventData)

    // 考虑到接入方可能也会用到postMessage，所以这里做一层判断
    switch (_eventData.type) {
      case 'deviceId':

        localStorage.setItem('deviceId', _eventData.deviceId)

        this.ctx.click.add()
        this.ctx.visibilityChange.add()
        this.ctx.beforeUnload.add()
        this.ctx.popState.add()
        this.ctx.pushState.add()

        let device = this.params.device
        let header = this.params.getHeader()

        await this.sender.send({
          device,
          header,
          event: this.ctx.loadedEvent
        })

        this.ctx.heatMap.set()
        this.ctx.phoneList.set()
        break
      default:
        break
    }
  }
}
