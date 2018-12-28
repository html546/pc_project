// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
// import router from './router'
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
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('menus') !== '' && localStorage.getItem('menus') != undefined) {
    return;
  } else {
    axios.get('http://dan.tushop.shop:88/api/Webmember/getShowMenu').then(res => {
      let router2 = [];
      let menus = res.data.data;
      for (let i = 0; i < menus.length; i++) {
        for (let j = 0; j < router1.length; j++) {
          if (router1[j].showname === menus[i] && !router1[j].children || router1[j].meta.isfixed === true) {
            router2.push(router1[j]);
          } else if (router1[j].showname === menus[i] && router1[j].children) {
            router1[j].children.forEach((item, index) => {
              if (item.showname !== menus[i]) {
                router1[j].children.spplice(index, 1)
              }
            })
            router2.push(router1[j]);
          } else {
            return false;
          }
        }
        /* router1.forEach(item => {
          if (item.meta.showname === menus[i] && !item.children || item.meta.isfixed == true) {
            router2.push(item);
          } else if (item.meta.showname === menus[i] && item.children) {
            item.children.forEach((item1, index) => {
              if (item1.showname !== menus[i]) {
                item.children.splice(index, 1);
              }
            })
            router2.push(item);
          } else {
            return false;
          }
        }) */
      }
      console.log(router2);
      router.addRoutes(router2);
      localStorage.setItem('menus', router2);
    }).catch(err => {
      console.log(err);
    })
    /* base.post(api.getShowMenu).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    }) */
  }
})
// router.addRoutes(router1);
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
