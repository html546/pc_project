<template>
  <div>
    <vo-basic :data="chartData"></vo-basic>
  </div>
</template>

<script>
import { VoBasic } from 'vue-orgchart';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      chartData: {}
    }
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.recommendInWork, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      console.log(res);
      /* this.chartData.name = res.data.data.users.truename;
      let children = [];
      for (const val in res.data.data.downusers) {
        children.push({ name: val.truename });
      }
      this.chartData.children = children; */
      this.chartData = res.data.data;
    }).catch(err => {
      console.log(err);
    })
  },
  components: {
    VoBasic
  }
}
</script>

<style lang="" scoped>
</style>