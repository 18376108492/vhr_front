<template>
   <div>
   <div><el-input
           size="small"
           placeholder="添加职位..."
           prefix-icon="el-icon-plus"
           v-model="pos.name"
           style="width: 300px;margin-right: 10px;margin-top:10px;margin-bottom: 10px"
   >
   </el-input>
       <el-button type="primary" size="small" icon="el-icon-plus">添加</el-button>
   </div>
<!-- 表格-->
   <div>
       <el-table
               :data="positions"
               stripe
               border
               style="width: 70%"
               :row-class-name="tableRowClassName">
           <el-table-column
                   prop="id"
                   label="编号"
                   width="180">
           </el-table-column>
           <el-table-column
                   prop="name"
                   label="职位名称"
                   width="200">
           </el-table-column>
           <el-table-column
                   prop="createDate"
                   label="入职时间"
                   width="200">
           </el-table-column>
           <el-table-column
                   prop="operator"
                   label="操作">
           </el-table-column>
       </el-table>
   </div>
   </div>
</template>

<script>
    export default {
        name: "PosMana",
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            }
        },
        data(){
            return{
                pos:{
                    name:''
                },
                positions: []
            }
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
