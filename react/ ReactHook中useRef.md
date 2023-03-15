学习下 React Hook 中 useRef 的使用方法。在开始前，我们先复习下 React 中关于 Refs 相关的知识。

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。
Refs 在 React 中起初的作用是做到对Dom 元素的引用，当我们想操作的原生 DOM 元素的时候，我们可以使用Ref 做到对元素的引用。

```buildoutcfg
import { useRef } from "react";

export default function App() {

  let ref = useRef<HTMLInputElement>(null);

  let handleSubmit = () => {
    console.log(ref.current?.value)
  }
  
  return (
    <div className="App">
      <input ref={ref} />
      <button onClick={handleSubmit} >提交</button>
    </div>
  );
}
```
在上面的例子中，我们在点击提交按钮的时候获取 input 元素的值。

在 React Hook 中，我们可以使用 useRef 来创建一个新的 Ref 对象，Ref 对象包含一个current 字段，我们可以在函数的第一个参数中传入数据来做为 current 字段的初始值。

Ref 对象的一个特性就是，在函数组件的各次渲染中都保持一致，访问到的 current 字段都是最新的。useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象

**需要注意的是，修改 Ref 对象中current的值并不会引发组件的重新渲染**
可以思考下这是为什么?

```buildoutcfg
import { useRef } from "react";

export default function App() {

  let ref = useRef(0);

  let handleClick = () => {
    setTimeout(() => {
      console.log(ref.current)
    }, 1000)
  }
  
  return (
    <div className="App">
      {ref.current}
      <button onClick={() => ref.current++}>button1</button>
      <button onClick={handleClick} >button2</button>
    </div>
  );
}
```

所以除了保持对 DOM 元素的引用之外，还可以保持对某个值的引用。

在编写组件的时候，我们可能需要用到非受控组件，如果我们自定义一个Input 组件，这个时候需要有非受控的方式的话，我们需要暴露出ref 给父组件，用以获取input 控件的value。这个时候，需要用 ForwardedRef 方法，用于暴露 ref 给父组件。React.forwardRef会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

