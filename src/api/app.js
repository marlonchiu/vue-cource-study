// 模拟异步接口
export const getAppName = () => {
  return new Promise((resolve, reject) => {
    const err = null
    setTimeout(() => {
      if (!err) {
        resolve({
          code: 200,
          info: { appName: 'SOMOOC' }
        })
      } else {
        reject(err)
      }
    }, 1000)
  })
}
