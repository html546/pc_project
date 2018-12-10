let api = {
    login: '/api/login/login', //登录
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
    maillist: '/api/notice/index',//查看会员收到的邮件列表
    viewdetails:'/api/notice/viewdetails', //查看邮件详情
    delmail:'/api/notice/delmail', //邮件删除
    outbox:'/api/notice/outbox', //发件箱
}

export default api;