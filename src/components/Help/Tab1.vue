<template>
  <div class="register1">
    <b-form
      @submit="onSubmit"
      id="supply"
    >
      <b-form-group
        label="会员编号"
        label-for="username"
      >
        <b-form-input
          v-model="username"
          id="username"
          readonly
        >
        </b-form-input>
      </b-form-group>
      <b-form-group :label="saletypename">
        <b-form-input
          v-if="isshow"
          :readonly="isedit"
          v-model="defaultValue"
          :name="saletype"
        ></b-form-input>
      </b-form-group>
      <div
        v-for="(item,index) in wallets"
        :key="index"
      >
        <b-form-group
          :label="item.label+'余额'"
          :label-for="item.field"
        >
          <b-form-input
            v-model="item.balance"
            :name="item.field"
            :id="item.field"
            :readonly="true"
          ></b-form-input>
        </b-form-group>
      </div>
      <!-- <b-form-group :label="balance">
        <b-form-input
          v-if="isshow"
          :readonly="isedit"
          v-model="defaultValue"
        ></b-form-input>
      </b-form-group> -->
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
      username: '',
      type: '',
      saletypename: '',
      isshow: true,
      isedit: true,
      defaultValue: '',
      wallets: [],
      saletype: ''
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {
    let user = localStorage.getItem('user');
    this.username = JSON.parse(user).username;
    let params = {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }
    base.post(api.helpNode, params).then(res => {
      // console.log(res);
      for (const key in res.data.data.salenodes) {
        if (res.data.data.salenodes.hasOwnProperty(key)) {
          const element = res.data.data.salenodes[key];
          if (element.name == '提供帮助') {
            this.type = key;
          }
        }
      }
    }).catch(err => {
      console.log(err);
    })
    base.post(api.salepage, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      type: this.type
    }).then(res => {
      console.log(res);
      this.saletypename = res.data.data.salenode.saletypename;
      this.isshow = res.data.data.salenode.isshow;
      this.isedit = res.data.data.salenode.isedit == 'true' ? false : true;
      this.defaultValue = res.data.data.salenode.default;
      this.wallets = res.data.data.wallets;
      this.saletype = res.data.data.salenode.saletype;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let form = document.getElementById('supply');
      let formdata = new FormData(form);
      let user = localStorage.getItem('user');
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('type', this.type);
      // formdata.append('tixian_money', this.money);
      base.post(api.sale, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then(res=>{
            if(res.value){
              location.reload();
            }
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
          title: err.toString()
        })
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