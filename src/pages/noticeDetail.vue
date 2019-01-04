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
              <b-row align-h="center">
                <b-col
                  sm="8"
                  md="8"
                  cols="8"
                  xl="8"
                  lg="8"
                >
                  <b-jumbotron>
                    <h4 class="text-center">{{title}}</h4>
                    <hr class="my-3 announce_line">
                    <!--  <p>
                      亲爱的用户:
                    </p>
                    <p>尚途网络推出全新区块链产品:</p>
                    <p>1.尚途网络推出全新区块链产品全新区块链产品.</p>
                    <p>2.尚途网络推出全新区块链产品,尚途网络推出全新区块链产品尚途网络推出全新区块链产品,尚途网络推出全新区块链产品.</p>
                    <br>
                    <p>温馨提示:数字货币是一种有风险的投资方式,请投资者谨慎购买。</p> -->
                    <div v-html="content" class="content">
                    </div>
                    <p class="float-right">{{sender}}</p>
                    <div class="clearfix"></div>
                    <p class="float-right">{{ctime|time}}</p>
                    <div class="clearfix"></div>
                    <b-button
                      class="float-left"
                      router-tag="a"
                      variant="primary"
                      @click="$router.go(-1);"
                    >返回</b-button>
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
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
import bButton from 'bootstrap-vue/es/components/button/button';
import * as base from '../assets/js/base.js';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      currentPage: 1,
      title: '',
      content: '',
      ctime: '',
      sender: ''
    }
  },
  components: {
    Header,
    Footer1,
    [bJumbotron.name]: bJumbotron,
    [bButton.name]: bButton
  },
  created() {
    // console.log(this.$route.params.id);
    let id = this.$route.params.id;
    var user = localStorage.getItem('user');
    base.post(api.viewdetails, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      id: id
    }).then((res) => {
      // console.log(res);
      this.title = res.data.data.title;
      this.content = res.data.data.content;
      this.ctime = res.data.data.send_date;
      this.sender = res.data.data.sender;
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
  filters: {
    time(val) {
      return base.format(val * 1000);
    }
  }
}
</script>

<style lang="">
.content img{
  max-width: 500px;
  height: auto;
}
</style>