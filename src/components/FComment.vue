<template>
    <div class="FComment" >
      <div class="avatar">
          <img :src="detailData.user.avatar_url" alt="头像">
      </div>
      <div class="container">
        <div class="header">
            <div class="msg">
                <div class="name">{{detailData.user.name}}</div>
                <div class="time">{{detailData.updated_at}}</div>
            </div>
            <!-- <div class="identity">
                <img src="../../static/images/me/auth.png" alt="auth">
            </div> -->
            <div class="report"><img src="/static/images/index/report.png" alt="举报"></div>
        </div>
        <div class="content">
          <div class="message">
            <!-- <div class="label">#南区#</div> -->
           {{detailData.content}}
          </div>
          <div class="images">
              <img :src="item.url"  v-for="(item,index) in detailData.file_urls" :key="index" :data-id="index" @click="preImage">  
          </div>
        </div>
        <div class="footer">
          <div class="comment"  @click="showSecondComment"><img src="/static/images/index/comment.png" alt="" class="commentIcon">{{detailData.comments.length}}评论</div>
           <div class="like" @click="handleStar"><img :src="computedStar" alt="" class="likeIcon">{{starCount}}赞</div>
        </div>
        <div class="secondComments" >
          <div class="container"  v-for="(item,index) in detailData.comments" :key="index" :currentid="item.id" @click="showApply(item.id,item.user.name)">
            <div v-if="!item.to_user">
              <span class="from">{{item.user.name}}</span>: <span class="content">
               {{item.content}}
              </span>
            </div>
            <div v-if="item.to_user">
              <span class="from">{{item.user.name}}</span> 回复
              <span class="to">{{item.to_user.name}}</span>: <span class="content">
               {{item.content}}
              </span>
            </div>
          </div>
        </div>
      </div>
        
    </div>
</template>

<script>
const http = require("../utils/http.js");

export default {
  props: {
    detailData: {
      type: Object,
      default: {}
    },
    commentIndex:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      isStar: this.detailData.is_star,
      starCount: this.detailData.star_count
    };
  },
  components: {},
  computed: {
    computedStar() {
      let url = `/static/images/index/${this.isStar ? "" : "no-"}like.png`;
      return url;
    },
    computedUrls() {
      let urls = this.detailData.file_urls.map(item => {
        return item.url;
      });
      return urls;
    }
  },
  methods: {
    showSecondComment() {
      this.$emit("showSecondComment", {
        id: this.detailData.id,
        name: this.detailData.user.name,
        commentIndex:this.commentIndex
      });
    },
    showApply(toId,name) {
      this.$emit("showApply", {
        id: this.detailData.id,
        toId,
        name,
        commentIndex:this.commentIndex
      });
    },
    handleStar() {
      let method = this.isStar ? "DELETE" : "POST";
      http({
        api: `/say/${this.detailData.id}/star`,
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
    },
    preImage(e) {
      if (this.computedUrls.length) {
        let id = e.target.dataset.id;
        if (id === undefined) {
          return;
        }
        wx.previewImage({
          current: this.computedUrls[id], // 当前显示图片的http链接
          urls: this.computedUrls // 需要预览的图片http链接列表
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/vars.scss";
.FComment {
  position: relative;
  padding: 10rpx 20rpx;
  margin: 10px;
  .avatar {
    position: absolute;
    width: 80rpx;
    height: 80rpx;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .container {
    box-sizing: border-box;
    padding-left: 80rpx;
    border-bottom: 1rpx solid #dddddd;
    .header {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      height: 100rpx;
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
          width: 180rpx;
          height: 180rpx;
          margin: 0 6rpx;
        }
      }
    }
    .footer {
      padding: 10rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .like {
        font-size: 20rpx;
        .likeIcon {
          width: 30rpx;
          height: 30rpx;
          margin-right: 20rpx;
        }
      }
      .comment {
        @extend .like;
        .commentIcon {
          @extend .likeIcon;
        }
      }
    }
    .secondComments {
      width: 100%;
      overflow: auto;
      .container {
        box-sizing: border-box;
        width: 100%;
        padding: 14rpx;
        font-size: 24rpx;
        .from {
          color: $identityBg;
          font-weight: bold;
        }
        .to {
          @extend .from;
        }
      }
    }
  }
}
</style>

