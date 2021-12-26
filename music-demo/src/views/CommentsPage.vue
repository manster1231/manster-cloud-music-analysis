<template>
  <div>
    <div class="chart-container">
      <div id="chart" ref="chart" style="height:500px;width:100%" />
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import commentsJson from "@/data/comments.json";
export default {
  mounted() {
    this.setChart();
  },
  methods: {
    // 设置图表参数
    setChart() {
      // 基于准备好的dom，初始化echarts实例
      var mychart = this.$echarts.init(this.$refs.chart);
      let colorList = [
        "#CF4645",
        "#B580B2",
        "#29008A",
        "#146A90",
        "#8956FF",
        "#70C9A8",
        "#bfbfbf",
        "#595959",
        "#40a9ff",
        "#1890ff",
        "#ffd666",
        "#ffc53d",
        "#ffc53d",
        "#ffc069",
        "#ffa940",
        "#fa8c16",
        "#eccbd9",
        "#ffadad",
        "#ff6392",
        "#ffc09f",
        "#ffcb77",
        "#ffe066",
        "#ffd53e",
        "#ffda3d",
        "#adf7b6",
        "#a0e8af",
        "#80ed99",
        "#07beb8",
        "#17c3b2",
        "#48cae4",
        "#97d2fb",
        "#83bcff",
        "#91e5f6",
        "#9381ff"
      ];
      let colorListLen = colorList.length;
      let fontSizeList = [
        12,
        12.5,
        13,
        13.5,
        14,
        14.5,
        15,
        15.5,
        16,
        16.5,
        17,
        17.5,
        18,
        18.5,
        19,
        19.5,
        20,
        20.5,
        21,
        22,
        23,
        24
      ];
      let fontSizeListLen = fontSizeList.length;
      let customLabel = {
        color: colorList[Math.floor(Math.random() * colorListLen)],
        fontSize: fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
      };
      let bgColor = "#fffcf9";
      let canDraggable = false;
      // 指定图表的配置项和数据
      let option = {
        backgroundColor: "#fffcf9",
        color: ["#37A2DA", "#32C5E9", "#67E0E3"],
        title: {
          show: false,
          text: "一天的时间流逝",
          x: "center",
          y: "bottom",
          // 文字的颜色,默认 #333。
          color: "#666",
          fontSize: 24
        },
        toolbox: {
          show: true,
          feature: {
            // dataView: {readOnly: false},
            // magicType: {type: ['line', 'bar']},
            restore: {}
            // saveAsImage: {}
          }
        },
        itemStyle: {
          color: bgColor
        },
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 80,
              edgeLength: 10
            },
            roam: "scale",
            // symbol: '',
            // symbolSize: 0,
            label: {
              show: true,
              color: "auto",
              fontSize: 14
            },
            data: [
              {
                name: commentsJson.words[0].name,
                value: commentsJson.words[0].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[1].name,
                value: commentsJson.words[1].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[2].name,
                value: commentsJson.words[2].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[3].name,
                value: commentsJson.words[3].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[4].name,
                value: commentsJson.words[4].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[5].name,
                value: commentsJson.words[5].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[6].name,
                value: commentsJson.words[6].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[7].name,
                value: commentsJson.words[7].name,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[8].name,
                value: commentsJson.words[8].value,
                draggable: canDraggable,
                itemStyle: {
                  color: bgColor
                },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              },
              {
                name: commentsJson.words[9].name,
                value: commentsJson.words[9].value,
                draggable: canDraggable,
                // itemStyle: {
                //     color: bgColor
                // },
                label: {
                  color: colorList[Math.floor(Math.random() * colorListLen)],
                  fontSize:
                    fontSizeList[Math.floor(Math.random() * fontSizeListLen)]
                }
              }
            ]
          }
        ]
      };
      mychart.setOption(option);
    }
  }
};
</script>