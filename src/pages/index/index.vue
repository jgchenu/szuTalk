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

      <div class="rel">
           <div class="relButton" :style="{transform:'rotate('+(openRel?45:0)+'deg) scale('+(openRel?1:.6)+')',opacity:(openRel?1:.6)}" @click="()=>{this.openRel=!this.openRel}">
             <img src="/static/images/bottom/release.png" alt="">
           </div>
           <div class="buttons" :style="{transform:'translate(0,'+(openRel?0:100)+'px) scale('+(openRel?1:0)+')',opacity:(openRel?1:0)}">
              <div class="relTalk" @click="relTalk"><img src="/static/images/bottom/talk.png" alt=""><div class="talkText">说说</div></div>
              <div class="relTask" @click="relTask"><img src="/static/images/bottom/task.png" alt=""><div class="taskText">任务</div></div>
           </div>
       </div>  
  </div>
</template>

<script>
var qcloud = require("./../../wafer2/index.js");
var config = require("./../../config.js");
var auth = require("../../utils/auth.js");
import talkList from "../../components/talkList";
import taskList from "../../components/taskList";
import Tabs from "../../components/tabs";
export default {
  onReachBottom(){
    console.log('到底了')
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
    },
    relTalk() {
      wx.navigateTo({ url: "../relTalk/main" });
    },
    relTask() {
      wx.navigateTo({ url: "../relTask/main" });
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
  .rel {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    .relButton {
      background-color: #ffffff;
      position: absolute;
      bottom: 0;
      z-index: 3;
      width: 100rpx;
      height: 100rpx;
      left: 325rpx;
      border-radius: 50%;
      border: 4rpx dotted $identityBg;
      transition: transform 0.8s, opacity 0.8s;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 90%;
        height: 90%;
      }
    }
    .buttons {
      z-index: 2;
      position: absolute;
      bottom: 50rpx;
      width: 340rpx;
      height: 200rpx;
      left: 205rpx;
      border: 4rpx dotted $identityBg;
      border-radius: 80rpx;
      transition: transform 0.8s, opacity 0.8s;
      background-color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      .relTalk {
        margin-top: 10rpx;
        flex: 1;
        text-align: center;
        border-right: 4rpx dotted $identityBg;
        img {
          width: 100rpx;
          height: 100rpx;
        }
      }
      .relTask {
        @extend .relTalk;
        border-right: none;
      }
    }
  }
}
</style>

