<template>
  <div>
    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      background="#ababab"
      :interval="4000"
      img-width="100%"
      img-height="480px"
    >

      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="(item,index) in img_group"
        :key="index"
        :img-src="item"
      >
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          :src="item"
          alt="image slot"
        >
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
export default {
  name: '',
  data() {
    return {
      img_group: []
    }
  },
  components: {
    [bCarousel.name]: bCarousel,
  },
  created() {
    var vm = this;
    this.$http.post('/api/index/getad', {
      userid: 1,
      sessionid: 'oj8l85crmr5q81rtj2a45pm625'
    }).then((res) => {
      console.log(JSON.stringify(res.data.data));
      vm.img_group = res.data.data;
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
}
</script>

<style lang="" scoped>
</style>