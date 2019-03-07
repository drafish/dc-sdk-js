import Listener from '../../common/listener'

export default class VisibilityChange extends Listener {
  constructor (ctx) {
    super(document, 'visibilitychange')

    this.ctx = ctx
  }

  handler () {
    console.log(`${this.type} event trigged`)
    var isHidden = document.hidden
    if (isHidden) {
      this.ctx.heatMap.clear()
      this.ctx.phoneList.clear()
    } else {
      this.ctx.heatMap.set()
      this.ctx.phoneList.set()
    }
  }

  add () {
    if (typeof document['hidden'] === 'boolean') {
      console.log('visibilitychange event added')
      document.addEventListener('visibilitychange', this.handler.bind(this))
    } else {
      console.log('该浏览器不支持页面可见性API')
    }
  }

  remove () {
    if (typeof document['hidden'] === 'boolean') {
      console.log('visibilitychange event removed')
      document.removeEventListener('visibilitychange', this.handler)
    } else {
      console.log('该浏览器不支持页面可见性API')
    }
  }
}
