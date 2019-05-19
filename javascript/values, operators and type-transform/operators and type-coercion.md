# 强制类型转换与运算符

## 强制类型转换
强制类型转换是指值从一种类型隐式的转换成了另外一只类型。例如，乘法运算符的运算数会强制转换为数字：
```js
'3' * '4';  // => 12
```
而在加法运算符中，如果一个运算数的类型为字符串，加法运算符会将另外一个运算数转换为字符串：
```js
3 + ' times';    // 3 times
```
**强制类型转换会隐藏bug**， 例如：
```js
let rect = {
    width: '100',
    height: '50',
};
rect.width + 20;    // '10020' 你可能想要得到120，而'10020'不是你想要的
```

#### 1. 推荐将构造函数作为函数使用来转换为对应的字符串，数字，布尔值以及对象。
Boolean() 转换为布尔值，下面的值将被转为false，它们被称作为“假值”：
> * undefined, null
> * false
> * 0, NaN
> * ''  

其他的值被称为“真值”， 并且会被转换为 true（**包括所有对象**）
```js
// 因为new Boolean(false)生成的是一个对象，所以经过Boolean转换会变成true
Boolean(new Boolean(false));    // => true
```

Number() 转换成数字：
> * undefined 会被转换成 NaN
> * null 会被转换成 0
> * false 会被转换成 0， true 会被转换成 1
> * 字符串会被解析
> * 对象会先转换成原始值，然后再转换成数字

String() 转换为字符串， 所有原始值转成字符串的结果显而易见：
```js
String(null);       // => 'null'
String(123.45);     // => '123.45'
String(false);      // => 'false'
```
而对象先要转换成原始值，再转换成字符串  

Object() 转换成对象：
> * 对象会被转成**它们自身**
> * undefined 和 null 会被转换成 **空对象**
> * 原始值会被转换成 **包装后的原始值（即对象）**
```js
let obj = { foo: 123 };
Object(obj) === obj;    // => true
Object(obj);            // => { foo: 123 }

Object(undefined);      // => {}
Object(null);           // => {}

Object('123');          // => [String: '123']
typeof Object('123');   // => 'object'
```

#### 2.算法 ToPrimitive()， 将值转换为原始值
ECMAScript 规范中有一个内部函数，ToPrimitive()（JavaScript 中不能访问）,
能够实现这个功能。理解ToPrimitive()能帮助你理解对象是如何转换为数字和字符
串的。该函数形如：
```
ToPrimitive(input, PreferredType?)
```
可选参数PreferredType 表明转换后的类型：它可以是Number 或String，
具体取决于ToPrimitive 的结果是希望转换成数字还是字符串。

如果PreferredType 是Number，会执行以下步骤。  
> 1.如果input 是原始值，返回这个值（没有其他需要做的）。  
> 2.否则，如果input 是对象，调用input.valueOf()。如果结果是原始值，返回结果。  
> 3.否则，调用input.toString()。如果结果是原始值，返回结果。  
> 4.否则，抛出一个TypeError（说明将输入转换为原始值出错了）。  

**如果PreferredType 是字符串，第二步和第三步会进行交换。**  
**valueOf 的默认实现会返回this，而toString()的默认实现会返回类型信息。**  
PreferredType 也可以被省略，这种情况下，日期会被认为是String 而其他值会被认为是Number。因此，
**+ 运算符** 和 **== 运算符** 可以操作ToPrimitive()。

所以，将对象转化为数字的流程：  
`Number({ value: 123 })`
> 1. 首先判断input是不是原始值，此处不是原始值，而是个对象
> 2. 调用 valueOf() 方法，看是否能取到原始值，此处取到的是个对象
```js
const obj = { value: 123 };
obj.valueOf();                  // => { value: 123 }
```
> 3. 调用 toString() 方法，取得原始值，这里取到'[object Object]'， 然后，Number() 将其转换为 NaN
```js
const obj = { value: 123 };
obj.toString(); 
```