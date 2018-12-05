<template>
  <div>我是添加汇款通知页面</div>
</template>

<script>
import api from '../../api/api.js';
export default {
  name: '',
  data() {
    return {

    }
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.addremittance, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      console.log(JSON.stringify(res));
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
}
</script>

<style lang="" scoped>
</style>