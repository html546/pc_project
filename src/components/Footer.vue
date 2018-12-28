<template>
  <div class="footer">
    <b-container fluid>
      <b-row>
        <b-col
          sm="6"
          md="6"
          cols="6"
          lg="6"
          xl="6"
        >
          <div class="footer_left">
            <img
              src="../assets/images/footer_logo.png"
              alt=""
            >
            <div class="footer_left_center">
              <img
                src="../assets/images/smlogo1.png"
                alt=""
              >
              <img
                src="../assets/images/smlogo2.png"
                alt=""
              >
              <img
                src="../assets/images/smlogo3.png"
                alt=""
              >
            </div>
            <p>Copyright &copy; 2018 DF.COM All Rights Reserved</p>
          </div>
        </b-col>
        <b-col
          sm="6"
          md="6"
          cols="6"
          lg="6"
          xl="6"
        >
          <b-row
            align-h="end"
            class="footer_right"
          >
            <b-col
              sm="2"
              md="2"
              cols="2"
              lg="2"
              xl="2"
            >
              <div>
                <h6>会员资料</h6>
                <p>
                  <b-link
                    router-tag="a"
                    to="/person/personal"
                  >个人资料</b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/person/datum"
                  >资料管理</b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/person/loginPass"
                  >登录密码管理</b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/person/payPass"
                  >支付密码管理</b-link>
                </p>
              </div>
            </b-col>
            <b-col
              sm="2"
              md="2"
              cols="2"
              lg="2"
              xl="2"
            >
              <div>
                <h6>公司留言</h6>
                <p>
                  <b-link
                    router-tag="a"
                    to="/notice/index"
                  >
                    邮件列表
                  </b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/notice/outbox"
                  >
                    发件箱
                  </b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/notice/send"
                  >管理员邮件</b-link>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/notice/membersend"
                  >会员邮件互发</b-link>
                </p>
              </div>
            </b-col>
            <b-col
              sm="2"
              md="2"
              cols="2"
              lg="2"
              xl="2"
            >
              <div>
                <h6>关于我们</h6>
                <p>
                  <a href="javascript:;">法律声明</a>
                </p>
                <p>
                  <a href="javascript:;">隐私条款</a>
                </p>
              </div>
            </b-col>
            <b-col
              sm="2"
              md="2"
              cols="2"
              lg="2"
              xl="2"
            >
              <div>
                <h6>帮助</h6>
                <p>
                  <a href="javascript:;">支持中心</a>
                </p>
                <p>
                  <b-link
                    router-tag="a"
                    to="/announce"
                  >公告</b-link>
                </p>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import bLink from 'bootstrap-vue/es/components/link/link';
export default {
  name: '',
  data() {
    return {

    }
  },
  components: {
    [bLink.name]: bLink
  }
}
</script>

<style lang="" scoped>
.footer_left .footer_left_center img {
  cursor: pointer;
  transition: all 2s;
}
.footer_left img:hover {
  transform: rotate3d(0, 0, 1, 360deg);
  -ms-transform: rotate3d(0, 0, 1, 360deg);
  -moz-transform: rotate3d(0, 0, 1, 360deg);
  -webkit-transform: rotate3d(0, 0, 1, 360deg);
  -o-transform: rotate3d(0, 0, 1, 360deg);
}
</style>