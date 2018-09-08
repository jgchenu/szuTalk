// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    }

  },
  actions: {
    loadUserInfo({
      commit
    }, userId) {
      http({
        api: `/user/${userId}`,
        method: 'GET',
        success: res => {
          if (res.statusCode === 200) {
            commit('setUserInfo', res.data.data)
            wx.stopPullDownRefresh();

            console.log(res)
          }
        }
      })
    }
  }
})

export default store
