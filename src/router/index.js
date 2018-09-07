import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/user/User.vue'
import Role from '@/views/right/Role.vue'
import Right from '@/views/right/Right.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          name: 'User',
          path: 'user',
          component: User
        },
        {
          path: 'Role',
          name: 'role',
          component: Role
        },
        {
          path: 'Right',
          name: 'right',
          component: Right
        }
      ]
    }

  ]
})
