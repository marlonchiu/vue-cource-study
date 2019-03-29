// 模拟下异步请求
import { getAppName } from '@/api/app.js'

const actions = {
  // updateAppName ({ commit }) {
  //   getAppName().then((res) => {
  //     console.log(res)
  //     if (res.code === 200) {
  //       // const newAppName = res.info.appName
  //       // // 提交mutation 请求
  //       // commit('SET_APP_NAME', newAppName)
  //       const { info: { appName } } = res
  //       // 提交mutation 请求
  //       commit('SET_APP_NAME', appName)
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // ES8 好酷好酷的
  async updateAppName ({ commit }) {
    // 处理异常情况下  包在try...catch... 语句中
    try {
      const { info: { appName } } = await getAppName()
      commit('SET_APP_NAME', appName)
    } catch (error) {
      console.log(error)
    }
  }
}

export default actions
