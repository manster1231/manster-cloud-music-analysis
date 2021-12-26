function provincesload() {
    try {
        let myDiTu1 = echarts.init(document.getElementById('DiTu1'));
        const url = "static/provinces.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        const request = new XMLHttpRequest();
        request.open("get", url, true);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
                var json = JSON.parse(request.responseText);
                // 地图
                let data = json.provinces
                let geoCoordMap = {
                    '北京': [116.4053, 39.9050],
                    "天津": [117.1902, 39.1256],
                    "河北": [114.5025, 38.0455],
                    "山西": [112.5492, 37.8570],
                    '内蒙古': [111.7520, 40.8415],
                    "辽宁": [123.4291, 41.7968],
                    "吉林": [125.3245, 43.8868],
                    '黑龙江': [126.6425, 45.7570],
                    '上海': [121.4648, 31.2891],
                    "江苏": [118.8062, 31.9208],
                    "浙江": [119.5313, 29.8773],
                    "安徽": [117.29, 32.0581],
                    "福建": [119.4543, 25.9222],
                    "江西": [116.0046, 28.6633],
                    "山东": [117.0009, 36.6758],
                    "河南": [113.4668, 34.6234],
                    "湖北": [114.3896, 30.6628],
                    "湖南": [113.0823, 28.2568],
                    "广东": [113.12244, 23.009505],
                    "广西": [108.479, 23.1152],
                    "海南": [110.3893, 19.8516],
                    "重庆": [106.5050, 29.5332],
                    "四川": [103.9526, 30.7617],
                    "贵州": [106.6992, 26.7682],
                    "云南": [102.9199, 25.4663],
                    "西藏": [91.11, 29.97],
                    "陕西": [109.1162, 34.2004],
                    "甘肃": [103.8342, 36.0614],
                    "青海": [101.7778, 36.6173],
                    "宁夏": [106.2325, 38.4864],
                    "新疆": [87.9236, 43.5883],
                    '台湾': [121.5135, 25.0308],
                    "香港": [114.08, 22.20],
                    '澳门': [113.33, 22.13],

                };

                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
                let option3 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            if (typeof (params.value)[2] == "undefined") {
                                return params.name + ' : ' + params.value;
                            } else {
                                return params.name + ' : ' + params.value[2];
                            }
                        }
                    },
                    legend: {
                        left: 'left',
                        // data: ['强', '中', '弱'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },

                    geo: {
                        map: 'china',
                        show: true,
                        roam: true,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#3a7fd5',
                                borderColor: '#0a53e9',//线
                                shadowColor: '#092f8f',//外发光
                                shadowBlur: 20
                            },
                            emphasis: {
                                areaColor: '#0a2dae',//悬浮区背景
                            }
                        }
                    },
                    series: [
                        {
                            symbolSize: 5,
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#fff'
                                }
                            },
                            // name: 'light',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData(data),

                        },
                        {
                            type: 'map',
                            map: 'china',
                            geoIndex: 0,
                            aspectScale: 0.75, //长宽比
                            showLegendSymbol: false, // 存在legend时显示
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            },
                            roam: true,
                            itemStyle: {
                                normal: {
                                    areaColor: '#031525',
                                    borderColor: '#FFFFFF',
                                },
                                emphasis: {
                                    areaColor: '#2B91B7'
                                }
                            },
                            animation: false,
                            data: data
                        },
                        {
                            // name: 'Top 5',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin',
                            symbolSize: [50, 50],
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 9,
                                    },
                                    formatter(value) {
                                        return value.data.value[2]
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#D8BC37', //标志颜色
                                }
                            },
                            data: convertData(data),
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            zlevel: 1
                        },

                    ]
                };
                myDiTu1.clear()
                myDiTu1.setOption(option3);
            }
        }
    } catch (err) {
        console.log(err)
    }
}

