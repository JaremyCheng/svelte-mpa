module.exports = {
  presets: [
    // 解决: Class constructor Component cannot be invoked without 'new'
    // https://github.com/vadimdemedes/ink/issues/37
    // TODO 优化babel-polyfill
    ['@babel/preset-env', {
      targets: {
        "browsers": [
          "> 1%",
          "ie >= 9",
          "last 2 versions"
        ]
      }
    }],
  ]
};
