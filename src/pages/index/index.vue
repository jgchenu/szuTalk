<template>
  <div class="container">
        <div class="header">
        <Tabs :tabs="tabs" :activeIndex="activeIndex" :tabW="tabW" @bindChange="bindChange"></Tabs>
         <!-- <div class="tabItem search"><img src="/static/images/index/no-search.png" alt="搜索" @click="goSearch"></div> -->
       </div> 
        <div  class="dataBox">
          <!-- <div class="refresh" v-show="loading&&isRefresh">下拉刷新</div> -->
          <talkList v-for="(item,index) in indexList" :key="index" :List="item"/>
           <div class="loadMore" v-show="(loading&&!isRefresh)||finish">{{finish?'全部加载完成':'正在加载...'}}</div>
        </div>
        <div class="add" @click="goRelTalk" >
          <img src="/static/images/index/add.png"  alt="add">
        </div>
  </div>  
</template>

<script>
var qcloud = require("@/wafer2/index.js");
const { http } = require("@/utils/http.js");
var auth = require("@/utils/auth.js");
var util = require("@/utils/index.js");

import mta from "mta-wechat-analysis";
import talkList from "./components/talkList.vue";
import Tabs from "./components/tabs.vue";
import vuexMixin from "@/mixin/vuex.js";

export default {
  onPullDownRefresh: function() {
    this.refresh();
  },
  onReachBottom: function() {
    this.loadMore();
  },
  mounted() {
    auth();
  },

  onLoad() {
    mta.Page.init();
    this.loadData();
  },
  onShow() {
    let data = wx.getStorageSync("relData");
    if (data) {
      if (this.activeIndex === 1) {
        this.activeIndex = 0;
        this.refresh();
      } else if (this.activeIndex === 0) {
        this.indexList.unshift(data);
      }
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      wx.removeStorageSync("relData");
    }
    this.loadUserInfo("");
  },
  mixins: [vuexMixin],
  data() {
    return {
      tabs: ["全部", "热门"],
      activeIndex: 0,
      tabsApi: ["/say", "/say/hot"],
      indexList: [],
      page: 1,
      finish: false,
      loading: false,
      isRefresh: false,
      tabW: 187.5,
    };
  },
  components: {
    talkList,
    Tabs
  },

  methods: {
    bindChange({ index }) {
      this.activeIndex = index;
      this.refresh();
    },
    goSearch() {
      wx.navigateTo({ url: "../search/main" });
    },
    goDetail() {
      wx.navigateTo({ url: "../detail/main" });
    },
    loadData() {
      let activeIndex = this.activeIndex;
      if (this.finish || this.loading) {
        return;
      }
      this.loading = true;
      http({
        api: this.tabsApi[activeIndex],
        method: "GET",
        data: { page: this.page },
        success: res => {
          this.loading = false;
          this.isRefresh = false;
          if (res.statusCode === 200) {
            if (res.data.data.data.length > 0) {
              if (res.data.data.links.next_page_url) {
                // this.page = res.data.data.links.next_page_url.split("=")[1];
                this.page = res.data.data.meta.next_page;
              } else {
                this.finish = true;
                this.page = 1;
              }
              wx.stopPullDownRefresh();
              this.indexList = this.indexList.concat(res.data.data.data);
            } else {
              this.finish = true;
              this.page = 1;
            }
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    loadMore() {
      this.loadData();
    },
    refresh() {
      this.finish = false;
      this.isRefresh = true;
      this.page = 1;
      this.indexList = [];
      this.loadData();
    },
    goRelTalk() {
      wx.navigateTo({
        url: "../relTalk/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.container {
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
  .header {
    width: 100%;
    // position: fixed;
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
  .dataBox {
    height: 100%;
    box-sizing: border-box;
    background-color: #eeeeee;
    // height: calc( 100% - 81px );
    // padding-top: 80rpx;
    .refresh {
      line-height: 60rpx;
      text-align: center;
      color: #dddddd;
      background-color: #ffffff;
    }
    .scrollView {
      &::-webkit-scrollbar {
        display: none;
      }
      -webkit-overflow-scrolling: touch;
      overflow: scroll;
      text-align: center;
      height: 100%;
    }
    .loadMore {
      @extend .refresh;
    }
  }
  .add {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    position: fixed;
    bottom: 60rpx;
    right: 60rpx;
    box-shadow: 2rpx 4rpx 10rpx #aaaaaa;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
.coverUp {
  width: 100%;
  .title{
    text-align: center;
    font-size: 40rpx;
  }
  .list {
    border-bottom: 1px solid #dddddd;
    height: 300rpx;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10rpx 20rpx;
    box-sizing: border-box;
    margin-bottom: 20rpx;
    .title {
      font-size: 40rpx;
      font-weight: bold;
    }
    .detail {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .msg {
        flex: 3;
        color: #dddddd;
        font-size: 30rpx;
      }
      .rightImg {
        flex: 1;
        height: 100rpx;
        width: 100rpx;
      }
    }
  }
}
</style>

