# BFC

Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是**页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用**。

BFC 则是块级元素格式化上下文，FC中的一种。具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

### 触发方式
只讲最常用的：
- 使用**overflow: auto**或者设置其他的非默认的 overflow: visible 的值。
- 使用**display: flow-root**

**flow-root**：一个新的 display 属性的值，它可以创建无副作用的 BFC。在父级块中使用 display: flow-root 可以创建新的 BFC。

### 特性及应用
参考：[10 分钟理解 BFC 原理]('https://zhuanlan.zhihu.com/p/25321647')

1. 同一个 BFC 下外边距会发生折叠 
2. BFC 可以包含浮动的元素（清除浮动）
3. BFC 可以阻止元素被浮动元素覆盖

