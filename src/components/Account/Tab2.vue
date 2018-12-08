<template>
  <div class="register">
    <b-jumbotron
      header="推广链接"
      lead="推广链接列表"
      bg-variant="primary"
    >
      <p class="register_link">
        <b-link :href="link">{{link}}</b-link>
      </p>
      <qrcode-vue
        :value="link"
        :size="size"
        level="H"
      ></qrcode-vue>
    </b-jumbotron>
  </div>
</template>

<script>
import bJumbotron from 'bootstrap-vue/es/components/jumbotron/jumbotron';
import bLink from 'bootstrap-vue/es/components/link/link';
import QrcodeVue from 'qrcode.vue';
import api from '../../api/api.js';
export default {
  name: '',
  data() {
    return {
      link: '',
      size: 300
    }
  },
  components: {
    [bJumbotron.name]: bJumbotron,
    [bLink.name]: bLink,
    QrcodeVue
  },
  created() {
    let user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.qrCode, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      console.log(res);
      this.link = res.data.data;
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>

<style lang="" scoped>
.register_link a {
  text-decoration: none;
  color: #fff;
}
</style>