# dc-sdk-js ——一个基于浏览器环境的数据采集SDK

## 功能点
* 设备信息采集
* 监听页面加载离开
* 监听hash变化
* 监听页面点击
* 监听标签页隐藏显示
* 轮询发送热力图采集数据
* 轮询采集页面特定信息（以手机号为例）

以上功能都是精简后的，只作为demo展示，实际使用需要自身的业务场景酌情添加代码。

## 解决开发痛点
* 用webpack打包代码，支持模块化开发
* 用core-js提供pollyfill环境，支持es6语法
* 用eslint+standard规范代码风格，提升代码可读性和可维护性
* 提供了完善的测试页面，方便开发调试

## 浏览器支持
所有现代浏览器 和 IE8+.

## 技术栈思维导图
![avatar](/tech-stack.png)

## 项目结构
```
.
+-- server            //服务端测试demo
+-- spa-angular       //angular测试demo
+-- spa-react         //react测试demo
+-- spa-vue           //vue测试demo
+-- config            //webpack配置
+-- src               //项目源码
|   +-- common        //通用模块
|   +-- config        //配置模块
|   +-- core          //核心模块，业务代码都在这个目录下
|       +-- interval  //轮询相关业务代码
|       +-- listener  //监听相关业务代码
|       +-- index.js  //入口文件
|       +-- params.js //封装了对请求参数的相关操作
|       +-- sender.js //封装了ajax和websocket请求
+-- test              //单元测试
+-- package.json
```

## 接入方式

```javascript
(function() {
  var collect = document.createElement('script');
  collect.type = 'text/javascript';
  collect.async = true;
  collect.src =  '/index.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(collect, s);
})();

var _XT = [];

_XT.push(['token','custom token']);
_XT.push(['channelCode','custom channelCode']);
_XT.push(['serverUrl', 'http://localhost:8081/api'])
_XT.push(['wsUrl', 'ws://localhost:8081'])
```

## 配置说明
| 字段名称         | 类型    |  说明 |
| --------        | :-----:  | :----: | 
| serverUrl       | string      |   http服务端地址   |
| wsUrl           | string      |  websocket服务端地址   |
| token           | string      |  用于服务端鉴权    |
| channelCode     | string      |  用于区分不同的业务方    |
| heatmapUrls     | array      |     热力图采集页面配置   |
| heatMapDelay    | string      |     热力图采集数据发送时间间隔     |
| phoneListDelay  | string      |     手机号轮询采集时间间隔   |
| iframe          | string      | iframe地址，用于跨域共享数据   |

## 采集字段说明
| 字段名称         | 类型    |  说明 |
| --------        | :-----:  | :----: | 
| deviceType       | string      |   设备类型   |
| language           | string      |  浏览器语言类型   |
| screenHigh           | string      |  屏幕高度    |
| screenWide     | string      |  屏幕宽度    |
| type     | string      |     采集事件类型   |
| currentTime     | number      |     当前时间戳   |
| title    | string      |     当前页面标题     |
| url  | string      |     当前页面URL   |
| referrer          | string      | 来源页URL   |
| data     | object      |  采集事件的额外信息    |
| channelCode    | string      |     用于区分不同的业务方     |
| token  | string      |     用于服务端鉴权   |
| deviceId          | string      | 设备ID   |
| userId          | string      | 用户ID   |

## 安装依赖
```bash
npm install
```

## 开发环境启动
```bash
npm run dev
```

## 生产环境构建
```
npm run build
```

## 服务端启动
```
npm run server
```

## 单页应用构建
```bash
## angular
cd spa-angular
npm run build

## react
cd spa-react
npm run build

## vue
cd spa-vue
npm run build
```

## 服务端测试demo
为方便开发环境调试，我用node写了一个简易的服务端项目，其中实现了以下功能点：

* http服务
* websocket服务
* 服务端渲染测试demo
* 单页应用测试demo（包括vue、react、angular）

## 参考项目
* https://github.com/bailinlin/web-sdk
* https://github.com/534591395/smart_web_data_sdk
* https://github.com/sensorsdata/sa-sdk-javascript

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Jiqin (drafish) Ding