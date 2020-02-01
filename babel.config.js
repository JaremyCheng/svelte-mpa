module.exports = {
  presets: [
    // 解决ES6 classes不使用new的问题
    // https://github.com/vadimdemedes/ink/issues/37
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
