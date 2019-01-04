<template>
  <div>
    <div class="register1">
      <vue-loading
        type="spiningDubbles"
        color="#c3deff"
        :size="{width:'50px',height:'50px'}"
        v-if="loading"
      ></vue-loading>
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
            id="remit"
            v-show="formshow"
          >
            <div
              v-for="(item,index) in withdrawList"
              :key="index"
            >
              <b-form-group
                :label="item.label"
                v-if="item.is_show"
              >
                <b-form-select
                  v-if="item.label=='开户行'"
                  :options="options"
                  :name="item.filed"
                  v-model="bank_name"
                ></b-form-select>
                <b-form-input
                  :name="item.filed"
                  v-else
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group label="提现手续费">
              <b-form-input
                v-model="fax"
                readonly
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="钱包余额">
              <b-form-input
                v-model="balance"
                readonly
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="二级密码"
              v-if="password"
            >
              <b-form-input
                v-model="pass2"
                name="cashPass2"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group label="提现金额">
              <b-form-input v-model="money">
              </b-form-input>
            </b-form-group>
            <b-form-group
              label="图片验证码"
              v-if="cashcheckmess"
              label-for="qrcode"
            >
              <b-row>
                <b-col
                  cols="9"
                  sm="9"
                  md="9"
                  lg="9"
                  xl="9"
                >
                  <b-form-input
                    id="qrcode"
                    v-model="qrcode"
                    type="text"
                    placeholder="请输入图片验证码"
                  ></b-form-input>
                </b-col>
                <b-col
                  cols="3"
                  sm="3"
                  md="3"
                  lg="3"
                  xl="3"
                >
                  <b-img
                    :src="qrcodeSrc"
                    fluid
                    style="height:100%;"
                    @click="getVerifyCode"
                  ></b-img>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group
              label="短信验证码"
              v-if="cashcheckmess"
            >
              <b-row>
                <b-col
                  cols="9"
                  md="9"
                  sm="9"
                  lg="9"
                  xl="9"
                >
                  <b-form-input
                    placeholder="请输入短信验证码"
                    id="message"
                    v-model="message"
                    name="mobile_code"
                  ></b-form-input>
                </b-col>
                <b-col
                  cols="3"
                  md="3"
                  sm="3"
                  lg="3"
                  xl="3"
                >
                  <b-button
                    variant="primary"
                    size="sm"
                    type="button"
                    @click="getMobileCode"
                  >获取手机验证码</b-button>
                </b-col>
              </b-row>
            </b-form-group>
            <b-button
              type="submit"
              variant="primary"
            >提交</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
    <div class="register2">
      <vue-loading
        type="spiningDubbles"
        color="#c3deff"
        :size="{width:'50px',height:'50px'}"
        v-show="loading1"
      ></vue-loading>
      <div v-show="tableShow">
        <b-table
          :items="items"
          :fields="fields"
          thead-tr-class="thead_tr"
          class="text-center"
        >
          <template
            slot="actions"
            slot-scope="rows"
          >
            <b-button
              size="sm"
              @click="cancel(rows.item.id,rows.item.tixian_money)"
            >撤销</b-button>
          </template>
        </b-table>
      </div>
      <b-pagination-nav
        :number-of-pages="allPage"
        v-model="currentPage"
        align="center"
        class="announce_pagination"
        base-url="#/remit/withdraw/"
      ></b-pagination-nav>
    </div>
  </div>

</template>

