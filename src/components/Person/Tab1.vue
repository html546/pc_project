<template>
  <div>
    <b-row align-h="center">
      <b-col
        cols="6"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <b-form class="personal">
          <b-form-group
            v-for="(item,index) in person"
            :key="index"
            :label-for="'person'+index"
            :label="item.lable"
          >
            <b-form-input
              type="text"
              :value="item.value"
              :id="'person'+index"
              readonly
            ></b-form-input>
          </b-form-group>
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
      person: []
    }
  },
  components: {
    [bForm.name]: bForm
  },
  created() {
    let user = localStorage.getItem('user');
    base.post(api.memberProfile, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      // console.log(res);
      res.data.data.forEach(item => {
        if (item.value == '') {
          item.value = '暂无';
        }
      })
      this.person = res.data.data;
    }).catch((err) => {
      console.log(err);
    })
  },
}
</script>

<style lang="sass">
.personal
  margin-top: 30px
  color: #fff
// .b-form-group.form-group label
//   color:#0e6ac1!important
// input.form-control
//   background: none
//   border-bottom: 2px solid #172036
//   border: none
//   color: #81a8cd
// input.form-control[readonly]
//   background: none
//   border: none
//   border-bottom: 2px solid #172036
//   color: #81a8cd
// input.form-control[readonly]::webkit-input-placeholder
//   color:#81a8cd
// input.form-control[readonly]::moz-placeholder
//   color:#81a8cd
// input.form-control[readonly]:moz-placeholder
//   color:#81a8cd
// input.form-control[readonly]:ms-input-placeholder
//   color:#81a8cd
</style>