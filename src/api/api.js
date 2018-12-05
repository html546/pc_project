let api = {
    login:'/api/login/login', //登录
    register:'/api/webmember/register', //不用登陆的会员注册
    registersave:'/api/webmember/registersave', //不用登陆的会员注册保存
    getad:'/api/index/getad', //获取首页轮播图
    prize_index:'/api/prize/index', //获取销售奖金表
    remittance:'/api/prize/remittance', //获取汇款通知列表
    notice:'/api/notice/notice', //站内公告列表
    noticedetails:'/api/notice/noticedetails', //站内公告详细内容
}

export default api;