<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row align-h="center">
          <b-col
            cols="12"
            sm="12"
            md="12"
            xl="12"
            lg="12"
          >

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
export default {
  name: '',
  data() {
    return {
      id: ''
    }
  },
  created() {
    let user = localStorage.getItem('user');
    this.$nextTick(function () {
      this.$http.post(this.HOST + api.prizeform, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: this.id
      }).then((res) => {
        console.log(res);
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
</style>