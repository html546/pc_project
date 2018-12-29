<template>
  <div id="app">
    <!-- <transition
      name="fade"
      enter-active-class="animated bounceInLeft"
      leave-active-class="animated bounceOutRight"
      mode="out-in"
    > -->
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- </transition> -->
  </div>
</template>

<script>
import { router } from './router';

window.onunload = function () {
  alert(123);
  if (sessionStorage.getItem('menus') !== '' && sessionStorage.getItem('menus') != undefined) {
    let router2 = JSON.parse(localStorage.getItem('menus'));
    router.addRoutes(router2);
  }
}
export default {
  name: 'App',
  components: {
  },
  mounted() {

  },
  methods: {

  },
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
