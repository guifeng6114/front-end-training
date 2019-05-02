/* 
    // 特殊符号部分 常用符号
        .     匹配所有js字符除了行结束符
        \s\S  匹配所有字符
        \d    匹配所有数字，与[0-9]作用相同
        \D    匹配所有非数字，与\d相反， 与[^0-9]作用相同
        \w    匹配[A-Za-z0-9_]  下划线要注意一下
        \W    匹配[^A-Za-z0-9_]
        \s    匹配所有空白字段（空格，制表符，换行符）
        \S    匹配所有非空白的字段
*/

/* 
    // 概念： 字符类 [] 匹配括号内所包含的字符，每个[]只代表一个字符）
    const regChaClass = /[a-z]/g;
    console.log('abcd'.match(regChaClass));  => [ 'a', 'b', 'c', 'd' ]

    1.[《charSpecs》]  匹配charSpecs里任意一个字符
    2.[^《charSpecs》] 匹配除了charSpecs以外的任意一个字符

    下列的符号，在字符类中有特殊的含义
    \   用来转义特殊的字符
    ]   如果不进行转义，这个将被视为字符类的结束符号
    -   如果不进行转义，此符号将被视为范围连接符
*/
/* const parseDate = (str) => {
    const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(str);
    if (!match) {
        throw new Error('Not an date:' + str);
    }
    console.log('Year: ' + match[1]);
    console.log('Month: ' + match[2]);
    console.log('Day: ' + match[3]);
}

parseDate('2018-02-25'); */


/* 
    // 概念： 组 () 匹配到的将被列为分组，可以用来反向引用或者对组进行操作
    1.捕获组
    (《pattern》) 匹配之后可以用来反向引用或者进行操作
    2.非捕获组
    (?:《parttern》)  可以匹配，但是匹配之后不可以进行引用或者操作
    const str = 'windows2000';
    const reg1 = /windows(?:2000)/;
    const reg2 = /windows(2000)/;
    const reg3 = /windows(?:3000)/;
    console.log(str.match(reg1));   => ['windows2000', index: 0, input: 'windows2000', groups: undefined]   2000匹配，但是并没有放入匹配值中
    console.log(str.match(reg2));   => ['windows2000', '2000', index: 0, input: 'windows2000', groups: undefined]
    console.log(str.match(reg3));   => null
    3.反向引用
    对前面已经匹配的组进行匹配，匹配的内容与之前匹配相同，例：
    匹配html标签是否成对出现
    const docSpecs1 = '<html><div></div></html>';
    const docSpecs2 = '<html><div></html></div>';
    const tagReg = /<([a-z]*)><([a-z]*)><\/\2><\/\1>/;
    console.log(tagReg.test(docSpecs1));
    console.log(tagReg.test(docSpecs2));
    4. 具名组匹配   ES6+ 新加入的规则
    允许为每一个组匹配指定一个名字
    const reg = /(?<test>x)/g;
    console.log(reg.exec('xxxx'));  => [ 'x', 'x', index: 0, input: 'xxxx', groups: [Object: null prototype] { test: 'x' } ]
    console.log(reg.exec('xxxx').groups.test);  => x

    let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
    '2015-01-02'.replace(re, '$<day>/$<month>/$<year>');  => '02/01/2015'
    * 具名组可以反向引用 \k, 并且可以和数字反向引用一起使用
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc')   => true
    RE_TWICE.test('abc!ab')    => false
*/

/* 
    // 量词 任何原子后面都可以跟上量词
    ?       匹配0次或者1次
    *       匹配0次或者多次
    +       匹配至少一次或者多次
    {n}     准确的匹配 n次
    {n,}    至少匹配n次或者多余n次
    {n,m}   匹配至少 n次并且至多只能匹配 m次

    通常情况下，量词都是贪婪匹配，即尽可能多的匹配
    非贪婪匹配模式可以在量词后添加 ?，例：
    console.log('<a><strong>'.match(/^<(.*)>/)[1]);     => a><strong
    console.log('<a><strong>').match(/^<(.*?)>/)[1]);   => a
*/

