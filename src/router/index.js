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
import Personal from '@/components/Person/Tab1'
import Datum from '@/components/Person/Tab2'
import LoginPass from '@/components/Person/Tab3'
import PayPass from '@/components/Person/Tab4'

import SalesContent from '@/pages/SalesContent'

import Account from '@/pages/Account'
import RegisterTab from '@/components/Account/Tab1'
import Qrcode from '@/components/Account/Tab2'
import Throw from '@/components/Account/Tab3'
import Update from '@/components/Account/Tab4'
import QrcodeList from '@/components/Account/Tab5'
import MorderList from '@/components/Account/Tab6'
import MsonorderList from '@/components/Account/Tab7'
import MactionList from '@/components/Account/Tab8'

import AccountContent from '@/pages/AccountContent'
import Notice from '@/pages/Notice'
import NoticeDetail from '@/pages/noticeDetail'
import NoticeReplay from '@/pages/NoticeReplay'

import Network from '@/pages/Network'
import RecommendIn from '@/components/Network/Tab1'
import RecommendinList from '@/components/Network/Tab2'
import ManageIn from '@/components/Network/Tab3'
import ManageinList from '@/components/Network/Tab4'

import Remit from '@/pages/Remit'
import Help from '@/pages/Help'
import Business from '@/pages/Business'
import BusinessDetail from '@/pages/BusinessDetail'
import BusinessRemit from '@/pages/BusinessRemit'
import BusinessRemit1 from '@/pages/BusinessRemit1'

import Mall from '@/pages/Mall'
import List from '@/components/Mall/List'
import Cart from '@/components/Mall/Cart'
import Order from '@/components/Mall/Order'


import Arbitrate from '@/pages/Arbitrate'
import GoodsInfo from '@/pages/GoodsInfo'
import OrderSubmit from '@/pages/OrderSubmit'
import OrderPay from '@/pages/OrderPay'
import OrderDetail from '@/pages/OrderDetail'
import PayMoney from '@/pages/PayMoney'
import HelpInfo from '@/pages/HelpInfo'
import ColleMoney from '@/pages/ColleMoney'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        showname: '登录',
        isMenu: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        showname: '注册',
        isMenu: true
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget,
      meta: {
        showname: '忘记密码',
        isMenu: true
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        showname: '首页',
        isMenu: true
      }
    },
    {
      path: '/announce/:id',
      name: 'Announce',
      component: Announce,
      meta: {
        keepAlive: true,
        showname: '公告栏',
        isMenu: true
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
        keepAlive: true,
        showname: '奖金管理',
        isMenu: true
      }
    },
    {
      path: '/prize/remit/upload/:id',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      meta: {
        keepAlive: true,
        showname: '会员资料',
        isMenu: true
      },
      children: [
        {
          path: 'personal',
          component: Personal
        },
        {
          path: 'datum',
          component: Datum
        },
        {
          path: 'loginpass',
          component: LoginPass
        },
        {
          path: 'payPass',
          component: PayPass
        }
      ]
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
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        keepAlive: true,
        showname: '账户管理',
        isMenu: true
      },
      children: [
        {
          path: 'register',
          component: RegisterTab
        },
        {
          path: 'qrcode',
          component: Qrcode
        },
        {
          path: 'throw',
          component: Throw
        },
        {
          path: 'update',
          component: Update
        },
        {
          path: 'qrcodelist/:id1?',
          component: QrcodeList
        },
        {
          path: 'morderlist/:id1?',
          component: MorderList
        },
        {
          path: 'msonorderlist/:id1?',
          component: MsonorderList
        },
        {
          path: 'mactionlist/:id1?',
          component: MactionList
        }
      ]
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
        keepAlive: true,
        showname: '公司留言',
        isMenu: true
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
      path: '/network',
      name: 'Network',
      component: Network,
      meta: {
        keepAlive: true,
        showname: '组织图',
        isMenu: true
      },
      children: [
        {
          path: 'recommendin',
          component: RecommendIn
        },
        {
          path: 'recommendinlist/:id1?',
          component: RecommendinList
        },
        {
          path: 'managein',
          component: ManageIn
        },
        {
          path: 'manageinlist/:id1?',
          component: ManageinList
        }
      ]
    },
    {
      path: '/remit/:id/:id1?',
      name: 'Remit',
      component: Remit,
      meta: {
        keepAlive: true,
        showname: '财务管理',
        isMenu: true
      }
    },
    {
      path: '/help/:id/:id1?',
      name: 'Help',
      component: Help,
      meta: {
        keepAlive: true,
        showname: 'YO乐理财',
        isMenu: true
      }
    },
    {
      path: '/business/:id/:id1?',
      name: 'Business',
      component: Business,
      meta: {
        keepAlive: true,
        showname: 'EP交易',
        isMenu: true
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
      path: '/mall',
      name: 'Mall',
      component: Mall,
      meta: {
        keepAlive: true,
        showname: '商城消费',
        isMenu: true
      },
      children: [
        {
          path: 'list/:id1?',
          component: List
        },
        {
          path: 'cart',
          component: Cart
        },
        {
          path: 'order',
          component: Order
        }
      ]
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
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/paymoney/:id',
      name: 'PayMoney',
      component: PayMoney
    },
    {
      path: '/helpinfo/:id',
      name: 'HelpInfo',
      component: HelpInfo
    },
    {
      path: '/collemoney/:id',
      name: 'ColleMoney',
      component: ColleMoney
    }
  ]
})
