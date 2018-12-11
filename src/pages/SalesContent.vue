<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row
          align-h="center"
          align-v="center"
          style="height:50rem;"
        >
          <b-col
            cols="12"
            sm="12"
            md="12"
            xl="12"
            lg="12"
            align-self="center"
          >
            <b-table
              :items="items"
              :fields="fields"
            >
            </b-table>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import api from '../api/api.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      id: '',
      items: [],
      fields: [
        { key: 'calc_date', label: "时间" },
        { key: 'prizename', label: "奖金名称" },
        { key: 'val', label: "奖金金额" },
        { key: 'trueval', label: "真实金额" },
        { key: 'username', label: '会员编号' },
        { key: 'fromid', label: '来源' }
      ]
    }
  },
  created() {
    let user = localStorage.getItem('user');
    this.$nextTick(function () {
      base.post(api.prizeform, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: this.id
      }).then((res) => {
        // console.log(res);
        // console.log(res.data.data[0].list);
        res.data.data[0].list.forEach((item) => {
          item.calc_date = base.format1(item.calc_date);
        })
        this.items = res.data.data[0].list;
      }).catch((err) => {
        console.log(err);
      })
    })
  },
  components: {
    Header,
    Footer1,
    [bTable.name]: bTable
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.id = to.params.id
    })
  }
}
</script>

<style lang="" scoped>
/* .announce_content{
  margin-top: 100px;
} */
</style>