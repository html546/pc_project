<template>
  <div class="tabs_change">
    <div class="img_content text-center clearfix">
      <div class="banner">
        <img
          class="img-fluid"
          src="../../assets/images/message_coin.aefb927.png"
          alt=""
        >
        <div
          class="text_content"
          v-show="!img1"
        >
          <p>顶级技术</p>
          <p>国际顶尖团队自助研发撮合系统,能够每秒处理200万笔交易;金融级别的速度和稳定,交易高效有保障.</p>
        </div>
        <div
          class="text_content"
          v-show="!img2"
        >
          <p>公开透明</p>
          <p>将用户交易数据打包上区块链,做到交易数据透明,面向公众公开,构建平台与用户之间的信任机制。</p>
        </div>
        <div
          class="text_content"
          v-show="!img3"
        >
          <p>自治生态</p>
          <p>DFEX是一个所有DF持有者共有、共治、共享的社区型组织.</p>
        </div>
        <div
          class="text_content"
          v-show="!img4"
        >
          <p>安全</p>
          <p>安全防护体系,防注入、防渗透、防CC、防DDOS、多维度:分层防护,严格保护用户资金安全.</p>
        </div>
        <div
          class="text_content"
          v-show="!img5"
        >
          <p>公正</p>
          <p>充分尊重金融市场的交易规范,建立公正公平的交易机制,保障交易者的合法权益.</p>
        </div>
        <div
          class="text_content"
          v-show="!img6"
        >
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
              v-show="img1"
              @click="toggleImg1"
            >
              <div class="img_item1">
                <img
                  src="../../assets/images/1.png"
                  class="img-fluid"
                  alt=""
                >
                <p>先进技术</p>
              </div>
            </div>
            <div
              class="img_group img_group11"
              v-show="!img1"
            >
              <div class="img_item1">
                <img
                  src="../../assets/images/11.png"
                  class="img-fluid"
                  alt=""
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
            <div
              class="img_group img_group6"
              v-show="img6"
              @click="toggleImg6"
            >
              <div class="img_item6">
                <img
                  src="../../assets/images/6.png"
                  class="img-fluid"
                  alt=""
                >
                <p>精英团队</p>
              </div>
            </div>
            <div
              class="img_group img_group66"
              v-show="!img6"
            >
              <div class="img_item6">
                <img
                  src="../../assets/images/66.png"
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
            <div
              class="img_group img_group2"
              v-show="img2"
              @click="toggleImg2"
            >
              <div class="img_item2">
                <img
                  src="../../assets/images/2.png"
                  class="img-fluid"
                  alt=""
                >
                <p>公开透明</p>
              </div>
            </div>
            <div
              class="img_group img_group22"
              v-show="!img2"
            >
              <div class="img_item2">
                <img
                  src="../../assets/images/22.png"
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
            <div
              class="img_group img_group5"
              v-show="img5"
              @click="toggleImg5"
            >
              <div class="img_item5">
                <img
                  src="../../assets/images/5.png"
                  class="img-fluid"
                  alt=""
                >
                <p>自治生态</p>
              </div>
            </div>
            <div
              class="img_group img_group55"
              v-show="!img5"
            >
              <div class="img_item5">
                <img
                  src="../../assets/images/55.png"
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
            <div
              class="img_group img_group3"
              v-show="img3"
              @click="toggleImg3"
            >
              <div class="img_item3">
                <img
                  src="../../assets/images/3.png"
                  class="img-fluid"
                  alt=""
                >
                <p>自治生态</p>
              </div>
            </div>
            <div
              class="img_group img_group33"
              v-show="!img3"
            >
              <div class="img_item3">
                <img
                  src="../../assets/images/33.png"
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
            <div
              class="img_group img_group4"
              v-show="img4"
              @click="toggleImg4"
            >
              <div class="img_item4">
                <img
                  src="../../assets/images/4.png"
                  class="img-fluid"
                  alt=""
                >
                <p>安全可靠</p>
              </div>
            </div>
            <div
              class="img_group img_group44"
              v-show="!img4"
            >
              <div class="img_item4">
                <img
                  src="../../assets/images/44.png"
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
      img1: false,
      img2: true,
      img3: true,
      img4: true,
      img5: true,
      img6: true
    }
  },
  methods: {
    toggleImg1() {
      if (this.img1 == true) {
        this.img1 = false;
        this.img2 = true;
        this.img3 = true;
        this.img4 = true;
        this.img5 = true;
        this.img6 = true;
      }
    },
    toggleImg2() {
      if (this.img2 == true) {
        this.img2 = false;
        this.img1 = true;
        this.img3 = true;
        this.img4 = true;
        this.img5 = true;
        this.img6 = true;
      }
    },
    toggleImg3() {
      if (this.img3 == true) {
        this.img3 = false;
        this.img1 = true;
        this.img2 = true;
        this.img4 = true;
        this.img5 = true;
        this.img6 = true;
      }
    },
    toggleImg4() {
      if (this.img4 == true) {
        this.img4 = false;
        this.img1 = true;
        this.img2 = true;
        this.img3 = true;
        this.img5 = true;
        this.img6 = true;
      }
    },
    toggleImg5() {
      if (this.img5 == true) {
        this.img5 = false;
        this.img1 = true;
        this.img2 = true;
        this.img3 = true;
        this.img4 = true;
        this.img6 = true;
      }
    },
    toggleImg6() {
      if (this.img6 == true) {
        this.img6 = false;
        this.img1 = true;
        this.img2 = true;
        this.img3 = true;
        this.img4 = true;
        this.img5 = true;
      }
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
  height: 45rem;
  padding: 1px;
}
.img_content .banner img {
  width: 42.5rem;
  height: auto;
}
.img_content .banner {
  width: 42.5rem;
  height: auto;
  margin: 5.5vh auto 0;
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
  width: 100%;
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
.img_group11 img + p,
.img_group22 img + p,
.img_group33 img + p,
.img_group44 img + p,
.img_group55 img + p,
.img_group66 img + p {
  color: rgb(237, 129, 52);
}
</style>