<template>
    <div class="container">
        <div class="header">
            <div class="person">
              <img src="http://test.jgchen.xin/static/images/2.jpg" alt="头像" class="avatar">
              <div class="name">the_J <img src="/static/images/me/edit.png" alt="编辑"></div>
            </div>
            <div class="msg">
              <div class="like"><img src="/static/images/me/like.png" alt="点赞"><div class="detail">获赞数:<span>66</span></div></div>
              <div class="auth"><img src="/static/images/me/auth.png" alt="认证"><div class="detail">认证:<span>学生</span></div></div>
              <div class="evaluate"><img src="/static/images/me/evaluate.png" alt="好评"><div class="detail">好评:<span>77%</span></div></div>
            </div>
        </div>
        <div class="container">
            <div class="menus">
              <div class="main" @click="goMain"><img src="/static/images/me/main.png" alt="点赞"><div class="detail">我的主页</div></div>
              <div class="comment" @click="goComment"><img src="/static/images/me/comment.png" alt="点赞"><div class="detail">评论</div></div>
              <div class="order"><img src="/static/images/me/order.png" alt="点赞"><div class="detail">任务</div></div>
              <div class="wallet" @click="goWallet"><img src="/static/images/me/wallet.png" alt="点赞"><div class="detail">钱包</div></div>
              <div class="customer"><img src="/static/images/me/customer.png" alt="点赞"><div class="detail">客服</div></div>
              <div class="customer" @click="goRegister"><img src="/static/images/me/customer.png" alt="点赞"><div class="detail">注册</div></div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      logs: []
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
    height: 320rpx;
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
        height: 100rpx;
        width: 100rpx;
        border-radius: 50%;
        box-shadow: 0 0 30rpx #ffffff;
      }
      .name {
        color: #ffffff;
        font-size: 32rpx;
        font-size: bold;
        margin-top: 10rpx;
        img {
          width: 32rpx;
          height: 32rpx;
          vertical-align: middle;
          margin-left: 10rpx;
        }
      }
    }
    .msg {
      width: 600rpx;
      height: 140rpx;
      border-radius: 20rpx;
      background-color: #fff;
      position: absolute;
      display: flex;
      flex-direction: row;
      bottom: -70rpx;
      left: 75rpx;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      box-shadow: 5rpx 5rpx 10rpx #aaaaaa;
      img {
        width: 50rpx;
        height: 50rpx;
      }
      span {
        color: red;
      }
    }
  }
  .container {
    height: 780rpx;
    width: 100%;
    background-color: $meContentBg;
    display: table;
    .menus {
      width: 600rpx;
      height: 400rpx;
      border-radius: 20rpx;
      background-color: #fff;
      margin: 120rpx auto 0 auto;
      box-shadow: 5rpx 5rpx 10rpx #aaaaaa;

      .main,
      .comment,
      .order,
      .wallet,
      .customer {
        display: inline-block;
        width: 200rpx;
        height: 200rpx;
        text-align: center;
        padding-top: 38rpx;
        box-sizing: border-box;
        font-size: 22rpx;
        img {
          width: 66rpx;
          height: 66rpx;
        }
      }
    }
  }
}
</style>

