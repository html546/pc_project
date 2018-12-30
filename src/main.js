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
                } else if (temp.length > 1) {
                  temp.forEach((nodeItem, nodeIndex) => {
                    // console.log(nodeItem);
                    childItem['meta'].showname = [], childItem['meta'].checkPass = [], childItem['meta'].params = [];
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
    router.addRoutes(router1);
    /* for (const key in menus) {
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
     } */
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
