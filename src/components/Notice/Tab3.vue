<template>
  <div class="send">
    <b-form
      id="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <b-form-group
        label="发送给"
        label-for="sendto"
      >
        <b-form-select
          id="sendto"
          :options="options"
          v-model="sender"
        ></b-form-select>
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
import bForm from 'bootstrap-vue/es/components/form/form';
import bButton from 'bootstrap-vue/es/components/button/button';
import { VueEditor } from 'vue2-editor';
export default {
  name: '',
  data() {
    return {
      options: [],
      sender: '',
      subject: '',
      content: ''
    }
  },
  components: {
    [bForm.name]: bForm,
    [bButton.name]: bButton,
    VueEditor
  },
  created() {
    let user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.send, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      // console.log(res);
      res.data.data.forEach(item => {
        item.text = item.user_name;
        item.value = item.admin_id;
      })
      this.options = res.data.data;
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let user = localStorage.getItem('user');
      this.$http.post(this.HOST + api.savesend, {
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