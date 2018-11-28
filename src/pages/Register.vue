<template>
  <div class="login">
    <OtherHeader />
    <RegisterPanel />
    <div class="footer">
      <p class="text-center">Copyright @copy;2018 shangtu.com All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
import OtherHeader from '../components/OtherHeader';
import RegisterPanel from '../components/Register/RegisterPanel';
import '../assets/sass/login.sass';
export default {
  name: '',
  data() {
    return {
    }
  },
  components: {
    OtherHeader,
    RegisterPanel
  }
}
</script>

<style lang="" scoped>
.bg_dark1 {
  background-color: #050e1e !important;
}
.footer {
  background: #010b1e;
  color: #ffffff;
  height: 76px;
}
.footer p {
  line-height: 76px;
  margin-bottom: 0;
}
</style>