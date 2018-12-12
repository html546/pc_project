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
                label="手机号"
                label-for="mobile"
                label-text-align="left"
              >
                <b-form-input
                  id="mobile"
                  placeholder="请输入手机号"
                  v-model.trim="mobile"
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
                @click="findPass"
              >
                找回密码
              </b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-left forget"
                router-tag="a"
                to="/"
              >登陆</b-button>
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
      mobile: ''
    }
  },
  components: {
    [bButton.name]: bButton,
    [bFormGroup.name]: bFormGroup,
    PanelLeft
  },
  methods: {
    findPass() {
      base.post(api.forgetPassByMobile, {
        username: this.username,
        mobile: this.mobile
      }).then(res => {
          console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then((res) => {
            if (res.value) {
              this.$router.replace('/');
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

