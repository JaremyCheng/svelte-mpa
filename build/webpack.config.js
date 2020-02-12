const path = require('path');
const { DefinePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const sveltePreprocess = require('svelte-preprocess');
const ProcessBarPlugin = require('progress-bar-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { mode, isProd, CDN_PATH } = require('./config');
const { getEntries, multiHtmlPlugin, resolvePath } = require('./utils');
module.exports = function(env) {
  const entry = getEntries();

  const htmlPlugins = multiHtmlPlugin(entry);

  const config = {
    entry,
    resolve: {
      alias: {
        '@': resolvePath('src'),
      },
      extensions: ['.mjs', '.js', '.svelte'],
    },
    output: {
      publicPath: CDN_PATH,
      path: resolvePath('dist'),
      filename: 'public/js/[name].[chunkhash].js',
      chunkFilename: 'public/js/[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          // https://github.com/sveltejs/svelte/issues/717
          test: /\.m?js$/,
          exclude: /node_modules\/(?!svelte)/,
          use: 'babel-loader',
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules\/(?!svelte)/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'svelte-loader',
              options: {
                emitCss: true,
                hotReload: true,
                preprocess: sveltePreprocess({
                  postcss: true,
                }),
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            /**
             * MiniCssExtractPlugin doesn't support HMR.
             * For developing, use 'style-loader' instead.
             * */
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'public/img/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'public/media/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'public/fonts/[name].[hash:7].[ext]',
          },
        },
      ],
    },
    mode,
    plugins: [
      new ProcessBarPlugin(),
      new DefinePlugin({
        'process.env.NODE_ENV': mode,
      }),
      new MiniCssExtractPlugin({
        filename: 'public/css/[name].[contenthash].css',
      }),
      new CopyPlugin([{ from: './public/static', to: './public/static' }]),
      new DashboardPlugin(),
      ...htmlPlugins,
      ...(isProd ? [new CleanWebpackPlugin()] : []),
      ...(env && env.analyze
        ? [
            new BundleAnalyzerPlugin({
              analyzerMode: 'static',
              openAnalyzer: !!(env && env.analyze),
            }),
          ]
        : []),
    ],
    stats: 'errors-only',
    devtool: isProd ? false : 'source-map',
    devServer: {
      // quiet: true,
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 9000,
      open: false,
    },
  };

  return config;
};
