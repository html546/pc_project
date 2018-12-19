<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <b-container>
        <b-row
          align-h="start"
          align-v="center"
          style="height:50rem;"
        >
          <b-col
            cols="12"
            sm="12"
            md="12"
            xl="12"
            lg="12"
            align-self="center"
          >
            <b-form
              id="form"
              @submit="onSubmit"
              @reset="onReset"
            >
              <div class="text-white my-2">
                申诉内容
              </div>
              <vue-editor
                v-model="content"
                style="background:#fff;"
              ></vue-editor>
              <b-button
                variant="info"
                type="button"
                class="float-right mt-2"
                @click="goback"
              >返回</b-button>
              <b-button
                variant="danger"
                type="reset"
                class="float-right mt-2 mr-3"
              >撤销</b-button>
              <b-button
                variant="primary"
                type="submit"
                class="float-right mt-2 mr-3"
              >提交</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import api from '../api/api.js';
import bButton from 'bootstrap-vue/es/components/button/button';
import { VueEditor } from 'vue2-editor';
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      content: ''
    }
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    VueEditor
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    onSubmit(evt) {
      evt.preventDefault();
      let id = this.$route.params.id;
      let user = localStorage.getItem('user');
      base.post(api.stopbuytrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id,
        saledata: this.content
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    onReset(evt) {
      evt.preventDefault();
      this.content = '';
    }
  }
}
</script>

<style lang="sass">
label
  color:#fff
</style>