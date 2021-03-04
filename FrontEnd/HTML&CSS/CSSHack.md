# CSS Hack

不同的浏览器对 CSS 的解析结果是不同的，因此会导致相同的 CSS 输出的页面效果不同，这就需要 CSS hack来解决浏览器局部的兼容性问题。

CSS hack是通过在CSS样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，CSS hack 就是让你记住这个标准），以达到应用不同的 CSS 样式的目的，比如 .kwstu{width:300px;_width:200px;}，一般浏览器会先给元素使用 width:300px; 的样式，紧接着后面还有个_width:200px; 由于下划线 _width 只有 IE6 可以识别，所以此样式在 IE6 中实际设置对象的宽度为200px，后面的把前面的给覆盖了，而其他浏览器不识别 _width 不会执行 _width:200px; 这句样式，所以在其他浏览器中设置对象的宽度就是 300px;

简单地讲， CSS hack 指各版本及各品牌浏览器之间对 CSS 解释后出现网页内容的误差(比如我们常说错位)的处理。由于各浏览器的内核不同，所以会造成一些误差就像 JS 一样，一个 JS 网页特效，在微软 IE6、IE7、IE8 浏览器有效果，但可能在火狐（Mozilla Firefox）谷歌浏览器无效，这样就叫做 JS hack ，所以我们对于 CSS 来说他们来解决各浏览器对 CSS 解释不同所采取的区别不同浏览器制作不同的 CSS 样式的设置来解决这些问题就叫作 CSS Hack。

因为在日常开发中用不到针对浏览器的hack，目前只需要记住最常用的针对安卓/iOS的hack即可：

```
.cls {
    width: 100px;
    height: 100px;
    @supports not (-webkit-overflow-scrolling: touch) {
        height: 80px;
    }
}

.cls {
    width: 100px;
    height: 100px;
}

@supports not (-webkit-overflow-scrolling: touch) {
    .cls {
        height: 80px;
    }
}

```