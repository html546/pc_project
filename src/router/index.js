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
import BusinessRemit1 from '@/pages/BusinessRemit1'
import Mall from '@/pages/Mall'
import Arbitrate from '@/pages/Arbitrate'
import GoodsInfo from '@/pages/GoodsInfo'
import OrderSubmit from '@/pages/OrderSubmit'
import OrderPay from '@/pages/OrderPay'
import OrderDetail from '@/pages/OrderDetail'
import PayMoney from '@/pages/PayMoney'
import HelpInfo from '@/pages/HelpInfo'

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
    },
    {
      path: '/businessremit1/:id',
      name: 'BusinessRemit1',
      component: BusinessRemit1
    },
    {
      path: '/mall/:id/:id1?',
      name: 'Mall',
      component: Mall,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/arbitrate/:id',
      name: 'Arbitrate',
      component: Arbitrate
    },
    {
      path: '/goodsinfo/:id',
      name: 'GoodsInfo',
      component: GoodsInfo
    },
    {
      path: '/ordersubmit/:id?',
      name: 'OrderSubmit',
      component: OrderSubmit
    },
    {
      path: '/orderpay/:id',
      name: 'OrderPay',
      component: OrderPay
    },
    {
      path: '/orderdetail/:id',
      name: OrderDetail,
      component: OrderDetail
    },
    {
      path: '/paymoney/:id',
      name: PayMoney,
      component: PayMoney
    },
    {
      path: '/helpinfo/:id',
      name: HelpInfo,
      component: HelpInfo
    }
  ]
})
