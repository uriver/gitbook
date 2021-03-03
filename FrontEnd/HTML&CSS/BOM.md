# 浏览器对象模型

> 浏览器对象模型(BOM)指的是由**Web浏览器暴露的所有对象**组成的表示模型。 BOM与DOM不同，其既没有标准的实现，也没有严格的定义, 所以浏览器厂商可以自由地实现BOM。 作为显示文档的窗口, 浏览器程序将其视为对象的分层集合。 当浏览器分析文档时, 它将创建一个对象的集合, 以定义文档, 并详细说明它应如何显示。

参考文章：[梳理下浏览器对象模型知识（BOM）]('https://juejin.cn/post/6844903576859328526')

web浏览器暴露的对象主要有：
- window
- navigator
- location
- history
- screen
- document

比较实用的几个属性：
- window.scrollTo(x, y)
- window.onload
- window.onresize
- location protocol + host + pathname + port
- location href search
- location reload() replace()
- history back() forward() go()
- navigator geolocation userAgent