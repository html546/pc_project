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
    let check = to.meta.checkPass.every(item => {
      item.checkPass == true;
    })
    if (to.meta.checkPass.length > 1 && check) {
      next(vm => {
        vm.type = to.query.type;
        vm.items = [];
        vm.$store.commit('changeType', to.query.type)
        base.checkPass(vm, vm.getList, 1);
      });
    } else {
      next(vm => {
        vm.type = to.query.type;
        vm.items = [];
        vm.$store.commit('changeType', to.query.type)
        vm.getList(1);
      })
    }
  },
  created() {
    /* this.type = this.$route.query.type;
    this.$nextTick(() => {
      this.getList(1);
    })
    this.$store.commit('changeType', this.type) */
  },
  beforeRouteUpdate(to, from, next) {
    let check = to.meta.checkPass.every(item => {
      item.checkPass == true;
    })
    // console.log(this.$route.query.type);
    if (to.query.type && check == true) {
      this.$store.commit('changeType', to.query.type);
      // this.getList(1)
      this.type = to.query.type;
      this.items = [];
      base.checkPass(this, this.getList, 1);
    } else {
      if (to.query.type) {
        this.type = to.query.type;
        this.$store.commit('changeType', to.query.type);
        this.items = [];
        this.getList(1)
      }
    }
    next();
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id1 > 1) {
        this.getList(to.params.id1);
        // console.log(this.$store.state.type);
      }
    }
  },
  methods: {
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.info, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        // type: this.$store.state.type,
        type: this.type,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.finances.forEach(item => {
          item.time = base.format1(item.time * 1000);
        })
        this.items = res.data.data.finances;
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