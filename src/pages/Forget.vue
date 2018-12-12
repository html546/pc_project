<template>
  <div class="login">
    <OtherHeader />
    <ForgetPanel />
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/login.sass';
import OtherHeader from '../components/OtherHeader';
import ForgetPanel from '../components/Forget/ForgetPanel';
import Footer1 from '../components/Footer1'
export default {
  name: '',
  data() {
    return {
    }
  },
  components: {
    OtherHeader,
    ForgetPanel,
    Footer1
  }
}
</script>

<style lang="" scoped>
</style>