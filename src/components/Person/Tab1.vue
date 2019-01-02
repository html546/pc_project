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
          v-if="checkPass"
        >
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
      person: [],
      checkPass: true
    }
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
  methods: {
    getCheckPass() {
      this.checkPass = true;
    }
  },
}
</script>

<style lang="sass">
.person
  margin-top: 30px
</style>