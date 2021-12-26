<template>
  <div>
    <div class="chart-container">
      <div id="chart" ref="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import ageJson from "@/data/age.json";
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
          data: [
            ageJson.age[0].ageRange + "1-6岁",
            ageJson.age[1].ageRange + "7-17岁",
            ageJson.age[2].ageRange + "18-28岁",
            ageJson.age[3].ageRange + "29-40岁",
            ageJson.age[4].ageRange + "41-65岁"
          ]
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [
              ageJson.age[0].count,
              ageJson.age[1].count,
              ageJson.age[2].count,
              ageJson.age[3].count,
              ageJson.age[4].count
            ],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              shadowBlur: 3
            }
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        }
      };
      mychart.setOption(option);
    }
  }
};
</script>