<template>
    <div class="talkList" @click="goDetail">
        <div class="header">
            <div class="avatar">
                <img :src="List.user.avatar_url" alt="头像">
            </div>
            <div class="msg">
                <div class="name">{{List.user.name}}</div>
                <div class="time">{{computedTime}}</div>
            </div>
            <!-- <div class="identity">
                学生
            </div> -->
        </div>
        <div class="content">
          <div class="message">
            <!-- <div class="label"></div> -->
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
          <div class="comment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">{{List.comment_count}}</div>
          <div class="like" @click.stop="handleStar"><img :src="computedStar" alt="" class="likeIcon"  >{{starCount}}</div>
        </div>
    </div>
</template>

<script>
const { http } = require("../utils/http.js");

export default {
  props: {
    List: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isStar: this.List.is_star,
      starCount: this.List.star_count
    };
  },
  computed: {
    computedTime() {
      return this.List.updated_at.split(" ")[1];
    },
    computedContent() {
      let reg = new RegExp("<br>", "g");
      let str = this.List.content.replace(reg, "\n");
      let content = str.slice(0, 100);
      content = content.length < 60 ? content : content + "...";
      return content;
    },
    computedImages() {
      let arr = this.List.file_urls.slice(0, 3);
      return arr;
    },
    computedStar() {
      let url = `/static/images/index/${this.isStar ? "" : "no-"}like.png`;
      return url;
    }
  },
  methods: {
    goDetail() {
      wx.navigateTo({
        url: `../detail/main?id=${this.List.id}`
      });
    },
    handleStar() {
      let method = this.isStar ? "DELETE" : "POST";
      http({
        api: `/say/${this.List.id}/star`,
        method,
        success: res => {
          if (res.statusCode === 200) {
            this.isStar = !this.isStar;
            if (method === "DELETE") {
              this.starCount--;
            } else {
              this.starCount++;
            }
          }
        },
        fail: err => {
          console.log(err);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.talkList {
  // border-bottom: 2rpx solid #dddddd;
  padding: 10rpx 30rpx 10rpx 30rpx;
  background-color: #ffffff;
  // box-shadow: 0 0 20rpx #bbbbbb;
  margin: 18rpx 0;
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    padding: 10rpx 0;
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
    padding: 10rpx 0 20rpx 0;
    .message {
      width: 100%;
      font-size: 16px;
      word-wrap: break-word;
      overflow: auto;
      padding: 10rpx 0;
      //div强制换行
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      position: relative;
      padding: 10rpx 0;
      white-space: nowrap;
      width: 100%;
      height: 200rpx;
      &::-webkit-scrollbar {
        display: none;
      }
      img {
        width: 200rpx;
        height: 200rpx;
        // margin: 0 10rpx;
        margin-right: 42rpx;
      }
      .omitWrap {
        position: absolute;
        right: 10rpx;
        bottom: 20rpx;
        padding: 2rpx;
        background-color: rgba($color: #000000, $alpha: 0.2);
        font-size: 20rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        border-radius: 4rpx;
        img {
          padding: 0;
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
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 10rpx;

    .like,
    .comment {
      display: flex;
      align-items: center;
      .likeIcon,
      .commentIcon {
        width: 32rpx;
        height: 32rpx;
        margin-right: 10rpx;
      }
    }
    .comment {
      margin-right: 100rpx;
    }
  }
}
</style>

