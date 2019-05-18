# 类型与类型转换  
javascript 中有七种类型，分别是:  

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

## 原始值的包装对象
布尔值，数字和字符串这三种原始值都有相应的构造函数： Boolean，Number，String（Symbol不能作为构造函数使用，因此不能使用new 操作符）。他们的**实例（称为包装对象）**包含原始值。这些构造器函数有两种方法：
* 作为构造器函数，它们创建的对象和它们包装的原始值有很大的不同：
```js
// 包装的实例是对象
typeof new String('abc');       // => 'object'
typeof 'abc';                   // => 'string'
new String('abc') === 'abc';    // => false
```  
* 作为函数，它们会将值转换为对象的原始值：
```js
String(123);        // => '123'
Number('123');      // => 123
Boolean(1);         // => false
```

#### 原始值的包装和去包装
有一种使用包装对象的场景： 在你需要对一个原始值添加属性的时候，可以对这个原始值进行包装并且对这个包装后的对象增加属性，而当想取得原始值的时候，再将其去掉包装。  
* 对象原始值进行包装：
```js
new Boolean(true);
new String('123');
new Number(123);
```
* 通过调用valueOf()方法来对实例进行去包装而得到原始值：
```js
new Boolean(false).valueOf();   // => false
new Number(123).valueOf();      // => 123
new String('abc').valueOf();    // => 'abc'
```
* 将构造函数当作函数使用来获取原始值时，只能正确的提取出数字和字符串，而布尔值不能：
```js
Number(new Number(123));        // => 123
String(new String('abc'));      // => 'abc'
Boolean(new Boolean(false));    // =>　true 将在布尔值章节讲解原因
```


