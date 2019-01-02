<template>
  <div class="network">
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
      ></b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/network/manageinlist/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'username',
          label: '会员编号'
        },
        {
          key: 'pay_date',
          label: '注册日期'
        },
        {
          key: 'truename',
          label: '姓名'
        }
      ],
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.meta.checkPass == true) {
      next(vm => {
        base.checkPass(vm, vm.getList,1);
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
      base.post(api.manageInList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: JSON.parse(user).id,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        if (res == []) {
          return;
        } else {
          res.data.data.users.forEach(item => {
            item.pay_date = base.format1(item.pay_date * 1000);
          })
        }
        this.items = res.data.data.users;
        this.tableShow = true;
        this.loading = false;
      })
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav,
    VueLoading
  }
}
</script>

<style lang="" scoped>
.network {
  margin-top: 30px;
}
</style>