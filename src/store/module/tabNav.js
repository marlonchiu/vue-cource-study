// 多tab页存入的点开tab
import { routeHasExist } from '@/lib/util'
const state = {
  tabList: []
}

const mutations = {
  UPDATE_ROUTER (state, route) {
    // 如果不存在才放入
    if (!routeHasExist(state.tabList, route)) state.tabList.push(route)
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