function ageonload() {
    let mytu8 = echarts.init(document.getElementById('tu8'));

    const url = "static/age.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url, true);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            let json = JSON.parse(request.responseText);
            let option8 = {
                tooltip: {},
                grid: {
                    top: '4%',
                    left: '4%',
                    right: '1%',
                    bottom: '4%',
                    containLabel: true,
                },
                // legend: {
                //     itemGap: 50,
                //     data: ['人数'],
                //     textStyle: {
                //         color: '#f9f9f9',
                //         borderColor: '#fff'
                //     },
                // },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#233e64'
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        interval: 0,
                        rotate:15,
                        textStyle: {
                            color: '#d1e6eb',
                            margin: 15,
                            fontSize:10
                        },

                    },
                    axisTick: {
                        show: false,
                    },
                    data: [json.age[0].name + '1-6岁', json.age[1].name + '7-17岁', json.age[2].name + '18-28岁', json.age[3].name + '29-40岁', json.age[4].name + '41-65岁'],
                }],
                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 7,
                    splitLine: {//y轴上的y轴线条相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64'
                        }
                    },
                    axisLine: {//y轴的相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64' //y轴颜色
                        },
                    },
                    axisLabel: {//y轴的标签相关设置
                        textStyle: {
                            color: '#6a9cd5',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{
                    // name: '人数',
                    type: 'bar',
                    barWidth: 18,
                    tooltip: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#41E1D4' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#10A7DB' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                            shadowBlur: 4,
                        }
                    },
                    data: [json.age[0].value, json.age[1].value, json.age[2].value, json.age[3].value, json.age[4].value]
                }
                ]
            };
            mytu8.clear()
            mytu8.setOption(option8);
        }
    }
}

function genderload() {
    let mysdtu = echarts.init(document.getElementById('sdtu'));

    let colorArr = ["#218de0", "#01cbb3", "#85e647", "#5d5cda", "#05c5b0", "#c29927"];
    let colorAlpha = ['rgba(60,170,211,0.1)', 'rgba(1,203,179,0.1)', 'rgba(133,230,71,0.1)', 'rgba(93,92,218,0.1)', 'rgba(5,197,176,0.1)', 'rgba(194,153,39,0.1)']

    const url = "static/gender.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url, true);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            let json = JSON.parse(request.responseText);
            let option2 = {
                // backgroundColor:"#090e36",
                grid: {
                    left: 30,
                    top: 60,
                    bottom: 30,
                    right: 10,
                    containLabel: true
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    show: false
                },

                polar: {},
                angleAxis: {
                    interval: 1,
                    type: 'category',
                    data: [],
                    z: 10,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B4A6B",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        show: true,
                        color: "#0B4A6B",
                        margin: 8,
                        fontSize: 16
                    },
                },
                radiusAxis: {
                    min: 20,
                    max: 120,
                    interval: 20,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#0B3E5E",
                            width: 1,
                            type: "solid"
                        },
                    },
                    axisLabel: {
                        formatter: '{value} %',
                        show: false,
                        padding: [0, 0, 20, 0],
                        color: "#0B3E5E",
                        fontSize: 16
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#07385e",
                            width: 2,
                            type: "dashed"
                        }
                    }
                },
                calculable: true,
                series: [{
                    stack: 'a',
                    type: 'pie',
                    radius: '70%',
                    roseType: 'radius',
                    zlevel: 10,
                    startAngle: 100,
                    label: {
                        normal: {
                            textStyle: {
                                color: "rgba(255, 255, 255)"
                            },
                            formatter: ['{b}', '{d}%'].join('\n'),
                            rich: {
                                b: {
                                    color: '#fff',
                                    fontSize: 14,
                                    lineHeight: 20
                                },
                                d: {
                                    color: '#fff',
                                    fontSize: 14,
                                    height: 20
                                },
                            },
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10,
                            length2: 45,
                            lineStyle: {
                                color: '#aaa'

                            }
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    data: [{
                        value: json.gender[0].value,
                        name: json.gender[0].name,
                        itemStyle: {
                            normal: {
                                borderColor: colorArr[0],
                                borderWidth: 2,
                                shadowBlur: 20,
                                shadowColor: "#41a8f8",
                                shadowOffsetx: 25,
                                shadowOffsety: 20,
                                color: colorAlpha[0]
                            },
                        }
                    },
                        {
                            value: json.gender[1].value,
                            name: json.gender[1].name,
                            itemStyle: {
                                normal: {
                                    borderColor: colorArr[1],
                                    borderWidth: 2,
                                    shadowBlur: 20,
                                    shadowColor: colorArr[1],
                                    shadowOffsetx: 25,
                                    shadowOffsety: 20,
                                    color: colorAlpha[1]
                                },
                            }
                        },
                        {
                            value: json.gender[2].value,
                            name: json.gender[2].name,
                            itemStyle: {
                                normal: {
                                    borderColor: colorArr[2],
                                    borderWidth: 2,
                                    shadowBlur: 20,
                                    shadowColor: colorArr[2],
                                    shadowOffsetx: 25,
                                    shadowOffsety: 20,
                                    color: colorAlpha[2]
                                },
                            }
                        }]
                },]

            }
            mysdtu.clear()
            mysdtu.setOption(option2);
        }
    }
}

