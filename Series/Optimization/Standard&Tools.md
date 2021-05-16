# 优化指标和工具

## 性能指标

## 测量工具
1. 通过Chrome开发者工具，检查network - waterfall
2. Lighthouse
3. 画面帧数监控：command + shift + p，输入frame => frame rate
4. **WebPageTest**

## 测量模型 - RAIL
- Response 用户操作后的反馈时间 50ms内完成
- Animation 动画流畅度 10ms一帧
- Idle 浏览器需要足够的空闲时间（一般和Response反比）运算相关的内容交给后端
- Load 资源加载时间 5s内完成内容加载并且可以交互

## 工具技巧
1. 开发者工具功能检索 - command + shift + p
2. 检测加载的js文件是否冗余：开发者工具 - network request blocking
3. node pref_hook 监控性能工具