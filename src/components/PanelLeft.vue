<template>
  <b-col
    md="6"
    sm="6"
    cols="6"
    lg="6"
    xl="6"
    align-self="center"
    class="text-center"
  >
    <img
      :src="img"
      width="560"
      height="350"
      class="img-fluid"
      alt=""
    >
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      img: '/static/login_03.png'
    }
  }
}
</script>
<style lang="">
</style>