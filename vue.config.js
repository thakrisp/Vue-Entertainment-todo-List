const path = require('path');

module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server',
    },
  },
  /*   outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    Proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  }, */
};
