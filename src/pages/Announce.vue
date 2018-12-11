<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <div>
        <b-container>
          <b-row align-h="center">
            <b-col
              sm="12"
              md="12"
              cols="12"
              xl="12"
              lg="12"
              align-self="center"
              class="announce_panel"
            >
              <div class="announce_panel_top clearfix">
                <img
                  src="../assets/images/announce_top.png"
                  alt=""
                  class="float-left"
                >
                <p class="float-left">公告列表</p>
              </div>
              <b-list-group class="announce_group">
                <b-list-group-item
                  router-tag="a"
                  tag="a"
                  :to="'/announceContent/'+list.id"
                  class="announce_item"
                  v-for="(list,key) in lists"
                  :key="key"
                >
                  <p class="float-left">{{list.title}}</p>
                  <p class="float-right">{{list.ctime | time}}</p>
                </b-list-group-item>
              </b-list-group>
              <b-pagination-nav
                :number-of-pages="allPage"
                v-model="currentPage"
                align="center"
                class="announce_pagination"
                base-url="#/announce/"
              ></b-pagination-nav>
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
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import * as base from '../assets/js/base.js';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      currentPage: 1,
      allPage: 1,
      lists: []
    }
  },
  created() {
    this.getNotice(1)
  },
  filters: {
    time(val) {
      return base.format1(val * 1000);
    }
  },
  components: {
    Header,
    Footer1,
    [bListGroup.name]: bListGroup,
    [bPaginationNav.name]: bPaginationNav
  },
  methods: {
    getNotice(page) {
      var user = localStorage.getItem('user');
      base.post(api.notice,{
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page
      }).then((res) => {
        console.log(JSON.stringify(res));
        this.allPage = res.data.data.allPage;
        this.lists = res.data.data.notices;
      }).catch((err) => {
        console.log(JSON.stringify(err));
      }) 
    }
  },
  beforeRouteUpdate(to,from,next){
    this.getNotice(to.params.id);
    next();
  }
}
</script>

<style lang="" scoped>
</style>