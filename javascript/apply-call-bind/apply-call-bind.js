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
 */