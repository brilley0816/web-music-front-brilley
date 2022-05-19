const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
<<<<<<< HEAD
        NODE_HOST: '"http://192.168.50.213:8056"',
        // NODE_HOST: '"http://192.168.50.77:8027"',
=======
        NODE_HOST: '"http://192.168.50.77:8056"',
>>>>>>> fed91cdc899c3543e236c28eb8e2c48abe32dbdb
      });
      return definitions;
    });
  }
})
