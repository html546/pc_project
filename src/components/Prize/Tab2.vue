<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :responsive="true"
      :filter="filter"
      thead-tr-class="thead_tr"
      tbody-tr-class="tbody_tr"
      class="prize_table"
    >
      <template
        slot="remimg"
        slot-scope="data"
        >
        <div v-html="data.item.remimg">
        </div>
      </template>
      <template
        slot="operate"
        slot-scope="data"
      >
        <b-button
          size="sm"
          class="mr-2"
          @click="upload(data.item.id)"
        >
          上传打款凭证
        </b-button>
      </template>
    </b-table>
    <b-pagination-nav
      :number-of-pages="allPage"
      v-model="currentPage"
      align="center"
      class="announce_pagination"
      base-url="#/prize/remit/"
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
          key: 'remtime',
          label: '汇款时间'
        },
        {
          key: 'money',
          label: '金额'
        },
        {
          key: 'import_account',
          label: '汇入账户'
        },
        {
          key: 'bank_name',
          label: '开户银行'
        },
        {
          key: 'bank_number',
          label: '银行卡号'
        },
        {
          key: 'bank_username',
          label: '开户名'
        },
        {
          key: 'remimg',
          label: '打款凭证'
        },
        {
          key: 'memo',
          label: '备注'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'operate',
          label: '操作'
        },
      ],
      items: [],
      currentPage: 1,
      allPage: 1,
      filter:''
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav
  },
  created() {
    this.getRemittance(1)
  },
  watch: {
    '$route'(to, from) {
      if (to.params.id == 'remit') {
        console.log(to.params.id1);
        this.getRemittance(to.params.id1);
      }
    }
  },
  methods: {
    getRemittance(page) {
      var user = localStorage.getItem('user');
      this.$http.post(this.HOST + api.remittance, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number:5
      }).then((res) => {
        // console.log(JSON.stringify(res.data.data));
        this.allPage = res.data.data.allPage;
        res.data.data.remittance.forEach((item) => {
          item.remtime = base.format1(item.remtime * 1000);
          if(item.remimg){
            item.remimg = `<img src="${item.remimg}" style="width:100px;height:50px;" />`;
          }
          if (item.state == 0) {
            item.state = '未审核';
          } else if (item.state == 1) {
            item.state = '已审核';
          }
        })
        this.items = res.data.data.remittance;
      }).catch((err) => {
        console.log(JSON.stringify(err));
      })
    },
    upload(id) {
      console.log(id);
      this.$router.replace(`/prize/remit/upload/${id}`)
    }
  }
}
</script>

<style lang="" scoped>
.prize_table {
  margin-top: 30px;
}
</style>