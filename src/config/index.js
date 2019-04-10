/* 项目的配置 */
// 一般来说生产环境跟开发环境的地址是不一致的，这样就可以根据项目环境的不同调用不同的地址
// 如果前端启用了代理，则第二个开发环境的地址可以是''(空字符串)
export const baseURL = process.env.NODE_ENV === 'production'
  ? 'http://production.com'
  : '' // 使用了代理
