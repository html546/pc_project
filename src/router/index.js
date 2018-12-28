import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Forget from '@/pages/Forget'
import Index from '@/pages/index'
import Announce from '@/pages/Announce'
import AnnounceContent from '@/pages/AnnounceContent'
/**
 * 奖金管理
 */
import Prize from '@/pages/Prize'
import Sales from '@/components/Prize/Tab1'
import PrizeRemit from '@/components/Prize/Tab2'
import AddRemit from '@/components/Prize/Tab3'
import Welfare from '@/components/Prize/Tab4'

import Upload from '@/pages/Upload'
/** 
 * 会员资料
 */
import Person from '@/pages/Person'
import Personal from '@/components/Person/Tab1'
import Datum from '@/components/Person/Tab2'
import LoginPass from '@/components/Person/Tab3'
import PayPass from '@/components/Person/Tab4'

import SalesContent from '@/pages/SalesContent'
/**
 * 账户管理
 */
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
/**
 * 公司留言
 */
import Notice from '@/pages/Notice'
import NoticeIndex from '@/components/Notice/Tab1'
import Outbox from '@/components/Notice/Tab2'
import Send from '@/components/Notice/Tab3'
import MemberSend from '@/components/Notice/Tab4'
import NoticeDetail from '@/pages/noticeDetail'
import NoticeReplay from '@/pages/NoticeReplay'
/**
 * 组织图
 */
import Network from '@/pages/Network'
import RecommendIn from '@/components/Network/Tab1'
import RecommendinList from '@/components/Network/Tab2'
import ManageIn from '@/components/Network/Tab3'
import ManageinList from '@/components/Network/Tab4'
/**
 * 财务管理
 */
import Remit from '@/pages/Remit'
import Detail from '@/components/Remit/Tab1'
import Withdraw from '@/components/Remit/Tab2'
import WithdrawList from '@/components/Remit/Tab3'
import Transfer from '@/components/Remit/Tab4'
/**
 * YO乐理财
 */
import Help from '@/pages/Help'
import Supply from '@/components/Help/Tab1'
import SupplyList from '@/components/Help/Tab2'
import Apply from '@/components/Help/Tab3'
import ApplyList from '@/components/Help/Tab4'
import Financing from '@/components/Help/Tab5'

/**
 * EP交易
 */
import Business from '@/pages/Business'
import Market from '@/components/Business/Tab1'
import RecordBuy from '@/components/Business/Tab2'
import RecordSell from '@/components/Business/Tab3'
import Hangout from '@/components/Business/Tab4'

import BusinessDetail from '@/pages/BusinessDetail'
import BusinessRemit from '@/pages/BusinessRemit'
import BusinessRemit1 from '@/pages/BusinessRemit1'
/**
 * 商城消费
 */
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

export let router = new Router({});

