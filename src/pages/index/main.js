import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
     "navigationBarTitleText": "深大说",
     "enablePullDownRefresh": true,
     "backgroundTextStyle": "dark",
     "navigationBarBackgroundColor": '#ffffff',
     "navigationBarTextStyle":'black'

  }
}
