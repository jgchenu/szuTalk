import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/detail/main', 'pages/me/main', 'pages/main/main', 'pages/comment/main', 'pages/relTalk/main', 'pages/auth/main', 'pages/edit/main', 'pages/editDetail/main','pages/news/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#198AF4',
      navigationBarTitleText: '深大说',
      navigationBarTextStyle: '#ffffff',
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#198AF4',
      backgroundColor: '#ffffff',
      borderStyle: 'black',
      list: [{
          pagePath: 'pages/index/main',
          iconPath: 'static/images/bottom/no-index.png',
          text: '首页',
          selectedIconPath: 'static/images/bottom/index.png'
        },
{
          pagePath: 'pages/me/main',
          iconPath: 'static/images/bottom/no-me.png',
          text: '我',
          selectedIconPath: 'static/images/bottom/me.png'
        }
      ]
    }
  }
}
// {
//   pagePath: 'pages/relTalk/main',
//   iconPath: 'static/images/bottom/no-sub.png',
//   text: '发布',
//   selectedIconPath: 'static/images/bottom/sub.png'
// }, 