<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :responsive="true"
      thead-tr-class="thead_tr"
      tbody-tr-class="tbody_tr"
      class="prize_table"
    >
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
      :number-of-pages="2"
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
import * as base from '../../assets/js/base.js'
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
      currentPage: 1
    }
  },
  components: {
    [bTable.name]: bTable,
    [bPaginationNav.name]: bPaginationNav
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + 'api/prize/remittance', {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1
    }).then((res) => {
      console.log(JSON.stringify(res.data.data));
      res.data.data.forEach((item) => {
        item.remtime = base.format1(item.remtime * 1000);
        if (item.state == 0) {
          item.state = '未审核';
        } else if (item.state == 1) {
          item.state = '已审核';
        }
      })
      this.items = res.data.data;
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
  methods: {
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