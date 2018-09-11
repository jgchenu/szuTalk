import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "个人主页",
    "enablePullDownRefresh": true,
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": '#198AF4',

  }
}
