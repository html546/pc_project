<template>
  <div>
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

<style lang="" scoped>
.personal {
  margin-top: 30px;
  color: #fff;
}
</style>