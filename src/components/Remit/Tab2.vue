<template>
  <div class="register1">
    <b-form
      @submit="onSubmit"
      id="remit"
    >
      <div
        v-for="(item,index) in withdrawList"
        :key="index"
      >
        <b-form-group
          :label="item.label"
          v-if="item.is_show"
        >
          <b-form-select
            v-if="item.label=='开户行'"
            :options="options"
            :name="item.filed"
            v-model="bank_name"
          ></b-form-select>
          <b-form-input
            :name="item.filed"
            v-else
          ></b-form-input>
        </b-form-group>
      </div>
      <b-form-group label="提现手续费">
        <b-form-input
          v-model="fax"
          readonly
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="钱包余额">
        <b-form-input
          v-model="balance"
          readonly
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="二级密码" v-if="password">
        <b-form-input
          v-model="pass2"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="提现金额">
        <b-form-input v-model="money">
        </b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >提交</b-button>
    </b-form>
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
      withdrawList: [],
      options: [],
      fax: '',
      type: '',
      money: '',
      bank_name: '',
      sheet: '',
      balance: '',
      pass2: '',
      password: '',
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.withdraw, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      type: 1
    }).then(res => {
      // console.log(res);
      this.withdrawList = res.data.datas.cashField;
      let bankcards = [];
      res.data.datas.bankcards.forEach(item => {
        bankcards.push({
          value: item.id,
          text: item.bank_names
        })
      })
      this.options = bankcards;
      this.fax = res.data.datas.tax + '%';
      this.type = res.data.datas.type;
      this.sheet = res.data.datas.financenode.sheet;
      this.password = res.data.datas.cashPass2 === "false" ? false : true;
    }).catch(err => {
      console.log(err);
    });
    base.post(api.getUserWallet, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      // console.log(res);
      res.data.data.forEach(item => {
        if (item.sheet == this.sheet) {
          this.balance = item.balance;
        }
      })
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let form = document.getElementById('remit');
      let formdata = new FormData(form);
      let user = localStorage.getItem('user');
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('type', this.type);
      formdata.append('tixian_money', this.money);
      base.post(api.withdrawsave, formdata).then(res => {
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