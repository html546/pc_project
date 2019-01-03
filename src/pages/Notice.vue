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
                <!-- <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='index'?'warning':'outline-success'"
                    @click="routeChange('index')"
                  >邮件列表</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='outbox'?'warning':'outline-success'"
                    @click="routeChange('outbox')"
                  >发件箱</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='send'?'warning':'outline-success'"
                    @click="routeChange('send')"
                  >给管理员发送邮件</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='membersend'?'warning':'outline-success'"
                    @click="routeChange('membersend')"
                  >会员邮件互发</b-button>
                </b-col> -->
              </b-row>
              <!-- <Tab1 v-show="ActiveId == 'index'" />
              <Tab2 v-show="ActiveId == 'outbox'" />
              <Tab3 v-show="ActiveId == 'send'" />
              <Tab4 v-show="ActiveId == 'membersend'" /> -->
              <!-- <keep-alive> -->
                <router-view></router-view>
              <!-- </keep-alive> -->
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
/* import Tab1 from '../components/Notice/Tab1';
import Tab2 from '../components/Notice/Tab2';
import Tab3 from '../components/Notice/Tab3';
import Tab4 from '../components/Notice/Tab4'; */
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'index'
    }
  },
  created() {

  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.params.id1);
    this.ActiveId = to.fullPath.split('/')[2];
    next();
  },
  beforeRouteEnter(to, from, next) {
    // this.ActiveId = to.params.id;
    next(vm => {
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
      this.$router.replace(`/notice/${index}`);
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