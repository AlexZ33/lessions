#! https://zhuanlan.zhihu.com/p/373872159
# 事件触发器
`addEventListener(type,fun,bool)`是监听一个事件，当触发事件时，执行函数，那么什么时候触发事件呢，当监听到dispatchEvent(type)时，触发

`dispatchEvent`是发布事件的意思

# dispatchEvent
在学习three.js源码时候看到这样一段加载vtk文件的代码

```
// 构造函数
THREE.VTKLoader = function () {
    THREE.EventDispatcher.call( this ); // 继承自监听器，使这个类有监听的功能
};

// VTKLoader的原型函数，里面包含了VTKloader的成员函数，成员变量的定义
THREE.VTKLoader.prototype = {
    // 构造函数
    constructor: THREE.VTKLoader,
    // 加载函数，url表示要加载的vtk文件的url路径，callback表示加载完成后要调用的后续处理函数，这里是异步操作，加载需要一个过程，不能将程序阻塞在这里，所以需要异步回调
    load: function ( url, callback ) {
// 将类自身保存在scope中，scope表示域的意思，这里是为了避免this的歧义，因为，每一个地方使用this，其意义不一样。
        var scope = this;
// ajax 异步请求
        var request = new XMLHttpRequest();
// 加载完成的监听器，加载完成后，将调用第二个参数定义的回调函数
        request.addEventListener( 'load', function ( event ) {
            // 对服务器加载下来的数据进行解析，后面详细解释
            var geometry = scope.parse( event.target.responseText );
// 解析完成后，发一个load事件，表示数据解析完成
            scope.dispatchEvent( { type: 'load', content: geometry } );
// 如果设置了回调函数，那么调用回调函数
            if ( callback ) callback( geometry );
        }, false );
// 加载过程中，向自身发送进度progress信息，信息中包含已经加载的数据的字节数和文件总共的字节数，通过两者的百分比能够了解加载进度。
        request.addEventListener( 'progress', function ( event ) {
// 发送正在加载的消息，两个参数分别是已经加载了多少字节，总共多少字节
            scope.dispatchEvent( { type: 'progress', loaded: event.loaded, total: event.total } );
        }, false );
// 加载出错的监听器，加载的过程也可能出错，这里如果出错，进行错误处理，
        request.addEventListener( 'error', function () {
// 加载出错之后需要发布的错误消息，
            scope.dispatchEvent( { type: 'error', message: 'Couldn\'t load URL [' + url + ']' } );

        }, false );
// 初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求。
        request.open( 'GET', url, true );
//发送 HTTP 请求，开始下载
        request.send( null );
},

// parse函数在上面调用过，主要负责解析数据的功能，我们将在后面详细介绍解析函数，这里就不介绍了。
    parse: function ( data ) {
        var geometry = new THREE.Geometry();
        function vertex( x, y, z ) {
            geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        }

        function face3( a, b, c ) {
            geometry.faces.push( new THREE.Face3( a, b, c ) );
        }

        function face4( a, b, c, d ) {
            geometry.faces.push( new THREE.Face4( a, b, c, d ) );
        }

        var pattern, result;

        // float float float

        pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;

        while ( ( result = pattern.exec( data ) ) != null ) {

            // ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]

            vertex( parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), parseFloat( result[ 3 ] ) );

        }

        // 3 int int int

        pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ( ( result = pattern.exec( data ) ) != null ) {

            // ["3 1 2 3", "1", "2", "3"]

            face3( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ) );

        }

        // 4 int int int int

        pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ( ( result = pattern.exec( data ) ) != null ) {

            // ["4 1 2 3 4", "1", "2", "3", "4"]

            face4( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ), parseInt( result[ 4 ] ) );

        }

        geometry.computeCentroids();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();

        return geometry;

    }

}
```
注意这里

```
request.addEventListener( 'load', function ( event ) {

            var geometry = scope.parse( event.target.responseText );

            scope.dispatchEvent( { type: 'load', content: geometry } );

            if ( callback ) callback( geometry );

        }, false );

```

这里event.target.responseText是服务器返回的文本数据，也就是vtk文件里的所有数据，我们通过scope.parse方法将其转换为geometry。

转换完后，我们会通过dispathEvent向自身发送一个加载完成的消息，消息中返回了geometry几何体。这个几何体是可以和Mesh合体，最终显示在场景中的。
最后，如果callback不为null的话，那么我们就调用这个回调函数。在这个回调函数中，会做一些模型加载完成后，应该做的事情，例如，将模型放到某一个位置。

更多详情戳这里[3D模型的加载与使用](http://www.hewebgl.com/article/getarticle/126)

这里我们主要说dispatchEvent
> ispatchEvent是作为高级浏览器(如chrome、Firfox等)的事件触发器来使用的，那么什么是事件触发器？就是触发事件的东西。可能有人觉得有点莫名其妙，触发事件不是在交互中 被触发的吗？的确，通常情况下，事件的触发都是由用户的行为如点击、刷新等操作实现，但是，其实有的情况下，事件的触发必须又程序来实现，比如ajax框架的一些自定义事件。正如事件的绑定一样，对于浏览器而言，绑定事件分为高级浏览器和IE浏览器两派，事件触发器也是分为高级浏览器和IE两派，而dispatchEvent正是用于高级浏览器的事件触发



```
<!-- 
Author: AlexZ33
--> 
 
<!DOCTYPE html>  
<html>  
<head lang="en">  
    <meta charset="UTF-8">  
    <title>dispatchEvent</title>  
</head>  
<body>  
  
</body>  
<script type="text/javascript">  
    //document上绑定自定义事件oneating  
    document.addEventListener('oneating', function (event) {  
        alert(event.mingzi+'，'+event.message);  
    }, false);  
  
    //创建event的对象实例。  
    var event = document.createEvent('HTMLEvents');  
    // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为  
    event.initEvent("oneating", true, true);  
    /*属性，随便自己定义*/  
    event.mingzi = 'hello,我是鲸鱼';  
    event.message = '我是个书虫';  
  
    //触发自定义事件oneating  
    document.dispatchEvent(event);  
</script>  
</html>  

```


dispatchEvent大概就是这三步，上面的例子结果是：在页面载入的时候，会弹出提示框，也就是触发了oneating这个自定义事件。

```
var fireEvent = function(element,event){  
        if (document.createEventObject){  
            // IE浏览器支持fireEvent方法  
            var evt = document.createEventObject();  
            return element.fireEvent('on'+event,evt)  
        }  
        else{  
            // 其他标准浏览器使用dispatchEvent方法  
            var evt = document.createEvent( 'HTMLEvents' );  
            evt.initEvent(event, true, true);  
            return !element.dispatchEvent(evt);  
        }  
    }; 


```

`document.creatEventObject()`是IE创建event对象实例的方法，和`document.creatEvent('HTMLEvents')`在非IE主流浏览器下的作用相同，fireEvent是IE下的事件触发器，与dispatchEvent在非IE主流浏览器下作用相同。



