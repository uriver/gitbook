// 使用装饰器给Person增加showAge方法
const showAge = (targetClass) => {
    targetClass.prototype.showAge = function() {
        console.log(this.age);
    }
}

@showAge
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    showName() {
        console.log(this.name);
    }
}