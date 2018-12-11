<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row
          align-h="start"
          align-v="center"
          style="height:50rem;"
        >
          <b-col
            cols="6"
            sm="6"
            md="6"
            xl="6"
            lg="6"
            align-self="center"
          >
            <b-list-group>
              <b-list-group-item>
                <p>用户编号:{{username}}</p>
              </b-list-group-item>
              <b-list-group-item>
                <p>购买日期:{{buy_date}}</p>
              </b-list-group-item>
              <b-list-group-item>
                <p>到款日期:{{pay_date}}</p>
              </b-list-group-item>
              <b-list-group-item>
                <p>报单类别:{{bd_type}}</p>
              </b-list-group-item>
              <b-list-group-item>
                <p>报单状态:{{bd_state}}</p>
              </b-list-group-item>
              <b-list-group-item>
                <p>报单金额:{{bd_money}}</p>
              </b-list-group-item>
            </b-list-group>
            <b-button
              variant="primary"
              class="my-3"
              @click="goback()"
            >返回</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import api from '../api/api.js';
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
import bButton from 'bootstrap-vue/es/components/button/button';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      username: '',
      buy_date: '',
      pay_date: '',
      bd_type: '',
      bd_state: '',
      bd_money: ''
    }
  },
  created() {
  },
  components: {
    Header,
    Footer1,
    [bListGroup.name]: bListGroup,
    [bButton.name]: bButton
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to.params.id);
    next(vm => {
      vm.getContent(to.params.id);
    });
  },
  methods: {
    getContent(id) {
      let user = localStorage.getItem('user');
      base.post(api.saleView, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        // console.log(res);
        this.username = res.data.data.sale.username
        this.buy_date = base.format1(res.data.data.sale.buy_date * 1000);
        this.pay_date = base.format1(res.data.data.sale.pay_date * 1000);
        this.bd_type = res.data.data.sale.bd_type;
        this.bd_state = res.data.data.sale.bd_state;
        this.bd_money = res.data.data.sale.bd_money;
      }).catch(err => {
        console.log(err);
      })
    },
    goback() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="" scoped>
</style>