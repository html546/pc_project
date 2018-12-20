<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <div>
        <b-container>
          <b-row>
            <b-col
              cols="12"
              md="12"
              sm="12"
              xl="12"
              lg="12"
              align-self="center"
              class="announce_panel"
            >
              <div class="announce_panel_top clearfix">
                <b-breadcrumb :items="items"></b-breadcrumb>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import bButton from 'bootstrap-vue/es/components/button/button';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [
        {
          text: '首页',
          to: { name: 'Index' }
        },
        {
          text: '分类列表',
          to: { path: '/mall/list' }
        },
        {
          text: '拉杆行李箱',
          active: true
        }
      ]
    }
  },
  created() {
    let user = localStorage.getItem('user');
    let id = this.$route.params.id;
    base.post(api.goodsInfo, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      id: id
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bBreadcrumb.name]: bBreadcrumb
  }
}
</script>

<style lang="" scoped>
</style>