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
        thead-tr-class="thead_tr"
        tbody-tr-class="tbody_tr"
        class="prize_table"
      >
        <template
          slot="actions"
          slot-scope="row"
        >
          <b-button
            size="sm"
            @click.stop="checkMore(row.item.id)"
          >查看详情</b-button>
        </template>
      </b-table>
    </div>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/prize/sales/"
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
          key: 'calc_date',
          label: '获奖日期'
        },
        {
          key: 'prize',
          label: '奖金'
        },
        {
          key: 'income',
          label: '收入'
        },
        {
          key: 'total_income',
          label: '累计收入'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      currentPage: 1,
      items: [],
      allPage: 1,
      loading: false,
      tableShow: false
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav,
    VueLoading
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.meta.checkPass == true) {
      next(vm => {
        base.checkPass(vm, vm.getSale, 1);
      });
    }else{
      next(vm=>{
        vm.getSale(1);
      })
    }
  },
  created() {
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id == 'sales') {
        console.log(to.params.id1);
        this.getSale(to.params.id1);
      }
    }
  },
  methods: {
    getSale(page) {
      this.loading = true;
      this.tableShow = false;
      var user = localStorage.getItem('user');
      base.post(api.prize_index, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
      }).then((res) => {
        // console.log(res.data.data);
        res.data.data.res.forEach((item) => {
          item.calc_date = base.format1(item.calc_date * 1000);
        })
        this.items = res.data.data.res;
        this.allPage = parseInt(res.data.data.allPage);
        this.tableShow = true;
        this.loading = false;
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    },
    checkMore(id) {
      this.$router.push(`/salesContent/${id}`);
    }
  }
}
</script>

<style lang="" scoped>
.prize_table {
  margin-top: 30px;
}
</style>