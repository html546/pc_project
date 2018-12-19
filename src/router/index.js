import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Forget from '@/pages/Forget'
import Index from '@/pages/index'
import Announce from '@/pages/Announce'
import AnnounceContent from '@/pages/AnnounceContent'
import Prize from '@/pages/Prize'
import Upload from '@/pages/Upload'
import Person from '@/pages/Person'
import SalesContent from '@/pages/SalesContent'
import Account from '@/pages/Account'
import AccountContent from '@/pages/AccountContent'
import Notice from '@/pages/Notice'
import NoticeDetail from '@/pages/noticeDetail'
import NoticeReplay from '@/pages/NoticeReplay'
import Network from '@/pages/Network'
import Remit from '@/pages/Remit'
import Help from '@/pages/Help'
import Business from '@/pages/Business'
import BusinessDetail from '@/pages/BusinessDetail'
import BusinessRemit from '@/pages/BusinessRemit'

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
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/announce/:id',
      name: 'Announce',
      component: Announce,
      meta: {
        keepAlive: true
      }
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
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/prize/remit/upload/:id',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/person/:id',
      name: 'Person',
      component: Person,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/salesContent/:id',
      name: 'SalesContent',
      component: SalesContent,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/account/:id/:id1?',
      name: 'Account',
      component: Account,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/accountContent/:id',
      name: 'AccountContent',
      component: AccountContent
    },
    {
      path: '/notice/:id/:id1?',
      name: 'Notice',
      component: Notice,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/noticeDetail/:id',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/noticeReplay/:id',
      name: 'NoticeReplay',
      component: NoticeReplay
    },
    {
      path: '/network/:id/:id1?',
      name: 'Network',
      component: Network,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/remit/:id/:id1?',
      name: 'Remit',
      component: Remit,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/help/:id/:id1?',
      name: 'Help',
      component: Help,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/business/:id/:id1?',
      name: 'Business',
      component: Business,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/businessdetail/:id',
      name: 'BusinessDetail',
      component: BusinessDetail
    },
    {
      path: '/businessremit/:id',
      name: 'BusinessRemit',
      component: BusinessRemit
    }
  ]
})
