<template>
  <div class="network">
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
import * as base from '../../assets/js/base.js';
import bTable from 'bootstrap-vue/es/components/table/table';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'username',
          label: '会员编号'
        },
        {
          key: 'pay_date',
          label: '注册日期'
        },
        {
          key: 'truename',
          label: '姓名'
        }
      ]
    }
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.manageInList, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      id: JSON.parse(user).id
    }).then(res => {
      console.log(res);
      if (res == []) {
        return;
      } else {
        res.data.data.forEach(item => {
          item.pay_date = base.format1(item.pay_date * 1000);
        })
      }
      this.items = res.data.data;
    })
  },
  components: {
    [bTable.name]: bTable
  }
}
</script>

<style lang="" scoped>
.network {
  margin-top: 30px;
}
</style>