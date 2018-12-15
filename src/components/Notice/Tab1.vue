<template>
  <div class="notice">
    <vue-loading
      type="spiningDubbles"
      color="#c3deff"
      :size="{width:'50px',height:'50px'}"
      v-show="loading"
    ></vue-loading>
    <div v-show="tableShow">
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
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/notice/index/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
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
      ],
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false,
    }
  },
  created() {
    this.getList(1);
  },
  watch: {
    '$route'(to, from) {
      this.getList(to.params.id1);
    }
  },
  methods: {
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.maillist, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page
      }).then(res => {
        console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.emails.forEach(item => {
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
        this.items = res.data.data.emails;
        this.tableShow = true;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    },
    check(id) {
      this.$router.push(`/noticeDetail/${id}`);
    },
    remove(id) {
      let user = localStorage.getItem('user');
      base.post(api.delmail, {
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
    [bTable.name]: bTable,
    VueLoading
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