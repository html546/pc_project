<template>
  <div class="register1">
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
        thead-tr-class="thead_tr"
        class="text-center"
      >
        <template
          slot="actions"
          slot-scope="rows"
        >
          <b-button
            size="sm"
            @click="cancel(rows.item.id,rows.item.tixian_money)"
          >撤销</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/remit/withdrawList/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'oper_date',
          label: '时间'
        },
        {
          key: 'bank_name',
          label: '开户行'
        },
        {
          key: 'bank_number',
          label: '银行卡号'
        },
        {
          key: 'bank_username',
          label: '开户名'
        },
        {
          key: 'tixian_money',
          label: '提现额'
        },
        {
          key: 'real_hair',
          label: '实发'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false
    }
  },
  components: {
    [bTable.name]: bTable,
    [bButton.name]: bButton,
    [bPaginationNav.name]: bPaginationNav,
    VueLoading
  },
  created() {
    this.getList(1);
  },
  watch: {
    '$route'(to, from) {
      // console.log(to);
      this.getList(to.params.id1);
    }
  },
  methods: {
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      this.items = [];
      let user = localStorage.getItem('user');
      base.post(api.withdrawList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.extracts.forEach(item => {
          item.oper_date = base.format1(item.oper_date * 1000);
          switch (item.state) {
            case 0:
              item.state = '未审核';
              break;
            case 1:
              item.state = '已拒绝'
              break;
            case 2:
              item.state = '已通过';
              break;
            case 3:
              item.state = '已撤销';
              break;
          }
        })
        this.items = res.data.data.extracts;
        this.tableShow = true;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    },
    cancel(id, money) {
      let user = localStorage.getItem('user');
      base.post(api.cancelwithdraw, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id,
        tixian_money: money
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
          location.reload();
        } else if (res.data.status == 0) {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        }
      }).catch(err => {
        console.log(err);
        this.$swal({
          type: 'error',
          title: res.data.msg
        })
      })
    }
  }
}
</script>

<style lang="">
.register1 {
  margin-top: 30px;
}
</style>