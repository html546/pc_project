import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

import business_store from './bussiness_store';

export default new vuex.Store({
    modules: {
        business: business_store
    }
})