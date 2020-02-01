# svelte-web

#### TODO
- 目录整理(组件目录)
- 构建删除dist文件
- html-webpack-plugin引入TDK + TDK配置问题
- 构建definePlugin
- 构建图片压缩接入
- 构建打印优化
- 构建文件拆分为目录

#### FINISH
- CDN_PATH
- extra Css
- Analyzer
- devServer

#### 自带
- Eslint
- Svelte-preprocess

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
yarn analyze
# or
npm run analyze
```

## Preprocess

Preprocess is the most interesting API of svelte. Therefore, [svelte-preprocess](https://github.com/kaisermann/svelte-preprocess) is included in the project. Postcss is essential for autoprefixer. Other style preprocessers, like sass, could be setted by yourself. 

## How to integate with vscode?

[OFFICAL INTEGRATIONS](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md)
