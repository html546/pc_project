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
              <!-- <keep-alive>
                <List v-show="ActiveId == 'list'" />
              </keep-alive>
              <keep-alive>
                <Cart v-show="ActiveId == 'cart'" />
              </keep-alive>
              <keep-alive>
                <Order v-show="ActiveId == 'order'" />
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
/* import List from '../components/Mall/List';
import Cart from '../components/Mall/Cart';
import Order from '../components/Mall/Order'; */
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'list',
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
    /* List,
    Cart,
    Order, */
    [bButton.name]: bButton,
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