function dayload() {
    let mytu6 = echarts.init(document.getElementById('tu6'));

    const url = "static/times.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url, true);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText);
            var xAxis = []
            var yAxis = []
            for (var i = 0; i < json.times.length; i++) {
                xAxis.push(json.times[i].name);
                yAxis.push(json.times[i].value);
            }
            let option6 = {
                // backgroundColor:'#050d19',
                title: {
                    textStyle: {
                        color: "#6a9cd5",
                    },
                    // text:'量表测评',
                    left: "center",
                },

                tooltip: {//鼠标悬浮弹出提示框
                    trigger: 'axis', //提示框弹出的触发时间，折线图和柱状图为axis
                    formatter: "{a} <br/>{b} : {c} "//提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值
                },
                grid: {//统计图距离边缘的距离
                    top: '5%',
                    left: '10%',
                    right: '5%',
                    bottom: '15%'
                },
                xAxis: [{//x轴
                    type: 'category',//数据类型为不连续数据
                    boundaryGap: false,//坐标轴两边是否留白
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#233e64' //x轴颜色
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    axisTick: {show: true,},//刻度点数轴
                    data: xAxis,
                }],
                yAxis: [{//y轴的相关设置
                    type: 'value',//y轴数据类型为连续的数据
                    min: 0,//y轴上的刻度最小值
                    // max: 140,//y轴上的刻度最大值
                    splitNumber: 7,//y轴上的刻度段数
                    splitLine: {//y轴上的y轴线条相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64'
                        }
                    },
                    axisLine: {//y轴的相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64' //y轴颜色
                        },
                    },
                    axisLabel: {//y轴的标签相关设置
                        textStyle: {
                            color: '#6a9cd5',
                        },
                    },
                    axisTick: {show: true,},  //刻度点数轴
                }],
                series: [{
                    name: '人数',
                    type: 'line',//统计图类型为折线图
                    smooth: true, //是否平滑曲线显示
                    symbolSize: 0,//数据点的大小，[0,0]//b表示宽度和高度
                    lineStyle: {//线条的相关设置
                        normal: {
                            color: "#3deaff"   // 线条颜色
                        }
                    },
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgba(61,234,255, 0.9)'},
                                {offset: 0.8, color: 'rgba(61,234,255, 0)'}
                            ], false),

                            shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: yAxis
                }]
            };
            mytu6.clear()
            mytu6.setOption(option6);
        }
    }
}

function wordcloudload(data) {
    try {
        let chart = echarts.init(document.getElementById('main'));
        // var colorArr=["#218de0", "#01cbb3", "#85e647", "#5d5cda", "#05c5b0", "#c29927"];
        let maskImage = new Image();
        maskImage.src = 'static/dituciyun.png';
        // const url = "static/words.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        // const request = new XMLHttpRequest();
        // request.open("get", url, true);/*设置请求方法与路径*/
        // request.send(null);/*不发送数据到服务器*/
        // request.onload = function () {/*XHR对象获取到返回信息后执行*/
        //     if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
        //         let json = JSON.parse(request.responseText);
        //         console.log(json.words)
        //
        //     }
        // }
        let option = {
            tooltip: {},
            series: [{
                name: '评论热词',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                // sizeRange: [12, 80],
                sizeRange: [10, 80],
                rotationRange: [-90, 90],
                rotationStep: 45,
                gridSize: 2,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                //textRotation: [0, 45, 90, -45],
                // rotationRange: [-45, 90],
                //shape: 'smooth',
                maskImage: maskImage,
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function () {
                            var colors = ["#88cc81", "#ec9e12", '#fddb7e', '#735ba1', '00effc', '#bda29a', '#00ecfb', '#2667f7', '#ff6a81', '#81cacc', '#fda67e', '#c4ccd3'];
                            return colors[parseInt(Math.random() * 12)];
                        }
                    },

                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333',
                        color: '#fff',
                    }
                },
                data: data.words
            }]
        };

        maskImage.onload = function () {
            option.series[0].maskImage
            chart.clear()
            chart.setOption(option);
        }
    } catch (err) {
        console.log(err)
    }
}

