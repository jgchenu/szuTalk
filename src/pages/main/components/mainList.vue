<template>
    <div class="talkList" @click="goDetail">
        <div class="content">
          <div class="message">
            {{computedContent}}
          </div>
          <div class="images" v-if="List.file_urls.length>0">
            <img :src="item.url" alt="" v-for="(item,index) in computedImages" :key="index"> 
                <div class="omitWrap" v-if="List.file_urls.length>3">
                  <img src="/static/images/index/omit.png" alt="omit">
                   <span>{{List.file_urls.length}}</span>
                </div>          
          </div>
        </div>
        <div class="footer">
          <div class="time">{{computedTime}}</div>
          <div class="right">
          <div class="comment"><img src="/static/images/index/comment.png" alt="" class="commentIcon"><span>{{List.comment_count}}</span></div>
          <div class="like" @click.stop="handleStar"><img :src="computedStar" alt="" class="likeIcon" :class="{selectStarIcon:isStar}"><span :class="{selectStar:isStar}">{{starCount}}</span></div>
          </div>

        </div>
    </div>
</template>

<script>
import listMixin from "@/mixin/list.js";
import computedMixin from "@/mixin/computed.js";

export default {
  mixins: [listMixin, computedMixin]
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.talkList {
  border-bottom: 4rpx solid #dddddd;
  padding: 30rpx 20rpx;
  background-color: #ffffff;
  // box-shadow: 0 0 20rpx #bbbbbb;
  margin: 0 0 10rpx 0;
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    .avatar {
      width: 90rpx;
      height: 90rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .msg {
      padding: 0 20rpx;
      text-align: left;
      line-height: 40rpx;
      .name {
        font-size: 30rpx;
        vertical-align: top;
      }
      .time {
        font-size: 12px;
        color: #bbbbbb;
      }
    }
    .identity {
      width: 80rpx;
      height: 40rpx;
      line-height: 40rpx;
      background-color: $identityBg;
      text-align: center;
      border-radius: 20rpx;
      align-self: flex-start;
      margin-top: 10rpx;
      color: #ffffff;
    }
  }
  .content {
    text-align: left;
    width: 100%;
    .message {
      width: 100%;
      font-size: 16px;
      word-wrap: break-word;
      overflow: auto;
      padding: 0 0 34rpx 0;
      //div强制换行
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      position: relative;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      width: 100%;
      height: 200rpx;
      justify-content: space-between;
      display: flex;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 0 10rpx;
      }
      .omitWrap {
        position: absolute;
        right: 30rpx;
        bottom: 20rpx;
        padding: 2rpx;
        background-color: rgba($color: #000000, $alpha: 0.2);
        font-size: 20rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        border-radius: 4rpx;
        img {
          width: 30rpx;
          height: 30rpx;
          margin: 0 6rpx;
          vertical-align: middle;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30rpx;
    .right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }
    .like,
    .comment {
      color: $commentNumColor;
      display: flex;
      align-items: center;
      .likeIcon,
      .commentIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
    .selectStar {
      color: $starNumColor;
    }
    .selectStarIcon {
      animation: star 0.4s linear;
    }
    @keyframes star {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.4);
      }
      100% {
        transform: rotate(1);
      }
    }
    .comment {
      margin-right: 100rpx;
    }
    .time {
      color: #cccccc;
    }
  }
}
</style>

