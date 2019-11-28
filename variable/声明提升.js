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
a. function/var 定义在函数作用域, let/const 定义在块级作用域
b. 函数声明优先级高于变量声明, 不能被变量声明覆盖, 可以被同名函数声明覆盖
c. var 不能覆盖其他声明(覆盖 function 无效, 覆盖 const/let 报错), 可以被自身覆盖
d. let/const 不存在声明提升, 不能覆盖其他声明, 也不能被自身和其他声明覆盖, 否则报错
    * 不能覆盖其他声明: 暂时性死区导致在 let/const 之前不能使用变量, 即不能使用 function/var 先声明, 也就不能覆盖
    * 不能被自身和其他声明覆盖: let/const 变量不能重复声明, 所以不能被覆盖
*/

console.log(a)
if(true) {
// if(false) {
    console.log(a)
    function a () {}
    console.log(a)
}
console.log(a)

// let a 存在暂时性死区
if (true) {
    function a() {}
    let a = 1
}

useEffect(function () {
    fetch(id)
}, [])

 