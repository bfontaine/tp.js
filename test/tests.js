var tpdef = require('./e').tpdef,
    f;

s = tpdef(function(tp) {
    return function sum( e, acc ) {
    
        if (acc === undefined) {
            acc = 0;
        }

        return e == 0 ? acc : tp( e-1, e+acc );

    }
});

console.log(s(1));
console.log(s(2));
console.log(s(20));
console.log(s(20000));
