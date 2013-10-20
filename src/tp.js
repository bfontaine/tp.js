(function( root, factory ) {

    if (typeof define == 'function' && define.amd) {
        define(factory);
    } else if (typeof exports == 'object') {
        module.exports = factory();
    } else {
        root.tp = factory();
    }

})(this, function() {
    'use strict';

    /**
     * Bind a function to an array of arguments
     * @f [Function]
     * @arr [Array]
     *
     * For example,
     *   bindArray(f, [42, 17])()
     * is equivalent to:
     *   f(42, 17)
     **/
    function bindArray(f, arr) {
        return f.apply.bind(f, null, arr);
    }

    /**
     * This is the only one exported function. It takes an anonymous function, which
     * itself return the function we want to optimize.
     **/
    return function( fn ) {

        var f,
            recur = function() {
                return bindArray(f, arguments);
            };
        
        f = fn(recur);

        return function() {
            var ff = bindArray(f, arguments);
            while (typeof ff == 'function') { ff = ff(); }
            return ff;
        }

    };

});
