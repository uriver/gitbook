# REM弹性布局

rem 根元素`<html>`字体大小

### rem布局
```
// 页面宽度 = 100vw
// 视觉稿一般用375pt
// 100vw 分为 375份，便于开发， （100 / 375）为一份，但是这样单位太小了，再乘以100

html {
    // font-size: (100 / 375 * 100)vw;
    font-size: 26.66667vw;
}

.wrapper {
    // 对应视觉稿375pt
    width: 3.75rem;
    // 对应视觉稿12pt
    font-size: .12rem;
}

```