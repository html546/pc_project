<template>
  <div>我是订单支付页面</div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import bButton from 'bootstrap-vue/es/components/button/button';
import bImg from 'bootstrap-vue/es/components/image/img';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bTabs from 'bootstrap-vue/es/components/tabs/tabs';
import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bBreadcrumb.name]: bBreadcrumb,
    [bImg.name]: bImg,
    [bButtonGroup.name]: bButtonGroup,
    [bFormInput.name]: bFormInput,
    [bTabs.name]: bTabs,
    [bFormRadioGroup.name]: bFormRadioGroup
  },
  created() {
    let user = localStorage.getItem('user');
    let id = this.$route.params.id;
    base.post(api.cart4, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      order_id: id
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>

<style lang="" scoped>
</style>