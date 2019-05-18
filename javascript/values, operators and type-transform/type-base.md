# 类型与类型转换  
javascript 中有七种种类型，分别是:  

    undefined, null,
    string, number, boolean,
    symbol(es6+ 新增入的成员),
    object

## 原始值与对象
#### 1. 原始值
其中， 除了object以外的类型都是原始值(primitives)，原始值有以下的特性：  
> 1. 按值进行比较 
```js
3 === 3                 // => true
        
'123' === '123'         // => true
```
> 2. 不可改变， 其属性不能被改变、添加或者移除
```js
let str = 'abc';
str.length = 1;   // try to change property length
str.length        // no effect
                  // => 3

str.foo = 3;  // try to add a property
str.foo       // no effect, unkown property
              // => undefined
```

> 3. 固定类型的组合，你不能自定义原始值  
    也就是说原始值就上面所说的6种

#### 2. 对象  
对象有以下特征：  
> 1. 按引用进行比较
```js
// 每个对象都有各自的身份标识，比较引用时，会比较对象的身份标识：
{} === {}    // two different empty objects
             // => false

let obj1 = {};
let obj2 = obj1;
obj1 === obj2;  // =>　true
```
        

> 2. **默认**可变
```js
// 对象的属性默认可以很自由地被改变、添加或者移除：
let obj = {};
obj.foo = 123;    // add property 'foo'
obj.foo           // => 123
```

> 3. 用户可扩展  
构造函数可以被看作是自定义的类型的补充方式