function bindArray(f, arr) {
    return f.apply.bind(f, null, arr);
}


exports.tpdef = function( fn ) {

    var f,
        tp = function() {
            return bindArray(f, arguments);
        };
    
    f = fn(tp);

    return function() {
        var ff = bindArray(f, arguments);
        while (typeof ff == 'function') { ff = ff(); }
        return ff;
    }

};
