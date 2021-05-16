# 闭包

> A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables — a scope chain
The closure has three scope chains:  
it has access to its own scope — variables defined between its curly brackets  
it has access to the outer function’s variables  
it has access to the global variables  

## closure in module

**What's module: Though Javascript has Module grammar, it in essence uses function to achieve that.**  

Webpack pack modules to functions.

```
// module A
export default function A() {}

// use module A in module App
import A from './A';
export default function App() {
    ...
    return (
        <A />
    )
}

```

Above is module grammar in Javascript, but when it translates to ES5 code, modules translate into functions:

```
// a module is a self-executing function which wrap child function(s).
AModule = (function(){
    return function A() {}
})()

// App module import AModule:
AppModule = (function() {
    const FunA = AModule;
    return function App() {
        return FunA();
    }
})()

```

