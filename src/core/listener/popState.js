import Listener from '../../common/listener'
import { uuid } from '../../common/util'

export default class PopState extends Listener {
  constructor (ctx) {
    super(window, 'popstate')

    this.ctx = ctx
    this.sender = ctx.sender
    this.params = ctx.params

  }

  async handler (event) {
    if (event.type === 'popstate') {
      console.log(`popstate event trigged`)
      console.log('popstate event: ', event)
    }

    let hashchangeEvent = this.params.getEvent({
      type: 'hashchange',
    })

    this.params.getHeader()
    await this.sender.send({
      header: this.params.header,
      device: this.params.device,
      event: hashchangeEvent
    })

  }

}
