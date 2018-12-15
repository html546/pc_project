<template>
  <div class="register1">
    <b-row align-h="center">
      <b-col
        cols="6"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <b-form
          @submit="onSubmit"
          id="register"
        >
          <b-form-group
            label="账户余额"
            label-for="balance"
          >
            <b-form-input
              :readonly="true"
              id="balance"
              v-model="balance"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="最小转账金额"
            label-for="minMoney"
          >
            <b-form-input
              id="minMoney"
              :readonly="true"
              v-model="minMoney"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="最大转账金额"
            label-for="maxMoney"
          >
            <b-form-input
              id="maxMoney"
              :readonly="true"
              v-model="maxMoney"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="整数倍"
            label-for="multiple"
          >
            <b-form-input
              id="multiple"
              :readonly="true"
              v-model="multiple"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="汇率"
            label-for="exchange_rate"
          >
            <b-form-input
              id="exchange_rate"
              :readonly="true"
              v-model="exchange_rate"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="手续费"
            label-for="servicecharge"
          >
            <b-form-input
              id="servicecharge"
              :readonly="true"
              v-model="servicecharge"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="转账金额"
            label-for="money"
          >
            <b-form-input
              id="money"
              v-model="money"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="转入人编号"
            label-for="username"
            v-if="isme"
          >
            <b-form-input
              id="username"
              v-model="username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="转账类型"
            label-for="type"
          >
            <b-form-select
              :options="options"
              id="type"
              v-model="transferType"
              @change="change"
            >
              <template slot="first">
                <option
                  :value="null"
                  disabled
                >请选择你的转账类型</option>
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="支付密码"
            label-for="pass2"
            v-if="cashPass2"
          >
            <b-form-input
              placeholder="请输入支付密码"
              id="pass2"
              name="cashPass2"
              v-model="pass2"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="图片验证码"
            v-if="cashcheckmess"
          >
            <b-row>
              <b-col
                cols="9"
                sm="9"
                md="9"
                lg="9"
                xl="9"
              >
                <b-form-input
                  id="qrcode"
                  v-model="qrcode"
                  type="text"
                  placeholder="请输入图片验证码"
                ></b-form-input>
              </b-col>
              <b-col
                cols="3"
                sm="3"
                md="3"
                lg="3"
                xl="3"
              >
                <b-img
                  :src="qrcodeSrc"
                  fluid
                  style="height:100%;"
                  @click="getVerifyCode"
                ></b-img>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group
            label="短信验证码"
            v-if="cashcheckmess"
          >
            <b-row>
              <b-col
                cols="9"
                md="9"
                sm="9"
                lg="9"
                xl="9"
              >
                <b-form-input
                  placeholder="请输入短信验证码"
                  id="message"
                  v-model="message"
                  name="mobile_code"
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
                  variant="primary"
                  size="sm"
                  type="button"
                  @click="getMobileCode"
                >获取手机验证码</b-button>
              </b-col>
            </b-row>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
          >提交</b-button>
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import bForm from 'bootstrap-vue/es/components/form/form';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      transfers: [],
      options: [],
      transferType: null,
      balance: '',
      minMoney: '',
      maxMoney: '',
      multiple: '',
      exchange_rate: '',
      servicecharge: '',
      money: '',
      type: '',
      username: '',
      isme: 1,
      pass2: '',
      cashPass2: '',
      cashcheckmess: '',
      qrcode: '',
      qrcodeSrc: '',
      message: '',
      encrypt_code: ''
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.transfer, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      type: 1
    }).then(res => {
      console.log(res);
      this.balance = res.data.data.money;
      this.transfers = res.data.data.transfers;
      this.type = res.data.data.type;
      this.cashPass2 = res.data.data.cashPass2;
      this.cashcheckmess = res.data.data.cashcheckmess;
      let options = [];
      res.data.data.transfers.forEach((item, index) => {
        options.push(
          { value: index, text: item.giveTo }
        )
      })
      this.options = options;
    }).catch(err => {
      console.log(err);
    })
    this.getVerifyCode();
  },
  methods: {
    getVerifyCode() {
      let user = localStorage.getItem('user');
      base.post(api.getVerifyCode, {
        mobile: JSON.parse(user).mobile_phone
      }).then(res => {
        console.log(res);
        this.qrcodeSrc = res.data.image;
        this.encrypt_code = res.data.encryptCode;
      }).catch(err => {
        console.log(err);
      })
    },
    onSubmit(evt) {
      evt.preventDefault();
      let user = localStorage.getItem('user');
      base.post(api.transfers, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        banktype: this.type,
        username: this.username,
        money: this.money,
        givekey: this.transferType,
        cashPass2: this.pass2,
        mobile_phone: JSON.parse(user).mobile_phone,
        mobile_code: this.message
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
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
    getMobileCode() {
      let user = localStorage.getItem('user');
      console.log(JSON.parse(user).mobile_phone);
      base.post(api.verify, {
        verify_code: this.qrcode,
        encrypt_code: this.encrypt_code,
        mobile: JSON.parse(user).mobile_phone
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    change(evt) {
      //   console.log(evt);
      this.transfers.forEach((item, index) => {
        if (index == evt) {
          //   console.log(123);
          this.maxMoney = item.maxmoney;
          this.minMoney = item.minmoney;
          this.multiple = item.multiple;
          this.exchange_rate = item.exchange_rate;
          this.servicecharge = item.servicecharge + '%';
          this.isme = item.isme == '0' ? 1 : 0;
        }
      })
    }
  }
}
</script>

<style lang="">
.register1 {
  color: #fff;
  margin-top: 30px;
}
</style>