协议、域名、端口号任意一个不同就会发生跨域

[ajax跨域请求](http://jxdxsw.com/2017/02/04/ajax%E8%B7%A8%E5%9F%9F%E8%AF%B7%E6%B1%82/)

# JSONP
利用script标签不受浏览器的同源限制

- 创建一个script标签
- 为script的src属性指定要访问的url,并且带有一个查询字符串，这个查询字符串是一个回调函数
- 后端接收到请求之后，返回这个回调函数作为相应，并传参。
- 浏览器调用回调函数 缺点:只支持get请求
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSONP 跨域</title>
</head>
<body>
    <div id="box">
        
    </div>

    <script type="text/javascript">
        var box = document.querySelector('#box')
        var script = document.createElement('script');
        script.src =  "http://127.0.0.1:3009/api/test?callback=showMsg"
        script.type = "text/javascript"
        document.head.appendChild(script)
        function showMsg(msg) {
            console.log(msg);
            box.innerText = msg.name
        }
    </script>
</body>
</html>
```

#　cors
CORS背后的基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功还是失败
关键是要在服务器端进行配置； 分为两类:

##　简单请求
请求方法是以下三种之一:
- HEAD
- GET
- POST
HTTP头部信息不超出以下几种字段

- Accept
- AceptLanguage
- Content-Language
- Last-Event-ID
- Content-Type:只限于application/x-www-form-urlencoded、mutilipart/form-data、text/plain

###　简单请求步骤:

1.浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin（说明来自哪个源）字段。 
2.服务端检查Origin字段是否在自己的Access-Control-Allow-Origin字段范围内，并做出响应。 
3.如果Origin字段被允许，则浏览器的响应头部中会出现Access-Control-Allow-Origin字段，表明跨域成功

前端代码
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>cors | 跨域</title>
</head>
<body>
    <div id="box">
        
    </div>

    <script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
        crossorigin="anonymous">

       $(function(){
        $.ajax({
            type:"GET",
            url: "http://127.0.0.1:3009/api/test",
            dataType:"json",
          crossDomain:true,
          success:showMsg
        })
       }) 

       function showMsg (data) {
        console.log(data)
        box.innerText = data.name + data.age
       }
    </script>
</body>
</html>
```
后端代码:

```
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//和预检请求有关
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//和预检请求有关
    next();
    });
//处理简单请求
router.get('/test',(req,res,next)=>{
  res.send({
    name:"wolrd",
    age:25
  })
})

```


# 非简单请求
非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE（REST API 中的方法），或者Content-Type字段的类型是application/json。

非简单请求步骤:

1、 在正式请求之前先发送一次预检请求，浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单中，以及可以使用哪些http动词和头部信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。

2、一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样，会有一个Origin头信息字段。服务器的回应，也都会有一个Access-Control-Allow-Origin头信息字段。

前端代码

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>跨域</title>
</head>
<body>
<div id="box"></div>
<script
        src="https://code.jquery.com/jquery-3.1.1.js"
        integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="
        crossorigin="anonymous"></script>
<script>
    $(function (){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:3009/api/test",
            dataType:"json", //接收数据的类型
            data:JSON.stringify({
              name:'hello',
               age:25
           }),
            crossDomain:true,
            success:showMsg
          contentType:"application/json" //发送数据的类型
        })
    })
    function showMsg(data){
        console.log(data)
        box.innerText =data.name+data.age
    }
</script>
</body>
</html>
```

后端代码

```
router.post('/test', function(req,res,next) {
  var data = req.body
  console.log(data)
  res.send({
    name:"wolrd",
    age:25
  })
    })

```


# vue-cli反向代理

```
 proxyTable: {
      '/api':{
        target:'http://localhost:3009/api',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },

```

本地发送请求的时候实际是本地前端项目的地址，比如：本地前端项目的地址是 http://localhost:8080,使用了代理之后，ajax发送的url是/api/reg,则访问的url是http://localhost:8080/api/reg，但被代理之后就相当于http://localhost:3009/api/reg,node虚拟出一个服务器，从目标(http://localhost:3009/api/reg)取信息，前端项目地址和虚拟出来的服务器地址同源，相当于没有跨域
