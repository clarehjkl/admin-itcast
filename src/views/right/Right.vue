<template>
  <div>
    <!-- 头部 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <template>
      <el-table ref="rightList" :data="rightList" style="width: 100%" border>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="authName" label="权限" width="180">
        </el-table-column>
        <el-table-column property="path" label="路径" width="180">
        </el-table-column>
        <el-table-column property="level" label="层级">
          <template slot-scope="scope">
            <span>{{scope.row.level | levelFormat}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {getAllRightsList} from '@/api/index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    getAllRightsList('list').then(res => {
      this.rightList = res.data
    })
  },
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
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
