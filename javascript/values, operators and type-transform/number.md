# 数字  
`javascript` 对所有的数字都只有一种类型： 他把所有的数字都当作浮点数。不过，如果小数点后没有数字，这个点也不会显示出来。  

## 数字字面量
一个数字字面量可以是整数，浮点数，或者十六进制（整型）：
```js
    35      // => 35
    3.141   // => 3.141
    0xFF    // => 255
```
>1. 指数 `eX`，是 `10`<sup>`x`</sup> 的缩写  
```js
    5e2     // => 500
    5e-2    // => 0.05
    0.5e2   // => 50
```

>2. 在字面量上调用方法  

在字面量上调用方法，用来访问一个属性的点必须和小数点的点区分开。
```js
    123..toString()     // => '123'
    123 .toString()     // => '123'
    123.0.toString()    // => '123'
    (123).toString()    // => '123'
```
---

## 转换成数字

值 | 结果
- | - 
undefined | NaN
null | 0
布尔值 | `false` 转成 `0`， `true` 转成 `1`
数字 | 保持不变
字符串 | 解析字符串中的数字（忽略开头和结尾的空格）；空字符串转换成 `0`；无法转换成数字的返回 `NaN`。
对象 | 调用 `toPrimitive(value, number)` 产生原始值，并转换生成的原始值。

### 1. 手动转换成数字
两种将任意值转换成数字的常用方法：
```js
    Number(value)       // => 函数调用，而不是构造函数
    + value
```
### 2. parseFloat()
全局函数 `parseFloat()` 另一种将值转换为数字的方法。
将 `str` 转换成**字符串**，**去掉开头的空格**，然后解析最长的**浮点数字形式的前缀**。如果没有这样的前缀（例如，在一个空字符串中），则会返回 `NaN`。

- 对非字符使用 `parseFloat()` 的效率较低，因为在解析之前它会将参数强制转换成字符串。因此， 许多被 `Number()` 转换成实际的数字的值被 `parseFloat()` 转换成了 `NaN`：
```js
    parseFloat(true)   // => NaN
    Number(true)       // => 1

    parseFloat(null)   // => NaN
    Number(null)       // => 0
```

- `ParseFloat()` 将空字符串解析成 `NaN`：
```js
    parseFloat('')     // => NaN
    Number('')         // => NaN
```

- `parseFloat()` 会一直解析到最后一个合法的字符，这意味着最后得到的可能不是想要的结果：
```js
    parseFloat('123.45#')   // => 123.45
    Number('123.45#')       // => NaN
```

- `parseFloat()` 会忽略开头的空格，并且在非法的字符（包括空格）前停止：
```js
    parseFloat('\t\v\r12.34\n ')    // => 12.34
    Number('\t\v\r12.34\n ')        // => 12.34
```
---

## 特殊的数字值
- 两个错误值， `NaN` 和 `Infinity`；
- 两个零值， +0 和 -0；

### 1. NaN
**`NaN` 类型是 `Number`**。
```js
    typeof NaN      // => 'number'
```
> 检查一个值是不是 `NaN`  

>> **`NaN` 是唯一一个与自身不相等的值**
```js
    NaN === NaN     // => false
```

>> 全局函数 `isNaN()`  

`isNaN()` 对非数字不起作用，因为它**首先做的就是把这些值通过 `Number()` 转换成数字**。转换可能生成 `NaN`，然后函数会错误地返回 `true`。
```js
    isNaN('xyz')    // => true
```

因此，有两种方式检查 `NaN`
```js
    const testNaN_1 = (value) => 
        (typeof value === 'number' && isNaN(value));

    const testNaN_2 = (value) => value !== value;
```

`ES6` 在 `Number()` 对象上，新增了 `isNaN()` 的方法。  
> [如果参数类型不是 `NaN`，`Number.isNaN()` 一律返回 `false`。传统方法先调用 `Number()` 将非数值的值转为数值，再进行判断，而新方法只对数值有效。](http://es6.ruanyifeng.com/#docs/number#Number-isFinite-Number-isNaN)
```js
    Number.isNaN(NaN)               // => true
    Number.isNaN(15)                // => false
    Number.isNaN('15')              // => false
    Number.isNaN(true)              // => false
    Number.isNaN(9/NaN)             // => true
    Number.isNaN('true' / 0)        // => true
    Number.isNaN('true' / 'true')   // => true
```

### 2. Infinity  
Infinity 表达了两种意思：  

To Be Continued...


