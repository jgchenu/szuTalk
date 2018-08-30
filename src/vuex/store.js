// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    switchTab: 'index'
  },
  mutations: {
    changeSwitchTab: (state) => {
      const {
        switchTab
      } = state;
      switchTab === 'index' ? state.switchTab = 'me' : state.switchTab = 'index';
      wx.switchTab({
        url: `../${switchTab}/main`
      })
    }
  }
})

export default store
