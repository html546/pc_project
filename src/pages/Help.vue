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
                    :variant="ActiveId=='supply'?'warning':'outline-success'"
                    @click="routeChange('supply')"
                  >提供帮助</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='supplylist'?'warning':'outline-success'"
                    @click="routeChange('supplylist')"
                  >提供帮助明细</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='apply'?'warning':'outline-success'"
                    @click="routeChange('apply')"
                  >申请帮助</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='applylist'?'warning':'outline-success'"
                    @click="routeChange('applylist')"
                  >申请帮助明细</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='financing'?'warning':'outline-success'"
                    @click="routeChange('financing')"
                  >理财明细</b-button>
                </b-col>
              </b-row>
              <Tab1 v-show="ActiveId == 'supply'" />
              <Tab2 v-show="ActiveId == 'supplylist'" />
              <Tab3 v-show="ActiveId == 'apply'" />
              <Tab4 v-show="ActiveId == 'applylist'" />
              <Tab5 v-show="ActiveId == 'financing'" />
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
import Tab1 from '../components/Help/Tab1';
import Tab2 from '../components/Help/Tab2';
import Tab3 from '../components/Help/Tab3';
import Tab4 from '../components/Help/Tab4';
import Tab5 from '../components/Help/Tab5';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'supply'
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
    Tab5,
    [bButton.name]: bButton,
  },
  methods: {
    routeChange(index) {
      this.$router.replace(`/help/${index}`);
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