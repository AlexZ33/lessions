/*
 * @Author: your name
 * @Date: 2021-11-17 15:22:09
 * @LastEditTime: 2021-11-17 15:22:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/ramdomid.js
 */
const RandomId = len => Math.random().toString(36).substr(3, len);
const id = RandomId(10);
// id => "jg7zpgiqva"