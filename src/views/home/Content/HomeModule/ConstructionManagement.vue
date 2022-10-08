<!--视频监控-->
<template>
    <div class=''>
        <el-row class="mb">
            <el-card>
                <el-row>
                    <div class="vanVdeol">视频监控</div>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="4">
                        <el-button type="info" plain v-for="(item,index) in monitorName" :key="index"
                            @click="indexOK(item.number)">{{item.area}}
                        </el-button>
                    </el-col>
                    <el-col :span="20">
                        <div>
                            <div id="player" v-html="pla"></div>
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
        findMonitor,
        getKitToken,
        // AccessToken,
    } from '@/api/api';
    let player
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                monitorName: '',
                number: '',
                kitToken: '',
                parplayer: '',
                params: '',
                pla:`<div class="w100h100" id="playercontainer">
                    </div>`
            };
        },
        //计算属性 类似于data概念
        computed: {

        },
        //监控data中的数据变化
        watch: {
            kitToken: {
                deep: true,
                handler(newValue, oldValue) {
                    console.log(newValue, oldValue)

                },
            }
        },
        //方法集合函数
        methods: {
            //监控列表
            monitorTheList() {
                findMonitor().then(res => {
                    this.monitorName = res.data.data
                })
            },
            //监控显示
            indexOK(name) {
                this.number = name
                getKitToken({
                    number: name
                }).then(res => {
                    this.kitToken = res.data.data;
                    this.token(this.number, this.kitToken)
                })
            },
            token(number, kitToken) {
                /* eslint-disable */
                // 添加DOM容器
                player = new ImouPlayer('#playercontainer');
                // 播放器初始化
                let params = {
                    src: [{
                        url: 'imou://open.lechange.com/' + number +
                            '/0/1?streamId=1', // url拼接说明请见：2.2.3 轻应用播放地址说明
                        kitToken, // 播放Token，通过接口getKitToken获取，具体请见：2.2.4 getKitToken接口协议说明
                    }, ],
                    autoplay: true,
                    controls: true,
                    height: 600
                };
                // player.setMultiScreen(2);
                player.setup(params);

            },
            //获取AccessToken
            // Access() {
            //     AccessToken().then(res => {
            //         console.log(res);
            //     })
            // }

        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            this.monitorTheList()
            // this.Access();
            this.indexOK("6K07727PAG65A30");
        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {},
    }
</script>
<style lang='less' scoped>
    .vanVdeol {
        color: #fff;
        font-size: 24px;
        text-align: center;
    }

    .el-button+.el-button,
    .el-checkbox.is-bordered+.el-checkbox.is-bordered {
        margin-left: 0px;
        margin-top: 10px;

    }
</style>