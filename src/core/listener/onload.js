import Listener from '../../common/listener'
import BeforeUnload from './beforeUnload'
import Click from './click'
import Message from './message'
import PopState from './popState'
import PushState from './pushState'
import VisibilityChange from './visibilityChange'
import HeatMap from '../interval/heatMap'
import PhoneList from '../interval/phoneList'

export default class Onload extends Listener {
  constructor (ctx) {
    super(document, 'DOMContentLoaded')

    this.ctx = ctx
    this.params = ctx.params
    this.sender = ctx.sender
    this.config = ctx.config
  }

  handler () {

    this.ctx.loadedEvent = this.params.getEvent({
      type: 'loaded'
    })

    this.sender.initWs()
    Object.assign(this.ctx, {
      heatMap: new HeatMap(this.ctx),
      phoneList: new PhoneList(this.ctx),
      beforeUnload: new BeforeUnload(this.ctx),
      popState: new PopState(this.ctx),
      pushState: new PushState(this.ctx),
      click: new Click(this.ctx),
      visibilityChange: new VisibilityChange(this.ctx)
    })
    let message = new Message(this.ctx)
    this.ctx.message = message

    message.add()

    console.log('collect start')
  }

  add () {
    if (document.readyState === 'loading') {
      if (document.addEventListener) {
        super.add()
      } else {
        document.attachEvent('onreadystatechange', () => {
          if (document.readyState === 'interactive') {
            this.handler()
          }
        })
      }
    } else {
      console.log('DOMContentLoaded event already trigged')
      this.handler()
    }
  }

}
