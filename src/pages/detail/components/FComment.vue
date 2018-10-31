<template>
    <div class="FComment" >
      <div class="avatar">
          <img :src="List.user.avatar_url" alt="头像" @click="toUserMain(List.user.id)">
      </div>
      <div class="container">
        <div class="header">
            <div class="msg">
                <div class="name">{{List.user.name}}</div>
                <div class="time">{{computedTime}}</div>
            </div>
            <!-- <div class="identity">
                <img src="../../static/images/me/auth.png" alt="auth">
            </div> -->
            <div class="report" @click="handleAction('comment')"><img src="/static/images/index/report.png" alt="举报"  v-if="selfId===List.user.id"></div>
        </div>
        <div class="content">
          <div class="message">
            <!-- <div class="label">#南区#</div> -->
           {{List.content}}
          </div>
          <div class="images">
              <img :src="item.url"  v-for="(item,index) in List.file_urls" :key="index" :data-id="index" @click="preImage">  
          </div>
        </div>
        <div class="footer">
          <div class="comment"  @click="showSecondComment"><img src="/static/images/index/comment.png" alt="" class="commentIcon"><span>{{List.comments.length||'&nbsp;'}}</span></div>
           <div class="like" @click="handleStar"><img :src="computedStar" alt="" class="likeIcon" :class="{selectStarIcon:isStar}"><span :class="{selectStar:isStar}">{{starCount||'&nbsp;'}}</span></div>
        </div>
        <div class="secondComments" >
          <div class="secondContainer"  v-for="(item,index) in List.comments" :key="index"  @click="handleApply(item)">
            <div v-if="!item.to_user" >
              <span class="from" @click.stop="toUserMain(item.user.id)">{{item.user.name}}</span>: <span class="content">
               {{item.content}}
              </span>
            </div>
            <div v-if="item.to_user">
              <span class="from" @click.stop="toUserMain(item.user.id)">{{item.user.name}}</span> 回复
              <span class="to" @click.stop="toUserMain(item.to_user.id)">{{item.to_user.name}}</span>: <span class="content">
               {{item.content}}
              </span>
            </div>
          </div>
        </div>
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
    commentIndex: {
      type: Number,
      default: 0
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
  components: {},
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
    showSecondComment() {
      this.$emit("showSecondComment", {
        id: this.List.id,
        name: this.List.user.name,
        commentIndex: this.commentIndex
      });
    },
    handleApply(item) {
      if (item.user.id === this.selfId) {
        wx.showActionSheet({
          itemList: [`回复 ${item.user.name}:`, "删除"],
          success: res => {
            if (res.tapIndex === 0) {
              this.$emit("showApply", {
                id: this.List.id,
                toId: item.id,
                name: item.user.name,
                commentIndex: this.commentIndex
              });
            } else if (res.tapIndex === 1) {
              wx.showModal({
                title: "删除",
                content: "确定要狠心删除吗？",
                cancelText: "删除",
                cancelColor: "#198AF4",
                confirmText: "取消",
                confirmColor: "#000000",
                success: res => {
                  if (res.cancel) {
                    this.$emit("handleAction", {
                      type: "apply",
                      id: item.id,
                      commentIndex: this.commentIndex
                    });
                  }
                },
                fail: () => {}
              });
            }
          }
        });
      } else {
        wx.showActionSheet({
          itemList: [`回复 ${item.user.name}:`],
          success: res => {
            if (res.tapIndex === 0)
              this.$emit("showApply", {
                id: this.List.id,
                toId: item.id,
                name: item.user.name,
                commentIndex: this.commentIndex
              });
          }
        });
      }
    },
    handleStar() {
      let method = this.isStar ? "DELETE" : "POST";
      http({
        api: `/say/comment/${this.List.id}/star`,
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
    handleAction(type) {
      wx.showActionSheet({
        itemList: ["删除"],
        success: res => {
          if (res.tapIndex === 0) {
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
.FComment {
  position: relative;
  padding: 10rpx 30rpx;
  .avatar {
    position: absolute;
    width: 68rpx;
    height: 68rpx;
    top: 21rpx;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .container {
    box-sizing: border-box;
    padding-left: 100rpx;
    border-bottom: 1rpx solid #ddd;
    .header {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      height: 100rpx;
      .msg {
        text-align: left;
        line-height: 40rpx;
        .name {
          font-size: 26rpx;
          vertical-align: top;
        }
        .time {
          font-size: 20rpx;
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
        width: 60rpx;
        height: 40rpx;
        text-align: right;
        img {
          width: 28rpx;
          height: 28rpx;
        }
      }
    }
    .content {
      .message {
        width: 100%;
        font-size: 14px;
        word-wrap: break-word;
        overflow: auto;
        .label {
          color: $identityBg;
          display: inline-block;
        }
      }
      .images {
        padding: 20rpx 0;
        white-space: nowrap;
        width: 100%;

        img {
          width: 160rpx;
          height: 160rpx;
          margin-right: 40rpx;
        }
      }
    }
    .footer {
      padding: 20rpx;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .like {
        display: flex;
        align-items: center;
        font-size: 20rpx;
        color: $commentNumColor;
        .likeIcon {
          width: 36rpx;
          height: 36rpx;
          margin-right: 20rpx;
        }
      }
      .comment {
        @extend .like;
        margin-right: 60rpx;
        .commentIcon {
          @extend .likeIcon;
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
    }
    .secondComments {
      width: 100%;
      overflow: auto;
      background-color: #fafafa;
      margin-bottom: 20rpx;
      .secondContainer {
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

