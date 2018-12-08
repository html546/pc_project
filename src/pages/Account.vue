<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <div>
        <b-container>
          <b-row align-h="center">
            <b-col
              sm="12"
              md="12"
              cols="12"
              xl="12"
              lg="12"
              align-self="center"
              class="announce_panel"
            >
              <b-row aligh-h="center">
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='register'?'warning':'outline-success'"
                    @click="routeChange('register')"
                  >会员注册</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='qrcode'?'warning':'outline-success'"
                    @click="routeChange('qrcode')"
                  >推广链接</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='throw'?'warning':'outline-success'"
                    @click="routeChange('throw')"
                  >会员复投</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='update'?'warning':'outline-success'"
                    @click="routeChange('update')"
                  >会员升级</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='qrcodelist'?'warning':'outline-success'"
                    @click="routeChange('qrcodelist')"
                  >推广链接管理</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='morderlist'?'warning':'outline-success'"
                    @click="routeChange('morderlist')"
                  >会员订单管理</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='msonorderlist'?'warning':'outline-success'"
                    @click="routeChange('msonorderlist')"
                  >我的会员订单</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='mactionlist'?'warning':'outline-success'"
                    @click="routeChange('mactionlist')"
                  >我的操作订单</b-button>
                </b-col>
              </b-row>
              <Tab1 v-show="ActiveId == 'register'" />
              <Tab2 v-show="ActiveId == 'qrcode'" />
              <Tab3 v-show="ActiveId == 'throw'" />
              <Tab4 v-show="ActiveId == 'update'" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import bButton from 'bootstrap-vue/es/components/button/button';
import Tab1 from '../components/Account/Tab1';
import Tab2 from '../components/Account/Tab2';
import Tab3 from '../components/Account/Tab3';
import Tab4 from '../components/Account/Tab4';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'register'
    }
  },
  created() {

  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.params.id1);
    this.ActiveId = to.params.id;
    next();
  },
  beforeRouteEnter(to, from, next) {
    // this.ActiveId = to.params.id;
    next(vm => {
      vm.ActiveId = to.params.id;
    });
  },
  filters: {

  },
  components: {
    Header,
    Footer1,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    [bButton.name]: bButton,
  },
  methods: {
    routeChange(index) {
      this.$router.replace(`/account/${index}`);
    }
  }
}
</script>

<style lang="" scoped>
.btn-warning {
  background-color: #ed8134;
  border-color: #ed8134;
  color: #fff;
  border-radius: 15px;
}
.btn-outline-success {
  border-radius: 15px;
}
</style>