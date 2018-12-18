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
          slot="credit"
          slot-scope="data"
        >
          <div>
            <img
              v-for="(item,index) in data.item.credit"
              :key="index"
              :src="creditImg"
              alt=""
              style="width:30px;height:30px;"
            >
          </div>
        </template>
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
            @click="buy(data.item.id,data.item.num,data.index)"
            v-if="data.item.tradetype == 2"
          >卖出</b-button>
          <b-button
            size="sm"
            @click="buy(data.item.id,data.item.num,data.index)"
            v-if="data.item.tradetype == 1"
          >购买</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/business/market/"
      ref="mychild"
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
          key: 'id',
          label: '交易编码'
        },
        {
          key: 'credit',
          label: '交易信誉'
        },
        {
          key: 'num',
          label: '出售数量'
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
          key: 'actions',
          label: '操作'
        }
      ],
      allPage: 1,
      loading: false,
      tableShow: false,
      creditImg: '',
      currentPage: 1
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
    // console.log(this.$store.state.business.currentPage, 2222);
  },
  mounted() {
    var vm = this;
    //location.reload();
    console.log(this.$route.params.id1);
    /* this.$nextTick(function () {
      vm.currentPage = this.$store.state.business.currentPage;
      // console.log(this.$refs.mychild.onClick);
      // this.$refs.mychild.onClick(vm.currentPage);
      // this.$refs.mychild.value = vm.currentPage;
      console.log(this.$refs.mychild.value == vm.currentPage);
      console.log(vm.currentPage, 44444);
      console.log(vm.currentPage == this.$store.state.business.currentPage, 555555); 
      this.getList(this.$store.state.business.currentPage);
    })*/
    // console.log(this.currentPage, 66666666666666);
  },
  updated() {
    // console.log(this.currentPage, 7777777777);
  },
  /*  computed: {
     currentPage() {
       let currentPage = this.$store.state.business.currentPage == 'undefined' ? 1 : this.$store.state.business.currentPage;
       return currentPage;
     }
   }, */
  /* updated() {
    console.log(this.$store.state.business.currentPage);
  }, */
  watch: {
    '$route'(to, from) {
      // console.log(from);
      // console.log(from.params.id1);
      /* if (to.params.id1) {
        this.$store.commit('change_page', to.params.id1);
      } else {
        return;
      } */
      this.getList(to.params.id1);
    }
  },
  methods: {
    /* linkGen(page) {
      console.log(page, 3333333);
    }, */
    buy(id, buynum, index) {
      console.log(id, buynum, index);
      let user = localStorage.getItem('user');
      base.post(api.buytrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id,
        buynum: buynum,
        type: 1
      }).then(res => {
        // console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          })
          this.getList(1);
        } else if (res.data.status == 0) {
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
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.index, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        this.creditImg = 'http://dan.tushop.shop:88' + res.data.data.trades.credit_img_url.replace('/api/trade/index', '');
        res.data.data.trades.data.forEach(item => {
          item.time = base.format1(item.time * 1000);
        })
        this.items = res.data.data.trades.data;
        this.tableShow = true;
        this.loading = false;
      }).catch(err => {
        console.log(err);
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