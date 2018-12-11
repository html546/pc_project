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
                    :variant="ActiveId=='recommendin'?'warning':'outline-success'"
                    @click="routeChange('recommendin')"
                  >推荐网络</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='recommendinlist'?'warning':'outline-success'"
                    @click="routeChange('recommendinlist')"
                  >推荐列表</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='managein'?'warning':'outline-success'"
                    @click="routeChange('managein')"
                  >管理网络</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='manageinlist'?'warning':'outline-success'"
                    @click="routeChange('manageinlist')"
                  >管理列表</b-button>
                </b-col>
              </b-row>
              <Tab1 v-show="ActiveId == 'recommendin'" />
              <Tab2 v-show="ActiveId == 'recommendinlist'" />
              <Tab3 v-show="ActiveId == 'managein'" />
              <Tab4 v-show="ActiveId == 'manageinlist'" />
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
import Tab1 from '../components/Network/Tab1';
import Tab2 from '../components/Network/Tab2';
import Tab3 from '../components/Network/Tab3';
import Tab4 from '../components/Network/Tab4';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'recommendin'
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
      this.$router.replace(`/network/${index}`);
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