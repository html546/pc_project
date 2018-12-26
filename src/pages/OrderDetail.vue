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
              <b-list-group v-show="tableShow">
                <b-list-group-item
                  active
                  class="flex-column align-items-start"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="md-1">收货信息</h5>
                  </div>
                  <p class="mb-1">
                    姓名：{{consignee}}
                  </p>
                  <p class="mb-1">
                    收货地址：{{province}}{{city}}{{area}}{{address}}
                  </p>
                  <p class="mb-1">
                    联系电话：{{mobile}}
                  </p>
                  <p class="mb-1">
                    配送方式：{{shipping_name}}
                  </p>
                </b-list-group-item>
              </b-list-group>
              <b-table
                :items="items"
                :fields="fields"
                :bordered="true"
                tbody-class="tbody"
                class="text-center"
                caption-top
                v-show="tableShow"
                style="line-height:87px;height:87px;"
              >
                <template slot="table-caption">
                  <p
                    class="text-white"
                    style="margin-bottom:0;"
                  >
                    订单号：{{order_sn}}
                  </p>
                </template>
                <template
                  slot="goods_img"
                  slot-scope="data"
                >
                  <img
                    :src="data.item.original_img"
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
                    ￥{{data.item.goods_price*data.item.goods_num}}.00
                  </p>
                </template>
              </b-table>
              <b-row align-h="end">
                <b-col
                  cols="3"
                  md="3"
                  sm="3"
                  lg="3"
                  xl="3"
                >
                  <p class="float-right price_all">商品总金额：<span>￥{{total_amount}}</span></p>
                  <p class="float-right price_all">合计：<span>￥{{total_amount}}</span></p>
                  <div class="clearfix"></div>
                  <b-button
                    class="float-right"
                    variant="danger"
                    @click="pay"
                    v-if="pay_btn == 1"
                  >立即支付</b-button>
                  <b-button
                    class="float-right mr-2"
                    variant="danger"
                    @click="cancel"
                    v-if="cancel_btn == 1"
                  >取消订单</b-button>
                  <b-button
                    class="float-right mr-2"
                    variant="danger"
                    v-if="receive_btn == 1"
                    @click="order_confirm"
                  >收货</b-button>
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
import bButton from 'bootstrap-vue/es/components/button/button';
import bImg from 'bootstrap-vue/es/components/image/img';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bTabs from 'bootstrap-vue/es/components/tabs/tabs';
import bListGroup from 'bootstrap-vue/es/components/list-group/list-group';
import { VueLoading } from 'vue-loading-template';
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      consignee: '',
      province: '',
      city: '',
      area: '',
      address: '',
      mobile: '',
      shipping_name: '',
      order_sn: '',
      items: [],
      fields: [
        {
          key: 'goods_img',
          label: '商品图片'
        },
        {
          key: 'goods_name',
          label: '商品名称'
        },
        {
          key: 'goods_price',
          label: '单价/元'
        },
        {
          key: 'goods_num',
          label: '数量'
        },
        {
          key: 'goods_fee',
          label: '(小计)/元'
        }
      ],
      loading: false,
      tableShow: false,
      total_amount: '',
      order_id: '',
      pay_btn: '',
      cancel_btn: '',
      receive_btn: ''
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
    [bListGroup.name]: bListGroup,
    VueLoading
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      let id = this.$route.params.id;
      base.post(api.orderDetail, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        // setTimeout(() => {
        this.consignee = res.data.data.order_info.consignee;
        this.province = res.data.data.order_info.province;
        this.city = res.data.data.order_info.city;
        this.area = res.data.data.order_info.area;
        this.address = res.data.data.order_info.address;
        this.mobile = res.data.data.order_info.mobile;
        this.shipping_name = res.data.data.order_info.shipping_name;
        this.items = res.data.data.order_info.goods_list;
        this.order_sn = res.data.data.order_info.order_sn;
        this.total_amount = res.data.data.order_info.total_amount;
        this.order_id = res.data.data.order_info.order_id;
        this.pay_btn = res.data.data.order_info.pay_btn;
        this.cancel_btn = res.data.data.order_info.cancel_btn;
        this.receive_btn = res.data.data.order_info.receive_btn;
        this.tableShow = true;
        this.loading = false;
        // }, 2000);;
      }).catch(err => {
        console.log(err);
      })
    },
    cancel() {
      let user = localStorage.getItem('user');
      base.post(api.cancel_order, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: this.order_id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
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
    },
    pay() {
      let id = this.order_id;
      this.$router.push(`/orderpay/${id}`);
    },
    order_confirm() {
      let user = localStorage.getItem('user');
      base.post(api.order_confirm, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: this.order_id
      }).then(res => {
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getDetail();
            }
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      })
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
</style>