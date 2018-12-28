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
                    :variant="ActiveId=='market'?'warning':'outline-success'"
                    @click="routeChange('market')"
                  >交易平台交易市场</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='recordbuy'?'warning':'outline-success'"
                    @click="routeChange('recordbuy')"
                  >交易平台买入记录</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='recordsell'?'warning':'outline-success'"
                    @click="routeChange('recordsell')"
                  >交易平台卖出记录</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='hangout'?'warning':'outline-success'"
                    @click="routeChange('hangout')"
                  >交易平台交易挂出</b-button>
                </b-col>
              </b-row>
              <!-- <keep-alive>
                <Tab1 v-show="ActiveId == 'market'" />
              </keep-alive>
              <keep-alive>
                <Tab2 v-show="ActiveId == 'recordbuy'" />
              </keep-alive>
              <keep-alive>
                <Tab3 v-show="ActiveId == 'recordsell'" />
              </keep-alive>
              <keep-alive>
                <Tab4 v-show="ActiveId == 'hangout'" />
              </keep-alive> -->
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
/* import Tab1 from '../components/Business/Tab1';
import Tab2 from '../components/Business/Tab2';
import Tab3 from '../components/Business/Tab3';
import Tab4 from '../components/Business/Tab4'; */
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'market',
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
      this.$router.replace(`/business/${index}`);
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