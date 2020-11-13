<!--
 * @Author: your name
 * @Date: 2020-07-15 10:11:10
 * @LastEditTime: 2020-07-29 11:34:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\App.vue
--> 
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html{
  font-size: 16px;
}
body{
  width: 100vw;
  height: 100vh;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
