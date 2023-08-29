const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// https://blog.csdn.net/qq_54693844/article/details/127772244
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true
      },
      '/test': {
        target: 'http://192.168.0.129:3000',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()

      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
