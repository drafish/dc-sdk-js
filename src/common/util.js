// 唯一标示 uuid,pageSessionId
export function uuid () {
  return new Date().getTime() + '|' + random()
}

export function random () {
  let str = ''
  let len = 32
  for (let i = 0; i < len; i++) {
    str = str + 'x'
  }
  return str.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0; let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 拷贝元素
export function clone (obj) {
  let newObj = {}
  for (let i in obj) {
    newObj[i] = obj[i]
  }
  return newObj
}

export function pick (obj, paths) {
  let newObj = {}
  paths.map(path => {
    newObj[path] = obj[path]
  })
  return newObj
}

// 绑定事件
export function addEvent (target, type, handler) {
  if (target.addEventListener) {
    target.addEventListener(type, handler, false)
  } else {
    target.attachEvent('on' + type,
      function (event) {
        return handler.call(target, event)
      }, false)
  }
}

// 取消事件监听
export function removeEvent (target, type, handler) {
  if (target.removeEventListener) {
    target.removeEventListener(type, handler)
  } else {
    target.detachEvent('on' + type,
      function (event) {
        return handler.call(target, event)
      }, true)
  }
}

export function isSupportWs () {
  if (window.WebSocket !== undefined) {
    return true
  } else {
    return false
  }
}

export function IEVersion () {
  let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  let isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    let fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6// IE版本<=7
    }
  } else if (isEdge) {
    return 'edge'// edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1// 不是ie浏览器
  }
}

export function getAllNodesPath (el) {
  let _stack = []
  while (el.parentNode) {
    let _sibCount = 0; let _elIndex = 0; let _entry = ''; let _childs = el.parentNode.children || []
    for (let i = 0; i < _childs.length; i++) {
      let _sid = _childs[i]
      if (_sid.nodeName === el.nodeName) {
        _elIndex = _sid === el ? _sibCount : _elIndex
        _sibCount++
      }
    }
    if (el.nodeName.toLowerCase() === 'html') { break }
    _entry = el.nodeName.toLowerCase()
    _entry += el.id ? '#' + el.id : (_sibCount > 1 ? ':eq(' + _elIndex + ')' : '')
    _stack.unshift(_entry)
    el = el.parentNode
  }
  return _stack
}

export function getAllNodesMsg (d) {
  let nodeLists = []
  for (let i = 0; i < d.length; i++) {
    let _nodePath = ''
    let _label = d[i].innerText.substring(0, 20).replace(/[\s\r\n↵]/g, '') || d[i].title || d[i].name
    if (d[i].nodeName.toLowerCase() !== 'br' && d[i].nodeName.toLowerCase() !== 'script') {
      _nodePath = getAllNodesPath(d[i])
      if (!_label) {
        let _nodeName = d[i].nodeName.toLowerCase()
        switch (_nodeName) {
          case 'img':
            _label = '图片' + (+new Date())
            break
          case 'canvas':
            _label = '图表' + (+new Date())
            break
          case 'body':
            _label = '图表' + (+new Date())
            break
          default:
            _label = _nodePath.reverse().join('/')
        }
      }
      d[i].nodeType === 1 && nodeLists.push({
        sign: _nodePath.join('/'),
        x: Math.round(d[i].getBoundingClientRect().x),
        y: Math.round(d[i].getBoundingClientRect().y),
        index: _nodePath.length,
        width: d[i].offsetWidth,
        height: d[i].offsetHeight,
        label: _label
      })
      d[i].children.length > 0 && getAllNodesMsg(d[i].children)
    }
  }
  return nodeLists
}
