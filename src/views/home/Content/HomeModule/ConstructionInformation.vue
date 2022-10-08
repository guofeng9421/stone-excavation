<!--环境管理 -->
<template>
    <div class=''>
        <el-row :gutter="5">
            <el-col :span="6">
                <!--平均一周 -->
                <el-card>
                    <p class="barometer">近一周环境概况</p>
                    <el-row :gutter="10">
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">平均PM2.5微克</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">平均PM微10克</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">平均风速m/s</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">平均温度℃</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num">{{TheCurrentEnvironments.tsp}}</div>
                            <div class="words">TSP微克</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">平均湿度%rh</div>
                        </el-col>
                        <el-col class="box">
                            <div class="num"></div>
                            <div class="words">噪音dB</div>
                        </el-col>
                    </el-row>

                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-row :gutter="5">
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.pm2d5}}μg/m³
                                </el-col>
                                <el-col class="word mt mb">当前PM2.5</el-col>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.pm10}}μg/m³
                                </el-col>
                                <el-col class="word mt mb">平均PM10</el-col>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.noise}}dB</el-col>
                                <el-col class="word mt mb">当前噪音</el-col>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.temperature}}℃
                                </el-col>
                                <el-col class="word mt mb">当前温度</el-col>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="5" class="mt">
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.humidity}}%rh
                                </el-col>
                                <el-col class="word mt mb">当前湿度</el-col>
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card>
                                <el-col class="word" style="font-size:15px">{{TheCurrentEnvironments.windspeed}}m/s
                                </el-col>
                                <el-col class="word mt mb">当前风速</el-col>
                            </el-card>
                        </el-col>
                    </el-row>
                    <!-- 24小时曲线图 -->
                    <el-row>
                        <e-charts :option='option' class="graph mt"></e-charts>
                    </el-row>
                </el-card>
                <!-- 晴雨表 -->
                <div class="mt">
                    <el-card>
                        <div class="barometer">晴雨表</div>
                        <div>
                            <iframe allowtransparency="true" frameborder="0" width="100%" height="80%" scrolling="no"
                                src="//tianqi.2345.com/plugin/widget/index.htm?s=2&z=3&t=1&v=0&d=5&bd=0&k=&f=ffffff&ltf=009944&htf=cc0000&q=1&e=1&a=0&c=58465&w=875&h=98&align=center"></iframe>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <p class="barometer">近一个月环境概况</p>
                    <div>
                        <e-charts :option='dashboard' class="dashboard"></e-charts>
                    </div>
                    <div class="Overrun">
                        <div class="mt">本月PM10超标</div>
                        <div class="barometer" style="font-size: 20px;">{{0}}天</div>
                    </div>
                    <div class="Overrun">
                        <div class="mt">本月高温天气</div>
                        <div class="barometer" style="font-size: 20px;">{{6}}天</div>
                    </div>
                    <div class="Overrun">
                        <div class="mt">本月噪音超标</div>
                        <div class="barometer" style="font-size: 20px;">{{8}}天</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    import {
        findByTotal,
        findTian
    } from '@/api/api';
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                TheCurrentEnvironments: '', //当前环境数据
                graphData:'',//24小时曲线
            };
        },
        //计算属性 类似于data概念
        computed: {
            //24小时曲线
            option() {
                var legend = ["温度", "噪音", "PM10", "湿度", "风速"];
                return {

                    title: {
                        text: '24h变化曲线',
                        textStyle: {
                            color: "rgba(255, 255, 255, 1)",
                        },
                    },
                    legend: {
                        top: 20,
                        data: legend,
                        selectedMode: 'single',
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        // data: date,
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
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
                    series: [{
                        name: legend[0],
                        itemStyle: {
                            normal: {
                                color: '#84e4e2', //改变折线点的颜色
                                lineStyle: {
                                    color: '#84e4e2' //改变折线颜色
                                }
                            }
                        },
                        // data: tem,
                        type: 'line',
                        smooth: true
                    }, {
                        name: legend[1],
                        itemStyle: {
                            normal: {
                                color: '#00FF00', //改变折线点的颜色
                                lineStyle: {
                                    color: '#00FF00' //改变折线颜色
                                }
                            }
                        },
                        // data: nvh,
                        type: 'line',
                        smooth: true
                    }, {
                        name: legend[2],
                        itemStyle: {
                            normal: {
                                color: '#FFD700', //改变折线点的颜色
                                lineStyle: {
                                    color: '#FFD700' //改变折线颜色
                                }
                            }
                        },
                        // data: p~ 0,
                        type: 'line',
                        smooth: true
                    }, {
                        name: legend[3],
                        itemStyle: {
                            normal: {
                                color: '#00FFFF', //改变折线点的颜色
                                lineStyle: {
                                    color: '#00FFFF' //改变折线颜色
                                }
                            }
                        },
                        // data: rh,
                        type: 'line',
                        smooth: true
                    }, {
                        name: legend[4],
                        itemStyle: {
                            normal: {
                                color: '#fe8104', //改变折线点的颜色
                                lineStyle: {
                                    color: '#fe8104' //改变折线颜色
                                }
                            }
                        },
                        // data: stp,
                        type: 'line',
                        smooth: true
                    }]
                };
            },
            //近一个月的环境概况
            dashboard() {
                return {
                    title: {
                        text: '空气质量指数',
                        textStyle: {
                            color: "rgba(255, 255, 255, 1)"
                        },
                        left: 'center',
                    },
                    tooltip: {
                        formatter: "{a} <br/> {c}mg/m3"
                    },
                    series: [{
                        name: '空气质量',
                        type: 'gauge',
                        min: 0, // 最小的数据值,默认 0 。映射到 minAngle。
                        max: 500,
                        detail: {
                            formatter: '{value}mg/m3',
                            fontSize: 12
                        },
                        data: [{
                            value: this.TheCurrentEnvironments.pm10 / 1000,
                            name: 'mg/m3'
                        }],
                        title: {
                            show: false,
                            color: "#fff",
                            fontSize: 15
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [0.2, "rgba(0,255,0,0.8)"],
                                    [0.8, "rgba(0,255,255,0.8)"],
                                    [1, "rgba(255,0,0,0.8)"]
                                ],
                                opacity: 1,
                                width: 10,
                                shadowBlur: 10,
                                shadowColor: "#fff"
                            }
                        }
                    }]
                };
            }
        },
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            //当前环境api
            TheCurrentEnvironment() {
                findByTotal().then(res => {
                    this.TheCurrentEnvironments = res.data.data[0]
                })
            },
            //24小时曲线图
            graph() {
                findTian().then(res => {
                    console.log(res);
                })
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            //当前环境调用
            this.TheCurrentEnvironment();
            this.graph();
        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less' scoped>
    .labelText {
        font-size: 12px;
        color: #fff;
    }

    ;

    .box {
        width: 49.4%;
        display: inline-block;
        background-color: #122647;
        margin-bottom: 15px;
        margin-top: 15px;


        .num {
            color: #21447a;
            background-color: #7fabea;
            height: 55px;
            line-height: 55px;
            text-align: right;
            padding: 0 15px;
            font-size: 28px;
        }

        ;
    }

    ;

    .words {
        color: #fff;
        font-size: 12px;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
    }

    ;

    .word {
        font-size: 12px;
        color: #fff;
    }

    .middle {
        width: 24%;
        height: 90px;
        border: 1px solid #01a3da;
        display: inline-block;
        margin: 0.5% auto;
        color: #fff;
        text-align: center;
    }

    ;

    .graph {
        height: 200px;
    }

    .barometer {
        line-height: 30px;
        font-size: 15px;
        color: #00fffe;
        border-bottom: 1px solid #ddd;
        border-image: linear-gradient(to right, #5dc2fe, #172c49) 20 20;
        padding: 0 15px;
    }

    ;

    .dashboard {
        height: 239px;
    }

    .Overrun {
        background: #122647;
        color: #fff;
        text-align: center;
    }
</style>