<template>
    <div class="container" v-if="JSON.stringify(userInfo)!=='{}'">
        <div class="header">
            <div class="person">
              <img :src="userInfo.avatar_url" @click="preImage" alt="头像" class="avatar">
              <div class="name" >{{userInfo.name}}</div>
              <div class="likeAll" ><img src="/static/images/me/like.png" alt="点赞">&nbsp;<span class="likeText">获得<span class="likeCount">{{userInfo.star_count}}</span></span>&nbsp;赞</div>
            </div>
            <!-- <div class="msg">
              <div class="like"><img src="/static/images/me/index.png" alt="我的主页"><div class="detail">获赞数:<span>66</span></div></div>
              <div class="auth"><img src="/static/images/me/auth.png" alt="认证"><div class="detail">认证:<span>学生</span></div></div>
              <div class="evaluate"><img src="/static/images/me/evaluate.png" alt="好评"><div class="detail">好评:<span>77%</span></div></div>
            </div> -->
            <div class="msg">
              <div class="index" @click="goMain"><img src="/static/images/me/index.png" alt="我的主页"><span class="detail">我的主页</span></div>
              <div class="line"></div>
              <div class="edit" @click="goEdit"><img src="/static/images/me/edit.png" alt="编辑资料"><span class="detail">编辑资料</span></div>
             
            </div>
        </div>
        <div class="container">
            <div class="menus">
              <!-- <div class="main" @click="goMain"><img src="/static/images/me/main.png" alt="点赞"><div class="detail">我的主页</div></div>
              <div class="comment" @click="goComment"><img src="/static/images/me/comment.png" alt="点赞"><div class="detail">评论</div></div>
              <div class="order"><img src="/static/images/me/order.png" alt="点赞"><div class="detail">任务</div></div>
              <div class="wallet" @click="goWallet"><img src="/static/images/me/wallet.png" alt="点赞"><div class="detail">钱包</div></div>
              <div class="customer"><img src="/static/images/me/customer.png" alt="点赞"><div class="detail">客服</div></div>
              <div class="customer" @click="goRegister"><img src="/static/images/me/customer.png" alt="点赞"><div class="detail">注册</div></div> -->

              <div class="comment" @click="goComment"><img src="/static/images/me/comment.png" alt="消息"><div class="detail">消息<div class="count" v-show="userInfo.unread_notification_count!==0">{{computedCount}}</div></div></div>
              <div class="customer" @click="contactServer"><img src="/static/images/me/customer.png" alt="客服"><div class="detail">客服</div></div>
            </div>
        </div>
        <div class="buttons">
          <button @click="showLikes">资讯收藏</button>
          <button @click="contactServer">联系客服</button>
        </div>
    </div>
</template>

<script>
var qcloud = require("@/wafer2/index.js");
const { http } = require("@/utils/http.js");
import vuexMixin from "@/mixin/vuex.js";
const wechat =
  "https://weapp-1254552770.cos.ap-guangzhou.myqcloud.com/szusay/contact.png";
export default {
  onPullDownRefresh() {
    this.loadUserInfo("");
  },

  onShow() {
    this.loadUserInfo("");
  },
  mixins: [vuexMixin],
  data() {
    return {
      userId: 0
    };
  },
  methods: {
    goMain() {
      wx.navigateTo({
        url: `../main/main?userId=${this.userInfo.id}`
      });
    },
    goWallet() {
      wx.navigateTo({
        url: "../wallet/main"
      });
    },
    goComment() {
      wx.navigateTo({
        url: "../comment/main"
      });
    },
    goRegister() {
      wx.navigateTo({
        url: "../register/main"
      });
    },
    goEdit() {
      wx.navigateTo({
        url: "../edit/main"
      });
    },
    preImage() {
      wx.previewImage({
        current: this.userInfo.avatar_url, // 当前显示图片的http链接
        urls: [this.userInfo.avatar_url] // 需要预览的图片http链接列表
      });
    },
    contactServer() {
      wx.previewImage({
        current: wechat, // 当前显示图片的http链接
        urls: [wechat] // 需要预览的图片http链接列表
      });
    },
    showLikes() {
      wx.showModal({title:"提醒", content:"暂未上线"});
    }
  },
  computed: {
    computedCount() {
      let count = this.userInfo.unread_notification_count;
      if (count > 99) {
        count = "99+";
      }
      return count;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.container {
  .header {
    height: 460rpx;
    width: 100%;
    background: linear-gradient(to bottom, $meHeaderBgRight, $meHeaderBgLeft);
    position: relative;
    display: table;
    .person {
      margin-top: 40rpx;
      text-align: center;
      .avatar {
        height: 200rpx;
        width: 200rpx;
        border-radius: 50%;
        box-shadow: 0 0 30rpx #ffffff;
      }
      .name {
        color: #ffffff;
        font-size: 40rpx;
        font-size: bolder;
        margin-top: 10rpx;
      }
      .likeAll {
        height: 100rpx;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        img {
          width: 38rpx;
          height: 38rpx;
        }
        .likeText {
          .likeCount {
            color: $coinColor;
          }
        }
      }
    }
    .msg {
      width: 660rpx;
      height: 120rpx;
      border-radius: 20rpx;
      background-color: #fff;
      position: absolute;
      display: flex;
      flex-direction: row;
      bottom: -70rpx;
      left: 45rpx;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      box-shadow: 5rpx 5rpx 10rpx #aaaaaa;
      color: $headerBg;
      font-weight: bold;
      .index,
      .edit {
        flex: 99;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .line {
        flex: 1;
        background-color: #dddddd;
        height: 50rpx;
        width: 1rpx;
      }
      img {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
    }
  }
  .container {
    height: 780rpx;
    width: 100%;
    background-color: $meContentBg;
    display: table;
    .menus {
      width: 660rpx;
      border-radius: 20rpx;
      background-color: #fff;
      margin: 120rpx auto 0 auto;
      box-shadow: 5rpx 5rpx 10rpx #aaaaaa;
      justify-content: space-around;
      display: flex;
      box-sizing: border-box;
      padding: 50rpx 0rpx;
      .main,
      .comment,
      .order,
      .wallet,
      .customer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 200rpx;
        text-align: center;
        box-sizing: border-box;
        font-size: 22rpx;
        img {
          width: 66rpx;
          height: 66rpx;
          margin-bottom: 10rpx;
        }
      }
      // 增加消息条数的样式
      .comment {
        .detail {
          position: relative;
          .count {
            position: absolute;
            right: -24rpx;
            top: -10rpx;
            line-height: 22rpx;
            padding: 2rpx 10rpx;
            border-radius: 30%;
            background-color: red;
            color: #fff;
            text-align: center;
            font-size: 19rpx;
          }
        }
      }
    }
  }
}
</style>

