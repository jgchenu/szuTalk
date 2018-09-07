<template>
  <div class="container">
     <div class="header">
        <Tabs :tabs="tabs" :activeIndex.sync="activeIndex" tabW=187.5 ></Tabs>
         <div class="tabItem search"><img src="/static/images/index/no-search.png" alt="搜索" @click="goSearch"></div>
       </div> 
      <swiper :current="activeIndex" class="swiperBox" @change="bindChange">
        <swiper-item class="swiperItem">
          <div class="refresh" v-show="tabsData[activeIndex].loading&&tabsData[activeIndex].isRefresh">下拉刷新</div>
          <scroll-view scroll-y="true" @scrolltolower="loadMore" @scrolltoupper="refresh                                                                        " class="scrollView" lower-threshold='10'>
          <talkList v-for="(item,index) in tabsData[activeIndex].indexList" :key="index" :List="item"/>
           <div class="loadMore" v-show="(tabsData[activeIndex].loading&&!tabsData[activeIndex].isRefresh)||tabsData[activeIndex].finish">{{tabsData[activeIndex].finish?'全部加载完成':'上拉加载更多'}}</div>
          </scroll-view>
         
        </swiper-item>
        <swiper-item class="swiperItem">
          <!-- <talkList /> -->
        </swiper-item>
        <swiper-item class="swiperItem">
          <!-- <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList>
          <taskList></taskList> -->
        </swiper-item>
      </swiper>     
  </div>
</template>

<script>
var qcloud = require("./../../wafer2/index.js");
var http = require("../../utils/http.js");
var auth = require("../../utils/auth.js");
var util = require("../../utils/index.js");

import talkList from "../../components/talkList";
import taskList from "../../components/taskList";
import Tabs from "../../components/tabs";
// import tabMenu from "../../components/tabMenu";
export default {
  mounted() {
    auth();
    this.loadData();
  },
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      tabs: ["全部", "热门", "任务"],
      activeIndex: 0,
      tabsData: [
        {
          indexList: [],
          page: 1,
          finish: false,
          loading: false,
          isRefresh: false
        },
        {
          indexList: [],
          page: 1,
          finish: false,
          loading: false,
          isRefresh: false
        },
        {
          indexList: [],
          page: 1,
          finish: false,
          loading: false,
          isRefresh: false
        }
      ]
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
    loadData() {
      let activeIndex = this.activeIndex;
      if (
        this.tabsData[activeIndex].finish ||
        this.tabsData[activeIndex].loading
      ) {
        return;
      }
      this.tabsData[activeIndex].loading = true;
      http({
        api: "/say",
        method: "GET",
        data: { page: this.tabsData[activeIndex].page },
        success: res => {
          this.tabsData[activeIndex].loading = false;
          this.tabsData[activeIndex].isRefresh = false;
          if (res.statusCode === 200) {
            if (res.data.data.data.length > 0) {
              if (res.data.data.links.next_page_url) {
                this.tabsData[
                  activeIndex
                ].page = res.data.data.links.next_page_url.split("=")[1];
              } else {
                this.tabsData[activeIndex].finish = true;
                this.tabsData[activeIndex].page = 0;
              }
              this.tabsData[activeIndex].indexList = this.tabsData[
                activeIndex
              ].indexList.concat(res.data.data.data);
            } else {
              util.showModel("抱歉", "已经加载完了");
            }
          }
          console.log(res);
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    loadMore() {
      console.log("到底了");
      this.loadData();
    },
    refresh() {
      let activeIndex = this.activeIndex;
      this.tabsData[activeIndex].finish = false;
      this.tabsData[activeIndex].isRefresh = true;
      this.tabsData[activeIndex].page = 1;
      this.tabsData[activeIndex].indexList = [];
      this.loadData();
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
    height: 1020rpx;
    margin-top: 80rpx;
    .swiperItem {
      height: 100%;
      .refresh {
        line-height: 60rpx;
        text-align: center;
        color: #bbbbbb;
      }
      .scrollView {
        &::-webkit-scrollbar {
          display: none;
        }
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
        text-align: center;
        height: 100%;
        .loadMore {
          @extend .refresh;
        }
      }
    }
  }
}
</style>

