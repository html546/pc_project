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
      base-url="#/help/supplylist/"
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
  beforeRouteEnter(to, from, next) {
    console.log(to.meta.checkPass);
    let check = to.meta.checkPass.every(item => {
      return item == true;
    })
    console.log(check);
    if (to.meta.checkPass.length > 1 && check == true) {
      next(vm => {
        vm.type = vm.$route.query.type;
        vm.items = [];
        base.checkPass(vm, vm.getList, 1);
        // vm.$store.commit('changeType', vm.type)
      });
    } else {
      next(vm => {
        vm.type = vm.$route.query.type;
        vm.items = [];
        vm.getList(1);
        // vm.$store.commit('changeType', vm.type)
      })
    }
  },
  created() {
    // this.getType();
    // this.getList(1);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to);
    // console.log(this.$route.query.type);
    let check = to.meta.checkPass.every(item => {
      return item == true;
    })
    this.items = [];
    // console.log(this.$route.query.type);
    if (to.query.type && check == true) {
      this.type = this.$route.query.type;
      // this.getList(1)
      base.checkPass(this, this.getList, 1);
    } else {
      this.type = this.$route.query.type;
      this.getList(1)
    }
    /* if (to.query.type) {
      this.$store.commit('changeType', to.query.type);
      this.$nextTick(() => {
        this.getType();
      })
    } */
    next();
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id1 > 1) {
        this.getList(to.params.id1);
      }
    }
  },
  methods: {
    getType() {
      /* let user = localStorage.getItem('user');
      this.username = JSON.parse(user).username;
      let params = {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid
      }
      base.post(api.helpNode, params).then(res => {
        for (const key in res.data.data.salenodes) {
          if (res.data.data.salenodes.hasOwnProperty(key)) {
            const element = res.data.data.salenodes[key];
            this.type = this.$store.state.type;
          }
        }
        console.log(this.type);
      }).catch(err => {
        console.log(err);
      }) */
      this.type = this.$route.query.type;
      this.getList(1);
    },
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.salelist, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: this.type,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.sales.forEach(item => {
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

<style lang="">
.register1 {
  margin-top: 30px;
}
</style>