
const state = {
  userName: 'marlonchiu'
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {

}

const actions = {

}
export default {
  namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰
  state,
  getters,
  mutations,
  actions
}
