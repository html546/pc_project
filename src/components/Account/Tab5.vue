<template>
  <div class="register1">
    <b-table
      :items="items"
      :fields="fields"
      thead-tr-class="thead_tr"
      class="text-center"
    >
      <template slot="actions">
        <b-button></b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
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
          key: 'truename',
          label: '姓名'
        },
        {
          key: 'bd_state',
          label: '订单状态'
        },
        {
          key: 'bd_type',
          label: '订单类别'
        },
        {
          key: 'buy_date',
          label: '购买日期'
        },
        {
          key: 'bd_money',
          label: '报单金额'
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
          key: 'actions',
          label: '操作'
        }
      ]
    }
  },
  components: {
    [bTable.name]: bTable,
    [bButton.name]: bButton
  },
  created() {
    let user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.qrCodeList, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      //   console.log(res);
      res.data.data.sales.forEach(item => {
        item.buy_date = base.format1(item.buy_date * 1000);
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