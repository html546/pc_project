<template>
  <div class="register1">
    <b-table
      :items="items"
      :fields="fields"
      thead-tr-class="thead_tr"
      class="text-center"
    ></b-table>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'id',
          label: '编号'
        },
        {
          key: 'bd_state',
          label: '订单状态'
        },
        {
          key: 'pay_date',
          label: '付款日期'
        },
        {
          key: 'bd_money',
          label: '报单金额'
        },
        {
          key: 'reg_date',
          label: '注册日期'
        },
        {
          key: 'truename',
          label: '姓名'
        },
        {
          key: 'memberrank',
          label: '会员级别'
        },
        {
          key: 'teamrank',
          label: '管理级别'
        },
        {
          key: 'introduce',
          label: '推荐人'
        },
        {
          key: 'district',
          label: '管理人'
        },
      ]
    }
  },
  components: {
    [bTable.name]: bTable
  },
  created() {
    let user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.mSonOrderList, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
    //   console.log(res);
      res.data.data.sales.forEach(item => {
        item.pay_date = base.format1(item.pay_date * 1000);
        item.reg_date = base.format1(item.reg_date * 1000);
      })
      this.items = res.data.data.sales
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>

<style lang="" scoped>
</style>