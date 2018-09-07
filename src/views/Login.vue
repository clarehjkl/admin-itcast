<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="container">
          <img src="../assets/avatar.jpg" class="avatar">
          <el-form-item prop="username">
              <el-input v-model="loginForm.username" prefix-icon='myicon myicon-user'></el-input>
          </el-form-item>
          <el-form-item prop="password">
              <el-input v-model="loginForm.password" type="password" prefix-icon='myicon myicon-key'></el-input>
          </el-form-item>
          <el-form-item>
              <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login} from '@/api/index.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      // 我们要对表单进行验证，就需要调用表单的valiate方法,这个函数有一个回调，回调有一个参数，这个参数为true,则说明通过验证，否则则输入不合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm).then((res) => {
            if (res.meta.status === 200) {
              // 成功提示消息
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
              // 获取token
              localStorage.setItem('mytoken', res.data.token)
              // 路由跳转
              this.$router.push({name: 'Home'})
            } else {
              // 失败提示消息
              this.$message({
                message: res.meta.msg,
                type: 'error'
              })
            }
          })
        } else {
          console.log('请认真输入账号密码')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
