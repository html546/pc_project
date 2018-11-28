<template>
  <div>
    <Header />
    <Carousel />
    <div class="tab_change">
      <b-container fluid>
        <b-row>
          <b-col
            cols="6"
            sm="6"
            md="6"
            lg="6"
            xl="6"
            class="text-center"
          >
            <img
              src="../assets/images/income.png"
              alt=""
              class="img-fluid income mt-4"
              @click="addActive1"
            >
            <p
              class="text-center"
              :class="{active:isActive1}"
            >收入</p>
          </b-col>
          <b-col
            cols="6"
            sm="6"
            md="6"
            lg="6"
            xl="6"
            class="text-center"
          >
            <img
              src="../assets/images/withdraw.png"
              alt=""
              class="img-fluid withdraw mt-4"
              @click="addActive2"
            >
            <p
              class="text-center"
              :class="{active:isActive2}"
            >提现</p>
          </b-col>
        </b-row>
        <Tab class="tab1" />
      </b-container>
    </div>
    <TabsChange />
  </div>
</template>
<script>
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Tab from '../components/Tab';
import TabsChange from '../components/Tabschange'
import '../assets/sass/index.sass';

export default {
  data() {
    return {
      isActive1: true,
      isActive2: false,
    }
  },
  components: {
    Header,
    Carousel,
    Tab,
    TabsChange
  },

  created() {

  },
  methods: {
    addActive1() {
      this.isActive1 = true;
      this.isActive2 = false;
    },
    addActive2() {
      this.isActive2 = true;
      this.isActive1 = false;
    }
  }
}
</script>
<style >
</style>



