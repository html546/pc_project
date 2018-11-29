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
                  to="/index"
                  class="announce_item"
                >
                  <p class="float-left">模板测试更新</p>
                  <p class="float-right">2018-11-21 13:42:16</p>
                </b-list-group-item>
                <b-list-group-item
                  router-tag="a"
                  tag="a"
                  to="/index"
                  class="announce_item"
                >
                  <p class="float-left">测试公告测试公告测试公告</p>
                  <p class="float-right">2018-11-18 08:45:11</p>
                </b-list-group-item>
              </b-list-group>
              <b-pagination-nav
                :number-of-pages="10"
                v-model="currentPage"
                align="center"
                class="announce_pagination"
                base-url="#/announceContent/"
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
export default {
  name: '',
  data() {
    return {
      currentPage: 1
    }
  },
  components: {
    Header,
    Footer1,
    [bListGroup.name]: bListGroup,
    [bPaginationNav.name]: bPaginationNav
  }
}
</script>

<style lang="" scoped>
</style>