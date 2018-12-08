import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Index from '@/pages/index'
import Announce from '@/pages/Announce'
import AnnounceContent from '@/pages/AnnounceContent'
import Prize from '@/pages/Prize'
import Upload from '@/pages/Upload'
import Person from '@/pages/Person'
import SalesContent from '@/pages/SalesContent'
import Account from '@/pages/Account'
import AccountContent from '@/pages/AccountContent'

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
      path: '/announce/:id',
      name: 'Announce',
      component: Announce
    },
    {
      path: '/announceContent/:id',
      name: 'AnnounceContent',
      component: AnnounceContent
    },
    {
      path: '/prize/:id/:id1?',
      name: 'Prize',
      component: Prize,
    },
    {
      path: '/prize/remit/upload/:id',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/person/:id',
      name: 'Person',
      component: Person
    },
    {
      path: '/salesContent/:id',
      name: 'SalesContent',
      component: SalesContent
    },
    {
      path: '/account/:id',
      name: 'Account',
      component: Account
    },
    {
      path: '/accountContent/:id',
      name: 'AccountContent',
      component: AccountContent
    }
  ]
})
