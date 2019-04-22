/* 
 * apply，call， bind方法是用来改变函数执行时的上下文 this

    1. func.apply(①thisValue, ②argArray)
    ① thisValue
      当函数执行时 this指向的上下文， 当不需要绑定对象时，参数设置为null
    ② argArray
      接受一个数组形式的参数（可以是类数组形式，诸如 DOM集合）
    *下列两个函数是等价的
    func(arg1, arg2, arg3);
    func.apply(null, [arg1, arg2, arg3]); 
    * apply 方法可以方便的为函数传递多参数，比如：
    * 有一组数组
    cosnt numArray = [17, 33, 2];
    * 此时想操作数组，得到数组中数字的最大值，可能会使用sort排序的方式，来得到最大值
    * 但是有了apply方法，就可以直接使用Math.max 方法
    Math.max(null, [17, 33, 2]);
    等价于
    Math.max(17, 33, 2);

    2. func.call(①thisValue, ②param_1, param_2, ..., param_n)
    ① thisValue
      当函数执行时 this指向的上下文， 当不需要绑定对象时，参数设置为null
    ② param11, ..., param_n
      接受单个参数
    const testObj = {
      name: 'shadow',
      sayWords(words) {
        console.log(`${words}, ${this.name}`);
      }
    };
    const testObj2 = {
      name: 'tricker'
    };
    testObj.sayWords('hi');   => hi, shadow
    testObj.sayWords.call(testObj2, 'hello');   => hello, tricker
    * 最后一行，因为 testObj2上并没有 sayWords 方法，因此按正常无法运行
    * 但是可以通过调用testObj上的方法来使其执行   => testObj.sayWords.call(testObj2, 'hello');
    * 也可以在定义testObj2的时候直接修改， 例如：
    const testObj = {
      name: 'shadow',
      sayWords(words) {
        console.log(`${words}, ${this.name}`);
      }
    };
    const testObj2 = {
      name: 'tricker',
      sayWords(words) {
        // testObj.sayWords(words);
        testObj.sayWords.call(this, words);
      }
    };
    testObj.sayWords('hi');   => hi, shadow
    testObj2.sayWords('hi');  => hi, tricker
    * 此处testObj2 在声明时直接引用 objTest 的 sayWords 方法，
    * testObj.sayWords.call(this, words), this将在方法执行时绑定到 testObj2 上

    3. func.bind(①thisValue, ②param_1, param_2, ..., param_n)
    * 返回一个调用func的新函数，并将 params参数按顺序作为func的参数传递
    ① thisValue
      当函数执行时 this指向的上下文， 当不需要绑定对象时，参数设置为null
    ② param11, ..., param_n
      接受单个参数
    function add(x, y) {
      return x + y;
    }
    const plus1 = add.bind(null, 1);
    console.log(plus(5)); => 6
    * 实际上段代码等同于
    function add(x, y) {
      return x + y;
    }
    function plus1(num) {
      return add(1, num)
    }
    console.log(plus1(5));
 */

