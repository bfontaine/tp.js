# tp.js

`tp.js` is a lightweight library which optimize your tail-recursive functions.

## Usage

Here is a tail-recursive `sum` function, which sums all positive numbers
under its argument:

```js
function sum( e, acc ) {
    if (acc == undefined) {
        acc = 0;
    }
    return e <= 0 ? acc : sum( e-1, e+acc );
}

sum(2); // 3
sum(200); // 20100
sum(20000); // RangeError: Maximum call stack size exceeded
```

Here is the same function defined using tp:

```js
var sum = tpdef(function(tp) {
    return function sum( e, acc ) {
        if (acc == undefined) {
            acc = 0;
        }
        return e <= 0 ? acc : tp( e-1, e+acc );
    }
});

sum(2); // 3
sum(200); // 20100
sum(20000); // 200010000
sum(2000000); // 2000001000000
```

The function is the same, but we use `tp` instead of the name of the function
for recursive calls. It’s also wrapped in an anonymous function to bind `tp` in
the function body.
