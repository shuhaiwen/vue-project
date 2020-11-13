<!--
 * @Author: your name
 * @Date: 2020-07-15 10:11:10
 * @LastEditTime: 2020-07-21 16:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\views\Home.vue
--> 
<template>
  <div class="home">
    <Pie/>
    
  </div>
</template>

<script>
// @ is an alias to /src

import Pie from '../components/charts/Pie'
export default {
  name: "Home",
  components: {
    Pie
  }
};
</script>
