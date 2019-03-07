import Listener from '../../common/listener'
import { getAllNodesPath } from '../../common/util'

export default class Click extends Listener {
  constructor (ctx) {
    super(document, 'click')

    this.ctx = ctx
  }

  handler (event) {
    console.log(`${this.type} event trigged`)
    var e = window.event || event
    var _target = e.target || e.srcElement
    if (_target) {
      var _label = ''
      if (_target.innerText.length > 10) {
        _label = ''
      } else {
        _label = _target.innerText.replace(/[\s\r\n↵]/g, '') || _target.title || _target.name
      }
      var _path = ''; var _nodeName = ''; var _width; var _height
      if (_target.parentNode.innerText === _label) {
        _nodeName = _target.parentNode.nodeName.toLowerCase()
        _path = getAllNodesPath(_target.parentNode)
        _width = Math.round((e.offsetX / _target.parentNode.offsetWidth) * 100)
        _height = Math.round((e.offsetY / _target.parentNode.offsetHeight) * 100)
      } else {
        _nodeName = _target.nodeName.toLowerCase()
        if (_nodeName === 'img' && !_label) {
          _label = '图片' + (+new Date())
        }
        if (_nodeName === 'canvas' && !_label) {
          _label = 'canvas图表' + (+new Date())
        }
        if (_nodeName === 'body') {
          _label = 'body'
        }
        _path = getAllNodesPath(_target)
        _width = parseInt((e.offsetX / _target.offsetWidth) * 100)
        _height = parseInt((e.offsetY / _target.offsetHeight) * 100)
      }
      this.ctx.heatMap.heats.push(
        {
          x: _width,
          y: _height,
          nodeName: _nodeName,
          sign: _path.join('/'),
          label: _label || _path.reverse().join('/')
        }
      )
    }
  }

  add () {
    if (typeof document.addEventListener === 'function') {
      console.log('click event added')
      document.addEventListener('click', this.handler.bind(this), true)
    } else {
      console.log('该浏览器不支持addEventListener')
    }
  }

  remove () {
    if (typeof document.addEventListener === 'function') {
      console.log('click event removed')
      document.removeEventListener('click', this.handler.bind(this), true)
    } else {
      console.log('该浏览器不支持addEventListener')
    }
  }
}
