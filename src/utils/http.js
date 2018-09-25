const qcloud = require('./../wafer2/index');
const util = require('./index')
const {
  host
} = require('./../config')
exports.http = function ({
  api,
  method,
  data,
  success,
  fail
}) {

  if (!/(^(\/say\/(comment)?).*\/star$|^\/user(\/\d+)?$)/.test(api)) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }
  qcloud.request({
    url: `${host}${api}`,
    data,
    method,
    success: (res) => {
      timer = false;
      wx.hideLoading();
      if (/(400|404)/.test(res.statusCode)) {
        wx.showModal({
          title: '提醒',
          content: res.data.message,
          showCancel: false,
          success: () => {
            wx.navigateBack({
              delta: 1
            });
          }
        });
        return;
      }
      success(res)
    },
    fail: (error) => {
      wx.hideLoading();
      console.log(error)
      fail(error)
      timer = false;
    }
  })

}
exports.uploadFile = function ({
  api,
  filePath,
  formData = {},
  name,
  success = () => {},
  fail = () => {}
}) {
  wx.showLoading({
    title: '上传中..',
    mask: true
  })
  qcloud.upload({
    url: `${host}${api}`,
    filePath,
    formData,
    name,
    success: (res) => {
      wx.hideLoading();
      res.data = JSON.parse(res.data);
      success(res);
    },
    fail: (error) => {
      wx.hideLoading();
      fail(error)
    }
  })
}
