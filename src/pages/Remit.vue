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
                    :variant="ActiveId=='detail'?'warning':'outline-success'"
                    @click="routeChange('detail')"
                  >钱包明细列表</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='withdraw'?'warning':'outline-success'"
                    @click="routeChange('withdraw')"
                  >钱包提现</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='withdrawList'?'warning':'outline-success'"
                    @click="routeChange('withdrawList')"
                  >钱包提现列表</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='transfer'?'warning':'outline-success'"
                    @click="routeChange('transfer')"
                  >钱包转账</b-button>
                </b-col>
              </b-row>
              <Tab1 v-show="ActiveId == 'detail'" />
              <Tab2 v-show="ActiveId == 'withdraw'" />
              <Tab3 v-show="ActiveId == 'withdrawList'" />
              <Tab4 v-show="ActiveId == 'transfer'" />
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
import Tab1 from '../components/Remit/Tab1';
import Tab2 from '../components/Remit/Tab2';
import Tab3 from '../components/Remit/Tab3';
import Tab4 from '../components/Remit/Tab4';
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
      this.$router.replace(`/remit/${index}`);
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