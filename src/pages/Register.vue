<template>
  <div class="login">
    <OtherHeader />
    <RegisterPanel />
    <div class="footer1">
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

</style>