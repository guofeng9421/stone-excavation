<!-- 土方山石量算 -->
<template>
    <div class=''>
        <el-row class="mb">
            <el-card>
                <el-row :gutter="20">
                    <el-col :span="10">
                        <!--实际 -->
                        <div class="mt mb BIM">施工后</div>
                        <div class="bim-collaboration" ref="planBIM"></div>
                    </el-col>
                    <el-col :span="10">
                        <!-- 计划 -->
                        <div class=" mt mb BIM">施工前工</div>
                        <div class="bim-collaboration" ref="actualBIM"></div>
                    </el-col>
                    <el-col :span="4">
                        <el-card>
                            <div class="CalculationText">挖填方量算</div>
                            <el-select v-model="value" placeholder="请选择起始里程" class="mt">
                                <el-option v-for="item in options" :key="item.id" :label="item.mileage"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-model="val" placeholder="请选择结束里程" class="mt">
                                <el-option v-for="item in option" :key="item.id" :label="item.mileage"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <div class="mt cutAndFillText">
                                <span v-if="cutAndFill>0">
                                    {{cutAndFill+'m³'}}
                                </span>
                            </div>
                            <div class="mt">
                                <el-button type="info" round @click="CalculateCutAmount">计算挖方量</el-button>
                            </div>
                        </el-card>
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
    import {query,queryName,findMileage,findFillVolumeSUM} from '@/api/api';
    export default {
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                //竣工前后
                options: [],
                option: [],
                //竣工前后
                value: '',
                val: "",
                //挖填方量
                cutAndFill: ''
            };
        },
        //计算属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            //创建模型
            BIMCreate() {
                query().then(res=>{
                      const viewToken=res.data.modelId.data
                    Create(this.$refs['actualBIM'], viewToken);
                })
                queryName().then(res=>{
                    const viewToken=res.data.modelId.data
                     Create(this.$refs["planBIM"], viewToken);
                })            
            },
            //计算方量点击事件
            CalculateCutAmount() {
                    console.log( this.value,this.val,);
                findFillVolumeSUM({
                    sid:this.value,
                    eid:this.val
                }).then(res=>{
                    this.cutAndFill=res.data.data
                })
            },
            //获取量算的名字
            MeasurementName(){
                findMileage().then(res=>{
                    this.options=res.data.data;
                    this.option=res.data.data
                })
            }
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            this.MeasurementName()
        },
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

    .CalculationText {
        font-size: 15px;
        text-align: center;
        color: #00fffe;
    }

    .cutAndFillText {
        font-size: 18px;
        color: #fff;

    }
</style>