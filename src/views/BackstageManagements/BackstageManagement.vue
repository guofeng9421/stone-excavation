<!-- 后台管里 -->
<template>
    <div class=''>
        <el-row>
            <el-container>
                <el-aside width="220px" class="aside">
                    <h1 class="title" @click="system">山区路基土石方施工管理系统</h1>
                    <el-menu router default-active="2" class="el-menu-vertical-demo" background-color="#001529"
                        text-color="#fff" active-text-color="#ffd04b">
                        <template v-for="(item,index) in nav">
                            <el-submenu :index="index+ ''" :key="index" v-if="!item.hidden">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item-group v-for="(child,index) in item.children" :key="index">
                                    <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </template>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-header class="header">
                        <el-row class="mt">
                            <el-col :push="22" :span="4">
                                <el-dropdown @command="handleCommand">
                                    <span class="el-dropdown-link">
                                        {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="a">退出</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </el-row>
                    </el-header>
                    <el-main>
                        
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                nav: [], //储存路由
                name: '' //存储登录的名字
            };
        },
        //计算属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            //退出登录
            handleCommand(command) {
                if (command === 'a') {
                    sessionStorage.clear();
                    this.$router.push('/login');
                    this.$message({
                        message: '退出成功',
                        type: 'warning',
                        duration:1000
                    });
                }


            },
            //跳转前台
            system(){
                this.$router.push('/')
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            //拿到定制路由的规则
            this.nav = [...this.$router.options.routes]
            let name = sessionStorage.getItem('name')
            this.name = name
        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less' scoped>
    .aside {
        background: #001529;
        height: 100vh;

        .el-menu {
            border: none
        }

        ;

        .title {
            line-height: 50px;
            text-align: center;
            color: #fff;
        }
    }
</style>