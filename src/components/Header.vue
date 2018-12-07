<template>
  <div class="header">
    <b-navbar
      toggleable="md"
      class="nav_bar bg_dark1"
      type="dark"
      variant="dark"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <img
          src="../assets/images/logos.png"
          alt=""
        >
      </b-navbar-brand>
      <b-collapse
        is-nav
        id="nav_collapse"
      >
        <b-navbar-nav>
          <b-nav-item
            router-tag="a"
            to="/index"
          >首页</b-nav-item>
          <b-nav-item-dropdown text="会员资料">
            <b-dropdown-item
              router-tag="a"
              to="/person/personal"
            >个人资料</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/person/datum"
            >资料管理</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/person/loginPass"
            >登录密码管理</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/person/payPass"
            >支付密码管理</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="账户管理">
            <b-dropdown-item
              router-tag="a"
              to="/account/register"
            >会员注册</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/qrcode"
            >推广链接</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/again"
            >会员复投</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/update"
            >会员升级</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/qrcidelist"
            >推广链接管理</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/morderlist"
            >会员订单管理</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/msonorderlist"
            >我的会员订单</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/account/mactionlist"
            >我的操作订单</b-dropdown-item>
            <!-- <b-dropdown-item router-tag="a" to="">实名认证</b-dropdown-item> -->
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="商城消费">
            <b-dropdown-item href="#">商品列表</b-dropdown-item>
            <b-dropdown-item href="#">购物车</b-dropdown-item>
            <b-dropdown-item href="#">我的订单</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="组织图">
            <b-dropdown-item href="#">推荐网络</b-dropdown-item>
            <b-dropdown-item href="#">推荐列表</b-dropdown-item>
            <b-dropdown-item href="#">管理网络</b-dropdown-item>
            <b-dropdown-item href="#">管理列表</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="奖金管理">
            <b-dropdown-item
              router-tag="a"
              to="/prize/sales"
            >销售奖金表</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/prize/remit"
            >汇款通知</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/prize/addremit"
            >添加汇款通知</b-dropdown-item>
            <b-dropdown-item
              router-tag="a"
              to="/prize/welfare"
            >旅游奖信息</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="财务管理">
            <b-dropdown-item href="#">奖金钱包明细</b-dropdown-item>
            <b-dropdown-item href="#">奖金钱包提现</b-dropdown-item>
            <b-dropdown-item href="#">奖金钱包转账</b-dropdown-item>
            <b-dropdown-item href="#">保险钱包明细</b-dropdown-item>
            <b-dropdown-item href="#">层碰奖钱包明细</b-dropdown-item>
            <b-dropdown-item href="#">商家钱包明细</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="YO乐理财">
            <b-dropdown-item href="#">开心付出</b-dropdown-item>
            <b-dropdown-item href="#">开心付出明细</b-dropdown-item>
            <b-dropdown-item href="#">快乐收获</b-dropdown-item>
            <b-dropdown-item href="#">快乐收获明细</b-dropdown-item>
            <b-dropdown-item href="#">理财明细</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="公司留言">
            <b-dropdown-item href="#">邮件列表</b-dropdown-item>
            <b-dropdown-item href="#">发件箱</b-dropdown-item>
            <b-dropdown-item href="#">给管理员发送邮件</b-dropdown-item>
            <b-dropdown-item href="#">会员邮件互发</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="公告栏">
            <b-dropdown-item
              router-tag="a"
              to="/announce/1"
            >查看公告</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            text="中文(简体)"
            right
          >
            <b-dropdown-item href="#">日本语</b-dropdown-item>
            <b-dropdown-item href="#">繁体中文</b-dropdown-item>
            <b-dropdown-item href="#">简体中文</b-dropdown-item>
            <b-dropdown-item href="#">English</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            href="#"
            right
            @click="logout"
          > |&nbsp;&nbsp;&nbsp;&nbsp;安全退出</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import '../assets/sass/login.sass';
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
export default {
  name: '',
  data() {
    return {

    }
  },
  methods: {
    logout() {
      var user = localStorage.getItem('user');
      this.$http.post(this.HOST + 'api/login/logout', {
        userid: JSON.parse(user).id
      }).then((res) => {
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then((res) => {
            if (res.value) {
              this.$router.push('/');
              localStorage.removeItem('user');
            }
          })
        } else {
          this.$swal({
            type: 'error',
            title: res.data.msg
          })
        }
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    }
  }
}
</script>

<style scoped>
.bg_dark1 {
  background-color: #050e1e !important;
  padding: 0.5rem 4rem;
}
.dropdown-menu .dropdown-item {
  background-color: #050e1e !important;
  color: #fff;
}
</style>