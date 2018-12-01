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
                <b-col
                  sm="3"
                  md="3"
                  cols="3"
                  xl="3"
                  lg="3"
                >
                  <b-button
                    :variant="ActiveId==1?'warning':'outline-success'"
                    @click="routeChange(1)"
                  >销售奖金表</b-button>
                </b-col>
                <b-col
                  sm="3"
                  md="3"
                  cols="3"
                  xl="3"
                  lg="3"
                >
                  <b-button
                    :variant="ActiveId==2?'warning':'outline-success'"
                    @click="routeChange(2)"
                  >汇款通知</b-button>
                </b-col>
                <b-col
                  sm="3"
                  md="3"
                  cols="3"
                  xl="3"
                  lg="3"
                >
                  <b-button
                    :variant="ActiveId==3?'warning':'outline-success'"
                    @click="routeChange(3)"
                  >添加汇款通知</b-button>
                </b-col>
                <b-col
                  sm="3"
                  md="3"
                  cols="3"
                  xl="3"
                  lg="3"
                >
                  <b-button
                    :variant="ActiveId==4?'warning':'outline-success'"
                    @click="routeChange(4)"
                  >旅游奖信息</b-button>
                </b-col>
              </b-row>
              <b-table></b-table>
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
import bTable from 'bootstrap-vue/es/components/table/table';
export default {
  name: '',
  data() {
    return {
      ActiveId: 1
    }
  },
  created() {
    console.log(this.$route.params.id);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.id);
    this.ActiveId = to.params.id;
    next();
  },
  filters: {

  },
  components: {
    Header,
    Footer1,
    [bButton.name]: bButton,
    [bTable.name]:bTable
  },
  methods: {
    routeChange(index){
      this.$router.replace(`/prize/${index}`);
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