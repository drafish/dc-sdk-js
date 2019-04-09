import Listener from '../../common/listener'

export default class BeforeUnload extends Listener {
  constructor (ctx) {
    super(window, 'beforeunload')

    this.ctx = ctx
    this.sender = ctx.sender
    this.params = ctx.params
  }

  async handler () {
    console.log(`${this.type} event trigged`)
    
    let unloadEvent = this.params.getEvent({
      type: 'unload',
    })

    await this.ctx.heatMap.code()

    this.params.getHeader()
    await this.sender.send({
      header: this.params.header,
      device: this.params.device,
      event: unloadEvent
    })

    this.ctx.heatMap.clear()
    this.ctx.phoneList.clear()
    this.ctx.message.remove()
  }
}
