<template>
  <div>
    <!-- 头部 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="success" plain @click='adddialogFormVisible=true'>添加角色</el-button>
    <template>
      <el-table ref="roleList" :data="roleList" style="width: 100%;margin-top:20px" border>
        <!-- 左边拓展栏 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 权限列表 -->
            <el-row v-for="first in scope.row.children" :key="first.id">
              <el-col :span="4">
                <el-tag closable type="success">
                  {{first.authName}}
                </el-tag>
              </el-col>
              <el-col :span='20'>
                <el-row v-for="second in first.children" :key="second.id">
                  <el-col :span="4">
                    <el-tag closable type="danger">
                      {{second.authName}}
                    </el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag closable type="warning" v-for="third in second.children" :key="third.id" style="margin: 0px 10px 10px 10px">
                      {{third.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

          </template>
        </el-table-column>
        <el-table-column type="index" width="100">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="300">
        </el-table-column>
        <el-table-column prop="roleDesc" label="描述" width="300">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" plain></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" plain></el-button>
            </el-tooltip>
            <el-tooltip content="分配角色" placement="top">
              <el-button type="primary" icon="el-icon-share" plain></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {getAllRoleList} from '@/api/index.js'
export default{
  data () {
    return {
      roleList: []
    }
  },
  mounted () {
    getAllRoleList().then(res => {
      console.log(res)
      this.roleList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  background-color: #f5f5f5;
  height: 45px;
  font-size: 15px;
  padding-left: 10px;
  line-height: 45px;
  margin-bottom: 15px;
}
</style>
