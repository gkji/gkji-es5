// 声明提升

/*
1. 声明提升的定义
声明提升就是 js 解释器在执行代码前先在对应作用域中定义所有通过函数声明和变量声明声明的变量的过程

基于实现的解释: 在解析得到 AST 后, 对 AST 树进行遍历, 找到当前作用域所有 声明类型 的节点, 将这些节点表示的变量定义在对应的作用域中(这个是错的)

声明提升的时机: 在第一行代码执行前提升全局作用域中的声明, 块级作用域和函数作用域中的声明在实际代码执行前提升
声明提升并不是在代码执行前全部完成的, 第一次提升的事全局声明, 局部声明是在局部代码执行前进行的
*/

/*
2. 声明的类型
javascript 声明一共有 4 种形式
    function: 不包括函数表达式, 参见函数表达式章节
    var
    let
    const
*/

/*
3. 声明提升需要处理的问题
    * 作用域: 变量应该定义在哪个作用域
    * 优先级: 不同声明方式声明的同名变量按照什么样的规则进行覆盖

针对这两个问题有以下声明提升规则
a. let/const 定义在块级作用域,  function/var 定义在函数作用域
b. 函数声明优先级最高, 可以被同名函数声明覆盖, 不能被变量声明覆盖
c. let/const 优先级次之, 暂时性死区导致在 let/const 之前不能使用变量, 也不能被自身和其他声明覆盖, 否则报错
d. var 优先级最低, 不能覆盖其他声明(覆盖 function 无效, 覆盖 const/let 报错), 可以被自身覆盖
*/

console.log('1', a)
if(true) {
// if(false) {
    console.log('2', a)
    function a () {}
    console.log('3', a)
}
console.log('4', a)

// let a 存在暂时性死区
if (true) {
    function a() {}
    let a = 1
}

// demo 1
function fun() {
    console.log('fun')
}
// 函数声明优先级最高, 可以被同名函数声明覆盖, 不能被变量声明覆盖
console.log('print', fun) // 已经是fun111，提升与覆盖先于执行,不是‘var fun’

function fun() {
    console.log('fun111')
}

fun()

console.log('print fun', fun)

var fun = 'var fun'

console.log('print fun1', fun)

// let fun = 'var fun2' // 执行此段代码，先报这行的错，Uncaught SyntaxError: Identifier 'fun' has already been declared

console.log('print fun2', fun)


// console.log('2==', c, l) // 暂时性死区，TDZ。Script snippet %233:2 Uncaught ReferenceError: Cannot access 'c' before initialization

const c = 'const var'
let l = 'let var'

// var c = 'new c' // has already been declared

// var l = 'new l' // has already been declared

// demo2
console.log('first', f)
// console.log('second', cc) // 报错，const/let没有提升,Script snippet %234:2 Uncaught ReferenceError: Cannot access 'cc' before initialization，同时证明const/let优先级低于函数，否则会先于上一行报错
// console.log('third', v, cc) // 报错，const/let优先级高于var
console.log('third', v) // undefined


function f() {
    console.log('函数')
}

var f = 'var 覆盖function无效'

var v = 'var var'
console.log('fourth', v)

var v = 'var 覆盖自身'

console.log('fifth', v)

const cc = 'const const'

// var cc = 'var cc' // 报错，has been declared
