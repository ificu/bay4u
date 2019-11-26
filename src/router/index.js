import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login'
import NewQT from '@/views/NewQT'
import NewNewQT from '@/views/NewNewQT'
import NewNewNewQT from '@/views/NewNewNewQT'
import Chat from '@/views/Chat'
import QTList from '@/views/QTList'
import UserInfo from '@/views/UserInfo'
import MainPage from '@/views/MainPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/NewQTOld',
    name: 'NewQTOld',
    component: NewQT
  },
  {
    path: '/NewQTOldOld',
    name: 'NewQTOldOld',
    component: NewNewQT
  },
  {
    path: '/NewQT',
    name: 'NewQT',
    component: NewNewNewQT
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/QTList',
    name: 'QTList',
    component: QTList
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
