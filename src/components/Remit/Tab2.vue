<template>
  <div class="register1">
    <b-form
      @submit="onSubmit"
      id="register"
    >
      <div
        v-for="(item,index) in withdrawList"
        :key="index"
      >
        <b-form-group :label="item.label">
          <b-form-select
            v-if="item.label=='开户行'"
            :options="options"
          ></b-form-select>
          <b-form-input v-else></b-form-input>
        </b-form-group>
      </div>
      <b-form-group label="提现手续费">
        <b-form-input
          v-model="fax"
          readonly
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
      money: ''
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
      console.log(res);
      this.withdrawList = res.data.datas.cashField;
      let bankcards = [];
      res.data.datas.bankcards.forEach(item => {
        bankcards.push({
          value: item.id,
          text: item.bank_names
        })
      })
      this.options = bankcards;
      this.fax = res.data.datas.tax;
      this.type = res.data.datas.type;
      /* this.registerlist = res.data.data.regdatasets;
      this.defaultname = res.data.data.defaultname; */
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let user = localStorage.getItem('user');
      /* let form = document.getElementById('register');
      let formdata = new FormData(form);
      let user = localStorage.getItem('user');
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid); */
      base.post(api.withdrawsave, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: this.type,
        tixian_money: this.money
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