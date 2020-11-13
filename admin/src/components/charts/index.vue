<!--
 * @Author: your name
 * @Date: 2020-07-30 14:38:41
 * @LastEditTime: 2020-07-30 16:52:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\components\charts\index.vue
-->

<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <PieChart />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <BarChart />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from "./PieChart";
import BarChart from "./BarChart";
export default {
  name: "Chart",
  components: {
    PieChart,
    BarChart
  },
};
</script>

<style scoped lang="less">
.container{
    height: 100%;
    background: rgb(238, 241, 246);
}
</style>
