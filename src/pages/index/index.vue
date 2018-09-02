<template>
  <div class="container">
     <div class="header">
        <Tabs :tabs="tabs" :activeIndex.sync="activeIndex" :tabW="tabW"></Tabs>
         <div class="tabItem search"><img src="/static/images/index/no-search.png" alt="搜索" @click="goSearch"></div>
       </div> 
      <swiper :current="activeIndex" class="swiperBox" @change="bindChange">
        <swiper-item class="swiperItem" >
          <talkList />
          <talkList />
          <talkList />
          <talkList />
          <talkList />
        </swiper-item>
        <swiper-item class="swiperItem">
          <talkList />
        </swiper-item>
        <swiper-item class="swiperItem">
          <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList>
        </swiper-item>
      </swiper>     
  </div>
</template>

<script>
var qcloud = require("./../../wafer2/index.js");
var http = require("../../utils/http.js");
var auth = require("../../utils/auth.js");
import talkList from "../../components/talkList";
import taskList from "../../components/taskList";
import Tabs from "../../components/tabs";
// import tabMenu from "../../components/tabMenu";
export default {
  onReachBottom() {
    console.log("到底了");
    http({
      api: "/say",
      method: "GET",
      data: { page: 1 },
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  mounted() {
    auth();
  },
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      tabs: ["首页", "热门", "任务"],
      activeIndex: 0,
      tabW: 187.5,
      openRel: false
    };
  },
  components: {
    talkList,
    taskList,
    Tabs
  },

  methods: {
    bindChange(e) {
      var current = e.target.current;
      // if ((current + 1) % 4 == 0) {
      // }
      // console.log(this.activeIndex)
      this.activeIndex = current;
    },
    goSearch() {
      wx.navigateTo({ url: "../search/main" });
    },
    goDetail() {
      wx.navigateTo({ url: "../detail/main" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  overflow: auto;
  .header {
    width: 100%;
    position: fixed;
    box-sizing: border-box;
    white-space: nowrap;
    z-index: 100;
    background: white;
    height: 80rpx;
    .search {
      position: absolute;
      right: 100rpx;
      top: 20rpx;
      width: 40rpx;
      height: 40rpx;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiperBox {
    height: 1040rpx;
    margin-top: 80rpx;
    .swiperItem {
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
      overflow: scroll;
      text-align: center;
      height: 100%;
    }
  }
}
</style>

