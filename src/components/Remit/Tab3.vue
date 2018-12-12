<template>
  <div class="register1">
    <b-form
      @submit="onSubmit"
      id="register"
    >
      <b-form-group
        label="转账类型"
        label-for="type"
      >
        <b-form-select
          :options="options"
          id="type"
        ></b-form-select>
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
      options: []
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
      let options = [];
      res.data.data.transfers.forEach(item => {
        options.push(
          { value: item.obj, text: item.giveTo }
        )
      })
      this.options = options;
      // this.withdrawList = res.data.datas.cashField;
      /* this.registerlist = res.data.data.regdatasets;
      this.defaultname = res.data.data.defaultname; */
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      console.log(evt);
      let form = document.getElementById('register');
      let formdata = new FormData(form);
      let user = localStorage.getItem('user');
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      base.post(api.registersave1, formdata).then(res => {
        // console.log(res);
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