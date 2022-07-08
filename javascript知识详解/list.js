/*
 * @Author: your name
 * @Date: 2021-11-17 14:46:06
 * @LastEditTime: 2021-11-17 14:46:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/list.js
 */
function list() {
    this.dataStore = []; //初始化数组
    this.clear = clear; //清除列表
    this.remove = remove; //移除列表中的元素
    this.find = find; //寻找列表中的元素
    this.length = length; //返回列表的长度
}

function find(element) {
    for (var i = 0, len = this.dataStore.length; i < len; i++) {
        if (this.dataStore[i] === element) {
            return i;
        }
    }
    return -1;
}

function remove(element) {
    for (var i = 0, len = this.dataStore.length; i < len; i++) {
        if (this.dataStore[i] === element) {
            this.dataStore.splice(i, 1);
        }
    }
    return this.dataStore;
}

function length() {
    return this.dataStore.length;
}

function clear() {
    this.dataStore = [];
}