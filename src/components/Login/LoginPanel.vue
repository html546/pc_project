<template>
  <b-container fluid>
    <b-row
      align-v="center"
      class="login_row"
    >
      <PanelLeft />
      <b-col
        md="6"
        sm="6"
        cols="6"
        lg="6"
        xl="6"
        align-self="center"
        class="text-center"
      >
        <b-row align-h="center">
          <b-col
            sm="7"
            md="7"
            cols="7"
            lg="7"
            xl="7"
          >
            <div class="mobile_panel">
              <b-form-group
                label="用户名"
                label-for="login_input4"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input4"
                  placeholder="请输入用户名"
                  v-model.trim="username"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="密码"
                label-for="login_input5"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input5"
                  placeholder="请输入密码"
                  v-model.trim="password"
                ></b-form-input>
              </b-form-group>
              <!-- <b-form-group
                label="图片验证码"
                label-for="login_input6"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input6"
                  placeholder="请输入验证码"
                ></b-form-input>
                <img
                  src="../../assets/images/code.png"
                  alt=""
                >
                <div class="clearfix"></div>
              </b-form-group> -->
              <b-button
                variant="success"
                size="lg"
                class="mobile_login_lg"
                @click="loginIn"
              >
                登录
              </b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-left forget"
                router-tag="a"
                to="/forget"
              >忘记密码?</b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-right register"
                router-tag="a"
                to="/register"
              >立即注册</b-button>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import bButton from 'bootstrap-vue/es/components/button/button';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import PanelLeft from '../PanelLeft';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    console.log(this.$route);
    if (this.$route.query.id && this.$route.query.session_id && this.$route.query.username) {
      let user = {
        id: this.$route.query.id,
        sessionid: this.$route.query.session_id,
        username: this.$route.query.username
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.replace('/index');
    }
  },
  components: {
    [bButton.name]: bButton,
    [bFormGroup.name]: bFormGroup,
    PanelLeft
  },
  methods: {
    loginIn() {
      base.post(api.login, {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.status == 1) {
          localStorage.setItem('user', JSON.stringify(res.data.result));
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then((res) => {
            if (res.value) {
              this.$router.replace('/index');
            }
          })
        } else {
          this.$swal({
            type: 'warning',
            title: res.data.msg
          })
        }
      }).catch(err => {
        this.$swal({
          type: 'error',
          title: res.data.msg
        })
      })
    }
  }
}
</script>
<style>
.login_row {
  min-height: 50rem;
}
.method_change button {
  width: 165px;
  height: 40px;
  border-radius: 20px;
}
.method_change button:first-child {
  margin-right: 40px;
}

.mobile_login:not(:disabled):not(:disabled):active {
  color: #ffffff;
}
</style>

