const qcloud = require('./../wafer2/index');
const config = require('./../config')
module.exports = function (
  api,
  method, data, success, fail) {
  qcloud.request({
    url: `${config.host}${api}`,
    login: true,
    data,
    method,
    success,
    fail
  })
}
