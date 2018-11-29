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
            <div
              class="mobile_panel mobile_panel1"
            >
              <b-form-group
                v-for="(val,key) in reg_content"
                :key="key"
                :label="val.name"
                label-for="register_input1"
                label-text-align="left"
                v-if="val.input!=='hidden'&&val.input=='text'"
              >
                <b-form-input
                  id="register_input1"
                  placeholder="请输入手机号"
                  v-model="val.default"
                  :name="val.name"
                ></b-form-input>
              </b-form-group>
              <!-- <b-form-group
                label="密码"
                label-for="register_input2"
                label-text-align="left"
              >
                <b-form-input
                  id="register_input2"
                  placeholder="*密码至少数字+密码,8-16位组成"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="确认密码"
                label-for="register_input3"
                label-text-align="left"
              >
                <b-form-input
                  id="register_input3"
                  placeholder="*密码至少数字+密码,8-16位组成"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="图片验证码"
                label-for="register_input4"
                label-text-align="left"
              >
                <b-form-input
                  id="register_input4"
                  placeholder="请输入验证码"
                ></b-form-input>
                <img
                  src="../../assets/images/code.png"
                  alt=""
                >
                <div class="clearfix"></div>
              </b-form-group>
              <b-form-group
                label="邀请码"
                label-for="register_input5"
                label-text-align="left"
              >
                <b-form-input
                  id="register_input5"
                  placeholder="请输入邀请码"
                ></b-form-input>
              </b-form-group> -->
              <b-form-checkbox
                id="checkbox1"
                value="accepted"
                unchceked-value="not_accepted"
                class="float-left"
              >
                我已阅读并同意《用户协议》
              </b-form-checkbox>
              <b-button
                variant="success"
                size="lg"
                class="mobile_login_lg mobile_register_lg"
              >
                注册
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
                to="/"
              >立即登录</b-button>
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
import bFromCheckboxGroup from 'bootstrap-vue/es/components/form-checkbox/form-checkbox-group';
import PanelLeft from '../PanelLeft';
export default {
  data() {
    return {
      reg_content:''
    }
  },
  created() {
    this.$http.post(this.HOST+'api/webmember/register',{
      type:1
    }).then((res)=>{
      console.log(JSON.stringify(res));
      this.reg_content = res.data.data.regdatasets;
      // console.log(this.reg_content);
    }).catch((err)=>{
      console.log(JSON.stringify(err));
    })
  },
  components: {
    [bButton.name]: bButton,
    [bFormGroup.name]: bFormGroup,
    [bFromCheckboxGroup.name]: bFromCheckboxGroup,
    PanelLeft
  },
  methods: {
    
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
#checkbox1 + label,
#checkbox2 + label {
  color: #ffffff;
}
</style>

