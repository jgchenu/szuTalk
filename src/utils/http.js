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
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  qcloud.request({
    url: `${host}${api}`,
    data,
    method,
    success: (res) => {
      wx.hideLoading();
      if (res.statusCode === 400) {
        util.showModel('提醒',res.data.message);
        return;
      }
      success(res)
    },
    fail: (error) => {
      wx.hideLoading();
      console.log(error)
      fail(error)
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
