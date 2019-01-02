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
            @click="remove(rows.item.id,rows.index)"
          >删除</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/notice/outbox/"
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
          label: '发件时间'
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
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.meta.checkPass == true) {
      next(vm => {
        base.checkPass(vm, vm.getList, 1);
      });
    } else {
      next(vm => {
        vm.getList(1);
      })
    }
  },
  created() {
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
      base.post(api.outbox, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
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
      // console.log(id);
      this.$router.push(`/noticeDetail/${id}`);
    },
    remove(id, index) {
      let user = localStorage.getItem('user');
      base.post(api.delmail, {
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
          this.items.splice(index, 1);
        }
      }).catch(err => {
        console.log(err);
      })
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