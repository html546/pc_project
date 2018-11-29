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
                <b-breadcrumb :items="items" />
              </div>
              <b-row align-h="center">
                <b-col
                  sm="8"
                  md="8"
                  cols="8"
                  xl="8"
                  lg="8"
                >
                  <b-jumbotron
                    header-tag="h5"
                    header="测试公告测试公告测试公告"
                    header-level="5"
                  >
                    <hr class="my-3 announce_line">
                    <p>
                      亲爱的用户:
                    </p>
                    <p>尚途网络推出全新区块链产品:</p>
                    <p>1.尚途网络推出全新区块链产品全新区块链产品.</p>
                    <p>2.尚途网络推出全新区块链产品,尚途网络推出全新区块链产品尚途网络推出全新区块链产品,尚途网络推出全新区块链产品.</p>
                    <br>
                    <p>温馨提示:数字货币是一种有风险的投资方式,请投资者谨慎购买。</p>
                    <p class="float-right">尚途网络团队</p>
                    <div class="clearfix"></div>
                    <p class="float-right">2018-11--18 08:45:11</p>
                  </b-jumbotron>
                </b-col>
              </b-row>
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
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
export default {
  name: '',
  data() {
    return {
      currentPage: 1,
      items: [{
        text: '尚途网络',
        to: { name: 'Index' }
      }, {
        text: '公告',
        to: { name: 'Announce' }
      }, {
        text: '测试公告测试公告测试公告',
        active: true
      }]
    }
  },
  components: {
    Header,
    Footer1,
    [bBreadcrumb.name]: bBreadcrumb
  }
}
</script>

<style lang="" scoped>
</style>