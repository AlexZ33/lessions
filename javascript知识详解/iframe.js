/*
 * @Author: your name
 * @Date: 2021-11-17 14:37:57
 * @LastEditTime: 2021-11-17 14:38:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /lessions/javascript知识详解/iframe.js
 */

let iframe = document.createElement('iframe');
iframe.src = path;
iframe.style.display = 'none';

document.body.appendChild(iframe);

const timer = setInterval(() => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
    document.body.removeAttribute(iframe);
            clearInterval(timer);
            resolve('success');
        }
}, 1000);