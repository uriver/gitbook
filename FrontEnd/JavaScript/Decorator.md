# 装饰器

装饰器跟HOC有点像，可以看成将一个对象/对象属性作为参数传入一个方法，对传入的对象/对象属性进行修改装饰。

与HOC的区别是：

For all practical reasons, decorators and HOC's do the same thing.

One major difference is that, once you add a decorator, the property/class can only be used in it's decorated form. HOC pattern leaves higher order as well as the lower order components available for use.

## 语法

以下是给类装饰 / 给类属性装饰的代码，其实也挺简单的：

```
// 使用装饰器给Person增加showAge方法
const showAge = (targetClass) => {
    targetClass.prototype.showAge = function() {
        console.log(this.age);
    };
};

// 传入参数
const language = (lan) => (tragetClass) => {
    tragetClass.prototype.language = lan;
};

// 对类属性装饰
function readonly(target, name, descriptor) {
    console.log(target, name, descriptor);
    descriptor.writable = false;
    return descriptor;
}

const showTime = (target, name, descriptor) => {
    const func = descriptor.value;
    if (typeof func === 'function') {
        descriptor.value = function(...args) {
            console.time();
            const result = func.apply(this, args);
            console.timeEnd();
            return result;
        };
    }
};

@language('chinese')
@showAge
export default class Person {
    [x: string]: any; // 使用装饰器给Person增加showAge方法
    name: string;
    age: number;
    @readonly species = 'human';

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    @showTime
    showName() {
        console.log(this.name);
    }
}
```