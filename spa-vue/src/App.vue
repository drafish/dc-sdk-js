<template>
  <div id="app">
    <div class="sidebar">
      <ul>
        <li>
          <a href="/">首页</a>
        </li>
        <li>
          <a href="/demoA">demoA</a>
        </li>
        <li>
          <a href="/demoB">demoB</a>
        </li>
        <li>
          <a href="/demoC">demoC</a>
        </li>
        <li>
          <a href="/phoneList">手机号</a>
        </li>
        <li>
          <a href="/heatMap">热力图</a>
        </li>
        <li>
          <a href="/angular/index.html">angular</a>
        </li>
        <li>
          <a href="/react/index.html">react</a>
        </li>
        <li>
          <a href="/vue/index.html">vue</a>
        </li>
      </ul>
    </div>
    <div class="container">
      <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
      </p>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  created: function() {
    console.log("app.vue created");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.sidebar {
  width: 200px;
  float: left;
}

.container {
  width: 70%;
  float: left;
}
</style>
