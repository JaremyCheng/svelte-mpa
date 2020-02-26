# svelte-mpa

## Development

```shell
npm run dev
```

Each page url: `http://localhost:9000/${moduleDirName}.html`.

## Build

```shell
npm run build
```

## Analyze

```shell
npm run analyze
```

## Preprocess

Preprocess is the most interesting API of svelte. Therefore, [svelte-preprocess](https://github.com/kaisermann/svelte-preprocess) is included in the project. Postcss is essential for autoprefixer. Other style preprocessers, like sass, could be setted by yourself. 

## How to integate with vscode?

[OFFICAL INTEGRATIONS](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md)

#### TODO
- 构建打印优化
- browserSync
- CSS Module

#### FINISH
- CDN_PATH
- extra Css
- Analyzer
- devServer
- 目录整理(组件目录)
- 构建删除dist文件
- html-webpack-plugin引入TDK + TDK配置问题
- DefinePlugin, webpack-dashboard
- Eslint
- Svelte-preprocess

#### 问题记录
- less限定为3.9.0版本,最新3.10.1的less会报错
- svelte-loader版本需>=2.13.5, 解决onwarn无法注入问题
- 解决兼容IE9+ 同时出现的问题:Class constructor Component cannot be invoked without 'new'
