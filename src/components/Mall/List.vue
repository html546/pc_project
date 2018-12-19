<template>
  <b-row
    align-v="center"
    align-h="center"
  >
    <b-col
      cols="12"
      md="12"
      sm="12"
      lg="12"
      xl="12"
    >
      <b-card
        header="产品筛选"
        header-class="header"
        body-class="body"
        border-variant="dark"
        text-variant="white"
      >
        <p class="card-text">
          分类
        </p>
        <p class="card-text">
          品牌
        </p>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    [bCard.name]: bCard
  }
}
</script>

<style lang="" scoped>
.header {
  color: #01a287;
  background: #0a1222;
  border: none;
  border-bottom: 1px solid #333;
}
.body {
  background: #0a1222;
  border: none;
}
</style>