<template>
    <div class="loginPage">
            <p>深大说</p>
            <img src="http://test.jgchen.xin/canvas/logo.jpg" alt="logo">
            <button @getuserinfo="doLogin" open-type="getUserInfo" class="loginButton">允许</button>
    </div>
</template>

<script>
var util = require("@/utils/index.js");
var qcloud = require("@/wafer2/index.js");
var config = require("@/config.js");
qcloud.setLoginUrl(`${config.loginUrl}`);
export default {
  methods: {
    onGetUserinfo(e) {
      wx.getSetting({
        success: res => {
          if (res.authSetting["scope.userInfo"]) {
            wx.navigateBack({
              delta: 1
            });
          } else {
            new Promise((resolve, reject) => {
              util.showBusy("需要授权使用");
              setTimeout(() => {
                resolve();
              }, 1000);
            }).then(() => {
              wx.openSetting({
                success: res => {
                  console.log(res);
                }
              });
            });
          }
        }
      });
    },
    doLogin: function(e) {
      if (e.target.errMsg === "getUserInfo:fail auth deny") {
        util.showModel("授权失败", "您需要允许授权才能使用");
      } else {
        const session = qcloud.Session.get();
        if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
          qcloud.loginWithCode({
            success: res => {
              this.userInfo = res;
              this.logged = true;
              util.showSuccess("登录成功");
              wx.navigateBack({ delta: 1 });
            },
            fail: err => {
              console.error(err);
              util.showModel("登录错误", err.message);
            }
          });
        } else {
          // 首次登录
          qcloud.login({
            success: res => {
              this.userInfo = res;
              this.logged = true;
              util.showSuccess("登录成功");
              wx.navigateBack({ delta: 1 });
            },
            fail: err => {
              console.error(err);
              util.showModel("登录错误", err.message);
            }
          });
        }
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/vars.scss";
.loginPage {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loginButton {
    margin-top: 100rpx;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 100rpx;
    background: $meHeaderBgRight;
    color: #fff;
  }
  p {
    margin-top: 200rpx;
    color: $meHeaderBgRight;
    text-align: center;
  }
  img {
    margin-top: 40rpx;
    border-radius: 50%;
    width: 200rpx;
    height: 200rpx;
  }
}
</style>