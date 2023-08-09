const { defineConfig } = require('@vue/cli-service')
// https://blog.csdn.net/qq_54693844/article/details/127772244
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
})
