const {
  host
} = require('./../config')
// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }
const formatTime = (timeStamp) => {
  let timeDiff = parseInt(Date.now()/1000+4) - timeStamp;
  let computedTime = "";
  if (timeDiff < 60) {
    computedTime = `${timeDiff}秒前`;
  } else if (timeDiff < 3600) {
    let m = parseInt(timeDiff / 60);
    computedTime = `${m}分钟前`;
  } else if (timeDiff >= 3600 && timeDiff < 24 * 3600) {
    let h = parseInt(timeDiff / 3600);
    computedTime = `${h}小时前`;
  } else if (timeDiff >= 24 * 3600) {
    let date = new Date(timeStamp);
    let h = date.getHours();
    let m = date.getMinutes();
    if (timeDiff < 48 * 3600) {
      computedTime = `昨天 ${h}:${m}`;
    } else if (timeDiff >= 48 * 3600) {
      let M =
        date.getMonth() + 1 < 10 ?
        "0" + (date.getMonth() + 1) :
        date.getMonth() + 1;
      let Y = date.getFullYear();
      let D = date.getDate();
      let h = date.getHours();
      let m = date.getMinutes();
      computedTime = `${Y}-${M}-${D} ${h}:${m}`;
    }
  }
  return computedTime;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 显示繁忙提示
var showBusy = (text, time = 1000) => wx.showToast({
  title: text,
  icon: 'loading',
  duration: time
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}
var showTip = (title = "提示", content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: content,
    showCancel: false
  })
}

module.exports = {
  formatTime,
  showBusy,
  showSuccess,
  showModel,
  showTip
}
