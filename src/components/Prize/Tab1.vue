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
      :number-of-pages="2"
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
import * as base from '../../assets/js/base.js'
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
      items: [],
      currentPage: 1
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + 'api/prize/index', {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1
    }).then((res) => {
      // console.log(JSON.stringify(res.data.data.res));
      res.data.data.res.forEach((item) => {
        item.calc_date = base.format1(item.calc_date * 1000);
      })
      this.items = res.data.data.res;
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
}
</script>

<style lang="" scoped>
.prize_table {
  margin-top: 30px;
}
</style>