function vipload() {
    let mytu7 = echarts.init(document.getElementById('tu7'));

    const url = "static/vip.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url, true);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            let json = JSON.parse(request.responseText);
            let xAxis_v = [];
            let xAxis_p = []
            let xAxis_vip = []
            for (let i = 0; i < json.vip.length; i++) {
                switch (json.vip[i].viptype) {
                    case "普通会员": {
                        xAxis_v.push(json.vip[i].value)
                    }
                        break;
                    case "普通用户": {
                        xAxis_p.push(json.vip[i].value)
                    }
                        break;
                    case "黑胶会员": {
                        xAxis_vip.push(json.vip[i].value)
                    }
                        break;
                }
            }

            let option7 = {
                // backgroundColor: '#00265f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['普通用户', '普通会员', '黑胶会员'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    top: '4%',
                    left: '1%',
                    right: '4%',
                    bottom: '4%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#233e64'
                            }
                        },
                        axisLabel: {
                            color: '#fff',
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {//y轴上的y轴线条相关设置
                            show: true,
                            lineStyle: {
                                color: '#233e64'
                            }
                        },
                        axisLine: {//y轴的相关设置
                            show: true,
                            lineStyle: {
                                color: '#233e64' //y轴颜色
                            },
                        },
                        axisLabel: {//y轴的标签相关设置
                            textStyle: {
                                color: '#6a9cd5',
                            },
                        },
                    }
                ],
                series: [
                    {
                        name: '普通用户',
                        type: 'bar',
                        barWidth: 10,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 10
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#fccb05'
                                }, {
                                    offset: 1,
                                    color: '#000'
                                }]),
                            },
                        },
                        data: xAxis_p
                    },
                    {
                        name: '普通会员',
                        type: 'bar',
                        barWidth: 10,
                        stack: '对比',
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 10
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00C7E1'
                                }, {
                                    offset: 1,
                                    color: '#000'
                                }]),
                                opacity: 1,
                                barBorderRadius: 12,
                            }
                        },
                        data: xAxis_v
                    },
                    {
                        name: '黑胶会员',
                        type: 'bar',
                        barWidth: 10,
                        stack: '对比1',
                        label: {
                            normal: {
                                fontsize:5,
                                show: true,
                                formatter: '{c}',
                                position: "top",
                                textStyle: {
                                    color: "#fff",
                                    fontSize: 10
                                }
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#e8f600'
                                }, {
                                    offset: 1,
                                    color: '#000'
                                }]),
                                opacity: 1,
                                barBorderRadius: 12,
                            }
                        },
                        data: xAxis_vip
                    }

                ]
            };
            mytu7.clear()
            mytu7.setOption(option7);
        }
    }
}

