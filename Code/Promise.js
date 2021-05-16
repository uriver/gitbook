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

    let promiseBack = new PromiseAsync((resolve, reject) => {
        if (this.status === 'pending') {
            this.onSuccessCallback.push((value) => {
                setTimeout(() => {
                    try {
                        let result = onFulfilled(value);   // 可能返回值，也可能返回一个新的promise对象
                        // 假设onFulfilled此时返回一个Promise容器
                        // result.then(resolve, reject);
                        // result（then的回调里面使用resolve、reject可以控制本对象的值）
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

PromiseAsync.prototype.catch = function(err) {
    this.then(null, err);
}

PromiseAsync.resolve = function(val) {
    return new Promise((rs) => rs(val));
}

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

function timeOut(val) {
    setTimeout(() => {
        return val;
    }, 500);
}

new PromiseAsync((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 1000);
}).then(res => {
    console.log(res);
    return new PromiseAsync((resolve, reject) => {
        setTimeout(() => {
            resolve(456);
        }, 1000);
    }).then((s) => resolve(s))
}).then(res => {
    console.log(res);
    setTimeout(() => {
        console.log(789)
        return 789;
    }, 1000);
})