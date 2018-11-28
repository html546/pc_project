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
        <div class="method_change">
          <b-button
            :variant="mobile?'warning':'outline-warning'"
            class="mobile_login"
            @click="toggleMobile"
          >手机登陆</b-button>
          <b-button
            :variant="mobile?'outline-success':'success'"
            class="email_login"
            @click="toggleMail"
          >邮箱登陆</b-button>
        </div>
        <b-row align-h="center">
          <b-col
            sm="7"
            md="7"
            cols="7"
            lg="7"
            xl="7"
          >
            <div
              class="mobile_panel"
              v-show="mobile"
            >
              <b-form-group
                label="手机"
                label-for="login_input1"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input1"
                  placeholder="请输入手机号"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="密码"
                label-for="login_input2"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input2"
                  placeholder="请输入密码"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="图片验证码"
                label-for="login_input3"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input3"
                  placeholder="请输入验证码"
                ></b-form-input>
                <img
                  src="../../assets/images/code.png"
                  alt=""
                >
                <div class="clearfix"></div>
              </b-form-group>
              
            </div>
            <div
              class="mobile_panel"
              v-show="!mobile"
            >
              <b-form-group
                label="邮箱"
                label-for="login_input4"
                label-text-align="left"
              >
                <b-form-input
                  id="login_input4"
                  placeholder="请输入邮箱"
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
                ></b-form-input>
              </b-form-group>
              <b-form-group
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
              </b-form-group>
             <!--  <b-button
                variant="success"
                size="lg"
                class="mobile_login"
              >
                登录
              </b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-left forget"
              >忘记密码?</b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-right register"
              >立即注册</b-button> -->
            </div>
            <b-button
                variant="success"
                size="lg"
                class="mobile_login_lg"
              >
                登录
              </b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-left forget"
              >忘记密码?</b-button>
              <b-button
                variant="link"
                size="lg"
                class="float-right register"
              >立即注册</b-button>
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
export default {
  data() {
    return {
      mobile: true
    }
  },
  components: {
    [bButton.name]: bButton,
    [bFormGroup.name]: bFormGroup,
    PanelLeft
  },
  methods: {
    toggleMobile() {
      this.mobile = true;
    },
    toggleMail() {
      this.mobile = false;
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
  /* background-color: #ed8134; */
  /* border: none; */
}
.method_change button:last-child {
  /* border-color: #057b65; */
  /* color: #057b65; */
}
.mobile_login {
  /* color: #ffffff; */
}
.mobile_login:not(:disabled):not(:disabled):active {
  color: #ffffff;
}
</style>

