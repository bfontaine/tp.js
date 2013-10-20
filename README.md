# tp.js

[![Build Status](https://travis-ci.org/bfontaine/tp.js.png?branch=master)](https://travis-ci.org/bfontaine/tp.js)

<i><b>tp</b></i> is a lightweight, experimental, library which optimize your
tail-recursive functions so they won’t blow up the stack.

## Install

### With Node

Install it with `npm`:

    [sudo] npm install [-g] tp

Then use:

    var tp = require('tp');

### In the browser

Include `tp.min.js` in your page, before using it. The file is 0.4kb, and only
0.2kb gzip'd. You can download it from [GitHub][gh].

[gh]: https://github.com/bfontaine/tp.js/tree/master/build/

## Usage

Here is a tail-recursive `sum` function, which sums all positive numbers
below its first argument:

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
var sum = tp(function(recur) {
    return function sum( e, acc ) {
        if (acc == undefined) {
            acc = 0;
        }
        return e <= 0 ? acc : recur( e-1, e+acc );
    }
});

sum(2); // 3
sum(200); // 20100
sum(20000); // 200010000
sum(2000000); // 2000001000000
```

The function is the same, but we define it in an anonymous function which takes
a mysterious `recur` as an argument, and use it for recursive calls instead of
the original name of the function.

### Limits

Because this library is experimental, it only works in a few cases. The function
*must* be tail-recursive and *must* use recursion to return something. Below are
some examples of functions that won’t work:

- `function fibo(x) { return x < 2 ? 1 : (fibo(x-1) + fibo(x-2)); }`: not
  tail-recursive
- `function lX(s, n) { if (n == 0) { return; } console.log(s); lX(s, n-1); }`:
  the recursive call is not used to return something
- `function a() { return function() {}; }`: <i>tp</i> doesn’t support functions
  that return functions (see below for more explanations).

Please not that <i>tp</i> doesn’t speed up your function, it only prevents it to blow
up the stack. It means you can make an infinite recursive function, it’ll work.

## How it works

From [Wikipedia][wk]:
> a trampoline is a loop that iteratively invokes thunk-returning functions
> (continuation-passing style). A single trampoline is sufficient to express all
> control transfers of a program; a program so expressed is trampolined, or in
> trampolined style; converting a program to trampolined style is trampolining.
> Trampolined functions can be used to implement tail-recursive function calls in
> stack-oriented programming languages.

[wk]: https://en.wikipedia.org/wiki/Trampoline_(computing)#High_level_programming

<i>tp</i> uses a little bit of magic to bind `recur` in your function to
pre-binded version of itself. Your function now returns either a final result,
either itself binded to some arguments. Then, <i>tp</i> repeatedly calls your function
until it returns something that’s not a function. So it won’t work if your
function returns a function, because <i>tp</i> doesn’t know if it has to call this
function or return it. <i>tp</i> then works as a proxy to your original function,
handing the annoying stuff.

## Licence

MIT

## Changelog

### v0.1.0

- first version
