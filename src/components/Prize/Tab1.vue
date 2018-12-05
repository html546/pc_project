<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :responsive="true"
      thead-tr-class="thead_tr"
      tbody-tr-class="tbody_tr"
      class="prize_table"
    ></b-table>
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
        }
      ],
      currentPage: 1,
      items: [],
      allPage: 1
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav
  },
  created() {
    this.getSale(1);
  },
  watch: {
    '$route'(to, from) {
      console.log(to.params.id1);
      this.getSale(to.params.id1);
    }
  },
  methods: {
    getSale(page) {
      var user = localStorage.getItem('user');
      this.$http.post(this.HOST + api.prize_index, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page
      }).then((res) => {
        // console.log(typeof res.data.data.allPage);
        res.data.data.res.forEach((item) => {
          item.calc_date = base.format1(item.calc_date * 1000);
        })
        this.items = res.data.data.res;
        this.allPage = parseInt(res.data.data.allPage);
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