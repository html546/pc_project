<template>
  <div class="addremittance">
    <b-form
      @submit="onSubmit"
      @reset="onReset"
      class="addremittance_form"
    >
      <b-form-group
        label="汇入账户"
        label-for="bank_name"
        description="请选择汇入账户"
      >
        <b-form-select
          v-model="bankcard"
          :options="options"
          id="bank_name"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        label="汇入金额"
        label-for="money"
        description="请输入汇入金额"
      >
        <b-form-input
          v-model="money"
          id="money"
          type="number"
          placeholder="请输入汇入金额"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="汇款时间"
        label-for="remtime"
        description="请选择汇款时间"
      >
        <b-form-input
          v-model="remtime"
          id="remtime"
          type="date"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="选择汇款凭证"
        label-for="file"
        description="请选择汇款凭证"
      >
        <b-form-file
          v-model="file"
          placeholder="请选择文件"
          id="file"
          accept="image/*"
        ></b-form-file>
      </b-form-group>
      <b-form-group
        label="备注"
        label-for="memo"
        description="请填写备注信息"
      >
        <!-- <b-form-input
          v-model="memo"
          id="memo"
          type="text"
          placeholder="请填写备注信息"
        ></b-form-input> -->
        <b-form-textarea
          id="memo"
          v-model="memo"
          placeholder="请填写备注信息"
          :rows="5"
        ></b-form-textarea>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
      >提交</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '../../api/api.js';
import bForm from 'bootstrap-vue/es/components/form/form';
export default {
  name: '',
  data() {
    return {
      bankcard: '',
      options: [],
      money: '',
      remtime: '',
      memo: '',
      file: ''
    }
  },
  components: {
    [bForm.name]: bForm,
  },
  created() {
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.addremittance, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      console.log(JSON.stringify(res.data.data));
      let bankcards = [];
      res.data.data.bankcards.forEach((item) => {
        bankcards.push({ value: item.bank_number, text: item.bank_names })
      })
      this.options = bankcards;
    }).catch((err) => {
      console.log(JSON.stringify(err));
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      var user = localStorage.getItem('user');
      this.$http.post(this.HOST+api.addremittances,{
        userid:JSON.parse(user).id,
        sessionid:JSON.parse(user).sessionid,
        username:JSON.parse(user).username,
        import_account:this.bankcard,
        money:this.money,
        remtime:this.remtime,
        remimg:this.file,
        memo:this.memo
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(JOSN.stringify(err));
      })
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
}
</script>

<style lang="" scoped>
.addremittance {
  color: #fff;
}
.addremittance_form {
  margin-top: 20px;
}
</style>