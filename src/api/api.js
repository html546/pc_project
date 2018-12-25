let api = {
    login: '/api/login/login', //登录
    logout: '/api/login/logout',//会员登陆退出
    register: '/api/webmember/register', //不用登陆的会员注册
    registersave: '/api/webmember/registersave', //不用登陆的会员注册保存
    forgetPassByMobile: '/api/login/forgetPassByMobile', //找回密码(手机)
    getad: '/api/index/getad', //获取首页轮播图
    prize_index: '/api/prize/index', //获取销售奖金表
    remittance: '/api/prize/remittance', //获取汇款通知列表
    notice: '/api/notice/notice', //站内公告列表
    noticedetails: '/api/notice/noticedetails', //站内公告详细内容
    addremittance: '/api/prize/addremittance', //添加汇款通知页面
    addremittances: '/api/prize/addremittances', //添加汇款通知页面保存
    pingzheng: '/api/prize/pingzhengs', //上传汇款凭证
    welfareNode: '/api/prize/welfareNode', //福利奖节点
    welfareList: '/api/prize/welfareList', //福利奖信息
    prizeform: '/api/prize/prizeform',//销售奖金明细
    memberProfile: '/api/member/memberProfile', //会员资料查看
    profileManagement: '/api/member/profileManagement', //会员资料修改
    saveprofile: '/api/member/saveprofile', //会员资料修改保存
    getProvince: '/api/Webmember/getProvince', //获取省份
    getArea: '/api/Webmember/getArea', //获取市或县区
    getbanks: '/api/member/getbanks',//银行卡信息
    savepassword: '/api/member/savepassword', //登录密码修改接口
    savepassword2: '/api/member/savepassword2', //支付密码修改接口
    register1: '/api/member/register', //会员注册页面接口
    registersave1: '/api/member/registersave', //慧眼注册处理页面接口
    qrCode: '/api/member/qrCode', //推广链接
    qrCodeList: '/api/member/qrCodeList', //通过推广链接注册的会员列表
    mOrderList: '/api/member/mOrderList',//不是通过推广链接注册的会员列表
    mSonOrderList: '/api/member/mSonOrderList',//我注册的会员列表
    mActionList: '/api/member/mActionList', //我的订单列表
    saleAudit: '/api/member/saleAudit',//订单审核
    saleView: '/api/member/saleView',// 订单详情
    saledelete: '/api/member/saledelete',//删除未审核的会员
    maillist: '/api/notice/index',//查看会员收到的邮件列表
    viewdetails: '/api/notice/viewdetails', //查看邮件详情
    delmail: '/api/notice/delmail', //邮件删除
    outbox: '/api/notice/outbox', //发件箱
    send: '/api/notice/send', //发送邮件页面
    savesend: '/api/notice/savesend',//提交邮件发送
    membersend: '/api/notice/membersend',//会员之间邮件互相发送
    replymail: '/api/notice/replymail',// 邮件回复页面需获取的信息
    replymails: '/api/notice/replymails', //邮件回复处理
    recommendInWork: '/api/net/recommendInWork',//获取会员的推荐网络
    recommendInLists: '/api/net/recommendInLists',//返回推荐网体下的直推会员
    manageInList: '/api/net/manageInList',//会员管理列表
    manageInWork: '/api/net/manageInWork',//获取会员的管理网络
    info: '/api/finance/info',//钱包明细列表
    withdraw: '/api/finance/withdraw',//钱包提现页面
    withdrawsave: '/api/finance/withdrawsave', //提交钱包提现
    withdrawList: '/api/finance/withdrawList',//提现明细
    cancelwithdraw: '/api/finance/cancelwithdraw',//撤销钱包提现
    getUserWallet: '/api/finance/getUserWallet',//查询钱包及其余额
    transfer: '/api/finance/transfer',//钱包转账页面
    transfers: '/api/finance/transfers',//钱包转账处理
    helpNode: '/api/help/helpNode',//互助节点
    salepage: '/api/help/salepage', //提供帮助和申请帮助页面
    sale: '/api/help/sale', //提交提供帮助或提交申请帮助
    salelist: '/api/help/salelist',//提供帮助或申请帮助列表
    send_validate_code: '/api/login/send_validate_code', //发送验证码
    detail: '/api/help/detail',//互助列表
    getVerifyCode: '/api/login/getVerifyCode',//获取图片验证码
    verify: '/api/login/verify', //短信验证码发送前验证
    index: '/api/trade/index',//交易市场
    start: '/api/trade/start',//挂买和挂卖
    buytrade: '/api/trade/buytrade',//购买和卖出操作
    viewbuytrade: '/api/trade/viewbuytrade',//交易记录查看
    tradeinfo: '/api/trade/tradeinfo',//自己的挂买挂卖列表
    buyinfo: '/api/trade/buyinfo', //交易明细
    cancelbuytrade: '/api/trade/cancelbuytrade', //撤销购买交易
    canceltrade: '/api/trade/canceltrade',//交易市场的撤销
    remitbuytrade: '/api/trade/remitbuytrade', //交易汇款
    getFee: '/api/trade/getFee',//获取交易手续费
    upload: '/api/trade/upload',//上传凭证
    okbuytrade: '/api/trade/okbuytrade', //确认购买交易
    stopbuytrade: '/api/trade/stopbuytrade',//卖家申请仲裁
    proofbuytrade: '/api/trade/proofbuytrade',//买家提交凭据
    get_category: '/api/goods/get_category',//获取商品分类子类
    brands: '/api/goods/brands',//获取商品品牌
    goodsList: '/api/goods/goodsList',//商品列表
    goodsInfo: '/api/goods/goodsInfo',//商品信息
    ajaxAddCart: '/api/cart/ajaxAddCart',//将商品加入购物车
    ajaxCartList: '/api/cart/ajaxCartList',//请求获取购物车列表
    ajaxDelCart: '/api/cart/ajaxDelCart',//删除购物车的商品
    collect_goods: '/api/goods/collect_goods',//收藏商品
    addGoodsNumber: '/api/cart/addGoodsNumber',//修改商品数量
    cempty: '/api/cart/cempty',//清空购物车
    selectedGoods: '/api/cart/selectedGoods',//选中状态接口
    orderList: '/api/cart/orderList',//订单列表
    cancel_order: '/api/cart/cancel_order',//取消订单
    cart2: '/api/cart/cart2',//订单确认提交页面
    cart3: '/api/cart/cart3',//订单确认提交保存流程
    cart4: '/api/cart/cart4',//支付页面
    orderDetail: '/api/cart/orderDetail',//订单查看
    getCode2: '/api/cart/getCode2',//支付保存流程
    ajaxAddress: '/api/cart/ajaxAddress',//收货地址列表
    addAddress: '/api/cart/addAddress',//添加收货地址
    getRegionByParentId: '/api/cart/getRegionByParentId',//获取区域
    delAddress: '/api/cart/delAddress',//删除收货地址
    ajaxeditAddress: '/api/cart/ajaxeditAddress',//编辑收货地址页面
    editAddress: '/api/cart/editAddress',//编辑收货地址保存
}


export default api;