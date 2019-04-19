import { login, authorization } from '@/api/user'
import { setToken } from '@/lib/util'

const state = {
  userName: 'marlonchiu',
  rules: {}
}
const getters = {
  firstLetter: (state) => {
    return state.userName.substr(0, 1)
  }
}

const mutations = {
  SET_USER_NAME (state, params) {
    state.userName = params
  },
  SET_RULES (state, rules) {
    state.rules = rules
  }
}

const actions = {
  updateUserName ({ commit, state, rootState, dispatch }) {
    // state 表示该模块的 state ；rootState 表示根模块的 state
    dispatch('xxx', '') // 这样可以触发'xxx'的action
  },
  login ({ commit }, { userName, password }) {
    // // 操作
    // login({ userName, password }).then(res => {
    //   console.log(res)
    //   if (res.code === 200) {
    //     // 保存token
    //     setToken(res.data.token)
    //   } else {
    //     console.log(res.mes)
    //   }
    // }).catch(error => {
    //   console.log(error)
    // })
    return new Promise((resolve, reject) => {
      // 操作
      login({ userName, password }).then(res => {
        console.log(res)
        if (res.code === 200 && res.data.token) {
          // 保存token
          setToken(res.data.token)
          resolve()
        } else {
          console.log(res.mes)
          reject(new Error('错误'))
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  authorization ({ commit }, token) {
    return new Promise((resolve, reject) => {
      authorization().then(res => {
        console.log(res)
        if (parseInt(res.code) === 401) { // 说明验证token错误
          console.log(res.mes)
          reject(new Error('token error'))
        } else {
          // 每次调用authorization方法都会返回新的token
          // 每次请求获取到新的token 再次保存
          setToken(res.data.token)
          // 把page页面的路由返回
          resolve(res.data.rules.page)
          commit('SET_RULES', res.data.rules.component)
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  logout () {
    setToken('')
  }
}

export default {
  // namespaced: true, // 使用模块命名空间 此时不会受其他外界模块的干扰
  state,
  getters,
  mutations,
  actions
}
