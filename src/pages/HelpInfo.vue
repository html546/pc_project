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
              header="详情"
              text-variant="white"
              align="left"
              body-class="body"
              header-class="body"
              border-variant="dark"
            >
              <p class="card-text ml-3">收款人的姓名：{{truename}}</p>
              <p class="card-text ml-3">收款人的编号：{{username}}</p>
              <p class="card-text ml-3">收款人的手机号：{{mobile_phone}}</p>
              <p class="card-text ml-3">打款人的姓名：{{truename1}}</p>
              <p class="card-text ml-3">打款人的编号：{{username1}}</p>
              <p class="card-text ml-3">打款人的手机号：{{mobile_phone1}}</p>
            </b-card>
            <b-button
              class="mt-3"
              variant="primary"
              @click="$router.go(-1)"
            >返回</b-button>
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
      username: '',
      mobile_phone: '',
      truename1: '',
      username1: '',
      mobile_phone1: ''
    }
  },
  created() {
    this.getPage();
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bCard.name]: bCard,
    [bFormFile.name]: bFormFile,
    [bImg.name]: bImg
  },
  methods: {
    getPage() {
      let user = localStorage.getItem('user');
      let id = this.$route.params.id;
      base.post(api.info2, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        this.truename = res.data.data.colle_userinfo.truename;
        this.truename1 = res.data.data.pay_userinfo.truename;
        this.username = res.data.data.colle_userinfo.username;
        this.username1 = res.data.data.pay_userinfo.username;
        this.mobile_phone = res.data.data.colle_userinfo.mobile_phone;
        this.mobile_phone1 = res.data.data.pay_userinfo.mobile_phone;
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