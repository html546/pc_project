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
            router-tag="span"
            right
          > |&nbsp;&nbsp;
            <b-link
              router-tag="span"
              to="/"
            >登录</b-link>
            /
            <b-link
              router-tag="span"
              to="/register"
            >注册</b-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bLink from 'bootstrap-vue/es/components/link/link';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    [bNavbar.name]: bNavbar,
    [bLink.name]: bLink
  }
}
</script>

<style lang="" scoped>
.bg_dark1 {
  background-color: #050e1e !important;
  padding: 0.5rem 4rem;
}
.dropdown-menu .dropdown-item {
  background-color: #050e1e !important;
  color: #fff;
}
</style>