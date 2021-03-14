const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './server/public'),
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
