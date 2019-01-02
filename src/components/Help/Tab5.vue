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
          slot="state"
          slot-scope="data"
        >
          <div v-if="data.item.state == 1">
            <p v-if="data.item.receiveusername == username.toString()">
              等待对方打款
            </p>
            <p v-if="data.item.receiveusername!==username.toString()">
              等待你打款
            </p>
          </div>
          <div v-if="data.item.state == 2">
            <p v-if="data.item.receiveusername == username.toString()">
              等待您确认收款
            </p>
            <p v-if="data.item.receiveusername!==username.toString()">
              等待对方确认收款
            </p>
          </div>
          <div v-if="data.item.state == 3">
            完成
          </div>
        </template>
        <template
          slot="actions"
          slot-scope="data"
        >
          <b-button
            style="width:100px;"
            router-tag="a"
            :to="'/helpinfo/'+data.item.id"
            v-if="data.item.state == 1&&data.item.receiveusername == username.toString()"
          >
            查看信息
          </b-button>
          <b-button
            style="width:100px;"
            router-tag="a"
            :to="'/paymoney/'+data.item.id"
            v-if="data.item.state == 1&&data.item.receiveusername !== username.toString()"
          >
            打款
          </b-button>
          <b-button
            style="width:100px;"
            router-tag="a"
            :to="'/collemoney/'+data.item.id"
            v-if="data.item.state == 2&&data.item.receiveusername == username.toString()"
          >
            收款
          </b-button>
          <b-button
            style="width:100px;"
            router-tag="a"
            :to="'/helpinfo/'+data.item.id"
            v-if="data.item.state == 2&&data.item.receiveusername !== username.toString()"
          >
            查看信息
          </b-button>
          <b-button
            style="width:100px;"
            router-tag="a"
            :to="'/helpinfo/'+data.item.id"
            v-if="data.item.state == 3"
          >
            查看信息
          </b-button>
        </template>
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
          key: 'ordercode',
          label: '编号'
        },
        {
          key: 'matetime',
          label: '匹配时间'
        },
        {
          key: 'oktime',
          label: '完成时间'
        },
        {
          key: 'money',
          label: '互助金额'
        },
        {
          key: 'state',
          label: '互助状态'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      type: '',
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false,
      username: ''
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav,
    [bButton.name]: bButton,
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
    let user = localStorage.getItem('user');
    this.username = JSON.parse(user).username;
    // this.getList(1);
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id1 > 1) {
        this.getList(to.params.id1);
      }
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
        console.log(res);
        /* this.allPage = res.data.data.allPage;*/
        res.data.data.helps.forEach(item => {
          item.matetime = base.format1(item.matetime * 1000);
          item.oktime = item.oktime !== 0 ? base.format1(item.oktime * 1000) : '';
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