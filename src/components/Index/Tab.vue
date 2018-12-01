<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab
        no-body
        title="销售奖金表"
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
                ><b>计算日期 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.time}}</b-col>
              </b-row>
              <b-row>
                <b-col
                  sm="2"
                  cols="2"
                  class="text-sm-right"
                ><b>直推奖 :</b></b-col>
                <b-col
                  sm="6"
                  cols="6"
                >{{row.item.prize1}}</b-col>
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
                >{{row.item.prize_all}}</b-col>
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
                >{{row.item.income_all}}</b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-tab>
      <b-tab
        no-body
        title="销售奖金表"
      >
        <b-card-img
          bottom
          src="https://picsum.photos/600/200/?image=25"
        />
        <b-card-footer>Picture 2 footer</b-card-footer>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import bTabs from 'bootstrap-vue/es/components/tabs/tabs';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
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
        },
        {
          key: 'show_details',
          label: '详情'
        }
      ],
      items: []
    }
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + 'api/prize/index', {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      page: 1
    }).then((res) => {
      console.log(JSON.stringify(res));
      res.data.data.res.forEach((item)=>{
        item.calc_date =  base.format1(item.calc_date*1000);
      })
      this.items = res.data.data.res;
    }).catch((err) => {
      console.log(JSON.stringify(err));
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