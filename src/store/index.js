import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

// import business_store from './bussiness_store';

/* export default new vuex.Store({
    modules: {
        business: business_store
    }
}) */
export default new vuex.Store({
    state: {
        status: 1,
        type: ''
    },
    mutations: {
        changeStatus(state) {
            state.status = 0;
        },
        changeType(state, type) {
            state.type = type;
        }
    }
})