function monthload() {
    let mytu5 = echarts.init(document.getElementById('tu5'));

    const url = "static/dates.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText);
            var xAxis = []
            var yAxis = []
            for (var i = 0; i < json.dates.length; i++) {
                xAxis.push(json.dates[i].name);
                yAxis.push(json.dates[i].value);
            }
            let option5 = {
                // backgroundColor:'#050d19',
                title: {
                    textStyle: {
                        color: "#6a9cd5",
                    },
                    // text:'量表测评',
                    left: "center",
                },

                tooltip: {//鼠标悬浮弹出提示框
                    trigger: 'axis', //提示框弹出的触发时间，折线图和柱状图为axis
                    formatter: "{a} <br/>{b} : {c} "//提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值
                },
                grid: {//统计图距离边缘的距离
                    top: '5%',
                    left: '10%',
                    right: '5%',
                    bottom: '15%'
                },
                xAxis: [{//x轴
                    type: 'category',//数据类型为不连续数据
                    boundaryGap: false,//坐标轴两边是否留白
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#233e64' //x轴颜色
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    axisTick: {show: true,},//刻度点数轴
                    data: xAxis,
                }],
                yAxis: [{//y轴的相关设置
                    type: 'value',//y轴数据类型为连续的数据
                    min: 0,//y轴上的刻度最小值
                    // max: 140,//y轴上的刻度最大值
                    splitNumber: 7,//y轴上的刻度段数
                    splitLine: {//y轴上的y轴线条相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64'
                        }
                    },
                    axisLine: {//y轴的相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64' //y轴颜色
                        },
                    },
                    axisLabel: {//y轴的标签相关设置
                        textStyle: {
                            color: '#6a9cd5',
                        },
                    },
                    axisTick: {show: true,},  //刻度点数轴
                }],
                series: [{
                    name: '人数',
                    type: 'line',//统计图类型为折线图
                    smooth: true, //是否平滑曲线显示
                    symbolSize: 0,//数据点的大小，[0,0]//b表示宽度和高度
                    lineStyle: {//线条的相关设置
                        normal: {
                            color: "#3deaff"   // 线条颜色
                        }
                    },
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {offset: 0, color: 'rgba(61,234,255, 0.9)'},
                                {offset: 0.8, color: 'rgba(61,234,255, 0)'}
                            ], false),

                            shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: yAxis
                }]
            }
            mytu5.clear()
            mytu5.setOption(option5);
        }
    }
}

function songsheatload() {
    let myxslb = echarts.init(document.getElementById('xslb'));

    let colorArr = ["#218de0", "#01cbb3", "#85e647", "#5d5cda", "#05c5b0", "#c29927"];
    let colorAlpha = ['rgba(60,170,211,0.1)', 'rgba(1,203,179,0.1)', 'rgba(133,230,71,0.1)', 'rgba(93,92,218,0.1)', 'rgba(5,197,176,0.1)', 'rgba(194,153,39,0.1)']

    const url = "static/songs.json";/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    const request = new XMLHttpRequest();
    request.open("get", url, true);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status === 200) {/*返回状态为200，即为数据获取成功*/
            var json = JSON.parse(request.responseText);
            var xAxis = []
            var yAxis = []
            for (var i = 0; i < json.songs.length; i++) {
                xAxis.push(json.songs[i].name);
                yAxis.push(json.songs[i].value);
            }
            let option1 = {
                // backgroundColor: "#05224d",
                tooltip: {},
                grid: {
                    top: '8%',
                    left: '4%',
                    right: '4%',
                    bottom: '35%',
                    containLabel: true,
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { //坐标轴轴线相关设置。数学上的x轴
                        show: true,
                        lineStyle: {
                            color: '#0a3256',
                            fontSize: 12,
                        },
                    },
                    axisLabel: { //坐标轴刻度标签的相关设置
                        interval: 0,
                        rotate:40,
                        textStyle: {
                            color: '#d1e6eb',
                            margin: 15,
                            fontSize: 12,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    data: xAxis,
                }],
                yAxis: [{
                    type: 'value',
                    min: 0,
                    // max: 140,
                    splitNumber: 7,
                    splitLine: {//y轴上的y轴线条相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64'
                        }
                    },
                    axisLine: {//y轴的相关设置
                        show: true,
                        lineStyle: {
                            color: '#233e64' //y轴颜色
                        },
                    },
                    axisLabel: {//y轴的标签相关设置
                        textStyle: {
                            color: '#6a9cd5',
                        },
                    },
                    axisTick: {
                        show: false,
                    },
                }],
                series: [{

                    //   name: '社团人数',
                    type: 'bar',
                    barWidth: 16,
                    tooltip: {
                        show: false
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#fff',
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#41E1D4' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#10A7DB' // 100% 处的颜色
                            }], false),
                            barBorderRadius: [30, 30, 0, 0],
                            shadowBlur: 4,
                        }
                    },
                    data: yAxis
                }]
            };
            myxslb.clear()
            myxslb.setOption(option1);
        }
    }
}