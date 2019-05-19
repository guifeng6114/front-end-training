# 强制类型转换与运算符

## 强制类型转换
强制类型转换是指值从一种类型隐式的转换成了另外一种类型。例如，乘法运算符的运算数会强制转换为数字：
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

## 运算符

#### 1. 严格相等运算符 ===
不同类型的值总是严格不想等的。如果两个值的类型相同，会发生下列情况：
> * 是否为 undefined === undefined 的比较
> * 是否为 null === null 的比较
> * 比较两个数字（NaN 和 自身不等）
```js
x === x     // unless x is NaN
+0 === -0   
NaN !== NaN
```
> * 比较两个布尔值， 字符串
> * 比较两个对象，当且仅当 x 和 y 是同一个对象的时候（可以理解为内存的指针相同）， x === y


#### 2. 宽松相等 ==
如果两个运算数的类型相同，则使用严格相等比较它们。  
否则，如果运算数是如下类型。
> 1. undefined 和 null 是被认为宽松相等的
```js
undefined == null   // => true
```
> 2. 一个字符串和一个数字，则将字符串转为数字，使用**严格相等**进行比较
> 3. 一个布尔值和一个非布尔值，则将布尔值转为数字，然后进行**宽松比较**
> 4. 一个对象和一个数字或者字符串， 则尝试将对象转换为原始值，然后进行**宽松比较**  
> 5. 不符合上述条件的，宽松比较返回 false

鉴于宽松相等判断的多条内部转换机制，从而可能导致出现bug，**尽可能的使用严格相等而不推荐宽松相等**

#### 3. 排序运算符 <, <=, >, >=
这些运算符对数字和字符串有效。
```js
7 >= 5                  // => true
'apple' < 'orange'      // => true
```
对于字符串，这些运算符并不是那么实用，因为它对**大小写敏感且无法处理类似重音的情况**  

这些符号的算法流程如下：
> 1. 确保两个运算数都是原始值，如果不是原始值会使用 toPrimitive()来取得对象的原始值
> 2. 如果两个运算数都是字符串，则按字典比较的方式对它们的16 位代码单元，即字符串的JavaScript 字符进行比较。
> 3. 否则将两个运算数转变为数字类型，然后比较它们的数值大小。

#### 4. 加号运算符
加号运算符的算法流程如下：
> 1. 确保两个运算数都是原始值，如果不是原始值会使用 toPrimitive()来取得对象的原始值。如果是日期对象，obj.toString()方法会优先被调用。
> 2. **只要一个运算数是字符串**，则将它们**都转变为字符串**并**返回它们合并**后的结果。
> 3. 否则转变两个运算数为数字并返回它们的和。

#### 5. 特殊运算符
1. 三元运算符（?:）  
«condition» ? «if_true» : «if_false»
```js
    let bool = true;
    let test = bool ? 'test' : null;
    test;                               // => 'test'
```

2. 逗号运算符  
«left», «right»  
逗号运算符会执行两边的运算数，并返回right部分的执行结果。简单来讲，它的作用等同于块之间的分号。逗号运算符不易理解，建议不要使用。
```js
    123, 'abc'              // => 'abc'

    let x = 0;
    let y = (x++, 10);
    y;                      // => 10   
```

3. void 运算符  
   void «expression»  
   expression 会被执行，并且返回undefined。例子：
```js
void 0;             // => undefined
void 4 + 7;         // => NaN, same as (void 4) + 7
void (4 + 7);       // => undefined
```

#### 6. 通过typeof 和 instanceof 判断值的类型
> * typeof 运算符能区分原始值和对象，并检测出原始值的类型。
> * instanceof 操作符可以检测出一个对象是否是特定构造函数的实例（本质其实是 **检查右边的函数原型是否存在于操作符左边对象的原型链上**）。

1. typeof 判断原始值  
typeof «value»  
返回的是一个字符串，描述 value 的类型是什么。
```js
typeof undefined;       // => 'undefined'
typeof 'abc';           // => 'string'
typeof {};              // => 'object
typeof [];              // => 'object
typeof Symbol();        // => 'symbol'
```
运算数|结果
-|-
undefined|'undefined'
null | 'object'
布尔值| 'boolean'
数字| 'number'
字符串| 'string'
符号| 'symbol'
函数|'function'
所有其他的常规| 'object'

其中，typeof null 的返回值是'object'是一个js无法修复的bug，所以要判断一个值是否是对象，可以通过下面的方法去判断：
```js
const isObject = (value) => {
    return (value !== null && 
        (typeof value === 'object' || typeof value === 'function'));
};
isObject(123);          // => false
isObject(null);         // => false
isObject({});           // => true
isObject(isObject);     // => true
```
**typeof 检测值是否存在**  
`typeof x === 'undefined'`  
> * 检测 x 是否为 **undefined**
> * 检测 x 是否 **存在**
```js
let foo;
typeof foo === 'undefined';         // => true
foo === undefined;                  // => true

// 未声明的变量（undeclare） 和 未定义的变量 （undefined）
// 概念是不一样的，虽然 typeof 都会返回 undefined
typeof undeclareVariable === 'undefined'    // => true
undeclareVariable === undefined             // ReferenceError: undeclareVariable is not defined
```

2. instanceof：检测对象是否是给定构造函数的实例  
   检查右边的函数原型是否存在于操作符左边对象的原型链上  
   «value» instanceof «constructor»  

检测value 是否是由构造函数Constr 创建的或是否为它的一个子类。
```js
const obj = {};
obj instanceof Object;      // => true
[] instanceof Array;        // => true
[] instanceof Object;       // => true
```
undefined 和 null 调用 instanceof 的结果是 false。
```js
undefined instanceof Object;    // => false
null instanceof Object;         // => false
```
对于其他原始值也是返回 false。
```js
'abc' instanceof Object;        // => false
123 instanceof Object;          // => false
```