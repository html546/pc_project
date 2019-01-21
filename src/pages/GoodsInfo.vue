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
              <div class="announce_panel_top clearfix">
                <b-breadcrumb :items="items"></b-breadcrumb>
              </div>
              <b-row>
                <b-col
                  cols="4"
                  md="4"
                  sm="4"
                  xl="4"
                  lg="4"
                >
                  <b-img
                    :src="goodImg"
                    alt="商品图片"
                    thumbnail
                    fluid
                    style="width:310px;height:310px;"
                  ></b-img>
                </b-col>
                <b-col
                  cols="6"
                  offset-cols="2"
                  md="6"
                  offset-md="2"
                  sm="6"
                  offset-sm="2"
                  xl="6"
                  offset-xl="2"
                  lg="6"
                  offset-lg="2"
                >
                  <h3 class="text-white">{{goodname}}</h3>
                  <p class="price">￥{{shop_price}}</p>
                  <p class="store_count">剩余{{store_count}}件</p>
                  <p class="num">
                    数量 :
                    <b-button-group>
                      <b-button @click="decrese">-</b-button>
                      <b-form-input
                        type="text"
                        class="text-center"
                        readonly
                        id="num"
                        v-model="num"
                      ></b-form-input>
                      <b-button @click="plus">+</b-button>
                    </b-button-group>
                  </p>
                  <b-button
                    variant="outline-warning"
                    class="mr-3"
                    @click="joinCart"
                  >加入购物车</b-button>
                  <b-button
                    variant="warning"
                    class="mr-3"
                    @click="SubmitOrder"
                  >立即购买</b-button>
                  <!-- <b-button
                    variant="danger"
                    @click="collect"
                  >添加收藏</b-button> -->
                </b-col>
              </b-row>
              <b-tabs class="mt-3">
                <b-tab
                  title="商品详情"
                  active
                >
                  <!-- <b-card-img
                    bottom
                    :src="goodImg"
                  /> -->
                  <div
                    v-html="goods_content"
                    style="color:#fff;"
                    class="goods_content"
                  ></div>
                </b-tab>
                <b-tab title="规格参数">
                  我是规格参数
                </b-tab>
              </b-tabs>
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
import api from '../api/api.js';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [
        {
          text: '首页',
          to: { name: 'Index' }
        },
        {
          text: '分类列表',
          to: { path: '/mall/list' }
        },
        {
          text: '拉杆行李箱',
          active: true
        }
      ],
      goodImg: '',
      goodname: '',
      shop_price: '',
      store_count: '',
      num: 1,
      goods_id: '',
      goods_content: ''
    }
  },
  created() {
    let user = localStorage.getItem('user');
    let id = this.$route.params.id;
    base.post(api.goodsInfo, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      id: id
    }).then(res => {
      console.log(res);
      this.goodImg = res.data.data.goods.original_img;
      this.goodname = res.data.data.goods.goods_name;
      this.goods_content = res.data.data.goods.goods_content;
      this.shop_price = res.data.data.goods.shop_price;
      this.store_count = res.data.data.goods.store_count;
      this.goods_id = res.data.data.goods.goods_id;
    }).catch(err => {
      console.log(err);
    })
  },
  computed: {

  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bBreadcrumb.name]: bBreadcrumb,
    [bImg.name]: bImg,
    [bButtonGroup.name]: bButtonGroup,
    [bFormInput.name]: bFormInput,
    [bTabs.name]: bTabs
  },
  methods: {
    plus() {
      this.num++;
    },
    decrese() {
      if (this.num === 1) {
        return false;
      } else {
        this.num--;
      }
    },
    joinCart(showModel) {
      let user = localStorage.getItem('user');
      base.post(api.ajaxAddCart, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        goods_id: this.goods_id,
        goods_num: this.num
      }).then(res => {
        console.log(res, showModel);
        if (showModel !== 1 || !showModel) {
          if (res.data.status == 1) {
            this.$swal({
              title: res.data.msg,
              type: 'success'
            }).then(res => {
              if (res.value) {
                this.$router.push('/mall/cart');
              }
            })
          } else {
            this.$swal({
              title: res.data.msg,
              type: 'info'
            })
          }
        } else {
          return;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    /* collect() {
      let user = localStorage.getItem('user');
      base.post(api.collect_goods, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        goods_id: this.goods_id
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
        this.$swal({
          type: 'error',
          title: err
        })
      })
    }, */
    SubmitOrder() {
      this.joinCart(1);
      this.$router.push(`/orderSubmit/${this.goods_id}`);
    }
  },
}
</script>

<style lang="" >
.price {
  color: #ff3535;
  font-size: 18px;
}

.store_count,
.num {
  color: #c8ddfd;
  font-size: 14px;
}

p {
  margin-bottom: 1rem;
}

#num {
  width: 55px;
}
.btn-outline-warning {
  color: #ed8134;
  border-color: #ed8134;
}
.btn-outline-warning:hover {
  background-color: #ed8134;
  color: #fff;
}
.btn-outline-warning:not(:disabled):not(.disabled):active {
  background-color: #ed8134;
  color: #fff;
}
.btn-warning {
  color: #fff;
  border-color: #ed8134;
  background-color: #ed8134;
}
.btn-warning:not(:disabled):not(.disabled):active {
  color: #fff;
  border-color: #ed8134;
  background-color: #ed8134;
}
.goods_content > img {
  max-width: 100%;
}
</style>