function WindowResize(){
    var onWindowSizeCng = [];
    var delay = 0;

    /**
     * $.browser.msie' 为空或不是对象，
     * 这个是jQuery错误出现这个错误，是因为升级了jQuery版本，
     * 从1.9以前升级到1.9以后，因为$.browser.msie在1.9以后的jQuery中不存在了，
     * 所以报错
     */
    if ($.browser.msie) {
        var mask = document.createElement("div");
        mask.style.cssText = "width:100%;height:0px;position:absolute;bottom:0px;left:0px;overflow:hidden";
        document.body.appendChild(mask);
        mask.onresize = resizeFn();
    } else {
        window.onresize = resizeFn();;
    }

    function resizeFn(){
         delay && clearTimeout(delay);
         delay = window.setTimeout(function() {
            var j = onWindowSizeCng.length;
            for (var i = 0; i < j; i++) onWindowSizeCng[i]();
         }, 240);
    }

    this.bind = function(f){
        onWindowSizeCng.push(f)
    }
}

// WindowResize.prototype = {
//     bind : function(f) {
//          this.onWindowSizeCng.push(f);
//     }
// }



function Slide(){
    var resize = new WindowResize();

    var defaultConfig = {
        unit: false,
        btn: false,
        btnpn: false,
        btnEvent: "click",
        fcsCls: "current",
        transition: "fade",
        data_attr: "data-img",
        setting: {
            stay: 5e3,
            speed: 500
        }
    };

    function genBtns(unit, opt) {
        if (opt.btn) return $(opt.btn);
    }
    function showUnit(u, opt) {
        u = $(u);
        var src = u.attr(opt.data_attr);
        if (!src) return;
        u.css("background-image", "url(" + src + ")").removeAttr(opt.data_attr);
    }
    function loadImgs(unit, opt, startIndex) {
        if (!opt.data_attr) return;
        var i = startIndex || 0, j = unit.length;
        unit = $(unit);
        function load2show() {
            if (i >= j) return;
            if (opt.process.loaded[i]) return;
            ///console.log(unit , i )
            var div = unit.eq(i).find("[" + opt.data_attr + "]");
            opt.process.loaded[i] = true;
            div.each(function() {
                showUnit(this, opt);
            });
            i++;
            window.setTimeout(load2show, opt.setting.stay - 10);
        }
        load2show();
    }
    function tab(unit, last, index, opt, cbk) {
        //console.log(last , index)
        if (undefined == last) {
            opt.process.stage.css({
                position: "relative",
                overflow: "hidden"
            });
            opt.process.stage.css({
                cursor: "pointer"
            });
            unit.each(function(i) {
                $(this).css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    "z-index": i === index ? 2 : 0
                });
            });
            cbk && cbk(index);
            return;
        }
        var last = unit.eq(last), index = unit.eq(index);
        if (opt.setting.speed) {
            index.css("z-index", 1);
            function onFinish(el) {
                last.css({
                    "z-index": 0,
                    left: 0,
                    top: 0
                }).show();
                index.css("z-index", 2);
                cbk && cbk(index);
            }
            switch (opt.transition) {
              case "fade":
                last.stop(true, true).fadeOut(opt.setting.speed, onFinish);
                break;

              case "slideV":
                var sizeAttr = "stageHeight", direction = 1, cssAttr = "top";
                break;

              case "slideH":
                var sizeAttr = "stageWidth", direction = -1, cssAttr = "left";
                break;
            }
            if (sizeAttr) {
                var css = {};
                css[cssAttr] = direction * opt.process[sizeAttr];
                last.stop(true, true).animate(css, opt.setting.speed, onFinish);
            }
        } else {
            last.css("z-index", 0);
            index.css("z-index", 2);
            cbk && cbk(index);
        }
    }
    function scroll(unit, last, index, opt, cbk) {
        var processParam = opt.process;
        if (undefined == last && "scrollH" == opt.transition) {
            var stg_w = processParam.stageWidth;
            processParam.stage.css({
                position: "relative"
            });
            function setUnit(stg_w) {
                unit.each(function(k, u) {
                    $(u).css({
                        position: "absolute",
                        width: stg_w,
                        left: k * stg_w,
                        top: 0
                    });
                });
            }
            setUnit(stg_w);
            resize.bind(function() {
                processParam.stageWidth = processParam.stage.width() + parseInt(processParam.stage.css("margin-left"));
                setUnit(processParam.stageWidth);
            });
        }
        if ("scrollV" == opt.transition) {
            var direction = "margin-top", sizeAttr = "stageHeight";
        } else {
            var direction = "margin-left", sizeAttr = "stageWidth";
        }
        var animate = {};
        animate[direction] = -index * processParam[sizeAttr];
        processParam.stage.stop(true, true).animate(animate, opt.setting.speed, cbk);
    }
    function indexActive(unit, btns, opt, cbk) {
        var processParam = opt.process;
        var last = processParam.last, index = processParam.index;
        if (index < 0) processParam.index = index = unit.length - 1;
        if (index >= unit.length) processParam.index = index = 0;
        processParam.timer && window.clearTimeout(processParam.timer);
        if (opt.setting.stay) {
            processParam.timer = window.setTimeout(function() {
                processParam.index++;
                indexActive(unit, btns, opt, cbk);
            }, opt.setting.stay);
        }
        if (last === index) return;
        if (!processParam.loaded[index]) {
            loadImgs(unit, opt, index);
        }
        processParam.animating = true;
        if (undefined != last) {
            opt.fcsCls && btns.eq(last).removeClass(opt.fcsCls);
        }
        opt.fcsCls && btns.eq(index).addClass(opt.fcsCls);
        function onFinish(el) {
            processParam.animating = false;
            cbk && cbk(el);
        }
        switch (opt.transition) {
          case "slideH":
          case "slideV":
          case "tab":
          case "fade":
            tab(unit, last, index, opt, onFinish);
            break;

          case "scrollV":
          case "scrollH":
            scroll(unit, last, index, opt, onFinish);
            break;
        }
        processParam.last = index;
    }
    function activeStage(unit, btns, opt) {
        var processParam = opt.process;
        processParam.index = opt.process.index;
        indexActive(unit, btns, opt, opt.cbk);
        if (opt.toprev) {
            $(opt.toprev).bind(opt.btnEvent, function() {
                processParam.index -= 1;
                indexActive(unit, btns, opt, opt.cbk);
            }).bind("mouseover", function() {
                processParam.stage.trigger("mouseover");
            }).bind("mouseout", function() {
                processParam.stage.trigger("mouseout");
            });
        }
        if (opt.tonext) {
            $(opt.tonext).bind(opt.btnEvent, function() {
                processParam.index += 1;
                indexActive(unit, btns, opt, opt.cbk);
            }).bind("mouseover", function() {
                processParam.stage.trigger("mouseover");
            }).bind("mouseout", function() {
                processParam.stage.trigger("mouseout");
            });
        }
        btns.bind(opt.btnEvent, function() {
            if (opt.btnStepAttr) {
                var i = $(this).attr(opt.btnStepAttr) * 1;
                processParam.index += i;
            } else {
                var i = $(this).data("_fi");
                if (undefined === i) {
                    i = $(this).index(), $(this).data("_fi", i);
                }
                processParam.index = i;
            }
            indexActive(unit, btns, opt, opt.cbk);
        });
        processParam.stage.bind("mouseover", function() {
            processParam.timer && window.clearTimeout(processParam.timer);
        }).bind("mouseout", function() {
            if (processParam.animating) return;
            processParam.timer = window.setTimeout(function() {
                processParam.index++;
                indexActive(unit, btns, opt, opt.cbk);
            }, opt.setting.stay / 3);
        });
        $(".banner").bind("mouseover", function() {
            $(opt.btnpn).show();
        }).bind("mouseout", function() {
            $(opt.btnpn).hide();
        });
    }

     function init(opt) {
        /*
        如果想要得到合并的结果却又不想修改dest的结构，可以如下使用：var newSrc=$.extend({},src1,src2,src3...)//也就是将"{}"作为dest参数。*/
        opt = $.extend({}, defaultConfig, opt);
        //合并默认参数与传入参数
        opt.process = {
            loaded: {}
        };
        opt.process.index = +opt.index || 0;
        if (!opt.unit) throw "unit is not config";
        var unit = $(opt.unit), stage = opt.stage ? $(opt.stage) : unit.parent();
        //loadImgs(unit , opt)
        opt.process.stage = stage;
        opt.process.stageWidth = stage.width();
        opt.process.stageHeight = stage.height();
        var btns = genBtns(unit, opt);
        activeStage(unit, btns, opt);
    }

    this.bind = init;

}

var slide = new Slide();
var unit = ".top_bnr .banner li";
    slide.bind({
        unit: unit,
        btn: ".round .adType a",
        transition: "fade",
        toprev: ".bnr_btn_left",
        tonext: ".bnr_btn_right",
        cbk: function(el) {
            if (typeof el == "number") {
                el = $(unit).eq(el);
            }
        }
    });

