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
                  sm="6"
                  md="6"
                  cols="6"
                  xl="6"
                  lg="6"
                >
                  <b-form>
                    <b-form-group
                      label="卖家编号"
                      label-for="saleusername"
                    >
                      <b-form-input
                        v-model="saleusername"
                        :readonly="true"
                        id="saleusername"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="开户行"
                      label-for="bank_name"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="bank_name"
                        id="bank_name"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="银行卡号"
                      label-for="bank_number"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="bank_number"
                        id="bank_number"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="开户名"
                      label-for="bank_username"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="bank_username"
                        id="bank_username"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="买家编号"
                      label-for="buyuser"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="buyuser"
                        id="buyuser"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="购买数量"
                      label-for="num"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="num"
                        id="num"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="购买价格"
                      label-for="oneprice"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="oneprice"
                        id="oneprice"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="购买时间"
                      label-for="buytime"
                    >
                      <b-form-input
                        :readonly="true"
                        v-model="buytime"
                        id="buytime"
                      ></b-form-input>
                    </b-form-group>
                    <div v-if="buydata" class="mb-3">
                      <p style="color:#0e6ac1;">交易凭证</p>
                      <b-img
                        :src="buydata"
                        fluid
                        alt="交易凭证"
                      />
                    </div>
                    <b-button
                      variant="primary"
                      @click="goback"
                    >返回</b-button>
                  </b-form>
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
import bForm from 'bootstrap-vue/es/components/form/form';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import * as base from '../assets/js/base.js';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      currentPage: 1,
      saleusername: '',
      bank_name: '',
      bank_number: '',
      bank_username: '',
      buyuser: '',
      num: '',
      oneprice: '',
      buytime: '',
      items: [{
        text: '尚途网络',
        to: { name: 'Index' }
      }, {
        text: 'EP交易',
        to: { path: '/business/market' }
      }, {
        text: '查看交易记录',
        active: true
      }],
      id1: '',
      buydata: ''
    }
  },
  components: {
    Header,
    Footer1,
    [bBreadcrumb.name]: bBreadcrumb,
    [bForm.name]: bForm
  },
  created() {
    if (this.$route.params.id) {
      let id = this.$route.params.id;
      this.getPage(id);
    } else {
      return;
    }
  },
  filters: {
    time(val) {
      return base.format1(val * 1000);
    }
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next(vm => {
      vm.id1 = to.params.id;
      vm.getPage(vm.id1);
    });
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getPage(id) {
      console.log(id);
      var user = localStorage.getItem('user');
      base.post(api.viewbuytrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then((res) => {
        console.log(res);
        this.saleusername = res.data.data.saleuser.username;
        this.bank_name = res.data.data.bank_name;
        this.bank_number = res.data.data.bank_number;
        this.bank_username = res.data.data.bank_username;
        this.buyuser = res.data.data.buyuser.username;
        this.num = res.data.data.num;
        this.oneprice = res.data.data.oneprice;
        this.buytime = base.format(res.data.data.buytime * 1000);
        this.buydata = res.data.data.buydata;
        /* this.title = res.data.data.title;
        this.content = res.data.data.content;
        this.items[2].text = this.title;
        this.ctime = res.data.data.ctime; */
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>