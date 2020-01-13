<template>
    <div>
        <div style="display: flex; justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工姓名进行查询" v-model="keyword" class="inputSty" prefix-icon="el-icon-search"
                          @keydown.enter.native="searchEmp"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="searchEmp">搜索</el-button>
                <el-button type="primary" icon="el-icon-arrow-down">高级搜索</el-button>
            </div>
            <!-- 导入和导出数据-->
            <div>
                <el-button type="success" icon="el-icon-sort-down">导入数据</el-button>
                <el-button type="success" icon="el-icon-sort-up">导出数据</el-button>
                <el-button type="primary" icon="el-icon-s-custom" @click="showAddPos">添加用户</el-button>
            </div>
        </div>
        <!--员工表格-->
        <div style="margin-top: 10px">
            <el-table
                    v-loading="loading"
                    element-loading-text="正在载入..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="emps"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        fixed
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        width="100"
                        align="left"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        width="180"
                        align="left"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        width="50"
                        align="left"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        width="50"
                        align="left"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        width="50"
                        align="left"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        width="80"
                        align="left"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="150"
                        align="left"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="150"
                        align="left"
                        label="联系地址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        width="120"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        width="80"
                        align="left"
                        label="职位">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        width="80"
                        align="left"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        width="80"
                        align="left"
                        label="聘用形式">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        width="100"
                        align="left"
                        label="入职日期">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        width="100"
                        align="left"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        prop="notWorkDate"
                        width="100"
                        align="left"
                        label="离职日期">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        width="110"
                        align="left"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        width="110"
                        align="left"
                        label="合同终止日期">
                </el-table-column>
                <el-table-column
                        width="100"
                        align="left"
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        width="90"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="200"
                        label="操作">
                    <el-button class="buttonSize" type="info" size="small">编辑</el-button>
                    <el-button class="buttonSize" type="warning" size="small">查看高级资料</el-button>
                    <el-button class="buttonSize" type="danger" size="small">删除</el-button>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: center">
                <!-- 分页 -->

                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        layout="total, sizes, prev, pager, next, jumper, ->,total ,solt "
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <!--  添加员工弹框 -->
        <el-dialog
                title="添加员工"
                :visible.sync="dialogVisible"
                width="80%">
            <!--     Layout 布局,通过基础的 24 分栏，迅速简便地创建布局。  -->
            <diV>
                添加员工
                <el-form>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名" prop="name">
                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="emp.name"
                                          placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio style="margin-left: 10px" label="女">女</el-radio>
                                    <el-radio style="margin-left: 10px" label="双性">双性</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="出生日期" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="small"
                                        type="date"
                                        placeholder="请选择出生日期"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="政治面貌" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="small"
                                           style="width: 180px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="small" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="籍贯" prop="nativePlace">
                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="emp.nativePlace"
                                          placeholder="请输入员工籍贯"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="电子邮箱" prop="email">
                                <el-input style="width: 150px;" prefix-icon="el-icon-message" v-model="emp.email"
                                          placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="联系地址" prop="address">
                                <el-input style="width: 150px;" prefix-icon="el-icon-house" v-model="emp.address"
                                          placeholder="请输入联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="职位" prop="posId">
                                <el-select v-model="emp.posId" placeholder="职位" size="small" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="职称" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="职称" size="small" style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="所属部门" prop="departmentId">
                                <el-input style="width: 150px;" prefix-icon="el-icon-s-flag" v-model="emp.departmentId"
                                          placeholder="所属部门"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="手机号码" prop="phone">
                                <el-input style="width: 150px;" prefix-icon="el-icon-mobile-phone" v-model="emp.phone"
                                          placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号" prop="workID">
                                <el-input style="width: 150px;" prefix-icon="el-icon-mobile-phone" v-model="emp.workID"
                                          placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="学历" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="请选择学历" size="small"
                                           style="width: 150px;">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="毕业院校" prop="school">
                                <el-input style="width: 150px;" prefix-icon="el-icon-school" v-model="emp.school"
                                          placeholder="请输入毕业院校"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="专业名称" prop="specialty">
                                <el-input style="width: 150px;" prefix-icon="el-icon-edit" v-model="emp.specialty"
                                          placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        size="small"
                                        type="date"
                                        placeholder="入职日期"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="转正日期" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        size="small"
                                        type="date"
                                        placeholder="转正日期"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="合同起始日期" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        size="small"
                                        type="date"
                                        placeholder="合同起始日期"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="合同终至日期" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        size="small"
                                        type="date"
                                        placeholder="合同终至日期"
                                        style="width: 150px;"
                                        value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码" prop="idCard">
                                <el-input style="width: 150px;" prefix-icon="el-icon-user" v-model="emp.idCard"
                                          placeholder="身份证号码"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="合同方式" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio style="margin-left: 10px" label="劳动合同">劳动合同</el-radio>
                                    <el-radio style="margin-left: 10px" label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>


                        <el-col :span="8">
                            <el-form-item label="婚姻状态" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio style="margin-left: 10px" label="已婚">已婚</el-radio>
                                    <el-radio style="margin-left: 10px" label="未婚">未婚</el-radio>
                                    <el-radio style="margin-left: 10px" label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    
                </el-form>
            </diV>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                emps: [],
                loading: false,
                total: 0,
                page: 1,
                size: 10,
                keyword: '',
                dialogVisible: false,


                emp: {
                    name: "javaboy",
                    gender: "男",
                    birthday: "1989-12-31",
                    idCard: "610122199001011256",
                    wedlock: "已婚",
                    nationId: 1,
                    nativePlace: "陕西",
                    politicId: 13,
                    email: "laowang@qq.com",
                    phone: "18565558897",
                    address: "深圳市南山区",
                    departmentId: null,
                    jobLevelId: 9,
                    posId: 29,
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "深圳大学",
                    beginDate: "2017-12-31",
                    workState: "在职",
                    workID: "00000057",
                    contractTerm: 2,
                    conversionTime: "2018-03-31",
                    notworkDate: null,
                    beginContract: "2017-12-31",
                    endContract: "2019-12-31",
                    workAge: null
                }
            }
        },
        mounted() {
            this.initEmps()
        }
        ,
        methods: {
            //初始化数据
            initEmps() {
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyword=" + this.keyword).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.page = val;
                this.initEmps();
            },
            handleSizeChange(val) {
                //  console.log(`每页 ${val} 条`);
                this.size = val;
                this.initEmps();
            },
            searchEmp() {
                if (this.keyword) {
                    this.initEmps();
                } else {
                    this.$message({
                        type: 'info',
                        message: '搜索信息不能为空'
                    });
                }
            },
            showAddPos() {
                this.dialogVisible = true;

            }


        }
    }
</script>

<style>
    .inputSty {
        width: 300px;
        margin-right: 10px;
    }

    .buttonSize {
        padding: 3px;
    }

</style>