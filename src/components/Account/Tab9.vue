<template>
  <div>
    <b-form
      @submit="onSubmit"
      @reset="onReset"
    >
      <b-form-group
        label="姓名"
        label-for="username"
      >
        <b-form-input
          type="text"
          id="username"
          required
          placeholder="请输入姓名"
          v-model="username"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="证件号"
        label-for="card"
      >
        <b-form-input
          type="text"
          id="card"
          required
          placeholder="请输入证件号"
          v-model="card"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="正面照片"
        label-for="image_input"
      >
        <b-form-file
          id="image_input"
          placeholder="请选择图片"
          @change="getImg1"
          ref="file_input1"
        ></b-form-file>
        <b-img
          :src="image_input"
          fluid
          width="300"
          height="300"
          style="margin-top:20px;"
        ></b-img>
      </b-form-group>
      <b-form-group
        label="反面照片"
        label-for="image2_input"
      >
        <b-form-file
          id="image2_input"
          placeholder="请选择图片"
          @change="getImg2"
          ref="file_input2"
        ></b-form-file>
        <b-img
          :src="image2_input"
          fluid
          width="300"
          height="300"
          style="margin-top:20px;"
        ></b-img>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >提交</b-button>
      <b-button
        type="reset"
        variant="danger"
      >重置</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bForm from 'bootstrap-vue/es/components/form/form';
import bFormFile from 'bootstrap-vue/es/components/form-file/form-file';
import bImg from 'bootstrap-vue/es/components/image/img';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      username: '',
      card: '',
      image_input: '',
      image2_input: ''
    }
  },
  components: {
    [bForm.name]: bForm,
    [bFormFile.name]: bFormFile,
    [bImg.name]: bImg
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let user = localStorage.getItem('user');
      base.post(api.realNameAuth, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        truename: this.username,
        card: this.card,
        image_input: this.image_input,
        image2_input: this.image2_input
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then(res => {
            if (res.value) {
              this.username = '';
              this.card = '';
              this.image_input = '';
              this.image2_input = '';
              this.$refs.file_input1.reset();
              this.$refs.file_input2.reset();
            }
          })
        } else {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onReset(evt) {
      evt.preventDefault();
      this.username = '';
      this.card = '';
      this.$refs.file_input1.reset();
      this.$refs.file_input2.reset();
      this.image_input = '';
      this.image2_input = '';
    },
    getImg1(e) {
      let user = localStorage.getItem('user');
      let formdata = new FormData();
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('file_upload', e.target.files[0]);
      base.post(api.upload, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: '上传成功',
            type: 'success'
          })
          this.image_input = res.data.data.url;
        } else {
          this.$swal({
            title: '上传失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getImg2(e) {
      let user = localStorage.getItem('user');
      let formdata = new FormData();
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('file_upload', e.target.files[0]);
      base.post(api.upload, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: '上传成功',
            type: 'success'
          })
          this.image2_input = res.data.data.url;
        } else {
          this.$swal({
            title: '上传失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style lang="" scoped>
</style>