<!--
 * @Author: your name
 * @Date: 2020-07-21 16:48:50
 * @LastEditTime: 2020-07-30 17:03:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FrontEnd\js\vue\imitate-wzry\admin\src\components\charts\pie.vue
-->
<template>
  <div id="pie"></div>
</template>
<script>
import { Chart } from "@antv/g2";
import { DataView } from "@antv/data-set";
import { updateToPieChart } from "../../network/otxData";
export default {
  name: "PieChart",
  data() {
    return {};
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      updateToPieChart()
        .then((res) => {
          let data = [];
          data.push({
            type: "Term",
            value: res.data.data.term.numDone,
            name: "Term完成",
          });
          data.push({
            type: "Term",
            value: res.data.data.term.numNoDone,
            name: "Term未完成",
          });
          data.push({
            type: "Term",
            value: res.data.data.term.numIgnore,
            name: "Term忽略",
          });
          data.push({
            type: "Action",
            value: res.data.data.action.numDone,
            name: "Action完成",
          });
          data.push({
            type: "Action",
            value: res.data.data.action.numNoDone,
            name: "Action未完成",
          });
          data.push({
            type: "Action",
            value: res.data.data.action.numIgnore,
            name: "Action忽略",
          });
          console.log("data: ", data);
          // 通过 DataSet 计算百分比
          const dv = new DataView();
          dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "type",
            as: "percent",
          });
          const chart = new Chart({
            container: "pie",
            autoFit: true,
            height: 500,
            padding: 0,
          });
          chart.data(dv.rows);
          chart.scale({
            percent: {
              formatter: (val) => {
                val = (val * 100).toFixed(2) + "%";
                return val;
              },
            },
          });
          chart.coordinate("theta", {
            radius: 0.5,
          });
          chart.tooltip({
            showTitle: false,
            showMarkers: false,
          });
          chart.legend(false);
          chart
            .interval()
            .adjust("stack")
            .position("percent")
            .color("type")
            .label("type", {
              offset: -10,
            })
            .tooltip("name*percent", (item, percent) => {
              percent = (percent * 100).toFixed(2) + "%";
              return {
                name: item,
                value: percent,
              };
            })
            .style({
              lineWidth: 1,
              stroke: "#fff",
            });

          const outterView = chart.createView();
          const dv1 = new DataView();
          dv1.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "name",
            as: "percent",
          });

          outterView.data(dv1.rows);
          outterView.scale({
            percent: {
              formatter: (val) => {
                val = (val * 100).toFixed(2) + "%";
                return val;
              },
            },
          });
          outterView.coordinate("theta", {
            innerRadius: 0.5 / 0.75,
            radius: 0.75,
          });
          outterView
            .interval()
            .adjust("stack")
            .position("percent")
            .color("name", [
              "#BAE7FF",
              "#7FC9FE",
              "#71E3E3",
              "#ABF5F5",
              "#8EE0A1",
              "#BAF5C4",
            ])
            .label("name")
            .tooltip("name*percent", (item, percent) => {
              percent = (percent * 100).toFixed(2) + "%";
              return {
                name: item,
                value: percent,
              };
            })
            .style({
              lineWidth: 1,
              stroke: "#fff",
            });

          chart.interaction("element-highlight");

          chart.render();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
