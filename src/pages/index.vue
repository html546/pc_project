<template>
  <div>
    <Header />
    <Carousel />
    <TabChange />
    <TabsChange />
    <Footer />
  </div>
</template>
<script>
import '../assets/sass/index.sass';
import Header from '../components/Header';
import Carousel from '../components/Index/Carousel';
import TabsChange from '../components/Index/Tabschange';
import TabChange from '../components/Index/TabChange';
import Footer from '../components/Footer';
export default {
  data() {
    return {

    }
  },
  components: {
    Header,
    Carousel,
    TabsChange,
    TabChange,
    Footer
  },
}
</script>
<style >
</style>



