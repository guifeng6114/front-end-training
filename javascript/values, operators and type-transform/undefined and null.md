# undefined 和 null
javascript 使用两个“空值”来表示信息的缺失，undefined 和 null。  
* undefined 表示“没有值”（既不是原始值，也不是对象）。试图访问未初始化的变量，未定义的参数，以及缺失的属性会返回undefined。在函数中，如果没有显式的返回值，将会隐式的返回undefined。  
```js
let test;     // declare a variable without value
test;         // => undefined

// 这段代码执行后返回了两个undefined，
// 第一个是打印的参数，
// 第二个是test这个函数的返回值。
const test = (value) => {
    console.log(value);
};
test();  //=> undefined  undefined

const obj = {};
obj.foo   // there is not property 'foo'
          // => undefined
```
* null 的意思是“没有对象”，表示空值  

对于undefined 和null 的区别，可以这样理解：
> * undefined 表示变量，参数或者属性**没有值**或者**没有被赋值**  
> * null 表示变量，参数或者属性**已经被赋值**， 但是被赋予了一个**空值**（空值就是null）




