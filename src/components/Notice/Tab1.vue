<template>
  <div class="notice">
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
        <b-button
          size="sm"
          @click="check(rows.item.id)"
        >查看</b-button>
        <b-button
          size="sm"
          @click="remove(rows.item.id)"
        >删除</b-button>
        <b-button
          size="sm"
          @click="replay(rows.item.id)"
        >回复</b-button>
      </template>
    </b-table>
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
    base.post(api.maillist, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1
    }).then(res => {
      console.log(res);
      res.data.data.forEach(item => {
        item.send_date = base.format1(item.send_date * 1000);
        switch (item.state) {
          case 0:
            item.state = '未查看';
            break;
          case 1:
            item.state = '已查看';
            break;
          case 2:
            item.state = '已回复';
            break;
          case 3:
            item.state = '已删除';
            break;
        }
      })
      this.items = res.data.data;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    check(id) {
      this.$router.push(`/noticeDetail/${id}`);
    },
    remove(id) {
      let user = localStorage.getItem('user');
      base.post(api.delmail,{
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    replay(id) {
      this.$router.push(`/noticeReplay/${id}`);
    }
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
.notice {
  margin-top: 30px;
}
</style>