<template>
  <div>
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
        :responsive="true"
        :filter="filter"
        thead-tr-class="thead_tr"
        tbody-tr-class="tbody_tr"
        class="prize_table"
      >
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/prize/welfare/"
    ></b-pagination-nav>
  </div>
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
import api from '../../api/api.js';
export default {
  name: '',
  data() {
    return {
      fields: [
        {
          key: 'username',
          label: '编号'
        },
        {
          key: 'name',
          label: '来源'
        },
        {
          key: 'get_time',
          label: '获得时间'
        },
        {
          key: 'give_time',
          label: '发放时间'
        },
        {
          key: 'state',
          label: '状态'
        }
      ],
      items: [],
      currentPage: 1,
      allPage: 1,
      filter: '',
      loading: false,
      tableShow: false
    }
  },
  props: ['type'],
  computed: {
    type1() {
      return this.type;
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav,
    VueLoading
  },
  beforeRouteEnter(to, from, next) {
    if (to.meta.checkPass == true) {
      next(vm => {
        base.checkPass(vm, vm.getWelfare, 1);
      });
    } else {
      next(vm => {
        vm.getWelfare(1);
      })
    }
  },
  created() {
    console.log('我是从tab4过来的' + this.type1);
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id == 'welfare') {
        console.log(to.params.id1);
        this.getWelfare(to.params.id1);
      }
    }
  },
  methods: {
    getWelfare(page) {
      this.loading = true;
      this.tableShow = false;
      var user = localStorage.getItem('user');
      base.post(api.welfareList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: this.type1,
        page: page,
      }).then((res) => {
        console.log(JSON.stringify(res.data.data));
        this.allPage = res.data.data.allPage;
        res.data.data.welfares.forEach((item) => {
          item.get_time = base.format1(item.get_time * 1000);
          item.give_time = base.format1(item.give_time * 1000);
          if (item.state == 0) {
            item.state = '未发放';
          } else {
            item.state = '已发放';
          }
        })
        this.items = res.data.data.welfares;
        this.tableShow = true;
        this.loading = false;
        console.log(this.items);
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    }
  }
}
</script>

<style lang="" scoped>
.prize_table {
  margin-top: 30px;
}
</style>