const path = require('path');

module.exports = {
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: './server',
    },
  },
  devServer: {
    proxy: 'http://localhost:5000',
  },
};
