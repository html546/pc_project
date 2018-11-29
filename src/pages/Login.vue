<template>
  <div class="login">
    <OtherHeader />
    <LoginPanel />
    <div class="footer1">
      <p class="text-center">Copyright @copy;2018 shangtu.com All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
import '../assets/sass/login.sass';
import OtherHeader from '../components/OtherHeader';
import LoginPanel from '../components/Login/LoginPanel';
export default {
  name: '',
  data() {
    return {
    }
  },
  components: {
    OtherHeader,
    LoginPanel
  }
}
</script>

<style lang="" scoped>

</style>