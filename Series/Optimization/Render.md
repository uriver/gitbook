# 渲染优化

## 输入url后的流程

## 回流
1. 如果想改变元素宽度/位置等，不直接修改dom的left/width等，而是优先用transform，transform不会导致回流，它直接在复合composite阶段生效

## 高频事件防抖
**requestAnimationFrame - rAF**  
[相关文章]("https://zhuanlan.zhihu.com/p/31877690")

rAF 大概描述：
1. setTimeout/setInterval的动画是不靠谱的（js单线程阻塞）
2. requestAnimationFrame不需要设置时间间隔，只跟浏览器和屏幕刷新频率有关
3. requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

```
window.requestAnimationFrame(() => {
    changeWidth(pos)
})
```

## react时间调度(fiber)
https://juejin.cn/post/6844903808762380296


## 零碎知识点
1. 这里引入了composite复合阶段，类似与ps的图层，**将页面拆分为多个图层进行绘制**
2. 引起复合的css属性：transform opacity
3. 观察是否回流/重绘：tools - rendering - Paint flashing
4. will-change: true 告诉浏览器，将元素提交到单独的图层（图层不能过多）