/* 
    // 断言  检查输入的位置
    ^                   只匹配输入的开始部分
    $                   只匹配输入的结尾部分
    \b                  只匹配单词的边界，不要与[\b]混淆，[\b]是匹配退格键
    \B                  只匹配不是单词的边界
    const str1 = 'heello ell ell helloo';
    const reg_b = /\bell\b/;
    const reg_B = /\Bell\B/;
    console.log(str1.match(reg_b));     => [ 'ell', index: 7, input: 'heello ell ell helloo', groups: undefined ]
    console.log(str1.match(reg_B));     => [ 'ell', index: 2, input: 'heello ell ell helloo', groups: undefined ]
    * 其实，说白了\b的作用就是为了匹配一个单个的单词，而\B则与之相反，代表的是字段是单词的一部分

    (?=《pattern》)     正向肯定断言   /x(?=y)/    解释成 x只有在 y前面才匹配，匹配者是 x，而不是 y，y只是 x能够匹配的条件
    (?！《pattern》)    正向否定断言   /x(?!y)/    解释成 x只有不在 y前面才匹配，匹配者是 x，而不是 y，y只是 x能够匹配的条件
    * ES6+ 新增反向断言  反向断言需要先匹配/(?<=y)x/的 x，然后再回到左边，匹配 y的部分。
    (?<=《pattern》)    反向肯定断言   /(?<=y)x/   解释成 x只有在 y后面才匹配，匹配者是 x，而不是 y，y只是 x能够匹配的条件
    (?<！《pattern》)   反向否定断言   /(?<！y)x/  解释成 x只有不在 y后面才匹配，匹配者是 x，而不是 y，y只是 x能够匹配的条件
    const str1 = 'windows2000';
    const str2 = 'windows3000';
    const reg = /windows(?=2000)/;
    console.log(str1.match(reg));   => [ 'windows', index: 0, input: 'windows2000', groups: undefined ]
    console.log(str2.match(reg));   => null

    * (?=《pattern》) 与 (?！《pattern》)有零宽的说法，零宽指的是：
    * 预查不消耗字符，也就是说，在一个匹配发生① 后，在最后一次匹配② 之后立即开始下一次匹配的搜索，而不是从包含预查的字符③ 之后开始
    * 例如：
    const str1 = 'windows2000';
    const reg = /windows(?=2000)[123]/;
    console.log(str1.match(reg));   => [ 'windows2', index: 0, input: 'windows2000', groups: undefined ]
    * 会发现，结果是 windows2 => {
        ①. 第一步，发现 windows后面的确是2000, windows被匹配
        ②. 第二步，继续匹配的位置将从 windows 的 s 处继续向下匹配
        ③. 第三步，[123] 匹配到 windows 后面的 2000的 2
    }
      
*/

/* 
    // 析取  | 多选方案， 唯一需要注意的就是，如果组目非常多，建议打括号
    console.log(/^aa|bb$/.test('aaxx'));    => true
    console.log(/^aa|bb$/.test('xxbb'));    => true
    * /^aa|bb$/这段正则翻译过来的意思是， 要么是以 aa开头， 要么是以 bb结尾
    * 而你大概真正想要的应该是， 要么是 aa，要么是 bb => /^(aa|bb)$/
    * 所以用的时候一定要多加注意
*/

