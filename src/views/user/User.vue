<template>
  <div>
    <!-- 头部 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input v-model="serachKey" @keyup.native.enter="searchUserList" class="input-with-select" placeholder="请输入内容" style="width:300px">
      <el-button slot="append" @click='searchUserList' icon="el-icon-search"></el-button>
    </el-input>
    <!-- 成功按钮 -->
    <el-button type="success" plain @click='adddialogFormVisible=true'>添加用户</el-button>
    <!-- 详细表单 -->
    <template>
      <el-table :data="userList" border style="width: 100%;margin-top:20px">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <!-- 表单 状态开关 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <!-- 表单 三种操作方法 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" plain @click='showEditDialog(scope.row)'></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete" plain @click='deleteUser(scope.row.id)'></el-button>
            </el-tooltip>
            <el-tooltip content="授权角色" placement="top">
              <el-button type="primary" icon="el-icon-share" plain></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" ref="addform" :rules="rules">
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="addform.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input v-model="addform.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="addform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" ref="editform" :rules="rules">
        <el-form-item label="用户名：" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editform.username" auto-complete="off" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editform.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话：" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editform.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllUserList,
  addUser,
  deleteUserById,
  editUser
} from '@/api/index.js'
export default {
  data () {
    return {
      input: '',
      userList: [],
      pagesize: 10,
      pagenum: 1,
      total: 0,
      serachKey: '',
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      adddialogFormVisible: false,
      editdialogFormVisible: false,
      formLabelWidth: '120px',
      // 用户数据规范
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 页面重新载入
    initList () {
      getAllUserList({query: this.serachKey, pagenum: this.pagenum, pagesize: this.pagesize}).then((res) => {
        this.userList = res.data.users
        this.total = res.data.total
      })
    },
    edituser (row) {
      console.log(row)
    },
    // 每页显示数量
    handleSizeChange (val) {
      this.pagesize = val
      this.initList()
    },
    // 页码数
    handleCurrentChange (val) {
      this.pagenum = val
      this.initList()
    },
    // 搜索
    searchUserList () {
      this.initList()
    },
    // 添加用户
    addUserSubmit (addform) {
      this.$refs[addform].validate(valid => {
        if (valid) {
          addUser(this.addform).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                message: res.meta.msg,
                type: 'success'
              })
            }
            this.adddialogFormVisible = false
            this.$refs[addform].resetFields()
            this.initList()
          })
        } else {
          this.$message({
            message: '输入数据不合法',
            type: 'error'
          })
        }
      })
      this.adddialogFormVisible = false
      addUser()
    },
    // 删除用户
    deleteUser (id) {
      this.$confirm(
        `此操作将永久删除id号为${id}的数据，是否继续？`,
        '删除提示',
        {
          confirmButtonText: '确定',
          cancelButtonClass: '取消'
        }
      ).then(() => {
        deleteUserById(id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.initList()
          } else {
            this.$messgae({
              message: res.meta.msg,
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          message: '已取消删除',
          type: 'info'
        })
      })
    },
    // 获取修改用户的数据
    showEditDialog (row) {
      console.log(row)
      this.editdialogFormVisible = true
      this.editform.id = row.id
      this.editform.username = row.username
      this.editform.email = row.email
      this.editform.mobile = row.mobile
    },
    // 修改用户
    editUserSubmit (editform) {
      this.$refs[editform].validate(valid => {
        editUser(this.editform).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              message: res.meta.msg,
              type: 'success'
            })
            this.editdialogFormVisible = false
            this.initList()
          } else {
            this.$message({
              message: '输入不合法',
              type: 'error'
            })
          }
        })
      })
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
