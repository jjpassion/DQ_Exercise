/**
 * require 模块格式
 * @param  {[type]} moduleA     模块A
 * @param  {[type]} moduleB     模块B
 * @param  {[type]} moduleC     模块C
 * @return {[type]}    [description]
 */
/**
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　　// some code here
　　});
**/


/*

使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。

 */
// require.config({
//    // baseUrl: "./script-min",  //或者直接更改基目录
// 　　paths: {
// 　　　　"jquery": "script-min/jquery",
// 　　}
// });

// require(['test','test2'],function(test,test2){
// 	console.log(test,test2)
// 	// console.log($('.wrap').html(),'====')
// });

//目录是从当前js的目录开始计算
//
require.config({
    paths:{
        "a":"test",
        "b":"test2"
    }
});

require(['a','b'],function(a,b){
	// console.log(a,b)
    a.hello();
    b.hello();
    // c.hello();
});