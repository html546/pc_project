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
              <vue-loading
                type="spiningDubbles"
                color="#c3deff"
                :size="{width:'50px',height:'50px'}"
                v-show="loading"
              ></vue-loading>
              <b-card
                text-variant="warning"
                header="订单提交成功,请您尽快付款!"
                class="text-left card mb-5"
              >
                <p class="cart-text text-white text-left">订单号(元)：{{order_sn}}</p>
                <p class="cart-text text-white text-left">商品金额(元)： <span class="text-danger">{{goods_price}}元</span></p>
                <p class="cart-text text-white text-left">付款金额(元)： <span class="text-danger">{{total_amount}}元</span></p>
              </b-card>
              <b-card
                text-variant="white"
                header="选择支付方式"
                class="text-center card mb-3"
              >
                <b-form-group
                  label="钱包支付"
                  class="text-left text-white"
                  id="radios1"
                >
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    @change='getType'
                  ></b-form-radio-group>
                </b-form-group>
              </b-card>
              <b-button
                variant="warning"
                class="float-right submit"
                @click="submit"
              >提交订单</b-button>
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
import bImg from 'bootstrap-vue/es/components/image/img';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bTabs from 'bootstrap-vue/es/components/tabs/tabs';
import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group';
import bCard from 'bootstrap-vue/es/components/card/card';
import { VueLoading } from 'vue-loading-template';
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      loading: false,
      order_sn: '',
      goods_price: '',
      total_amount: '',
      selected: 1,
      options: [],
      pay_radio: {}
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
    [bFormRadioGroup.name]: bFormRadioGroup,
    [bCard.name]: bCard,
    VueLoading
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
      this.order_sn = res.data.data.order.order_sn;
      this.goods_price = res.data.data.order.goods_price;
      this.total_amount = res.data.data.order.total_amount;
      let options = [];
      let object = res.data.data.wallet;
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          options.push({
            value: element.type,
            text: element.name
          })
        }
      }
      this.options = options;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    getType(e) {
      this.selected = e;
      this.pay_radio[`${this.selected.toString()}`] = parseInt(this.total_amount);
    },
    submit() {
      let id = this.$route.params.id;
      let user = localStorage.getItem('user');
      this.pay_radio[`${this.selected.toString()}`] = parseInt(this.total_amount);
      console.log(this.pay_radio);
      base.post(api.getCode2, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        order_id: id,
        pay_radio: JSON.stringify(this.pay_radio)
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.$router.push(`/mall/order`);
            }
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style lang="" scoped>
.card {
  background: #0a1121;
}
.submit {
  width: 172px;
  height: 65px;
  background: #ed8234;
  color: #fff;
  border: none;
}
.submit.btn-warning:not(:disabled):not(.disabled):active {
  background: #ed8234;
  color: #fff;
  border: none;
}
</style>