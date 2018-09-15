// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import {
  http
} from '../utils/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
   
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
      if (state.userInfo.unread_notification_count) {
        wx.setTabBarBadge({
          index: 2,
          text: String(state.userInfo.unread_notification_count)
        });
      } else {
        wx.removeTabBarBadge({
          index: 2
        })
      }
    },

  },
  actions: {
    loadUserInfo({
      commit
    }, userId) {
      let api = userId ? `/user/${userId}` : `/user`;
      http({
        api,
        method: 'GET',
        success: res => {
          if (res.statusCode === 200) {
            commit('setUserInfo', res.data.data)
            wx.stopPullDownRefresh();
          }
        }
      })
    }
  }
})

export default store
