<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      class="text-center"
      style="line-height:87px;"
    >
      <template
        slot="fields"
      >
        12345
      </template>
      <template
        slot="message"
        slot-scope="data"
      >
        <img
          :src="data.item.img"
          class="mr-1"
          style="width:87px;height:87px;"
          alt=""
        >
        {{data.item.goods_name}}
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
          <b-button @click="plus(data.index)">+</b-button>
          <b-form-input
            type="text"
            class="text-center"
            readonly
            id="num"
            v-model="data.item.goods_num"
          ></b-form-input>
          <b-button @click="decrese(data.index)">-</b-button>
        </b-button-group>
      </template>
      <template
        slot="actions"
        slot-scope="data"
      >
        <b-button size="sm">删除</b-button>
      </template>
    </b-table>
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
          label: '全选'
        },
        {
          key: 'message',
          label: '商品信息'
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
      ]
    }
  },
  created() {
    this.getCartList()
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
        res.data.data.cartList.forEach(item => {

        })
        this.items = res.data.data.cartList;
      }).catch(err => {
        console.log(err);
      })
    },
    plus(index) {
      console.log(index);
      this.items.forEach((item, index1) => {
        if (index1 == index) {
          item.goods_num += 1;
        }
      })
    },
    decrese(index) {
      console.log(index);
      this.items.forEach((item, index2) => {
        if (index2 == index) {
          item.goods_num -= 1;
        }
      })
    }
  },
}
</script>

<style lang="" scoped>
#num {
  width: 55px;
}
</style>