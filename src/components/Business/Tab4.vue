<template>
  <div v-if="checkPass">
    <b-row
      align-v="start"
      align-h="center"
      style="margin-top:30px"
    >
      <b-col
        cols="6"
        md="6"
        sm="6"
        lg="6"
        xl="6"
      >
        <div class="text-center">
          <b-button variant="primary">挂买</b-button>
        </div>
        <b-form
          @submit="onSubmit1"
          id="buyForm"
        >
          <b-form-group label="手续费">
            <b-form-input
              placeholder="手续费"
              v-model="tax"
              readonly
              name="tax"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="购买价格">
            <b-form-input
              placeholder="购买价格"
              v-model="price"
              name="price"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="购买数量">
            <b-form-input
              placeholder="购买数量"
              name="num"
              v-model="num"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="付款方式">
            <b-form-select
              v-model="paytype"
              :options="options"
              name="paytype"
            >
              <template slot="first">
                <option
                  :value="null"
                  disabled
                >请选择支付方式</option>
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group label="二级密码">
            <b-form-input
              placeholder="二级密码"
              name="pass2"
              v-model="pass2"
            ></b-form-input>
          </b-form-group>
          <b-button
            variant="primary"
            type="submit"
            :block="true"
          >提交</b-button>
        </b-form>
      </b-col>
      <b-col
        cols="6"
        md="6"
        sm="6"
        lg="6"
        xl="6"
      >
        <div class="text-center">
          <b-button variant="danger">挂卖</b-button>
        </div>
        <b-form
          @submit="onSubmit2"
          id="sellForm"
        >
          <b-form-group label="手续费">
            <b-form-input
              placeholder="手续费"
              v-model="tax"
              readonly
              name="tax"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="出售价格">
            <b-form-input
              placeholder="出售价格"
              v-model="price1"
              name="price"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="出售数量">
            <b-form-input
              placeholder="出售数量"
              v-model="num1"
              name="num"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="付款方式">
            <b-form-select
              :options="options"
              name="paytype"
              v-model="paytype1"
            >
              <template slot="first">
                <option
                  :value="null"
                  disabled
                >请选择支付方式</option>
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group label="二级密码">
            <b-form-input
              placeholder="二级密码"
              v-model="pass22"
              name="pass2"
            ></b-form-input>
          </b-form-group>
          <b-button
            variant="danger"
            type="submit"
            :block="true"
          >提交</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
      >
        <div class="text-center">
          <b-button
            variant="primary"
            class="my-3"
            :block="true"
          >我的挂买挂卖列表</b-button>
        </div>
        <vue-loading
          type="spiningDubbles"
          color="#c3deff"
          :size="{width:'50px',height:'50px'}"
          v-show="loading"
        ></vue-loading>
        <div v-show="tableShow">
          <b-table
            :items="items"
            :fields="fields"
            thead-tr-class="thead_tr"
            class="text-center"
          >
            <template
              slot="all"
              slot-scope="data"
            >
              {{data.item.oneprice*data.item.num}}
            </template>
            <template
              slot="actions"
              slot-scope="data"
            >
              <b-button
                size="sm"
                @click="cancel(data.item.id,data.index)"
              >撤销</b-button>
            </template>
          </b-table>
          <b-pagination-nav
            :number-of-pages="allPage"
            v-model="currentPage"
            align="center"
            class="announce_pagination"
            base-url="#/business/hangout/"
          ></b-pagination-nav>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import bButton from 'bootstrap-vue/es/components/button/button';
