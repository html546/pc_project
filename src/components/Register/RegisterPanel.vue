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
            <div class="mobile_panel mobile_panel1">
              <b-form
                @submit="onSubmit"
                id="form"
              >
                <b-form-group
                  label="会员编号"
                  label-for="register_input"
                  label-text-align="left"
                >
                  <b-form-input
                    id="register_input"
                    placeholder="请输入会员编号"
                    name="username"
                    :disabled="isedit=='1'?false:true"
                    v-model="defaultname"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  v-for="(val,key) in reg_content"
                  :key="key"
                  :label="val.name"
                  label-text-align="left"
                >
                  <template v-if="key == 'mobile_phone'">
                    <b-form-input
                      :name="key"
                      :type="val.input"
                      v-model="mobile_phone"
                    ></b-form-input>
                  </template>
                  <template v-if="key == 'bank_name'">
                    <b-form-select
                      :name="key"
                      :type="val.input"
                      :options="options"
                      @change="getBank"
                    ></b-form-select>
                  </template>
                  <template v-if="key == 'mobile_code'">
                    <b-row class="mb-3">
                      <b-col
                        cols="9"
                        md="9"
                        sm="9"
                        lg="9"
                        xl="9"
                      >
                        <b-form-input
                          placeholder="请输入图片验证码"
                          v-model="qrcode"
                        ></b-form-input>
                      </b-col>
                      <b-col
                        cols="3"
                        md="3"
                        sm="3"
                        lg="3"
                        xl="3"
                      >
                        <b-img
                          :src="qrcodeSrc"
                          fluid
                          style="height:100%;width:100%"
                          @click="getVerifyCode"
                        ></b-img>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col
                        cols="9"
                        md="9"
                        sm="9"
                        lg="9"
                        xl="9"
                      >
                        <b-form-input
                          placeholder="请输入手机验证码"
                          v-model="val.default"
                          :name="key"
                        ></b-form-input>
                      </b-col>
                      <b-col
                        cols="3"
                        md="3"
                        sm="3"
                        lg="3"
                        xl="3"
                      >
                        <b-button
                          size="sm"
                          variant="primary"
                          type="button"
                          @click="getMobileCode"
                        >获取手机验证码</b-button>
                      </b-col>
                    </b-row>
                  </template>
                  <b-form-input
                    placeholder=""
                    v-model="val.default"
                    :name="key"
                    v-if="val.input=='text'&&key!=='mobile_code'&&key!=='mobile_phone'"
                  ></b-form-input>
                  <b-form-select
                    :options="val.select"
                    v-if="val.input=='select'&&key!=='bank_name'"
                    v-model="val.default"
                    :name="key"
                  >
                  </b-form-select>
                </b-form-group>

                <b-form-group
                  label="登陆密码"
                  label-for="register_input1"
                  label-text-align="left"
                >
                  <b-form-input
                    id="register_input1"
                    placeholder="请输入登陆密码"
                    name="pass1"
                    v-model="pass1"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label="确认登陆密码"
                  label-for="register_input2"
                  label-text-align="left"
                >
                  <b-form-input
                    id="register_input2"
                    placeholder="请确认登陆密码"
                    name="pass1c"
                    v-model="pass1c"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label="支付密码"
                  label-for="register_input3"
                  label-text-align="left"
                >
                  <b-form-input
                    id="register_input3"
                    placeholder="请输入支付密码"
                    name="pass2"
                    v-model="pass2"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group
                  label="确认支付密码"
                  label-for="register_input4"
                  label-text-align="left"
                >
                  <b-form-input
                    id="register_input4"
                    placeholder="请确认支付密码"
                    name="pass2c"
                    v-model="pass2c"
                  >
                  </b-form-input>
                </b-form-group>
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
                  type="submit"
                >
                  注册
                </b-button>
              </b-form>
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
import bForm from 'bootstrap-vue/es/components/form/form';
import PanelLeft from '../PanelLeft';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  data() {
    return {
      reg_content: '',
      isedit: '',
      defaultname: '',
      pass1: '',
      pass1c: '',
      pass2: '',
      pass2c: '',
      qrcode: '',
      qrcodeSrc: '',
      mobile_phone: '',
      options: []
    }
  },
  created() {
    base.post(api.register, {
      type: 1
    }).then((res) => {
      console.log(res);
      this.reg_content = res.data.data.regdatasets;
      this.isedit = res.data.data.isedit;
      this.defaultname = res.data.data.defaultname;
    }).catch((err) => {
      console.log(err);
    });
    this.getVerifyCode();
  },
  components: {
    [bButton.name]: bButton,
    [bFormGroup.name]: bFormGroup,
    [bFromCheckboxGroup.name]: bFromCheckboxGroup,
    [bForm.name]: bForm,
    PanelLeft,
  },
  methods: {
    getBank() {
      console.log('这里有空问一下银行信息从哪里获取');
    },
    getVerifyCode() {
      base.post(api.getVerifyCode, {
        mobile: this.mobile_phone
      }).then(res => {
        console.log(res);
        this.qrcodeSrc = res.data.image;
        this.encrypt_code = res.data.encryptCode;
      }).catch(err => {
        console.log(err);
      })
    },
    getMobileCode() {
      base.post(api.verify, {
        verify_code: this.qrcode,
        encrypt_code: this.encrypt_code,
        mobile: this.mobile_phone
      }).then(res => {
        console.log(res);
        if (res.data.status == 0) {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onSubmit(evt) {
      evt.preventDefault();
      console.log(evt);
      var formData = document.getElementById('#form');
      var formdata = new FormData(formData);
      for (let index = 0; index < evt.target.length; index++) {
        formdata.append(evt.target[index].name, evt.target[index].value);
      }
      base.post(api.registersave, formdata).then(res => {
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
            type: "info",
            title: res.data.msg
          })
        }
      }).catch(err => {
        this.$swal({
          type: 'error',
          title: res
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
  /* background-color: #ed8134; */
  /* border: none; */
}
.mobile_login:not(:disabled):not(:disabled):active {
  color: #ffffff;
}
#checkbox1 + label,
#checkbox2 + label {
  color: #ffffff;
}
</style>

