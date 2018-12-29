<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    Header,
    Footer1,
  },
}
</script>

<style lang="" scoped>
</style>