<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row
          align-h="start"
          style="height:auto;"
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
              header="打款人信息"
              text-variant="white"
              align="left"
              body-class="body"
              header-class="body"
              border-variant="dark"
            >
              <p class="card-text ml-3">打款人：{{truename}}</p>
              <p class="card-text ml-3">打款人电话：{{mobile_phone}}</p>
              <p class="card-text ml-3">打款人的推荐人电话：{{recommendMobile}}</p>
            </b-card>
            <b-card
              header="打款信息"
              text-variant="white"
              align="left"
              body-class="body"
              header-class="body"
              border-variant="dark"
            >
              <p class="card-text ml-3">打款凭证：
                <b-img
                  :src="image_input"
                  style="width:200px;height:auto;"
                ></b-img>
              </p>
              <p class="card-text ml-3">打款时间：{{moneytime | time1}}</p>
              <p class="card-text ml-3">确认收款剩余时间：{{remain_time | time}}</p>
              <p class="card-text ml-3">确认收款时间：{{okmoneytime | time1}}</p>
            </b-card>
            <b-button
              @click="$router.go(-1)"
              variant="danger"
              class="float-right mt-2"
              style="width:100px;height:40px;"
            >
              返回上一页
            </b-button>
            <b-button
              @click="sure"
              variant="primary"
              class="float-right mt-2 mr-2"
              style="width:100px;height:40px;"
            >确认收款</b-button>
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
import bImg from 'bootstrap-vue/es/components/image/img';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      truename: '',
      mobile_phone: '',
      recommendMobile: '',
      moneytime: '',
      remain_time: '',
      file: '',
      timer: '',
      image_input: '',
      okmoneytime: ''
    }
  },
  created() {
    let _this = this;
    this.timer = setInterval(function () {
      _this.getPage();
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bCard.name]: bCard,
    [bFormFile.name]: bFormFile,
    [bImg.name]: bImg
  },
  filters: {
    time1(val) {
      if (val == 0) {
        return '暂无';
      } else {
        return base.format(val * 1000);
      }
    },
    time(val) {
      let day = parseInt(val / 60 / 60 / 24);
      let hour = parseInt(val / 60 / 60 % 24);
      let min = parseInt(val / 60 % 60);
      let sec = parseInt(val % 60);
      if (day == 0 && hour == 0 && min == 0 && sec == 0) {
        return '打款时间已经截止';
      }
      return day + '天' + hour + '小时' + min + '分钟' + sec + '秒';
    }
  },
  methods: {
    getPage() {
      let user = localStorage.getItem('user');
      let id = this.$route.params.id;
      base.post(api.collemoney, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        this.truename = res.data.data.pay_userinfo.truename;
        this.mobile_phone = res.data.data.pay_userinfo.mobile_phone;
        this.recommendMobile = res.data.data.recommendMobile;
        this.image_input = res.data.data.helps.moneyvoucher;
        this.moneytime = res.data.data.helps.moneytime;
        this.okmoneytime = res.data.data.helps.okmoneytime;
        this.remain_time = res.data.data.remain_time;
        if (this.remain_time <= 0) {
          clearInterval(this.timer);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    sure() {
      let user = localStorage.getItem('user');
      base.post(api.colleHandler, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: this.$route.params.id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.$router.go(-1);
            }
          })

        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
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