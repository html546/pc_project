<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab
        no-body
        title="提现明细"
        active
      >
        <b-table
          striped
          hover
          :items="items"
          :fields="fields"
          :responsive="true"
          thead-tr-class="thead_tr"
          tbody-tr-class="tbody_tr"
        >
          <template
            slot="show_details"
            slot-scope="row"
          >
            <b-button
              size="sm"
              @click.stop="row.toggleDetails"
              class="mr-2"
            >
              {{row.detailsShowing? '隐藏':'显示'}}详情
            </b-button>
          </template>
          <template
            slot="row-details"
            slot-scope="row"
          >
            <b-card>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>获奖日期 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.calc_date}}</b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>奖金 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.prize}}</b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>收入 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.income}}</b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>收入 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.income}}</b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>累计收入 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.total_income}}</b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import bTabs from 'bootstrap-vue/es/components/tabs/tabs';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import * as base from '../../assets/js/base.js';
import api from '../../api/api.js';
export default {
  name: '',
  data() {
    return {
      fields: [
        {
          key: 'oper_date',
          label: '时间'
        },
        {
          key: 'bank_name',
          label: '开户行'
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
          key: 'tixian_money',
          label: '提现额'
        },
        {
          key: 'real_hair',
          label: '实发'
        },
        {
          key: 'state',
          label: '状态'
        }
      ],
      items: []
    }
  },
  created() {
    var user = localStorage.getItem('user');
    base.post(api.withdrawList, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1,
      type: 1
    }).then((res) => {
      console.log(res);
      res.data.data.extracts.forEach((item) => {
        item.oper_date = base.format1(item.oper_date * 1000);
        switch (item.state) {
          case 0:
            item.state = '未审核'
            break;
          case 1:
            item.state = '已拒绝'
            break;
          case 2:
            item.state = '已通过'
            break;
          case 3:
            item.state = '已撤销'
        }
      })
      this.items = res.data.data.extracts;
    }).catch((err) => {
      console.log(err);
    })
  },
  components: {
    [bTabs.name]: bTabs,
    [bTable.name]: bTable,
    [bButton.name]: bButton,
    [bFormInput.name]: bFormInput
  }
}
</script>

<style lang="" scoped>
</style>