let api = {
    login: '/api/login/login', //登录
    logout:'/api/login/logout',//会员登陆退出
    register: '/api/webmember/register', //不用登陆的会员注册
    registersave: '/api/webmember/registersave', //不用登陆的会员注册保存
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
    saledelete:'/api/member/saledelete',//删除未审核的会员
    maillist: '/api/notice/index',//查看会员收到的邮件列表
    viewdetails:'/api/notice/viewdetails', //查看邮件详情
    delmail:'/api/notice/delmail', //邮件删除
    outbox:'/api/notice/outbox', //发件箱
    send:'/api/notice/send', //发送邮件页面
    savesend:'/api/notice/savesend',//提交邮件发送
    membersend:'/api/notice/membersend',//会员之间邮件互相发送
    replymail:'/api/notice/replymail',// 邮件回复页面需获取的信息
    replymails:'/api/notice/replymails', //邮件回复处理
    recommendInWork:'/api/net/recommendInWork',//获取会员的推荐网络
    recommendInLists:'/api/net/recommendInLists',//返回推荐网体下的直推会员
    manageInList:'/api/net/manageInList',//会员管理列表
    manageInWork:'/api/net/manageInWork',//获取会员的管理网络
}


export default api;