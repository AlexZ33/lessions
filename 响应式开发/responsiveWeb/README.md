# http-server
[http-server](https://github.com/indexzero/http-server)
命令行的server  基于nodejs

```
npm install http-server -g
```

本项目网站文件是在src文件夹,所以响应式网站一般用这个作为基础css


```
http-server src

```
![](http://on891bjlf.bkt.clouddn.com/image/916.png)

```
/*可以访问远程服务器地址*/
  http://169.254.49.17:8081
  http://169.254.254.104:8081
  http://192.168.1.43:8081
/*本地服务器地址*/

http://127.0.0.1:8081


```



# 响应式相关css知识点
1、一般用class定义样式  id一般用于js快速的区分和获取元素
class一般都用中横线分隔，id一般用驼峰名称法

2、 
```
 <nav class="main">
          <a class="brand"><img src="img/logo@1x.png" alt="回到首页"></a>
          <ul>
              <li><a href="" title=""></a></li>
          </ul>
    </nav>
```
这里的logo用img引入的
一般必不可少的图片使用<img>引入
可有可无的装饰性图片可用标签的style引入 
3、在做响应式网站开发时 ，我们一般先针对某个分辨率来设计样式，再观察每种分辨率下发生变化的元素。然后利用媒体查询等技术对这些发生变化的元素来设置样式

**调整样式中需要的开发者工具：**

# CSS resets vs Normalize.css
>每个浏览器在解释html元素时候都有不同的默认样式

[Normalize.css](http://necolas.github.io/normalize.css/)
normalize.css还修复了常见的桌面端与移动端的一些bug
所以响应式网站一般用这个作为基础css

```
<link rel="stylesheet" type="text/css" href="css/normalize.css">
<link rel="stylesheet" type="text/css" href="css/main.css">
```


注意在html5中 `type="text/css"`是可以省略的

# px  em  rem
px: 1px 相当于1个像素
em:  相对的长度单位
 - em相对参照物为 父元素 的font-size
 - em具有继承的特点
 - 当没有设置font-size时候，浏览器有一个默认的em设置: 1em =16px;
 缺点: 容易混乱
rem:
 - **参照物为根元素html**，相当于参照固定不变 所以好计算
 - 当没有设置font-size时，浏览器有默认的rem  设置:1rem = 16px ,和em一致 
响应式设计中em和rem这种相对单位更加流行

```
font-size: 100%   1rem = 16px
font-size: 62.5%  1rem = 10px (10/16*100%)
```
缺点: 不是所有浏览器都支持  ie8及以下不支持


```
::selection{
   background-color: #b3d4fc;
   text-shadow:none;
}

```
设置选中文字底色


# 常见默认样式


```
/* ============
   基本默认值
  ============*/

html{
    font-size: 62.5%;
    color: #222;
}

::selection{
   background-color: #b3d4fc;
   text-shadow:none;
}

ul{
    margin: 0;
    padding: 0;
}

li{
    list-style: none;
}


```

# 常见工具样式
```
/* ======
  工具样式
=======
*/

.center-block{
    display: block;
    margin-right: auto;
    margin-left: auto;
}

.pull-right{
    float: right !important;
}

.pull-left{
    float: left !important;
}

.text-right{
    text-align: right !important;
}

.text-left{
    text-align: left !important;
}

.text-center{
    text-align: center !important;
}

.hide{
    display: none !important;
}


.show{
    display: block !important;
}

.invisible{
    visibility: hidden;
}

.text-hide{
    font: 0/0 a;
    color: transparent;
    text-shadow:none;
    background-color: transparent;
    border: 0;
}

.clearfix:after{
    clear:both;
}

```


## display:none;与visibility:hidden;的区别
如果想让某一段代码在前台不显示，最简单的方法是用css的display:none即可，这样下边的内容就自动上移或右侧的左移来填补这个空隙。但特殊情况下我们只需要隐藏这个元素，

但它的位置不能被占了，那该怎么实现呢？接下来我们来看css的另外一个属性Visibility属性。

visibility:隐藏对应的元素但不挤占该元素原来的空间。
display:隐藏对应的元素并且挤占该元素原来的空间。

```
XML/HTML代码
<divstyle="width:100px;height:100px;background:red;visibility:hidden"></div>
<!--对象隐藏后，还有占有相应的空间大小-->
<divstyle="width:100px;height:100px;background:red;display:none"></div>
<!--对象隐藏后，对象不占任何空间，对比一下就知道了-->
```

总结

使用CSS display:none属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”;

而使用visibility:hidden属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。

**注：若用JQeury中的Show()来显示元素，则只对display:none有效，对于用visibility:hidden方式隐藏的元素是无效的**

## !important

最高级

## 清除浮动
1、给浮动元素的容器(包裹的div)添加`overflow:auto;`或 `overflow:hidden;`
2、推荐的：通过给浮动元素的容器添加一个clearfix的class，然后给clearfix:after的伪元素
```
/*
.clearfix:before,
.clearfix:after{
    content: " ";
    display: table;
} */
.clearfix:after{
    content: ".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}

.clearfix{
    zoom:1;
}
/*这句主要是为了ie6 ie7浏览器兼容性*/

```

改进下

```

.clearfix:before,
.clearfix:after{
    content: " ";
    display: table;
}
.clearfix:after{
    clear:both;
}
/* 加上before可以防止浏览器顶部的空白崩溃 也就是防止margin-top 和上一个盒子的margin-bottom 会发生叠加*/
```

flex是可以替代浮动的布局方式，但是ie8，ie9支持不是很好

[Can I use flex ](http://caniuse.com/#search=flex)

## BFC
如何触发BFC？
float overflow  display:table-cell; display:table-caption; display:inline-block;
position:fixed;
position:absolution;

## 水平垂直居中 (div为例子)

1、absolute + transform

```
<div class="parent">
  <div class="child">Demo</div>    
</div>

<style>
    .parent{
        position: relative;     
    }
    .child{
        position:absolute;
        left:50%;
        top: 50%;
        transform:translate(-50%,-50%);
    }
</style>

```

2、inline-block + text-align + table-cell + vertical-align

```
<div class="parent">
  <div class="child">Demo</div>    
</div>

<style>
    .parent{
        display:table-cell;
        text-align:center;
        vertical-align:middle;
    }
    .child{
        display:inline-block;
    }
</style>
```

3、flex-justify-content + align-items

```
<div class="parent">
  <div class="child">Demo</div>    
</div>

<style>
    .parent{
        display:flex;
        justify-content:center; /* 水平居中*/
        align-items:center; /*垂直居中*/
    }

</style>
```
更多内容看这里[CSS常见布局解决方案](http://www.xingxin.me/posts/590058affd9e613545f2d1f3?nsukey=1ruNvqOn%2Bwk852NwxIKdp%2BnUkKvT5TSoFPBDHXXI82OHXIgiRZSXOEoTGln9c50VDqf%2Fpmi9EKOLHtWCngHbgnu%2FBls0YbMXwaEmlUGP1eGPQdEQgVYK45T9nOuwNdCjdn%2FMV4cbgfh%2BkgOkJdp%2F5p0wfWjcrc8hJWDGbjtSTrxP0z%2FQDlhw%2FZf79N5rvm4T)
[12个常规前端面试题及小结](http://www.xingxin.me/posts/592f7e92068eb96f0a91d601)

# 浏览器更新提示

```
  <!--[if lte IE8]>
  <p class="browserupgrade">您的浏览器需要升级了
   <a href="http://browsehappy.com">这里</a>更新你的浏览器
  </p>
  <![endif]-->

```

```
.browserupgrade{
    margin:0;
    padding: 1rem;
    background: #ccc;
}

```


# 文字不换行并截断

```
/*最新公告*/

.notice a:first-child{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: nowrap;

}

```
这三个属性一般共同书写 才能实现文字不换行

# 小坑
```
line-height: 3rem; 

```

在中文版的chrome浏览器下 最小的字号有个下限   12px；
所以这里的 1rem = 12px   而不是 1rem = 10px;

所以要精确的设置line-height时候，就使用px 


```

.notice a:first-child:before{
    content: '最新公告: \00a0\00a0';  
    /*\00a0 代表不换行的空格字符   content里面没法使用&nbsp */
    color: #aaa;
}

```

\00a0 代表不换行的空格字符   content里面没法使用&nbsp




参照范例:
http://responsiveweb.t.imooc.io/
