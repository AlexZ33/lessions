#! https://zhuanlan.zhihu.com/p/373874631

<b>CSS布局: 左边定宽右边自适应</b>

> 现在有一个容器，其中放有两个div，HTML和CSS代码如下所示。
我们需要这两个div并排在一行，并使左边的div宽度确定， 右边的div宽度能够自适应剩余的容器宽度 。
请写出你能想到的所有可能。

```
<div class="cont">
  <div class="left-item">

  </div>
  <div class="right-item">

  </div>
</div>
```
```
html,body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #ffffff;
}
.cont {
  width: 80%;
  height: 40%;
  margin: 50px auto 0;
  background-color: #f4f4f4;
}
.left-item{
  width: 10em;
  height: 100%;
  background-color: #0099ff;
}
.right-item{
  height: 100%;
  background-color: #ff6666;
}
```
#  方法

## 第一种 all inline-block + calc()

```
    /* 第一种 all inline-block + calc() */

        .cont{font-size: 0}
        .left-item{
            font-size: 16px;
            display: inline-block;
        }
        .right-item{
            font-size: 16px;
            display: inline-block;
            width: calc(100%-10em);
        }
```

##　第二种 all float + calc()

```
.cont{
            zoom: 1;
        }
        .cont::after{
            content: ' ';
            display: block;
            font-size: 0;
            line-height: 0;
            clear: both;
            overflow: hidden;
            visibility: hidden;
        }

        .left-item{
            float: left;
        }
        .right-item{
            float: right;
            width: calc(100%-10em);
        }
```


# 第三种 left float

```
        .cont {
          zoom: 1;
        }
        .cont::after {
          content: ' ';
          display: block;
          font-size: 0;
          line-height: 0;
          clear: both;
          overflow: hidden;
          visibility: hidden;
        }
        .left-item {
          float: left;
        }
        .right-item {
          width: 100%;
          padding-left: 10em;
          box-sizing: border-box;
        }
```


# 第四种 left absolute
```
.cont {
  position: relative;
}
.left-item {
  position: absolute;
}
.right-item {
  width: 100%;
  padding-left: 10em;
  box-sizing: border-box;
}
```

# 第五种 all absolute

```
.cont {
  position: relative;
}
.left-item {
  position: absolute;
}
.right-item {
  position: absolute;
  left: 10em;
  right: 0;
}
```

# 第六种 right flex
```
.cont {
  display: -webkit-flex;
  display: -ms-flex;
  -webkit-display: flex;
  -ms-display: flex;
  display: flex;
}
.left-item {}
.right-item {
  flex: 1;
}
```
# 第七种 table
```
.cont {
  display: table;
}
.left-item {
  display: table-cell;
}
.right-item {
  display: table-cell;
}
```
# 第八种 grid
```
.cont {
  display: grid;
  grid-template-columns: 10em auto;
}
.left-item {
}
.right-item {
}
```
# :after 与 ::after 区别

[ :after/::after和:before/::before的区别](http://blog.csdn.net/u013778905/article/details/52901880)

 :after 是写在css中 给标签之后增加新内容  如
 ```
  p:after{  content:"增加文本";  color:#f00; font-weight:bold;   }
 ```

  ::after 是写在HTML中的 元素之后增加新内容 如 

  ```
  div::{content:"url(../img/1.jpg)"; background-color:"#ff0";}

  ```

  所有支持CSS3的双冒号(::)语法的浏览器都会支持单冒号(:)语法，但IE8只支持单冒号。建议只使用单冒号，以获得最佳的浏览器支持。

双冒号(::)是一种新语法，是用来将伪元素选择器和伪元素区别开。如果不需要IE8支持，就用双冒号(::)吧。

总结：
针对布局问题，可以使用 flex / table / grid 可以搞定。
如果要考虑兼容性问题，或当它们无法实现时，可以考虑 float / absolute 进行布局。
如果仍然无法搞定，可以尝试使用 float / absolute 加上 calc() 进行布局。

使用 float / absolute 可以满足需要，且它们不会出现兼容性问题，是比较合适的解决方案
