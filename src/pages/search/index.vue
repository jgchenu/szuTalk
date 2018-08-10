<template>
  <div class="container">
    <div class="searchNav">
      <input type="text" class="searchInput" placeholder="输入回车搜索" @input="typeInput">
      <img src="/static/images/index/no-search.png" alt="搜索" class="searchIcon" >
    </div>
    <div class="labelContent" v-show="!contentShow">
        <div class="title">校园热点</div>
        <div class="labels">
          <div class="labelItem" v-for="(item,index) in labels" :key="index" :style="{borderRight:index%2==0?'':'none'}">{{item}}</div>
        </div>
    </div>
    <div class="searchContent" v-show="contentShow">
        <Tabs :tabs="tabs" :tabW="tabW" :activeIndex.sync="activeIndex" />
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
  </div>
</template>

<script>
import Tabs from "../../components/tabs";
import talkList from "../../components/talkList";
import taskList from "../../components/taskList";
export default {
  data() {
    return {
      tabs: ["说说", "任务"],
      tabW: 375,
      activeIndex: 0,
      labels: [
        "深大盒子",
        "四六级考试",
        "基哥基哥",
        "深大汪峰",
        "李清泉校长",
        "新生入学"
      ],
      contentShow: false
    };
  },
  components: { Tabs, talkList, taskList },
  methods: {
    typeInput(e) {
      let value = e.target.value;
      if (value.length !== 0) {
        this.contentShow = true;
      } else {
        this.contentShow = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  .searchNav {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90rpx;
    box-sizing: border-box;
    padding-left: 30rpx;
    .searchInput {
      width: 620rpx;
      height: 60rpx;
      padding-left: 20rpx;
      background-color: #eeeeee;
      border-radius: 20rpx;
      margin-right: 20rpx;
    }
    img {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .labelContent {
    width: 100%;
    box-sizing: border-box;
    padding: 10rpx 30rpx;
    border-top: 2px solid #dddddd;
    .title {
      color: $identityBg;
      font-weight: bold;
      font-size: 32rpx;
    }
    .labels {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      .labelItem {
        width: 340rpx;
        text-align: center;
        border-right: 1rpx solid #dddddd;
        height: 60rpx;
        font-size: 26rpx;
        line-height: 60rpx;
      }
    }
  }
  .searchContent {
    .Tabs {
      width: 100%;
      box-sizing: border-box;
      white-space: nowrap;
      z-index: 100;
      background: white;
      height: 80rpx;
      .tabItem {
        display: inline-block;
        text-align: center;
        font-size: 32rpx;
        width: 187.5rpx;
        padding-bottom: 20rpx;
      }
      .search {
        display: inline-block;
        vertical-align: middle;
        line-height: 80rpx;
        img {
          vertical-align: middle;
          width: 40rpx;
          height: 40rpx;
        }
      }
      .item_on {
        color: $topMenu;
      }
      .slider {
        position: absolute;
        bottom: 40rpx;
        left: 0;
        width: 187.5rpx;
        height: 2px;
        background: $topMenu;
        transition: transform 0.3s;
      }
    }
    .swiperBox {
      height: 1000rpx;
      margin-top: 20rpx;
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
}
</style>

