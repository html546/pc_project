<template>
  <div class="mb-5">
    <div
      v-for="(item,index) in OrderList"
      :key="index"
    >
      <b-table
        :items="item.goods_list"
        :fields="fields"
        :bordered="true"
        tbody-class="tbody"
        class="text-center"
        style="line-height:87px;background:#0a1222;"
      >
        <template
          slot="img"
          slot-scope="data"
        >
          <img
            :src="data.item.original_img"
            class="mr-1"
            style="width:87px;height:87px;"
            alt=""
          >
        </template>
        <template
          slot="goods_fee"
          slot-scope="data"
        >
          {{data.item.goods_num*data.item.goods_price}}
        </template>
        <template
          slot="order_status_desc"
          slot-scope="data"
        >
          <b-badge
            pill
            variant="success"
          >
            {{item.order_status_desc}}
          </b-badge>
        </template>
        <template
          slot="goods_time"
          slot-scope="data"
        >
          {{item.add_time | truetime}}
        </template>
        <template slot="table-caption">
          <p class="text-white">
            <span class="mr-2">订单号:{{item.order_sn}}</span>
            <b-button
              size="sm"
              class="mr-2"
              v-if="item.cancel_btn == 1"
              @click="cancel(item.order_id)"
            >取消</b-button>
            <!-- <b-button
              size="sm"
              class="mr-2"
              v-if="item.cancel_btn == 0"
            >已取消</b-button> -->
            <b-button
              size="sm"
              class="mr-2"
              @click="check(item.order_id)"
            >查看</b-button>
            <b-button
              size="sm"
              class="mr-2"
              v-if="item.pay_btn == 1"
              @click="pay(item.order_id)"
            >支付</b-button>
            <b-button
              size="sm"
              class="mr-2"
              v-if="item.receive_btn == 1"
              @click="order_confirm(item.order_id)"
            >收货</b-button>
          </p>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
import bTable from 'bootstrap-vue/es/components/table/table';
import bButton from 'bootstrap-vue/es/components/button/button';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
import bBadge from 'bootstrap-vue/es/components/badge/badge';
export default {
  name: '',
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'img',
          label: '商品图片'
        },
        {
          key: 'goods_name',
          label: '商品名称'
        },
        {
          key: 'goods_price',
          label: '价格'
        },
        {
          key: 'goods_num',
          label: '数量'
        },
        {
          key: 'goods_fee',
          label: '实际支付'
        },
        {
          key: 'order_status_desc',
          label: '状态'
        },
        {
          key: 'goods_time',
          label: '时间'
        }
      ],
      OrderList: []
    }
  },
  created() {
    this.getOrderList()
  },
  components: {
    [bTable.name]: bTable,
    [bButton.name]: bButton,
    [bBadge.name]: bBadge
  },
  methods: {
    getOrderList() {
      let user = localStorage.getItem('user');
      base.post(api.orderList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid
      }).then(res => {
        console.log(res);
        this.OrderList = res.data.data;
      }).catch(err => {
        console.log(err);
      })
    },
    cancel(id) {
      let user = localStorage.getItem('user');
      base.post(api.cancel_order, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        console.log(res);
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    pay(id) {
      this.$router.push(`/orderpay/${id}`);
    },
    check(id) {
      console.log(id);
      this.$router.push(`/orderdetail/${id}`);
    },
    order_confirm(id) {
      console.log(id);
      let user = localStorage.getItem('user');
      base.post(api.order_confirm, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        id: id
      }).then(res => {
        if (res.data.status == 1) {
          this.$swal({
            title: res.data.msg,
            type: 'success'
          }).then(res => {
            if (res.value) {
              this.getOrderList();
            }
          })
        } else {
          this.$swal({
            title: res.data.msg,
            type: 'info'
          })
        }
      })
    }
  },
  filters: {
    truetime(val) {
      return base.format(val * 1000);
    }
  }
}
</script>

<style lang="" scoped>
#num {
  width: 55px;
}
.allnum,
.allfee {
  color: #fff;
}
.btn-outline-warning {
  color: #ed8134;
  border-color: #ed8134;
}
.btn-outline-warning:hover,
.btn-outline-warning:not(:disabled):not(.disabled):active {
  color: #fff;
  background-color: #ed8134;
  border-color: #ed8134;
}
</style>