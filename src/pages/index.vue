<template>
  <div>
    <Header />
    <Carousel />
    <TabChange />
    <TabsChange />
  </div>
</template>
<script>
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import TabsChange from '../components/Tabschange'
import TabChange from '../components/TabChange'
import '../assets/sass/index.sass';

export default {
  data() {
    return {

    }
  },
  components: {
    Header,
    Carousel,
    TabsChange,
    TabChange
  }
}
</script>
<style >
</style>



