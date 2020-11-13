<!--
 * @Author: your name
 * @Date: 2020-07-21 20:14:41
 * @LastEditTime: 2020-07-29 16:30:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\Layout\index.vue
-->
<template>
  <el-container style="height: 100vh">
    <el-header height="100px">
      <div class="logo-title">
        <img src="../assets/logo.png"  height="100px"/>
        <h2>OTX管理系统</h2>
      </div>
      <el-button type="text" icon="el-icon-switch-button" @click="LoginOut"
        >退出</el-button
      >
    </el-header>

    <el-container>
      <el-aside width="200px" style="background-color:  rgb(238, 241, 246)" align="left">
        <!-- router :是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu
          router
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-view"></i>
              <span slot="title">可视化图</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/Chart">Chart</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-edit"></i>
            <span slot="title">表格</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Table">Table</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
        
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Layout",
  methods: {
    LoginOut() {
      sessionStorage.clear();
      this.$router.push("/Login");
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #11131f, #252a40);
  color: #eee;
}
.logo-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

