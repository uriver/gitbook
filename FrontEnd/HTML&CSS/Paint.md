# 浏览器渲染机制

### 学习目标
- **doctype概念及作用**
- **浏览器渲染过程**

### doctype及作用
DTD（文档类型定义）是一系列语法规则，告诉浏览器当前是什么文档类型。浏览器根据它决定用什么协议来解析以及切换浏览器模式。  
**doctype用来声明文档类型。**

H5: <!DOCTYPE html>  
H4中有传统模式和严格模式

### 浏览器渲染过程
![RenderTree](https://s3.ax1x.com/2021/02/23/yqbxKO.png)
1. HTML文件解析为DOM树
2. CSS文件解析为CSS树
3. 两者结合形成render树
4. 通过layout确认dom的位置，宽高
5. 绘画
6. 展示