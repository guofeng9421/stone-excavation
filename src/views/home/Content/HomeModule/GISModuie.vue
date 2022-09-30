<!-- GIS模块 -->
<template>
    <div class=''>
        <el-row class="mb">
            <el-card>
                <el-col>
                    <div class="GISmap" id="dom"></div>
                </el-col>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    //3D模型创建
    import {
        BimfaceSDKLoader,
        BimfaceSDKLoaderConfig,
        Glodon
    } from 'bimfacesdkloader';
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
            GISmap() {
                // 声明 viewer 及 app
                let viewer, app;
                let viewToken = 'e564c90d009348d0a6a22ac8115df5b0';
                // 初始化SDKLoader
                let BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
                BimfaceLoaderConfig.viewToken = viewToken;
                BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);

                // 资源加载成功的回调函数
                function onSDKLoadSucceeded(viewMetaData) {
                    console.log(viewMetaData);

                    // 构造app
                    let dom4Show = document.getElementById('dom');
                    let webAppConfig = new Glodon.Bimface.Application.WebApplicationGISConfig();
                    webAppConfig.domElement = dom4Show;
                    app = new Glodon.Bimface.Application.WebApplicationGIS(webAppConfig);

                    // 获取viewer并加载场景
                    viewer = app.getViewer();
                    viewer.addScene(viewToken);

                    // 场景加载的监听事件，场景加载后获取主工具条、管理器等对象，并添加场景效果
                    viewer.addEventListener(Glodon.Bimface.Viewer.ViewerGISEvent.SceneAdded, function () {
                        viewer.render()
                    });
                }
                // 资源加载失败的回调函数
                function onSDKLoadFailed(error) {
                    console.log(error);
                }
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {

        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {
            // this.GISmap()
        },
    }
</script>
<style lang='less' scoped>
    .GISmap {
        height: 70vh;
    }
</style>