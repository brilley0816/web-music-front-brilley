const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        // NODE_HOST: '"http://192.168.50.77:8027"',
        NODE_HOST: '"http://192.168.50.77:8056"',
      });
      return definitions;
    });
  }
})
