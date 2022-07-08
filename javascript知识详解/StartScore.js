/*
 * @Author: your name
 * @Date: 2021-11-17 14:45:03
 * @LastEditTime: 2021-11-17 14:45:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/StartScore.js
 */
const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
const start = StartScore(3);
// start => "★★★"