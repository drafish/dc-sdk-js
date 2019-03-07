export default class Interval {
  constructor (delay, type) {
    this.delay = delay
    this.id = null
    this.startTime = null
    this.type = type
  }

  code () {
    console.log('Interval code')
  }

  set () {
    this.id = setInterval(this.code.bind(this), this.delay)
    this.startTime = new Date().getTime()
    console.log(`${this.type} interval setted`)
  }

  clear () {
    if (this.id !== null) {
      clearInterval(this.id)
      this.id = null
      console.log(`${this.type} interval cleared`)
    } else {
      console.log(`${this.type} interval is not setted`)
    }
  }
}
