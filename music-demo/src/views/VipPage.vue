<template>
  <div>
    <div class="chart-container">
      <div id="chart" ref="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import vipJson from "@/data/vip.json";
export default {
  mounted() {
    this.setChart();
  },
  methods: {
    // 设置图表参数
    setChart() {
      let v1 = [];
      let v2 = [];
      let v3 = [];

      for (let i = 0; i < vipJson.vip.length; i++) {
        switch (vipJson.vip[i].viptype) {
          case "普通会员":
            {
              v1.push(vipJson.vip[i].count);
            }
            break;
          case "普通用户":
            {
              v2.push(vipJson.vip[i].count);
            }
            break;
          case "黑胶会员":
            {
              v3.push(vipJson.vip[i].count);
            }
            break;
        }
      }
      // 基于准备好的dom，初始化echarts实例
      var mychart = this.$echarts.init(this.$refs.chart);
      // 指定图表的配置项和数据
      let option = {
        xAxis: [
          {
            type: "category",
            data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              color: "#fff"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "普通用户",
            type: "bar",
            barWidth: 20,
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            data: v1
          },
          {
            name: "普通会员",
            type: "bar",
            barWidth: 20,
            stack: "对比",
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            data: v2
          },
          {
            name: "黑胶会员",
            type: "bar",
            barWidth: 20,
            stack: "对比1",
            label: {
              normal: {
                show: true,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            data: v3
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["普通用户", "普通会员", "黑胶会员"],
          textStyle: {
            color: "#fff"
          }
        }
      };
      mychart.setOption(option);
    }
  }
};
</script>