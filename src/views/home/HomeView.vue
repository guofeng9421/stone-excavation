<!--主页  -->
<template>
    <div class='home'>
            <el-row :gutter="20" class="homeNve">
                <el-col :span="6" class="homeDeta">
                    {{deta}}
                </el-col>
                <el-col :span="12" class="homeLabel">
                    <h1>山区路基土石方施工管理系统</h1>
                </el-col>
                <el-col :span="6" style="text-align: center;">
                    <el-button type="primary" @click="BackstageManagement">后台管理</el-button>
                </el-col>
            </el-row>
            <el-row class="HomeContent">
                <router-view></router-view>
            </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
  
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {
          
        },
        data() {
            //这里存放数据
            return {
                deta: '',
                radio1: 1,

            };
        },
        //计算属性 类似于data概念
        computed: {
            moduie() {
                return 'myModuie' + this.radio1
            }
        },
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            dateControl() {
                // 日期控件
                const myDate = new Date;
                const year = myDate.getFullYear(); //获取当前年
                const mon = myDate.getMonth() + 1; //获取当前月
                const date = myDate.getDate(); //获取当前日
                const week = myDate.getDay();
                const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                this.deta = year + "年" + mon + "月" + date + "日" + " " + weeks[week];
            },
            //跳转到后台管理
            BackstageManagement(){
                this.$router.push('/BackstageManagement')
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            this.dateControl()
        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less' scoped>
    .home {
        background: url("@/assets/img/背景.jpg");
        width: 100%;
        height: 100%;
        min-height: 1000px;
        font-family: "microsoft yahei", arial, sans-serif;
        background-color: #0f1c30;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;

        .homeNve {
            margin-top: 6px;

            .homeDeta {
                color: #fff;
                text-align: right;
                font-size: 24px;
            }

            ;

            .homeLabel {
                font-size: 35px;
                color: #fff;
                text-align: center;
            }
        }

        ;

        .home-nav {
            margin-top: 70px;
        }


    }
    .HomeContent{
        margin-top: 70px;
    }
    
</style>