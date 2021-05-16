# 构建优化

## 知识点
### noParse
直接通知webpack忽略对库的解析，提高构建速度  
这种库不能有import require define等操作  
例如 lodash  

### DllPlugin
将重复的库提取出来，作为类似动态链接库的引用，避免重复构建
例如 react reactDom 

## 性能分析
1. Webpack Chart
2. source-map-explorer
3. bundle-analyser
4. speed-measure-webpack-plugin - 速度分析

## 小技巧

1. tree shaking 的过程中可能处理一些未被引用的，作用于全局的模块（比如全局css），需要在sideEffects中指出
2. @babel/preset-env会把ES6的语法转换掉，为了避免转换成ES5，tree shaking不生效，需要使用modules: false配置
3. 作用域提升也能优化代码，压缩JS
4. webpack的dev prod两种mode 做的事情都能在文档中找到，默认用的插件也行
5. react通过loadable组件进行按需加载
