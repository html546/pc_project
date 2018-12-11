<template>
  <div class="register1">
    <b-table
      :items="items"
      :fields="fields"
      thead-tr-class="thead_tr"
      class="text-center"
    ></b-table>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/account/morderlist/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
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
        }
      ],
      allPage:1,
      currentPage:1
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav
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
      let user = localStorage.getItem('user');
      base.post(api.mOrderList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
      }).then(res => {
        console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.sales.forEach(item => {
          item.buy_date = base.format1(item.buy_date * 1000);
        })
        this.items = res.data.data.sales
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>