/* 
    // 声明 正则表达式
    1. 使用字面量的形式声明
    const reg = /reg/ig;    => 建议通常情况下，使用正则字面量的声明方法
    2. 使用构造函数进行声明
    const reg = new RegExp('reg', 'ig');  => 当需要动态生成正则的时候，则使用构造函数的声明方法
    const reg = new RegExp(/reg/ig, 'i');   => {
        ES6+ 新增加的规则
        如果RegExp构造函数第一个参数是一个正则对象，
        那么可以使用第二个参数指定修饰符。
        而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
        所以此处返回的正则应该是 /reg/i
    }
    3. 修饰符
    i   => ignoreCase  忽略大小写
    g   => global      全局匹配多次
    m   => multiline   多行模式  多行模式有条件限制，得包含换行符\n，并且规则中存在 ^或者 $，然后每行进行匹配
    const mutiline = /^abc/m;
    const singleline = /^abc/;
    const target = "abcf\r\nabcd";
    console.log(target.match(mutiline));    => [ 'abc', 'abc' ]
    console.log(target.match(singleline));  => [ 'abc' ]
    * ES6+ 新增修饰符
    u   => unicode  用来正确处理大于\uFFFF的 Unicode 字符，会正确处理四个字节的 UTF-16 编码
    /^\uD83D/u.test('\uD83D\uDC2A') => false   加了 u修饰符以后，ES6就会识别其为一个字符，所以第一行代码结果为 false
    /^\uD83D/.test('\uD83D\uDC2A')  => true    ES5不支持四个字节的 UTF-16 编码，会将其识别为两个字符，导致代码结果为 true
    * 一旦加上u修饰符号，就会修改下面这些正则表达式的行为。
    ①. 点字符
    const s = '𠮷';
    /^.$/.test(s)   => false
    /^.$/u.test(s)  => true
    * 上面代码表示，如果不添加 u修饰符，正则表达式就会认为字符串为两个字符，从而匹配失败。
    ②. Unicode 字符表示法
    * ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，
    * 才能识别当中的大括号，否则会被解读为量词。
    /\u{61}/.test('a')      => false
    /\u{61}/u.test('a')     => true
    /\u{20BB7}/u.test('𠮷') => true
    上面代码表示，如果不加 u修饰符，正则表达式无法识别 \u{61}这种表示法，只会认为这匹配 61 个连续的u。
    ③. 量词
    * 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
    /a{2}/.test('aa') => true
    /a{2}/u.test('aa') => true
    /𠮷{2}/.test('𠮷𠮷') => false
    /𠮷{2}/u.test('𠮷𠮷') => true
    ④. 预定义模式
    * u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。
    /^\S$/.test('𠮷') => false
    /^\S$/u.test('𠮷') => true
    * 上面代码的\S是预定义模式，匹配所有非空白字符。只有加了u修饰符，它才能正确匹配码点大于0xFFFF的 Unicode 字符。
    ⑤. i 修饰符
    * 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的 K。
    /[a-z]/i.test('\u212A') => false
    /[a-z]/iu.test('\u212A') => true
    * 上面代码中，不加u修饰符，就无法识别非规范的K字符。
    y   => sticky 
    * y修饰符的作用与 g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。
    * 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而 y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。
    * y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效
    const s = 'aaa_aa_a';
    const r1 = /a+/g;
    const r2 = /a+/y;
    
    r1.exec(s) => ["aaa"] 
    r2.exec(s) => ["aaa"]
    
    r1.exec(s) => ["aa"]
    r2.exec(s) => null
    * 第一次匹配过后，g修饰符和 y修饰符的匹配完全相同，剩余字符串为 '_aa_a'
    * 第二次匹配，因为 g修饰符没有位置限制，所以依然会在后面找到索要匹配的项
    * y修饰符则因为只能从生于部分的起始处开始匹配，也就是'_'的位置， 导致无法匹配， 所以返回的是 null
    s => dotAll 
    * 正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。
    * 一个是四个字节的 UTF-16 字符，这个可以用 u修饰符解决；
    * 另一个是行终止符（line terminator character）。
    * ES2018 引入 s修饰符，使得 .可以匹配任意单个字符。
    /foo.bar/s.test('foo\nbar') => true
    * 此时 .匹配到了字符串中的换行符
*/

/* 
    // 正则表达式的常用属性
    1. flags 此正则的修饰符
    const reg = /reg/ig;
    console.log(reg.flags);     => gi
    2. global, ignoreCase, multiline 判断正则是否使用了对应的修饰符
    const reg = /reg/ig;
    console.log(reg.global);        => true
    console.log(reg.ignoreCase);    => true
    console.log(reg.multiline);     => false
    * ES6+ 新增对应的修饰符
    unicode 表示是否使用了 u修饰符
    sticky  表示是否使用了 y修饰符
    dotAll  表示是否使用了 s修饰符
    const reg = /reg/uy;
    console.log(reg.unicode);    => true
    console.log(reg.sticky);    => true
    console.log(reg.dotAll);    => false
    3. lastIndex    记录上次匹配的位置
    const reg = /reg/g;
    while (reg.exec('regregregreg')) {
        console.log(reg.lastIndex);
    }
    4. source  显示正则表达式的正文
    /abc/ig.source => abc
*/

/* 
    // ES6+ 新增不常用属性名称
    Unicode 属性类
*/