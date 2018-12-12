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
              <b-form-group
                label="发送给"
                label-for="sendto"
              >
                <b-form-input
                  id="sendto"
                  v-model="sender"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="主题"
                label-for="subject"
              >
                <b-form-input
                  id="subject"
                  type="text"
                  v-model="subject"
                  placeholder="请输入主题"
                ></b-form-input>
              </b-form-group>
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
      sender: '',
      subject: '',
      content: ''
    }
  },
  created() {
    let user = localStorage.getItem('user');
    let id = this.$route.params.id;
    base.post(api.replymail, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      id: id
    }).then(res => {
      console.log(res);
      this.sender = res.data.data.id;
      this.subject = res.data.data.title;
    }).catch(err => {
      console.log(err);
    })
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
      base.post(api.replymails, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id,
        reply_content: this.content
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