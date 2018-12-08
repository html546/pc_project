<template>
  <b-table
    :items="items"
    :fields="fields"
    class="text-center"
    thead-tr-class="thead_tr"
  >
    <template
      slot="actions"
      slot-scope="rows"
    >
      <b-button size="sm">查看</b-button>
      <b-button size="sm">删除</b-button>
    </template>
  </b-table>
</template>

<script>
import api from '../../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'title',
          label: '标题'
        },
        {
          key: 'send_date',
          label: '收件时间'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'actions',
          label: '基本操作'
        }
      ]
    }
  },
  created() {
    let user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.maillist, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1
    }).then(res => {
      console.log(res);
      this.items = res.data.data;
    }).catch(err => {
      console.log(err);
    })
  },
  components: {
    [bTable.name]: bTable
  }
}
</script>

<style lang="" scoped>
div {
  color: #fff;
}
</style>