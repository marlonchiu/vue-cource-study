/*
* 定义一个数据持久化存储的插件（页面刷新所有的vuex之都会变化）
*/
export default store => {
  // console.log('store初始化了') // 只会执行一次
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutations, state) => {
    // console.log('提交mutations')
    localStorage.state = JSON.stringify(state)
  })
}

/*
*上述方法的执行逻辑
* 第一次先判断本地是否存储的有state  有的话就赋值
* 在每次更新提交mutations  更新本地存储
* 这样的话每次刷新页面时，数据是不变的
*/
