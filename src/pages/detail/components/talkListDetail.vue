<template>
    <div class="talkList">
        <div class="header">
            <div class="avatar">
                <img :src="List.user.avatar_url" alt="头像" @click="toUserMain(List.user.id)">
            </div>
            <div class="msg">
                <div class="name" >{{List.user.name}}</div>
                <div class="time">{{computedTime}}</div>
            </div>
            <!-- <div class="identity">
                <img src="../../static/images/me/auth.png" alt="auth">
            </div> -->
            <div class="report"><img src="/static/images/index/report.png" alt="举报" @click="handleAction('detail')" v-if="selfId===List.user.id"></div>
        </div>
        <div class="content">
          <div class="message" v-html="List.content">
            <!-- <div class="label">#南区#</div> -->
          </div>
          <div class="images">
              <img :src="item.url"  v-for="(item,index) in List.file_urls" :key="index" :data-id="index" @click="preImage">  
          </div>
        </div>
        <div class="footer">
           <!-- <div class="share"><img src="/static/images/index/share.png" alt="" class="shareIcon"><span>分享</span></div> -->
          <div class="comment" @click="showFirstComment"><img src="/static/images/index/comment.png" alt="" class="commentIcon" ><span>{{List.comments.length}}</span></div>
           <div class="like" @click="handleStar"><img :src="computedStar" alt="" class="likeIcon"><span>{{starCount}}</span></div>
        </div>
    </div>
</template>

<script>
const { http } = require("@/utils/http.js");
import computedMixin from "@/mixin/computed.js";

export default {
  props: {
    List: {
      type: Object,
      default: {}
    },
    selfId: {
      type: Number,
      default: 0
    }
  },
  mixins: [computedMixin],

  data() {
    return {
      isStar: this.List.is_star,
      starCount: this.List.star_count
    };
  },
  computed: {
    computedStar() {
      let url = `/static/images/index/${this.isStar ? "" : "no-"}like.png`;
      return url;
    },
    computedUrls() {
      let urls = this.List.file_urls.map(item => {
        return item.url;
      });
      return urls;
    }
  },
  methods: {
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
    },
    showFirstComment() {
      this.$emit("showFirstComment");
    },
    handleAction(type) {
      wx.showActionSheet({
        itemList: ["删除"],
        success: res => {
          wx.showModal({
            title: "删除",
            content: "确定要狠心删除吗？",
            cancelText: "删除",
            cancelColor: "#198AF4",
            confirmText: "取消",
            confirmColor: "#000000",
            success: res => {
              if (res.cancel) {
                this.$emit("handleAction", { type, id: this.List.id });
              }
            },
            fail: () => {}
          });
        }
      });
    },
    toUserMain(userId) {
      wx.navigateTo({
        url: `../main/main?userId=${userId}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/vars.scss";
.talkList {
  position: relative;
  padding: 10rpx 20rpx;
  margin: 10px;
  .header {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100rpx;
    .avatar {
      align-self: flex-start;
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
    margin: 16rpx 0;
    .message {
      width: 100%;
      font-size: 38rpx;
      word-wrap: break-word;
      overflow: auto;
      .label {
        color: $identityBg;
        display: inline-block;
      }
    }
    .images {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      text-align: left;
      img {
        width: 200rpx;
        height: 200rpx;
        margin: 10rpx 20rpx 10rpx 0;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10rpx;
    .like {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      .likeIcon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }
    .comment {
      @extend .like;
      margin-right: 100rpx;

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

