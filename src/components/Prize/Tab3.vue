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
          @change="uploadImg"
        ></b-form-file>
      </b-form-group>
      <b-form-group
        label="备注"
        label-for="memo"
        description="请填写备注信息"
      >
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
import * as base from '../../assets/js/base.js';
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
    base.post(api.addremittance, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      // console.log(res);
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
      base.post(api.addremittances, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        username: JSON.parse(user).username,
        import_account: this.bankcard,
        money: this.money,
        remtime: this.remtime,
        remimg: this.file,
        memo: this.memo
      }).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
        } else if (res.data.status == 0) {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        }
      }).catch((err) => {
        console.log(JOSN.stringify(err));
        this.$swal({
          type: "error",
          title: err.data.msg
        })
      })
    },
    onReset(evt) {
      evt.preventDefault();
    },
    uploadImg(e) {
      // console.log(e);
      this.file = e.target.files[0];
      var vm = this;
      console.log(vm.file);
      let user = localStorage.getItem('user');
      var formdata = new FormData();
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('image', vm.file);
      formdata.append('type', 1);
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      base.post(api.pingzheng, formdata, config).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
          vm.file = res.data.data;
        } else if (res.data.status == 0) {
          this.$swal({
            type: 'info',
            title: res.data.msg
          })
        }
      }).catch((err) => {
        console.log(err);
        this.$swal({
          type: 'error',
          title: err.data.msg
        })
      })
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