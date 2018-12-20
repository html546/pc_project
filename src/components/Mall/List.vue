<template>
  <b-row
    align-v="center"
    align-h="center"
  >
    <b-col
      cols="12"
      md="12"
      sm="12"
      lg="12"
      xl="12"
    >
      <b-card
        header="产品筛选"
        header-class="header"
        body-class="body"
        border-variant="dark"
        text-variant="white"
      >
        <p class="card-text">
          分类
          <template>
            <b-link
              href="#"
              class="card-link mx-2"
              v-for="(item,index) in cates"
              :key="index"
              @click="getnext(item.id,1)"
            >{{item.name}}</b-link>
          </template>
        </p>
        <p
          class="card-text"
          v-show="cates1"
        >
          二级分类
          <template>
            <b-link
              href="#"
              class="card-link mx-2"
              v-for="(item,index) in cates1"
              :key="index"
              @click="getnext2(item.id,2)"
            >
              {{item.name}}
            </b-link>
          </template>
        </p>
        <p
          class="card-text"
          v-show="cates2"
        >
          三级分类
          <template>
            <b-link
              href="#"
              class="card-link mx-2"
              v-for="(item,index) in cates2"
              :key="index"
            >
              {{item.name}}
            </b-link>
          </template>
        </p>
        <p class="card-text">
          品牌
          <template>
            <b-link
              href="#"
              class="card-link mx-2"
              v-for="(item,index) in brands"
              :key="index"
              @click="getBrandList(item.id)"
            >
              {{item.name}}
            </b-link>
          </template>
        </p>
      </b-card>
      <b-row>
        <b-col
          v-for="(item,index) in goodsList"
          :key="index"
          cols="3"
          md="3"
          sm="3"
          lg="3"
          xl="3"
        >
          <b-card
            class="card my-2"
            :img-src="item.original_img"
            :img-top="true"
            img-alt="商品图片"
            img-class="img"
            border-variant="dark"
            body-class="body1"
            @click="getGoodsInfo(item.goods_id)"
          >
            <p class="card-text">
              {{item.goods_name}}
            </p>
            <p class="card-text clearfix">
              <span class="float-left price">￥{{item.shop_price}}</span>
              <span class="float-right">剩余{{item.store_count}}件</span>
            </p>
          </b-card>
        </b-col>
      </b-row>
      <b-pagination-nav
        :number-of-pages="allPage"
        v-model="currentPage"
        align="center"
        class="announce_pagination"
        base-url="#/mall/list/"
      ></b-pagination-nav>
    </b-col>
  </b-row>
</template>

<script>
import api from '../../api/api.js';
import { VueLoading } from 'vue-loading-template';
import * as base from '../../assets/js/base.js';
import bCard from 'bootstrap-vue/es/components/card/card';
import bPaginationNav from 'bootstrap-vue/es/components/pagination-nav/pagination-nav';
export default {
  name: '',
  data() {
    return {
      cates: [],
      cates1: '',
      cates2: '',
      brands: [],
      goodsList: [],
      allPage: 1,
      currentPage: 1,
      category: '',
      brand: ''
    }
  },
  created() {
    this.get_category();
    this.getBrands();
    this.getGoodList('', '', 1);
  },
  components: {
    [bCard.name]: bCard,
    [bPaginationNav.name]: bPaginationNav,
  },
  watch: {
    '$route'(to, from) {
      if (this.category) {
        this.getGoodList(this.category, '', to.params.id1);
      } else if (this.brand) {
        this.getGoodList('', this.brand, to.params.id1);
      } else {
        this.getGoodList('', '', to.params.id1);
      }
    }
  },
  methods: {
    getBrands() {
      let user = localStorage.getItem('user');
      base.post(api.brands, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid
      }).then(res => {
        console.log(res);
        this.brands = res.data.data.brands;
      }).catch(err => {
        console.log(err);
      })
    },
    get_category(gc_id, nth) {
      let user = localStorage.getItem('user');
      base.post(api.get_category, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        gc_id: gc_id
      }).then(res => {
        console.log(res);
        if (gc_id && nth == 1) {
          if (res.data.data.cates.length === 0) {
            this.cates1 = '';
          } else {
            this.cates1 = res.data.data.cates;
          }
        } else if (gc_id && nth == 2) {
          if (res.data.data.cates.length === 0) {
            this.cates2 = '';
          } else {
            this.cates2 = res.data.data.cates;
          }
        } else {
          this.cates = res.data.data.cates;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getnext(id, nth) {
      this.category = id;
      this.get_category(id, nth);
      this.getGoodList(id, '', 1);
    },
    getnext2(id, nth) {
      this.category = id;
      this.getGoodList(id, '', 1);
      this.get_category(id, nth);
    },
    getGoodList(cat_id, brand_id, page) {
      let user = localStorage.getItem('user');
      base.post(api.goodsList, {
        userid: JSON.parse(user).id,
        sessionid: JSON.parse(user).sessionid,
        cat_id: cat_id,
        brand_id: brand_id,
        p: page,
        number: 6
      }).then(res => {
        console.log(res);
        this.goodsList = res.data.data.goods_list;
      }).catch(err => {
        console.log(err);
      })
    },
    getBrandList(id) {
      this.getGoodList('', id, 1);
      this.brand = id;
    },
    getGoodsInfo(id) {
      this.$router.push(`/goodsinfo/${id}`);
    }
  }
}
</script>

<style lang="" scoped>
.header {
  color: #01a287;
  background: #0a1222;
  border: none;
  border-bottom: 1px solid #333;
}
.body {
  background: #0a1222;
  border: none;
}
.body1 {
  padding: 0.5rem 1rem;
}
.card {
  background: none;
  color: #c8ddfd;
}
.card:hover {
  cursor: pointer;
}
.card img {
  width: 100%;
  height: 210px;
  padding: 10px;
}
.card .price {
  color: #ff3535;
}
.card .card-text {
  margin-bottom: 0.1rem;
}
.card .card-text:first-child {
  font-size: 16px;
}
.card .card-text:nth-child(2) span {
  font-size: 14px;
}
</style>