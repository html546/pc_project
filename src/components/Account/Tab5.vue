<template>
  <div class="register1">
    <b-table
      :items="items"
      :fields="fields"
      thead-tr-class="thead_tr"
      class="text-center"
    >
      <template
        slot="actions"
        slot-scope="row"
      >
        <b-button
          size="sm"
          @click.stop="examine(row.item.id)"
        >审核</b-button>
        <b-button
          size="sm"
          @click.stop="remove(row.item.id)"
        >删除</b-button>
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
    base.post(api.qrCodeList, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      // console.log(res);
      res.data.data.sales.forEach(item => {
        item.buy_date = base.format1(item.buy_date * 1000);
      })
      this.items = res.data.data.sales
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    examine(id) {
      // console.log(id);
      let user = localStorage.getItem('user');
      base.post(api.saleAudit, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        // console.log(res);
        if (res.data.status == 0) {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        } else {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    remove(id) {
      let user = localStorage.getItem('user');
      base.post(api.saledelete, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
        } else {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>