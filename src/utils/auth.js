var qcloud = require("./../wafer2/index.js");
var util = require("./../utils/index.js");
module.exports = () => {
  wx.getSetting({
    success: res => {
      if (res.authSetting["scope.userInfo"]) {
        const session = qcloud.Session.get();
        if (!session) {
          //如果有授权，但是没有登录态，会去登录态
          qcloud.login({
            success: res => {
              this.userInfo = res;
              this.logged = true;
              wx.switchTab({
                url: '../index/main'
              }); 
              util.showSuccess("登录成功");

            },
            fail: err => {
              console.error(err);
              util.showModel("登录错误", err.message);
            }
          });
        } else {
          wx.switchTab({
            url: '../index/main'
          }); 
        }
      } else {
        //如果没有授权过，那么会跳转到授权页面。

      }
    }
  });

  // const session = qcloud.Session.get();
  // if (!session) {
  //   wx.navigateTo({
  //     url: "../auth/main"
  //   });
  // }
}
