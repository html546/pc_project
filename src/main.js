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
    router1.forEach((item, index) => {
      if (!!menus[item.meta.url]) { //一级菜单
        item.meta.showname = menus[item.meta.url].name;
        if (!!item.children) { //如果一级菜单存在子菜单
          item.children.forEach((childItem, childIndex) => { //遍历一级菜单的子菜单
            if (!!childItem.meta.url) { // 如果子菜单有url字段
              let temp = menus[item.meta.url]['children'][childItem.meta.url] //获取接口中router1子菜单对应的子菜单
              if (temp == undefined) {

              } else
                if (temp.length == 1) {
                  let currentNode = temp[0]
                  // console.log(currentNode.name)
                  childItem['meta'].showname = currentNode.name;
                  childItem['meta'].checkPass = currentNode.checkPass;
                  childItem['meta'].params = currentNode.params;
                } else if (temp.length > 1) {
                  childItem['meta'].showname = [], childItem['meta'].checkPass = [], childItem['meta'].params = [];
                  temp.forEach((nodeItem, nodeIndex) => {
                    // console.log(nodeItem);
                    childItem['meta'].showname.push(nodeItem.name);
                    childItem['meta'].checkPass.push(nodeItem.checkPass);
                    childItem['meta'].params.push(nodeItem.params);
                  })
                }
            }

          })
        }
      }
    })
    console.log(router1);
    localStorage.setItem('menus', JSON.stringify(router1));
    router.addRoutes(router1);

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
