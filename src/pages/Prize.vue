<template>
  <div class="announce">
    <Header />
    <div class="announce_content">
      <div>
        <b-container>
          <b-row align-h="center">
            <b-col
              sm="12"
              md="12"
              cols="12"
              xl="12"
              lg="12"
              align-self="center"
              class="announce_panel"
            >
              <b-row aligh-h="center">
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='sales'?'warning':'outline-success'"
                    @click="routeChange('sales')"
                  >销售奖金表</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='remit'?'warning':'outline-success'"
                    @click="routeChange('remit')"
                  >汇款通知</b-button>
                </b-col>
                <b-col class="text-center">
                  <b-button
                    :variant="ActiveId=='addremit'?'warning':'outline-success'"
                    @click="routeChange('addremit')"
                  >添加汇款通知</b-button>
                </b-col>
                <b-col
                  class="text-center"
                  v-for="(item,index) in others"
                  :key="index"
                >
                  <b-button
                    :variant="ActiveId==item.sheet?'warning':'outline-success'"
                    @click="routeChange(item.sheet)"
                  >{{item.name}}信息</b-button>
                </b-col>
              </b-row>
              <Tab1 v-show="ActiveId == 'sales'" />
              <Tab2 v-show="ActiveId == 'remit'" />
              <Tab3 v-show="ActiveId == 'addremit'" />
              <div
                v-for="(item) in others"
                :key="item.name"
              >
                <Tab4 v-show="ActiveId == activeOther" />
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <Footer1 />
  </div>
</template>

<script>
import '../assets/sass/announce.sass';
import '../assets/sass/login.sass';
import Header from '../components/Header';
import Footer1 from '../components/Footer1';
import bButton from 'bootstrap-vue/es/components/button/button';
import Tab1 from '../components/Prize/Tab1';
import Tab2 from '../components/Prize/Tab2';
import Tab3 from '../components/Prize/Tab3';
import Tab4 from '../components/Prize/Tab4';
import api from '../api/api.js';
export default {
  name: '',
  data() {
    return {
      ActiveId: 'sales',
      others: [],
      activeOther: ''
    }
  },
  created() {
    // console.log(this.$route.params.id);
    var user = localStorage.getItem('user');
    this.$http.post(this.HOST + api.welfareNode, {
      userid: JSON.parse(user).id,
      sessionid: JSON.parse(user).sessionid
    }).then((res) => {
      console.log(res.data.data);
      this.others = res.data.data;
    }).catch((err) => {
      console.log(err);
    })
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.params.id1);
    this.ActiveId = to.params.id;
    next();
  },
  beforeRouteEnter(to, from, next) {
    // this.ActiveId = to.params.id;
    next(vm => {
      vm.ActiveId = to.params.id;
    });
  },
  filters: {

  },
  components: {
    Header,
    Footer1,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    [bButton.name]: bButton,
  },
  methods: {
    routeChange(index) {
      this.$router.replace(`/prize/${index}`);
      if(index!='sales'&&index!='remit'&&index!='addremit'){
        this.activeOther = index;
      }
    }
  }
}
</script>

<style lang="" scoped>
.btn-warning {
  background-color: #ed8134;
  border-color: #ed8134;
  color: #fff;
  border-radius: 15px;
}
.btn-outline-success {
  border-radius: 15px;
}
</style>