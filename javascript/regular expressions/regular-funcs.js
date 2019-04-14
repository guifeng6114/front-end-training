/* 
    // 按照原型分类 String的原型 RegExp的原型
    * ES6将原先绑定在String.prototype 上的 match(),replace(),search()和 split()方法 重新定义在了 RegExp.prototype上
    * 为了确保正则相关的方法都在RegExp对象上，
    * 但是使用的方法依然和之前一样
    1. RegExp 的原型  
    Ⅰ. RegExp.prototype.test 是否满足匹配正则表达式，返回 true 或者 false
    * 顺序 => /正则/.test('字符串')
    const reg = /x/;
    console.log(reg.test('xxxx'));  => true
    Ⅱ. RegExp.prototype.exec    
    * 顺序 => /正则/.exec('字符串')
    ① 如果不匹配， 则返回 null
    ② 如果匹配，则返回一个数组，形式如下：
    [
        '匹配正则返回的字符串',
        '匹配正则返回的组',     => 如果没有，则此位置为空
        index: 匹配到的字符串的所在位置， 并修改记录正则的 lastIndex属性
        input: 传入的原始字符串
        groups: ES6+ 新添加的功能， 匹配到的具名组的值
    ]
    const reg = /x/g;
    const reg_G = /(?<test>x)/g;
    console.log(reg.exec('xxxx'));   => [ 'x', index: 0, input: 'xxxx', groups: undefined ]
    console.log(reg_G.exec('xxxx'));   => [ 'x', 'x', index: 0, input: 'xxxx', groups: [Object: null prototype] { test: 'x' } ]
    ③ 如果正则没有使用 g修饰符，则返回第一次匹配的值
    ④ 如果正则使用了 g修饰符，则每次调用 exec方法都会对正则 lastIndex属性进行修改，并且调用exec时，将从lastIndex处开始匹配

    2. String的原型
    Ⅰ. String.prototype.search  查找
    * 顺序 => ('字符串').search(/正则/)
    ① 如果匹配，将返回匹配字符串起始位置的 index值
    ② 如果不匹配，将返回 -1
    const reg1 = /x/;
    const reg2 = /b/;
    const str = 'abba';
    console.log(str.search(reg1));  => -1
    console.log(str.search(reg2));  => 1
    * 如果传入的不是正则表达式，search将会使用 new RegExp()的方式把它转换为正则
    const str = 'abba';
    console.log(str.search(123));
    Ⅱ. String.prototype.match   匹配
    * 顺序 => ('字符串').match(/正则/)
    ① 如果正则匹配并且没有设置 g修饰符， 则返回一个数组（跟 exec()类似），形式如下：
    [
        '匹配正则返回的字符串',
        '匹配正则返回的组',     => 如果没有，则此位置为空
        index: 匹配到的字符串的所在位置， 并修改记录正则的 lastIndex属性
        input: 传入的原始字符串
        groups: ES6+ 新添加的功能， 匹配到的具名组的值
    ]
    ② 如果正则匹配并且设置了 g修饰符， 则返回一个包含了所有匹配项字符串的数组
    ③ 如果正则不匹配则直接返回 null
    const reg = /x/;
    const reg_G = /x/g;
    const str = 'xxxx';
    const str2 = 'bbbb';
    console.log(str.match(reg));    => [ 'x', index: 0, input: 'xxxx', groups: undefined ]
    console.log(str.match(reg_G));  => [ 'x', 'x', 'x', 'x' ]
    console.log(str2.match(reg));   => null
    Ⅲ. String.prototype.split   切割
    * 顺序 => ('字符串').split('字符串' 或者 /正则/, 限制的个数)
    将字符串按照传入的参数（字符串或者正则）进行切分，并返回一个数组，如果不传参数，将由数组包装过的原字符串
    const str = 'aaa,bbb';
    console.log(str.split());       => [ 'aaa,bbb' ]
    console.log(str.split(','));    => [ 'aaa', 'bbb' ]
    console.log(str.split(''));     => [ 'a', 'a', 'a', ',', 'b', 'b', 'b' ]
    Ⅳ. String.prototype.replace     替换
    * 顺序 => ('字符串').replace(①'字符串' 或者 /正则/, ②替换方式（字符串或者回调函数）)
    ① 如果第一个参数传入的是字符串，replace 方法只会将第一次匹配到的值替换
    * 如果第一参数传入的是正则表达式，记得使用 g修饰符，以确保能将源字符串的所有匹配的值全部替换
    ② * 如果第二个参数传入的是字符串，replace 将用此 字符串替换匹配到的值， 并由替换指令符 $
        ⅰ. $1, ...$n: 代表的是正则中匹配到的对应组， 如 /(a+)(b+)/，此时，$1为(a+)所匹配到的组，$2为(b+)所匹配到的组
        ⅱ. $$: 代表插入一个单个的 $ 符号
        ⅲ. $&: 代表匹配到的字符串本身
        ⅳ. $`: 代表匹配到的字符串左边的字符串
        ⅴ. $': 代表匹配到的字符串右边的字符串
        console.log('axb cxd'.replace(/x/g, "[$`,$&,$']")); => {
            a[a,x,b cxd]b c[axb c,x,d]d
            对于匹配到的第一个 x， $`: a, $&: x, $': b cxd
            对于匹配到的第二个 x， $`: axb c, $&: x, $': d
        }
        console.log('"foo" and "bar"'.replace(/"(.*?)"/g, '#$1#')); => #foo# and #bar#
      * 如果第二个参数传入的是回调函数
      * function (match, group_1, ...group_n, offset, inputStr, groups)
      * match: 匹配到的字符串
      * group_1, ...group_n: 正则中匹配到的组
      * offset: 匹配到的字符串的 index
      * inputStr: 原字符串
      * groups: ES6+ 新增参数，具名组构成的一个对象 {year, month, day}
        function replacer(match, p1, p2, p3, offset, string) {
            // p1 is nondigits, p2 digits, and p3 non-alphanumerics
            return [p1, p2, p3].join(' - ');
        }
        var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
        console.log(newString);   =>  abc - 12345 - #$*%
    Ⅴ. String.prototype.matchAll  ES6+ 新增
    * 可以一次性取出所有匹配。返回的是一个遍历器（Iterator）。
    const string = 'test1test2test3';

    // g 修饰符加不加都可以
    const regex = /t(e)(st(\d?))/g;
    for (const match of string.matchAll(regex)) {
        console.log(match);
    }
    // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
    // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
    // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
*/