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
      filename: 'js/[name].[chunkhash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          // https://github.com/sveltejs/svelte/issues/717
          test: /\.m?js$/,
          // exclude: /node_modules\/(?!svelte)/,
          exclude: /\bcore-js\b/,
          use: 'babel-loader',
        },
        {
          test: /\.svelte$/,
          // exclude: /node_modules\/(?!svelte)/,
          exclude: /\bcor-js\b/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'svelte-loader',
              options: {
                legacy: true,
                emitCss: true,
                hotReload: true,
                preprocess: sveltePreprocess({
                  postcss: true,
                }),
                // Disable css "css-unused-selector" warning #67
                // https://github.com/sveltejs/svelte-loader/issues/67
                onwarn(warning, onwarn) {
                  warning.message === 'Unused CSS selector' || onwarn(warning);
                }
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
            isProd ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            } : 'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]',
          },
        },
      ],
    },
    mode,
    plugins: [
      new ProcessBarPlugin(),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: `'${mode}'`,
          BASE_URL: `'${CDN_PATH}'`
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
      new CopyPlugin(
        [
          {
            from: resolvePath('public/static'),
            to: resolvePath('dist/static'),
            toType: 'dir'
          }
        ]
      ),
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
      compress: true,
      port: 9000,
      open: false,
      host: '0.0.0.0'
    },
  };

  return config;
};
