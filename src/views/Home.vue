<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="homeHeaderTitle">人事管理系统</div>
                <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userface" alt=""></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="usersetting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
<!-- this.$router.options.routes 获取到index.js中的routes数组-->
                        <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                                    {{child.name}}
                                </el-menu-item>
                        </el-submenu>
                    </el-menu>

                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                // user:JSON.parse(window.sessionStorage.getItem('user'))
                user: {
                    name: 'admin'
                }
            }
        },
        methods: {
            // menuClick:function(index){
            //    //点击标题时，跳转至相应的界面
            //     this.$router.push(index);
            //     //console.log(index);
            //   //console.log(indexPath);
            //               },

            commandHandler: function (mod) {
                if (mod == 'logout') {
                    this.$confirm('此操作将退出系统, 是否继续?', '提示', {
                        confirmButtonText: '确定',

                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest('/logout');
                        //清空缓存数据
                        window.sessionStorage.removeItem('user');
                        //跳转至登入界面
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else if (mod == 'usersetting') {

                } else if (mod == 'userinfo') {

                }
            }
        }
    }
</script>

<style>
    .homeHeader {
        background-color: cornflowerblue;
        display: flex;
        /*剧中*/
        align-items: center;
        justify-content: space-between;
        padding: 0px 20px;
        box-sizing: border-box;
    }

    .homeHeaderTitle {
        font-size: 25px;
        font-family: 楷体;
        color: whitesmoke;

    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link{
        display: flex;
        align-items: center;
    }

    .el-dropdown-link img {
        height: 48px;
        width: 48px;
        border-radius: 20px;
        margin-left: 10px;
    }

</style>