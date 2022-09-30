<!-- 质量管理 -->
<template>
    <div class=''>
        <el-row class="mb">

            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">质量问题-统计</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='statisticsPie' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">质量问题-类型分布</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='typeDistributionPie' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">未销项-问题类型</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='unsoldItems' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>

            </el-row>
            <el-row :gutter="20" class="mt">
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">月销项趋势图</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='QualityMonthlySales' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">质量问题趋势</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='QualityIssues' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <el-col class="statistics">质量问题-责任区域分析</el-col>
                        <el-divider></el-divider>
                        <e-charts :option='AreaOfResponsibility' class="statisticsPie"></e-charts>
                    </el-card>
                </el-col>
            </el-row>

        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    import {
        pie,
        bar,
        line,
        lines,
    } from '@/utils/echarts/echats.js'
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {

            };
        },
        //计算属性 类似于data概念
        computed: {
            //统计
            statisticsPie() {
                return pie({
                    value: 1,
                    name: '一般问题'
                })
            },
            //类型
            typeDistributionPie() {
                return pie({
                    value: 1,
                    name: '工程质量'
                })
            },
            //未销项
            unsoldItems() {
                return pie({
                    value: 1,
                    name: '工程质量'
                })
            },
            //责任区域分析
            AreaOfResponsibility() {
                return bar([], [1])
            },
            //月销项趋势图
            QualityMonthlySales() {
                return line([1])
            },
            //质量问题趋势图
            QualityIssues() {
                return lines([1])
            }
        },
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {

        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {

        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less' scoped>
    .statistics {
        color: #00fffe;
        font-size: 15px;
    }

    .statisticsPie {
        min-height: 24vh;
        margin-top: 30px;
    }


    /deep/.el-card__body {
        padding: 2px;
    }
</style>