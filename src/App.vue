<template>
  <div id="app">
    <!-- <transition
      name="fade"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
      mode="out-in"
    > -->
    <router-view />
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
* {
  margin: 0%;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
