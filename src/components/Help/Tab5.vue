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
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/help/financing/"
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
          label: '编号'
        },
        {
          key: 'truename',
          label: '姓名'
        },
        {
          key: 'buy_date',
          label: '日期'
        },
        {
          key: 'bd_state',
          label: '互助状态'
        },
        {
          key: 'bd_money',
          label: '互助金额'
        }
      ],
      type: '',
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
      this.getList(to.params.id1);
    }
  },
  methods: {
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.detail, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        /* this.allPage = res.data.data.allPage;*/
        res.data.data.helps.forEach(item => {
          item.buy_date = base.format1(item.buy_date * 1000);
        })
        this.items = res.data.data.helps;
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