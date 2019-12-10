# Rxjs 核心概念  
## 概念  
Rxjs 是一个通过 Observable Sequences 来处理 `异步` 以及 `事件` 的 library。它使用了 `观察者模式` 和 `迭代器模式`， 并以 `函数式编程` 和 `响应式编程` 的方式来实现(Purity, Flow, Value)。  
Rx 的核心概念有如下几个：
* Observable: 一个 `可执行事件` 或者 `可观察的值` 的集合。  
* Observer: 一个观察者，一个在`观察到值后知道该如何操作`的集合。
* Subscription: 一个 `Observable执行的指向`，最常用作取消Observable的执行。  
* Subject: 相当于 `EventEmitter`，也是实现 `多播的唯一方式`。
* Schedulers: 用于控制并发，`控制何时执行计算`。
* Operators: Observable提供的对流操作的操作符，受函数式编程思想的影响，它们是`纯函数`。  

## Observable  
