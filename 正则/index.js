/* 
电话号码前三位规则:
    联通: 186 185 170 156 155 130 131 132
    移动:  139 138 137 136 135 134 178 188 187 183 182 159 158 157 152 150 147
    电信: 189 180 170 153 153
    第一位全是1
		第二位：3 4 5 7 8
		第三位:0 1 2 3 4 5 6 7 8 9
*/

window.onload = function() {
	var oBtn = document.getElementById('btn'),
	   oBtn1 = document.getElementById('btn1'),
	   oInp = document.getElementById("inp"),
	   oInp1 = document.getElementById("inp1");

	   //验证手机号
	   oBtn.addEventListener('click', function() {
	   	var oText = oInp.value,
	   	 re= /^1[34578][0-9]{9}$/;
	   	 alert(re.test(oText))
	   },false)//false表示在冒泡阶段调用事件处理程序

	   // 判断相邻单词是否重复
	   oBtn1.addEventListener('click', function() {
	   	var oText1 = oInp1.value.replace(/^s+|\s+$/g,''),//先去除输入的整个字符串的前后空格
	   	    re = /\b([a-zA-Z]+)[^\w]+\1\b/;//使用\b词边界(词边界是非\w)
	   			alert(re.test(oText1));
	   })
}

/*
\b 元字符匹配单词边界。（这里的单词指的是\w匹配的数字、字母、下划线 ：[a-zA-Z0-9]）
在单词边界匹配的位置，单词字符后面或前面不与另一个单词字符直接相邻。请注意，匹配的单词边界并不包含在匹配中。换句话说，匹配的单词边界的长度为零。
 提示：\b 元字符通常用于查找位于单词的开头或结尾的匹配。
另外："\b"只有在字符组中，它表示的是退格键，即 [a-z\b]
 */