<template>
  <div class="mb-5">
    <b-table
      :items="items"
      :fields="fields"
      :bordered="true"
      tbody-class="tbody"
      class="text-center"
      style="line-height:87px;background:#0a1222;"
    >
      <template
        slot="chooseAll"
        slot-scope="data"
      >
        <b-form-checkbox
          v-model="data.item.selected"
          :value="1"
          :unchecked-value="0"
          @change="changeState($event,data.item.id)"
        ></b-form-checkbox>
      </template>
      <template
        slot="name"
        slot-scope="data"
      >
        {{data.item.goods_name}}
      </template>
      <template
        slot="img"
        slot-scope="data"
      >
        <img
          :src="data.item.img"
          class="mr-1"
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
        slot="goods_num"
        slot-scope="data"
      >
        <b-button-group>
          <b-button @click="decrese(data.index)">-</b-button>
          <b-form-input
            type="text"
            class="text-center"
            readonly
            id="num"
            v-model="data.item.goods_num"
          ></b-form-input>
          <b-button @click="plus(data.index)">+</b-button>
        </b-button-group>
      </template>
      <template
        slot="goods_fee"
        slot-scope="data"
      >
        <p style="color:#ff3535">
          ￥{{data.item.goods_fee}}
        </p>
      </template>
      <template
        slot="actions"
        slot-scope="data"
      >
        <b-button
          size="sm"
          @click="deleteGood(data.item.id)"
          variant="outline-warning"
        >删除</b-button>
      </template>
    </b-table>
    <b-row
      align-h="between"
      style="background:#1a2130;"
    >
      <b-col
        cols="6"
        md="6"
        sm="6"
        lg="6"
        xl="6"
        style="height:70px;"
      >
        <p style="margin-top:16px;color:#fff;">
          <b-form-checkbox
            v-model="checkAll"
            :value="1"
            :unchecked-value="0"
          >
            全选
          </b-form-checkbox>
          <b-button
            variant="link"
            @click="cempty"
          >清空购物车</b-button>
        </p>
      </b-col>
      <b-col
        cols="6"
        md="6"
        sm="6"
        xl="6"
        lg="6"
        style="height:70px;line-height:70px;"
      >
        <button class="balance float-right">结算</button>
        <p class="allfee float-right mr-4">合计 ： <span class="redText">￥{{total_fee}}.00</span></p>
        <p class="allnum float-right mr-5">共选 ： <span class="redText"> {{allNum}} </span>件</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import bButtonGroup from 'bootstrap-vue/es/components/button-group/button-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'chooseAll',
          label: ''
        },
        {
          key: 'name',
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
          label: '金额'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      allNum: '',
      total_fee: '',
    }
  },
  created() {
    this.getCartList()
  },
  computed: {
    /* checkAll() {
      return this.items.filter(item => {
        return item.selected == 1;
      })
    } */
    checkAll: {
      get: function () {
        return this.items.every(item => {
          return item.selected === 1;
        }) == true ? 1 : 0;
      },
      set: function (newValue) {
        console.log(newValue);
        let cart_id = [];
        if (newValue == 1) {
          this.items.map(item => {
            item.selected = 1;
            cart_id.push(item.id);
          })
        } else {
          this.items.map(item => {
            item.selected = 0;
            cart_id.push(item.id);
          })
        }
        cart_id = cart_id.join(',');
        this.changeState(newValue, cart_id);
      }
    }
  },
  components: {
    [bTable.name]: bTable,
    [bButtonGroup.name]: bButtonGroup,
    [bFormInput.name]: bFormInput,
    [bButton.name]: bButton,
    [bFormCheckboxGroup.name]: bFormCheckboxGroup
  },
  methods: {
    getCartList() {
      let user = localStorage.getItem('user');
      base.post(api.ajaxCartList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid
      }).then(res => {
        console.log(res);
        /* res.data.data.cartList.forEach(item => {

        }) */
        this.items = res.data.data.cartList;
        this.allNum = res.data.data.total_price.num;
        this.total_fee = res.data.data.total_price.total_fee;
      }).catch(err => {
        console.log(err);
      })
    },
    plus(index) {
      this.items.forEach((item, index1) => {
        if (index1 == index) {
          item.goods_num += 1;
          item.goods_fee = item.goods_num * item.goods_price;
          this.addGoodsNumber(item.goods_num, item.id);
        }
      })
    },
    decrese(index) {
      this.items.forEach((item, index2) => {
        if (index2 == index) {
          if (item.goods_num == 1) {
            return false;
          } else {
            item.goods_num -= 1;
          }
          item.goods_fee = item.goods_num * item.goods_price;
          this.addGoodsNumber(item.goods_num, item.id);
        }
      })
    },
    deleteGood(id) {
      console.log(id);
      let user = localStorage.getItem('user');
      base.post(api.ajaxDelCart, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        cart_id: id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getCartList();
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
    addGoodsNumber(num, id) {
      let user = localStorage.getItem('user');
      base.post(api.addGoodsNumber, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        goods_num: num,
        cart_id: id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.getCartList();
        } else {
          return false;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    cempty() {
      let user = localStorage.getItem('user');
      let cart_id = [];
      this.items.forEach(item => {
        cart_id.push(item.id);
      })
      console.log(cart_id);
      base.post(api.cempty, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        cart_id: cart_id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getCartList();
            }
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: "info"
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
    changeState(e, id) {
      console.log(e, id);
      let user = localStorage.getItem('user');
      base.post(api.selectedGoods, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        selected: e,
        cart_id: id
      }).then(res => {
        console.log(res);
        this.getCartList();
      }).catch(err => {
        console.log(err);
      })
    },
    /* selectAll(e) {
      let cart_id = [];
      if (e == 1) {
        this.items.forEach(item => {
          item.selected = 1;
          cart_id.push(item.id);
        })
      } else {
        this.items.forEach(item => {
          item.selected = 0;
          cart_id.push(item.id);
        })
      }
      cart_id = cart_id.join(',');
      this.changeState(e, cart_id);
    } */
  },
}
</script>

<style lang="" scoped>
#num {
  width: 55px;
}
.allnum,
.allfee {
  color: #fff;
}
.btn-outline-warning {
  color: #ed8134;
  border-color: #ed8134;
}
.btn-outline-warning:hover,
.btn-outline-warning:not(:disabled):not(.disabled):active {
  color: #fff;
  background-color: #ed8134;
  border-color: #ed8134;
}
.balance {
  width: 100px;
  height: 70px;
  line-height: 70px;
  background: #ed8134;
  border: none;
  color: #fff;
  margin-right: -15px;
}
.balance:not(:disabled):not(.disabled):active {
  color: #fff;
  border-color: #ed8134;
  background-color: #ed8134;
}
.redText {
  color: #dd3134;
}
</style>