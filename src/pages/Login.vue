<template>
  <div class="login">
    <OtherHeader />
    <LoginPanel />
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/login.sass';
import OtherHeader from '../components/OtherHeader';
import LoginPanel from '../components/Login/LoginPanel';
import Footer1 from '../components/Footer1'
export default {
  name: '',
  data() {
    return {
    }
  },
  components: {
    OtherHeader,
    LoginPanel,
    Footer1
  }
}
</script>

<style lang="" scoped>
</style>