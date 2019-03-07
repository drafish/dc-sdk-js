import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

let domainUrl = 'localhost:8080'
// let domainUrl = 'testcollect.fengdai.org'; // 测试环境是 'testcollect.fengdai.org',生产环境是 'collect.trc.com',开发人员上线时候记得修改此配置,可根据自己的情况手动更改或者通过打包命令更改.
let collect = document.createElement('script');
collect.type = 'text/javascript'
collect.src = `//${domainUrl}${sessionStorage.getItem('dcp_version') === 'V2.0.0' ? '/index_2.0.0.js' : '/index.js'}`;
let s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(collect, s);
window._XT = window._XT || []; //定义信息配置对象
window._XT.push(['Target', 'div']); //无埋点行为采集
window._XT.push(['auth', '93c55350e179a3676c905723e112b440']); //处于安全性考虑的传参
// 用户自定义收集字段,现在传的是接入方的渠道码
window._XT.userConfig = {
  dcpChannelCode: 've3dC41i'
}