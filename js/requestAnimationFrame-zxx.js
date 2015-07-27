/* requestAnimationFrame.js
 * 2013-09-30
*/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz' /*, 'ms', 'o'*/];
    for(var x = 0,len = vendors.length ; x < len && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/* 方案2：*/
/*
var oldStyleMove = (function() {
    var timeLast = 0

    return function( callback ) {
        var timeCurrent = +new Date(),
            timeDelta

        timeDelta = Math.max( 0, 16 - ( timeCurrent - timeLast ))
        timeLast  = timeCurrent + timeDelta

        return setTimeout( function() { 
            callback( timeCurrent + timeDelta ) 
        }, timeDelta )
    }
})(),

WIN = window,

requestAnimationFrame = WIN.requestAnimationFrame       ||
                        WIN.webkitRequestAnimationFrame ||
                        WIN.mozRequestAnimationFrame    ||
                        oldStyleMove,

cancelAnimationFrame  = WIN.cancelAnimationFrame       ||
                        WIN.webkitCancelAnimationFrame ||
                        WIN.mozCancelAnimationFrame    ||
                        function( timeoutID ) {
                            clearTimeout( timeoutID )
                        };

*/