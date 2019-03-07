import Listener from '../../common/listener'

export default class PushState extends Listener {
  constructor (ctx) {
    super(window, 'pushstate')

    this.ctx = ctx
    this.sender = ctx.sender
  }

  handler (event) {
    console.log(`pushstate event trigged`)
    console.log('pushstate event: ', event)
    this.ctx.popState.handler.call(this.ctx.popState, event)
  }

  add () {
    let handler = this.handler.bind(this)
    let replaceState = history.replaceState
    if (replaceState) {
      this.replaceState = replaceState
      history.replaceState = function () {
        handler({state: arguments[0], param: arguments[1], url: arguments[2], type: 'pushstate'})
        return replaceState.apply(history, arguments)
      }
    }

    let pushState = history.pushState
    if (pushState) {
      this.pushState = pushState
      history.pushState = function () {
        handler({state: arguments[0], param: arguments[1], url: arguments[2], type: 'pushstate'})
        return pushState.apply(history, arguments)
      }
    }
  }

  remove () {
    history.replaceState = this.replaceState
    history.pushState = this.pushState
  }
}
