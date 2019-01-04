<template>
  <div class="person">
    <b-row align-h="center">
      <b-col
        cols="6"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <b-form
          class="personal"
          @submit="onSubmit"
          id="form"
          v-if="checkPass"
        >
          <b-form-group
            v-for="(val,key) in person"
            :key="key"
            :label-for="key"
            :label="val.name"
          >
            <b-form-input
              type="text"
              :value="val.default"
              :id="key"
              v-if="val.input=='text'"
              :name="key"
            ></b-form-input>
            <b-form-select
              :id="key"
              v-model="val.default"
              v-else-if="val.input == 'select'"
              :options="val.select"
              :name="key"
            >
            </b-form-select>
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
              v-model="province"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            label="城市"
            label-for="city"
          >
            <b-form-select
              id="city"
              name="city"
              :options="citys"
              v-model="city"
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
              v-model="area"
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
import * as base from '../../assets/js/base.js';
import api from '../../api/api.js';
import bForm from 'bootstrap-vue/es/components/form/form';
export default {
  name: '',
  data() {
    return {
      person: [],
      username: '',
      provinces: [],
      province: '',
      citys: [],
      city: '',
      areas: [],
      area: '',
      checkPass: true
    }
  },
  components: {
    [bForm.name]: bForm
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.meta.checkPass == true) {
      next(vm => {
        vm.checkPass = false;
        base.checkPass(vm, vm.getCheckPass);
      });
    } else {
      next(vm => {
        vm.checkPass = true;
      })
    }
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.profileManagement, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      console.log(res);
      this.person = res.data.data.editinfo;
      this.username = res.data.data.memberinfo.username;
    }).catch((err) => {
      console.log(err);
    })
    base.post(api.getProvince).then(res => {
      let provinces1 = new Array();
      res.data.data.province.forEach(item => {
        provinces1.push({
          value: item.id,
          text: item.name
        })
      })
      this.provinces = provinces1;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    getCheckPass() {
      this.checkPass = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      console.log(evt);
      var form = document.getElementById('form');
      var formdata = new FormData('form');;
      var user = localStorage.getItem('user');
      for (let index = 0; index < evt.target.length; index++) {
        formdata.append(evt.target[index].name, evt.target[index].value);
      }
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('username', this.username);
      base.post(api.saveprofile, formdata).then(res => {
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
        this.$swal({
          type: 'error',
          title: err.data.msg
        })
      })
    },
    getCity(e) {
      console.log(e);
      base.post(api.getArea, {
        id: e
      }).then(res => {
        console.log(res);
        let citys = new Array();
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
      console.log(e);
      base.post(api.getArea, {
        id: e
      }).then(res => {
        let areas = new Array();
        res.data.data.forEach(item => {
          areas.push({
            text: item.name,
            value: item.id
          })
        })
        this.areas = areas;
      })
    }
  }
}
</script>

<style lang="sass">

</style>