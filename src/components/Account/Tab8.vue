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
            @click="check(rows.item.id)"
          >查看</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/account/mactionlist/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'buy_date',
          label: '购买日期'
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
          key: 'bd_type',
          label: '订单类型'
        },
        {
          key: 'bd_state',
          label: '订单状态'
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
    check(id) {
      this.$router.push(`/accountContent/${id}`);
    },
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.mActionList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.sales.forEach(item => {
          item.pay_date = base.format1(item.pay_date * 1000);
          item.buy_date = base.format1(item.buy_date * 1000);
        })
        this.items = res.data.data.sales;
        this.tableShow = true;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="" scoped>
</style>