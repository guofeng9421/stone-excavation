<!--主页内容 -->
<template>
    <div class=''>
        <el-row class="home-nav">
            <el-card>
                <el-radio-group v-model="radio1">
                    <el-radio-button label="1">GIS模块</el-radio-button>
                    <el-radio-button label="2">BIM协同</el-radio-button>
                    <el-radio-button label="3">二三维同步</el-radio-button>
                    <el-radio-button label="4">质量管理</el-radio-button>
                    <el-radio-button label="5">进度管理</el-radio-button>
                    <el-radio-button label="6">土方量算</el-radio-button>
                    <el-radio-button label="7">环境管理</el-radio-button>
                    <el-radio-button label="8">监控管理</el-radio-button>
                    <!-- <el-radio-button label="9">施工成本</el-radio-button> -->
                </el-radio-group>
                <el-col class="mt">
                    <template>
                        <keep-alive>
                            <computed :is='moduie'></computed>
                        </keep-alive>
                    </template>
                </el-col>
            </el-card>
        </el-row>
    </div>
</template>


<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    import myModuie1 from '@/views/home/Content/HomeModule/GISModuie.vue';
    import myModuie2 from '@/views/home/Content/HomeModule/BIMModule.vue';
    import myModuie3 from '@/views/home/Content/HomeModule/2DAnd3DSynchronization.vue';
    import myModuie4 from '@/views/home/Content/HomeModule/QualityManagement.vue';
    import myModuie5 from '@/views/home/Content/HomeModule/ViewDomed.vue';
    import myModuie6 from '@/views/home/Content/HomeModule/MeasurementModule.vue';
    import myModuie7 from '@/views/home/Content/HomeModule/ConstructionInformation.vue';
    import myModuie8 from '@/views/home/Content/HomeModule/ConstructionManagement.vue';
    // import myModuie9 from '@/views/home/Content/HomeModule/Construction-Cost.vue';
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {
            myModuie1,
            myModuie2,
            myModuie3,
            myModuie4,
            myModuie5,
            myModuie6,
            myModuie7,
            myModuie8,
            // myModuie9,
        },
        data() {
            //这里存放数据
            return {
                radio1: 1
            };
        },
        //计算属性 类似于data概念
        computed: {
            moduie() {
                return "myModuie" + this.radio1
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
</style>