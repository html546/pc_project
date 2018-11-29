import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Index from '@/pages/index'
import Announce from '@/pages/Announce'
import AnnounceContent from '@/pages/AnnounceContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path:'/announce',
      name:'Announce',
      component:Announce
    },
    {
      path:'/announceContent',
      name:'AnnounceContent',
      component:AnnounceContent
    }
  ]
})
