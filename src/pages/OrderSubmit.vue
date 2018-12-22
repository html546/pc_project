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
              <!-- <div class="announce_panel_top clearfix">
                <b-breadcrumb :items="items1"></b-breadcrumb>
              </div> -->
              <b-table
                :items="items"
                :fields="fields"
                :bordered="true"
                tbody-class="tbody"
                class="text-center"
                style="line-height:87px;background:#0a1222;"
              >
                <template
                  slot="img"
                  slot-scope="data"
                >
                  <img
                    :src="data.item.goods_img"
                    style="width:87px;height:87px;"
                    alt=""
                  >
                </template>
                <template
                  slot="goods_price"
                  slot-scope="data"
                >
                  ￥{{data.item.goods_price}}
                </template>
                <template
                  slot="goods_fee"
                  slot-scope="data"
                >
                  <p style="color:#dd3134;">
                    ￥{{data.item.goods_fee}}.00
                  </p>
                </template>
              </b-table>
              <b-form-group
                label="请选择您的物流"
                id="radios1"
              >
                <b-form-radio-group
                  v-model="selected"
                  :options="options"
                  name="radioOpenions"
                  @change="getCode"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row align-h="end">
            <b-col
              cols="2"
              md="2"
              sm="2"
              lg="2"
              xl="2"
              class="clearfix"
            >
              <p class="float-right price_all">共计 : <span>{{allNum}}件</span></p>
              <p class="float-right price_all">总金额 : <span>￥{{total_fee}}</span></p>
              <p class="float-right price_all">应付金额 : <span>￥{{total_fee}}</span></p>
              <b-button
                variant='warning'
                class="float-right orderSubmit"
                @click="SubmitOrder"
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
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'goods_name',
          label: '商品名称'
        },
        {
          key: 'img',
          label: '商品图片'
        },
        {
          key: 'goods_price',
          label: '单价'
        },
        {
          key: 'goods_num',
          label: '数量'
        },
        {
          key: 'goods_fee',
          label: '小计'
        }
      ],
      allNum: '',
      total_fee: '',
      address_id: '',
      shipping_code: '',
      options: [],
      selected: ''
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
    this.getOrder();
  },
  methods: {
    getOrder() {
      let id = this.$route.params.id;
      let user = localStorage.getItem('user');
      base.post(api.cart2, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        cart_id: id
      }).then(res => {
        console.log(res);
        this.items = res.data.data.cartList;
        this.total_fee = res.data.data.total_price.total_fee;
        this.allNum = res.data.data.total_price.num;
        this.address_id = res.data.data.address_list.address_id;
        let options = [];
        res.data.data.shippingList.forEach(item => {
          options.push({ text: item.desc, value: item.code })
        })
        this.options = options;
      }).catch(err => {
        console.log(err);
      })
    },
    SubmitOrder() {
      let user = localStorage.getItem('user');
      base.post(api.cart3, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        address_id: this.address_id,
        shipping_code: this.shipping_code
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getOrder();
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
        this.$swal({
          title: err,
          type: 'error'
        })
      })
    },
    getCode(e) {
      console.log(e);
      this.shipping_code = e;
    }
  },
}
</script>

<style lang="" scoped>
.price_all {
  color: #fff;
}
.price_all span {
  color: #dd3134;
}
.orderSubmit {
  width: 170px;
  height: 60px;
  background-color: #ed8234;
  border-color: #ed8234;
  color: #fff;
}
.orderSubmit:not(:disabled):not(.disabled):active {
  background-color: #ed8234;
  border-color: #ed8234;
  color: #fff;
}
#radios1 {
  color: #fff;
}
</style>