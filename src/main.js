// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
// import router from './router'
import vuex from 'vuex';
import { router, router1 } from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Layout } from 'bootstrap-vue/es/components';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2'
import store from './store';
import * as base from '@/assets/js/base'

Vue.use(BootstrapVue);
Vue.use(Layout);
Vue.use(VueSweetalert2);
Vue.use(vuex);
/* router.beforeEach((to, from, next) => {
  console.log(store.state.status);
  if (store.state.status == 0) {
   
  } else {
    getMenu();
    store.commit('changeStatus', 0)
  }
  next();
}) */




/* function getMenu() {
  axios.get('http://dan.tushop.shop:88/api/Webmember/getShowMenu').then(res => {
    console.log(res);
    let menus = res.data.data;
    // var router2 = router1;
    router1.forEach((item, index) => {
      if (menus.indexOf(item.meta.showname) == -1 && item.meta.isfixed !== true) {
        router1.splice(index, 1);
      } else {
        if (!!item.children) {
          item.children.forEach((childItem, childIndex) => {
            if (menus.indexOf(childItem.meta.showName) == -1) {
              item.children.splice(childIndex, 1)
            }
          })
        }
      }
    })
    console.log(router1);
    router.addRoutes(router1);
    console.log(router);
  }).catch(err => {
    console.log(err);
  })
} */

router.addRoutes(router1);
Vue.prototype.$http = axios;
Vue.prototype.HOST = '/api';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
