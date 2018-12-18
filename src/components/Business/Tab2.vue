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
          slot="all"
          slot-scope="data"
        >
          {{data.item.oneprice*data.item.num}}
        </template>
        <template
          slot="actions"
          slot-scope="data"
        >
          <b-button
            size="sm"
            @click="remit(data.item.id)"
          >汇款</b-button>
          <b-button
            size="sm"
            @click="cancel(data.item.id)"
          >撤销</b-button>
          <b-button
            size="sm"
            @click="check(data.item.id)"
          >查看详情</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/business/recordbuy/"
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
          key: 'saleusername',
          label: '卖家编号'
        },
        {
          key: 'num',
          label: '交易数量'
        },
        {
          key: 'oneprice',
          label: '单价'
        },
        {
          key: 'all',
          label: '总额'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'memo',
          label: '凭据'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false,
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
      this.getList(to.params.id1);
    }
  },
  methods: {
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.buyinfo, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        buy_or_sell: 'buy',
        type: 1,
        page: page,
        number: 5
      }).then(res => {
        console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.trade_buy.forEach(item => {
          switch (item.state) {
            case 0:
              item.state = '未支付';
              break;
            case 1:
              item.state = '已支付';
              break;
            case 2:
              item.state = '已完成';
              break;
            case 3:
              item.state = '已撤销';
              break;
            case 4:
              item.state = '仲裁中';
              break;
            case 5:
              item.state = '仲裁卖家';
              break;
            case 6:
              item.state = '仲裁买家';
              break;
            default:
              break;
          }
        })
        this.items = res.data.data.trade_buy;
        this.tableShow = true;
        this.loading = false;
      }).catch(err => {
        console.log(err);
      })
    },
    check(id) {
      console.log(id);
      this.$router.push(`/businessdetail/${id}`);
    },
    cancel(id) {
      let user = localStorage.getItem('user');
      base.post(api.cancelbuytrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        id: id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          })
          this.getList(1);
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
        this.$swal({
          title: err,
          type: 'error'
        })
      })
    },
    remit(id) {
      this.$router.push(`/businessremit/${id}`);
    }
  }
}
</script>

<style lang="">
.register1 {
  margin-top: 30px;
}
</style>