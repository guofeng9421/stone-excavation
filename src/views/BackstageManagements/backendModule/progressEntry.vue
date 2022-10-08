<!-- 进度录入 -->
<template>
    <div class=''>
        <el-row>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>进度管理</el-breadcrumb-item>
                <el-breadcrumb-item>进度录入</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="BIMEntry mt" ref="BIMEntry"></div>
            <el-dialog title="实际进度录入" :visible.sync="dialogFormVisible" width='40%'>
                <el-row>
                    <el-col :span="5">
                        <p style="line-height: 40px;">计划结束时间</p>
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker v-model="EntryForm.over1" type="date" placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="EntryForm">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="5">
                        <p style="line-height: 40px;">实际结束时间</p>
                    </el-col>
                    <el-col :span="12">
                        <el-date-picker v-model="EntryForm.over2" type="date" placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="EntryForm">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-form :model="EntryForm" class="mt">
                    <el-form-item label="状态" :label-width="formLabelWidth" >
                        <el-select v-model="EntryForm.state" placeholder="请选择状态" class="select">
                            <el-option label="超前完成" value="0"></el-option>
                            <el-option label="预期完成" value="1"></el-option>
                            <el-option label="滞后完成" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="okForm" type="primary">立即提交</el-button>
                    <el-button type="info" @click="Reset">重置</el-button>
                    <el-button type="danger" @click="deletes">删除</el-button>
                </div>
            </el-dialog>
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
    // import {
    //     inserted
    // } from '@/api/api',\
    import {
        queryName,
        find,
        deleteSche,
    } from '@/api/api';
    export default {
        inject: ['reload'],
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                EntryForm: {
                    state: '',
                    over1: '',
                    over2: '',
                    sid: [],
                    workArea: '桓集高速竣工后',
                },
                dialogFormVisible: false,
                formLabelWidth: '150px',
                arr: [],
            };
        },
        //计算属性 类似于data概念
        computed: {

        },
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            BINEntry() {
                queryName().then(res => {
                    const viewToken = res.data.modelId.data;
                    let dom = this.$refs['BIMEntry']
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
                        } else if (data[i].state === '1') {
                            actualxArr.push(data[i].sid)
                        } else {
                            BoxArr.push(data[i].sid)
                        }
                    }
                })

            },
            //提交表单
            okForm() {
                let data = {
                    state: this.EntryForm.state,
                    over1: this.EntryForm.over1,
                    over2: this.EntryForm.over2,
                    sid: this.EntryForm.sid,
                    workArea: '恒集高速竣工后',
                }
                console.log(data);
                // inserted().then(res=>{
                //     console.log(res);
                // })
                this.service({
                    url: "http://192.168.1.19:8015/Schedule/inserted",
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(data)
                }).then(res => {
                    if (res.data) {
                        this.$message({
                            type: "success",
                            message: '提交成功',
                        });
                        this.EntryForm = {}
                        this.dialogFormVisible = false;
                        this.reload()
                    } else {
                        this.$message.error('提交错误')
                    }
                })

            },
            //重置表单
            Reset() {
                this.EntryForm = {}
            },
            //删除表单
            deletes() {
                deleteSche({
                    sid: this.EntryForm.sid
                }).then(res => {
                    console.log(res);
                    if (res.status == 200) {
                        this.$message({
                                type: "success",
                                message: '删除成功',
                            }),
                            this.dialogFormVisible = false;
                        this.reload()
                    }
                })
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {

        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {
            this.BINEntry();
        },
    }
</script>
<style lang='less' scoped>
    .BIMEntry {
        height: 80vh;
    }

    ;

    .select {
        width: 76%;
    }

    .EntryForm {
        width: 120%;
    }
</style>