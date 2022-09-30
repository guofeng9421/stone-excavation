<!--二三维同步 -->
<template>
    <div class=''>
        <el-row class="mb" :gutter="20">
            <el-card>
            <el-col :span="12">
                  <div class="GISmap" id="viewer3d"></div>
            </el-col>
            <el-col :span="12">
                <div class="GISmap" id="viewer2d"></div>
            </el-col>
              
                
            </el-card>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    import {
        BimfaceSDKLoader,
        BimfaceSDKLoaderConfig,
        Glodon,
        BimfaceViewTypeOption
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
            BIM2D3D() {
                let viewToken = '088682a2bd5c42948099e03e7b845ecb';
                let fileId = "1570720497902304";
                let componentId;
                let viewerDrawing;
                // 初始化显示组件
                let options = new BimfaceSDKLoaderConfig();
                options.viewToken = viewToken;
                BimfaceSDKLoader.load(options, successCallback, failureCallback);

                function successCallback(viewMetaData) {
                    console.log(viewMetaData);
                    // 获取DOM元素
                    let dom3d = document.getElementById('viewer3d');
                    // 配置参数
                    let config = new Glodon.Bimface.Application.WebApplication3DConfig();
                    config.domElement = dom3d;
                    config.enableViewhouse = false;
                    //取消工具条
                    config.Toolbars = [];
                    // 创建viewer3D对象
                    let app = new Glodon.Bimface.Application.WebApplication3D(config);
                    // 添加模型
                    app.addView(viewToken);
                    let viewer3D = app.getViewer();

                    //模型点击监听事件
                    app.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function (objectData) {
                        componentId = objectData.objectId;
                        //根据模型构件ID获取对应图纸的构件ID
                        viewerDrawing.toDrawingId(componentId, getElementId);
                        // 定义获取图纸对应图元ID的回调函数
                        function getElementId(elementId) {
                            if (elementId) {
                                //如果当前图纸有对应的模型构件ID，就缩放到对应位置
                                viewerDrawing.zoomToObject(elementId);
                                viewerDrawing.update();
                            } else {
                                //如果当前图纸没有对应的模型构件ID，需进一步判断是否有包含该构件的图纸
                                viewer3D.getDrawingListbyId(fileId, componentId, getDrawing);                              
                            }
                             function getDrawing(data) {
                                    if (data.length) {
                                        // 取第一张图纸进行二三维联动
                                        let drawingId = data[0].viewInfo.id;
                                        viewerDrawing.destroy();
                                        viewerDrawing.load(viewToken, drawingId)
                                    }
                                }
                        }
                    })

                    // 监听添加view完成的事件
                    app.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {
                        // 渲染3D模型
                        app.render();
                        //自适应屏幕大小
                        window.onresize = function () {
                            viewer3D.resize(document.documentElement.clientWidth, document.documentElement
                                .clientHeight - 40)
                        }
                        //隐藏右上角viewhouse
                        //viewer3D.hideViewHouse();
                        let options2d = new BimfaceSDKLoaderConfig();
                        options2d.viewToken = viewToken;
                        options2d.viewType = BimfaceViewTypeOption.DrawingView;
                        BimfaceSDKLoader.load(options2d, successCallback2d, failureCallback2d);

                        function successCallback2d(viewMetaData) {
                            let dom2d = document.getElementById('viewer2d');
                            let config2d = new Glodon.Bimface.Viewer.ViewerDrawingConfig();
                            config2d.domElement = dom2d;
                            //添加图纸
                            viewerDrawing = new Glodon.Bimface.Viewer.ViewerDrawing(config2d);
                            let drawingUrl = viewMetaData.drawingUrl;
                            console.log(drawingUrl);
                            //如果是单模型的话，只需要传图纸id
                            let _id = 582803;
                            viewerDrawing.load(viewToken, _id);

                            //如果是集成模型的话，需要传图纸id和单模型的fileid
                            //   let _id =1287057;
                            //   let _fileid =1628186476905664;
                            //   viewerDrawing.load(viewToken,_id,_fileid);

                            // 监听图纸加载完成的事件
                            viewerDrawing.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded,
                                zoomToElement);

                            function zoomToElement() {
                                if (componentId) {
                                    viewerDrawing.toDrawingId(componentId, function (elementId) {
                                        //缩放到对应位置
                                        viewerDrawing.zoomToObject(elementId);
                                        viewerDrawing.update();
                                        console.log(elementId);
                                    })
                                } else {
                                    console.log("!componentId");
                                }
                            }

                            viewerDrawing.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent
                                .SelectionChanged,
                                function (objectData) {
                                    if (objectData.length > 0) {
                                        //根据图纸点击的构件ID获取对应的模型构件ID
                                        let componentId_2 = viewerDrawing.toModelId(objectData[0]);
                                        viewer3D.clearIsolation();
                                        //定位到该构件
                                        viewer3D.setSelectedComponentsById([componentId_2]);
                                        //是否存在构件
                                        let isExist = viewer3D.getViewer().getComponentInfoByUserId(
                                            componentId_2);
                                        if (isExist) {
                                            viewer3D.zoomToSelectedComponents();
                                        } else {
                                            viewer3D.render();
                                        }
                                    }
                                })
                        }

                        function failureCallback2d(error) {
                            console.log(error);
                        }
                    })
                }

                function failureCallback(error) {
                    console.log(error);
                }
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