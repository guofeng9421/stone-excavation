<!-- BIM 模块 -->
<template>
    <div class=''>
        <el-row class="mb">
            <el-card>
                <el-row :gutter="20">
                    <el-col>
                        <div class="bim-collaboration mt" ref="planBIM"></div>
                    </el-col>
                </el-row>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    import {
        Create
    } from '@/utils/createBin/CreateBin';
    import {queryName} from '@/api/api';
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {

            };
        },
        //计算属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            BIMCreate() {
                queryName().then(res=>{
                    console.log(res);
                const viewToken=res.data.modelId.data;
                 Create(this.$refs["planBIM"], viewToken)
                })
               
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {},
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {
            this.BIMCreate()

        },
    }
</script>
<style lang='less' scoped>
    .bim-collaboration {
        height: 60vh;

    }

    .BIM {
        color: #00fffe;
        line-height: 30px;
        font-size: 15px;
    }

    .navText {
        color: #fff;
        font-size: 24px;
        text-align: center;
    }
</style>