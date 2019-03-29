import Vue from 'vue'
const mutations = {
  // SET_APP_NAME (state, params) {
  //   state.appName = params
  // }
  // SET_APP_NAME (state, params) {
  //   state.appName = params.appName
  // }
  // SET_APP_NAME (state, params) {
  //   state.appName = params.appName
  // },
  SET_APP_NAME (state, params) {
    state.appName = params
  },
  SET_STATE_VALUE (state, data) {
    state.stateValue = data
  },
  SET_APP_VERSION (state) { // 给state中添加属性和值
    Vue.set(state, 'appVersion', 'v2.0') // 三个参数依次 给谁添加属性  属性名 属性值
  }
}

export default mutations
