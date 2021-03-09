# 手写Promise

### 盲写版本：
```
new Promise((res, rej) => {})

function Promise(callback) {
    let state = 'pending';
    const res = function(data) {
        state = 'resolved';
        return data;
    }
    const rej = function(data) {
        state = 'reject';
        throw data;
    }
    callBack(res, rej);
}

Promise.prototype.then = function(fun) {

}

// 1. 怎么链式调用then
// 2. then方法应该怎么实现
```

### 同步版本
盲写版本完全忽略了这是个构造函数（**太久没用原型链了得去复习了**），then其实是返回得实例得一个方法，`new Promise().then`就是调用new Promise这个实例的then方法。
```
function PromiseSync(callback) {
    let that = this;
    that.status = 'pending';
    // resolve - value
    that.value = null;
    // reject - reason
    that.reason = null;

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'success';
            that.value = value;
        }
    };

    function reject(reason) {
        if (that.status === 'pending') {
            that.status = 'reject';
            that.reason = reason;
        }
    };

    callback(resolve, reject);
}

PromiseSync.prototype.then = function(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onReject = typeof onReject === 'function' ? onReject : error => { throw error };

    if (this.status === 'success') {
        onFulfilled(this.value);
    }

    if (this.status === 'reject') {
        onReject(this.reason);
    }
}
```
以上是个同步版本，在new Promise的时候调用异步时then里面就什么都拿不到了

### 异步版本
看到Promise.then的时候往往有个误区，**总是认为.then是在resolve/reject后执行的**。

实际上可以把流程理解为（以resolve为例）：

```
function resolve(value) {
    if (this.status === 'success') {
        // 调用.then中的方法
    }
}
```

**.then 不过是把写在方法中的回调，抽出来做了链式调用。它本质上还是在原方法中进行回调。**

**异步时，.then是优先于resolve/reject方法执行的**

```
function PromiseAsync(callback) {
    let that = this;
    that.status = 'pending';
    that.value = null;
    that.reason = null;
    // 用数组是因为可能存在多个.then方法
    that.onSuccessCallback = [];
    that.onRejectCallBack = [];

    function resolve(value) {
        if (that.status === 'pending') {
            that.status = 'success';
            that.value = value;
            that.onSuccessCallback.forEach(item => item(value));
        }
    };

    function reject(reason) {
        if (that.status === 'pending') {
            that.status = 'reject';
            that.reason = reason;
            that.onRejectCallBack.forEach(item => item(reason));
        }
    };

    callback(resolve, reject);
}

PromiseAsync.prototype.then = function(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onReject = typeof onReject === 'function' ? onReject : error => { throw error };

    if (this.status === 'success') {
        onFulfilled(this.value);
    } else if (this.status === 'reject') {
        onReject(this.reason);
    } else if (this.status === 'pending') {
        this.onSuccessCallback.push(onFulfilled);
        this.onRejectCallBack.push(onFulfilled);
    }
}

// 测试方法
new PromiseAsync((r) => {
    setTimeout(() => {r(100)}, 1000);
}).then(re => console.log(re));
```

### 链式调用

链式调用的核心是`.then`返回一个新的对象

```
PromiseAsync.prototype.then = function(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data;
    onReject = typeof onReject === 'function' ? onReject : error => { throw error };

    // 1. 每次调用.then方法的时候返回一个新的Promise对象，此时的新对象value为null，status为pending
    let promiseBack = new PromiseAsync((resolve, reject) => {
        if (this.status === 'pending') {
            this.onSuccessCallback.push((value) => {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(value);   // 可能返回值，也可能返回一个新的Promise对象
                        // 2. 假设onFulfilled此时返回一个Promise对象，调用result.then(resolve, reject)，目的是：
                        // 2.1 该返回的Promise对象不是链式调用中【1】新生成的Promise对象，是个独立的对象
                        // 2.2 该对象构造方法执行结束后，状态会变为fulfilled/rejected，value会变为最新的value
                        // 2.3 但是，此时【点1】中用于链式调用的新Promise对象，它的值还是null
                        // 2.4 因此，需要同过resolve/reject方法，改变【1】中的数据状态和值
                        // 2.5 result.then(resolve, reject)，在返回的Promise对象中调用【1】中的方法，给resolve/reject传入value，改变【1】中Promise对象的值
                        // 2.6 此时，链式调用的Promise对象数值得到更新，可以进行下一步
                        resolveBack(promiseBack, result, resolve, reject);
                    } catch (error) {
                        reject (error);
                    }
                })
            })

            this.onRejectCallBack.push((reason) => {
                setTimeout(() => {
                    try {
                        let result = onReject(reason);
                        resolveBack(promiseBack, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
                
            })
        }

        if (this.status === 'success') {
            setTimeout(() => {
                let result = onFulfilled(this.value);
                resolveBack(promiseBack, result, resolve, reject);
            })
        }

        if (this.status === 'reject') {
            setTimeout(() => {
                let result = onReject(this.reason);
                resolveBack(promiseBack, result, resolve, reject);
            })
        }
    })

    return promiseBack;
}

function resolveBack(promiseBack, result, resolve, reject) {
    if (!(result instanceof PromiseAsync)) {
        resolve(result);
    } else {
        if (result !== promiseBack) {
            result.then(resolve, reject);
        } else {
            reject('error');
        }
    }
}
```

链式调用的难点在于理解result.then(resolve, reject)，关于这个的理解写在注释里面了，【没有经过他人讨论和验证，未必理解正确，但能够正常执行Promise功能】

### Promise.catch
```
// 注意catch的参数是function
PromiseAsync.prototype.catch = function(errFun) {
    this.then(null, errFun);
}

new PromiseAsync((resolve, reject) => {
    reject('error')
}).catch((err) => console.log(err))
```

### Promise.resolve / Promise.reject
```
PromiseAsync.resolve = function(val) {
    return new PromiseAsync((rs, _) => rs(val));
}

PromiseAsync.reject = function(val) {
    return new PromiseAsync((_, rj) => rj(val));
}
```

### Promise.all / Promise.race
```
PromiseAsync.all = function(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('请传入数组');
    }
    return new PromiseAsync((resolve, reject) => {
        try {
            let resultArr = [];
            const length = arr.length;
            for (let i = 0; i < length; i++) {
                arr[i].then(data => {
                    resultArr.push(data);
                    if (resultArr.length === length) {
                        resolve(resultArr);
                    }
                }, reject);
            }
        } catch(error) {
            reject(error);
        }
    })
}

PromiseAsync.race = function(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('请传入数组');
    }
    return new PromiseAsync((resolve, reject) => {
        try {
            for(let i = 0; i < arr.length; i++) {
                arr[i].then(resolve, reject);
            }
        } catch(error) {
            reject(error);
        }
    })
}
```

理解链式调用后，后面的catch、resolve、reject、all、race就很好理解了。