<template>
  <div>
    <div class="chart-container">
      <div id="chart" ref="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import genderJson from "@/data/gender.json";
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
        series: [
          {
            type: "pie",
            data: [
              {
                value: genderJson.gender[0].count,
                name: genderJson.gender[0].sex
              },
              {
                value: genderJson.gender[1].count,
                name: genderJson.gender[1].sex
              },
              {
                value: genderJson.gender[2].count,
                name: genderJson.gender[2].sex
              }
            ],
            roseType: "area"
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        }
      };
      mychart.setOption(option);
    }
  }
};
</script>