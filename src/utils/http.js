const qcloud = require('./../wafer2/index');
const util = require('./index')
const {
  host
} = require('./../config')
module.exports = function ({
  api,
  method,
  data,
  success,
  fail
}) {
  // util.showBusy('加载中', 10000)
  qcloud.request({
    url: `${host}${api}`,
    data,
    method,
    success: (res) => {
      // wx.hideToast();
      success(res)
    },
    fail: (error) => {
      wx.hideToast();
      fail(error)
    }
  })
}
