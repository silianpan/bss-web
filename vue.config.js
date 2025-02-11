const path = require('path')
// const fs = require('fs')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/bss/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('vue$', resolve('node_modules/vue/dist/vue.esm.js'))
  },
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    // port: 8888,
    https: false,
    hotOnly: false,
    useLocalIp: true,
    proxy: {
      '/api-bss': {
        target: 'http://127.0.0.1:8088'
        // pathRewrite: {
        //   '^/api-bss': '/api-bss'
        // }
      },
      // pdfjs-viewer
      '/pdfjs': {
        target: `http://127.0.0.1:8008`,
        changeOrigin: true,
        pathRewrite: {
          '^/pdfjs': ''
        }
      },
      // lool start
      '/loleaflet': {
        target: `http://localhost:9980`,
        changeOrigin: true
      },
      '/hosting/discovery': {
        target: `http://localhost:9980`,
        changeOrigin: true
      },
      '/hosting/capabilities': {
        target: `http://localhost:9980`,
        changeOrigin: true
      },
      '/lool': {
        target: `http://localhost:9980`,
        changeOrigin: true
      },
      '/lool/adminws': {
        target: `http://localhost:9980`,
        changeOrigin: true
      }
      // lool end
    },
    before: () => {}
  },
  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
}
