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
router.beforeEach((to, from, next) => {
  console.log(store.state.status);
  if (store.state.status == 0) {

  } else {
    getMenu();
    store.commit('changeStatus')
  }
  next();
})




function getMenu() {
  axios.get('http://dan.tushop.shop:88/api/Webmember/getShowMenu').then(res => {
    console.log(res);
    let menus = res.data.data;
    let router2 = [];
    for (const key in menus) {
      for (let i = 0; i < router1.length; i++) {
        if (router1[i].meta.isfixed == true) {
          router2.push(router1[i]);
        } else if (router1[i].meta.url == menus[key].url && !menus[key].child) {
          router1[i].meta.showname = menus[key].name;
          router2.push(router1[i]);
        } else if (router1[i].meta.url == menus[key].url && menus[key].child) {
          menus[key].child.map((item, index) => {
            for (let j = 0; j < router1[i].meta.children; j++) {
              if (item.url === router1[i].meta.children[j].url) {
                router1[i].mata.children[j].showname = item.name;
                if (item.checkPass) {
                  router1[i].meta.children[j].checkPass = item.checkPass;
                } else if (item.params) {
                  router1[i].meta.children[j].params = item.params;
                }
              }
            }
          })
          router2.push(router1[i]);
        }
      }
    }
    /* router1.forEach((item, index) => {
      for (const key in menus) {
        if (menus[key].url !== item.meta.url && item.meta.isfixed !== true) {
          router1.splice(index, 1)
        } else if (menus[key].url === item.meta.url && menus[key].child && item.children) {
          item.meta.showname = menus[key].name;
          for (let j = 0; j < item.children.length; j++) {
            menus[key].child.map((childItem, childIndex) => {
              if (childItem.url == item.children[j].meta.url) {
                item.children[j].showname = childItem.name;
                if (childItem.checkPass) {
                  item.children[j].checkPass = childItem.checkPass;
                } else if (childItem.params) {
                  item.children[j].params = childItem.params;
                }
              }
            })
          }
        }
      }
    }) */

    /* router1.forEach((item, index) => {
      if (menus.indexOf(item.meta.url) == -1 && item.meta.isfixed !== true) {
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
    }) */
    console.log(router2);
    router.addRoutes(router2);
  }).catch(err => {
    console.log(err);
  })
}

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
