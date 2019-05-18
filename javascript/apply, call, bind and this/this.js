/* 
    总章：this的规则，总是指向调用时的环境
        I. 全局this => window
        II. 隐式绑定：对象的方法中调用， this => 调用的对象
        III. 显示绑定： apply， call， bind  例如： 强制绑定到window  => obj.apply(window)
        IV. new  用构造函数创建的对象，当有new 运算符时，返回的对象将强制绑定this到该对象

        // I. 全局this => window
        1.当在全局使用var定义时
        var a = 2;     // @#@注意， 此处用的是var，var在全局会将变量绑定为window的属性，此处a = 2， 翻译为 window.a = 2； 
        console.log(this);   // 此处this => window
        let obj = {
            a: 3,
            b: this.a,    // 当obj初始化时，this.a => window.a
            test() {
                console.log(this); // 当执行此对象方法时，this => obj
                return {
                    x: this.a,     // 因为执行方法时，this => obj ，所以此处返回的值是 obj自身的属性值
                    y: this.b
                }
            }
        }
        console.log(obj);
        console.log(obj.test());

        // -------- 2.当在函数体内时 -------- 
        function test() {
            var a = 2;    // 此处定义的a变量，脱离window， 作用域为函数function
            console.log(this);   // 此处test函数注册并初始化，所以此处this => window
            let obj = {
                a: 3,
                b: this.a,       // 此处this.a => window.a， 但是因为此时window.a 为 未定义，所以this.a 为 undefined
                test() {
                    console.log(this);   // 当执行此对象方法时， this => obj
                    return {
                        x: this.a,       // 因为执行方法时，this => obj ，所以此处返回的值是 obj自身的属性值
                        y: this.b
                    }
                }
            }
            console.log(obj);
            console.log(obj.test());
        }
        test();

        // -------- 3.当在全局使用let定义时 -------- 
        let a = 2;     // @#@注意， 此处用的是let，let并不会绑定window， 故此处仅仅只是为变量a赋值； console.log(this);
        console.log(this);   // 此处this => window
        let obj = {
            a: 3,
            b: this.a,    // 当obj初始化时，this.a => window.a， 但是window.a 并不存在，所以 this.a 为undefined
            test() {
                console.log(this); // 当执行此对象方法时，this => obj
                return {
                    x: this.a,     // 因为执行方法时，this => obj ，所以此处返回的值是 obj自身的属性值
                    y: this.b
                }
            }
        }
        console.log(obj);
        console.log(obj.test()); 

        II. 隐式绑定：对象的方法中调用， this => 调用的对象
*/
