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
      base-url="#/remit/detail/"
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
          key: 'time',
          label: '时间'
        },
        {
          key: 'source',
          label: '来源'
        },
        {
          key: 'money',
          label: '金额'
        },
        {
          key: 'balance',
          label: '余额'
        },
        {
          key: 'type',
          label: '类型'
        },
        {
          key: 'mome',
          label: '备注'
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
    let user = localStorage.getItem('user');
    this.username = JSON.parse(user).username;
    let params = {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }
    base.post(api.helpNode, params).then(res => {
      // console.log(res);
      for (const key in res.data.data.salenodes) {
        if (res.data.data.salenodes.hasOwnProperty(key)) {
          const element = res.data.data.salenodes[key];
          if (element.name == '提供帮助') {
            this.type = key;
          }
        }
      }
    }).catch(err => {
      console.log(err);
    })
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
      base.post(api.salelist, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: this.type,
        /* page: page,
        number: 5 */
      }).then(res => {
        console.log(res);
        /* this.allPage = res.data.data.allPage;
        res.data.data.finances.forEach(item => {
          item.time = base.format1(item.time * 1000);
        })
        this.items = res.data.data.finances;
        this.tableShow = true;
        this.loading = false; */
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