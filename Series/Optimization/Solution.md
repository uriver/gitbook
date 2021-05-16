# 前沿优化方案

## 移动端图标SVG

## Flexbox
1. 更高性能（可以通过devtools performance来查看）

## 资源加载顺序
1. preload
2. prefetch

## 预渲染
Pre-rendering
打包时提前渲染页面，没有服务端参与（跟预加载是不同的） 
预渲染在构建的时候就拿到了页面结构，加载时能够秒展示，但是css还需要解析加载，可能会导致屏幕闪动，因此可以内联首屏css

## Windowing 窗口化
原理：只在页面上渲染用户能看到的列表，减少DOM元素数量
插件：react-window，学学思路就好了

## 骨架组件减少布局移动（layout shift）