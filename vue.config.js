const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   proxy: {
  //     '': { //   若请求的前缀不是这个'/api'，那请求就不会走代理服务器
  //       target: 'http://192.168.1.19:8015', //这里写路径 
  //       pathRewrite: {
  //         '^': ''
  //       }, //将所有含/api路径的，去掉/api转发给服务器
  //       ws: true, //用于支持websocket
  //       changeOrigin: true //用于控制请求头中的host值
  //     },
  //   }
  // }
})
module.exports = {
  publicPath: './',
}





module.exports = defineConfig({
  devServer: {
    host: 'localhost',
    // https:true,
    port: 6103,
    client: {
      webSocketURL: 'ws://localhost:6103/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
})
