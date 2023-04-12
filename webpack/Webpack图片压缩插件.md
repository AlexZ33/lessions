# Webpack图片压缩插件

这是一个在打包构建过程中自动压缩项目所依赖图片的webpack插件（通过https://tinypng.com/网站）你可以通过配置在控制台查看具体的压缩信息，同时你也可以控制压缩图片时的并发请求数

[npm: Webpack-Image-Compress-Plugin ](https://www.npmjs.com/package/webpack-image-compress-plugin)

# 使用

```
npm i webpack-image-compress-plugin --save-dev
```

```

const WebpackImageCompressPlugin = require('webpack-image-compress-plugin')
module.exports = {
  //... 其它配置
  configureWebpack: {
    plugins: [
      new WebpackImageCompressPlugin({
        log: true, // 布尔值  是否在控制台打印压缩信息，默认为true
        compress: process.env.NODE_ENV === "production", // 布尔值  是否压缩图片 默认为true
        concurrency: 20, // 整数  请求并发数 默认为20
        minSize: 1024 * 10, // 整数  图像压缩的最小尺寸 （默认 10k）
        maxSize: 1024 * 100 // 整数  图像压缩的最大尺寸 （默认无限制）
      })
    ]
  }
}
```