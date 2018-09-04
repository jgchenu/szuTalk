<template>
  <div class="container" v-if="JSON.stringify(talkDetail)!=='{}'">
    <div class="talkDetail">
      <talkListDetail :talkDetail="talkDetail"></talkListDetail>
    </div>
    <div class="commentContent">
        <FComment></FComment>
    </div>
    <div class="commentInput">
        <div class="pics"  v-show="isFocus">
                <img src="http://test.jgchen.xin/static/images/1.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">
                <img src="http://test.jgchen.xin/static/images/3.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/4.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/5.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/6.jpg" alt="头像">  
                <img src="http://test.jgchen.xin/static/images/7.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/8.jpg" alt="头像">      
                <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像">   
        </div>
        <div class="sub">
          <img src="/static/images/rel/addPic-no.png" alt="addPic" class="addPicIcon" v-show="isFocus">
          <input type="text" placeholder="说说你的看法..." @focus="onFocus" @blur="onBlur" :style="{width:!isFocus?'100%':'80%'}">
          <div class="subButton" v-show="isFocus">发表</div>
          </div>
    </div>
  </div>
</template>

<script>
import talkListDetail from "../../components/talkListDetail";
import FComment from "../../components/FComment";
const http = require("../../utils/http.js");

export default {
  onLoad() {
    let id = this.$root.$mp.query.id=22;
    console.log(this.$root.$mp.query);
    http({
      api: `/say/${id}`,
      method: "GET",
      success: res => {
        console.log(res);
        if (res.statusCode === 200) {
          this.talkDetail = res.data.data;
        }
      },
      fail: err => {
        console.log(err);
      }
    });
  },
  components: {
    talkListDetail,
    FComment
  },

  data() {
    return { isFocus: false, talkDetail: {} };
  },
  methods: {
    onFocus() {
      this.isFocus = true;
    },
    onBlur() {
      this.isFocus = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 100rpx;
  .commentInput {
    position: fixed;
    bottom: 0;
    width: 100%;
    border: 2rpx solid #dddddd;
    box-sizing: border-box;
    background-color: #ffffff;
    .pics {
      line-height: 100rpx;
      img {
        height: 80rpx;
        width: 80rpx;
        padding: 0 10rpx;
        vertical-align: middle;
      }
    }
    .sub {
      height: 90rpx;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .addPicIcon {
        width: 50rpx;
        height: 50rpx;
        vertical-align: middle;
      }
      input {
        padding-left: 10rpx;
        margin-left: 10rpx;
        width: 80%;
        height: 60rpx;
        border: 1px solid #dddddd;
        white-space: nowrap;
      }
      .subButton {
        width: 80rpx;
        text-align: center;
      }
    }
  }
}
</style>

