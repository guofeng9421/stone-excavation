<!-- 质量巡检 -->
<template>
    <div class=''>
        <el-row>
            <!--面包屑  -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>质量巡检</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="mt">
                <el-col :span="12">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="编号">
                            <el-input v-model="formInline.code" placeholder="请填写编号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button type="primary" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="4" :push="10">
                    <el-button type="primary" @click="AddTo">添加</el-button>
                </el-col>
            </div>
            <!-- 表格 -->
            <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="code" label="编号" width="160"></el-table-column>
                    <el-table-column prop="name" label="工点名称" width="160"></el-table-column>
                    <el-table-column prop="area" label="施工区域" width="160"></el-table-column>
                    <el-table-column prop="position" label="检查部位" width="160"></el-table-column>
                    <el-table-column prop="problemType" label="问题类型" width="140"></el-table-column>
                    <el-table-column prop="severity" label="严重程度" width="140"></el-table-column>
                    <el-table-column prop="examineResult" label="检查结果" width="120"></el-table-column>
                    <el-table-column prop="checkPicture" label="图片" width="200"></el-table-column>
                    <el-table-column prop="checkFile" label="文件" width="200"></el-table-column>
                    <el-table-column prop="userResult" label="问题描述" width="200"></el-table-column>
                    <el-table-column prop="checkUser" label="巡检人" width="100"></el-table-column>
                    <el-table-column prop="checkTel" label="联系电话" width="120"></el-table-column>
                    <el-table-column prop="date" label="巡检时间" width="120"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="primary" size="small">{{state}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>
        <!-- 添加弹窗 -->
        <el-row :gutter="20">
            <el-dialog title="新增质量巡检" :visible.sync="dialogVisible" width="60%">
                <el-row>
                    <el-col :span="12">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="编号">
                                <el-input v-model="form.code" placeholder="请输入编号"></el-input>
                            </el-form-item>
                            <el-form-item label="施工区域">
                                <el-input v-model="form.area" placeholder="请输入施工区域"></el-input>
                            </el-form-item>
                            <el-form-item label="问题类型">
                                <el-select v-model="form.problemType" placeholder="请选择问题类型" class="question">
                                    <el-option label="工程质量" value="1"></el-option>
                                    <el-option label="其他" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-upload class="upload-demo upload"
                                action="http://192.168.1.19:8015/Information/uploadPicture" :on-preview="handlePreview"
                                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
                                :on-exceed="handleExceed" :file-list="fileList" :on-success="uploadSuccess"
                                ref="upload">
                                <el-button size="small" type="primary">点击上传图片</el-button>
                            </el-upload>
                            <el-form-item label="图片">
                                <el-input v-model="form.checkPicture" placeholder="请输入图片"></el-input>
                            </el-form-item>
                            <el-form-item label="问题描述">
                                <el-input v-model="form.useresultR" placeholder="请输入问题描述"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model="form.checkTel" placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="单位工程">
                                <el-input v-model="form.name" placeholder="请输入单位工程"></el-input>
                            </el-form-item>
                            <el-form-item label="检查部位">
                                <el-input v-model="form.position" placeholder="请输入检查部位"></el-input>
                            </el-form-item>
                            <el-form-item label="严重程度">
                                <el-select v-model="form.severity" placeholder="请选择严重程度" class="question">
                                    <el-option label="一般" value="一般"></el-option>
                                    <el-option label="紧要" value="紧要"></el-option>
                                    <el-option label="严重" value="严重"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-upload class="upload-demo upload"
                                action="http://192.168.1.19:8015/Information/uploadPicture" :on-preview="handlePreview"
                                :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3"
                                :on-exceed="handleExceed" :file-list="fileList" :on-success="UploadFiles" ref="upload">
                                <el-button size="small" type="primary">上传文件</el-button>
                            </el-upload>
                            <el-form-item label="文件">
                                <el-input v-model="form.checkFile" placeholder="请输入文件"></el-input>
                            </el-form-item>
                            <el-form-item label="巡检人">
                                <el-input v-model="form.checkUser" placeholder="请输入巡检人"></el-input>
                            </el-form-item>
                            <el-form-item label="巡检时间">
                                <el-date-picker v-model="form.date" type="date" placeholder="请选择日期"
                                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="upload">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="QualityDetermination">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
        <!-- 审核弹窗 -->
        <el-row :gutter="20">
            <el-dialog title="新增质量巡检" :visible.sync="AuditPopup" width="70%">
                <el-row>
                    <el-col :span="12">
                        <el-form ref="form" :model="AuditPopupForm" label-width="80px">
                            <el-form-item label="编号">
                                <el-input v-model="AuditPopupForm.code" placeholder="请输入编号"></el-input>
                            </el-form-item>
                            <el-form-item label="施工区域">
                                <el-input v-model="AuditPopupForm.area" placeholder="请输入施工区域"></el-input>
                            </el-form-item>
                            <el-form-item label="问题类型">
                                <el-select v-model="AuditPopupForm.problemType" placeholder="请选择问题类型" class="question">
                                    <el-option label="工程质量" value="工程质量"></el-option>
                                    <el-option label="其他" value="其他"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="图片">
                                <div class="localImage">
                                    <img :src="localImag" v-if="localImage" />
                                </div>
                            </el-form-item>
                            <el-form-item label="问题描述">
                                <el-input v-model="AuditPopupForm.useresultR" placeholder="请输入问题描述"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model="AuditPopupForm.checkTel" placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form ref="form" :model="AuditPopupForm" label-width="80px">
                            <el-form-item label="单位工程">
                                <el-input v-model="AuditPopupForm.name" placeholder="请输入单位工程"></el-input>
                            </el-form-item>
                            <el-form-item label="检查部位">
                                <el-input v-model="AuditPopupForm.position" placeholder="请输入检查部位"></el-input>
                            </el-form-item>
                            <el-form-item label="严重程度">
                                <el-select v-model="AuditPopupForm.severity" placeholder="请选择严重程度" class="question">
                                    <el-option label="一般" value="一般"></el-option>
                                    <el-option label="紧要" value="紧要"></el-option>
                                    <el-option label="严重" value="严重"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="文件">
                                <div class="localImage">
                                    <img :src="localImag" v-if="localImage" />
                                </div>
                            </el-form-item>
                            <el-form-item label="巡检人">
                                <el-input v-model="AuditPopupForm.checkUser" placeholder="请输入巡检人"></el-input>
                            </el-form-item>
                            <el-form-item label="巡检时间">
                                <el-date-picker v-model="AuditPopupForm.date" type="date" placeholder="请选择日期"
                                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="upload">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form v-model="AuditResults" label-width="80px">
                            <el-form-item label="审核结果">
                                <el-radio-group v-model="AuditResults.examineResult">
                                    <el-radio label="优秀"></el-radio>
                                    <el-radio label="良好"></el-radio>
                                    <el-radio label="不合格"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="审核人">
                                <el-input v-model="AuditResults.examineUser" placeholder="请输入审核人"></el-input>
                            </el-form-item>
                            <el-form-item label="巡检时间">
                                <el-date-picker v-model="AuditResults.examineDate" type="date" placeholder="请选择日期"
                                    format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" class="upload">
                                </el-date-picker>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <el-form v-model="AuditResults" label-width="80px">
                            <el-form-item label="结果描述">
                                <el-input v-model="AuditResults.examineDescribe" placeholder="请输入描述结果"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model="AuditResults.examineTel" placeholder="请输入联系电话"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ReviewOK">确 定</el-button>
                </span>
            </el-dialog>
        </el-row>
    </div>
</template>

<script>
    //这里可以导入其他文件(比如：组件,工具js,第三方插件js,json文件,图片文件等等)
    //例如:import 《组件名称》 from '《组件路径》';
    // import {
    //     addQualityInspect
    // } from '@/api/api';
    import {
        findForm,
        findQualityInspect,
    } from '@/api/api';
    export default {
        inject: ['reload'],
        //import引入的组件需要注入到对象中才能使用,注册组件
        components: {},
        data() {
            //这里存放数据
            return {
                state: '审核',
                //查询表单
                formInline: {
                    code: ''
                },
                //表格
                tableData: [],
                //添加弹窗显示与隐藏
                dialogVisible: false,
                //审核弹窗
                AuditPopup: false,
                //添加弹窗内容
                form: {
                    code: '',
                    area: '',
                    cproblemType: '',
                    checkPicture: '',
                    useresultR: '',
                    checkTel: '',
                    name: '',
                    position: '',
                    severity: '',
                    checkFile: '',
                    date: '',
                    checkUser: '',
                },
                //审核弹窗当前的值
                AuditPopupForm: {
                    code: '',
                    area: '',
                    cproblemType: '',
                    checkPicture: '',
                    useresultR: '',
                    checkTel: '',
                    name: '',
                    position: '',
                    severity: '',
                    checkFile: '',
                    date: '',
                    checkUser: '',
                },
                //图片名字
                localImage: '',
                //弹窗上传
                fileList: [],
                //动态图片路径
                baseUrl: process.env.BASE_URL,
                //审核结果
                AuditResults: {
                    examineResult: '',
                    examineDescribe: '',
                    examineTel: '',
                    examineUser: '',
                    examineDate: '',
                }
            };
        },
        //计算属性 类似于data概念
        computed: {
            localImag() {
                return `${this.baseUrl}cond-icon-heweather/${this.localImage}`
            },
        },
        //监控data中的数据变化
        watch: {},
        //方法集合函数
        methods: {
            //条件查询事件
            onSubmit() {
                console.log(this.formInline.code);
                findQualityInspect({
                    code: this.formInline.code,
                    type1: '质量'
                }).then(res => {
                    this.tableData = res.data.data
                })
            },
            //重置事件
            reset() {
                this.formInline.code = '';
                this.table();
            },
            //审核事件弹窗当前行的数据赋值
            handleClick(row) {
                console.log(row);
                this.AuditPopup = true;
                this.AuditPopupForm = row;
                this.localImage = row.checkPicture;
                this.AuditResults=row

            },
            //添加事件
            AddTo() {
                this.dialogVisible = true;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, ) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //图片上传成功回调
            uploadSuccess(res) { // 图片上传成功后即调用的函数
                this.form.checkPicture = res.data
                if (res.code === 0) {
                    // sysUser为form表单对象，当上传成功后，后端会动将图片存储在数据库，数据库会自动为该图片生成一个名字，
                    // 提交form表单时需要向后台发送服务器生成的图片名的字段
                    this.sysUser.logoImg = res.data.uploadUrl
                    // 图片上传成功之后可以拿到服务器生成的图片名，赋值给表单对象，提交时再传递给后台
                    // console.log('上传到服务器照片名' + this.sysUser.logoImg)
                    this.$message({
                        message: '上传成功',
                        type: 'success',
                        duration: 2000
                    })
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 1000
                    })
                }
                this.confirmLoading = false
                this.$refs.upload.clearFiles()
            },
            //上传文件回调
            UploadFiles(res) {
                console.log(res);
                this.form.checkFile = res.data;
                if (res.code === 0) {
                    // sysUser为form表单对象，当上传成功后，后端会动将图片存储在数据库，数据库会自动为该图片生成一个名字，
                    // 提交form表单时需要向后台发送服务器生成的图片名的字段
                    this.sysUser.logoImg = res.data.uploadUrl
                    // 图片上传成功之后可以拿到服务器生成的图片名，赋值给表单对象，提交时再传递给后台
                    // console.log('上传到服务器照片名' + this.sysUser.logoImg)
                    this.$message({
                        message: '上传成功',
                        type: 'success',
                        duration: 2000
                    })
                } else {
                    this.$message({
                        message: '上传失败',
                        type: 'error',
                        duration: 1000
                    })
                }
                this.confirmLoading = false
                this.$refs.upload.clearFiles()
            },
            //添加表单上传事件
            QualityDetermination() {
                let data = {
                    code: this.form.code,
                    area: this.form.area,
                    cproblemType: this.form.cproblemType,
                    checkPicture: this.form.checkPicture,
                    useresultR: this.form.useresultR,
                    checkTel: this.form.checkTel,
                    name: this.form.name,
                    position: this.form.position,
                    severity: this.form.severity,
                    checkFile: this.form.checkFile,
                    date: this.form.date,
                    checkUser: this.form.checkUser,
                    type1: '质量',
                    state: '审核',
                }
                // inserted().then(res=>{
                //     console.log(res);
                // })
                this.service({
                    url: "http://192.168.1.19:8015/Quality/addQualityInspect",
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(data),
                }).then(res => {
                    console.log(res);
                    if (res.data) {
                        this.$message({
                            type: "success",
                            message: '提交成功',
                        });
                        this.form = {}
                        this.dialogVisible = false;
                        this.reload()
                    } else {
                        this.$message.error('提交错误')
                    }
                })

            },
            //表格
            table() {
                findForm().then(res => {
                    if (res.status == 200) {
                        this.tableData = res.data.data;
                        const dataa = res.data.data;
                        for (let i = 0; i < dataa.length; i++) {
                            this.state=dataa[i].state
                        }
                    }
                });
            },
            //审核提交
            ReviewOK() {
                if( this.AuditResults.examineResult!=='不合格'){
                   this.state='已完成'
                }else{
                    this.state='整改'
                }
                let data = {
                    code: this.AuditPopupForm.code,
                    examineUser: this.AuditPopupForm.examineUser,
                    type1: '质量',
                    state: this.state,
                    examineDate: this.AuditResults.examineDate,
                    examineDescribe: this.AuditResults.examineDescribe,
                    examineTel: this.AuditResults.examineTel,
                    examineResult: this.AuditResults.examineResult
                }
            
                // let url = this.AuditResults.radio=='9'?"http://192.168.1.19:8015/Quality/updateRectificate":"http://192.168.1.19:8015/Quality/updateQualityInspect"
                this.service({
                    url: "http://192.168.1.19:8015/Quality/updateQualityInspect",
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(data),
                }).then(res => {
                    if (res.data) {
                        this.$message({
                            type: "success",
                            message: '提交成功',
                        });
                        data = {}
                        this.AuditPopup = false;
                        this.reload();
                    } else {
                        this.$message.error('提交错误')
                    }
                })

            },
            //
        },
        //生命周期 - 创建完成(可以访问当前this实例)
        created() {
            this.table();
        },
        //生命周期 - 挂载完成(可以访问DOM元素)
        mounted() {

        },
    }
</script>
<style lang='less' scoped>
    .question {
        width: 100%;
    }

    .upload {
        text-align: center;
        margin-bottom: 20px;
    }

    .localImage {
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    ;

    .localImage img {
        width: 100%;
        height: auto;
    }
</style>