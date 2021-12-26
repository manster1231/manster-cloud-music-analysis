<template>
  <div class="com-container">
    <div class="com-chart" ref="china_ref"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import cityJson from "@/data/city.json";
import axios from 'axios';
export default {
  data() {
    return {
      isActive: false,
      isActive2: true,
      chartInstance: null,
      allData: [],
      existingData: [],
    };
  },
  mounted() {
    this.initChart()
    this.getData()
  },
  methods: {
    // 获取服务器数据
    getData() {
      const existingResult = cityJson.city.map(item => ({
        name: item.province,
        value: item.count
      }));
      this.existingData = existingResult;
    },
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.china_ref);
      const ret = await axios.get(
        "http://localhost:8081/static/map/china.json"
      );
      this.$echarts.registerMap("china", ret.data);

      // 对图标初始化配置控制
      const initOption = {
        tooltip: {
          trigger: "item",
          formatter: function(e, t, n) {
            return "地区：" + e.name + "<br />" + "人数：" + e.value;
          },
          textStyle: {
            fontSize: 10
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 10,
          bottom: 60,
          showLabel: true,
          textStyle: {
            color: "#ccc",
            fontSize: 10
          },
          itemWidth: 10,
          itemHeight: 10,
          pieces: [
            {
              gte: 10000,
              label: "≥ 10000",
              color: "#7f7fff",
              symbol: "roundRect"
            },
            {
              gte: 1000,
              lte: 9999,
              label: "1000 - 9999",
              color: "#7fbfff",
              symbol: "roundRect"
            },
            {
              gte: 100,
              lt: 1000,
              label: "100 - 999",
              color: "#a3d1ff",
              symbol: "roundRect"
            },
            {
              gt: 9,
              lt: 100,
              label: "10 - 99",
              color: "#b7dbff",
              symbol: "roundRect"
            },
            {
              gt: 0,
              lt: 10,
              label: "1 - 9",
              color: "#d1e8ff",
              symbol: "roundRect"
            },
            {
              value: 0,
              color: "#fff",
              symbol: "roundRect"
            }
          ],
          show: true
        },
        geo: {
          type: "map",
          map: "china",
          roam: true,
          zoom: 1.2,
          label: {
            normal: {
              show: true,
              fontSize: 10,
              color: "#fff"
            }
          },
          itemStyle: {
            normal: {
              // 地图省份的背景颜色
              areaColor: "rgba(20, 41, 87,0.6)",
              // borderColor: "#195BB9",
              borderColor: "#D3D3D3",
              borderWidth: 0.5,
              opacity: 0.7
            },
            emphasis: {
              areaColor: "#D3D3D3",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            data: this.existingData
          }
        ]
      };
      this.chartInstance.setOption(initOption);
    }
  }
};
</script>

<style lang="less" scoped>
.head {
  display: block;
  text-align: center;
}

span {
  color: #ccc;
  font-size: 12px;
}

.change {
  color: #ccc;
  font-size: 12px;
  cursor: pointer;
}

.changs {
  color: #ffb6c1;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
}
</style>