<script>
import bForm from 'bootstrap-vue/es/components/form/form';
import bImg from 'bootstrap-vue/es/components/image/img';
import bButton from 'bootstrap-vue/es/components/button/button';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import bTable from 'bootstrap-vue/es/components/table/table';
import { VueLoading } from 'vue-loading-template';
import api from '../../api/api.js';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      withdrawList: null,
      options: [],
      fax: '',
      type: '',
      money: '',
      bank_name: '',
      sheet: '',
      balance: '',
      pass2: '',
      password: '',
      cashcheckmess: '',
      loading: false,
      formshow: false,
      qrcode: '',
      qrcodeSrc: '',
      message: '',
      encrypt_code: '',
      items: [],
      fields: [
        {
          key: 'oper_date',
          label: '时间'
        },
        {
          key: 'bank_name',
          label: '开户行'
        },
        {
          key: 'bank_number',
          label: '银行卡号'
        },
        {
          key: 'bank_username',
          label: '开户名'
        },
        {
          key: 'tixian_money',
          label: '提现额'
        },
        {
          key: 'real_hair',
          label: '实发'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      allPage: 1,
      currentPage: 1,
      loading1: false,
      tableShow: false
    }
  },
  components: {
    [bTable.name]: bTable,
    [bButton.name]: bButton,
    [bPaginationNav.name]: bPaginationNav,
    [bForm.name]: bForm,
    [bImg.name]: bImg,
    VueLoading
  },
  watch: {
    '$route'(to, from) {
      console.log(to);
      this.getList(to.params.id1);
    }
  },
  created() {
    this.loading = true;
    this.withdrawList = null;
    this.formshow = false;
    let user = localStorage.getItem('user');
    this.getList(1);
    base.post(api.withdraw, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid,
      type: 1
    }).then(res => {
      this.loading = false;
      console.log(res);
      this.formshow = true;
      this.withdrawList = res.data.datas.cashField;
      let bankcards = [];
      res.data.datas.bankcards.forEach(item => {
        bankcards.push({
          value: item.id,
          text: item.bank_names
        })
      })
      this.options = bankcards;
      this.fax = res.data.datas.tax + '%';
      this.type = res.data.datas.type;
      this.sheet = res.data.datas.financenode.sheet;
      this.password = res.data.datas.cashPass2 === "false" ? false : true;
      this.cashcheckmess = res.data.datas.cashcheckmess === "false" ? false : true
    }).catch(err => {
      console.log(err);
    });
    base.post(api.getUserWallet, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then(res => {
      // console.log(res);
      res.data.data.forEach(item => {
        if (item.sheet == this.sheet) {
          this.balance = item.balance;
        }
      })
    }).catch(err => {
      console.log(err);
    });
    this.getVerifyCode();
  },
  methods: {
    getVerifyCode() {
      let user = localStorage.getItem('user');
      base.post(api.getVerifyCode, {
        mobile: JSON.parse(user).mobile_phone
      }).then(res => {
        console.log(res);
        this.qrcodeSrc = res.data.image;
        this.encrypt_code = res.data.encryptCode;
      }).catch(err => {
        console.log(err);
      })
    },
    onSubmit(evt) {
      evt.preventDefault();
      let form = document.getElementById('remit');
      let formdata = new FormData(form);
      let user = localStorage.getItem('user');
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('type', this.type);
      formdata.append('tixian_money', this.money);
      formdata.append('mobile_phone', JSON.parse(user).mobile_phone);
      base.post(api.withdrawsave, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
          location.reload();
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
    getMobileCode() {
      let user = localStorage.getItem('user');
      console.log(JSON.parse(user).mobile_phone);
      base.post(api.verify, {
        verify_code: this.qrcode,
        encrypt_code: this.encrypt_code,
        mobile: JSON.parse(user).mobile_phone
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    getList(page) {
      this.loading1 = true;
      this.tableShow = false;
      this.items = [];
      let user = localStorage.getItem('user');
      base.post(api.withdrawList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        page: page,
        number: 5
      }).then(res => {
        // console.log(res);
        this.allPage = res.data.data.allPage;
        res.data.data.extracts.forEach(item => {
          item.oper_date = base.format1(item.oper_date * 1000);
          switch (item.state) {
            case 0:
              item.state = '未审核';
              break;
            case 1:
              item.state = '已拒绝'
              break;
            case 2:
              item.state = '已通过';
              break;
            case 3:
              item.state = '已撤销';
              break;
          }
        })
        this.items = res.data.data.extracts;
        this.tableShow = true;
        this.loading1 = false;
      }).catch(err => {
        console.log(err);
      })
    },
    cancel(id, money) {
      let user = localStorage.getItem('user');
      base.post(api.cancelwithdraw, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id,
        tixian_money: money
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            type: 'success',
            title: res.data.msg
          })
          location.reload();
        } else if (res.data.status == 0) {
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
    }
  }
}
</script>

<style lang="">
.register1 {
  color: #fff;
  margin-top: 30px;
}
.register2 {
  margin-top: 30px;
}

</style>