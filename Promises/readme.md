<!--
 * @Author: your name
 * @Date: 2021-06-21 19:55:49
 * @LastEditTime: 2022-08-09 11:28:13
 * @LastEditors: AlexZ33 775136985@qq.com
 * @Description: In User Settings Edit
 * @FilePath: /lessions/Promises/readme.md
-->

相关文章:

[面试题，实现一个Promise.first()](https://zhuanlan.zhihu.com/p/59316214)

[如何判断对象是Promise](https://zhuanlan.zhihu.com/p/382699039)

# Promise 

Promise 本质是一个状态机，用于表示一个异步操作的最终完成 (或失败), 及其结果值。它有三个状态：

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败
  
最终 Promise 会有两种状态，一种成功，一种失败，当 pending 变化的时候，Promise 对象会根据最终的状态调用不同的处理函数。

# async、await

async、await 是对 Generator 和 Promise 组合的封装, 使原先的异步代码在形式上更接近同步代码的写法,并且对错误处理/条件分支/异常堆栈/调试等操作更友好.



