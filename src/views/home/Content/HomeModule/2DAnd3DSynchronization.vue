<!--二三维同步 -->
<template>
    <div class=''>
        <el-row class="mb" :gutter="20">
            <el-card>
                  <div class="GISmap" ref="viewer3d"></div>
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
    import {query2D3D} from '@/api/api'
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
            BIM2D3D() {
                query2D3D().then(res=>{
                    let viewToken=res.data.modelId.data;
                    let dom = this.$refs['viewer3d']
                    Create(dom,viewToken)
                })
            }

        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {

        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {
            this.BIM2D3D()
        },
    }
</script>
<style lang='less' scoped>
    .GISmap {
        height: 70vh;
    }
</style>