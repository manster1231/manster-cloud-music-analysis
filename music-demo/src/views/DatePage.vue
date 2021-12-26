<template>
  <div>
    <div class="chart-container">
      <div id="chart" ref="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import dateJson from "@/data/date.json";
export default {
  mounted() {
    this.setChart();
  },
  methods: {
    // 设置图表参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      var mychart = this.$echarts.init(this.$refs.chart);
      // 指定图表的配置项和数据
      let option = {
        xAxis: {
          data: dateJson.dates.map(x => {
            return x.date;
          })
        },
        yAxis: {},
        series: [
          {
            data: dateJson.dates.map(x => {
              return x.count;
            }),
            type: "line",
            smooth: true
          }
        ],
        tooltip: {
          //鼠标悬浮弹出提示框
          trigger: "axis", //提示框弹出的触发时间，折线图和柱状图为axis
          formatter: "{a} <br/>{b} : {c} " //提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值
        }
      };
      mychart.setOption(option);
    }
  }
};
</script>