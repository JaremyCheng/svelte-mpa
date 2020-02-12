const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';
// CDN路径配置
const CDN_PATH = isProd ? './' : '';

module.exports = {
  mode,
  isProd,
  CDN_PATH,
};
