<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row
          align-h="start"
          style="height:50rem;"
        >
          <b-col
            cols="12"
            sm="12"
            md="12"
            xl="12"
            lg="12"
            style="margin-top:100px;"
          >
            <b-card
              header="收款方信息"
              text-variant="white"
              align="left"
              body-class="body"
              header-class="body"
              border-variant="dark"
            >
              <p class="card-text ml-3">收款方：{{collename}}</p>
              <p class="card-text ml-3">收款方手机：{{collemobile}}</p>
              <p class="card-text ml-3">开户行：{{bank_name}}</p>
              <p class="card-text ml-3">银行卡号：{{bank_number}}</p>
              <p class="card-text ml-3">开户名：{{bank_username}}</p>
              <p class="card-text ml-3">开户地址：{{bank_addr}}</p>
              <p class="card-text ml-3">支付宝：{{alipay}}</p>
              <p class="card-text ml-3">微信账号：{{wechat}}</p>
            </b-card>
            <b-card
              header="打款信息"
              text-variant="white"
              align="left"
              body-class="body"
              header-class="body"
              border-variant="dark"
            >
              <p class="card-text ml-3">打款金额：{{money}}</p>
              <p class="card-text ml-3">打款剩余时间：{{remain_time | time}}</p>
              <p class="card-text ml-3">
                上传凭证
                <b-form-file
                  v-model="file"
                  placeholder="请提交凭据"
                  accept="image/*"
                  @change="upload"
                ></b-form-file>
              </p>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import api from '../api/api.js';
import bButton from 'bootstrap-vue/es/components/button/button';
import bCard from 'bootstrap-vue/es/components/card/card';
import bFormFile from 'bootstrap-vue/es/components/form-file/form-file';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      collename: '',
      collemobile: '',
      bank_name: '',
      bank_number: '',
      bank_username: '',
      bank_addr: '',
      alipay: '',
      wechat: '',
      money: '',
      remain_time: '',
      file: '',
      timer: ''
    }
  },
  created() {
    let _this = this;
    this.timer = setInterval(function () {
      _this.getPage();
    }, 1000)
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bCard.name]: bCard,
    [bFormFile.name]: bFormFile
  },
  filters: {
    time(val) {
      let _this = this;
      let day = parseInt(val / 60 / 60 / 24);
      let hour = parseInt(val / 60 / 60 % 24);
      let min = parseInt(val / 60 % 60);
      let sec = parseInt(val % 60);
      if (day == 0 && hour == 0 && min == 0 && sec == 0) {
        // clearInterval(_this.timer);
        return '打款时间已经截止';
      }
      return day + '天' + hour + '小时' + min + '分钟' + sec + '秒';
    }
  },
  methods: {
    upload(e) {
      console.log(e);
    },
    getPage() {
      let user = localStorage.getItem('user');
      let id = this.$route.params.id;
      base.post(api.paymoney, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        this.collename = res.data.data.colle_userinfo.truename;
        this.collemobile = res.data.data.colle_userinfo.mobile_phone;
        this.bank_name = res.data.data.colle_userinfo.bank_name;
        this.bank_number = res.data.data.colle_userinfo.bank_number;
        this.bank_username = res.data.data.colle_userinfo.bank_username;
        this.bank_addr = res.data.data.colle_userinfo.bank_addr;
        this.alipay = res.data.data.colle_userinfo.alipay;
        this.wechat = res.data.data.colle_userinfo.wechat;
        this.money = res.data.data.help.money;
        this.remain_time = res.data.data.remain_time;
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="" scoped>
.body {
  background: #0a1222;
  border: none;
}
.bg-dark1 {
  background: #0a1222;
}
</style>