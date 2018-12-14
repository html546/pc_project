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
            label="会员编号"
            label-for="defaultname"
          >
            <b-form-input
              v-model="defaultname"
              id="defaultname"
              name="username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            v-for="(val,key) in registerlist"
            :key="key"
            :label="val.name"
            :label-for="'register'+key"
          >
            <b-form-input
              v-if="val.input=='text'"
              :value="val.default"
              :id="'register'+key"
              :name="key"
            >
            </b-form-input>
            <b-form-select
              :options="val.select"
              v-if="val.input == 'select'"
              :value="val.default"
              :id="'register'+key"
              :name="key"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="登录密码"
            label-for="pass1"
          >
            <b-form-input
              id="pass1"
              v-model="pass1"
              name="pass1"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="确认登录密码"
            label-for="pass1c"
          >
            <b-form-input
              id="pass1c"
              v-model="pass1c"
              name="pass1c"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="支付密码"
            label-for="pass2"
          >
            <b-form-input
              id="pass2"
              v-model="pass2"
              name="pass2"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="确认支付密码"
            label-for="pass2c"
          >
            <b-form-input
              id="pass2c"
              name="pass2c"
              v-model="pass2c"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="省份"
            label-for="province"
          >
            <b-form-select
              id="province"
              name="province"
              :options="provinces"
              @change="getCity"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="城市"
            label-for="citys"
          >
            <b-form-select
              id="citys"
              name="city"
              :options="citys"
              @change="getArea"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="县区"
            label-for="area"
          >
            <b-form-select
              id="area"
              name="area"
              :options="areas"
            ></b-form-select>
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
      registerlist: [],
      defaultname: '',
      pass1: '',
      pass1c: '',
      pass2: '',
      pass2c: '',
      provinces: [],
      citys: [],
      areas: []
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.register1, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      type: 1
    }).then(res => {
      // console.log(res);
      this.registerlist = res.data.data.regdatasets;
      this.defaultname = res.data.data.defaultname;
    }).catch(err => {
      console.log(err);
    })
    base.post(api.getProvince).then(res => {
      // console.log(res);
      let provinces = [];
      res.data.data.province.forEach(item => {
        provinces.push({
          text: item.name,
          value: item.id
        })
      })
      this.provinces = provinces;
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
    },
    getCity(e) {
      console.log(e);
      base.post(api.getArea, {
        id: e
      }).then(res => {
        // console.log(res);
        let citys = [];
        res.data.data.forEach(item => {
          citys.push({
            text: item.name,
            value: item.id
          })
        })
        this.citys = citys;
      }).catch(err => {
        console.log(err);
      })
    },
    getArea(e) {
      let areas = [];
      base.post(api.getArea, {
        id: e
      }).then(res => {
        // console.log(res);
        let areas = [];
        res.data.data.forEach(item => {
          areas.push({
            text: item.name,
            value: item.id
          })
        })
        this.areas = areas;
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