<!--
 * @Author: your name
 * @Date: 2020-07-30 14:33:30
 * @LastEditTime: 2020-07-30 20:42:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\components\charts\BarChart.vue
-->

<template>
  <div id="bar"></div>
</template>

<script>
import { Chart } from "@antv/g2";
import { updateToBarChart } from "../../network/otxData";
export default {
  name: "BarChart",
  mounted() {
    console.log("BarChart");
    this.draw();
  },
  methods: {
    draw() {
      updateToBarChart().then((res) => {
        console.log("res: ", res);
        const data=res.data.data
        console.log('data: ', data);
        const chart = new Chart({
          container: "bar",
          autoFit: true,
          height: 500,
        });

        chart.data(data);
        chart.scale("count", {
          nice: true,
        });
        chart.tooltip({
          shared: true,
          showMarkers: false,
        });

        chart
          .interval()
          .position("name*count")
          .color("state")
          .adjust("stack");

        chart.interaction("active-region");

        chart.render();
      });
    },
  },
};
</script>

<style></style>