export let router1 = [
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
    path: '/announce/:id?',
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
    component: AnnounceContent,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/prize',
    name: 'Prize',
    component: Prize,
    meta: {
      keepAlive: true,
      showname: '奖金管理',
      isMenu: true
    },
    children: [
      {
        path: 'sales/:id1?',
        component: Sales,
        meta: {
          showname: '销售奖金表'
        }
      },
      {
        path: 'remit/:id1?',
        component: PrizeRemit,
        meta: {
          showname: '汇款通知'
        }
      },
      {
        path: 'addremit',
        component: AddRemit,
        meta: {
          showname: '添加汇款通知'
        }
      },
      {
        path: 'welfare/:id1?',
        component: Welfare,
        meta: {
          showname: '旅游奖信息'
        }
      }
    ]
  },
  {
    path: '/prize/remit/upload/:id',
    name: 'Upload',
    component: Upload,
    meta: {
      isfixed: true
    }
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
        component: Personal,
        meta: {
          showname: '个人资料'
        }
      },
      {
        path: 'datum',
        component: Datum,
        meta: {
          showname: '资料管理'
        }
      },
      {
        path: 'loginpass',
        component: LoginPass,
        meta: {
          showname: '登录密码管理'
        }
      },
      {
        path: 'payPass',
        component: PayPass,
        meta: {
          showname: '支付密码管理'
        }
      }
    ]
  },
  {
    path: '/salesContent/:id',
    name: 'SalesContent',
    component: SalesContent,
    meta: {
      keepAlive: true,
      isfixed: true
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
        component: RegisterTab,
        meta: {
          showname: '会员注册'
        }
      },
      {
        path: 'qrcode',
        component: Qrcode,
        meta: {
          showname: '推广链接'
        }
      },
      {
        path: 'throw',
        component: Throw,
        meta: {
          showname: '会员复投'
        }
      },
      {
        path: 'update',
        component: Update,
        meta: {
          showname: '会员升级'
        }
      },
      {
        path: 'qrcodelist/:id1?',
        component: QrcodeList,
        meta: {
          showname: '推广链接管理'
        }
      },
      {
        path: 'morderlist/:id1?',
        component: MorderList,
        meta: {
          showname: '会员订单管理'
        }
      },
      {
        path: 'msonorderlist/:id1?',
        component: MsonorderList,
        meta: {
          showname: '我的会员订单'
        }
      },
      {
        path: 'mactionlist/:id1?',
        component: MactionList,
        meta: {
          showname: '我的操作订单'
        }
      }
    ]
  },
  {
    path: '/accountContent/:id',
    name: 'AccountContent',
    component: AccountContent,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice,
    meta: {
      keepAlive: true,
      showname: '公司留言',
      isMenu: true
    },
    children: [
      {
        path: 'index/:id1?',
        component: NoticeIndex,
        meta: {
          showname: '邮件列表'
        }
      },
      {
        path: 'outbox/:id1?',
        component: Outbox,
        meta: {
          showname: '发件箱'
        }
      },
      {
        path: 'send',
        component: Send,
        meta: {
          showname: '给管理员发送邮件'
        }
      },
      {
        path: 'membersend',
        component: MemberSend,
        meta: {
          showname: '会员邮件互发'
        }
      }
    ]
  },
  {
    path: '/noticeDetail/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/noticeReplay/:id',
    name: 'NoticeReplay',
    component: NoticeReplay,
    meta: {
      isfixed: true
    }
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
        component: RecommendIn,
        meta: {
          showname: '推荐网络'
        }
      },
      {
        path: 'recommendinlist/:id1?',
        component: RecommendinList,
        meta: {
          showname: '推荐列表'
        }
      },
      {
        path: 'managein',
        component: ManageIn,
        meta: {
          showname: '管理网络'
        }
      },
      {
        path: 'manageinlist/:id1?',
        component: ManageinList,
        meta: {
          showname: '管理列表'
        }
      }
    ]
  },
  {
    path: '/remit',
    name: 'Remit',
    component: Remit,
    meta: {
      keepAlive: true,
      showname: '财务管理',
      isMenu: true
    },
    children: [
      {
        path: 'detail/:id1?',
        component: Detail,
        meta: {
          showname: '钱包明细列表'
        }
      },
      {
        path: 'withdraw',
        component: Withdraw,
        meta: {
          showname: '钱包提现'
        }
      },
      {
        path: 'withdrawList/:id1?',
        component: WithdrawList,
        meta: {
          showname: '钱包提现列表'
        }
      },
      {
        path: 'transfer',
        component: Transfer,
        meta: {
          showname: '钱包转账'
        }
      }
    ]
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      keepAlive: true,
      showname: 'YO乐理财',
      isMenu: true
    },
    children: [
      {
        path: 'supply',
        component: Supply,
        meta: {
          showname: '提供帮助'
        }
      },
      {
        path: 'supplylist/:id1?',
        component: SupplyList,
        meta: {
          showname: '提供帮助明细'
        }
      },
      {
        path: 'apply',
        component: Apply,
        meta: {
          showname: '申请帮助'
        }
      },
      {
        path: 'applylist/:id1?',
        component: ApplyList,
        meta: {
          showname: '申请帮助明细'
        }
      },
      {
        path: 'financing/:id1?',
        component: Financing,
        meta: {
          showname: '理财明细'
        }
      }
    ]
  },
  {
    path: '/business',
    name: 'Business',
    component: Business,
    meta: {
      keepAlive: true,
      showname: 'EP交易',
      isMenu: true
    },
    children: [
      {
        path: 'market/:id1?',
        component: Market,
        meta: {
          showname: '交易平台交易市场'
        }
      },
      {
        path: 'recordbuy/:id1?',
        component: RecordBuy,
        meta: {
          showname: '交易平台买入记录'
        }
      },
      {
        path: 'recordsell/:id1?',
        component: RecordSell,
        meta: {
          showname: '交易平台卖出记录'
        }
      },
      {
        path: 'hangout/:id1?',
        component: Hangout,
        meta: {
          showname: '交易平台交易挂出'
        }
      }
    ]
  },
  {
    path: '/businessdetail/:id',
    name: 'BusinessDetail',
    component: BusinessDetail,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/businessremit/:id',
    name: 'BusinessRemit',
    component: BusinessRemit,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/businessremit1/:id',
    name: 'BusinessRemit1',
    component: BusinessRemit1,
    meta: {
      isfixed: true
    }
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
        component: List,
        meta: {
          showname: '商品列表'
        }
      },
      {
        path: 'cart',
        component: Cart,
        meta: {
          showname: '购物车'
        }
      },
      {
        path: 'order',
        component: Order,
        meta: {
          showname: '我的订单'
        }
      }
    ]
  },
  {
    path: '/arbitrate/:id',
    name: 'Arbitrate',
    component: Arbitrate,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/goodsinfo/:id',
    name: 'GoodsInfo',
    component: GoodsInfo,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/ordersubmit/:id?',
    name: 'OrderSubmit',
    component: OrderSubmit,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/orderpay/:id',
    name: 'OrderPay',
    component: OrderPay,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/orderdetail/:id',
    name: 'OrderDetail',
    component: OrderDetail,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/paymoney/:id',
    name: 'PayMoney',
    component: PayMoney,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/helpinfo/:id',
    name: 'HelpInfo',
    component: HelpInfo,
    meta: {
      isfixed: true
    }
  },
  {
    path: '/collemoney/:id',
    name: 'ColleMoney',
    component: ColleMoney,
    meta: {
      isfixed: true
    }
  }
]


