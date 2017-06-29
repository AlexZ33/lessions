# 响应式网站开发
[响应式互联网设计](http://article.yeeyan.org/view/340229/299850)
响应式网站的三大技术成分
- media query 媒体查询
- flexible grid layout 弹性网格布局
- flexible image 弹性图片

# 主要浏览器使用情况
![](http://on891bjlf.bkt.clouddn.com/image/browser.png)
[usage-table](http://caniuse.com/usage-table)
[statcounter](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/china)


注意 ：腾讯QQ浏览器虽然用量不大，但是我们使用的微信使用的是QQ浏览器的X5内核
[QQ浏览器X5内核问题汇总](https://www.qianduan.net/qqliu-lan-qi-x5nei-he-wen-ti-hui-zong/)
吐槽:X5就是个巨坑！

有时候我们做手机开发的时候，它调用了系统的webview，但是由于安卓系统各个版本的差别特别大，我们要做简单的兼容，可以用X5浏览服务来替换系统的webview。

览器的兼容性是响应式网站开发最重要的考量因素。

# 媒体查询

## Media Type
```
<link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
```
上面的media语句表示的是：当页页宽度小于或等于600px,调用small.css样式表来渲染你的Web页面。首先来看media的语句中包含的内容：
1、screen：这个不用说大家都知道，指的是一种媒体类型；
2、and：被称为关键词，与其相似的还有not,only，稍后会介绍；
3、（max-width:600px）：这个就是媒体特性，说得通俗一点就是媒体条件。
前面这个简单的实例引出两个概念性的东西，一个就是媒体类型（Media Type）和 媒体特性(Media Query)
```
@media all and (min-width:800px) and (origentation:landscape) {
  ...  
}
```
all 可以是 screen ,print.这是媒体类型可以通过媒体类型对不同的设备指定不同的样式，在css2中我们常碰到的就是all（全部）,screen（屏幕）,print（页面打印或打邱预览模式）,其实在媒体类型不止这三种，w3c总共列出了10种媒体类型。

页面中引入媒体类型方法也有多种：


1、link方法引入
```
<link rel="stylesheet" type="text/css" href="../css/print.css" media="print" />
```

2、xml方式引入
```
<?xml-stylesheet rel="stylesheet" media="screen" href="css/style.css" ？>
```

3、@import方式引入

@import引入有两种方式，一种是在样式文件中通过@import调用别一个样式文件；另一种方法是在<head>>/head>中的<style>…</style>中引入，单这种使用方法在ie6-7都不被支持 如
样式文件中调用另一个样式文件：
```
@import url("css/reset.css") screen;
@import url("css/print.css") print;
```

在<head>>/head>中的<style>…</style>中调用：
```
<head>
 <style type="text/css">
 @import url("css/style.css") all;
 </style>
 </head>
```

4、@media引入
这种引入方式和@import是一样的，也有两种方式：
样式文件中使用：

```
@media screen{
     选择器{
            
        属性：属性值；
     }
   }
```

在<head>>/head>中的<style>…</style>中调用：

```
 <head>
    <style type="text/css">
 @media screen{
           选择器{
      属性：属性值；
    }
 }
    </style>
  </head>
```
以上几种方法都有其各自的利弊，在实际应用中建议使用第一种和第四种，因为这两种方法是在项目制作中是常用的方法，对于他们的具体区别
## Media Query


前面有简单的提到，Media Query是CSS3 对Media Type的增强版，其实可以将Media Query看成Media Type(判断条件)+CSS(符合条件的样式规则)，常用的特性w3c共列出来13种。具体的可以参阅：Media features。为了更能理解Media Query，我们在次回到前面的实例上：
  ```
  <link rel="stylesheet" media="screen and (max-width: 600px)" href="small.css" />
  ```
转换成css中的写法为：

```
@media screen and (max-width: 600px) {
    选择器 {
      属性：属性值；
    }
  }
```

其实就是把small.css文件中的样式放在了`@media srceen and (max-width;600px){…}`的大括号之中。在语句上面的语句结构中，可以看出Media query和css的属性集合很相似，主要区别在：
1、Media query只接受单个的逻辑表达式作为其值，或者没有值；
2、css属性用于声明如何表现页页的信息；而Media Query是一个用于判断输出设备是否满足某种条件的表达式；
3、Media Query其中的大部分接受min/max前缀，用来表示其逻辑关系，表示应用于大于等于或者小于等于某个值的情况
4、CSS属性要求必须有属性值，Media Query可以没有值，因为其表达式返回的只有真或假两种
- not
- and 
- or 也可以用逗号分隔
```
@media not screen and (color),print and (color)

@media not screen and (color) or print and (color)

@media (not(screen and (color))), print and (color)

//上面三个等价
//加了not有效范围只到逗号
```
- only 防止老旧的浏览器不支持带媒体属性的查询，而应用到给定的样式

![](http://on891bjlf.bkt.clouddn.com/image/%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2only.png)
第一个，如果是老浏览器不支持媒体查询，只解析到only，老浏览器是不会应用后面的样式的 因为没有叫only的设备
第二个，不管后面的媒体查询样式怎么写，对于老的浏览器来说，都会应用这样一段样式，因为它已经把后面的逻辑表达式忽略掉了，它的值永远为真。

注意: 一般我们在对某个设备需要用媒体查询时候最好带上only 除非不需要兼容老浏览器

# css3主要的媒体属性

常用的Media Query如下表所示：

![](http://on891bjlf.bkt.clouddn.com/image/22.png)

## viewport视口

>布局视口(layout viewport)
>可视视口(visual viewport) //用户的缩放可以改变可视视口
>理想视口(ideal viewport) //指布局视口在一个设备上的最佳尺寸
理想视口是为构建手机浏览器优化的页面而添加的

```
<meta name="viewport" content="width=device-width"/>
```
上面这句告诉设备要使用理想视口 ，理想视口的宽度作为布局视口的宽度（width定义布局视口的宽度 如果不指定  布局视口的宽度就是厂商的默认值）

```
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
```
最小缩放比例  最大缩放比例都为1  禁用了用户缩放

# 响应式网站设计原则

- 渐进增强（pregressive enhancement）

- 优雅降级 (grace degradation) 


## 兼容性选择

![](http://on891bjlf.bkt.clouddn.com/image/92.png)

![](http://on891bjlf.bkt.clouddn.com/react/77.png)
webkit核心用量大

## 响应式设计的断点

```
/*-----------iphone 4 and 4s -------------*/

/*  Portrait and Landscape */
@media only screen 
  and (min-device-width: 320px)
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio:2){}
```


```
/*--------------iphone5 and 5s --------------*/

/* Portrait and Landscape */

@media only screen 
   and (min-device-width:320px)
   and (max-device-width:568px)
   and (-webkit-min-device-pixel-ratio:2){

   }


```
以上这种 **针对特定设备来做样式选择*** 做法不推荐，除非特例

要对屏幕类型
- 小屏幕 0-480
- 中屏幕 481-800
- 大屏  801-1400
- 巨屏  1400+
这种划分结构  

# 项目文件说明

## http://editorconfig.org/

```

# editorconfig.org

root = true

[*]

charset = utf-8
indent_size = 4
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

```

## .gitignore

```

*`
.DS_Store

.idea
node_modules
dist
```

## README.md
项目简介、 使用方式、相关链接

## CHANGLOG.md
项目每个版本更新
说明版本号、更新内容、修复了哪些问题


[干货 | 前端常用的通信技术](https://mp.weixin.qq.com/s?__biz=MjM5MDI3MjA5MQ==&mid=2697266201&idx=2&sn=1b2ca738a21c6d899e82fa6fe769446b&chksm=8376fb2db401723b8a88295bfb74f98bddc2eb52dabffe221ec2f06ed49885f3e606231796d5&mpshare=1&scene=1&srcid=0626CdlsrLLs1zTJuWbxwj3R&pass_ticket=bgga6XE%2Bnb2dC1QLDF7L3KECmj6yZ08x6Xj8qJ7arA0%3D#rd)


参照范例:
http://responsiveweb.t.imooc.io/