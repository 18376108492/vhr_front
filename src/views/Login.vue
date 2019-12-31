<template>
    <div>
        <el-form :rules="login_form"  :model="loginFrom" ref="loginForm" class="loginStyle">
            <h3 class="loginTitle">人事管理系统登入</h3>

            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" type="text" v-model="loginFrom.username" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input placeholder="请输入密码" type="password" v-model="loginFrom.password" auto-complete="off"
                          show-password></el-input>
            </el-form-item>

            <el-checkbox v-model="checked" class="loginRemeber" title="记住密码"></el-checkbox>
            <el-button type="success" style="width: 100%" @click="submitFrom" round>登入</el-button>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginFrom: {
                    username: 'admin',
                    password: '123'
                },
                checked: false,
                login_form: {
                    username: [{required: true, message: "亲输入用户名", trigger: 'blur'}],
                    password: [{required: true, message: "亲输入密码", trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitFrom: function () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        this.$message.error("请输入字段");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginStyle {
        border-radius: 20px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 35px 35px;
        background-color: #b4ed9b;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 20px #cac6c6;
    }

    .loginTitle {
        margin: 0 auto 20px auto;
        text-align: center;
    }

    .loginRemeber {
        text-align: center;
        margin: 0px 0px 10px 0;
    }


</style>