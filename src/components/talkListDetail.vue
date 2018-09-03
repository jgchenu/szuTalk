<template>
    <div class="talkList">
        <div class="header">
            <div class="avatar">
                <img :src="talkDetail.user.avatar_url" alt="头像">
            </div>
            <div class="msg">
                <div class="name">{{talkDetail.user.name}}</div>
                <div class="time">{{talkDetail.updated_at}}</div>
            </div>
            <!-- <div class="identity">
                <img src="../../static/images/me/auth.png" alt="auth">
            </div> -->
            <div class="report"><img src="/static/images/index/report.png" alt="举报"></div>
        </div>
        <div class="content">
          <div class="message">
            <!-- <div class="label">#南区#</div> -->
            {{talkDetail.content}}
          </div>
          <div class="images">
              <img :src="item.url"  v-for="(item,index) in talkDetail.file_urls" :key="index">  
          </div>
        </div>
        <div class="footer">
           <div class="share"><img src="/static/images/index/share.png" alt="" class="shareIcon">分享</div>
          <div class="comment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">{{talkDetail.comments.length}}评论</div>
           <div class="like" @click="handleStar"><img :src="computedStar" alt="" class="likeIcon">{{starCount}}赞</div>
        </div>
    </div>
</template>

<script>
const http = require("../utils/http.js");
export default {
  props: {
    talkDetail: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      isStar: this.talkDetail.is_star,
      starCount: this.talkDetail.star_count
    };
  },
  computed: {
    computedStar() {
      let url = `/static/images/index/${this.isStar ? "" : "no-"}like.png`;
      return url;
    }
  },
  methods: {
    handleStar() {
      let method = this.isStar ? "DELETE" : "POST";
      http({
        api: `/say/${this.talkDetail.id}/star`,
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
  position: relative;
  border-bottom: 2rpx solid #dddddd;
  padding: 10rpx 20rpx;
  margin: 10px;
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    .avatar {
      width: 80rpx;
      height: 80rpx;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .msg {
      padding: 0 20rpx;
      text-align: center;
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
      width: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      border-radius: 20rpx;
      align-self: flex-start;
      margin-top: 10rpx;
      color: #ffffff;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .report {
      position: absolute;
      right: 40rpx;
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .content {
    .message {
      width: 100%;
      font-size: 16px;
      word-wrap: break-word;
      overflow: auto;
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      padding: 10rpx 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 10rpx;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    .like {
      font-size: 24rpx;
      .likeIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }
    .comment {
      @extend .like;
      .commentIcon {
        @extend .likeIcon;
      }
    }
    .share {
      @extend .like;
      .shareIcon {
        @extend .likeIcon;
      }
    }
  }
}
</style>

