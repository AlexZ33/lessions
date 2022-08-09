/*
 * @Author: AlexZ33 775136985@qq.com
 * @Date: 2022-08-09 15:32:22
 * @LastEditors: AlexZ33 775136985@qq.com
 * @LastEditTime: 2022-08-09 15:34:04
 * @FilePath: /react/isMaker.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 没错，就是一个生成器，生成器本身是一个函数，也就是说在 JavaScript 中协程是由一个生成器函数实现的。
function * idMaker() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

let gen = idMaker(); // "Generator { }"

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
