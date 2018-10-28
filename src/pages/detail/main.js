import pageFactory from 'mpvue-page-factory'
import App from './index'

Page(pageFactory(App))

export default {
    config: {
      navigationBarTitleText: '说说',
      enablePullDownRefresh:true,
     "backgroundTextStyle": "dark"

    }
  }