// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Layout } from 'bootstrap-vue/es/components';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2'
import store from './store';

Vue.use(BootstrapVue);
Vue.use(Layout);
Vue.use(VueSweetalert2);
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
