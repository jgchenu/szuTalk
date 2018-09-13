import pageFactory from 'mpvue-page-factory'
import App from './index'

Page(pageFactory(App))

export default {
  config: {
    "navigationBarTitleText": "个人主页",
    "enablePullDownRefresh": true,
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": '#198AF4',

  }
}
