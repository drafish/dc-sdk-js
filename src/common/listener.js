import { addEvent, removeEvent } from './util'

export default class Listener {
  constructor (target, type) {
    this.target = target
    this.type = type
  }

  handler () {
    console.log('Listener handler')
  }

  add () {
    addEvent(this.target, this.type, this.handler.bind(this))
    console.log(`${this.type} event added`)
  }

  remove () {
    removeEvent(this.target, this.type, this.handler)
    console.log(`${this.type} event removed`)
  }
}
