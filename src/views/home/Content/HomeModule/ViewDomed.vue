<!--进度管理 -->
<template>
    <div class=''>
        <el-row class="mb">
            <el-card>
                <el-row :gutter="20">
                    <el-col>
                        <h1 class="navText">进度展示</h1>
                        <div class="bim-collaboration mt" ref="planBIM"></div>
                        <div class="tip">
                            <div style="background: #41E3D4;"></div>&nbsp;&nbsp;预期完成<br>
                            <div style="background: #00FF00;"></div>&nbsp;&nbsp;超前完成<br>
                            <div style="background: #FF632E;"></div>&nbsp;&nbsp;滞后完成
                        </div>
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
        BimfaceSDKLoader,
        BimfaceSDKLoaderConfig,
        Glodon
    } from 'bimfacesdkloader';
    import {
        queryName,
        find,
    } from '@/api/api';
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
                queryName().then(res => {
                    const viewToken = res.data.modelId.data;
                    let dom = this.$refs['planBIM']
                    let app;
                    let viewer3D;
                    let _this = this; //定义变量绑定this至vue对象
                    // let dialogFormVisible=true;
                    // this.dialogFormVisible=dialogFormVisible;
                    let options = new BimfaceSDKLoaderConfig();
                    options.viewToken = viewToken;
                    BimfaceSDKLoader.load(options, successCallback, failureCallback);

                    function successCallback(viewMetaData) {
                        // _this.EntryForm.workArea = viewMetaData.name
                        if (viewMetaData.viewType == "3DView") {
                            let domShow = dom;
                            let webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
                            webAppConfig.domElement = domShow;
                            // webAppConfig.Buttons = ['FullScreen', 'Walk', 'Measure']
                            // 创建WebApplication3D，用以显示模型
                            app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
                            app.addView(viewToken);
                            viewer3D = app.getViewer()
                            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded,
                                function () {
                                    //自适应屏幕大小
                                    actualOverrideComponentsColorById()
                                    window.onresize = function () {
                                        viewer3D.resize(document.documentElement.clientWidth, document
                                            .documentElement
                                            .clientHeight - 40);
                                    }
                                    // 调用viewer3D对象的Method，可以继续扩展功能
                                    // 渲染3D模型

                                    viewer3D.render();
                                    // viewer3D.setView(Glodon.Bimface.Viewer.ViewOption.South);
                                });
                            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.SelectionChanged,
                                function (
                                    elementId) {
                                    if (elementId.lengin != 0) {
                                        _this.dialogFormVisible = true;
                                        _this.EntryForm.sid = elementId.toString()

                                    }


                                })
                        }
                    }

                    function failureCallback(error) {
                        console.log(error);
                    }
                    //********************根据Id给构件着色*********************
                    function actualOverrideComponentsColorById() {
                        var color3 = new Glodon.Web.Graphics.Color("#00FF00", 0.8); //绿色-实际超前完成
                        var color1 = new Glodon.Web.Graphics.Color("#41E3D4", 0.8); //青色-实际按时完成
                        var color2 = new Glodon.Web.Graphics.Color("#FF632E", 0.8); //橙色-实际滞后完成
                        viewer3D.overrideComponentsColorById(actualBoxArr, color1);
                        viewer3D.overrideComponentsColorById(actualxArr, color2);
                        viewer3D.overrideComponentsColorById(BoxArr, color3);
                        viewer3D.render();
                    }
                    app && app.destroy();

                })
                let actualBoxArr = [];
                let actualxArr = [];
                let BoxArr = [];
                find().then(res => {
                    //实际模型状态信息
                    let data = res.data.data
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].state === '0') {
                            actualBoxArr.push(data[i].sid);
                        }else if(data[i].state === '1'){
                            actualxArr.push(data[i].sid)
                        }else{
                            BoxArr.push(data[i].sid)
                        }

                    }
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

    /*进度*/
    .tip {
        position: absolute;
        width: 120px;
        left: 54px;
        bottom: 80px;
        font-size: 14px;
        line-height: 18px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
    }

    .tip div {
        float: left;
        width: 50px;
        height: 16px;
        border-radius: 7px;
    }
</style>