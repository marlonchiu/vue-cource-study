
const state = {
  userName: 'marlonchiu'
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  }
}

const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {
    // state 表示该模块的 state ；rootState 表示根模块的 state
    dispatch('xxx', '') // 这样可以触发'xxx'的action
  },
  xxx () {
    // 操作
  }
}

export default {
  namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰
  state,
  getters,
  mutations,
  actions
}
