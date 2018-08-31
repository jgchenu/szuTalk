var qcloud = require("./../wafer2/index.js");

module.exports = () => {
  const session = qcloud.Session.get();
  if (!session) {
    wx.navigateTo({
      url: "../auth/main"
    });
  }
}
