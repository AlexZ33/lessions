/*
 * @Author: your name
 * @Date: 2021-11-17 14:41:37
 * @LastEditTime: 2021-11-17 14:41:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/deepcopy.js
 */
function getType(obj) {
    // 为啥不用typeof? typeof无法区分数组和对象
    if(Object.prototype.toString.call(obj) == '[object Object]') {
    return 'Object';
        }
    
    if(Object.prototype.toString.call(obj) == '[object Array]') {
    return 'Array';
        }
    return 'nomal';
    };
    
    function deepCopy(obj) {
    if (getType(obj) == 'nomal') {
    return obj;
        } else {
    var newObj = getType(obj) == 'Object' ? {} : [];
    for(var key in obj) {
    // 为啥要用hasOwnProperty？不需要从对象的原型链上进行复制
    if(obj.hasOwnProperty(key)) {
                    newObj[key] = deepCopy(obj[key]);
                }
            }
        }
    return newObj;
    }
    
    
    var object = [
      {
    title: 'test',
    checked: false
      }
    ];
    
    deepCopy(object);