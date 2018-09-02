const qcloud = require('./../wafer2/index');
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
  qcloud.request({
    url: `${host}${api}`,
    login: true,
    data,
    method,
    success,
    fail
  })
}
