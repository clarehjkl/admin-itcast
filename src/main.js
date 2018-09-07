// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/icon.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 使用mui
Vue.use(ElementUI)

Vue.config.productionTip = false

// 调用全局守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('mytoken')
  if (token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({name: 'Login'})
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
