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
              <!-- <b-row aligh-h="center">
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='personal'?'warning':'outline-success'"
                    @click="routeChange('personal')"
                  >个人资料</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='datum'?'warning':'outline-success'"
                    @click="routeChange('datum')"
                  >资料管理</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='loginPass'?'warning':'outline-success'"
                    @click="routeChange('loginPass')"
                  >登录密码管理</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='payPass'?'warning':'outline-success'"
                    @click="routeChange('payPass')"
                  >支付密码管理</b-button>
                </b-col>
              </b-row> -->
              <!-- <Tab1 v-show="ActiveId == 'personal'" />
              <Tab2 v-show="ActiveId == 'datum'" />
              <Tab3 v-show="ActiveId == 'loginPass'" />
              <Tab4 v-show="ActiveId == 'payPass'" /> -->
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
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
/* import Tab1 from '../components/Person/Tab1';
import Tab2 from '../components/Person/Tab2';
import Tab3 from '../components/Person/Tab3';
import Tab4 from '../components/Person/Tab4'; */
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'personal'
    }
  },
  created() {

  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.fullPath.split('/')[2]);
    this.ActiveId = to.fullPath.split('/')[2];
    next();
  },
  beforeRouteEnter(to, from, next) {
    // this.ActiveId = to.params.id;
    next(vm => {
      console.log(to);
      vm.ActiveId = to.fullPath.split('/')[2];
    });
  },
  filters: {

  },
  components: {
    Header,
    Footer1,
    /* Tab1,
    Tab2,
    Tab3,
    Tab4, */
    [bButton.name]: bButton,
  },
  methods: {
    routeChange(index) {
      this.$router.replace(`/person/${index}`);
      this.ActiveId = index;
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