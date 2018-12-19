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
          >
            <b-form
              id="form"
              @submit="onSubmit"
              @reset="onReset"
            >
              <b-form-group
                label="汇款凭证"
                label-for="image_input"
              >
                <b-form-file
                  v-model="file"
                  id="image_input"
                  placeholder="请上传汇款凭证"
                  @change="upload"
                ></b-form-file>
              </b-form-group>
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
import * as base from '../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      time: '',
      file: '',
    }
  },
  created() {
    let user = localStorage.getItem('user');
  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    upload(e) {
      let user = localStorage.getItem('user');
      //   console.log(e);
      //   console.log(e.target.files[0]);
      var vm = this;
      var formdata = new FormData();
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('file_upload', e.target.files[0]);
      base.post(api.upload, formdata).then(res => {
        console.log(res);
        this.file = res.data.data.url;
      }).catch(err => {
        console.log(err);
      })
    },
    onSubmit(evt) {
      evt.preventDefault();
      let id = this.$route.params.id;
      let user = localStorage.getItem('user');
      base.post(api.proofbuytrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        id: id,
        buydata: this.file
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.$router.go(-1);
            }
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
        this.$swal({
          title: err,
          type: 'error'
        })
      })
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
}
</script>

<style lang="sass">
label
  color:#fff
</style>