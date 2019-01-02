<template>
  <div class="send">
    <b-form
      id="form"
      @submit="onSubmit"
      @reset="onReset"
      v-if="checkPass"
    >
      <b-form-group
        label="发送给"
        label-for="sendto"
      >
        <b-form-input
          id="sendto"
          v-model="sender"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="主题"
        label-for="subject"
      >
        <b-form-input
          id="subject"
          type="text"
          v-model="subject"
          placeholder="请输入主题"
        ></b-form-input>
      </b-form-group>
      <vue-editor
        v-model="content"
        style="background:#fff;"
      ></vue-editor>
      <b-button
        variant="danger"
        type="reset"
        class="float-right mt-2"
      >撤销</b-button>
      <b-button
        variant="primary"
        type="submit"
        class="float-right mt-2 mr-3"
      >提交</b-button>
    </b-form>
  </div>
</template>

<script>
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
import bForm from 'bootstrap-vue/es/components/form/form';
import bButton from 'bootstrap-vue/es/components/button/button';
import { VueEditor } from 'vue2-editor';
export default {
  name: '',
  data() {
    return {
      sender: '',
      subject: '',
      content: '',
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
    [bForm.name]: bForm,
    [bButton.name]: bButton,
    VueEditor
  },
  created() {

  },
  methods: {
    getCheckPass() {
      this.checkPass = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      let user = localStorage.getItem('user');
      base.post(api.membersend, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        addressee: this.sender,
        title: this.subject,
        content: this.content
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
          this.sender = '';
          this.subject = '';
          this.content = '';
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
    onReset(evt) {
      evt.preventDefault();
      this.sender = '';
      this.subject = '';
      this.content = '';
    }
  }
}
</script>

<style lang="sass">
label
  color:#fff

</style>