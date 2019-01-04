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
          @reset="onReset"
          v-if="checkPass"
        >
          <b-form-group
            label="原密码"
            label-for="oldpass2"
          >
            <b-form-input
              placeholder="输入原密码"
              id="oldpass2"
              type="password"
              required
              v-model="oldpass2"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="安全(支付)新密码"
            label-for="pass2"
          >
            <b-form-input
              placeholder="输入安全(支付)新密码"
              id="pass2"
              type="password"
              required
              v-model="pass2"
              :state="passState"
              aria-describedby="inputLiveFeedback"
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">
              至少6位
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            label="确认安全(支付)新密码"
            label-for="pass2c"
          >
            <b-form-input
              placeholder="确认安全(支付)新密码"
              id="pass2c"
              type="password"
              required
              v-model="pass2c"
            ></b-form-input>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            :disabled="passtype"
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
      oldpass2: '',
      pass2: '',
      pass2c: '',
      checkPass: true
    }
  },
  computed: {
    passState() {
      return this.pass2.length >= 6 ? true : false;
    },
    passtype() {
      return this.pass2.length >= 6 ? false : true;
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

  },
  methods: {
    getCheckPass() {
      this.checkPass = true;
    },
    onSubmit(evt) {
      let user = localStorage.getItem('user');
      evt.preventDefault();
      base.post(api.savepassword2, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        oldpass: this.oldpass2,
        pass2: this.pass2,
        pass2c: this.pass2c
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          }).then(res => {
            if (res.value) {
              this.onReset();
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
          title: res.data.msg
        })
      })
    },
    onReset(evt) {
      this.oldpass2 = '';
      this.pass2 = '';
      this.pass2c = '';
    }
  }
}
</script>

<style lang="" scoped>
.personal {
  margin-top: 30px;
  color: #fff;
}
</style>