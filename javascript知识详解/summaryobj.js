/*
 * @Author: your name
 * @Date: 2021-11-17 15:07:56
 * @LastEditTime: 2021-11-17 15:07:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/summaryobj.js
 */

const user = { 
    name: 'John Ludwig', 
    gender: 'Male' 
   }
   
   const college = { 
    primary: 'Mani Primary School', 
    secondary: 'Lass Secondary School' 
   }
   const skills = { 
    programming: 'Extreme', 
    swimming: 'Average', 
    sleeping: 'Pro' 
   }
   
   const summary = {...user, ...college, ...skills}

