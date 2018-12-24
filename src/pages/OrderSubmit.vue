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
              <b-card
                class="card mb-3"
                text-variant="white"
              >
                <b-form-group
                  label="收货人信息"
                  id="radios1"
                >
                  <b-link
                    v-show="isaddress == 1"
                    @click="formShow = !formShow"
                  >使用新地址</b-link>
                  <b-form-radio-group v-model="selected1">
                    <b-form-radio
                      v-for="(item,index) in address_list"
                      :key="index"
                      :value="item.address_id"
                      @change="changeAddress"
                    >
                      <p
                        class="float-left text-white"
                        style="margin-bottom:0;"
                      >
                        <span class="mr-5">寄送至</span>
                        <span class="mr-5">收货人：{{item.consignee}}</span>
                        <span class="mr-5">地址：{{item.province}}{{item.city}}{{item.area}}{{item.address}}</span>
                        <span class="mr-5">电话：{{item.mobile}}</span>
                        <span
                          class="mr-5"
                          v-if="item.is_default"
                        >默认地址</span>
                      </p>
                    </b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-card>
              <b-row
                align-h="center"
                v-show="formShow"
              >
                <b-col
                  cols="6"
                  md="6"
                  sm="6"
                  lg="6"
                  xl="6"
                >
                  <b-form>
                    <b-form-group
                      label="收货人"
                      label-for="consignee"
                    >
                      <b-form-input
                        id="consignee"
                        type="text"
                        v-model="consignee"
                        required
                        placeholder="请输入收货人"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group label="收货地址">
                      <b-form-select
                        :options="optionsPro"
                        v-model="province"
                        @change="getCity"
                        class="mb-3"
                      >
                        <template slot="first">
                          <option
                            :value="null"
                            disabled
                          >请选择省份</option>
                        </template>
                      </b-form-select>
                      <b-form-select
                        :options="optionsCity"
                        v-model="city"
                        class="mb-3"
                        @change="getArea"
                      >
                        <template slot="first">
                          <option
                            :value="null"
                            disabled
                          >请选择城市</option>
                        </template>
                      </b-form-select>
                      <b-form-select
                        :options="optionsArea"
                        v-model="area"
                        class="mb-3"
                      >
                        <template slot="first">
                          <option
                            :value="null"
                            disabled
                          >请选择县区</option>
                        </template>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group
                      label="详细地址"
                      label-for="address"
                    >
                      <b-form-textarea
                        id="address"
                        v-model="address"
                        placeholder="请输入详细地址"
                        :rows="3"
                        :no-resize="true"
                      ></b-form-textarea>
                    </b-form-group>
                    <b-form-group
                      label="邮编"
                      label-for="zipcode"
                    >
                      <b-form-input
                        id="zipcode"
                        type="text"
                        v-model="zipcode"
                        required
                        placeholder="请输入邮编"
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="手机或固定电话"
                      label-for="mobile"
                    >
                      <b-form-input
                        id="mobile"
                        type="text"
                        v-model="mobile"
                        required
                        placeholder="请输入手机或固定电话"
                      ></b-form-input>
                    </b-form-group>
                    <div class="text-center mb-3">
                      <b-button
                        variant="primary"
                        @click="addAddress"
                      >保存收货地址</b-button>
                    </div>
                  </b-form>
                </b-col>
              </b-row>
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
import bLink from 'bootstrap-vue/es/components/link/link';
import bCard from 'bootstrap-vue/es/components/card/card';
import bForm from 'bootstrap-vue/es/components/form/form';
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
      selected: '',
      selected1: '',
      options1: [],
      address_list: [],
      regionList: '',
      isaddress: '',
      consignee: '',
      optionsPro: [],
      province: '',
      optionsCity: [],
      city: '',
      optionsArea: [],
      area: '',
      address: '',
      zipcode: '',
      mobile: '',
      formShow: false
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
    [bLink.name]: bLink,
    [bForm.name]: bForm
  },
  created() {
    this.getOrder();
    this.getAddress();
    this.getProvince();
  },
  methods: {
    getProvince() {
      base.post(api.getProvince).then(res => {
        console.log(res);
        let provinces = [];
        res.data.data.province.forEach(item => {
          provinces.push({
            text: item.name,
            value: item.id
          })
        })
        this.optionsPro = provinces;
      }).catch(err => {
        console.log(err);
      })
    },
    getCity(e) {
      console.log(e);
      let user = localStorage.getItem('user');
      base.post(api.getRegionByParentId, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        parent_id: e
      }).then(res => {
        console.log(res);
        let Citys = [];
        res.data.result.forEach(item => {
          Citys.push({
            text: item.name,
            value: item.id
          })
        })
        this.optionsCity = Citys;
      }).catch(err => {
        console.log(err);
      })
    },
    getArea(e) {
      console.log(e);
      let user = localStorage.getItem('user');
      base.post(api.getRegionByParentId, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        parent_id: e
      }).then(res => {
        console.log(res);
        let Areas = [];
        res.data.result.forEach(item => {
          Areas.push({
            text: item.name,
            value: item.id
          })
        })
        this.optionsArea = Areas;
      }).catch(err => {
        console.log(err);
      })
    },
    getAddress() {
      let user = localStorage.getItem('user');
      base.post(api.ajaxAddress, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
      }).then(res => {
        console.log(res);
        for (let key in res.data.data.regionList) {
          res.data.data.address_list.forEach(item => {
            if (item.province == key) {
              item.province = res.data.data.regionList[key];
            } else if (item.city == key) {
              item.city = res.data.data.regionList[key];
            } else if (item.area == key) {
              item.area = res.data.data.regionList[key];
            }
          })
        }
        this.address_list = res.data.data.address_list;
      }).catch(err => {
        console.log(err);
      })
    },
    changeAddress(e) {
      console.log(this.selected1);
      this.address_id = this.selected1;
    },
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
        this.isaddress = res.data.data.isaddress;
        this.address_id = res.data.data.address_list.address_id;
        this.selected1 = res.data.data.address_list.address_id;
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
    },
    addAddress() {
      let user = localStorage.getItem('user');
      base.post(api.addAddress, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        consignee: this.consignee,
        mobile: this.mobile,
        province: this.province,
        city: this.city,
        area: this.area,
        address: this.address
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getAddress();
              this.consignee = '';
              this.mobile = '';
              this.province = '';
              this.city = '';
              this.area = '';
              this.address = '';
              this.formShow = false;
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
.card {
  background: #0a1121;
}
</style>