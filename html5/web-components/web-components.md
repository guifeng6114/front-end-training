# Web Components  
## 概念  
Web Components是一个Web组件标准。  
Web Components 用来定义自定义组件（使用现有元素来封装自己的元素），可以复用而不用担心代码冲突。

---

## 组成
1. Custom Elements
2. Shadow DOM
3. HTML Templates
4. HTML Imports  
---

## 详解
1. `Custom Elements`  
一组 `Javascript API` ，允许定义 `custom Elements` 及其行为。  

#### 注册
```ts
customElements.define(
    name: string,
    class: ComponentClass,
    extendsOptions?: { extends: HTMLElement }
);
```
> 1.name： 所创建的元素的名字，不能是单个的单词，且必须有短横线 `-`。 

> 2.class：  

