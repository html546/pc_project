<template>
  <div class="tabs_change">
    <div class="img_content text-center clearfix">
      <div class="banner">
        <img
          class="img-fluid"
          src="../assets/images/message_coin.aefb927.png"
          alt=""
        >
        <div class="text_content">
          <p>精英团队</p>
          <p>专业开发团队自主研发系统。专业产品设计团队打造产品细节,交易操作便捷,追求极致用户体验.</p>
        </div>
      </div>
      <b-container
        class="container1"
        fluid
      >
        <b-row
          align-h="between"
          class="row1"
        >
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div
              class="img_group img_group1"
              @click="img1 = !img1"
            >
              <div class="img_item1">
                <img
                  src="../assets/images/1.png"
                  class="img-fluid"
                  alt=""
                  v-show="img1"
                >
                <img
                  src="../assets/images/11.png"
                  class="img-fluid"
                  alt=""
                  v-show="!img1"
                >
                <p>先进技术</p>
              </div>
            </div>
          </b-col>
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div class="img_group img_group6">
              <div class="img_item6">
                <img
                  src="../assets/images/6.png"
                  class="img-fluid"
                  alt=""
                >
                <p>精英团队</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="around">
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div class="img_group img_group2">
              <div class="img_item2">
                <img
                  src="../assets/images/2.png"
                  class="img-fluid"
                  alt=""
                >
                <p>公开透明</p>
              </div>
            </div>
          </b-col>
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div class="img_group img_group5">
              <div class="img_item5">
                <img
                  src="../assets/images/5.png"
                  class="img-fluid"
                  alt=""
                >
                <p>自治生态</p>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row align-h="center">
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div class="img_group img_group3">
              <div class="img_item3">
                <img
                  src="../assets/images/3.png"
                  class="img-fluid"
                  alt=""
                >
                <p>自治生态</p>
              </div>
            </div>
          </b-col>
          <b-col
            sm="2"
            md="2"
            cols="2"
            lg="2"
            xl="2"
          >
            <div class="img_group img_group4">
              <div class="img_item4">
                <img
                  src="../assets/images/4.png"
                  class="img-fluid"
                  alt=""
                >
                <p>安全可靠</p>
              </div>
            </div>
          </b-col>

        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      img1: true
    }
  }
}
</script>

<style lang="" scoped>
.tabs_change {
  background-color: #010b1e;
}
.img_content {
  position: relative;
  /* padding-bottom: 25.5vh; */
  height: 45rem;
  padding: 1px;
  /* overflow: hidden; */
}
.img_content .banner img {
  width: 42.5rem;
  height: auto;
}
.img_content .banner {
  width: 42.5rem;
  height: auto;
  /* background: rgba(255, 255, 255, 0.12); */
  margin: 5.5vh auto 0;
  /* position: absolute;
  left: 50%;
  margin-left: -50%; */
  position: relative;
}
.img_content .banner .text_content {
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #00b494;
  background: #010b1e;
  opacity: 0.7;
  padding: 40px 0;
  font-size: 20px;
}

.img_content .container1 {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
}
.row1 {
  margin-top: 10rem;
}
.img_group {
  z-index: 1000;
  cursor: pointer;
}

.img_group img {
  width: 140px;
}
.img_group img + p {
  color: #00b494;
  font-size: 16px;
}

/* .img_group1,
.img_group6 {
  margin-top: 18.2vh;
}
.img_group2,
.img_group5 {
  margin-top: 33.2vh;
}
.img_group3,
.img_group4 {
  margin-top: 50.6vh;
} */
</style>