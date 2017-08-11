## 双向数据绑定原理(三种实现方式)

### 脏检查  

我们说Angularjs（这里特指AngularJS 1.x.x版本，不代表AngularJS 2.x.x版本）双向数据绑定的技术实现是脏检查，大致的原理就是，   Angularjs内部会维护一个序列，将所有需要监控的属性放在这个序列中，当发生某些特定事件时（注意，这里并不是定时的而是由某些特殊事件触发的），Angularjs会调用 $digest 方法，这个方法内部做的逻辑就是遍历所有的watcher，   对被监控的属性做对比，对比其在方法调用前后属性值有没有发生变化，如果发生变化，则调用对应的handler。  网上有许多剖析Angularjs双向数据绑定实现原理的文章，比如 这篇 ，再比如 这篇 ，等等。  这种方式的缺点很明显，遍历轮训watcher是非常消耗性能的，特别是当单页的监控数量达到一个数量级的时候。 

### 观察机制  

  Object.observe()带来的数据绑定变革 ，说的就是使用ECMAScript7中的 Object.observe 方法对对象 .
（或者其属性）进行监控观察，一旦其发生变化时，将会执行相应的handler。是目前监控属性数据变更最完美的一种方法，语言（浏览器）原生支持，没有什么比这个更好了。唯一的遗憾就是目前支持广度还不行，有待全面推广。  

### 封装属性访问器  

国产mvvm框架vue.js实现数据双向绑定的原理就是属性访问器。  它使用了ECMAScript5.1（ECMA-262）中定义的标准属性 Object.defineProperty 方法。针对国内行情，

部分还不支持 Object.defineProperty 低级浏览器采用VBScript作了完美兼容，不像其他的mvvm框架已经逐渐放弃对低端浏览器的支持


这里我们就写个属性访问器实现的双向数据绑定  


```
<!DOCTYPE html>  
<html>  
    <head>  
        <meta charset="UTF-8">  
        <title>双向数据绑定原理(三种实现方式)</title>  
    </head>  
    <body>  
        <input type="text" id="a" />  
        <span id="b"></span>  
	<script>  
          
            //封装属性访问器  
            //Object.defineProperty(obj, prop, descriptor)  
            //obj ，待修改的对象  
            //prop ，带修改的属性名称  
            //descriptor ，待修改属性的相关描述  
            var obj = {};  
            Object.defineProperty(obj,'a',{  
                set:function(newVal){  
                    document.getElementById('a').value = newVal;  
                    document.getElementById('b').innerHTML = newVal;  
                }  
            });  
              
            document.addEventListener('keyup',function(e){  
                obj.a = e.target.value;  
            });  
              
              
        </script>  
          
    </body>  
</html>  
        

```




# 分析
```
	var obj = {};
   	Object.defineProperty(obj,"userName",{
   		get:function() {
                  console.log('get init');
   		},
   		set:function() {
   		  console.log('set init');	
   		}
   	});

   	document.getElementById("userName").addEventListener("keyup",function(event) {
       document.getElementById("uName").innerHTML = event.target.value;
   	})
```

object.defineProperty() 的第二个参数，是给第一个参数obj新定义的属性（字段）

当我们对它重新赋值时候会自动 触发set方法

![](http://osgp88fat.bkt.clouddn.com/javascript/2017-08-11%2021-24-55%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)

同样我们获取obj.username时候 自动触发get方法


所以这里我们可以把代码改成 

```

var obj = {};
   	Object.defineProperty(obj,"userName",{
   		get:function() {
                  console.log('get init');
   		},
   		set:function(val) {
   		  console.log('set init');
                   document.getElementById("uName").innerHTML = val;	
   		}
   	});

   	document.getElementById("userName").addEventListener("keyup",function(event) {
            obj.userName = event.target.value;  
   	})

```

`obj.userName = event.target.value; ` 我们直接把输入的value赋值给obj.userName , 一旦赋值就会触发set方法，因此我们就可以在set方法内写一些操作，比如这里
` document.getElementById("uName").innerHTML = val;` 


![](http://osgp88fat.bkt.clouddn.com/javascript/2017-08-11%2021-39-50%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)










































		
