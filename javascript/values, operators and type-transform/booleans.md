# 布尔类型  

值 | 转换成的布尔值
-|-
undefined | False
null | False
布尔值 | 与输入相同
数字 | 0, NaN转换成 False, 其他转换成 True
字符串 | ''转换成False, 其他转换成 True
对象 | 总是转换成 True, 包括 new Boolean(false)

## 手动转换成布尔值
三种方式用来转换成布尔值  
```js
    // 通过函数调用的形式转化，而不是构造函数（不要搞混了）
    Boolean(value)    

    // 通过三元运算符
    value ? true : false

    // 使用双 ! 进行转换
    !!value
``` 

## 真值与假值
所有假值  
undefined, null
Boolean: false
Number: 0, NaN
String: ''
其他所有的值，均为真值

## 逻辑运算符  
### 二元逻辑运算符有两个特性
>1. 值保留  总是返回其中的一个运算数
```js
    'abc' || 123    // => 'abc'
    false || 123    // => 123
```
>2. 短路   如果第一个运算数已经决定了结果，则不再求第二个运算数的值
```js
    true && console.log('Hello')    // => true
    false && console.log('Hello')   // => Hello undefined
```
>3. 逻辑与 `&&`  

&emsp;&emsp;如果第一个运算数能够被转换成 `false`，则返回这个值，否则，返回第二个运算数
```js
    true && false   // => false
    '' && 'def'     // => ''
    'abc' && 'def'  // => 'def'
```

>4. 逻辑或 `||`  

&emsp;&emsp;如果第一个运算数能转换成 `true`， 则返回这个值， 否则返回第二个运算数
```js
    true || false   // => true
    true || 'def'   // => true
    'abc' || 'def'  // => 'abc'
    '' || 'def'     // => 'def'
```

&emsp;&emsp;**可以用来提供默认值**（参数，属性，以及函数的返回结果）
```js
    theValue || defaultValue
```

### 逻辑非 `!`
将运算数转换成布尔值，然后取反。
```js
    !true   // => false
    !43     // => false
    !''     // => true
    !{}     // => false
```

## Boolean 函数
Boolean 函数有两种调用方式：
>1. Boolean(value) 作为一个普通函数，它将一个value转换为布尔值
```js
    Boolean(0)              // => false
    typeof Boolean(false)   // => 'boolean'
```

>2. new Boolean(bool) 作为一个构造函数，他会创建一个Boolean的实例，一个封装了 bool 的对象
```js
    new Boolean('')             // => [Boolean: false] *this show on node*
    new Boolean('123')          // => [Boolean: true] *this show on node*
    typeof new Boolean('')      // => 'object'
    !!(new Boolean(''))         // => true
```

相对来说，函数调用的方式比较常见。

