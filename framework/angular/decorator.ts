export function Decorator() {
  return (target, name, descriptor) => {
    const oldInit = target.ngOnInit;
    const oldTest = target[name];
    const oldDestroy = target.ngOnDestroy;

    target.ngOnInit = function() {
      console.log('init-efore');
      console.log(this);
      oldInit.call(this);
      console.log('init-after');
    };

    descriptor.value = function() {
      console.log('testBefore');
      console.log(this);
      oldTest.call(this);
      console.log('testAfter');
    };

    target.ngOnDestroy = function() {
      console.log('destroy-before');
      console.log(this);
      oldDestroy.call(this);
      console.log('destroy-after');
    };
  };
}
