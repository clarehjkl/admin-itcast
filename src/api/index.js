import axios from 'axios'
// 配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
// 设置默认的基准路径
axios.defaults.baseURL = baseURL

// 添加一个拦截器
axios.interceptors.request.use(function (config) {
  var token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 登录
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
// 左侧菜单栏
// export const getMenu = (pa) => {
//   return axios.get('menus', {params: pa}).then((res) => {
//     return res
//   })
// }
// 获取用户数据
export const getAllUserList = (pa) => {
  return axios.get('users', {params: pa}).then((res) => {
    return res.data
  })
}

// 添加用户
export const addUser = (pa) => {
  return axios.post('users', pa).then((res) => {
    return res.data
  })
}

// 删除用户
export const deleteUserById = (id) => {
  return axios.delete(`users/${id}`).then((res) => {
    return res.data
  })
}

// 编辑用户
export const editUser = (pa) => {
  return axios.put(`users/${pa.id}`, pa).then((res) => {
    return res.data
  })
}

// 获取权限列表
export const getAllRightsList = (type) => {
  return axios.get(`rights/${type}`).then((res) => {
    return res.data
  })
}
