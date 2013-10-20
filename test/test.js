// for tests on Node only
if ( typeof window === 'undefined' ) {

    var build    = process.env.TP_COV ? 'build-cov' : 'build',
        suffix   = process.env.TP_MIN ? '.min.js' : '',
        tp       = require( __dirname + '/../'
                                + build + '/tp' + suffix ),
        chai     = require( 'chai' );

}

var     expect   = chai.expect,
        noop     = function(){};

describe( 'tp', function() {
    it( 'should be a function', function() {
        expect(tp).to.be.a( 'function' );
    });
});

/*
var tp = require('../src/tp'),
    f;

s = tp(function(recur) {
    return function sum( e, acc ) {
    
        if (acc === undefined) {
            acc = 0;
        }

        return e == 0 ? acc : recur( e-1, e+acc );
    };
});

console.log(s(1));
console.log(s(2));
console.log(s(20));
console.log(s(20000));
*/
