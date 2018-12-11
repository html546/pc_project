<template>
  <div>
    <b-form
      class="personal"
      @submit="onSubmit"
    >
      <b-form-group
        label="原密码"
        label-for="oldpass1"
      >
        <b-form-input
          placeholder="输入原密码"
          id="oldpass1"
          type="password"
          required
          v-model="oldpass1"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="登录新密码"
        label-for="pass1"
        description="至少6位"
      >
        <b-form-input
          placeholder="输入登录新密码"
          id="pass1"
          type="password"
          required
          v-model="pass1"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="确认登录新密码"
        label-for="pass1c"
      >
        <b-form-input
          placeholder="确认登录新密码"
          id="pass1c"
          type="password"
          required
          v-model="pass1c"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >提交</b-button>
    </b-form>
  </div>
</template>

<script>
import * as base from '../../assets/js/base.js';
import api from '../../api/api.js';
import bForm from 'bootstrap-vue/es/components/form/form';
export default {
  name: '',
  data() {
    return {
      oldpass1: '',
      pass1: '',
      pass1c: ''
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {

  },
  methods: {
    onSubmit(evt) {
      let user = localStorage.getItem('user');
      evt.preventDefault();
      base.post(api.savepassword, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        oldpass: this.oldpass1,
        pass1: this.pass1,
        pass1c: this.pass1c
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then(res => {
            if (res.value) {
              this.onReset();
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
        this.$swal({
          type: 'error',
          title: res.data.msg
        })
      })
    },
    onReset(evt) {
      this.oldpass1 = '';
      this.pass1 = '';
      this.pass1c = '';
    }
  }
}
</script>

<style lang="" scoped>
.personal {
  margin-top: 30px;
  color: #fff;
}
</style>