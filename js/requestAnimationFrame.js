var lastTime = 0
//各浏览器前缀
	,prefixes = 'webkit moz ms o'.split('')
	,prefix

var requestAnimationFrame = window.requestAnimationFrame
	,cancelAnimationFrame = window.requestAnimationFrame

/**
 * 通过遍历各浏览器前缀，来得到requestAnimationFrame 和 cancelAnimationFrame在当前浏览器的实现形式
 */
 
 for (var i = 0,len = prefixes.length; i < len; i+=1) {

 	if( requestAnimationFrame && cancelAnimationFrame ){
 		break;
 	}

 	prefix = prefixes[i];

 	requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];

 	cancelAnimationFrame = cancelAnimationFrame || window[ prefix + 'CancelAnimationFrame'] || window[ prefix + 'CancelRequestAnimationFrame' ];
 };

 /*
  * 如果当前浏览器不支持 requestAnimationFrame 和 cancelAnimationFrame ，则会退到setTimeout
  */
 if( !requestAnimationFrame || !cancelAnimationFrame ){
 	requestAnimationFrame = function( callback, element){
 		/* 得到当前的时间戳：+new Date(), Date.now()-有兼容性, new Date.valueOf(),new Date().getTime(); 其中第一种跟最后一种最常用。*/
 		var currTime = new Date().getTime();

 		var timeToCall = Math.max( 0, 16 - (currTime - lastTime) );

 		var id = window.setTimeout( function(){
 			callback( currTime + timeToCall );
 		} , timeToCall)

 		lastTime = currTime + timeToCall;
 		return id;
 	};

 	cancelAnimationFrame  = function(id){
 		window.clearTimeout( id );
 	};
 }

 /* 得到兼容各浏览器的API */
 window.requestAnimationFrame = requestAnimationFrame;
 window.cancelAnimationFrame = cancelAnimationFrame;

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