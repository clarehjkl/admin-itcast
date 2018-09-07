<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :unique-opened='true' :collapse='iscollapse' :router='true'>
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="right">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <span class="myicon myicon-menu toggle-btn" @click='iscollapse=!iscollapse'></span>
          <span class="system-title">电商后台管理系统</span>
          <div>
            <span class="welcome">你好：admin</span>
            <el-button type="text" @click="outlogin">退出</el-button>
          </div>
        </el-header>
        <!-- 主要内容 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iscollapse: false
    }
  },
  mounted () {

  },
  methods: {
    handleOpen (index, path) {
      console.log(index)
      console.log(path)
    },
    handleClose (index, path) {
      console.log(index)
      console.log(path)
    },
    outlogin () {
      localStorage.removeItem('mytoken')
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border-right: none;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #ececec;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
