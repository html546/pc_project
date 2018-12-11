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
      <div
        v-for="(item,index) in img_group"
        :key="index"
      >
        <b-carousel-slide>
          <img
            slot="img"
            class="d-block w-100"
            width="1024"
            height="700"
            :src="item"
            alt="image slot"
          >
        </b-carousel-slide>
      </div>

    </b-carousel>
  </div>
</template>

<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
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
    var user = localStorage.getItem('user');
    base.post(api.getad, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      console.log(res);
      vm.img_group = res.data.data;
    }).catch((err) => {
      console.log(err);
    })
  },
}
</script>

<style lang="" scoped>
</style>