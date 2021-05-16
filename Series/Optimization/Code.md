# 代码优化

## 减小JS体积
1. code splitting
2. tree shaking

## 减少主线程工作量
1. 避免长任务
2. 避免超过1kb的行间脚本
3. 使用rAF和rIC进行时间调度

## 对象优化（主要是针对V8优化，这块重要性不高）
1. 对象初始化，参数顺序保持一致
```
// bad case
const car1 = {color: 'red'};
car1.seats = 4;
const car2 = {seats: 4};
car2.color = 'blue';

// goods case
const car1 = {color: 'red'};
car1.seats = 4;
const car1 = {color: 'blue'};
car1.seats = 2;
```

2. 实例化后，尽量不再添加属性
```
const car1 = {color: 'red'}; // In-object属性
car1.seats = 4; // Normal/Fast属性，存储在property store里，需要通过描述数组间接查找
```

3. 使用Array替代array-like对象  
array-like：比如arguments  
```
// bad case - 类数组遍历
Array.prototype.forEach.call(arrObj, (value, index) => {
    console.log(`${index}`:`${value}`)
})

// good case - 转换为数组遍历
// 转换的代价更小
const arr = Array.prototype.slice.call(arrObj, 0);
arr.forEach((value, index) => {
    console.log(`${index}`:`${value}`)
})
```

4. 避免读取超过数组长度（obj也是对象，越界的值会沿原型链进行查找，影响性能）

5. 避免元素类型转换

## HTML优化
1. 减少iframe使用，非要用的时候使用setAttribute('src', 'url')延迟加载
2. 压缩空白符
3. 避免节点深层次嵌套（节点约深，占用内存越多）
4. 避免table布局
5. css/js尽量外链
6. 删除元素默认属性

## CSS优化
1. 降低CSS对渲染的阻塞（如一开始只加载首屏css）
2. 利用GPU完成动画（单独抽一个层）
3. **使用contain属性**（告诉浏览器，子元素的变化不会影响到外部的变化，不会导致外部元素的回流）
4. font-display属性