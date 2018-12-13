<template>
  <div>我是提供帮助明细</div>
</template>

<script>
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      type: ''
    }
  },
  created() {
    let user = localStorage.getItem('user');
    let params = {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }
    base.post(api.helpNode, params).then(res => {
      console.log(res);
      for (const key in res.data.data.salenodes) {
        if (res.data.data.salenodes.hasOwnProperty(key)) {
          const element = res.data.data.salenodes[key];
          if (element.name == '提供帮助') {
            this.type = key;
          }
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>

<style lang="" scoped>
</style>