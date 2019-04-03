const path = require('path')

const resolve = dir => path.join(__dirname, dir)

// 项目的部署路径  前边表示项目启动时候的根路径地址
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  lintOnSave: true,
  publicPath: BASE_URL, // baseUrl 已经废弃
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 跨域代理
  devServer: {
    port: 8080, // 监听端口号  默认 8080
    // host: 'localhost',
    disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题（vue ui启动控制台还是有警告，用npm启动没有警告）
    open: false, // 配置自动启动浏览器  默认值 false
    proxy: 'http://localhost:3000' // 配置跨域处理,只有一个代理
    // proxy: { // 配置多个代理
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }
  }
}
