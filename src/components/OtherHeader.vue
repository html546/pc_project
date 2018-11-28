<template>
  <div class="header">
    <b-navbar
      toggleable="md"
      class="nav_bar bg_dark1"
      type="dark"
      variant="dark"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <img
          src="../assets/images/logos.png"
          alt=""
        >
      </b-navbar-brand>
      <b-collapse
        is-nav
        id="nav_collapse"
      >
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            text="中文(简体)"
            right
          >
            <b-dropdown-item href="#">日本语</b-dropdown-item>
            <b-dropdown-item href="#">繁体中文</b-dropdown-item>
            <b-dropdown-item href="#">简体中文</b-dropdown-item>
            <b-dropdown-item href="#">English</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item
            href="#"
            right
          > |&nbsp;&nbsp;&nbsp;&nbsp; 登陆/注册</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    [bNavbar.name]: bNavbar,
  }
}
</script>

<style lang="" scoped>
.bg_dark1 {
  background-color: #050e1e !important;
  padding: 0.5rem 4rem;
}
</style>