var qcloud = require("./../wafer2/index.js");
var util = require("./../utils/index.js");
var config = require("./../config.js");
module.exports = (success) => {
  wx.getSetting({
    success: res => {
      if (res.authSetting["scope.userInfo"]) {
        const session = qcloud.Session.get();
        console.log(session)
        if (!session) {
          //如果有授权，但是没有登录态，会去登录态
          qcloud.login({
            success: res => {
              this.userInfo = res;
              this.logged = true;
              util.showSuccess("登录成功");
              wx.navigateBack({
                delta: 1
              });
            },
            fail: err => {
              console.error(err);
              util.showModel("登录错误", err.message);
            }
          });
        }
      } else {
        //如果没有授权过，那么会跳转到授权页面。
        wx.navigateTo({
          url: '../auth/main'
        });
      }
    }
  });

  const session = qcloud.Session.get();
  if (!session) {
    wx.navigateTo({
      url: "../auth/main"
    });
  }
}
