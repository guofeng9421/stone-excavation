//饼图函数
export function pie(ObjectName) {
    return {
        title: {
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            textStyle: {
                color: "#fff"
            },
        },
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [ObjectName],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
}

//柱状图
export function bar(lineBad, lineVital) {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color: ['#5bc49f', '#ff7c7c', '#60acfc', '#feb64d', '#32d3eb', '#ff7c7c', '#9287e7', '#3F77FE', '#12ED93', '#189CBF'],
        legend: {
            data: ['已销项问题', '未销项问题'],
            textStyle: {
                color: "#fff"
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['斜坡'], //值
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
        }],
        yAxis: [{
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#113d5e'
                }
            },
        }],
        series: [{
                name: '已销项问题',
                type: 'bar',
                stack: '广告',
                center: ['50%', '50%'],
                data: lineBad
            },
            {
                name: '未销项问题',
                type: 'bar',
                stack: '广告',
                data: lineVital
            },
        ]
    }
}

//月销折线图
export function line(lineY) {
    return {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            confine: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2022-09-01', '2022-09-09', '2022-09-17'],
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
        },
        color: ['#60acfc'],
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#113d5e'
                }
            },
        },
        series: [{
            data: lineY,
            type: 'line',
            smooth: true,
            areaStyle: {
                normal: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: "rgba(220,56,129,0.6)" // 0% 处的颜色
                        }, {
                            offset: 0.7,
                            color: "#60acfc" // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
        }]
    };
}

//质量问题趋势折线图
export function lines( num1, num2, num3) {
    return {
        legend: {
            data: ['一般', '紧要', '严重'],
            top: 5,
            textStyle: {
                color: "#fff"
            },
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            },
            confine: true,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2022-09-01', '2022-09-09', '2022-09-17'],
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#113d5e'
                }
            },
        },
        color: ['#60acfc', '#e0db63', '#dc3881'],
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: '#113d5e'
                }
            },
        },
        series: [{
            name: '一般',
            data: num1,
            type: 'line',
            smooth: true,
        }, {
            name: '紧要',
            data: num2,
            type: 'line',
            smooth: true,
        }, {
            name: '严重',
            data: num3,
            type: 'line',
            smooth: true,
        }]
    }
}