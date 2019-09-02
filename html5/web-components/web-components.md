# Web Components  

## 概念  
Web Components是一个Web组件标准。  
Web Components 用来定义自定义组件（使用现有元素来封装自己的元素），可以复用而不用担心代码冲突。


## 组成
1. Custom Elements
2. Shadow DOM
3. HTML Templates
4. HTML Imports  

## 详解
### 1. Custom Elements  
一组 `Javascript API` ，允许定义 `custom Elements` 及其行为。  

+ 注册
```ts
customElements.define(
    name: string,
    class: ComponentClass,
    extendsOptions?: { extends: HTMLElement }
);
```
>1\. name：所创建的元素的名字，不能是单个的单词，且必须有短横线 `-`。  
2\. class：用于定于元素行为的类。  
3\. 可选参数： 指定所创建元素继承自哪个任意的内置的元素。  

+ 返回自定义元素的构造函数
```ts
    constructor = customElements.get(name);
```
>1 name： 要返回引用的构造函数的自定义元素的名字。  
返回指定名字的自定义元素的构造函数，如果没有使用该名称的自定义元素定义，则为 `undefined` 。

+ 注册时执行的回调
```ts
    customElements.whenDefined(name);
```
>1\. name：自定义元素的名称。  
返回：当自定义元素被定义时，一个Promise 返回 `{jsxref("undefined")}` 。如果自定义元素已经被定义，则 `resolve` 立即执行。如果提供的 name 不是一个有效的 自定义元素名字，promise 的 `reject` 回调会接收到一个 `SyntaxError`.

+ 两种 `custom elements`
1. Autonomous custom elements  
是独立的元素，它不继承自其他内建的 `HTML` 元素。可以以标签的形式引用 `<simp-sample></simp-sample>` 或者 `document.createElement('simp-sample')`
2. Customized built-in elements
继承自基本的 `HTML` 元素， 创建时必须指定继承自元素。使用时， 需要先写出基本的元素标签，并通过 `is` 属性指定 `custom element` 的名称。 如： `<p is="simp-sample"></p>` 或者 `document.createElement('p', { is: 'simp-sample' })`。

+ 生命周期函数  
>+ connectedCallback： 当 custom element 首次被插入文档时调用。
>+ disconnectedCallback： 当 custom element 在文档中删除时调用。
>+ adoptedCallback： 当 custom element 被移动到新的文档时，被调用。
>+ attributeChangedCallback： 当 custom element 增加，删除，修改自身属性时， 被调用。  

[自定义组件的生命周期详情MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

示例： 因为创建自定义元素要使用 `shadow DOM`， 所以放在一起实现。

### 2. Shadow DOM
Web components的一个重要特性是封装——可以将html标签结构、css样式和行为隐藏起来，并从页面上的其他代码中分离开来，这样不同的功能不会混在一起，代码看起来也会更加干净整洁。其中，Shadow DOM接口是关键所在，它可以将一个隐藏的、独立的DOM添加到一个元素上。

Shadow DOM允许将隐藏的DOM树添加到常规的DOM树中——它以shadow root为起始根节点，在这个根节点的下方，可以是任意元素，和普通的DOM元素一样。

![shadow DOM](./images/shadow-dom.png)
![shadow DOM HTML](./images/shadow-dom2.png)

>1\. shadow host  
一个常规的 DOM 节点， 作为宿主，Shadow DOM 会被添加到这个节点上。  
2\. shadow tree  
Shadow DOM 内部的 DOM 树。  
3\. shadow boundary  
shadow DOM 的作用范围，结束后是常规 DOM 开始的地方。  
4\. shadow root  
shadow tree 的 根节点

你可以像常规 DOM 一样操作 Shadow DOM，添加子节点，添加样式，设置属性等等，但他永远不会影响到外部的元素，这也为封装提供了便利。

+ shadow DOM 的使用
```ts
    let shadow = ElementRef.attachShadow({ mode: 'open' });
    let shadow = ElementRef.attachShadow({ mode: 'closed' });
```

> open： 表示你可以通过页面中的 `javascript` 方法来获取 Shadow DOM，例如使用 `Element.shadowRoot` 属性：
```ts
    let shadowDOM = element.shadowRoot
```
> closed：如果你将 `mode` 设置为 `closed`， 则代表你不能使用 `Element.shadowRoot` 获得 shadow DOM 了，他将返回 `null`。（当然你可以使用其他的方法来获取，比如在定义类的时候，留一个暴露的属性）。 

通常情况下，shadow DOM 配合 Custom Element 一起使用。对于 Shadow DOM 中的 DOM， 处理方式跟常规的 DOM 一样。

### Custom Element 与 Shadow DOM 的综合示例  
完成一个组件（POP Info -- Autonomous custom elements ） 
```ts
    class PopInfo extends HTMLElement {
        constructor() {
            super();
        }
    }
```



