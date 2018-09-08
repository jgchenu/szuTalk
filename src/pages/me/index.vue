<template>
    <div class="container" v-if="JSON.stringify(userInfo)!=='{}'">
        <div class="header">
            <div class="person">
              <img :src="userInfo.avatar_url" alt="头像" class="avatar">
              <div class="name">{{userInfo.name}}</div>
              <div class="likeAll"><img src="/static/images/me/like.png" alt="点赞"><span class="likeText">累计收到<span class="likeCount">&nbsp;{{userInfo.star_count}}&nbsp;</span>赞</span></div>
            </div>
            <!-- <div class="msg">
              <div class="like"><img src="/static/images/me/index.png" alt="我的主页"><div class="detail">获赞数:<span>66</span></div></div>
              <div class="auth"><img src="/static/images/me/auth.png" alt="认证"><div class="detail">认证:<span>学生</span></div></div>
              <div class="evaluate"><img src="/static/images/me/evaluate.png" alt="好评"><div class="detail">好评:<span>77%</span></div></div>
            </div> -->
            <div class="msg">
              <div class="index" @click="goMain"><img src="/static/images/me/index.png" alt="我的主页"><span class="detail">我的主页</span></div>
              <div class="line"></div>
              <div class="edit"><img src="/static/images/me/edit.png" alt="编辑资料"><span class="detail">个人资料</span></div>
             
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

              <div class="comment" @click="goComment"><img src="/static/images/me/comment.png" alt="消息"><div class="detail">消息<div class="count" v-show="userInfo.say_count!==0">{{userInfo.say_count}}</div></div></div>
              <div class="customer"><img src="/static/images/me/customer.png" alt="客服"><div class="detail">客服</div></div>
            </div>
        </div>
    </div>
</template>

<script>
var qcloud = require("./../../wafer2/index.js");
var http = require("../../utils/http.js");
import vuexMixin from "../../mixin/vuex.mixin.js";
export default {
  onPullDownRefresh() {
    this.loadUserInfo(this.userId);
  },
  onLoad() {
    this.userId = qcloud.Session.get().user.id;
    console.log(this.userId);
  },
  onShow() {
    this.loadUserInfo(this.userId);
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
        url: "../main/main"
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
    background: -webkit-gradient(
      linear,
      0 0,
      100% 0,
      from($meHeaderBgLeft),
      to($meHeaderBgRight)
    );
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
          width: 42rpx;
          height: 42rpx;
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
      color: $meIcon;
      font-weight: bold;
      .line {
        background-color: $meIcon;
        height: 60rpx;
        width: 2rpx;
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
      //增加消息条数的样式
      .comment {
        .detail {
          position: relative;
          .count {
            position: absolute;
            right: -24rpx;
            top: -10rpx;
            width: 24rpx;
            height: 24rpx;
            border-radius: 50%;
            background-color: $meCountBg;
            color: #fff;
            line-height: 24rpx;
          }
        }
      }
    }
  }
}
</style>

