import { clone } from '../common/util'

export default class Params {
  constructor (options) {
    // 设备信息
    this.device = {
      deviceType: 'web',
      language: 'en-US',
      screenHigh: 0,
      screenWide: 0
    }
    // 采集到的事件信息
    this.event = {
      type: '',// 事件类型
      currentTime: 0,// 当前时间戳
      title: '',// 页面标题
      url: '',// 当前url
      referrer: '',// 来源页url
      data: {}
    }
    // 请求头信息
    this.header = {
      channelCode: options.channelCode,
      token: options.token,
      deviceId: '',
      userId: ''
    }
  }

  setDevice () {
    if (window && window.screen) {
      this.device.screenHigh = window.screen.height || 0
      this.device.screenWide = window.screen.width || 0
    }

    if (navigator) {
      this.device.language = navigator.language || ''
    }
  }

  getEvent (obj = {}) {
    return Object.assign(clone(this.event), {
      data: {},
      currentTime: new Date().getTime(),
      title: document.title || '',
      referrer: document.referrer || '',
      url: document.URL || ''
    }, obj)
  }

  getHeader () {
    this.header.deviceId = localStorage.getItem('deviceId') || ''
    this.header.userId = sessionStorage.getItem('userId') || ''

    return this.header
  }
  
}
