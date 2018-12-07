<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <div>
        <b-container>
          <b-row align-h="center">
            <b-col
              sm="12"
              md="12"
              cols="12"
              xl="12"
              lg="12"
              align-self="center"
              class="announce_panel"
            >
              <div class="announce_panel_top clearfix">
                <b-breadcrumb :items="items" />
              </div>
              <b-row align-h="center">
                <b-col
                  sm="8"
                  md="8"
                  cols="8"
                  xl="8"
                  lg="8"
                >
                  <div class="upload">
                    <b-form @submit="onSubmit">
                      <b-form-group
                        label="上传打款凭证"
                        label-for="upload"
                        description="请上传一个打款凭证"
                      >
                        <b-form-file
                          v-model="file"
                          :state="Boolean(file)"
                          placeholder="请选择一个文件"
                          accept="image/*"
                          id="upload"
                        ></b-form-file>
                        <div class="mt-3">选择文件:{{file&&file.name}}</div>
                      </b-form-group>
                      <b-button
                        type="submit"
                        variant="primary"
                      >提交</b-button>
                    </b-form>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import bBreadcrumb from 'bootstrap-vue/es/components/breadcrumb/breadcrumb';
import bForm from 'bootstrap-vue/es/components/form/form';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      items: [{
        text: '尚途网络',
        to: { name: 'Index' }
      }, {
        text: '汇款通知',
        to: { path: '/prize/remit' }
      }, {
        text: '上传打款凭证',
        active: true
      }],
      file: ''
    }
  },
  components: {
    Header,
    Footer1,
    [bForm.name]: bForm
  },
  created() {
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var id = this.$route.params.id;
      var user = localStorage.getItem('user');
      // let file = this.file;
      var vm = this;
      console.log(vm.file);
      /* this.$http.post(this.HOST + api.pingzheng, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        image:1111,
        id: id
      }).then((res) => {
        console.log(JSON.stringify(res))
      }).catch((err) => {
        console.log(JSON.stringify(err));
      }) */
      var formdata = new FormData();
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('image', vm.file);
      formdata.append('id', id);
      formdata.append('type', 2);
      /* const instance = this.$http.create({
        withCredentials: true
      }) */
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.$http.post(this.HOST + api.pingzheng, formdata, config).then((res) => {
        console.log(res);
        if (res.data.status == 0) {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        } else if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then((res) => {
            if (res.value) {
              this.$router.push('/prize/remit');
            }
          })
        }
      }).catch((err) => {
        console.log(JSON.stringify(err));
        this.swal({
          type: 'error',
          title: err.data.msg
        })
      })
      /* this.$http({
        method: 'post',
        url: this.HOST + api.pingzheng,
        data: {
          userid: JSON.parse(user).id,
          sessionid: JSON.parse(user).sessionid,
          image: vm.file,
          id: id
        },
        headers: { 'Content-Type': 'text/html' }
      }).then((res) => {
        console.log(JSON.stringify(res));
      }).catch((err) => {
        console.log(JSON.stringify(err));
      }) */
    }
  }
}
</script>

<style lang="" scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: "请选择";
}
.upload {
  color: #fff;
}
</style>