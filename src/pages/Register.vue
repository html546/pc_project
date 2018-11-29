<template>
  <div class="login">
    <OtherHeader />
    <RegisterPanel />
    <Footer1 />
  </div>
</template>

<script>
import OtherHeader from '../components/OtherHeader';
import RegisterPanel from '../components/Register/RegisterPanel';
import Footer1 from '../components/Footer1'
import '../assets/sass/login.sass';
export default {
  name: '',
  data() {
    return {
    }
  },
  components: {
    OtherHeader,
    RegisterPanel,
    Footer1
  }
}
</script>

<style lang="" scoped>
</style>