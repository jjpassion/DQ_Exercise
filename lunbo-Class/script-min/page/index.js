/*
 * loader.js
 *
 * Copyright (c) 2012 'PerfectWorks' Ethan Zhang
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

/*jslint browser: true*/

(function (window) {
    'use strict';
    if (window.define) {
        return;
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

    var MM = {};
    var initModuleName = null;
    var scripts = window.document.getElementsByTagName('script');

    var i;
    for (i = 0; i < scripts.length && !initModuleName; i++) {
        initModuleName = scripts[i].getAttribute('data-main');
    }

    if (!initModuleName) {
        throw new Error('No data-main attribute in script tag.');
    }

    var require;

    var runModule = function runModule(name) {
        var exports = {};
        var module = MM[name];

        if (isFunction(MM[name].factory)) {
            var ret = MM[name].factory.apply(undefined, [require, exports, undefined]); // Argument 'module' hasn't been implemented yet.
            module.ret = ret === undefined ? exports : ret;
        } else {
            module.ret = MM[name].factory;
        }
        module.inited = true;
    };

    require = function require(name) {
        if (!MM[name]) {
            throw new Error('Module ' + name + ' is not defined.');
        }

        var module = MM[name];

        if (module.inited === false) {
            runModule(name);
        }

        return module.ret;
    };

    var define = function define(name, deps, factory) {
        if (MM[name]) {
            throw new Error('Module ' + name + ' has been defined already.');
        }

        if (isFunction(deps)) {
            factory = deps;
        }

        MM[name] = {
            factory: factory,
            inited: false
        };

        if (name === initModuleName) {
            runModule(name);
        }
    };

    window.define = define;
}(window));
;
define("app/jquery", function() {
    function E(a) {
        var b = D[a] = {};
        return n.each(a.split(q), function(a, c) {
            b[c] = !0;
        }), b;
    }
    function H(a, b, c) {
        if (c === undefined && a.nodeType === 1) {
            var d = "data-" + b.replace(G, "-$1").toLowerCase();
            c = a.getAttribute(d);
            if (typeof c == "string") {
                try {
                    c = c === "true" ? !0 : c === "false" ? !1 : c === "null" ? null : +c + "" === c ? +c : F.test(c) ? n.parseJSON(c) : c;
                } catch (e) {}
                n.data(a, b, c);
            } else c = undefined;
        }
        return c;
    }
    function I(a) {
        var b;
        for (b in a) {
            if (b === "data" && n.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1;
        }
        return !0;
    }
    function $() {
        return !1;
    }
    function _() {
        return !0;
    }
    function fb(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function gb(a, b) {
        do a = a[b]; while (a && a.nodeType !== 1);
        return a;
    }
    function hb(a, b, c) {
        b = b || 0;
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return n.grep(a, function(a, d) {
            return a === b === c;
        });
        if (typeof b == "string") {
            var d = n.grep(a, function(a) {
                return a.nodeType === 1;
            });
            if (cb.test(b)) return n.filter(b, d, !c);
            b = n.filter(b, d);
        }
        return n.grep(a, function(a, d) {
            return n.inArray(a, b) >= 0 === c;
        });
    }
    function ib(a) {
        var b = jb.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    function Ab(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
    }
    function Bb(a, b) {
        if (b.nodeType !== 1 || !n.hasData(a)) return;
        var c, d, e, f = n._data(a), g = n._data(b, f), h = f.events;
        if (h) {
            delete g.handle, g.events = {};
            for (c in h) for (d = 0, e = h[c].length; d < e; d++) n.event.add(b, c, h[c][d]);
        }
        g.data && (g.data = n.extend({}, g.data));
    }
    function Cb(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), 
        c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), 
        n.support.html5Clone && a.innerHTML && !n.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && tb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, 
        b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), 
        b.removeAttribute(n.expando);
    }
    function Db(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function Eb(a) {
        tb.test(a.type) && (a.defaultChecked = a.checked);
    }
    function Vb(a, b) {
        if (b in a) return b;
        var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = Tb.length;
        while (e--) {
            b = Tb[e] + c;
            if (b in a) return b;
        }
        return d;
    }
    function Wb(a, b) {
        return a = b || a, n.css(a, "display") === "none" || !n.contains(a.ownerDocument, a);
    }
    function Xb(a, b) {
        var c, d, e = [], f = 0, g = a.length;
        for (;f < g; f++) {
            c = a[f];
            if (!c.style) continue;
            e[f] = n._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), 
            c.style.display === "" && Wb(c) && (e[f] = n._data(c, "olddisplay", _b(c.nodeName)))) : (d = Fb(c, "display"), 
            !e[f] && d !== "none" && n._data(c, "olddisplay", d));
        }
        for (f = 0; f < g; f++) {
            c = a[f];
            if (!c.style) continue;
            if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? e[f] || "" : "none";
        }
        return a;
    }
    function Yb(a, b, c) {
        var d = Mb.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function Zb(a, b, c, d) {
        var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0;
        for (;e < 4; e += 2) c === "margin" && (f += n.css(a, c + Sb[e], !0)), d ? (c === "content" && (f -= parseFloat(Fb(a, "padding" + Sb[e])) || 0), 
        c !== "margin" && (f -= parseFloat(Fb(a, "border" + Sb[e] + "Width")) || 0)) : (f += parseFloat(Fb(a, "padding" + Sb[e])) || 0, 
        c !== "padding" && (f += parseFloat(Fb(a, "border" + Sb[e] + "Width")) || 0));
        return f;
    }
    function $b(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = n.support.boxSizing && n.css(a, "boxSizing") === "border-box";
        if (d <= 0) {
            d = Fb(a, b);
            if (d < 0 || d == null) d = a.style[b];
            if (Nb.test(d)) return d;
            e = f && (n.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0;
        }
        return d + Zb(a, b, c || (f ? "border" : "content"), e) + "px";
    }
    function _b(a) {
        if (Pb[a]) return Pb[a];
        var b = n("<" + a + ">").appendTo(c.body), d = b.css("display");
        b.remove();
        if (d === "none" || d === "") {
            Gb = c.body.appendChild(Gb || n.extend(c.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Hb || !Gb.createElement) Hb = (Gb.contentWindow || Gb.contentDocument).document, 
            Hb.write("<!doctype html><html><body>"), Hb.close();
            b = Hb.body.appendChild(Hb.createElement(a)), d = Fb(b, "display"), c.body.removeChild(Gb);
        }
        return Pb[a] = d, d;
    }
    function fc(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || bc.test(a) ? d(a, e) : fc(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d);
        }); else if (!c && n.type(b) === "object") for (e in b) fc(a + "[" + e + "]", b[e], c, d); else d(a, b);
    }
    function wc(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            var d, e, f, g = b.toLowerCase().split(q), h = 0, i = g.length;
            if (n.isFunction(c)) for (;h < i; h++) d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), 
            e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c);
        };
    }
    function xc(a, b, c, d, e, f) {
        e = e || b.dataTypes[0], f = f || {}, f[e] = !0;
        var g, h = a[e], i = 0, j = h ? h.length : 0, k = a === sc;
        for (;i < j && (k || !g); i++) g = h[i](b, c, d), typeof g == "string" && (!k || f[g] ? g = undefined : (b.dataTypes.unshift(g), 
        g = xc(a, b, c, d, g, f)));
        return (k || !g) && !f["*"] && (g = xc(a, b, c, d, "*", f)), g;
    }
    function yc(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (c in b) b[c] !== undefined && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        d && n.extend(!0, a, d);
    }
    function zc(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes, j = a.responseFields;
        for (e in j) e in c && (b[j[e]] = c[e]);
        while (i[0] === "*") i.shift(), d === undefined && (d = a.mimeType || b.getResponseHeader("content-type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break;
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break;
                }
                g || (g = e);
            }
            f = f || g;
        }
        if (f) return f !== i[0] && i.unshift(f), c[f];
    }
    function Ac(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        a.dataFilter && (b = a.dataFilter(b, a.dataType));
        if (g[1]) for (c in a.converters) i[c.toLowerCase()] = a.converters[c];
        for (;e = g[++j]; ) if (e !== "*") {
            if (h !== "*" && h !== e) {
                c = i[h + " " + e] || i["* " + e];
                if (!c) for (d in i) {
                    f = d.split(" ");
                    if (f[1] === e) {
                        c = i[h + " " + f[0]] || i["* " + f[0]];
                        if (c) {
                            c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                            break;
                        }
                    }
                }
                if (c !== !0) if (c && a["throws"]) b = c(b); else try {
                    b = c(b);
                } catch (k) {
                    return {
                        state: "parsererror",
                        error: c ? k : "No conversion from " + h + " to " + e
                    };
                }
            }
            h = e;
        }
        return {
            state: "success",
            data: b
        };
    }
    function Ic() {
        try {
            return new window.XMLHttpRequest();
        } catch (a) {}
    }
    function Jc() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (a) {}
    }
    function Rc() {
        return setTimeout(function() {
            Kc = undefined;
        }, 0), Kc = n.now();
    }
    function Sc(a, b) {
        n.each(b, function(b, c) {
            var d = (Qc[b] || []).concat(Qc["*"]), e = 0, f = d.length;
            for (;e < f; e++) if (d[e].call(a, b, c)) return;
        });
    }
    function Tc(a, b, c) {
        var d, e = 0, f = 0, g = Pc.length, h = n.Deferred().always(function() {
            delete i.elem;
        }), i = function() {
            var b = Kc || Rc(), c = Math.max(0, j.startTime + j.duration - b), d = 1 - (c / j.duration || 0), e = 0, f = j.tweens.length;
            for (;e < f; e++) j.tweens[e].run(d);
            return h.notifyWith(a, [ j, d, c ]), d < 1 && f ? c : (h.resolveWith(a, [ j ]), 
            !1);
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Kc || Rc(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c, d) {
                var e = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(e), e;
            },
            stop: function(b) {
                var c = 0, d = b ? j.tweens.length : 0;
                for (;c < d; c++) j.tweens[c].run(1);
                return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
            }
        }), k = j.props;
        Uc(k, j.opts.specialEasing);
        for (;e < g; e++) {
            d = Pc[e].call(j, a, k, j.opts);
            if (d) return d;
        }
        return Sc(j, k), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            anim: j,
            queue: j.opts.queue,
            elem: a
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always);
    }
    function Uc(a, b) {
        var c, d, e, f, g;
        for (c in a) {
            d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), 
            c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d];
            if (g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e);
            } else b[d] = e;
        }
    }
    function Vc(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = a.style, o = {}, p = [], q = a.nodeType && Wb(a);
        c.queue || (j = n._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, 
        j.empty.fire = function() {
            j.unqueued || k();
        }), j.unqueued++, l.always(function() {
            l.always(function() {
                j.unqueued--, n.queue(a, "fx").length || j.empty.fire();
            });
        })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [ m.overflow, m.overflowX, m.overflowY ], 
        n.css(a, "display") === "inline" && n.css(a, "float") === "none" && (!n.support.inlineBlockNeedsLayout || _b(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), 
        c.overflow && (m.overflow = "hidden", n.support.shrinkWrapBlocks || l.done(function() {
            m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2];
        }));
        for (d in b) {
            f = b[d];
            if (Mc.exec(f)) {
                delete b[d];
                if (f === (q ? "hide" : "show")) continue;
                p.push(d);
            }
        }
        g = p.length;
        if (g) {
            h = n._data(a, "fxshow") || n._data(a, "fxshow", {}), q ? n(a).show() : l.done(function() {
                n(a).hide();
            }), l.done(function() {
                var b;
                n.removeData(a, "fxshow", !0);
                for (b in o) n.style(a, b, o[b]);
            });
            for (d = 0; d < g; d++) e = p[d], i = l.createTween(e, q ? h[e] : 0), o[e] = h[e] || n.style(a, e), 
            e in h || (h[e] = i.start, q && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0));
        }
    }
    function Wc(a, b, c, d, e) {
        return new Wc.prototype.init(a, b, c, d, e);
    }
    function Xc(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (;e < 4; e += 2 - b) c = Sb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d;
    }
    function Zc(a) {
        return n.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    var a, b, c = window.document, d = window.location, e = window.navigator, f = window.jQuery, g = window.$, h = Array.prototype.push, i = Array.prototype.slice, j = Array.prototype.indexOf, k = Object.prototype.toString, l = Object.prototype.hasOwnProperty, m = String.prototype.trim, n = function(b, c) {
        return new n.fn.init(b, c, a);
    }, o = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, p = /\S/, q = /\s+/, r = p.test("聽") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, s = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, t = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, u = /^[\],:{}\s]*$/, v = /(?:^|:|,)(?:\s*\[)+/g, w = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, x = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, y = /^-ms-/, z = /-([\da-z])/gi, A = function(a, b) {
        return (b + "").toUpperCase();
    }, B = function() {
        c.addEventListener ? (c.removeEventListener("DOMContentLoaded", B, !1), n.ready()) : c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), 
        n.ready());
    }, C = {};
    n.fn = n.prototype = {
        constructor: n,
        init: function(a, b, d) {
            var e, f, g, h;
            if (!a) return this;
            if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
            if (typeof a == "string") {
                a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? e = [ null, a, null ] : e = s.exec(a);
                if (e && (e[1] || !b)) {
                    if (e[1]) return b = b instanceof n ? b[0] : b, h = b && b.nodeType ? b.ownerDocument || b : c, 
                    a = n.parseHTML(e[1], h, !0), t.test(e[1]) && n.isPlainObject(b) && this.attr.call(a, b, !0), 
                    n.merge(this, a);
                    f = c.getElementById(e[2]);
                    if (f && f.parentNode) {
                        if (f.id !== e[2]) return d.find(a);
                        this.length = 1, this[0] = f;
                    }
                    return this.context = c, this.selector = a, this;
                }
                return !b || b.jquery ? (b || d).find(a) : this.constructor(b).find(a);
            }
            return n.isFunction(a) ? d.ready(a) : (a.selector !== undefined && (this.selector = a.selector, 
            this.context = a.context), n.makeArray(a, this));
        },
        selector: "",
        jquery: "1.8.0",
        length: 0,
        size: function() {
            return this.length;
        },
        toArray: function() {
            return i.call(this);
        },
        get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
        },
        pushStack: function(a, b, c) {
            var d = n.merge(this.constructor(), a);
            return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), 
            d;
        },
        each: function(a, b) {
            return n.each(this, a, b);
        },
        ready: function(a) {
            return n.ready.promise().done(a), this;
        },
        eq: function(a) {
            return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        slice: function() {
            return this.pushStack(i.apply(this, arguments), "slice", i.call(arguments).join(","));
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b);
            }));
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: h,
        sort: [].sort,
        splice: [].splice
    }, n.fn.init.prototype = n.fn, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        typeof g == "boolean" && (j = g, g = arguments[1] || {}, h = 2), typeof g != "object" && !n.isFunction(g) && (g = {}), 
        i === h && (g = this, --h);
        for (;h < i; h++) if ((a = arguments[h]) != null) for (b in a) {
            c = g[b], d = a[b];
            if (g === d) continue;
            j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, 
            g[b] = n.extend(j, f, d)) : d !== undefined && (g[b] = d);
        }
        return g;
    }, n.extend({
        noConflict: function(a) {
            return window.$ === n && (window.$ = g), a && window.jQuery === n && (window.jQuery = f), 
            n;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0);
        },
        ready: function(a) {
            if (a === !0 ? --n.readyWait : n.isReady) return;
            if (!c.body) return setTimeout(n.ready, 1);
            n.isReady = !0;
            if (a !== !0 && --n.readyWait > 0) return;
            b.resolveWith(c, [ n ]), n.fn.trigger && n(c).trigger("ready").off("ready");
        },
        isFunction: function(a) {
            return n.type(a) === "function";
        },
        isArray: Array.isArray || function(a) {
            return n.type(a) === "array";
        },
        isWindow: function(a) {
            return a != null && a == a.window;
        },
        isNumeric: function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a);
        },
        type: function(a) {
            return a == null ? String(a) : C[k.call(a)] || "object";
        },
        isPlainObject: function(a) {
            if (!a || n.type(a) !== "object" || a.nodeType || n.isWindow(a)) return !1;
            try {
                if (a.constructor && !l.call(a, "constructor") && !l.call(a.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (b) {
                return !1;
            }
            var c;
            for (c in a) ;
            return c === undefined || l.call(a, c);
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0;
        },
        error: function(a) {
            throw new Error(a);
        },
        parseHTML: function(a, b, d) {
            var e;
            return !a || typeof a != "string" ? null : (typeof b == "boolean" && (d = b, b = 0), 
            b = b || c, (e = t.exec(a)) ? [ b.createElement(e[1]) ] : (e = n.buildFragment([ a ], b, d ? null : []), 
            n.merge([], (e.cacheable ? n.clone(e.fragment) : e.fragment).childNodes)));
        },
        parseJSON: function(a) {
            if (!a || typeof a != "string") return null;
            a = n.trim(a);
            if (window.JSON && window.JSON.parse) return window.JSON.parse(a);
            if (u.test(a.replace(w, "@").replace(x, "]").replace(v, ""))) return new Function("return " + a)();
            n.error("Invalid JSON: " + a);
        },
        parseXML: function(a) {
            var b, c;
            if (!a || typeof a != "string") return null;
            try {
                window.DOMParser ? (c = new DOMParser(), b = c.parseFromString(a, "text/xml")) : (b = new ActiveXObject("Microsoft.XMLDOM"), 
                b.async = "false", b.loadXML(a));
            } catch (d) {
                b = undefined;
            }
            return (!b || !b.documentElement || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), 
            b;
        },
        noop: function() {},
        globalEval: function(a) {
            a && p.test(a) && (window.execScript || function(a) {
                window.eval.call(window, a);
            })(a);
        },
        camelCase: function(a) {
            return a.replace(y, "ms-").replace(z, A);
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
        },
        each: function(a, b, c) {
            var d, e = 0, f = a.length, g = f === undefined || n.isFunction(a);
            if (c) {
                if (g) {
                    for (d in a) if (b.apply(a[d], c) === !1) break;
                } else for (;e < f; ) if (b.apply(a[e++], c) === !1) break;
            } else if (g) {
                for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
            } else for (;e < f; ) if (b.call(a[e], e, a[e++]) === !1) break;
            return a;
        },
        trim: m ? function(a) {
            return a == null ? "" : m.call(a);
        } : function(a) {
            return a == null ? "" : a.toString().replace(r, "");
        },
        makeArray: function(a, b) {
            var c, d = b || [];
            return a != null && (c = n.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || n.isWindow(a) ? h.call(d, a) : n.merge(d, a)), 
            d;
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (j) return j.call(b, a, c);
                d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                for (;c < d; c++) if (c in b && b[c] === a) return c;
            }
            return -1;
        },
        merge: function(a, b) {
            var c = b.length, d = a.length, e = 0;
            if (typeof c == "number") for (;e < c; e++) a[d++] = b[e]; else while (b[e] !== undefined) a[d++] = b[e++];
            return a.length = d, a;
        },
        grep: function(a, b, c) {
            var d, e = [], f = 0, g = a.length;
            c = !!c;
            for (;f < g; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
            return e;
        },
        map: function(a, b, c) {
            var d, e, f = [], g = 0, h = a.length, i = a instanceof n || h !== undefined && typeof h == "number" && (h > 0 && a[0] && a[h - 1] || h === 0 || n.isArray(a));
            if (i) for (;g < h; g++) d = b(a[g], g, c), d != null && (f[f.length] = d); else for (e in a) d = b(a[e], e, c), 
            d != null && (f[f.length] = d);
            return f.concat.apply([], f);
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return typeof b == "string" && (c = a[b], b = a, a = c), n.isFunction(a) ? (d = i.call(arguments, 2), 
            e = function() {
                return a.apply(b, d.concat(i.call(arguments)));
            }, e.guid = a.guid = a.guid || e.guid || n.guid++, e) : undefined;
        },
        access: function(a, b, c, d, e, f, g) {
            var h, i = c == null, j = 0, k = a.length;
            if (c && typeof c == "object") {
                for (j in c) n.access(a, b, j, c[j], 1, f, d);
                e = 1;
            } else if (d !== undefined) {
                h = g === undefined && n.isFunction(d), i && (h ? (h = b, b = function(a, b, c) {
                    return h.call(n(a), c);
                }) : (b.call(a, d), b = null));
                if (b) for (;j < k; j++) b(a[j], c, h ? d.call(a[j], j, b(a[j], c)) : d, g);
                e = 1;
            }
            return e ? a : i ? b.call(a) : k ? b(a[0], c) : f;
        },
        now: function() {
            return new Date().getTime();
        }
    }), n.ready.promise = function(a) {
        if (!b) {
            b = n.Deferred();
            if (c.readyState === "complete" || c.readyState !== "loading" && c.addEventListener) setTimeout(n.ready, 1); else if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), 
            window.addEventListener("load", n.ready, !1); else {
                c.attachEvent("onreadystatechange", B), window.attachEvent("onload", n.ready);
                var d = !1;
                try {
                    d = window.frameElement == null && c.documentElement;
                } catch (e) {}
                d && d.doScroll && function f() {
                    if (!n.isReady) {
                        try {
                            d.doScroll("left");
                        } catch (a) {
                            return setTimeout(f, 50);
                        }
                        n.ready();
                    }
                }();
            }
        }
        return b.promise(a);
    }, n.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
        C["[object " + b + "]"] = b.toLowerCase();
    }), a = n(c);
    var D = {};
    n.Callbacks = function(a) {
        a = typeof a == "string" ? D[a] || E(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [], i = !a.once && [], j = function(l) {
            b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0;
            for (;h && g < f; g++) if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                b = !1;
                break;
            }
            d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable());
        }, k = {
            add: function() {
                if (h) {
                    var c = h.length;
                    (function g(b) {
                        n.each(b, function(b, c) {
                            n.isFunction(c) && (!a.unique || !k.has(c)) ? h.push(c) : c && c.length && g(c);
                        });
                    })(arguments), d ? f = h.length : b && (e = c, j(b));
                }
                return this;
            },
            remove: function() {
                return h && n.each(arguments, function(a, b) {
                    var c;
                    while ((c = n.inArray(b, h, c)) > -1) h.splice(c, 1), d && (c <= f && f--, c <= g && g--);
                }), this;
            },
            has: function(a) {
                return n.inArray(a, h) > -1;
            },
            empty: function() {
                return h = [], this;
            },
            disable: function() {
                return h = i = b = undefined, this;
            },
            disabled: function() {
                return !h;
            },
            lock: function() {
                return i = undefined, b || k.disable(), this;
            },
            locked: function() {
                return !i;
            },
            fireWith: function(a, b) {
                return b = b || [], b = [ a, b.slice ? b.slice() : b ], h && (!c || i) && (d ? i.push(b) : j(b)), 
                this;
            },
            fire: function() {
                return k.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!c;
            }
        };
        return k;
    }, n.extend({
        Deferred: function(a) {
            var b = [ [ "resolve", "done", n.Callbacks("once memory"), "resolved" ], [ "reject", "fail", n.Callbacks("once memory"), "rejected" ], [ "notify", "progress", n.Callbacks("memory") ] ], c = "pending", d = {
                state: function() {
                    return c;
                },
                always: function() {
                    return e.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var a = arguments;
                    return n.Deferred(function(c) {
                        n.each(b, function(b, d) {
                            var f = d[0], g = a[b];
                            e[d[1]](n.isFunction(g) ? function() {
                                var a = g.apply(this, arguments);
                                a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [ a ]);
                            } : c[f]);
                        }), a = null;
                    }).promise();
                },
                promise: function(a) {
                    return typeof a == "object" ? n.extend(a, d) : d;
                }
            }, e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h;
                }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith;
            }), d.promise(e), a && a.call(e, e), e;
        },
        when: function(a) {
            var b = 0, c = i.call(arguments), d = c.length, e = d !== 1 || a && n.isFunction(a.promise) ? d : 0, f = e === 1 ? a : n.Deferred(), g = function(a, b, c) {
                return function(d) {
                    b[a] = this, c[a] = arguments.length > 1 ? i.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c);
                };
            }, h, j, k;
            if (d > 1) {
                h = new Array(d), j = new Array(d), k = new Array(d);
                for (;b < d; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(g(b, k, c)).fail(f.reject).progress(g(b, j, h)) : --e;
            }
            return e || f.resolveWith(k, c), f.promise();
        }
    }), n.support = function() {
        var a, b, d, e, f, g, h, i, j, k, l, m = c.createElement("div");
        m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        b = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5";
        if (!b || !b.length || !d) return {};
        e = c.createElement("select"), f = e.appendChild(c.createElement("option")), g = m.getElementsByTagName("input")[0], 
        a = {
            leadingWhitespace: m.firstChild.nodeType === 3,
            tbody: !m.getElementsByTagName("tbody").length,
            htmlSerialize: !!m.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: d.getAttribute("href") === "/a",
            opacity: /^0.5/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: g.value === "on",
            optSelected: f.selected,
            getSetAttribute: m.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: c.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, g.checked = !0, a.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, 
        a.optDisabled = !f.disabled;
        try {
            delete m.test;
        } catch (o) {
            a.deleteExpando = !1;
        }
        !m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function() {
            a.noCloneEvent = !1;
        }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = c.createElement("input"), 
        g.value = "t", g.setAttribute("type", "radio"), a.radioValue = g.value === "t", 
        g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), 
        h = c.createDocumentFragment(), h.appendChild(m.lastChild), a.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, 
        a.appendChecked = g.checked, h.removeChild(g), h.appendChild(m);
        if (m.attachEvent) for (j in {
            submit: !0,
            change: !0,
            focusin: !0
        }) i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = typeof m[i] == "function"), 
        a[j + "Bubbles"] = k;
        return n(function() {
            var b, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = c.getElementsByTagName("body")[0];
            if (!h) return;
            b = c.createElement("div"), b.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", 
            h.insertBefore(b, h.firstChild), d = c.createElement("div"), b.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", 
            k = e[0].offsetHeight === 0, e[0].style.display = "", e[1].style.display = "none", 
            a.reliableHiddenOffsets = k && e[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", 
            a.boxSizing = d.offsetWidth === 4, a.doesNotIncludeMarginInBodyOffset = h.offsetTop !== 1, 
            window.getComputedStyle && (a.pixelPosition = (window.getComputedStyle(d, null) || {}).top !== "1%", 
            a.boxSizingReliable = (window.getComputedStyle(d, null) || {
                width: "4px"
            }).width === "4px", f = c.createElement("div"), f.style.cssText = d.style.cssText = g, 
            f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), 
            a.reliableMarginRight = !parseFloat((window.getComputedStyle(f, null) || {}).marginRight)), 
            typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", 
            a.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", 
            d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", a.shrinkWrapBlocks = d.offsetWidth !== 3, 
            b.style.zoom = 1), h.removeChild(b), b = d = e = f = null;
        }), h.removeChild(m), b = d = e = f = g = h = m = null, a;
    }();
    var F = /^(?:\{.*\}|\[.*\])$/, G = /([A-Z])/g;
    n.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (n.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando], !!a && !I(a);
        },
        data: function(a, b, c, d) {
            if (!n.acceptData(a)) return;
            var e, f, g = n.expando, h = typeof b == "string", i = a.nodeType, j = i ? n.cache : a, k = i ? a[g] : a[g] && g;
            if ((!k || !j[k] || !d && !j[k].data) && h && c === undefined) return;
            k || (i ? a[g] = k = n.deletedIds.pop() || ++n.uuid : k = g), j[k] || (j[k] = {}, 
            i || (j[k].toJSON = n.noop));
            if (typeof b == "object" || typeof b == "function") d ? j[k] = n.extend(j[k], b) : j[k].data = n.extend(j[k].data, b);
            return e = j[k], d || (e.data || (e.data = {}), e = e.data), c !== undefined && (e[n.camelCase(b)] = c), 
            h ? (f = e[b], f == null && (f = e[n.camelCase(b)])) : f = e, f;
        },
        removeData: function(a, b, c) {
            if (!n.acceptData(a)) return;
            var d, e, f, g = a.nodeType, h = g ? n.cache : a, i = g ? a[n.expando] : n.expando;
            if (!h[i]) return;
            if (b) {
                d = c ? h[i] : h[i].data;
                if (d) {
                    n.isArray(b) || (b in d ? b = [ b ] : (b = n.camelCase(b), b in d ? b = [ b ] : b = b.split(" ")));
                    for (e = 0, f = b.length; e < f; e++) delete d[b[e]];
                    if (!(c ? I : n.isEmptyObject)(d)) return;
                }
            }
            if (!c) {
                delete h[i].data;
                if (!I(h[i])) return;
            }
            g ? n.cleanData([ a ], !0) : n.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null;
        },
        _data: function(a, b, c) {
            return n.data(a, b, c, !0);
        },
        acceptData: function(a) {
            var b = a.nodeName && n.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b;
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f, g, h = this[0], i = 0, j = null;
            if (a === undefined) {
                if (this.length) {
                    j = n.data(h);
                    if (h.nodeType === 1 && !n._data(h, "parsedAttrs")) {
                        e = h.attributes;
                        for (g = e.length; i < g; i++) f = e[i].name, f.indexOf("data-") === 0 && (f = n.camelCase(f.substring(5)), 
                        H(h, f, j[f]));
                        n._data(h, "parsedAttrs", !0);
                    }
                }
                return j;
            }
            return typeof a == "object" ? this.each(function() {
                n.data(this, a);
            }) : (c = a.split(".", 2), c[1] = c[1] ? "." + c[1] : "", d = c[1] + "!", n.access(this, function(b) {
                if (b === undefined) return j = this.triggerHandler("getData" + d, [ c[0] ]), j === undefined && h && (j = n.data(h, a), 
                j = H(h, a, j)), j === undefined && c[1] ? this.data(c[0]) : j;
                c[1] = b, this.each(function() {
                    var e = n(this);
                    e.triggerHandler("setData" + d, c), n.data(this, a, b), e.triggerHandler("changeData" + d, c);
                });
            }, null, b, arguments.length > 1, null, !1));
        },
        removeData: function(a) {
            return this.each(function() {
                n.removeData(this, a);
            });
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = n._data(a, b), c && (!d || n.isArray(c) ? d = n._data(a, b, n.makeArray(c)) : d.push(c)), 
            d || [];
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.shift(), e = n._queueHooks(a, b), f = function() {
                n.dequeue(a, b);
            };
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), 
            delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire();
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return n._data(a, c) || n._data(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    n.removeData(a, b + "queue", !0), n.removeData(a, c, !0);
                })
            });
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return typeof a != "string" && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : b === undefined ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), a === "fx" && c[0] !== "inprogress" && n.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [ f ]);
            };
            typeof a != "string" && (b = a, a = undefined), a = a || "fx";
            while (g--) (c = n._data(f[g], a + "queueHooks")) && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b);
        }
    });
    var J, K, L, M = /[\t\r\n]/g, N = /\r/g, O = /^(?:button|input)$/i, P = /^(?:button|input|object|select|textarea)$/i, Q = /^a(?:rea|)$/i, R = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, S = n.support.getSetAttribute;
    n.fn.extend({
        attr: function(a, b) {
            return n.access(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return n.access(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function(a) {
            return a = n.propFix[a] || a, this.each(function() {
                try {
                    this[a] = undefined, delete this[a];
                } catch (b) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, f, g, h;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string") {
                b = a.split(q);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        f = " " + e.className + " ";
                        for (g = 0, h = b.length; g < h; g++) ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                        e.className = n.trim(f);
                    }
                }
            }
            return this;
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string" || a === undefined) {
                b = (a || "").split(q);
                for (g = 0, h = this.length; g < h; g++) {
                    d = this[g];
                    if (d.nodeType === 1 && d.className) {
                        c = (" " + d.className + " ").replace(M, " ");
                        for (e = 0, f = b.length; e < f; e++) while (c.indexOf(" " + b[e] + " ") > -1) c = c.replace(" " + b[e] + " ", " ");
                        d.className = a ? n.trim(c) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = typeof b == "boolean";
            return n.isFunction(a) ? this.each(function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b);
            }) : this.each(function() {
                if (c === "string") {
                    var e, f = 0, g = n(this), h = b, i = a.split(q);
                    while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
                } else if (c === "undefined" || c === "boolean") this.className && n._data(this, "__className__", this.className), 
                this.className = this.className || a === !1 ? "" : n._data(this, "__className__") || "";
            });
        },
        hasClass: function(a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (;c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(M, " ").indexOf(b) > -1) return !0;
            return !1;
        },
        val: function(a) {
            var b, c, d, e = this[0];
            if (!arguments.length) {
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && (c = b.get(e, "value")) !== undefined ? c : (c = e.value, 
                typeof c == "string" ? c.replace(N, "") : c == null ? "" : c);
                return;
            }
            return d = n.isFunction(a), this.each(function(c) {
                var e, f = n(this);
                if (this.nodeType !== 1) return;
                d ? e = a.call(this, c, f.val()) : e = a, e == null ? e = "" : typeof e == "number" ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                    return a == null ? "" : a + "";
                })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()];
                if (!b || !("set" in b) || b.set(this, e, "value") === undefined) this.value = e;
            });
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one";
                    if (f < 0) return null;
                    c = i ? f : 0, d = i ? f + 1 : h.length;
                    for (;c < d; c++) {
                        e = h[c];
                        if (e.selected && (n.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !n.nodeName(e.parentNode, "optgroup"))) {
                            b = n(e).val();
                            if (i) return b;
                            g.push(b);
                        }
                    }
                    return i && !g.length && h.length ? n(h[f]).val() : g;
                },
                set: function(a, b) {
                    var c = n.makeArray(b);
                    return n(a).find("option").each(function() {
                        this.selected = n.inArray(n(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1), c;
                }
            }
        },
        attrFn: {},
        attr: function(a, b, c, d) {
            var e, f, g, h = a.nodeType;
            if (!a || h === 3 || h === 8 || h === 2) return;
            if (d && n.isFunction(n.fn[b])) return n(a)[b](c);
            if (typeof a.getAttribute == "undefined") return n.prop(a, b, c);
            g = h !== 1 || !n.isXMLDoc(a), g && (b = b.toLowerCase(), f = n.attrHooks[b] || (R.test(b) ? K : J));
            if (c !== undefined) {
                if (c === null) {
                    n.removeAttr(a, b);
                    return;
                }
                return f && "set" in f && g && (e = f.set(a, c, b)) !== undefined ? e : (a.setAttribute(b, "" + c), 
                c);
            }
            return f && "get" in f && g && (e = f.get(a, b)) !== null ? e : (e = a.getAttribute(b), 
            e === null ? undefined : e);
        },
        removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && a.nodeType === 1) {
                d = b.split(q);
                for (;g < d.length; g++) e = d[g], e && (c = n.propFix[e] || e, f = R.test(e), f || n.attr(a, e, ""), 
                a.removeAttribute(S ? e : c), f && c in a && (a[c] = !1));
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (O.test(a.nodeName) && a.parentNode) n.error("type property can't be changed"); else if (!n.support.radioValue && b === "radio" && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return J && n.nodeName(a, "button") ? J.get(a, b) : b in a ? a.value : null;
                },
                set: function(a, b, c) {
                    if (J && n.nodeName(a, "button")) return J.set(a, b, c);
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (!a || g === 3 || g === 8 || g === 2) return;
            return f = g !== 1 || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), 
            c !== undefined ? e && "set" in e && (d = e.set(a, c, b)) !== undefined ? d : a[b] = c : e && "get" in e && (d = e.get(a, b)) !== null ? d : a[b];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = a.getAttributeNode("tabindex");
                    return b && b.specified ? parseInt(b.value, 10) : P.test(a.nodeName) || Q.test(a.nodeName) && a.href ? 0 : undefined;
                }
            }
        }
    }), K = {
        get: function(a, b) {
            var c, d = n.prop(a, b);
            return d === !0 || typeof d != "boolean" && (c = a.getAttributeNode(b)) && c.nodeValue !== !1 ? b.toLowerCase() : undefined;
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? n.removeAttr(a, c) : (d = n.propFix[c] || c, d in a && (a[d] = !0), 
            a.setAttribute(c, c.toLowerCase())), c;
        }
    }, S || (L = {
        name: !0,
        id: !0,
        coords: !0
    }, J = n.valHooks.button = {
        get: function(a, b) {
            var c;
            return c = a.getAttributeNode(b), c && (L[b] ? c.value !== "" : c.specified) ? c.value : undefined;
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.value = b + "";
        }
    }, n.each([ "width", "height" ], function(a, b) {
        n.attrHooks[b] = n.extend(n.attrHooks[b], {
            set: function(a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c;
            }
        });
    }), n.attrHooks.contenteditable = {
        get: J.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), J.set(a, b, c);
        }
    }), n.support.hrefNormalized || n.each([ "href", "src", "width", "height" ], function(a, b) {
        n.attrHooks[b] = n.extend(n.attrHooks[b], {
            get: function(a) {
                var c = a.getAttribute(b, 2);
                return c === null ? undefined : c;
            }
        });
    }), n.support.style || (n.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || undefined;
        },
        set: function(a, b) {
            return a.style.cssText = "" + b;
        }
    }), n.support.optSelected || (n.propHooks.selected = n.extend(n.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    })), n.support.enctype || (n.propFix.enctype = "encoding"), n.support.checkOn || n.each([ "radio", "checkbox" ], function() {
        n.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }), n.each([ "radio", "checkbox" ], function() {
        n.valHooks[this] = n.extend(n.valHooks[this], {
            set: function(a, b) {
                if (n.isArray(b)) return a.checked = n.inArray(n(a).val(), b) >= 0;
            }
        });
    });
    var T = /^(?:textarea|input|select)$/i, U = /^([^\.]*|)(?:\.(.+)|)$/, V = /(?:^|\s)hover(\.\S+|)\b/, W = /^key/, X = /^(?:mouse|contextmenu)|click/, Y = /^(?:focusinfocus|focusoutblur)$/, Z = function(a) {
        return n.event.special.hover ? a : a.replace(V, "mouseenter$1 mouseleave$1");
    };
    n.event = {
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q;
            if (a.nodeType === 3 || a.nodeType === 8 || !b || !c || !(f = n._data(a))) return;
            c.handler && (o = c, c = o.handler, e = o.selector), c.guid || (c.guid = n.guid++), 
            h = f.events, h || (f.events = h = {}), g = f.handle, g || (f.handle = g = function(a) {
                return typeof n == "undefined" || !!a && n.event.triggered === a.type ? undefined : n.event.dispatch.apply(g.elem, arguments);
            }, g.elem = a), b = n.trim(Z(b)).split(" ");
            for (i = 0; i < b.length; i++) {
                j = U.exec(b[i]) || [], k = j[1], l = (j[2] || "").split(".").sort(), q = n.event.special[k] || {}, 
                k = (e ? q.delegateType : q.bindType) || k, q = n.event.special[k] || {}, m = n.extend({
                    type: k,
                    origType: j[1],
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    namespace: l.join(".")
                }, o), p = h[k];
                if (!p) {
                    p = h[k] = [], p.delegateCount = 0;
                    if (!q.setup || q.setup.call(a, d, l, g) === !1) a.addEventListener ? a.addEventListener(k, g, !1) : a.attachEvent && a.attachEvent("on" + k, g);
                }
                q.add && (q.add.call(a, m), m.handler.guid || (m.handler.guid = c.guid)), e ? p.splice(p.delegateCount++, 0, m) : p.push(m), 
                n.event.global[k] = !0;
            }
            a = null;
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = n.hasData(a) && n._data(a);
            if (!r || !(m = r.events)) return;
            b = n.trim(Z(b || "")).split(" ");
            for (f = 0; f < b.length; f++) {
                g = U.exec(b[f]) || [], h = i = g[1], j = g[2];
                if (!h) {
                    for (h in m) n.event.remove(a, h + b[f], c, d, !0);
                    continue;
                }
                o = n.event.special[h] || {}, h = (d ? o.delegateType : o.bindType) || h, p = m[h] || [], 
                k = p.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (l = 0; l < p.length; l++) q = p[l], (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (p.splice(l--, 1), 
                q.selector && p.delegateCount--, o.remove && o.remove.call(a, q));
                p.length === 0 && k !== p.length && ((!o.teardown || o.teardown.call(a, j, r.handle) === !1) && n.removeEvent(a, h, r.handle), 
                delete m[h]);
            }
            n.isEmptyObject(m) && (delete r.handle, n.removeData(a, "events", !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(a, b, d, e) {
            if (!d || d.nodeType !== 3 && d.nodeType !== 8) {
                var f, g, h, i, j, k, l, m, o, p, q = a.type || a, r = [];
                if (Y.test(q + n.event.triggered)) return;
                q.indexOf("!") >= 0 && (q = q.slice(0, -1), g = !0), q.indexOf(".") >= 0 && (r = q.split("."), 
                q = r.shift(), r.sort());
                if ((!d || n.event.customEvent[q]) && !n.event.global[q]) return;
                a = typeof a == "object" ? a[n.expando] ? a : new n.Event(q, a) : new n.Event(q), 
                a.type = q, a.isTrigger = !0, a.exclusive = g, a.namespace = r.join("."), a.namespace_re = a.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
                k = q.indexOf(":") < 0 ? "on" + q : "";
                if (!d) {
                    f = n.cache;
                    for (h in f) f[h].events && f[h].events[q] && n.event.trigger(a, b, f[h].handle.elem, !0);
                    return;
                }
                a.result = undefined, a.target || (a.target = d), b = b != null ? n.makeArray(b) : [], 
                b.unshift(a), l = n.event.special[q] || {};
                if (l.trigger && l.trigger.apply(d, b) === !1) return;
                o = [ [ d, l.bindType || q ] ];
                if (!e && !l.noBubble && !n.isWindow(d)) {
                    p = l.delegateType || q, i = Y.test(p + q) ? d : d.parentNode;
                    for (j = d; i; i = i.parentNode) o.push([ i, p ]), j = i;
                    j === (d.ownerDocument || c) && o.push([ j.defaultView || j.parentWindow || window, p ]);
                }
                for (h = 0; h < o.length && !a.isPropagationStopped(); h++) i = o[h][0], a.type = o[h][1], 
                m = (n._data(i, "events") || {})[a.type] && n._data(i, "handle"), m && m.apply(i, b), 
                m = k && i[k], m && n.acceptData(i) && m.apply(i, b) === !1 && a.preventDefault();
                return a.type = q, !e && !a.isDefaultPrevented() && (!l._default || l._default.apply(d.ownerDocument, b) === !1) && (q !== "click" || !n.nodeName(d, "a")) && n.acceptData(d) && k && d[q] && (q !== "focus" && q !== "blur" || a.target.offsetWidth !== 0) && !n.isWindow(d) && (j = d[k], 
                j && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = undefined, 
                j && (d[k] = j)), a.result;
            }
            return;
        },
        dispatch: function(a) {
            a = n.event.fix(a || window.event);
            var b, c, d, e, f, g, h, i, j, k, l, m = (n._data(this, "events") || {})[a.type] || [], o = m.delegateCount, p = [].slice.call(arguments), q = !a.exclusive && !a.namespace, r = n.event.special[a.type] || {}, s = [];
            p[0] = a, a.delegateTarget = this;
            if (r.preDispatch && r.preDispatch.call(this, a) === !1) return;
            if (o && (!a.button || a.type !== "click")) {
                e = n(this), e.context = this;
                for (d = a.target; d != this; d = d.parentNode || this) if (d.disabled !== !0 || a.type !== "click") {
                    g = {}, i = [], e[0] = d;
                    for (b = 0; b < o; b++) j = m[b], k = j.selector, g[k] === undefined && (g[k] = e.is(k)), 
                    g[k] && i.push(j);
                    i.length && s.push({
                        elem: d,
                        matches: i
                    });
                }
            }
            m.length > o && s.push({
                elem: this,
                matches: m.slice(o)
            });
            for (b = 0; b < s.length && !a.isPropagationStopped(); b++) {
                h = s[b], a.currentTarget = h.elem;
                for (c = 0; c < h.matches.length && !a.isImmediatePropagationStopped(); c++) {
                    j = h.matches[c];
                    if (q || !a.namespace && !j.namespace || a.namespace_re && a.namespace_re.test(j.namespace)) a.data = j.data, 
                    a.handleObj = j, f = ((n.event.special[j.origType] || {}).handle || j.handler).apply(h.elem, p), 
                    f !== undefined && (a.result = f, f === !1 && (a.preventDefault(), a.stopPropagation()));
                }
            }
            return r.postDispatch && r.postDispatch.call(this, a), a.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), 
                a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var d, e, f, g = b.button, h = b.fromElement;
                return a.pageX == null && b.clientX != null && (d = a.target.ownerDocument || c, 
                e = d.documentElement, f = d.body, a.pageX = b.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), 
                a.pageY = b.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), 
                !a.relatedTarget && h && (a.relatedTarget = h === a.target ? b.toElement : h), !a.which && g !== undefined && (a.which = g & 1 ? 1 : g & 2 ? 3 : g & 4 ? 2 : 0), 
                a;
            }
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, d, e = a, f = n.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
            a = n.Event(e);
            for (b = g.length; b; ) d = g[--b], a[d] = e[d];
            return a.target || (a.target = e.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), 
            a.metaKey = !!a.metaKey, f.filter ? f.filter(a, e) : a;
        },
        special: {
            ready: {
                setup: n.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    n.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event(), c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, n.event.handle = n.event.dispatch, n.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c));
    }, n.Event = function(a, b) {
        if (!(this instanceof n.Event)) return new n.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? _ : $) : this.type = a, 
        b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), this[n.expando] = !0;
    }, n.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = _;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        },
        stopPropagation: function() {
            this.isPropagationStopped = _;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = _, this.stopPropagation();
        },
        isDefaultPrevented: $,
        isPropagationStopped: $,
        isImmediatePropagationStopped: $
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector;
                if (!e || e !== d && !n.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), 
                a.type = b;
                return c;
            }
        };
    }), n.support.submitBubbles || (n.event.special.submit = {
        setup: function() {
            if (n.nodeName(this, "form")) return !1;
            n.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target, c = n.nodeName(b, "input") || n.nodeName(b, "button") ? b.form : undefined;
                c && !n._data(c, "_submit_attached") && (n.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0;
                }), n._data(c, "_submit_attached", !0));
            });
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && n.event.simulate("submit", this.parentNode, a, !0));
        },
        teardown: function() {
            if (n.nodeName(this, "form")) return !1;
            n.event.remove(this, "._submit");
        }
    }), n.support.changeBubbles || (n.event.special.change = {
        setup: function() {
            if (T.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") n.event.add(this, "propertychange._change", function(a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                }), n.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1), n.event.simulate("change", this, a, !0);
                });
                return !1;
            }
            n.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                T.test(b.nodeName) && !n._data(b, "_change_attached") && (n.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && n.event.simulate("change", this.parentNode, a, !0);
                }), n._data(b, "_change_attached", !0));
            });
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            return n.event.remove(this, "._change"), T.test(this.nodeName);
        }
    }), n.support.focusinBubbles || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0, e = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0);
        };
        n.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0);
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0);
            }
        };
    }), n.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if (typeof a == "object") {
                typeof b != "string" && (c = c || b, b = undefined);
                for (g in a) this.on(g, b, c, a[g], e);
                return this;
            }
            c == null && d == null ? (d = b, c = b = undefined) : d == null && (typeof b == "string" ? (d = c, 
            c = undefined) : (d = c, c = b, b = undefined));
            if (d === !1) d = $; else if (!d) return this;
            return e === 1 && (f = d, d = function(a) {
                return n().off(a), f.apply(this, arguments);
            }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b);
            });
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1);
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), 
            this;
            if (typeof a == "object") {
                for (e in a) this.off(e, b, a[e]);
                return this;
            }
            if (b === !1 || typeof b == "function") c = b, b = undefined;
            return c === !1 && (c = $), this.each(function() {
                n.event.remove(this, a, c, b);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        live: function(a, b, c) {
            return n(this.context).on(a, this.selector, b, c), this;
        },
        die: function(a, b) {
            return n(this.context).off(a, this.selector || "**", b), this;
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            if (this[0]) return n.event.trigger(a, b, this[0], !0);
        },
        toggle: function(a) {
            var b = arguments, c = a.guid || n.guid++, d = 0, e = function(c) {
                var e = (n._data(this, "lastToggle" + a.guid) || 0) % d;
                return n._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e);
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }, W.test(b) && (n.event.fixHooks[b] = n.event.keyHooks), X.test(b) && (n.event.fixHooks[b] = n.event.mouseHooks);
    }), function(a, b) {
        function db(a, b, c, d) {
            var e = 0, f = b.length;
            for (;e < f; e++) Z(a, b[e], c, d);
        }
        function eb(a, b, c, d, e, f) {
            var g, h = $.setFilters[b.toLowerCase()];
            return h || Z.error(b), (a || !(g = e)) && db(a || "*", d, g = [], e), g.length > 0 ? h(g, c, f) : [];
        }
        function fb(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o = 0, q = f.length, s = L.POS, t = new RegExp("^" + s.source + "(?!" + r + ")", "i"), u = function() {
                var a = 1, c = arguments.length - 2;
                for (;a < c; a++) arguments[a] === b && (g[a] = b);
            };
            for (;o < q; o++) {
                s.exec(""), a = f[o], j = [], i = 0, k = e;
                while (g = s.exec(a)) {
                    n = s.lastIndex = g.index + g[0].length;
                    if (n > i) {
                        m = a.slice(i, g.index), i = n, l = [ c ], B.test(m) && (k && (l = k), k = e);
                        if (h = H.test(m)) m = m.slice(0, -5).replace(B, "$&*");
                        g.length > 1 && g[0].replace(t, u), k = eb(m, g[1], g[2], l, k, h);
                    }
                }
                k ? (j = j.concat(k), (m = a.slice(i)) && m !== ")" ? B.test(m) ? db(m, j, d, e) : Z(m, c, d, e ? e.concat(k) : k) : p.apply(d, j)) : Z(a, c, d, e);
            }
            return q === 1 ? d : Z.uniqueSort(d);
        }
        function gb(a, b, c) {
            var d, e, f, g = [], i = 0, j = D.exec(a), k = !j.pop() && !j.pop(), l = k && a.match(C) || [ "" ], m = $.preFilter, n = $.filter, o = !c && b !== h;
            for (;(e = l[i]) != null && k; i++) {
                g.push(d = []), o && (e = " " + e);
                while (e) {
                    k = !1;
                    if (j = B.exec(e)) e = e.slice(j[0].length), k = d.push({
                        part: j.pop().replace(A, " "),
                        captures: j
                    });
                    for (f in n) (j = L[f].exec(e)) && (!m[f] || (j = m[f](j, b, c))) && (e = e.slice(j.shift().length), 
                    k = d.push({
                        part: f,
                        captures: j
                    }));
                    if (!k) break;
                }
            }
            return k || Z.error(a), g;
        }
        function hb(a, b, e) {
            var f = b.dir, g = m++;
            return a || (a = function(a) {
                return a === e;
            }), b.first ? function(b, c) {
                while (b = b[f]) if (b.nodeType === 1) return a(b, c) && b;
            } : function(b, e) {
                var h, i = g + "." + d, j = i + "." + c;
                while (b = b[f]) if (b.nodeType === 1) {
                    if ((h = b[q]) === j) return b.sizset;
                    if (typeof h == "string" && h.indexOf(i) === 0) {
                        if (b.sizset) return b;
                    } else {
                        b[q] = j;
                        if (a(b, e)) return b.sizset = !0, b;
                        b.sizset = !1;
                    }
                }
            };
        }
        function ib(a, b) {
            return a ? function(c, d) {
                var e = b(c, d);
                return e && a(e === !0 ? c : e, d);
            } : b;
        }
        function jb(a, b, c) {
            var d, e, f = 0;
            for (;d = a[f]; f++) $.relative[d.part] ? e = hb(e, $.relative[d.part], b) : (d.captures.push(b, c), 
            e = ib(e, $.filter[d.part].apply(null, d.captures)));
            return e;
        }
        function kb(a) {
            return function(b, c) {
                var d, e = 0;
                for (;d = a[e]; e++) if (d(b, c)) return !0;
                return !1;
            };
        }
        var c, d, e, f, g, h = a.document, i = h.documentElement, j = "undefined", k = !1, l = !0, m = 0, o = [].slice, p = [].push, q = ("sizcache" + Math.random()).replace(".", ""), r = "[\\x20\\t\\r\\n\\f]", s = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", t = s.replace("w", "w#"), u = "([*^$|!~]?=)", v = "\\[" + r + "*(" + s + ")" + r + "*(?:" + u + r + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + t + ")|)|)" + r + "*\\]", w = ":(" + s + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", x = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", y = r + "*([\\x20\\t\\r\\n\\f>+~])" + r + "*", z = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + v + "|" + w.replace(2, 7) + "|[^\\\\(),])+", A = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"), B = new RegExp("^" + y), C = new RegExp(z + "?(?=" + r + "*,|$)", "g"), D = new RegExp("^(?:(?!,)(?:(?:^|,)" + r + "*" + z + ")*?|" + r + "*(.*?))(\\)|$)"), E = new RegExp(z.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + y, "g"), F = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, G = /[\x20\t\r\n\f]*[+~]/, H = /:not\($/, I = /h\d/i, J = /input|select|textarea|button/i, K = /\\(?!\\)/g, L = {
            ID: new RegExp("^#(" + s + ")"),
            CLASS: new RegExp("^\\.(" + s + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + s + ")['\"]?\\]"),
            TAG: new RegExp("^(" + s.replace("[-", "[-\\*") + ")"),
            ATTR: new RegExp("^" + v),
            PSEUDO: new RegExp("^" + w),
            CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
            POS: new RegExp(x, "ig"),
            needsContext: new RegExp("^" + r + "*[>+~]|" + x, "i")
        }, M = {}, N = [], O = {}, P = [], Q = function(a) {
            return a.sizzleFilter = !0, a;
        }, R = function(a) {
            return function(b) {
                return b.nodeName.toLowerCase() === "input" && b.type === a;
            };
        }, S = function(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return (c === "input" || c === "button") && b.type === a;
            };
        }, T = function(a) {
            var b = !1, c = h.createElement("div");
            try {
                b = a(c);
            } catch (d) {}
            return c = null, b;
        }, U = T(function(a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return b !== "boolean" && b !== "string";
        }), V = T(function(a) {
            a.id = q + 0, a.innerHTML = "<a name='" + q + "'></a><div name='" + q + "'></div>", 
            i.insertBefore(a, i.firstChild);
            var b = h.getElementsByName && h.getElementsByName(q).length === 2 + h.getElementsByName(q + 0).length;
            return g = !h.getElementById(q), i.removeChild(a), b;
        }), W = T(function(a) {
            return a.appendChild(h.createComment("")), a.getElementsByTagName("*").length === 0;
        }), X = T(function(a) {
            return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== j && a.firstChild.getAttribute("href") === "#";
        }), Y = T(function(a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", 
            a.getElementsByClassName("e").length !== 1);
        }), Z = function(a, b, c, d) {
            c = c || [], b = b || h;
            var e, f, g, i, j = b.nodeType;
            if (j !== 1 && j !== 9) return [];
            if (!a || typeof a != "string") return c;
            g = ab(b);
            if (!g && !d) if (e = F.exec(a)) if (i = e[1]) {
                if (j === 9) {
                    f = b.getElementById(i);
                    if (!f || !f.parentNode) return c;
                    if (f.id === i) return c.push(f), c;
                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(i)) && bb(b, f) && f.id === i) return c.push(f), 
                c;
            } else {
                if (e[2]) return p.apply(c, o.call(b.getElementsByTagName(a), 0)), c;
                if ((i = e[3]) && Y && b.getElementsByClassName) return p.apply(c, o.call(b.getElementsByClassName(i), 0)), 
                c;
            }
            return mb(a, b, c, d, g);
        }, $ = Z.selectors = {
            cacheLength: 50,
            match: L,
            order: [ "ID", "TAG" ],
            attrHandle: {},
            createPseudo: Q,
            find: {
                ID: g ? function(a, b, c) {
                    if (typeof b.getElementById !== j && !c) {
                        var d = b.getElementById(a);
                        return d && d.parentNode ? [ d ] : [];
                    }
                } : function(a, c, d) {
                    if (typeof c.getElementById !== j && !d) {
                        var e = c.getElementById(a);
                        return e ? e.id === a || typeof e.getAttributeNode !== j && e.getAttributeNode("id").value === a ? [ e ] : b : [];
                    }
                },
                TAG: W ? function(a, b) {
                    if (typeof b.getElementsByTagName !== j) return b.getElementsByTagName(a);
                } : function(a, b) {
                    var c = b.getElementsByTagName(a);
                    if (a === "*") {
                        var d, e = [], f = 0;
                        for (;d = c[f]; f++) d.nodeType === 1 && e.push(d);
                        return e;
                    }
                    return c;
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(K, ""), a[3] = (a[4] || a[5] || "").replace(K, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), 
                    a.slice(0, 4);
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || Z.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), 
                    a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && Z.error(a[0]), a;
                },
                PSEUDO: function(a) {
                    var b, c = a[4];
                    return L.CHILD.test(a[0]) ? null : (c && (b = D.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), 
                    c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a);
                }
            },
            filter: {
                ID: g ? function(a) {
                    return a = a.replace(K, ""), function(b) {
                        return b.getAttribute("id") === a;
                    };
                } : function(a) {
                    return a = a.replace(K, ""), function(b) {
                        var c = typeof b.getAttributeNode !== j && b.getAttributeNode("id");
                        return c && c.value === a;
                    };
                },
                TAG: function(a) {
                    return a === "*" ? function() {
                        return !0;
                    } : (a = a.replace(K, "").toLowerCase(), function(b) {
                        return b.nodeName && b.nodeName.toLowerCase() === a;
                    });
                },
                CLASS: function(a) {
                    var b = M[a];
                    return b || (b = M[a] = new RegExp("(^|" + r + ")" + a + "(" + r + "|$)"), N.push(a), 
                    N.length > $.cacheLength && delete M[N.shift()]), function(a) {
                        return b.test(a.className || typeof a.getAttribute !== j && a.getAttribute("class") || "");
                    };
                },
                ATTR: function(a, b, c) {
                    return b ? function(d) {
                        var e = Z.attr(d, a), f = e + "";
                        if (e == null) return b === "!=";
                        switch (b) {
                          case "=":
                            return f === c;

                          case "!=":
                            return f !== c;

                          case "^=":
                            return c && f.indexOf(c) === 0;

                          case "*=":
                            return c && f.indexOf(c) > -1;

                          case "$=":
                            return c && f.substr(f.length - c.length) === c;

                          case "~=":
                            return (" " + f + " ").indexOf(c) > -1;

                          case "|=":
                            return f === c || f.substr(0, c.length + 1) === c + "-";
                        }
                    } : function(b) {
                        return Z.attr(b, a) != null;
                    };
                },
                CHILD: function(a, b, c, d) {
                    if (a === "nth") {
                        var e = m++;
                        return function(a) {
                            var b, f, g = 0, h = a;
                            if (c === 1 && d === 0) return !0;
                            b = a.parentNode;
                            if (b && (b[q] !== e || !a.sizset)) {
                                for (h = b.firstChild; h; h = h.nextSibling) if (h.nodeType === 1) {
                                    h.sizset = ++g;
                                    if (h === a) break;
                                }
                                b[q] = e;
                            }
                            return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0;
                        };
                    }
                    return function(b) {
                        var c = b;
                        switch (a) {
                          case "only":
                          case "first":
                            while (c = c.previousSibling) if (c.nodeType === 1) return !1;
                            if (a === "first") return !0;
                            c = b;

                          case "last":
                            while (c = c.nextSibling) if (c.nodeType === 1) return !1;
                            return !0;
                        }
                    };
                },
                PSEUDO: function(a, b, c, d) {
                    var e = $.pseudos[a] || $.pseudos[a.toLowerCase()];
                    return e || Z.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e;
                }
            },
            pseudos: {
                not: Q(function(a, b, c) {
                    var d = lb(a.replace(A, "$1"), b, c);
                    return function(a) {
                        return !d(a);
                    };
                }),
                enabled: function(a) {
                    return a.disabled === !1;
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && !!a.checked || b === "option" && !!a.selected;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                parent: function(a) {
                    return !$.pseudos.empty(a);
                },
                empty: function(a) {
                    var b;
                    a = a.firstChild;
                    while (a) {
                        if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return !1;
                        a = a.nextSibling;
                    }
                    return !0;
                },
                contains: Q(function(a) {
                    return function(b) {
                        return (b.textContent || b.innerText || cb(b)).indexOf(a) > -1;
                    };
                }),
                has: Q(function(a) {
                    return function(b) {
                        return Z(a, b).length > 0;
                    };
                }),
                header: function(a) {
                    return I.test(a.nodeName);
                },
                text: function(a) {
                    var b, c;
                    return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b);
                },
                radio: R("radio"),
                checkbox: R("checkbox"),
                file: R("file"),
                password: R("password"),
                image: R("image"),
                submit: S("submit"),
                reset: S("reset"),
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && a.type === "button" || b === "button";
                },
                input: function(a) {
                    return J.test(a.nodeName);
                },
                focus: function(a) {
                    var b = a.ownerDocument;
                    return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href);
                },
                active: function(a) {
                    return a === a.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function(a, b, c) {
                    return c ? a.slice(1) : [ a[0] ];
                },
                last: function(a, b, c) {
                    var d = a.pop();
                    return c ? a : [ d ];
                },
                even: function(a, b, c) {
                    var d = [], e = c ? 1 : 0, f = a.length;
                    for (;e < f; e += 2) d.push(a[e]);
                    return d;
                },
                odd: function(a, b, c) {
                    var d = [], e = c ? 0 : 1, f = a.length;
                    for (;e < f; e += 2) d.push(a[e]);
                    return d;
                },
                lt: function(a, b, c) {
                    return c ? a.slice(+b) : a.slice(0, +b);
                },
                gt: function(a, b, c) {
                    return c ? a.slice(0, +b + 1) : a.slice(+b + 1);
                },
                eq: function(a, b, c) {
                    var d = a.splice(+b, 1);
                    return c ? a : d;
                }
            }
        };
        $.setFilters.nth = $.setFilters.eq, $.filters = $.pseudos, X || ($.attrHandle = {
            href: function(a) {
                return a.getAttribute("href", 2);
            },
            type: function(a) {
                return a.getAttribute("type");
            }
        }), V && ($.order.push("NAME"), $.find.NAME = function(a, b) {
            if (typeof b.getElementsByName !== j) return b.getElementsByName(a);
        }), Y && ($.order.splice(1, 0, "CLASS"), $.find.CLASS = function(a, b, c) {
            if (typeof b.getElementsByClassName !== j && !c) return b.getElementsByClassName(a);
        });
        try {
            o.call(i.childNodes, 0)[0].nodeType;
        } catch (_) {
            o = function(a) {
                var b, c = [];
                for (;b = this[a]; a++) c.push(b);
                return c;
            };
        }
        var ab = Z.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        }, bb = Z.contains = i.compareDocumentPosition ? function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16);
        } : i.contains ? function(a, b) {
            var c = a.nodeType === 9 ? a.documentElement : a, d = b.parentNode;
            return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d));
        } : function(a, b) {
            while (b = b.parentNode) if (b === a) return !0;
            return !1;
        }, cb = Z.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (e === 1 || e === 9 || e === 11) {
                    if (typeof a.textContent == "string") return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += cb(a);
                } else if (e === 3 || e === 4) return a.nodeValue;
            } else for (;b = a[d]; d++) c += cb(b);
            return c;
        };
        Z.attr = function(a, b) {
            var c, d = ab(a);
            return d || (b = b.toLowerCase()), $.attrHandle[b] ? $.attrHandle[b](a) : U || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), 
            c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null);
        }, Z.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        }, [ 0, 0 ].sort(function() {
            return l = 0;
        }), i.compareDocumentPosition ? e = function(a, b) {
            return a === b ? (k = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1;
        } : (e = function(a, b) {
            if (a === b) return k = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], g = [], h = a.parentNode, i = b.parentNode, j = h;
            if (h === i) return f(a, b);
            if (!h) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) g.unshift(j), j = j.parentNode;
            c = e.length, d = g.length;
            for (var l = 0; l < c && l < d; l++) if (e[l] !== g[l]) return f(e[l], g[l]);
            return l === c ? f(a, g[l], -1) : f(e[l], b, 1);
        }, f = function(a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling;
            }
            return 1;
        }), Z.uniqueSort = function(a) {
            var b, c = 1;
            if (e) {
                k = l, a.sort(e);
                if (k) for (;b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1);
            }
            return a;
        };
        var lb = Z.compile = function(a, b, c) {
            var d, e, f, g = O[a];
            if (g && g.context === b) return g;
            e = gb(a, b, c);
            for (f = 0; d = e[f]; f++) e[f] = jb(d, b, c);
            return g = O[a] = kb(e), g.context = b, g.runs = g.dirruns = 0, P.push(a), P.length > $.cacheLength && delete O[P.shift()], 
            g;
        };
        Z.matches = function(a, b) {
            return Z(a, null, null, b);
        }, Z.matchesSelector = function(a, b) {
            return Z(b, null, null, [ a ]).length > 0;
        };
        var mb = function(a, b, e, f, g) {
            a = a.replace(A, "$1");
            var h, i, j, k, l, m, n, q, r, s = a.match(C), t = a.match(E), u = b.nodeType;
            if (L.POS.test(a)) return fb(a, b, e, f, s);
            if (f) h = o.call(f, 0); else if (s && s.length === 1) {
                if (t.length > 1 && u === 9 && !g && (s = L.ID.exec(t[0]))) {
                    b = $.find.ID(s[1], b, g)[0];
                    if (!b) return e;
                    a = a.slice(t.shift().length);
                }
                q = (s = G.exec(t[0])) && !s.index && b.parentNode || b, r = t.pop(), m = r.split(":not")[0];
                for (j = 0, k = $.order.length; j < k; j++) {
                    n = $.order[j];
                    if (s = L[n].exec(m)) {
                        h = $.find[n]((s[1] || "").replace(K, ""), q, g);
                        if (h == null) continue;
                        m === r && (a = a.slice(0, a.length - r.length) + m.replace(L[n], ""), a || p.apply(e, o.call(h, 0)));
                        break;
                    }
                }
            }
            if (a) {
                i = lb(a, b, g), d = i.dirruns++, h == null && (h = $.find.TAG("*", G.test(a) && b.parentNode || b));
                for (j = 0; l = h[j]; j++) c = i.runs++, i(l, b) && e.push(l);
            }
            return e;
        };
        h.querySelectorAll && function() {
            var a, b = mb, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [ ":active" ], g = i.matchesSelector || i.mozMatchesSelector || i.webkitMatchesSelector || i.oMatchesSelector || i.msMatchesSelector;
            T(function(a) {
                a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + r + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), 
                a.querySelectorAll(":checked").length || e.push(":checked");
            }), T(function(a) {
                a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + r + "*(?:\"\"|'')"), 
                a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
            }), e = e.length && new RegExp(e.join("|")), mb = function(a, d, f, g, h) {
                if (!g && !h && (!e || !e.test(a))) if (d.nodeType === 9) try {
                    return p.apply(f, o.call(d.querySelectorAll(a), 0)), f;
                } catch (i) {} else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") {
                    var j = d.getAttribute("id"), k = j || q, l = G.test(a) && d.parentNode || d;
                    j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                    try {
                        return p.apply(f, o.call(l.querySelectorAll(a.replace(C, "[id='" + k + "'] $&")), 0)), 
                        f;
                    } catch (i) {} finally {
                        j || d.removeAttribute("id");
                    }
                }
                return b(a, d, f, g, h);
            }, g && (T(function(b) {
                a = g.call(b, "div");
                try {
                    g.call(b, "[test!='']:sizzle"), f.push($.match.PSEUDO);
                } catch (c) {}
            }), f = new RegExp(f.join("|")), Z.matchesSelector = function(b, c) {
                c = c.replace(d, "='$1']");
                if (!ab(b) && !f.test(c) && (!e || !e.test(c))) try {
                    var h = g.call(b, c);
                    if (h || a || b.document && b.document.nodeType !== 11) return h;
                } catch (i) {}
                return Z(c, null, null, [ b ]).length > 0;
            });
        }(), Z.attr = n.attr, n.find = Z, n.expr = Z.selectors, n.expr[":"] = n.expr.pseudos, 
        n.unique = Z.uniqueSort, n.text = Z.getText, n.isXMLDoc = Z.isXML, n.contains = Z.contains;
    }(window);
    var ab = /Until$/, bb = /^(?:parents|prev(?:Until|All))/, cb = /^.[^:#\[\.,]*$/, db = n.expr.match.needsContext, eb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    n.fn.extend({
        find: function(a) {
            var b, c, d, e, f, g, h = this;
            if (typeof a != "string") return n(a).filter(function() {
                for (b = 0, c = h.length; b < c; b++) if (n.contains(h[b], this)) return !0;
            });
            g = this.pushStack("", "find", a);
            for (b = 0, c = this.length; b < c; b++) {
                d = g.length, n.find(a, this[b], g);
                if (b > 0) for (e = d; e < g.length; e++) for (f = 0; f < d; f++) if (g[f] === g[e]) {
                    g.splice(e--, 1);
                    break;
                }
            }
            return g;
        },
        has: function(a) {
            var b, c = n(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; b < d; b++) if (n.contains(this, c[b])) return !0;
            });
        },
        not: function(a) {
            return this.pushStack(hb(this, a, !1), "not", a);
        },
        filter: function(a) {
            return this.pushStack(hb(this, a, !0), "filter", a);
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? db.test(a) ? n(a, this.context).index(this[0]) >= 0 : n.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            var c, d = 0, e = this.length, f = [], g = db.test(a) || typeof a != "string" ? n(a, b || this.context) : 0;
            for (;d < e; d++) {
                c = this[d];
                while (c && c.ownerDocument && c !== b && c.nodeType !== 11) {
                    if (g ? g.index(c) > -1 : n.find.matchesSelector(c, a)) {
                        f.push(c);
                        break;
                    }
                    c = c.parentNode;
                }
            }
            return f = f.length > 1 ? n.unique(f) : f, this.pushStack(f, "closest", a);
        },
        index: function(a) {
            return a ? typeof a == "string" ? n.inArray(this[0], n(a)) : n.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function(a, b) {
            var c = typeof a == "string" ? n(a, b) : n.makeArray(a && a.nodeType ? [ a ] : a), d = n.merge(this.get(), c);
            return this.pushStack(fb(c[0]) || fb(d[0]) ? d : n.unique(d));
        },
        addBack: function(a) {
            return this.add(a == null ? this.prevObject : this.prevObject.filter(a));
        }
    }), n.fn.andSelf = n.fn.addBack, n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function(a) {
            return n.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c);
        },
        next: function(a) {
            return gb(a, "nextSibling");
        },
        prev: function(a) {
            return gb(a, "previousSibling");
        },
        nextAll: function(a) {
            return n.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return n.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a);
        },
        children: function(a) {
            return n.sibling(a.firstChild);
        },
        contents: function(a) {
            return n.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : n.merge([], a.childNodes);
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return ab.test(a) || (d = c), d && typeof d == "string" && (e = n.filter(d, e)), 
            e = this.length > 1 && !eb[a] ? n.unique(e) : e, this.length > 1 && bb.test(a) && (e = e.reverse()), 
            this.pushStack(e, a, i.call(arguments).join(","));
        };
    }), n.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? n.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : n.find.matches(a, b);
        },
        dir: function(a, b, c) {
            var d = [], e = a[b];
            while (e && e.nodeType !== 9 && (c === undefined || e.nodeType !== 1 || !n(e).is(c))) e.nodeType === 1 && d.push(e), 
            e = e[b];
            return d;
        },
        sibling: function(a, b) {
            var c = [];
            for (;a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c;
        }
    });
    var jb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", kb = / jQuery\d+="(?:null|\d+)"/g, lb = /^\s+/, mb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, nb = /<([\w:]+)/, ob = /<tbody/i, pb = /<|&#?\w+;/, qb = /<(?:script|style|link)/i, rb = /<(?:script|object|embed|option|style)/i, sb = new RegExp("<(?:" + jb + ")[\\s/>]", "i"), tb = /^(?:checkbox|radio)$/, ub = /checked\s*(?:[^=]|=\s*.checked.)/i, vb = /\/(java|ecma)script/i, wb = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, xb = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    }, yb = ib(c), zb = yb.appendChild(c.createElement("div"));
    xb.optgroup = xb.option, xb.tbody = xb.tfoot = xb.colgroup = xb.caption = xb.thead, 
    xb.th = xb.td, n.support.htmlSerialize || (xb._default = [ 1, "X<div>", "</div>" ]), 
    n.fn.extend({
        text: function(a) {
            return n.access(this, function(a) {
                return a === undefined ? n.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a));
            }, null, a, arguments.length);
        },
        wrapAll: function(a) {
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            if (!fb(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this);
            });
            if (arguments.length) {
                var a = n.clean(arguments);
                return this.pushStack(n.merge(a, this), "before", this.selector);
            }
        },
        after: function() {
            if (!fb(this[0])) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
            if (arguments.length) {
                var a = n.clean(arguments);
                return this.pushStack(n.merge(this, a), "after", this.selector);
            }
        },
        remove: function(a, b) {
            var c, d = 0;
            for (;(c = this[d]) != null; d++) if (!a || n.filter(a, [ c ]).length) !b && c.nodeType === 1 && (n.cleanData(c.getElementsByTagName("*")), 
            n.cleanData([ c ])), c.parentNode && c.parentNode.removeChild(c);
            return this;
        },
        empty: function() {
            var a, b = 0;
            for (;(a = this[b]) != null; b++) {
                a.nodeType === 1 && n.cleanData(a.getElementsByTagName("*"));
                while (a.firstChild) a.removeChild(a.firstChild);
            }
            return this;
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                return n.clone(this, a, b);
            });
        },
        html: function(a) {
            return n.access(this, function(a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (a === undefined) return b.nodeType === 1 ? b.innerHTML.replace(kb, "") : undefined;
                if (typeof a == "string" && !qb.test(a) && (n.support.htmlSerialize || !sb.test(a)) && (n.support.leadingWhitespace || !lb.test(a)) && !xb[(nb.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                    a = a.replace(mb, "<$1></$2>");
                    try {
                        for (;c < d; c++) b = this[c] || {}, b.nodeType === 1 && (n.cleanData(b.getElementsByTagName("*")), 
                        b.innerHTML = a);
                        b = 0;
                    } catch (e) {}
                }
                b && this.empty().append(a);
            }, null, a, arguments.length);
        },
        replaceWith: function(a) {
            return fb(this[0]) ? this.length ? this.pushStack(n(n.isFunction(a) ? a() : a), "replaceWith", a) : this : n.isFunction(a) ? this.each(function(b) {
                var c = n(this), d = c.html();
                c.replaceWith(a.call(this, b, d));
            }) : (typeof a != "string" && (a = n(a).detach()), this.each(function() {
                var b = this.nextSibling, c = this.parentNode;
                n(this).remove(), b ? n(b).before(a) : n(c).append(a);
            }));
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, b, c) {
            a = [].concat.apply([], a);
            var d, e, f, g, h = 0, i = a[0], j = [], k = this.length;
            if (!n.support.checkClone && k > 1 && typeof i == "string" && ub.test(i)) return this.each(function() {
                n(this).domManip(a, b, c);
            });
            if (n.isFunction(i)) return this.each(function(d) {
                var e = n(this);
                a[0] = i.call(this, d, b ? e.html() : undefined), e.domManip(a, b, c);
            });
            if (this[0]) {
                d = n.buildFragment(a, this, j), f = d.fragment, e = f.firstChild, f.childNodes.length === 1 && (f = e);
                if (e) {
                    b = b && n.nodeName(e, "tr");
                    for (g = d.cacheable || k - 1; h < k; h++) c.call(b && n.nodeName(this[h], "table") ? Ab(this[h], "tbody") : this[h], h === g ? f : n.clone(f, !0, !0));
                }
                f = e = null, j.length && n.each(j, function(a, b) {
                    b.src ? n.ajax ? n.ajax({
                        url: b.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : n.error("no ajax") : n.globalEval((b.text || b.textContent || b.innerHTML || "").replace(wb, "")), 
                    b.parentNode && b.parentNode.removeChild(b);
                });
            }
            return this;
        }
    }), n.buildFragment = function(a, b, d) {
        var e, f, g, h = a[0];
        return b = b || c, b = (b[0] || b).ownerDocument || b[0] || b, typeof b.createDocumentFragment == "undefined" && (b = c), 
        a.length === 1 && typeof h == "string" && h.length < 512 && b === c && h.charAt(0) === "<" && !rb.test(h) && (n.support.checkClone || !ub.test(h)) && (n.support.html5Clone || !sb.test(h)) && (f = !0, 
        e = n.fragments[h], g = e !== undefined), e || (e = b.createDocumentFragment(), 
        n.clean(a, b, e, d), f && (n.fragments[h] = g && e)), {
            fragment: e,
            cacheable: f
        };
    }, n.fragments = {}, n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(c) {
            var d, e = 0, f = [], g = n(c), h = g.length, i = this.length === 1 && this[0].parentNode;
            if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) return g[b](this[0]), 
            this;
            for (;e < h; e++) d = (e > 0 ? this.clone(!0) : this).get(), n(g[e])[b](d), f = f.concat(d);
            return this.pushStack(f, a, g.selector);
        };
    }), n.extend({
        clone: function(a, b, c) {
            var d, e, f, g;
            n.support.html5Clone || n.isXMLDoc(a) || !sb.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (zb.innerHTML = a.outerHTML, 
            zb.removeChild(g = zb.firstChild));
            if ((!n.support.noCloneEvent || !n.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !n.isXMLDoc(a)) {
                Cb(a, g), d = Db(a), e = Db(g);
                for (f = 0; d[f]; ++f) e[f] && Cb(d[f], e[f]);
            }
            if (b) {
                Bb(a, g);
                if (c) {
                    d = Db(a), e = Db(g);
                    for (f = 0; d[f]; ++f) Bb(d[f], e[f]);
                }
            }
            return d = e = null, g;
        },
        clean: function(a, b, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r, s = 0, t = [];
            if (!b || typeof b.createDocumentFragment == "undefined") b = c;
            for (g = b === c && yb; (h = a[s]) != null; s++) {
                typeof h == "number" && (h += "");
                if (!h) continue;
                if (typeof h == "string") if (!pb.test(h)) h = b.createTextNode(h); else {
                    g = g || ib(b), l = l || g.appendChild(b.createElement("div")), h = h.replace(mb, "<$1></$2>"), 
                    i = (nb.exec(h) || [ "", "" ])[1].toLowerCase(), j = xb[i] || xb._default, k = j[0], 
                    l.innerHTML = j[1] + h + j[2];
                    while (k--) l = l.lastChild;
                    if (!n.support.tbody) {
                        m = ob.test(h), o = i === "table" && !m ? l.firstChild && l.firstChild.childNodes : j[1] === "<table>" && !m ? l.childNodes : [];
                        for (f = o.length - 1; f >= 0; --f) n.nodeName(o[f], "tbody") && !o[f].childNodes.length && o[f].parentNode.removeChild(o[f]);
                    }
                    !n.support.leadingWhitespace && lb.test(h) && l.insertBefore(b.createTextNode(lb.exec(h)[0]), l.firstChild), 
                    h = l.childNodes, l = g.lastChild;
                }
                h.nodeType ? t.push(h) : t = n.merge(t, h);
            }
            l && (g.removeChild(l), h = l = g = null);
            if (!n.support.appendChecked) for (s = 0; (h = t[s]) != null; s++) n.nodeName(h, "input") ? Eb(h) : typeof h.getElementsByTagName != "undefined" && n.grep(h.getElementsByTagName("input"), Eb);
            if (d) {
                q = function(a) {
                    if (!a.type || vb.test(a.type)) return e ? e.push(a.parentNode ? a.parentNode.removeChild(a) : a) : d.appendChild(a);
                };
                for (s = 0; (h = t[s]) != null; s++) if (!n.nodeName(h, "script") || !q(h)) d.appendChild(h), 
                typeof h.getElementsByTagName != "undefined" && (r = n.grep(n.merge([], h.getElementsByTagName("script")), q), 
                t.splice.apply(t, [ s + 1, 0 ].concat(r)), s += r.length);
            }
            return t;
        },
        cleanData: function(a, b) {
            var c, d, e, f, g = 0, h = n.expando, i = n.cache, j = n.support.deleteExpando, k = n.event.special;
            for (;(e = a[g]) != null; g++) if (b || n.acceptData(e)) {
                d = e[h], c = d && i[d];
                if (c) {
                    if (c.events) for (f in c.events) k[f] ? n.event.remove(e, f) : n.removeEvent(e, f, c.handle);
                    i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, 
                    n.deletedIds.push(d));
                }
            }
        }
    }), function() {
        var a, b;
        n.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            };
        }, a = n.uaMatch(e.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), 
        b.webkit && (b.safari = !0), n.browser = b, n.sub = function() {
            function a(b, c) {
                return new a.fn.init(b, c);
            }
            n.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, 
            a.sub = this.sub, a.fn.init = function(d, e) {
                return e && e instanceof n && !(e instanceof a) && (e = a(e)), n.fn.init.call(this, d, e, b);
            }, a.fn.init.prototype = a.fn;
            var b = a(c);
            return a;
        };
    }();
    var Fb, Gb, Hb, Ib = /alpha\([^)]*\)/i, Jb = /opacity=([^)]*)/, Kb = /^(top|right|bottom|left)$/, Lb = /^margin/, Mb = new RegExp("^(" + o + ")(.*)$", "i"), Nb = new RegExp("^(" + o + ")(?!px)[a-z%]+$", "i"), Ob = new RegExp("^([-+])=(" + o + ")", "i"), Pb = {}, Qb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Rb = {
        letterSpacing: 0,
        fontWeight: 400,
        lineHeight: 1
    }, Sb = [ "Top", "Right", "Bottom", "Left" ], Tb = [ "Webkit", "O", "Moz", "ms" ], Ub = n.fn.toggle;
    n.fn.extend({
        css: function(a, b) {
            return n.access(this, function(a, b, c) {
                return c !== undefined ? n.style(a, b, c) : n.css(a, b);
            }, a, b, arguments.length > 1);
        },
        show: function() {
            return Xb(this, !0);
        },
        hide: function() {
            return Xb(this);
        },
        toggle: function(a, b) {
            var c = typeof a == "boolean";
            return n.isFunction(a) && n.isFunction(b) ? Ub.apply(this, arguments) : this.each(function() {
                (c ? a : Wb(this)) ? n(this).show() : n(this).hide();
            });
        }
    }), n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Fb(a, "opacity");
                        return c === "" ? "1" : c;
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": n.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var e, f, g, h = n.camelCase(b), i = a.style;
            b = n.cssProps[h] || (n.cssProps[h] = Vb(i, h)), g = n.cssHooks[b] || n.cssHooks[h];
            if (c === undefined) return g && "get" in g && (e = g.get(a, !1, d)) !== undefined ? e : i[b];
            f = typeof c, f === "string" && (e = Ob.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), 
            f = "number");
            if (c == null || f === "number" && isNaN(c)) return;
            f === "number" && !n.cssNumber[h] && (c += "px");
            if (!g || !("set" in g) || (c = g.set(a, c, d)) !== undefined) try {
                i[b] = c;
            } catch (j) {}
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Vb(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], 
            g && "get" in g && (e = g.get(a, !0, d)), e === undefined && (e = Fb(a, b)), e === "normal" && b in Rb && (e = Rb[b]), 
            c || d !== undefined ? (f = parseFloat(e), c || n.isNumeric(f) ? f || 0 : e) : e;
        },
        swap: function(a, b, c) {
            var d, e, f = {};
            for (e in b) f[e] = a.style[e], a.style[e] = b[e];
            d = c.call(a);
            for (e in b) a.style[e] = f[e];
            return d;
        }
    }), window.getComputedStyle ? Fb = function(a, b) {
        var c, d, e, f, g = getComputedStyle(a, null), h = a.style;
        return g && (c = g[b], c === "" && !n.contains(a.ownerDocument.documentElement, a) && (c = n.style(a, b)), 
        Nb.test(c) && Lb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, 
        c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c;
    } : c.documentElement.currentStyle && (Fb = function(a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return e == null && f && f[b] && (e = f[b]), Nb.test(e) && !Kb.test(b) && (c = f.left, 
        d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), 
        f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), 
        e === "" ? "auto" : e;
    }), n.each([ "height", "width" ], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) return a.offsetWidth !== 0 || Fb(a, "display") !== "none" ? $b(a, b, d) : n.swap(a, Qb, function() {
                    return $b(a, b, d);
                });
            },
            set: function(a, c, d) {
                return Yb(a, c, d ? Zb(a, b, d, n.support.boxSizing && n.css(a, "boxSizing") === "border-box") : 0);
            }
        };
    }), n.support.opacity || (n.cssHooks.opacity = {
        get: function(a, b) {
            return Jb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = n.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && n.trim(f.replace(Ib, "")) === "" && c.removeAttribute) {
                c.removeAttribute("filter");
                if (d && !d.filter) return;
            }
            c.filter = Ib.test(f) ? f.replace(Ib, e) : f + " " + e;
        }
    }), n(function() {
        n.support.reliableMarginRight || (n.cssHooks.marginRight = {
            get: function(a, b) {
                return n.swap(a, {
                    display: "inline-block"
                }, function() {
                    if (b) return Fb(a, "marginRight");
                });
            }
        }), !n.support.pixelPosition && n.fn.position && n.each([ "top", "left" ], function(a, b) {
            n.cssHooks[b] = {
                get: function(a, c) {
                    if (c) {
                        var d = Fb(a, b);
                        return Nb.test(d) ? n(a).position()[b] + "px" : d;
                    }
                }
            };
        });
    }), n.expr && n.expr.filters && (n.expr.filters.hidden = function(a) {
        return a.offsetWidth === 0 && a.offsetHeight === 0 || !n.support.reliableHiddenOffsets && (a.style && a.style.display || Fb(a, "display")) === "none";
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a);
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = typeof c == "string" ? c.split(" ") : [ c ], f = {};
                for (d = 0; d < 4; d++) f[a + Sb[d] + b] = e[d] || e[d - 2] || e[0];
                return f;
            }
        }, Lb.test(a) || (n.cssHooks[a + b].set = Yb);
    });
    var ac = /%20/g, bc = /\[\]$/, cc = /\r?\n/g, dc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, ec = /^(?:select|textarea)/i;
    n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? n.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || ec.test(this.nodeName) || dc.test(this.type));
            }).map(function(a, b) {
                var c = n(this).val();
                return c == null ? null : n.isArray(c) ? n.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(cc, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(cc, "\r\n")
                };
            }).get();
        }
    }), n.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = n.isFunction(b) ? b() : b == null ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
        };
        b === undefined && (b = n.ajaxSettings && n.ajaxSettings.traditional);
        if (n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value);
        }); else for (c in a) fc(c, a[c], b, e);
        return d.join("&").replace(ac, "+");
    };
    var gc, hc, ic = /#.*$/, jc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, kc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, lc = /^(?:GET|HEAD)$/, mc = /^\/\//, nc = /\?/, oc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, pc = /([?&])_=[^&]*/, qc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, rc = n.fn.load, sc = {}, tc = {}, uc = [ "*/" ] + [ "*" ];
    try {
        gc = d.href;
    } catch (vc) {
        gc = c.createElement("a"), gc.href = "", gc = gc.href;
    }
    hc = qc.exec(gc.toLowerCase()) || [], n.fn.load = function(a, b, c) {
        if (typeof a != "string" && rc) return rc.apply(this, arguments);
        if (!this.length) return this;
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = a.slice(h, a.length), a = a.slice(0, h)), n.isFunction(b) ? (c = b, 
        b = undefined) : typeof b == "object" && (e = "POST"), n.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b,
            complete: function(a, b) {
                c && g.each(c, f || [ a.responseText, b, a ]);
            }
        }).done(function(a) {
            f = arguments, g.html(d ? n("<div>").append(a.replace(oc, "")).find(d) : a);
        }), this;
    }, n.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), n.each([ "get", "post" ], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = undefined), n.ajax({
                type: b,
                url: a,
                data: c,
                success: d,
                dataType: e
            });
        };
    }), n.extend({
        getScript: function(a, b) {
            return n.get(a, undefined, b, "script");
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json");
        },
        ajaxSetup: function(a, b) {
            return b ? yc(a, n.ajaxSettings) : (b = a, a = n.ajaxSettings), yc(a, b), a;
        },
        ajaxSettings: {
            url: gc,
            isLocal: kc.test(hc[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": uc
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": window.String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: wc(sc),
        ajaxTransport: wc(tc),
        ajax: function(a, b) {
            function x(a, b, e, h) {
                var j, q, s, t, v, x = b;
                if (u === 2) return;
                u = 2, g && clearTimeout(g), f = undefined, d = h || "", w.readyState = a > 0 ? 4 : 0, 
                e && (t = zc(k, w, e));
                if (a >= 200 && a < 300 || a === 304) k.ifModified && (v = w.getResponseHeader("Last-Modified"), 
                v && (n.lastModified[c] = v), v = w.getResponseHeader("Etag"), v && (n.etag[c] = v)), 
                a === 304 ? (x = "notmodified", j = !0) : (j = Ac(k, t), x = j.state, q = j.data, 
                s = j.error, j = !s); else {
                    s = x;
                    if (!x || a) x = "error", a < 0 && (a = 0);
                }
                w.status = a, w.statusText = "" + (b || x), j ? o.resolveWith(l, [ q, x, w ]) : o.rejectWith(l, [ w, x, s ]), 
                w.statusCode(r), r = undefined, i && m.trigger("ajax" + (j ? "Success" : "Error"), [ w, k, j ? q : s ]), 
                p.fireWith(l, [ w, x ]), i && (m.trigger("ajaxComplete", [ w, k ]), --n.active || n.event.trigger("ajaxStop"));
            }
            typeof a == "object" && (b = a, a = undefined), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b), l = k.context || k, m = l !== k && (l.nodeType || l instanceof n) ? n(l) : n.event, o = n.Deferred(), p = n.Callbacks("once memory"), r = k.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!u) {
                        var c = a.toLowerCase();
                        a = t[c] = t[c] || a, s[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function() {
                    return u === 2 ? d : null;
                },
                getResponseHeader: function(a) {
                    var b;
                    if (u === 2) {
                        if (!e) {
                            e = {};
                            while (b = jc.exec(d)) e[b[1].toLowerCase()] = b[2];
                        }
                        b = e[a.toLowerCase()];
                    }
                    return b === undefined ? null : b;
                },
                overrideMimeType: function(a) {
                    return u || (k.mimeType = a), this;
                },
                abort: function(a) {
                    return a = a || v, f && f.abort(a), x(0, a), this;
                }
            };
            o.promise(w), w.success = w.done, w.error = w.fail, w.complete = p.add, w.statusCode = function(a) {
                if (a) {
                    var b;
                    if (u < 2) for (b in a) r[b] = [ r[b], a[b] ]; else b = a[w.status], w.always(b);
                }
                return this;
            }, k.url = ((a || k.url) + "").replace(ic, "").replace(mc, hc[1] + "//"), k.dataTypes = n.trim(k.dataType || "*").toLowerCase().split(q), 
            k.crossDomain == null && (h = qc.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] == hc[1] && h[2] == hc[2] && (h[3] || (h[1] === "http:" ? 80 : 443)) == (hc[3] || (hc[1] === "http:" ? 80 : 443)))), 
            k.data && k.processData && typeof k.data != "string" && (k.data = n.param(k.data, k.traditional)), 
            xc(sc, k, b, w);
            if (u === 2) return w;
            i = k.global, k.type = k.type.toUpperCase(), k.hasContent = !lc.test(k.type), i && n.active++ === 0 && n.event.trigger("ajaxStart");
            if (!k.hasContent) {
                k.data && (k.url += (nc.test(k.url) ? "&" : "?") + k.data, delete k.data), c = k.url;
                if (k.cache === !1) {
                    var y = n.now(), z = k.url.replace(pc, "$1_=" + y);
                    k.url = z + (z === k.url ? (nc.test(k.url) ? "&" : "?") + "_=" + y : "");
                }
            }
            (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && w.setRequestHeader("Content-Type", k.contentType), 
            k.ifModified && (c = c || k.url, n.lastModified[c] && w.setRequestHeader("If-Modified-Since", n.lastModified[c]), 
            n.etag[c] && w.setRequestHeader("If-None-Match", n.etag[c])), w.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + (k.dataTypes[0] !== "*" ? ", " + uc + "; q=0.01" : "") : k.accepts["*"]);
            for (j in k.headers) w.setRequestHeader(j, k.headers[j]);
            if (!k.beforeSend || k.beforeSend.call(l, w, k) !== !1 && u !== 2) {
                v = "abort";
                for (j in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[j](k[j]);
                f = xc(tc, k, b, w);
                if (!f) x(-1, "No Transport"); else {
                    w.readyState = 1, i && m.trigger("ajaxSend", [ w, k ]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                        w.abort("timeout");
                    }, k.timeout));
                    try {
                        u = 1, f.send(s, x);
                    } catch (A) {
                        if (!(u < 2)) throw A;
                        x(-1, A);
                    }
                }
                return w;
            }
            return w.abort();
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Bc = [], Cc = /\?/, Dc = /(=)\?(?=&|$)|\?\?/, Ec = n.now();
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Bc.pop() || n.expando + "_" + Ec++;
            return this[a] = !0, a;
        }
    }), n.ajaxPrefilter("json jsonp", function(a, b, c) {
        var d, e, f, g = a.data, h = a.url, i = a.jsonp !== !1, j = i && Dc.test(h), k = i && !j && typeof g == "string" && !(a.contentType || "").indexOf("application/x-www-form-urlencoded") && Dc.test(g);
        if (a.dataTypes[0] === "jsonp" || j || k) return d = a.jsonpCallback = n.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, 
        e = window[d], j ? a.url = h.replace(Dc, "$1" + d) : k ? a.data = g.replace(Dc, "$1" + d) : i && (a.url += (Cc.test(h) ? "&" : "?") + a.jsonp + "=" + d), 
        a.converters["script json"] = function() {
            return f || n.error(d + " was not called"), f[0];
        }, a.dataTypes[0] = "json", window[d] = function() {
            f = arguments;
        }, c.always(function() {
            window[d] = e, a[d] && (a.jsonpCallback = b.jsonpCallback, Bc.push(d)), f && n.isFunction(e) && e(f[0]), 
            f = e = undefined;
        }), "script";
    }), n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a;
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        a.cache === undefined && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, d = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(e, f) {
                    b = c.createElement("script"), b.async = "async", a.scriptCharset && (b.charset = a.scriptCharset), 
                    b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        if (c || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, 
                        d && b.parentNode && d.removeChild(b), b = undefined, c || f(200, "success");
                    }, d.insertBefore(b, d.firstChild);
                },
                abort: function() {
                    b && b.onload(0, 1);
                }
            };
        }
    });
    var Fc, Gc = window.ActiveXObject ? function() {
        for (var a in Fc) Fc[a](0, 1);
    } : !1, Hc = 0;
    n.ajaxSettings.xhr = window.ActiveXObject ? function() {
        return !this.isLocal && Ic() || Jc();
    } : Ic, function(a) {
        n.extend(n.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        });
    }(n.ajaxSettings.xhr()), n.support.ajax && n.ajaxTransport(function(a) {
        if (!a.crossDomain || n.support.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f, g = a.xhr();
                    a.username ? g.open(a.type, a.url, a.async, a.username, a.password) : g.open(a.type, a.url, a.async);
                    if (a.xhrFields) for (f in a.xhrFields) g[f] = a.xhrFields[f];
                    a.mimeType && g.overrideMimeType && g.overrideMimeType(a.mimeType), !a.crossDomain && !c["X-Requested-With"] && (c["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (f in c) g.setRequestHeader(f, c[f]);
                    } catch (h) {}
                    g.send(a.hasContent && a.data || null), b = function(c, f) {
                        var h, i, j, k, l;
                        try {
                            if (b && (f || g.readyState === 4)) {
                                b = undefined, e && (g.onreadystatechange = n.noop, Gc && delete Fc[e]);
                                if (f) g.readyState !== 4 && g.abort(); else {
                                    h = g.status, j = g.getAllResponseHeaders(), k = {}, l = g.responseXML, l && l.documentElement && (k.xml = l);
                                    try {
                                        k.text = g.responseText;
                                    } catch (c) {}
                                    try {
                                        i = g.statusText;
                                    } catch (m) {
                                        i = "";
                                    }
                                    !h && a.isLocal && !a.crossDomain ? h = k.text ? 200 : 404 : h === 1223 && (h = 204);
                                }
                            }
                        } catch (o) {
                            f || d(-1, o);
                        }
                        k && d(h, i, k, j);
                    }, a.async ? g.readyState === 4 ? setTimeout(b, 0) : (e = ++Hc, Gc && (Fc || (Fc = {}, 
                    n(window).unload(Gc)), Fc[e] = b), g.onreadystatechange = b) : b();
                },
                abort: function() {
                    b && b(0, 1);
                }
            };
        }
    });
    var Kc, Lc, Mc = /^(?:toggle|show|hide)$/, Nc = new RegExp("^(?:([-+])=|)(" + o + ")([a-z%]*)$", "i"), Oc = /queueHooks$/, Pc = [ Vc ], Qc = {
        "*": [ function(a, b) {
            var c, d, e, f = this.createTween(a, b), g = Nc.exec(b), h = f.cur(), i = +h || 0, j = 1;
            if (g) {
                c = +g[2], d = g[3] || (n.cssNumber[a] ? "" : "px");
                if (d !== "px" && i) {
                    i = n.css(f.elem, a, !0) || c || 1;
                    do e = j = j || ".5", i /= j, n.style(f.elem, a, i + d), j = f.cur() / h; while (j !== 1 && j !== e);
                }
                f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c;
            }
            return f;
        } ]
    };
    n.Animation = n.extend(Tc, {
        tweener: function(a, b) {
            n.isFunction(a) ? (b = a, a = [ "*" ]) : a = a.split(" ");
            var c, d = 0, e = a.length;
            for (;d < e; d++) c = a[d], Qc[c] = Qc[c] || [], Qc[c].unshift(b);
        },
        prefilter: function(a, b) {
            b ? Pc.unshift(a) : Pc.push(a);
        }
    }), n.Tween = Wc, Wc.prototype = {
        constructor: Wc,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), 
            this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px");
        },
        cur: function() {
            var a = Wc.propHooks[this.prop];
            return a && a.get ? a.get(this) : Wc.propHooks._default.get(this);
        },
        run: function(a) {
            var b, c = Wc.propHooks[this.prop];
            return this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), 
            this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            c && c.set ? c.set(this) : Wc.propHooks._default.set(this), this;
        }
    }, Wc.prototype.init.prototype = Wc.prototype, Wc.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = n.css(a.elem, a.prop, !1, ""), 
                !b || b === "auto" ? 0 : b) : a.elem[a.prop];
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (a.elem.style[n.cssProps[a.prop]] != null || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now;
            }
        }
    }, Wc.propHooks.scrollTop = Wc.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
        }
    }, n.each([ "toggle", "show", "hide" ], function(a, b) {
        var c = n.fn[b];
        n.fn[b] = function(d, e, f) {
            return d == null || typeof d == "boolean" || !a && n.isFunction(d) && n.isFunction(e) ? c.apply(this, arguments) : this.animate(Xc(b, !0), d, e, f);
        };
    }), n.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(Wb).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function() {
                var b = Tc(this, n.extend({}, a), f);
                e && b.stop(!0);
            };
            return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop, b(c);
            };
            return typeof a != "string" && (c = b, b = a, a = undefined), b && a !== !1 && this.queue(a || "fx", []), 
            this.each(function() {
                var b = !0, e = a != null && a + "queueHooks", f = n.timers, g = n._data(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && Oc.test(e) && d(g[e]);
                for (e = f.length; e--; ) f[e].elem === this && (a == null || f[e].queue === a) && (f[e].anim.stop(c), 
                b = !1, f.splice(e, 1));
                (b || !c) && n.dequeue(this, a);
            });
        }
    }), n.each({
        slideDown: Xc("show"),
        slideUp: Xc("hide"),
        slideToggle: Xc("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        n.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), n.speed = function(a, b, c) {
        var d = a && typeof a == "object" ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        d.duration = n.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default;
        if (d.queue == null || d.queue === !0) d.queue = "fx";
        return d.old = d.complete, d.complete = function() {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue);
        }, d;
    }, n.easing = {
        linear: function(a) {
            return a;
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2;
        }
    }, n.timers = [], n.fx = Wc.prototype.init, n.fx.tick = function() {
        var a, b = n.timers, c = 0;
        for (;c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || n.fx.stop();
    }, n.fx.timer = function(a) {
        a() && n.timers.push(a) && !Lc && (Lc = setInterval(n.fx.tick, n.fx.interval));
    }, n.fx.interval = 13, n.fx.stop = function() {
        clearInterval(Lc), Lc = null;
    }, n.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, n.fx.step = {}, n.expr && n.expr.filters && (n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem;
        }).length;
    });
    var Yc = /^(?:body|html)$/i;
    n.fn.offset = function(a) {
        if (arguments.length) return a === undefined ? this : this.each(function(b) {
            n.offset.setOffset(this, a, b);
        });
        var b, c, d, e, f, g, h, i, j, k, l = this[0], m = l && l.ownerDocument;
        if (!m) return;
        return (d = m.body) === l ? n.offset.bodyOffset(l) : (c = m.documentElement, n.contains(c, l) ? (b = l.getBoundingClientRect(), 
        e = Zc(m), f = c.clientTop || d.clientTop || 0, g = c.clientLeft || d.clientLeft || 0, 
        h = e.pageYOffset || c.scrollTop, i = e.pageXOffset || c.scrollLeft, j = b.top + h - f, 
        k = b.left + i - g, {
            top: j,
            left: k
        }) : {
            top: 0,
            left: 0
        });
    }, n.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return n.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(n.css(a, "marginTop")) || 0, 
            c += parseFloat(n.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            };
        },
        setOffset: function(a, b, c) {
            var d = n.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = n(a), f = e.offset(), g = n.css(a, "top"), h = n.css(a, "left"), i = (d === "absolute" || d === "fixed") && n.inArray("auto", [ g, h ]) > -1, j = {}, k = {}, l, m;
            i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), 
            n.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), 
            b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j);
        }
    }, n.fn.extend({
        position: function() {
            if (!this[0]) return;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = Yc.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(n.css(a, "marginTop")) || 0, c.left -= parseFloat(n.css(a, "marginLeft")) || 0, 
            d.top += parseFloat(n.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(n.css(b[0], "borderLeftWidth")) || 0, 
            {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !Yc.test(a.nodeName) && n.css(a, "position") === "static") a = a.offsetParent;
                return a || c.body;
            });
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        n.fn[a] = function(d) {
            return n.access(this, function(a, d, e) {
                var f = Zc(a);
                if (e === undefined) return f ? b in f ? f[b] : f.document.documentElement[d] : a[d];
                f ? f.scrollTo(c ? n(f).scrollLeft() : e, c ? e : n(f).scrollTop()) : a[d] = e;
            }, a, d, arguments.length, null);
        };
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || typeof d != "boolean"), g = c || (d === !0 || e === !0 ? "margin" : "border");
                return n.access(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : b.nodeType === 9 ? (e = b.documentElement, 
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : d === undefined ? n.css(b, c, d, g) : n.style(b, c, d, g);
                }, b, f ? d : undefined, f);
            };
        });
    }), n.browser.msie && n.ajaxSetup({
        cache: !1
    });
    var $c = !1;
    return n.ajaxSetup({
        complete: function(a) {
            var b = a.getResponseHeader("nt");
            b && (Meilishuo.config.nt = b);
        },
        error: function(a) {
            switch (a.status) {
              case 461:
                $c || (window.location = window.location.href), $c = !0;
                break;

              case 4022:            }
        }
    }), window.jQuery = window.$ = n, n;
});;

define("app/slide", function(require, exports) {
    var $ = require("app/jquery"), resize = require("app/windowResize");
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
    exports.bind = init;
});;
/**
 * 
 */
define("app/windowResize", function(require, exports) {
    var $ = require("app/jquery");
    var onWindowSizeCng = [];
    var delay;
    function resizeFn() {
        delay && clearTimeout(delay);
        delay = window.setTimeout(function() {
            var j = onWindowSizeCng.length;
            for (var i = 0; i < j; i++) onWindowSizeCng[i]();
        }, 240);
    }
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
        mask.onresize = resizeFn;
    } else {
        window.onresize = resizeFn;
    }
    exports.bind = function(f) {
        onWindowSizeCng.push(f);
    };
});;
define("page/index", function(require, exports) {
    var $ = require("app/jquery");
    var slide = require("app/slide");
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
   
});