import bForm from 'bootstrap-vue/es/components/form/form';
import bTable from 'bootstrap-vue/es/components/table/table';
import * as base from '../../assets/js/base.js';
export default {
  name: '',
  data() {
    return {
      paytype: null,
      paytype1: null,
      options: [
        { value: 1, text: '支付宝' },
        { value: 2, text: '微信' },
        { value: 3, text: '银行汇款' }
      ],
      price: '',
      price1: '',
      num: '',
      num1: '',
      pass2: '',
      pass22: '',
      items: [],
      fields: [
        {
          key: 'username',
          label: '买家编号'
        },
        {
          key: 'num',
          label: '交易数量'
        },
        {
          key: 'oneprice',
          label: '单价'
        },
        {
          key: 'all',
          label: '总额'
        },
        {
          key: 'state',
          label: '状态'
        },
        {
          key: 'memo',
          label: '凭据'
        },
        {
          key: 'tradetype',
          label: '交易方式'
        },
        {
          key: 'actions',
          label: '操作'
        }
      ],
      allPage: 1,
      currentPage: 1,
      loading: false,
      tableShow: false,
      tax: '',
      checkPass: true
    }
  },
  components: {
    [bButton.name]: bButton,
    [bForm.name]: bForm,
    [bTable.name]: bTable,
    VueLoading
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
        // vm.getList(1);
        vm.checkPass = true;
      })
    }
  },
  created() {
    this.getList(1);
    this.getFee();
  },
  watch: {
    '$route'(to, from) {
      this.getList(to.params.id1);
    }
  },
  methods: {
    getCheckPass() {
      this.checkPass = true;
    },
    getFee() {
      let user = localStorage.getItem('user');
      base.post(api.getFee, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid
      }).then(res => {
        console.log(res);
        this.tax = res.data.data.tax;
      }).catch(err => {
        console.log(err);
      })
    },
    getList(page) {
      this.loading = true;
      this.tableShow = false;
      let user = localStorage.getItem('user');
      base.post(api.tradeinfo, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        page: page,
        number: 5
      }).then(res => {
        this.allPage = res.data.data.allPage;
        res.data.data.trades.forEach(item => {
          switch (item.state) {
            case 0:
              item.state = '未支付';
              break;
            case 1:
              item.state = '已支付';
              break;
            case 2:
              item.state = '已完成';
              break;
            case 3:
              item.state = '已撤销';
              break;
            case 4:
              item.state = '仲裁中';
              break;
            case 5:
              item.state = '仲裁卖家';
              break;
            case 6:
              item.state = '仲裁买家';
              break;
            default:
              break;
          }
          switch (item.tradetype) {
            case 1:
              item.tradetype = '挂卖'
              break;
            case 2:
              item.tradetype = '挂买'
            default:
              break;
          }
        })
        this.items = res.data.data.trades;
        this.tableShow = true;
        this.loading = false;
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    cancel(id, index) {
      let user = localStorage.getItem('user');
      base.post(api.canceltrade, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        type: 1,
        id: id
      }).then(res => {
        console.log(res);
        if (res.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          })
          this.items.splice(index, 1);
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
        this.$swal({
          title: err,
          type: 'error'
        })
      })
    },
    onSubmit1(evt) {
      evt.preventDefault();
      var vm = this;
      let user = localStorage.getItem('user');
      var buyForm = document.getElementById('buyForm');
      var formdata = new FormData(buyForm);
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('tradetype', 2);
      base.post(api.start, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              vm.price = '';
              vm.num = '';
              vm.paytype = null;
              vm.pass2 = '';
              this.getList(1);
            }
          })
        } else if (res.data.status == 0) {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        this.$swal({
          title: err,
          type: 'error'
        })
      });
    },
    onSubmit2(evt) {
      evt.preventDefault();
      var vm = this;
      let user = localStorage.getItem('user');
      var buyForm = document.getElementById('sellForm');
      var formdata = new FormData(buyForm);
      formdata.append('userid', JSON.parse(user).id);
      formdata.append('sessionid', JSON.parse(user).sessionid);
      formdata.append('tradetype', 1);
      base.post(api.start, formdata).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              vm.price1 = '';
              vm.num1 = '';
              vm.paytype1 = null;
              vm.pass22 = '';
              this.getList(1);
            }
          })
        } else if (res.data.status == 0) {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        this.$swal({
          title: err,
          type: 'error'
        })
      });
    }
  }
}
</script>

<style lang="" scoped>
</style>