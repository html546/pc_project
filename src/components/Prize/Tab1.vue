<template>
  <b-table
    :items="items"
    :fields="fields"
  ></b-table>
</template>

<script>
import bTable from 'bootstrap-vue/es/components/table/table';
export default {
  name: '',
  data() {
    return {
      fields: ['获奖日期', '奖金', '收入', '累计收入'],
      items: []
    }
  },
  components: {
    [bTable.name]: bTable
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + 'api/prize/index', {
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