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
      console.log(res);
      let menus = res.data.data;
      var router2 = router1;
      router2.forEach((item, index) => {
        if (menus.indexOf(item.meta.showname) == -1) {
          router2.splice(index, 1);
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
      console.log(router2);
      router.addRoutes(router2);
    }).catch(err => {
      console.log(err);
    })
  }
  next();
})
/* router.addRoutes(router1);
console.log(router); */
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
