# Html资源加载

主要问题：**JS 和 CSS 的位置对资源加载顺序的影响**

1. **CSS异步加载**（不阻塞）
2. **JS同步加载**（阻塞）

### 放置顺序

CSS 放置于`<head>`标签中  

1. 要是页面在无CSS渲染下先加载HTML的话将会面目全非，样式先行的话在加载HTML内容时可以同时渲染样式

2. CSS 不会阻塞后续 DOM 结构的解析，不会阻塞其它资源(如图片)的加载，但是会阻塞 JS 文件的加载。

JS 放置于`</body>`标签之前、body标签中html内容的后面  
1. 为了提高页面渲染的速度效率。浏览器在加载`<script>`元素内部的JS代码将被从上至下依次解释，解释器对`<script>`元素内部所有代码求值完毕之前，会阻塞其他资源的加载，页面的其余内容都不会被浏览器加载显示，如果放置在前面其他位置，会对页面内容的加载速度产生影响。

2. JS 会阻塞后续 DOM 解析以及其它资源(如 CSS，JS 或图片资源)的加载。

### PreLoad / PreFetch

参考：[使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)

```
<!-- 使用 link 标签静态标记需要预加载的资源 -->
<link rel="preload" href="/path/to/style.css" as="style">

<!-- link 模式 -->
<link rel="prefetch" href="/path/to/style.css" as="style">
```

preload 提前加载，当浏览器解析到这行代码就会去加载 href 中对应的资源但不执行，待到真正使用到的时候再执行

prefetch 预判加载，它的作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其它页面等则相当于提前预加载了需要的资源。

preload加载一定会用到的资源，prefetch加载可能会用到的资源。

### Script defer/async

当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。

依旧参考文章 [使用 Preload/Prefetch 优化你的应用](https://zhuanlan.zhihu.com/p/48521680)

完美结构
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Faster</title>
  <link rel="dns-prefetch" href="//cdn.com/">
  <link rel="preload" href="//js.cdn.com/currentPage-part1.js" as="script">
  <link rel="preload" href="//js.cdn.com/currentPage-part2.js" as="script">
  <link rel="preload" href="//js.cdn.com/currentPage-part3.js" as="script">

  <link rel="prefetch" href="//js.cdn.com/prefetch.js">
</head>

<body>
  <script type="text/javascript" src="//js.cdn.com/currentPage-part1.js" defer></script>
  <script type="text/javascript" src="//js.cdn.com/currentPage-part2.js" defer></script>
  <script type="text/javascript" src="//js.cdn.com/currentPage-part3.js" defer></script>
</body>
</html>
```
首先，Parser在遇到head中preload时开始下载JS，读到script标签的时候，如果已经下载完了，直接按顺序执行之。如果没下载完，则会等到下载完再执行。这样就可以在刚进入页面时开始非阻塞的下载JS代码了。

其次，页面会在空闲时，加载prefetch的JS，如果之后页面发生跳转，跳转的目标页面引入了prefetch.js，浏览器会直接从disk缓存中读取执行。

将script标签依然放在`</body>`之前，并增加defer标签，确保老浏览器兼容，并在所有DOM元素解析完成之后执行其中的代码。

### 其他
- 如果一个script标签上面即存在defer属性，也存在async属性，async优先级更高