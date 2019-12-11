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
-----

**以下纯属个人理解**
## Observable  
Observable 是一个整合了 `subscribe方法` 和 `observer对象的` 类。 
1. subscribe方法（一个知道 Observer 如何执行的方法）
```ts
    const observable = new Observable(
        // 整个 function 就是 subscribe 方法
        function(observer) {
            observer.next(value);
            observer.error(error);
            observer.complete();
        }
    );
```
2. observer 对象  
observer 对象是一个拥有 `next`，`error`， `complete` 方法的对象。  
当订阅 Observable 时（也就是调用 observable的 subscribe方法时），subscribe 方法执行 observer 提供的三个方法。
```ts
    const observer = {
        next: (res) => {},
        error: (err) => {},
        complete: () => {}
    };
```
3. 下面是一个简化版的 `Observable` 实现  
```ts
    interface Observer {
        next?: (result?: any) => void;
        error?: (error?: any) => void;
        complete?: () => void;
    }

    interface Subscribe {
        (subscriber: Observer): any;
    }

    class MyObservable {

        private _subscribe: Subscriber;

        constructor(subscribe?: Subscriber) {
            if (subscribe) {
                this._subscribe = subscribe;
            }
        }

        public subscribe(observer: Observer): void {
            this._subscribe(observer);
        } 

        static create(subscriber?: Subscriber): MyObservable {
            return new MyObservable(subscriber);
        }
    }

    const myObservable = MyObservable.create(observer => {
        observer.next('next1');
        observer.next('next2');
        observer.next('next3');
        observer.error('error');
        observer.complete('complete');
    });

    myObservable.subscribe({
        next(res) {
            console.log(res);
        },
        error(err) {
            console.log(err);
        },
        complete() {
            console.log('complete');
        }
    });
```
