import Interval from '../../common/interval'

export default class HeatMap extends Interval {
  constructor (ctx) {
    super(ctx.config.heatMapDelay, 'heatMap')

    this.ctx = ctx
    this.heats = []
    this.sender = ctx.sender
    this.params = ctx.params
    this.heatmapUrls = ctx.config.heatmapUrls
  }

  async code () {
    console.log('heats.length: ', this.heats.length)
    if (this.heats.length > 0) {
      let heatMapEvent = this.params.getEvent({
        type: 'heatmap',
        data: this.heats
      })
      this.params.getHeader()
      await this.sender.send({
        device: this.params.device,
        header: this.params.header,
        event: heatMapEvent
      })
      this.heats = []
    }
  }

  set () {
    this.isCollect() && super.set()
  }

  // 是否采集
  isCollect () {
    let hasSign = false
    for (var key in this.heatmapUrls) {
      let _len = this.heatmapUrls[key].length
      if (this.heatmapUrls[key][_len - 1] === '*') {
        let _currentKey = this.heatmapUrls[key].substring(0, _len - 1)
        if (document.URL === _currentKey || document.URL.indexOf(_currentKey + '#') !== -1) {
          hasSign = true
          break
        }
      } else if (document.URL === this.heatmapUrls[key]) {
        hasSign = true
        break
      }
    }

    return hasSign
  }
}
