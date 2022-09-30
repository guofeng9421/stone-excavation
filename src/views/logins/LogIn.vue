<!--登录  -->
<template>
    <div class="loginBackg">
        <el-row>
            <el-card class="login">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type='password'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="ok('ruleForm')" class="ok">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
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
                //绑定表单
                ruleForm: {
                    name: '',
                    password: ''
                },
                //表单规则
                rules: {
                    name: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [{
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 6,
                            message: '长度在 3 到 6个字符',
                            trigger: 'blur'
                        }
                    ],
                }
            };
        },
        //计算属性 类似于data概念
        computed: {},
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            ok(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.name == '中铁七局' && this.ruleForm.password == '123456') {
                            sessionStorage.setItem('name', this.ruleForm.name);
                            this.$router.push('/');
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                duration:1000
                            });
                        } else {
                            this.$message.error('账号密码错误');
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {

        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less'>
    .loginBackg {
        background: url("@/assets/img/bgImg.jpg");
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
    }

    .login {
        width: 400px;
        margin: auto;
        margin-top: 300px;

        .el-form-item__label {
            font-size: 18px;
            color: #fff;

        }

        .ok {
            width: 100%;
        }
    }
</style>