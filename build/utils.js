const path = require('path');
const globby = require('globby');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TDK = require('./tdk');
const { isProd } = require('./config');
exports.resolvePath = function resolvePath(filePath) {
  return path.resolve(__dirname, '../', filePath);
};

exports.getEntries = function getEntries() {
  try {
    const entries = {};
    const allEntry = globby.sync('src/modules/**/main.js');
    allEntry.forEach(entry => {
      const res = entry.match(/src\/modules\/(\w+)\/main\.js/);
      if (res.length) {

        // 解决: Class constructor Component cannot be invoked without 'new'
        // https://github.com/vadimdemedes/ink/issues/37
        // TODO 优化babel-polyfill
        entries[res[1]] = ["babel-polyfill", `./${entry}`];
      }
    });
    return entries;
  } catch (error) {
    console.error('File structure is incorrect for MPA', error);
  }
};

exports.multiHtmlPlugin = function multiHtmlPlugin(entries) {
  // html-webpack-plugin版本固定为3.0.7, 处理编译时Entrypoint = undefined问题
  // https://github.com/jantimon/html-webpack-plugin/issues/895
  const pageNames = Object.keys(entries);
  return pageNames.map(name => {
    const tdkSetting = TDK[name] || {};
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: './public/index.html',
      chunks: [name],
      ...tdkSetting,
      minify: isProd
        ? {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true,
          }
        : true,
    });
  });
};
