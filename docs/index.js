alert(22)
define("libs/text", ["module"], function(e) {
    "use strict";
    var c, a, l, s, u, r = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], n = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, o = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, d = "undefined" != typeof location && location.href, m = d && location.protocol && location.protocol.replace(/\:/, ""), h = d && location.hostname, f = d && (location.port || undefined), i = {}, p = e.config && e.config() || {};
    function useDefault(e, t) {
        return e === undefined || "" === e ? t : e
    }
    return c = {
        version: "2.0.15",
        strip: function(e) {
            if (e) {
                var t = (e = e.replace(n, "")).match(o);
                t && (e = t[1])
            } else
                e = "";
            return e
        },
        jsEscape: function(e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        },
        createXhr: p.createXhr || function() {
            var e, t, n;
            if ("undefined" != typeof XMLHttpRequest)
                return new XMLHttpRequest;
            if ("undefined" != typeof ActiveXObject)
                for (t = 0; t < 3; t += 1) {
                    n = r[t];
                    try {
                        e = new ActiveXObject(n)
                    } catch (o) {}
                    if (e) {
                        r = [n];
                        break
                    }
                }
            return e
        }
        ,
        parseName: function(e) {
            var t, n, o, r = !1, a = e.lastIndexOf("."), i = 0 === e.indexOf("./") || 0 === e.indexOf("../");
            return -1 !== a && (!i || 1 < a) ? (t = e.substring(0, a),
            n = e.substring(a + 1)) : t = e,
            -1 !== (a = (o = n || t).indexOf("!")) && (r = "strip" === o.substring(a + 1),
            o = o.substring(0, a),
            n ? n = o : t = o),
            {
                moduleName: t,
                ext: n,
                strip: r
            }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useXhr: function(e, t, n, o) {
            var r, a, i, l = c.xdRegExp.exec(e);
            return !l || (r = l[2],
            i = (a = (a = l[3]).split(":"))[1],
            a = a[0],
            (!r || r === t) && (!a || a.toLowerCase() === n.toLowerCase()) && (!i && !a || function isSamePort(e, t, n, o) {
                if (t === o)
                    return !0;
                if (e === n) {
                    if ("http" === e)
                        return useDefault(t, "80") === useDefault(o, "80");
                    if ("https" === e)
                        return useDefault(t, "443") === useDefault(o, "443")
                }
                return !1
            }(r, i, t, o)))
        },
        finishLoad: function(e, t, n, o) {
            n = t ? c.strip(n) : n,
            p.isBuild && (i[e] = n),
            o(n)
        },
        load: function(t, e, n, o) {
            if (o && o.isBuild && !o.inlineText)
                n();
            else {
                p.isBuild = o && o.isBuild;
                var r = c.parseName(t)
                  , a = r.moduleName + (r.ext ? "." + r.ext : "")
                  , i = e.toUrl(a)
                  , l = p.useXhr || c.useXhr;
                0 !== i.indexOf("empty:") ? !d || l(i, m, h, f) ? c.get(i, function(e) {
                    c.finishLoad(t, r.strip, e, n)
                }, function(e) {
                    n.error && n.error(e)
                }) : e([a], function(e) {
                    c.finishLoad(r.moduleName + "." + r.ext, r.strip, e, n)
                }) : n()
            }
        },
        write: function(e, t, n, o) {
            if (i.hasOwnProperty(t)) {
                var r = c.jsEscape(i[t]);
                n.asModule(e + "!" + t, "define(function () { return '" + r + "';});\n")
            }
        },
        writeFile: function(n, e, t, o, r) {
            var a = c.parseName(e)
              , i = a.ext ? "." + a.ext : ""
              , l = a.moduleName + i
              , s = t.toUrl(a.moduleName + i) + ".js";
            c.load(l, t, function(e) {
                var t = function(e) {
                    return o(s, e)
                };
                t.asModule = function(e, t) {
                    return o.asModule(e, s, t)
                }
                ,
                c.write(n, l, t, r)
            }, r)
        }
    },
    "node" === p.env || !p.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions.electron && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (a = require.nodeRequire("fs"),
    c.get = function(e, t, n) {
        try {
            var o = a.readFileSync(e, "utf8");
            "\ufeff" === o[0] && (o = o.substring(1)),
            t(o)
        } catch (r) {
            n && n(r)
        }
    }
    ) : "xhr" === p.env || !p.env && c.createXhr() ? c.get = function(o, r, a, e) {
        var t, i = c.createXhr();
        if (i.open("GET", o, !0),
        e)
            for (t in e)
                e.hasOwnProperty(t) && i.setRequestHeader(t.toLowerCase(), e[t]);
        p.onXhr && p.onXhr(i, o),
        i.onreadystatechange = function(e) {
            var t, n;
            4 === i.readyState && (399 < (t = i.status || 0) && t < 600 ? ((n = new Error(o + " HTTP status: " + t)).xhr = i,
            a && a(n)) : r(i.responseText),
            p.onXhrComplete && p.onXhrComplete(i, o))
        }
        ,
        i.send(null)
    }
    : "rhino" === p.env || !p.env && "undefined" != typeof Packages && "undefined" != typeof java ? c.get = function(e, t) {
        var n, o, r = new java.io.File(e), a = java.lang.System.getProperty("line.separator"), i = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),"utf-8")), l = "";
        try {
            for (n = new java.lang.StringBuffer,
            (o = i.readLine()) && o.length() && 65279 === o.charAt(0) && (o = o.substring(1)),
            null !== o && n.append(o); null !== (o = i.readLine()); )
                n.append(a),
                n.append(o);
            l = String(n.toString())
        } finally {
            i.close()
        }
        t(l)
    }
    : ("xpconnect" === p.env || !p.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (l = Components.classes,
    s = Components.interfaces,
    Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),
    u = "@mozilla.org/windows-registry-key;1"in l,
    c.get = function(e, t) {
        var n, o, r, a = {};
        u && (e = e.replace(/\//g, "\\")),
        r = new FileUtils.File(e);
        try {
            (n = l["@mozilla.org/network/file-input-stream;1"].createInstance(s.nsIFileInputStream)).init(r, 1, 0, !1),
            (o = l["@mozilla.org/intl/converter-input-stream;1"].createInstance(s.nsIConverterInputStream)).init(n, "utf-8", n.available(), s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
            o.readString(n.available(), a),
            o.close(),
            n.close(),
            t(a.value)
        } catch (i) {
            throw new Error((r && r.path || "") + ": " + i)
        }
    }
    ),
    c
}),
define("libs/oniui/mm_router/mm_history", [], function() {
    var n = document.createElement("a")
      , o = avalon.History = function() {
        this.location = location
    }
    ;
    o.started = !1,
    o.IEVersion = document.documentMode || (window.XMLHttpRequest ? 7 : 6),
    o.defaults = {
        basepath: "/",
        html5Mode: !1,
        hashPrefix: "!",
        iframeID: null,
        interval: 50,
        fireAnchor: !0,
        routeElementJudger: avalon.noop
    };
    var l = window.VBArray && o.IEVersion <= 7
      , r = !!window.history.pushState
      , i = !(!("onhashchange"in window) || window.VBArray && l);
    o.prototype = {
        constructor: o,
        getFragment: function(e) {
            return null == e && (e = "popstate" === this.monitorMode ? this.getPath() : this.getHash()),
            e.replace(/^[#\/]|\s+$/g, "")
        },
        getHash: function(e) {
            var t = (e || this).location.href;
            return this._getHash(t.slice(t.indexOf("#")))
        },
        _getHash: function(e) {
            return 0 === e.indexOf("#/") ? decodeURIComponent(e.slice(2)) : 0 === e.indexOf("#!/") ? decodeURIComponent(e.slice(3)) : ""
        },
        getPath: function() {
            var e = decodeURIComponent(this.location.pathname + this.location.search)
              , t = this.basepath.slice(0, -1);
            return e.indexOf(t) || (e = e.slice(t.length)),
            e.slice(1)
        },
        _getAbsolutePath: function(e) {
            return e.hasAttribute ? e.href : e.getAttribute("href", 4)
        },
        start: function(e) {
            if (o.started)
                throw new Error("avalon.history has already been started");
            o.started = !0,
            this.options = avalon.mix({}, o.defaults, e),
            this.html5Mode = !!this.options.html5Mode,
            this.monitorMode = this.html5Mode ? "popstate" : "hashchange",
            r || (this.html5Mode && (avalon.log("如果浏览器不支持HTML5 pushState，强制使用hash hack!"),
            this.html5Mode = !1),
            this.monitorMode = "hashchange"),
            i || (this.monitorMode = "iframepoll"),
            this.prefix = "#" + this.options.hashPrefix + "/",
            this.basepath = ("/" + this.options.basepath + "/").replace(/^\/+|\/+$/g, "/"),
            this.fragment = this.getFragment(),
            n.href = this.basepath,
            this.rootpath = this._getAbsolutePath(n);
            var a = this
              , t = "<!doctype html><html><body>@</body></html>";
            function checkUrl(e) {
                var t = a.iframe;
                if ("iframepoll" === a.monitorMode && !t)
                    return !1;
                var n, o = a.getFragment();
                if (t) {
                    var r = a.getHash(t);
                    o !== a.fragment ? (a._setIframeHistory(a.prefix + o),
                    n = o) : r !== a.fragment && (a.location.hash = a.prefix + r,
                    n = r)
                } else
                    o !== a.fragment && (n = o);
                void 0 !== n && (a.fragment = n,
                a.fireRouteChange(n, {
                    fromHistory: !0
                }))
            }
            switch (this.options.domain && (t = t.replace("<body>", "<script>document.domain =" + this.options.domain + "<\/script><body>")),
            this.iframeHTML = t,
            "iframepoll" === this.monitorMode && avalon.ready(function() {
                if (!a.iframe) {
                    var e = a.iframe || document.getElementById(a.iframeID) || document.createElement("iframe");
                    e.src = "javascript:0",
                    e.style.display = "none",
                    e.tabIndex = -1,
                    document.body.appendChild(e),
                    a.iframe = e.contentWindow,
                    a._setIframeHistory(a.prefix + a.fragment)
                }
            }),
            this.monitorMode) {
            case "popstate":
                this.checkUrl = avalon.bind(window, "popstate", checkUrl),
                this._fireLocationChange = checkUrl;
                break;
            case "hashchange":
                this.checkUrl = avalon.bind(window, "hashchange", checkUrl);
                break;
            case "iframepoll":
                this.checkUrl = setInterval(checkUrl, this.options.interval)
            }
            avalon.ready(function() {
                a.fireRouteChange(a.fragment || "/", {
                    replace: !0
                })
            })
        },
        fireRouteChange: function(e, t) {
            var n = avalon.router;
            n && n.navigate && (n.setLastPath(e),
            n.navigate("/" === e ? e : "/" + e, t)),
            this.options.fireAnchor && function scrollToAnchorId(e, t) {
                (t = document.getElementById(e)) ? t.scrollIntoView() : (t = function getFirstAnchor(e) {
                    for (var t, n = 0; t = e[n++]; )
                        if ("A" === t.nodeName)
                            return t
                }(document.getElementsByName(e))) ? t.scrollIntoView() : window.scrollTo(0, 0)
            }(e.replace(/\?.*/g, ""))
        },
        stop: function() {
            avalon.unbind(window, "popstate", this.checkUrl),
            avalon.unbind(window, "hashchange", this.checkUrl),
            clearInterval(this.checkUrl),
            o.started = !1
        },
        updateLocation: function(e, t, n) {
            var o = (t = t || {}).replace
              , r = t.silent;
            if ("popstate" === this.monitorMode) {
                var a = this.rootpath + e + (n || "");
                a != this.location.href.split("#")[0] && history[o ? "replaceState" : "pushState"]({
                    path: a
                }, document.title, a),
                r || this._fireLocationChange()
            } else {
                var i = this.prefix + e;
                r && e != this.getHash() && (this._setIframeHistory(i, o),
                this.fragment && avalon.router.setLastPath(this.fragment),
                this.fragment = this._getHash(i)),
                this._setHash(this.location, i, o)
            }
        },
        _setHash: function(e, t, n) {
            var o = e.href.replace(/(javascript:|#).*$/, "");
            n ? e.replace(o + t) : e.hash = t
        },
        _setIframeHistory: function(e, t) {
            if (this.iframe) {
                var n = this.iframe.document;
                n.open(),
                n.write(this.iframeHTML),
                n.close(),
                this._setHash(n.location, e, t)
            }
        }
    },
    avalon.history = new o,
    avalon.bind(document, "click", function(e) {
        var t = "defaultPrevented"in e ? e.defaultPrevented : !1 === e.returnValue
          , n = avalon.history.options.routeElementJudger;
        if (!(t || e.ctrlKey || e.metaKey || 2 === e.which)) {
            for (var o = e.target; "A" !== o.nodeName; )
                if (!(o = o.parentNode) || "BODY" === o.tagName)
                    return;
            if (function targetIsThisWindow(e) {
                if (!e || e === window.name || "_self" === e || "top" === e && window == window.top)
                    return !0;
                return !1
            }(o.target)) {
                var r = l ? o.getAttribute("href", 2) : o.getAttribute("href") || o.getAttribute("xlink:href")
                  , a = avalon.history.prefix;
                if (null === r)
                    return;
                var i = r.replace(a, "").trim();
                0 === r.indexOf(a) && "" !== i || !0 === (i = n(o, r)) && (i = r),
                i && (e.preventDefault(),
                avalon.router && avalon.router.navigate(i))
            }
        }
    })
}),
define("libs/oniui/mm_router/mm_router", ["libs/oniui/mm_router/mm_history"], function() {
    function Router() {
        var t = {};
        "get,post,delete,put".replace(avalon.rword, function(e) {
            t[e] = []
        }),
        this.routingTable = t
    }
    var m = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g;
    function quoteRegExp(e, t, n) {
        var o = e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
        if (!t)
            return o;
        var r = n ? "?" : "";
        return o + r + "(" + t + ")" + r
    }
    if (Router.prototype = {
        error: function(e) {
            this.errorback = e
        },
        _pathToRegExp: function(e, t) {
            for (var n, o, r, a, i = t.keys = [], l = "^", s = 0; n = m.exec(e); ) {
                o = n[2] || n[3],
                r = n[4] || ("*" == n[1] ? ".*" : "string"),
                a = e.substring(s, n.index);
                var c = this.$types[r]
                  , u = {
                    name: o
                };
                c && (r = c.pattern,
                u.decode = c.decode),
                i.push(u),
                l += quoteRegExp(a, r, !1),
                s = m.lastIndex
            }
            l += quoteRegExp(a = e.substring(s)) + (t.strict ? t.last : "/?") + "$";
            var d = "boolean" != typeof t.caseInsensitive || t.caseInsensitive;
            return t.regexp = new RegExp(l,d ? "i" : undefined),
            t
        },
        add: function(e, t, n, o) {
            var r = this.routingTable[e.toLowerCase()];
            if ("/" !== t.charAt(0))
                throw "path必须以/开头";
            (o = o || {}).callback = n,
            2 < t.length && "/" === t.charAt(t.length - 1) && (t = t.slice(0, -1),
            o.last = "/"),
            avalon.Array.ensure(r, this._pathToRegExp(t, o))
        },
        route: function(e, t, n) {
            t = t.trim();
            for (var o, r = this.routingTable[e], a = 0; o = r[a++]; ) {
                var i = t.match(o.regexp);
                if (i) {
                    o.query = n || {},
                    o.path = t,
                    o.params = {};
                    var l = o.keys;
                    return i.shift(),
                    l.length && this._parseArgs(i, o),
                    o.callback.apply(o, i)
                }
            }
            this.errorback && this.errorback()
        },
        _parseArgs: function(e, t) {
            for (var n = t.keys, o = 0, r = n.length; o < r; o++) {
                var a = n[o]
                  , i = e[o] || "";
                if ("function" == typeof a.decode)
                    var l = a.decode(i);
                else
                    try {
                        i.match(/^[0-9]{17,}$/g) || "9007199254740992" < i || (l = JSON.parse(i))
                    } catch (s) {
                        l = i
                    }
                e[o] = t.params[a.name] = l
            }
        },
        getLastPath: function() {
            return function getCookie(e) {
                var t = String(document.cookie).match(new RegExp("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)")) || ["", ""];
                return decodeURIComponent(t[1])
            }("msLastPath")
        },
        setLastPath: function(e) {
            !function setCookie(e, t) {
                var n = new Date;
                n.setTime(n.getTime() + 864e5),
                document.cookie = escapeCookie(e) + "=" + escapeCookie(t) + ";expires=" + n.toGMTString()
            }("msLastPath", e)
        },
        redirect: function(e) {
            this.navigate(e, {
                replace: !0
            })
        },
        navigate: function(e, t) {
            var n = function parseQuery(e) {
                var t = e.split("?")
                  , n = {}
                  , o = t[0]
                  , r = t[1];
                if (r)
                    for (var a, i = r.split("&"), l = i.length, s = 0; s < l; s++)
                        i[s] && (a = i[s].split("="),
                        n[decodeURIComponent(a[0])] = decodeURIComponent(a[1]));
                return {
                    path: o,
                    query: n
                }
            }(("/" !== e.charAt(0) ? "/" : "") + e);
            t = t || {};
            "/" === e.charAt(0) && (e = e.slice(1)),
            avalon.state && !t.silent || avalon.history && avalon.history.updateLocation(e, avalon.mix({}, t, {
                silent: !0
            })),
            t.silent || this.route("get", n.path, n.query, t)
        },
        when: function(e, n) {
            var o = this;
            e = e instanceof Array ? e : [e];
            return avalon.each(e, function(e, t) {
                o.add("get", t, function() {
                    var e = o.urlFormate(n, this.params, this.query);
                    o.navigate(e.path + e.query, {
                        replace: !0
                    })
                })
            }),
            this
        },
        get: function(e, t) {},
        urlFormate: function(e, n, t) {
            t = t ? function queryToString(e) {
                if ("string" == typeof e)
                    return e;
                var t = [];
                for (var n in e)
                    "query" != n && t.push(n + "=" + encodeURIComponent(e[n]));
                return t.length ? "?" + t.join("&") : ""
            }(t) : "";
            return {
                path: e.replace(m, function(e) {
                    var t = e.replace(/[\{\}]/g, "").split(":");
                    return (t = t[0] ? t[0] : t[1])in n ? n[t] : ""
                }).replace(/^\//g, ""),
                query: t
            }
        },
        $types: {
            date: {
                pattern: "[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])",
                decode: function(e) {
                    return new Date(e.replace(/\-/g, "/"))
                }
            },
            string: {
                pattern: "[^\\/]*"
            },
            bool: {
                decode: function(e) {
                    return 0 !== parseInt(e, 10)
                },
                pattern: "0|1"
            },
            "int": {
                decode: function(e) {
                    return parseInt(e, 10)
                },
                pattern: "\\d+"
            }
        }
    },
    "get,put,delete,post".replace(avalon.rword, function(o) {
        return Router.prototype[o] = function(e, t, n) {
            this.add(o, e, t, n)
        }
    }),
    function supportLocalStorage() {
        try {
            return localStorage.setItem("avalon", 1),
            localStorage.removeItem("avalon"),
            !0
        } catch (e) {
            return !1
        }
    }())
        try {
            var t;
            Router.prototype.getLastPath = function() {
                return localStorage.getItem("msLastPath")
            }
            ,
            Router.prototype.setLastPath = function(e) {
                t && (clearTimeout(t),
                t = null),
                localStorage.setItem("msLastPath", e),
                t = setTimeout(function() {
                    localStorage.removeItem("msLastPath")
                }, 864e5)
            }
        } catch (e) {
            SFLOG.debug("avalon", "supportLocalStorage error", "not support localStorage")
        }
    function escapeCookie(e) {
        return String(e).replace(/[,;"\\=\s%]/g, function(e) {
            return encodeURIComponent(e)
        })
    }
    avalon.router = new Router
}),
define("libs/oniui/mm_router/mm_state", ["libs/oniui/mm_router/mm_router"], function() {
    "use strict";
    avalon.router.route = function(e, t, n, o) {
        t = t.trim();
        for (var r, a = this.routingTable[e], i = 0; r = a[i++]; ) {
            var l = t.match(r.regexp);
            if (l && !0 !== r["abstract"]) {
                var s = {
                    params: {}
                };
                return avalon.mix(s.params, r.params),
                s.keys = r.keys,
                s.params.query = n || {},
                l.shift(),
                r.keys.length && this._parseArgs(l, s),
                void (r.stateName ? y.transitionTo(y.currentState, r, s.params, o) : r.callback.apply(r, l))
            }
        }
        this.errorback && this.errorback()
    }
    ;
    var w, b, n = {};
    avalon.router.go = function(e, t, n) {
        var o = y.currentState
          , r = StateModel.is(e) ? e : getStateByName(e);
        t = t || {},
        t = avalon.mix(!0, {}, r.params, t);
        r && y.transitionTo(o, r, t, n)
    }
    ;
    var o = window.$eventManager = avalon.define({
        $id: "$eventManager",
        $flag: 0,
        uiqKey: function() {
            return o.$flag++,
            "flag" + o.$flag++
        }
    });
    o.$watch("onAbort", function removeOld() {
        for (var e = y.oldNodes; e.length; ) {
            var t = e.length - 1
              , n = e[t];
            n.parentNode && n.parentNode.removeChild(n),
            e.splice(t, 1),
            n = null
        }
    });
    var y = window.mmState = {
        prevState: NaN,
        currentState: NaN,
        activeState: NaN,
        oldNodes: [],
        query: {},
        popOne: function(t, n, o, r) {
            if (y._toParams !== n)
                return o(!1, {
                    type: "abort"
                });
            var a = t.pop()
              , i = this;
            if (!a)
                return o();
            if (r && !1 === a.onBeforeExit())
                return o(!1);
            i.activeState = a.parentState || w,
            a.done = function(e) {
                return a._pending = !1,
                a.done = null,
                a._local = null,
                !1 !== e && i.activeState ? i.popOne(t, n, o, r) : o(e)
            }
            ;
            var e = a.onExit();
            !a._pending && a.done && a.done(e)
        },
        pushOne: function(t, n, o, r, e) {
            if (y._toParams !== n)
                return o(!1, {
                    type: "abort"
                });
            var a = t.shift()
              , i = this;
            if (!a)
                return t = null,
                o();
            if (a.syncParams(n),
            !1 === a.onBeforeEnter())
                return a.syncParams(a.oldParams),
                o(!1);
            r = inherit(r);
            (i.activeState = a).done = function(e) {
                if (a.done) {
                    if (a._pending = !1,
                    a.done = null,
                    !(a.visited = !0) === e)
                        return o(e);
                    a.callback.apply(a, [n, r]).$then(function(e) {
                        avalon.mix(!0, a.oldParams, a.params),
                        i.pushOne(t, n, o, r)
                    })
                }
            }
            ;
            var l = [];
            avalon.each(a.keys, function(e, t) {
                var n = t.name;
                l.push(a.params[n])
            }),
            a._onEnter.apply(a, l),
            !a._pending && a.done && a.done()
        },
        transitionTo: function(a, i, l, e) {
            var s;
            l = l || i.params;
            this.activeState && this.activeState != this.currentState && (avalon.log("navigating to [" + this.currentState.stateName + "] will be stopped, redirect to [" + i.stateName + "] now"),
            this.activeState.done && this.activeState.done(!1),
            a = this.activeState,
            s = !0),
            y.oldNodes = [];
            var c, u, d = avalon.router.urlFormate(i.url, l, l.query), m = this, h = (e = e || {}).reload, f = a && a.chain || [], p = i.chain, v = 0, g = p[v], _ = w.sourceLocal, b = [], t = [], r = {}, n = [].concat(f).concat(p);
            avalon.each(n, function(e, n) {
                var o = n.stateUrl;
                o && (n._stateUrl = o,
                delete n.stateUrl,
                o in r || (r[o] = "",
                t.push(getPromise(function(t, e) {
                    avalon.controller.loader(o, function(e) {
                        avalon.mix(n, e),
                        n.initViewsConfig(),
                        t()
                    })
                }))))
            }),
            n = r = null,
            getPromise(t).then(function() {
                if (!h)
                    for (; g && g === f[v] && !g.paramsChanged(l); )
                        _ = b[v] = g._local,
                        g = p[++v];
                for (var n = f.slice(v), o = p.slice(v), r = _; g = p[v]; )
                    _ = b[v] = inherit(_, g.sourceLocal),
                    v++;
                y._local = _;
                var t = function(e, t) {
                    if (!c) {
                        if (c = !0,
                        m.currentState = m.activeState,
                        o = n = r = _ = l = null,
                        !(y.oldNodes = []) === e)
                            return callStateFunc("onError", m, {
                                type: "transition",
                                message: "transitionTo " + i.stateName + " faild",
                                error: t,
                                fromState: a,
                                toState: i,
                                params: l
                            }, m.currentState);
                        y.lastLocal = y.currentState._local,
                        w.fire("updateview", m.currentState, u),
                        avalon.log("transitionTo " + i.stateName + " success"),
                        callStateFunc("onLoad", m, a, i)
                    }
                };
                return i.path = ("/" + d.path).replace(/^[\/]{2,}/g, "/"),
                h || a !== i || (u = i.paramsChanged(l)) ? (y.query = avalon.mix({}, l.query),
                !e || e.confirmed || !1 !== callStateFunc("onBeforeUnload", m, a, i) && !1 !== function broadCastBeforeUnload(e, t, n, o) {
                    var r = y.lastLocal;
                    if (!r || !t[0] && !e[0])
                        return;
                    var a = y._local
                      , i = [];
                    for (var l in r) {
                        var s = r[l];
                        if (!(l in a) || a[l] != s) {
                            if (s.$ctrl && "$onBeforeUnload"in s.$ctrl && !1 === s.$ctrl.$onBeforeUnload(n, o))
                                return !1;
                            s.element && e[0] != t[0] && i.push(s)
                        }
                    }
                    avalon.each(i, function(e, t) {
                        var n = t.element
                          , o = avalon(n).data("currentCache");
                        o && function setCache(e, t) {
                            var n, o = document.createDocumentFragment(), r = document.getElementById(e);
                            r || ((r = document.createElement("div")).id = e,
                            x.appendChild(r));
                            if (r.eles)
                                avalon.each(r.eles, function(e, t) {
                                    o.appendChild(t)
                                });
                            else {
                                for (r.eles = []; n = t.firstChild; )
                                    o.appendChild(n),
                                    r.eles.push(n);
                                C[e] = !0
                            }
                            r.appendChild(o)
                        }(o, n)
                    }),
                    i = null
                }(n, o, a, i) ? void (!0 !== c && (avalon.log("begin transitionTo " + i.stateName + " from " + (a && a.stateName || "unknown")),
                callStateFunc("onUnload", m, a, i),
                m.currentState = i,
                m.prevState = a,
                y._toParams = l,
                d && avalon.history && (avalon.history.updateLocation ? avalon.history.updateLocation(d.path + d.query, avalon.mix({
                    silent: !0
                }, e), !a && location.hash) : avalon.history.navigate(d.path + d.query, avalon.mix({
                    silent: !0
                }, e))),
                callStateFunc("onBegin", m, a, i),
                m.popOne(n, l, function(e) {
                    if (!1 === e)
                        return t(e);
                    m.pushOne(o, l, t, r, b)
                }, !(e && e.confirmed)))) : callStateFunc("onAbort", m, a, i)) : i == m.activeState && s ? t() : void 0
            }, function() {
                throw new Error("加载stateUrl资源失败")
            })
        }
    };
    var C = {}
      , x = function getCacheContainer() {
        return document.getElementsByTagName("avalon")[0]
    }();
    function inherit(e, t) {
        return avalon.mix(new (avalon.mix(function() {}, {
            prototype: e
        })), t)
    }
    function promiseError(e) {
        if (function isError(e) {
            return e instanceof Error
        }(e))
            throw e;
        callStateFunc("onError", y, e, e && e.state)
    }
    function getPromise(e) {
        return avalon.isFunction(e) ? new Promise(e) : Promise.all(e)
    }
    function callStateFunc(e, t) {
        return o.$fire.apply(o, arguments),
        avalon.state[e] ? avalon.state[e].apply(t || y.currentState, [].slice.call(arguments, 2)) : 0
    }
    function StateModel(e, t) {
        if (!(this instanceof StateModel))
            return n[e] = new StateModel(e,t || {});
        this.stateName = e,
        this.formate(t)
    }
    function _controller() {
        if (!(this instanceof _controller))
            return new _controller;
        this.$vmodels = []
    }
    function getStateByName(e) {
        return n[e]
    }
    avalon.bindingHandlers.view = function(u) {
        u.expr = "'" + (u.expr || "") + "'";
        var d = u.vmodels || arguments[1]
          , m = (y.currentState,
        u.element)
          , h = avalon(m)
          , f = (u.value || u.expr || "").replace(/['"]+/g, "")
          , p = document.createComment("ms-view:" + f)
          , v = m.parentNode
          , g = m.innerHTML
          , _ = (getStateByName(h.data("statename") || ""),
        {});
        m.outerHTML;
        function update(e, t, n) {
            if (!document.contains(p))
                return u = d = m = v = p = h = update = null,
                !1;
            var o, r = getStateByName(h.data("statename") || "") || w;
            if (f.indexOf("@") < 0 && (f += "@" + r.stateName),
            o = y.currentState._local && y.currentState._local[f],
            (!e || o) && _ !== o) {
                var a = (_ = o) && o.state
                  , i = h.data("viewCache")
                  , l = h.data("currentCache");
                if (o ? i = !1 !== o.viewCache && (o.viewCache || i) && f + "@" + (a && a.stateName || "") : i && (i = f + "@__default__"),
                !(o && a === t && o.ignoreChange && o.ignoreChange(n, f) || i && i === l)) {
                    !function compileNode(e, t, n, o) {
                        if (n.hasClass("oni-mmRouter-slide")) {
                            var r = t.cloneNode(!0);
                            r.setAttribute("ms-skip", "true"),
                            avalon(r).removeClass("oni-mmRouter-enter").addClass("oni-mmRouter-leave"),
                            avalon(t).addClass("oni-mmRouter-enter"),
                            t.parentNode.insertBefore(r, t),
                            y.oldNodes.push(r),
                            callStateFunc("onViewEnter", o, t, r)
                        }
                        return t
                    }(0, m, h, a);
                    var s, c = o ? o.template : g;
                    if (i && (o ? o.element = m : y.currentState._local[f] = {
                        state: y.currentState,
                        template: g,
                        element: m
                    }),
                    avalon.clearHTML(m),
                    m.removeAttribute("ms-view"),
                    m.setAttribute("ui-view", u.value || u.expr || ""),
                    i) {
                        if (s = C[i] ? function loadCache(e) {
                            var t, n = document.createDocumentFragment(), o = document.getElementById(e), r = o.eles, a = 0;
                            if (o)
                                for (; t = r[a]; )
                                    n.appendChild(t),
                                    a++;
                            return n
                        }(i) : avalon.parseHTML(c),
                        m.appendChild(s),
                        h.data("currentCache", i),
                        C[i])
                            return
                    } else
                        m.innerHTML = c,
                        h.data("currentCache", !1);
                    !o && i && h.data("currentCache", i),
                    avalon.each(function getViewNodes(e, t) {
                        var n, t = t || "ms-view";
                        n = e.querySelectorAll ? e.querySelectorAll("[" + t + "]") : Array.prototype.filter.call(e.getElementsByTagName("*"), function(e) {
                            return "string" == typeof e.getAttribute(t)
                        });
                        return n
                    }(m), function(e, t) {
                        avalon(t).data("statename", a && a.stateName || "")
                    }),
                    avalon.scan(m, (o && o.vmodels || []).concat(d || [])),
                    o && o.$ctrl && o.$ctrl.$onRendered && o.$ctrl.$onRendered.apply(m, [o])
                }
            }
        }
        m.removeAttribute("ms-view"),
        v.insertBefore(p, m),
        update("firsttime"),
        w.watch("updateview", function(e, t) {
            return update.call(this, b, e, t)
        })
    }
    ,
    avalon.directives && avalon.directive("view", {
        init: avalon.bindingHandlers.view
    }),
    avalon.state = function(e, t) {
        var p = StateModel(e, t);
        return avalon._STATE_MAP || (avalon._STATE_MAP = {}),
        avalon._STATE_MAP[e] = !0,
        avalon.router.get(p.url, function(e, u) {
            var n, d = this, m = [], h = [], f = [];
            return p.resolved = getPromise(function(e, t) {
                n = e,
                t
            }),
            avalon.each(p.views, function(e, o) {
                var a = d.params
                  , r = {
                    type: "view",
                    name: e,
                    params: a,
                    state: p,
                    view: o
                }
                  , t = u[e] = {
                    name: e,
                    state: p,
                    params: p.filterParams(a),
                    ignoreChange: "ignoreChange"in o ? o.ignoreChange : d.ignoreChange,
                    viewCache: "viewCache"in o ? o.viewCache : d.viewCache
                }
                  , i = function fromPromise(e, t, n) {
                    return e.template ? function fromString(o, r, a) {
                        return getPromise(function(e, t) {
                            var n = "function" == typeof o ? o(r) : o;
                            "string" == typeof n ? e(n) : (a.message = "template必须对应一个字符串或一个返回字符串的函数",
                            t(a))
                        })
                    }(e.template, t, n) : e.templateUrl ? function fromUrl(n, o, r) {
                        return getPromise(function(e, t) {
                            return "function" == typeof n && (n = n(o)),
                            "string" != typeof n ? (r.message = "templateUrl必须对应一个URL",
                            t(r)) : avalon.templateCache[n] ? e(avalon.templateCache[n]) : void avalon.state.templateLoader(n, e, t, r)
                        })
                    }(e.templateUrl, t, n) : e.templateProvider ? function fromProvider(o, r, a) {
                        return getPromise(function(e, t) {
                            if ("function" == typeof o) {
                                var n = o(r);
                                n && n.then || "string" == typeof n ? e(n) : (a.message = "templateProvider为函数时应该返回一个Promise或thenable对象或字符串",
                                t(a))
                            } else
                                o && o.then ? e(o) : (a.message = "templateProvider不为函数时应该对应一个Promise或thenable对象",
                                t(a))
                        })
                    }(e.templateProvider, t, n) : getPromise(function(e, t) {
                        n.message = "必须存在template, templateUrl, templateProvider中的一个",
                        t(n)
                    })
                }(o, a, r);
                m.push(i),
                i.then(function(e) {
                    t.template = e
                }, avalon.noop);
                var n, l = function(e) {
                    t.vmodels = e.$vmodels,
                    o.$controller = t.$ctrl = e,
                    s()
                }, s = function() {
                    var r = o.$controller && o.$controller.$onEnter;
                    if (r) {
                        var e = getPromise(function(e, t) {
                            var n = {
                                type: "data",
                                state: p,
                                params: a
                            }
                              , o = r(a, e, function(e) {
                                n.message = e,
                                t(n)
                            });
                            o && o.then ? (h.push(o),
                            o.then(function() {
                                e(o)
                            })) : o && !0 !== o ? (n.message = o,
                            t(n)) : o === b && e()
                        });
                        e = e.then(function(e) {
                            avalon.isFunction(e) && f.push(e)
                        }),
                        h.push(e)
                    }
                };
                if (o.$controller && !1 !== o.cacheController)
                    return l(o.$controller);
                if (o.controller)
                    n = i.then(function() {
                        l(avalon.controller(o.controller))
                    });
                else if (o.controllerUrl)
                    n = getPromise(function(t, e) {
                        var n = avalon.isFunction(o.controllerUrl) ? o.controllerUrl(a) : o.controllerUrl;
                        n = n instanceof Array ? n : [n],
                        avalon.controller.loader(n, function(e) {
                            i.then(function() {
                                l(e),
                                t()
                            })
                        })
                    });
                else if (o.controllerProvider) {
                    var c = avalon.isFunction(o.controllerProvider) ? o.controllerProvider(a) : o.controllerProvider;
                    n = getPromise(function(t, n) {
                        c && c.then ? (h.push(c),
                        c.then(function(e) {
                            i.then(function() {
                                l(e),
                                t()
                            })
                        }, function(e) {
                            r.message = e,
                            n(r)
                        })) : i.then(function() {
                            l(c),
                            t()
                        })
                    })
                }
                n && n.then && m.push(n)
            }),
            getPromise(m).$then(function(e) {
                p._local = u,
                getPromise(h).$then(function() {
                    avalon.each(f, function(e, t) {
                        t()
                    }),
                    m = h = f = null,
                    n()
                })
            }),
            p.resolved
        }, p),
        this
    }
    ,
    Promise.prototype.$then = function(e, t) {
        var n = this.then(e, t);
        return n["catch"](promiseError),
        n
    }
    ,
    avalon.state.onViewEntered = function(e, t) {
        e != t && t.parentNode.removeChild(t)
    }
    ,
    avalon.state.config = function(e) {
        return avalon.mix(avalon.state, e || {}),
        avalon
    }
    ,
    StateModel.is = function(e) {
        return e instanceof StateModel
    }
    ,
    StateModel.prototype = {
        formate: function(e) {
            avalon.mix(!0, this, e);
            var t = this.stateName
              , r = this
              , a = t.split(".")
              , i = a.length - 1;
            this.chain = [],
            avalon.each(a, function(e, t) {
                if (e == i)
                    r.chain.push(r);
                else {
                    var n = a.slice(0, e + 1).join(".")
                      , o = getStateByName(n);
                    if (!o)
                        throw new Error("必须先定义" + n);
                    r.chain.push(o)
                }
            }),
            void 0 === this.url && (this["abstract"] = !0);
            var n = this.chain[i - 1] || w;
            n && (this.url = n.url + (this.url || ""),
            this.parentState = n),
            this.stateUrl || this.initViewsConfig(),
            this._self = e,
            this._pending = !1,
            this.visited = !1,
            this.params = inherit(n && n.params || {}),
            this.oldParams = {},
            this.keys = [],
            this.events = {}
        },
        initViewsConfig: function() {
            var t = this
              , o = this.sourceLocal = {}
              , e = this.statename
              , r = this.parentState;
            if (!this.views && "" != e) {
                var n = {};
                "template,templateUrl,templateProvider,controller,controllerUrl,controllerProvider,viewCache".replace(/\w+/g, function(e) {
                    !function copyTemplateProperty(e, t, n) {
                        n in t && (e[n] = t[n],
                        delete t[n])
                    }(n, t, e)
                });
                var a = "viewname"in this ? this.viewname : "";
                this.views = {},
                this.views[a] = n
            }
            var i = {}
              , l = this.views instanceof Array;
            avalon.each(this.views, function(e, t) {
                var n = l ? t.name || "" : e;
                n.indexOf("@") < 0 && (n += "@" + (r && r.stateName || "")),
                i[n] = t,
                o[n] = {}
            }),
            this.views = i
        },
        watch: function(e, t) {
            var n = this.events[e] || [];
            return (this.events[e] = n).push(t),
            t
        },
        fire: function(e, t) {
            for (var n = this.events[e] || [], o = 0; n[o]; ) {
                !1 === n[o].apply(this, [].slice.call(arguments, 1)) ? n.splice(o, 1) : o++
            }
        },
        unwatch: function(e, t) {
            var n = this.events[e];
            if (n)
                for (var o = 0; n[o]; ) {
                    if (n[o] == t)
                        return n.splice(o, 1);
                    o++
                }
        },
        paramsChanged: function(o) {
            var r = !1
              , e = this.keys
              , a = this.params;
            return avalon.each(e, function(e, t) {
                var n = t.name;
                a[n] != o[n] && (r = "param")
            }),
            r || y.currentState !== this || (r = !function objectCompare(e, t) {
                if (!e || !t)
                    return !1;
                for (var n in e)
                    if (!(n in t) || e[n] !== t[n])
                        return !1;
                for (var n in t)
                    if (!(n in e) || e[n] !== t[n])
                        return !1;
                return !0
            }(o.query, y.query) && "query"),
            r
        },
        filterParams: function(n) {
            var o = avalon.mix(!0, {}, this.params)
              , e = this.keys;
            return avalon.each(e, function(e, t) {
                o[t.name] = n[t.name]
            }),
            o
        },
        syncParams: function(o) {
            var r = this;
            avalon.each(this.keys, function(e, t) {
                var n = t.name;
                n in o && (r.params[n] = o[n])
            })
        },
        _onEnter: function() {
            this.query = this.getQuery();
            var i = this
              , l = Array.prototype.slice.call(arguments)
              , s = i._async();
            getPromise(function(e, t) {
                var n = {
                    type: "data",
                    state: i,
                    params: i.params
                }
                  , o = function(e) {
                    n.message = e,
                    s.apply(i, [!1]),
                    t(n)
                }
                  , r = function() {
                    s.apply(i),
                    e()
                }
                  , a = i.onEnter.apply(i, l.concat([r, o]));
                a && a.then ? a.then(r)["catch"](promiseError) : a && !0 !== a ? o(a) : a === b && r()
            })
        },
        getQuery: function() {
            return y.query
        },
        getParams: function() {
            return this.params
        },
        _async: function() {
            return this.done && (this._pending = !0),
            this.done || avalon.noop
        },
        onBeforeEnter: avalon.noop,
        onEnter: avalon.noop,
        onBeforeExit: avalon.noop,
        onExit: avalon.noop
    },
    w = StateModel("", {
        url: "",
        views: null,
        "abstract": !0
    }),
    avalon.controller = function() {
        var n = arguments[0]
          , e = arguments[1];
        if (n && n instanceof _controller)
            return n;
        var o = _controller();
        if (avalon.isFunction(n))
            n(o);
        else if (avalon.isFunction(e))
            o.name = n,
            e(o);
        else {
            if ("string" != typeof n && "object" != typeof n)
                throw new Error("参数错误" + arguments);
            n = n instanceof Array ? n : Array.prototype.slice.call(arguments),
            avalon.each(n, function(e, t) {
                "string" == typeof t && (n[e] = avalon.vmodels[t]),
                "$onRendered"in (t = n[e]) && (o.$onRendered = t.$onRendered),
                "$onEnter"in t && (o.$onEnter = t.$onEnter)
            }),
            o.$vmodels = n
        }
        return o
    }
    ,
    avalon.controller.loader = function(e, t) {
        function wrapper(e) {
            t && t(e)
        }
        if (e = e instanceof Array ? e : [e],
        window.requirejs)
            requirejs(e, wrapper);
        else if ("function" == typeof require && require.ensure)
            require.ensure(e, wrapper);
        else {
            if (!avalon.require)
                throw Error('未能找有效的模块加载器异步加载"' + e + '"，请参照mmState.js的avalon.controller.loader源码进行修改');
            avalon.require(e, wrapper)
        }
    }
    ,
    _controller.prototype = {};
    avalon.state.templateLoader = function(t, n, o, r) {
        var a = new (window.XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
        a.onreadystatechange = function() {
            if (4 === a.readyState) {
                var e = a.status;
                399 < e && e < 600 ? (r.message = "templateUrl对应资源不存在或没有开启 CORS",
                r.status = e,
                r.xhr = a,
                o(r)) : n(avalon.templateCache[t] = a.responseText)
            }
        }
        ,
        a.open("GET", t, !0),
        "withCredentials"in a && (a.withCredentials = !0),
        a.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        a.send()
    }
}),
define("libs/oniui/index", ["libs/oniui/mm_router/mm_state"], function() {}),
define("common/require_error_handler", [], function() {
    "use strict";
    var r = []
      , a = []
      , i = SFCommon
      , l = SFLOG
      , s = "common:require_error_handler";
    return requirejs.onError = function(e) {
        // var t, n, o;
        // for (t = r.length - 1; 0 <= t; t--)
        //     o = (n = r[t])(e),
        //     -1 !== a.indexOf(n) && r.splice(t, 1);
        // a = [],
        // l.error(s, "loader file error!", e),
        // o || i.onError({
        //     isReload: !0,
        //     closeBtn: !1
        // })
    }
    ,
    {
        listener: function listener(e) {
            "function" != typeof e && l.error(s, "Set listener failed", "callback must be a function!"),
            -1 === r.indexOf(e) && r.push(e)
        },
        listenerOnce: function listenerOnce(e) {
            "function" != typeof e && l.error(s, "Set one-off listener failed", "callback must be a function!"),
            -1 === r.indexOf(e) && (r.push(e),
            a.push(e))
        },
        remove: function remove(e) {
            var t;
            "function" != typeof e && l.error(s, "remove error listener error", "callback must be a function!"),
            -1 !== (t = r.indexOf(e)) && r.splice(t, 1)
        }
    }
}),
define("common/i18n", [], function() {
    "use strict";
    SFConfig;
    var r = SFLOG
      , a = "jsdk:common";
    function changeLang(e, t, n) {
        e && e.$fire("all!all:i18n:change"),
        t && t(n)
    }
    return {
        change: function change(e, t, n) {
            SF.init.getLanguageFile({
                lang: t,
                success: function() {
                    e.$fire("all!all:i18n:change", e.$id),
                    n && n()
                }
            })
        },
        getCurLang: function getCurLang(n, o) {
            SF.init.getLang({
                success: function(e) {
                    var t;
                    e ? (t = SFConfig.LANGUAGE_LIST[e.data],
                    is.empty(t) ? (window.LANG = {},
                    changeLang(n, o, e.data)) : require(["../../i18n/" + t + "?cache=" + (new Date).getTime()], function() {
                        changeLang(n, o, e.data)
                    })) : r.debug(a, "get lang result is null or undefined")
                },
                error: function(e) {
                    r.debug(a, "getCurLang is error, error message is " + JSON.stringify(e))
                }
            })
        }
    }
}),
define("common/loader", ["common/require_error_handler"], function(v) {
    "use strict";
    var e, g = {}, _ = SFLOG, n = SFCommon, b = "common:loader", w = {}, r = window.themePathConfig || {};
    function getThemePathURL(e, t, n) {
        var o = r[e];
        return o && o[t] ? "theme/" + o[t] : "login" !== e && "service" !== e || "html" !== t ? !!n && n + "/" + e + "." + t : "theme/" + e + ".html"
    }
    function getFileName(e) {
        var t;
        return e ? (t = e.lastIndexOf("/"),
        e.substr(t + 1)) : e
    }
    function getDepend(e) {
        var t, n = e.name, o = "libs/text!", r = e.isReload ? "?rd" + (new Date).getTime() : "", a = getFileName(n), i = e.isLocal, l = getThemePathURL(a, "js", n) + r, s = o + getThemePathURL(a, "html", n), c = getThemePathURL(a, "css");
        return i ? t = ["local/" + a + "/" + a, "libs/text!local/" + a + "/" + a + ".html"] : (t = [l, s],
        c && !w[a] && t.push(o + c)),
        t
    }
    function switchController(e, n) {
        avalon.each(function elementChildren(e) {
            for (var t = e.childNodes, n = [], o = t.length; o--; )
                1 === t[o].nodeType && n.unshift(t[o]);
            return n
        }(e), function(e, t) {
            t.id === n ? t.style.display = "" : t.style.display = "none"
        })
    }
    function renderPlugin(i) {
        var l, s = getFileName(i.name), c = i.name, e = function getPortalMapKey(e) {
            var t;
            for (t in PORTAL_MAP)
                if (PORTAL_MAP.hasOwnProperty(t) && 0 <= t.indexOf("/") && PORTAL_MAP[t] === e)
                    return t;
            return ""
        }(i.name), t = getDepend(i), u = i.containerID, d = is.fn(i.onAfter) ? i.onAfter : function() {}
        , m = i.success || function() {}
        , h = avalon.isFunction(i.error) ? i.error : function() {
            return n.onError({
                isReload: !0,
                closeBtn: !1
            }),
            i.name && (g[i.name] = null),
            i.depends && i.depends.forEach(function(e) {
                require.undef(e)
            }),
            d(),
            !0
        }
        , f = avalon.mix({
            mapKey: e
        }, i.data), p = u + "_" + s;
        if (is.fn(i.onBefore) && i.onBefore(),
        u || !g[i.name] || i.isReload) {
            if (u)
                if (l = document.getElementById(u)) {
                    if (document.getElementById(p))
                        return switchController(l, p),
                        avalon.vmodels[s] ? avalon.isFunction(avalon.vmodels[s].$onRendered) && avalon.vmodels[s].$onRendered(f) : _.error(b, "Something wrong in rendering plugin", "%s was not found on avalon.vmodels", s),
                        d(),
                        void m()
                } else
                    d(),
                    _.error(b, "Something wrong in rendering plugin", "%s not found", u);
            g[i.name] && !i.isReload || (v.listenerOnce(h),
            i.isReload && (c += (new Date).getTime()),
            g[c] = !0,
            i.isLocal && require.config({
                baseUrl: "../../"
            }),
            require(t, function(e, t, n) {
                var o, r, a;
                e && t && (v.remove(h),
                is.object(e) && is.object(e.vmodel) || _.error(b, "Something wrong in rendering page", "[module] is not defined or  [module.vmodel] is not an object"),
                avalon.isFunction(e._loaderTplPretreatment) && (t = e._loaderTplPretreatment(t, f) || ""),
                (a = e.vmodel).$onEnter && a.$onEnter(f),
                n && (t = "<style>" + n + "</style>" + t,
                w[getFileName(i.name)] = !0),
                u ? ((r = document.createElement("div")).id = p,
                l.appendChild(r),
                r.innerHTML = '<div ms-widget="loaderhook" data-loaderhook-controller="' + s + '"></div>' + t,
                avalon.scan(r, a),
                switchController(l, p)) : ((o = document.createElement("div")).innerHTML = '<div ms-widget="loaderhook" data-loaderhook-controller="' + s + '"></div>' + t,
                document.body.appendChild(o),
                avalon.scan(o, a)),
                d(),
                a.$onRendered && a.$onRendered(f),
                g[c] = !0,
                m())
            }))
        } else
            d(),
            avalon.vmodels[s] ? (avalon.isFunction(avalon.vmodels[s].$onRendered) && avalon.vmodels[s].$onRendered(f),
            m()) : _.error(b, "Something wrong in rendering plugin", "%s was not found on avalon.vmodels", s)
    }
    return n.onError = function(e) {
        var t, n;
        if (e = e || {},
        "file:" === location.protocol)
            return _.warn(b, "Common error not support local file protocol", "Network error"),
            !1;
        t = PORTAL_MAP["other/message"],
        w[getFileName(t)] = !1,
        n = e.isReload ? {
            title: tr("加载失败"),
            subTitle: tr("网络请求失败, 请稍后刷新重试"),
            btnText: tr("刷新"),
            clickAction: function(e) {
                location.reload()
            }
        } : {
            title: tr("加载失败"),
            subTitle: tr("网络请求失败, 请稍后重试"),
            btnText: tr("确定"),
            clickAction: function(e) {
                return new Promise(function(e) {
                    e()
                }
                )
            }
        },
        renderPlugin({
            name: t,
            data: {
                isDialog: !is.set(e.isDialog) || e.isDialog,
                title: e.title ? e.title : n.title,
                subtitle: e.subTitle ? e.subTitle : n.subTitle,
                btnText: e.btnText ? e.btnText : n.btnText,
                closeBtn: !!e.closeBtn && e.closeBtn,
                fireEvent: !is.set(e.fireEvent) || e.fireEvent,
                clickAction: e.clickAction ? e.clickAction : n.clickAction
            },
            error: function() {
                return _.error(b, "Load common error message dialog error", "Network error"),
                !0
            }
        })
    }
    ,
    n.onError({
        isDialog: !1
    }),
    function loadTestFile() {
        if (!SF.setting.getGlobal(KEY_GLOBAL_AUTO_TEST, 0))
            return;
        e = "file:" === location.protocol ? "../../libs/" : "./libs/";
        require.config({
            enforceDefine: !1
        }),
        require([e + "auto.js", e + "jquery.js"])
    }(),
    {
        renderPlugin: renderPlugin,
        renderPage: function renderPage(o) {
            var r = getFileName(o.name)
              , e = getDepend(o)
              , a = o.success || function() {}
              , i = avalon.isFunction(o.error) ? o.error : function() {}
            ;
            avalon._STATE_MAP[r] || g[r] ? (avalon.router.go(r),
            a()) : (v.listenerOnce(i),
            e.forEach(function(e) {
                require.undef(e)
            }),
            require(e, function(e, t) {
                var n;
                is.object(e) && is.object(e.vmodel) || _.error(b, "Something wrong in rendering page", "[module] is not defined or  [module.vmodel] is not an object"),
                n = e.vmodel,
                !g[o.name] && e && t && (v.remove(i),
                avalon.state(r, {
                    url: "/" + r,
                    views: {
                        "main@": {
                            template: t,
                            controller: n
                        }
                    },
                    ignoreChange: function(e, t) {
                        var n = !1;
                        return "query" === e && (n = !0),
                        n
                    }
                }),
                avalon.router.go(r),
                g[o.name] = n,
                a())
            }))
        },
        getFileName: getFileName
    }
}),
define("common/validate", [], function() {
    "use strict";
    var a = {
        storePathEmpty: tr("存储路径输入不能为空"),
        storePathFormat: tr('存储路径输入格式不正确或包含不允许输入*?",<>|等特殊字符'),
        storePathSize: tr("存储路径不能超过130字符,中文占3个字符"),
        cacheEmpty: tr("缓存大小输入不能为空"),
        cacheSize: tr("缓存大小设置为512 - 4096的整数"),
        overTimeSize: tr("过期时间为1-180之间的整数"),
        discriptSize: tr("描述的长度最长不能超过48位,中文不超过24个!"),
        PwdSise: tr("密码的长度最长不能超过48个字符"),
        phoneNumberSize: tr("手机号码总长度不能超过30个字符！"),
        phoneNumberFormat: tr("手机号码格式错误，格式为：“13800000000”或“86-13800000000”，多个号码请用“;”分号分隔"),
        pinSize: tr("PIN码长度必须是6-16位"),
        pinFormat: tr("PIN码不能包含空格、逗号、分号、双引号、加号、制表符"),
        pinIconformity: tr("两次输入的PIN码不一致,请确认!"),
        pinNewOld: tr("新PIN码和旧PIN码一致,请确认!")
    };
    function mbStringLength(e) {
        var t, n, o = 0;
        for (t = 0; t < e.length; t++)
            (n = e.charCodeAt(t)) < 127 ? o += 1 : 128 <= n && n <= 2047 ? o += 2 : 2048 <= n && n <= 65535 && (o += 3);
        return o
    }
    function isInt(e) {
        return /^(0|[1-9][0-9]*)$/.test(e)
    }
    function checkPhone(e) {
        var t, n = !0, o = /^((\(\d{1,9}\))|(\+\d{1,9})|(\d{1,9}\-))?\d{6,20}$/, r = e.split(";"), a = r.length;
        for (t = 0; t < a; t++)
            r[t].match(o) || (n = !1);
        return {
            state: n,
            msg: ""
        }
    }
    return {
        TIPS: a,
        checkpin: function checkpin(e, t, n) {
            mbStringLength(e);
            var o, r = !1;
            return (strLen < 4 || 16 < strLen) && (r = !0,
            o = a.pinSize),
            0 <= e.search(/[ ,;\"\t\v\+]/i) && (r = !0,
            o = a.pinFormat),
            e !== t && (r = !0,
            o = a.pinIconformity),
            n === e && (r = !0,
            o = a.pinNewOl),
            {
                state: r,
                msg: o
            }
        },
        onChgTel: function onChgTel(e) {
            var t, n = !1;
            return 30 < e.length && (n = !0,
            t = a.phoneNumberSize),
            checkPhone(e).state || (n = !0,
            t = a.phoneNumberFormat),
            {
                state: n,
                msg: t
            }
        },
        onChgNote: function onChgNote(e) {
            var t = !1;
            return 48 < e.replace(/[^\x00-\xff]/g, "**").length && (t = !0),
            {
                state: t,
                msg: a.discriptSize
            }
        },
        overTime: function overTime(e) {
            var t = !1;
            return (!e || !isInt(e) || parseInt(e, 10) < 1 || 180 < parseInt(e, 10)) && (t = !0),
            {
                state: t,
                msg: a.overTimeSize
            }
        },
        cacheSetting: function cacheSetting(e) {
            var t, n = !1;
            return "" !== e && null !== e || (n = !0,
            t = a.cacheEmpty),
            (!isInt(e) || parseInt(e, 10) < 512 || 4096 < parseInt(e, 10)) && (n = !0,
            t = a.cacheSize),
            {
                state: n,
                msg: t
            }
        },
        storePath: function storePath(e) {
            var t, n = !1;
            return "" !== e && null !== e || (n = !(e = ""),
            t = a.storePathEmpty),
            !function routeMatch(e) {
                return null !== e.match(/[\*\?\"\,<>\|]/)
            }(e) && function diskMatch(e) {
                return null !== e.match(/^([A-Za-z]\:[\\\/]){1}/)
            }(e) || (n = !0,
            t = a.storePathFormat),
            130 < mbStringLength(e) && (n = !0,
            t = a.storePathSize),
            {
                state: n,
                msg: t
            }
        },
        changePwd: function changePwd(e) {
            var t = !1;
            return 48 < e.replace(/[^\x00-\xff]/g, "**").length && (t = !0),
            {
                state: t,
                msg: a.PwdSise
            }
        },
        checkPhone: checkPhone,
        isMeetLength: function isMeetLength(e, t) {
            var n = (e || "").replace(/\s/g, "")
              , o = parseInt(t || 48, 0);
            return !!n && (/^\+?[1-9][0-9]*$/.test(o) || (o = 48),
            n.replace(/[\u4e00-\u9fa5]/g, "aa").length < o)
        },
        mbStringLength: mbStringLength
    }
}),
    alert(111)
define("common/utils", [], function() {
    "use strict";
    var e = SFConfig.container === SFConfig.CLIENT_TYPE.WEB
      , t = !e
      , n = (is.Win(),
    is.Linux,
    is.Mac,
    SFConfig.container === SFConfig.CLIENT_TYPE.LINUX)
      , o = SFConfig.container === SFConfig.CLIENT_TYPE.WINDOWS
      , r = SFConfig.container === SFConfig.CLIENT_TYPE.MAC
      , a = is.NeokylinClient
      , i = is.UbuntuClient;
    SFLOG;
    function isNeedZero(e) {
        return e < 10 ? "0" + e : e
    }
    return {
        getElementsByClassName: function getElementsByClassName(e, t) {
            var n, o, r;
            if ((t = t || document).getElementsByClassName)
                n = t.getElementsByClassName(e);
            else
                for (n = [],
                o = t.getElementsByTagName("*"),
                r = 0; r < o.length; r++)
                    -1 !== o[r].className.indexOf(e) && n.push(o[r]);
            return n
        },
        moduleAddEvent: function moduleAddEvent(n, e) {
            var t, o, r;
            for (t = ["Click", "Change", "Focus", "Blur", "Dblclick", "Mouseout", "Mouseover", "Mousemove", "Mouseenter", "Mouseleave", "Mouseup", "Mousedown", "Keypress", "Keyup", "Keydown", "Keyup", "Scroll", "Animation"],
            r = 0; r < t.length; r++)
                n["on" + (o = t[r])] && function(t) {
                    e["on" + t] = function(e) {
                        (e = e || window.event).target || (e.target = e.srcElement),
                        n["_" + t](e)
                    }
                }(o.toLocaleLowerCase())
        },
        addEvent: function addEvent(t, e, n) {
            t.attachEvent ? t.attachEvent("on" + e, function(e) {
                e = e || window.event,
                n.call(e, t)
            }) : t.addEventListener(e, function(e) {
                n.call(e)
            }, !1)
        },
        removeEvent: function removeEvent(e, t, n) {
            (e = e.constructor === String ? document.getElementById(e) : e).detachEvent ? (e.detachEvent("on" + t, e[t + n]),
            e[t + n] = null) : e.removeEventListener(t, n, !1)
        },
        screen: function screen() {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                scrollTop: document.documentElement.scrollTop || document.body.scrollTop
            }
        },
        getNextElement: function getNextElement(e) {
            var t;
            if (e.nextElementSibling)
                t = e.nextElementSibling;
            else
                for (t = e.nextSibling; t && 1 !== t.nodeType; )
                    t = t.nextSibling;
            return t
        },
        getPrevElement: function getPrevElement(e) {
            var t;
            if (e.previousElementSibling)
                t = e.previousElementSibling;
            else
                for (t = e.previousSibling; t && 1 !== t.nodeType; )
                    t = t.previousSibling;
            return t
        },
        open: function open(e) {
            e && window.open(e)
        },
        browser: function browser() {
            var e = navigator.userAgent;
            return {
                trident: -1 < e.indexOf("Trident"),
                presto: -1 < e.indexOf("Presto"),
                webKit: -1 < e.indexOf("AppleWebKit"),
                gecko: -1 < e.indexOf("Gecko") && -1 === e.indexOf("KHTML"),
                mobile: !(!e.match(/(iPhone\sOS)\s([\d_]+)/) && !e.match(/(Android)\s+([\d.]+)/)),
                ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: -1 < e.indexOf("Android") || -1 < e.indexOf("Linux"),
                iPhone: -1 < e.indexOf("iPhone"),
                iPad: -1 < e.indexOf("iPad"),
                webApp: -1 === e.indexOf("Safari")
            }
        },
        location: function location(e) {
            e && (window.location.href = e)
        },
        isExistFile: function isExistFile(e, t, n) {
            var o, r = document.head || document.getElementsByTagName("head")[0], a = document.createElement("link");
            a.href = e,
            a.rel = "stylesheet",
            r.appendChild(a),
            a.onload = function() {
                r.removeChild(a),
                t(!0),
                o = !0
            }
            ,
            a.onerror = function() {
                t(!1),
                o = !1
            }
            ,
            is.number(n) && setTimeout(function() {
                is.bool(o) || (SFLOG.info("common:utils", "isExistFile timeout. auto remove load file. url is:" + e),
                r.removeChild(a),
                t(!1))
            }, n)
        },
        isWeb: e,
        isClient: t,
        isWinClient: o,
        isMacClient: r,
        isLinuxClient: n,
        isNeokylinClient: a,
        isUbuntuClient: i,
        getTitle: function getTitle(e) {
            var t = "EasyConnect";
            return a ? t : ("欢迎访问" === e ? tr("欢迎访问") : e) || t
        },
        getStyle: function getStyle(e, t) {
            var n;
            return n = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle,
            t && (n = window.getComputedStyle(e)[t]),
            n
        },
        getStrInfo: function getStrInfo(e, t) {
            var n, o = 0;
            if ("string" != typeof e)
                return 0;
            for (n = 0; n < e.length; n++)
                if (null !== e.charAt(n).match(/[^\x00-\xff]/gi) ? o += 2 : o += 1,
                t && t <= o)
                    return e.substr(0, n + 1);
            return o
        },
        format: function format(e) {
            var t = (e = new Date(parseInt(e, 10))).getFullYear()
              , n = e.getMonth() + 1
              , o = e.getDate()
              , r = e.getHours()
              , a = e.getMinutes()
              , i = e.getSeconds();
            return t + "-" + isNeedZero(n) + "-" + isNeedZero(o) + " " + isNeedZero(r) + ":" + isNeedZero(a) + ":" + isNeedZero(i)
        },
        splitMsg: function splitMsg(e) {
            return 0 <= e.indexOf("\r\n") ? e.split("\r\n") : e.split("\\n")
        }
    }
}),
define("common/trigger", [], function() {
    "use strict";
    return {
        fire: function fire(r, e, t, n) {
            var a = r.stateConfig[e];
            if (!a)
                return SFLOG.error("common: trigger", "Trigger updating for vmodels failed", "Cannot find [state] from [stateConfig]"),
                !1;
            ["disableState", "visibleState", "displayText"].forEach(function(e) {
                var t, n, o = a[e];
                if (!o)
                    return !1;
                if (!(n = r[e]))
                    return !1;
                for (t in o) {
                    if (!o.hasOwnProperty(t))
                        return !1;
                    n[t] = o[t]
                }
            }),
            a.action && a.action(t, n)
        }
    }
}),
define("common/auth", ["common/loader"], function(C) {
    "use strict";
    var x = SFLOG
      , S = "common:auth";
    SFCommon;
    return {
        codeHandler: function codeHandler(e, t) {
            var a, i, n, l, o = 2, r = 1, s = 4e4, c = 5e4, u = "other/_service_init", d = e.code, m = e.data, h = "", f = t.renderData || {}, p = t.onBefore, v = t.success || function() {}
            , g = t.error || function() {}
            , _ = t.mapKey || "", b = e.data.isFirstAuth, w = SF.vpnInfo.createInstance(), y = !1;
            function next() {
                new Promise(function(e) {
                    l = !1,
                    e()
                }
                ).then(function checkCustom() {
                    return new Promise(function(e, t) {
                        is.fn(SFCustom.errorCodeFilter) && (n = SFCustom.errorCodeFilter(d)) && (a = n,
                        l = !0),
                        e()
                    }
                    )
                }).then(function getNextService() {
                    return new Promise(function(t, e) {
                        if (l)
                            t();
                        else {
                            if (!(d === o || d === r || s < d && d < c))
                                return void g();
                            "auth/wechat" === (a = s < d && d < c ? m.redirectUrl : m.nextService) && m.wechatBindStatus !== ERRCODED_WECHAT_ACCOUNT_REBIND ? function wechatLogin(t) {
                                var n = window.avalon.vmodels.wechat_bind
                                  , e = SF.setting.getGlobal(KEY_GLOBAL_CSRF_RAND_CODE)
                                  , o = SF.setting.getGlobal(KEY_GLOBAL_WECHAT_STATE, 0);
                                SFAPI.loginWechat({
                                    data: {
                                        state: o,
                                        csrf: e,
                                        bindState: "binded"
                                    },
                                    success: function(e) {
                                        n.toggle = !1,
                                        C.renderPlugin({
                                            name: PORTAL_MAP["auth/wechat_success"],
                                            data: {
                                                callback: t
                                            }
                                        })
                                    },
                                    error: function(e) {
                                        SFCommon.onError({
                                            title: tr("错误提示"),
                                            subTitle: SFCommon.getMessage(e.code),
                                            btnText: tr("确定"),
                                            closeBtn: !1,
                                            clickAction: function(e) {
                                                window.location.reload()
                                            }
                                        }),
                                        n.toggle = !1
                                    }
                                })
                            }(function() {
                                toNextService()
                            }) : ("auth/wechat" === a && (a = "auth/wechat_rebind"),
                            toNextService())
                        }
                        function toNextService() {
                            var e = SF.setting.getGlobal(KEY_GLOBAL_WECHAT_BINDDATA);
                            if (is.empty(a)) {
                                if (d !== r)
                                    return g(),
                                    void x.error(S, "Lack of nextService", "no nextService. CausedBy: login unfinished or login failed");
                                a = u,
                                w.syncLoginInfo(),
                                "bind" === e.status ? (SF.setting.setGlobal({
                                    key: KEY_GLOBAL_WECHAT_BINDDATA,
                                    value: {}
                                }, !1),
                                function wechatSuccess(e) {
                                    C.renderPlugin({
                                        name: PORTAL_MAP["auth/wechat_success"],
                                        data: {
                                            callback: e
                                        }
                                    })
                                }(function() {
                                    t()
                                })) : t()
                            } else
                                !function checkNextService(t) {
                                    "auth/logincert" === a && SFConfig.isExistEC ? (y = !0,
                                    SFAPI.detectKey({
                                        success: function(e) {
                                            SFCommon.hasUSBKey(e.code) && (a = "auth/_key",
                                            f.keyType = e.code),
                                            t()
                                        },
                                        error: function(e) {
                                            t(),
                                            x.info(S, "detect usbkey failed,result:" + JSON.stringify(e))
                                        }
                                    })) : (y = function isMainAuth(e) {
                                        return "auth/logincert" === a || "auth/_key" === a || "auth/psw" === a
                                    }(),
                                    t())
                                }(t)
                        }
                    }
                    )
                }).then(function getNextPath() {
                    return new Promise(function(e, t) {
                        var n, o, r = PORTAL_MAP[a];
                        if (l)
                            e();
                        else {
                            if (is.array(r))
                                return i = m.NextServiceData.NextServiceSubType,
                                a = r[i] ? r[i] : r["default"],
                                void e();
                            if (n = SFCommon.URLParse().params.redirect_uri,
                            a === u && n)
                                return n += -1 !== n.indexOf("?") ? "&" : "?",
                                n += "sangfor_redirect=1",
                                o = SF.session.createInstance(),
                                n = n + "&sangfor_sessid=" + encodeURIComponent(Base64.encode(o.getTWFID())),
                                h = n,
                                void e();
                            if (r)
                                return a = r,
                                void e();
                            h = a,
                            e()
                        }
                    }
                    )
                }).then(function gotoNextService() {
                    return new Promise(function(e, t) {
                        return h ? (x.debug(S, "Next service is redirect, location url: " + h),
                        location.href = h,
                        void v()) : /^#!\//.test(a) ? (a = a.split("/")[1],
                        void C.renderPage({
                            name: a,
                            success: function() {
                                v(),
                                x.debug(S, "renderPage success. page: " + a)
                            },
                            error: function() {
                                g(),
                                x.error(S, "renderPage error", "loading failed")
                            }
                        })) : void C.renderPlugin({
                            name: a,
                            data: avalon.mix({
                                isDialog: !0,
                                isFirstAuth: !1,
                                detectKey: !0,
                                lastAuth: _
                            }, f, {
                                auth: m
                            }),
                            isReload: y,
                            onBefore: p,
                            success: function() {
                                v(),
                                x.debug(S, "renderPlugin success. plugin: " + a)
                            },
                            error: function() {
                                g(),
                                x.error(S, "renderPlugin error", "loading failed")
                            }
                        })
                    }
                    )
                })
            }
            !function handleAuthResult() {
                var e, t;
                1 === b && _ && (x.debug(S, "current auth is first auth,auth:" + _),
                "auth/wechat_bind" !== _ && SF.setting.setVPN({
                    key: KEY_VPN_TEMP_FIRST_AUTH,
                    value: _
                }, !1)),
                d === r && m.pwpErrorCode ? (t = SF.setting.getGlobal(KEY_GLOBAL_TWFID, ""),
                x.assert(t, "sid is empty, can not set mark of change password"),
                e = hex_md5(t + SFConfig.EC_MD5_SALT),
                SFCommon.setCookie(KEY_GLOBAL_NEED_CHANGE_PSW, e),
                SFCommon.setCookie(KEY_GLOBAL_CHANGE_PSW_RESULT, m.pwpErrorCode),
                C.renderPlugin({
                    name: PORTAL_MAP["other/password_change"],
                    data: avalon.mix({
                        next: next,
                        pwpErrorCode: m.pwpErrorCode,
                        pwdRemaintm: m.pwdRemaintm,
                        pwdMinLen: m.pwdMinLen
                    }, f),
                    success: function() {
                        v(),
                        x.debug(S, "renderPlugin success")
                    },
                    error: function() {
                        next(),
                        x.info(S, "renderPlugin error")
                    }
                })) : next()
            }()
        },
        verifyPswPolicy: function verifyPswPolicy(e) {
            var t = e.pwpErrorCode
              , n = e.username
              , o = e.pwd
              , r = e.oldPwd
              , a = e.pwdMinLen
              , i = (e.isFirst,
            32 & t)
              , l = [];
            return 1 & t && a && (!is.set(o) || o.length < a) && l.push(tr("限定密码最小长度为{0}位", a)),
            8 & t && (is.set(o) && is.set(n) && -1 === o.indexOf(n) || l.push(tr("密码不能包含用户名{#1}", n))),
            i && 64 & t && (is.set(o) && /\d/.test(o) || l.push(tr("密码必须包括 {0}", tr("数字")))),
            i && 128 & t && (is.set(o) && /[a-zA-Z]/.test(o) || l.push(tr("密码必须包括 {0}", tr("字母")))),
            i && 256 & t && (is.set(o) && /[!@#$%^&*()]/.test(o) || l.push(tr("密码必须包括 {0}", tr("特殊字符(shift+数字)")))),
            512 & t && (is.set(o) && r !== o || l.push(tr("新密码不能与旧密码相同"))),
            {
                ok: 0 === l.length,
                msgList: l
            }
        },
        getLogoutInfo: function getLogoutInfo(e) {
            var t, n, o = [];
            switch (x.info(S, "current logout info :" + JSON.stringify(e)),
            e.reason) {
            case SFConfig.LOGOUT.LOGOUT_PRIVATEKICK:
                t = SFCommon.getTimeYMDHMS(e.data.time),
                n = e.data.initiator_clientip,
                o.push(tr("您的账号于{0}在其他设备上登录，", t)),
                o.push(tr("登录地址：{0}，此客户端已退出登录", n));
                break;
            case SFConfig.LOGOUT.LOGOUT_ADMINKICK:
                t = SFCommon.getTimeYMDHMS(e.data.time),
                o.push(tr("您的账号于{0}被管理员强制注销，您已被迫下线", t));
                break;
            case SFConfig.LOGOUT.LOGOUT_TIMEOUT:
                o.push(tr("您的账号由于长时间未使用，已被迫下线"));
                break;
            case SFConfig.LOGOUT.LOGOUT_NOTIN_TIMEPLAN:
                o.push(tr("您的账号已超过允许时间段，被管理员强制注销"));
                break;
            case SFConfig.LOGOUT.LOGOUT_LOCAL_EXCEPTION:
                o.push(tr("程序状态异常，请退出后重试"));
                break;
            default:
                o.push(tr("会话已过期，请重新登录"))
            }
            return o
        }
    }
}),
define("common/logout_handle", ["common/loader"], function(e) {
    "use strict";
    var o = SFConfig
      , r = (SFAPI,
    !1)
      , a = SFCommon;
    return function logoutHandle(e, t) {
        var n;
        r || (r = !0,
        (a.isWeb() || !a.isWeb() && !o.isExistEC) && (PORTAL_MAP["other/_logout"].split("/")[1],
        (n = SFCommon.getCookie("thirdparty_logout_url")) && e ? (SFCommon.setCookie("thirdparty_logout_url", ""),
        SFCommon.setCookie("thirdparty_login_url", ""),
        t && o.isExistEC && SF.logout(),
        location.href = n) : (location.href = "/portal/#!/vpn_logout",
        is.IE(8) && setTimeout(function() {
            location.reload()
        }, 300))))
    }
}),
define("common/index", ["common/require_error_handler", "common/i18n", "common/loader", "common/validate", "common/utils", "common/trigger", "common/auth", "common/logout_handle"], function(e, t, n, o, r, a, i, l) {
    "use strict";
    return {
        requireErrorHandler: e,
        i18n: t,
        loader: n,
        validate: o,
        utils: r,
        trigger: a,
        auth: i,
        logoutHandle: l
    }
}),
define("component/i18n/i18n", ["common/index"], function(e) {
    "use strict";
    function getText(e, t) {
        return null !== t ? tr(e, t) : tr(e)
    }
    function widget(t, e) {
        var n, o, r, a, i, l = !1;
        return n = e.i18nOptions,
        a = n.key,
        i = function parseParams(e) {
            var t, n = null;
            if (null !== e)
                if ("string" == typeof e)
                    try {
                        t = JSON.parse(e),
                        Array.isArray(t) ? n = t : SFLOG.error("component:i18n", "paarseParams error", "params 应该为数组字符串!")
                    } catch (o) {
                        SFLOG.error("component:i18n", "paarseParams error", "params 数组字符串解析错误!")
                    }
                else
                    "object" == typeof e && Array.isArray(e) ? n = e : SFLOG.error("component:i18n", "paarseParams error", "params 参数错误!");
            return n
        }(n.params),
        o = {
            $id: e.i18nId,
            text: getText(a, i),
            $init: function(e) {
                l || (l = !0,
                t.style.display = "none",
                t.innerHTML = "{{text}}",
                t.style.display = "",
                r.$watch("all:i18n:change", function() {
                    r.text = getText(a, i)
                }),
                e())
            },
            $remove: function() {
                r.$unwatch("all:i18n:change"),
                t.innerHTML = t.textContent = ""
            }
        },
        r = avalon.define(o)
    }
    widget.defaults = {
        key: "",
        params: null
    },
    avalon.ui.i18n = widget
}),
define("libs/text!component/button/button.html", [], function() {
    return '<button ms-class="{{_className}}" ms-on-click="_click" ms-css-width="_width" ms-attr-disabled="_disabled || _loading" type="button">\n    <img ms-if="_loading" ms-attr-src="$localPath + \'images/btn_loading.gif\'" class="button__loading">\n    <span class="button__text" data-text-el>{{_text}}</span>\n</button>'
}),
define("component/utils", [], function(e, t) {
    "use strict";
    var n = SFLOG;
    return {
        duplexController: function duplexController(c, o) {
            var u, e = c.ctr, d = [], t = [], r = {};
            function watch(e, n, t) {
                r[n] = {
                    watchKey: e,
                    watchHandler: t
                },
                t.$watch(e, function(e, t) {
                    o && o[n] && o[n](e, t)
                })
            }
            return e && avalon.vmodels[e] ? (u = avalon.vmodels[e],
            avalon.each(c, function(e) {
                /^ctr/gi.test(e) && "string" == typeof c[e] && "" !== c[e] && (d.push(e),
                t.push(c[e].split(".")))
            })) : n.info("component:utils", "ctr is not found!"),
            avalon.each(t, function(e, t) {
                var n, o, r, a = t.length, i = a - 1, l = d[e], s = u;
                if (1 === a)
                    o = t[0],
                    "undefined" !== u[o] && (c[l] = u[o],
                    watch(o, l, s));
                else
                    for (n = 0; n < a && (o = t[n],
                    n !== i && "object" == typeof s[o] && null !== s[o] || n === i && "undefined" != typeof s[o]); n++)
                        r = s[o],
                        n === i ? (c[l] = r,
                        watch(t[i], l, s)) : s = r
            }),
            {
                controller: u,
                options: c,
                ctrlInfo: r,
                unwatch: function unwatch() {
                    avalon.each(r, function(e) {
                        var t = r[e];
                        t.watchHandler.$unwatch(t.watchKey)
                    })
                }
            }
        }
    }
}),
define("component/button/button", ["libs/text!component/button/button.html", "component/utils"], function(h, f) {
    "use strict";
    function widget(t, e, n) {
        var o, r, a, i, l, s, c, u = !1, d = {
            local: "../../"
        }, m = "";
        function _getClassName(e, t) {
            var n;
            return "normal" === s ? n = "button " : "line" === s ? n = "button-line " : "lineSmall" === s ? n = "button-line button--small " : "lightLine" === s ? n = "button-light-line " : "lightLineSmall" === s && (n = "button-light-line button--small "),
            n += e ? "button--disabled" : t ? "button--loading" : "button--normal",
            o && o.classname && (n += " " + o.classname),
            n
        }
        return i = f.duplexController(e.buttonOptions, {
            ctrDisabled: function(e) {
                a._disabled = e,
                a._className = _getClassName(a._disabled, a._loading)
            },
            ctrLoading: function(e) {
                a._loading = e,
                a._className = _getClassName(a._disabled, a._loading)
            },
            ctrText: function(e) {
                a._text = e
            }
        }),
        l = i.controller,
        o = i.options,
        c = i.unwatch,
        s = o.style,
        o.template = o.getTemplate(h, o),
        !o.ctrText && o.text && (o.template = o.template.replace("data-text-el", 'ms-widget="i18n" data-i18n-key="' + o.text + '"')),
        o.path && d[o.path] && (m = d[o.path]),
        r = {
            $id: e.buttonId,
            widgetElement: t,
            $localPath: m,
            $skipArray: ["widgetElement", "template"],
            $init: function(e) {
                u || (u = !0,
                "submit" === o.type && (o.template = o.template.replace('type="button"', 'type="submit"')),
                t.style.display = "none",
                t.innerHTML = o.template,
                t.style.display = "",
                e())
            },
            $remove: function() {
                t.innerHTML = t.textContent = "",
                c()
            },
            _className: _getClassName(o.ctrDisabled, o.ctrLoading),
            _disabled: o.ctrDisabled,
            _loading: o.ctrLoading,
            _width: o.width,
            _text: tr(o.text || o.ctrText),
            _click: function(e) {
                a._disabled || a._loading || l && avalon.isFunction(l[o.onClick]) && l[o.onClick].call(e.target, e, a)
            }
        },
        a = avalon.define(avalon.mix(o, r))
    }
    widget.defaults = {
        ctrLoading: !1,
        ctrDisabled: !1,
        ctrText: "",
        onClick: avalon.noop,
        text: "",
        width: "",
        style: "normal",
        localPath: "",
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.button = widget
}),
define("libs/text!component/dialog/dialog.html", [], function() {
    return '<div class="dialog-inner" ms-class-1="dialog-inner--no-radius:$isNoRadiusStyle">\n    <div class="dialog-close" ms-if="close" ms-on-click="_close" ms-attr-title="closeTitle">\n        <i class="iconfont" ms-if="!$isNoRadiusStyle">&#xe66c;</i>\n        <i class="iconfont" ms-if="$isNoRadiusStyle">&#xe682;</i>\n        \n    </div>\n</div>'
}),
define("component/dialog/dialog", ["libs/text!component/dialog/dialog.html", "component/utils"], function(e, f) {
    "use strict";
    var p = e
      , g = avalon.parseHTML('<div class="dialog-mask"></div>').firstChild
      , v = !1
      , _ = avalon.parseHTML("<div></div>").firstChild
      , b = []
      , w = 0
      , y = -1 !== (window.navigator.userAgent || "").toLowerCase().indexOf("msie 6")
      , C = null
      , x = document.compatMode && "css1compat" === document.compatMode.toLowerCase() ? document.documentElement : document.body;
    function throttle(n, o, r, a) {
        var i, l = null;
        return function() {
            var e = this
              , t = +new Date;
            clearTimeout(l),
            i || (i = t),
            r <= t - i ? (n.apply(e, a),
            i = t) : l = setTimeout(function() {
                n.apply(e, a)
            }, o)
        }
    }
    function resetCenter(e, t, n) {
        var o, r, a, i, l, s, c, u, d, m = avalon(g), h = avalon(_), f = avalon(t), p = 0, v = 0;
        if (e.ctrToggle && (c = document.compatMode && "css1compat" === document.compatMode.toLowerCase() ? document.documentElement : document.body,
        o = document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth,
        r = document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight,
        l = document.body.scrollTop + document.documentElement.scrollTop,
        s = c.scrollLeft,
        a = t.offsetWidth,
        p = (i = t.offsetHeight) < r ? (r - i) / 2 : 0,
        v = a < o ? (o - a) / 2 + s : 0,
        i < r && a < o ? y || (e.position = "fixed") : y || (e.position = "absolute"),
        !n || "fixed" !== e.position)) {
            if ("absolute" === e.position) {
                if (1 < b.length)
                    for (u = 0; u < b.length - 1; u++)
                        y || (b[u].widgetElement.style.display = "none");
                m.css({
                    height: r,
                    width: o,
                    top: l,
                    position: "absolute"
                }),
                h.css({
                    height: r,
                    width: o,
                    top: l,
                    overflow: "auto",
                    position: "absolute"
                })
            } else {
                if (1 < b.length)
                    for (d = 0; d < b.length - 1; d++)
                        b[d].widgetElement.style.display = "block";
                m.css({
                    height: "auto",
                    width: "auto",
                    top: 0,
                    position: "fixed"
                }),
                h.css({
                    height: "auto",
                    width: "auto",
                    top: 0,
                    position: "static"
                })
            }
            "noRadius" !== e.style || SFCommon.isWeb() || m.addClass("dialog-hyaline-mask"),
            f.css({
                left: v,
                top: p
            })
        }
    }
    return (avalon.ui.dialog = function(l, e, t) {
        var n, s, a, c, o, u, d, r, m, i, h;
        return w++,
        r = f.duplexController(e.dialogOptions, {
            ctrToggle: function(e) {
                u.ctrToggle = e
            },
            ctrClose: function(e) {
                u.ctrClose = e
            }
        }),
        d = r.ctrlInfo,
        n = r.options,
        m = r.controller,
        h = r.unwatch,
        n.template = n.getTemplate(p, n),
        s = avalon(l),
        c = !0,
        o = y ? "absolute" : "fixed",
        i = e.dialogId ? e.dialogId : "dialog" + (new Date).getTime(),
        m && m[n.onClose] && (a = m[n.onClose]),
        u = avalon.define(i, function(i) {
            avalon.mix(i, n),
            i.$skipArray = ["widgetElement", "template", "container", "modal", "zIndexIncrementGlobal", "initChange"],
            i.$isNoRadiusStyle = "noRadius" === n.style,
            i.widgetElement = l,
            i.position = o,
            i.initChange = !0,
            i.closeTitle = tr("关闭"),
            i._open = function(e) {
                var t, n = document.getElementsByTagName("select").length, o = u.zIndex;
                avalon.Array.ensure(b, u),
                (t = b.length) && (u.modal && avalon(g).css("display", "block"),
                avalon(_).css("display", "block")),
                g.style.zIndex = 2 * t + o - 1,
                _.style.zIndex = 2 * t + o - 1,
                l.style.zIndex = 2 * t + o,
                is.IE(null, !0) < 11 && (g.style.zIndex--,
                setTimeout(function() {
                    g.style.zIndex++
                }, 1)),
                e || (resetCenter(u, l),
                y && n && null === C && u.modal ? C = function createIframe() {
                    var e = document.createElement('<iframe src="javascript:\'\'" style="position:absolute;top:0;left:0;bottom:0;margin:0;padding:0;right:0;zoom:1;width:' + g.style.width + ";height:" + g.style.height + ";z-index:" + (g.style.zIndex - 1) + ';"></iframe>');
                    return document.body.appendChild(e),
                    e
                }() : y && n && u.modal && (C.style.display = "block",
                C.style.width = g.style.width,
                C.style.height = g.style.height,
                C.style.zIndex = g.style.zIndex - 1))
            }
            ,
            i._close = function(e) {
                var t, n, o, r;
                if (avalon.Array.remove(b, i),
                t = b.length,
                n = u.zIndex,
                o = t && b[t - 1],
                e && (c = !1),
                u.ctrToggle = !1,
                window.$eventManager && (window.$eventManager.$fire("all!parentClose", m.$id),
                window.$eventManager.$fire("all!anyDialogClose", m.$id, !c)),
                d.ctrToggle.watchHandler[d.ctrToggle.watchKey] = !1,
                !o || !o.modal)
                    return avalon(g).removeClass("dialog-hyaline-mask"),
                    avalon(g).css("display", "none"),
                    avalon(_).css("display", "none"),
                    null !== C && (C.style.display = "none"),
                    document.documentElement.style.overflow = "",
                    void (a && a.call(l, u));
                avalon(g).css("display", "block"),
                avalon(_).css("display", "block"),
                o.widgetElement.style.display = "block",
                resetCenter(o, o.widgetElement),
                r = 2 * t + n - 1,
                g.style.zIndex = r,
                _.style.zIndex = r,
                C && (C.style.zIndex = r - 1),
                a && a.call(l, u)
            }
            ,
            i._renderView = function() {
                var e, t = null;
                l.setAttribute("ms-css-width", "width"),
                l.setAttribute("ms-css-height", "height"),
                (e = avalon.parseHTML('<div class="dialog-content"></div>').firstChild).innerHTML = l.innerHTML,
                l.innerHTML = "",
                (t = avalon.parseHTML(p).firstChild).appendChild(e),
                l.appendChild(t),
                v || (document.body.appendChild(g),
                document.body.appendChild(_),
                v = !0)
            }
            ,
            i.$init = function(e) {
                var t = u.container
                  , n = x.clientHeight
                  , o = document.body
                  , r = ("object" === avalon.type(t) && 1 === t.nodeType && o.contains(t) ? t : document.getElementById(t)) || o
                  , a = avalon.ui.dialog.defaults;
                a.zIndex || (a.zIndex = function getMaxZIndex() {
                    var e, t, n, o = document.body.children, r = 10;
                    for (t = 0; n = o[t++]; )
                        if (1 === n.nodeType) {
                            if (n === g)
                                continue;
                            (e = ~~avalon(n).css("z-index")) && (r = Math.max(r, e))
                        }
                    return r + 1
                }(),
                u.zIndex = a.zIndex),
                avalon(o).height() < n && avalon(o).css("min-height", n),
                u.zIndex = u.zIndex + u.zIndexIncrementGlobal,
                s.addClass("dialog"),
                l.setAttribute("ms-visible", "ctrToggle"),
                l.setAttribute("ms-css-position", "position"),
                i._renderView(),
                o.contains(_) && o === r ? _.appendChild(l) : r.appendChild(l),
                l.resizeCallback = avalon(window).bind("resize", throttle(resetCenter, 50, 100, [u, l])),
                l.scrollCallback = avalon(window).bind("scroll", throttle(resetCenter, 50, 100, [u, l, !0])),
                u.$watch("all:i18n:change", function() {
                    i.closeTitle = tr("关闭")
                }),
                e()
            }
            ,
            i.$remove = function() {
                h(),
                w--,
                l.innerHTML = "",
                avalon.unbind(window, "resize", l.resizeCallback),
                avalon.unbind(window, "scroll", l.scrollCallback),
                w || (g.parentNode.removeChild(g),
                v = !1,
                g.parentNode.removeChild(_))
            }
            ,
            i.$watch("ctrToggle", function(e) {
                e ? u._open() : u._close()
            }),
            i.$watch("zIndex", function(e) {
                u.initChange ? u.initChange = !1 : u._open(!0)
            }),
            i.$watch("ctrClose", function(e) {
                u.ctrClose = e,
                u.close = e,
                d.ctrClose.watchHandler[d.ctrClose.watchKey] = e
            }),
            i.$watch("sessionEvent", function(e) {
                is.fn(m.$onSessionEvent) && (avalon.log("Session Event fired: " + e),
                m.$onSessionEvent(e))
            }),
            i.$watch("parentClose", function(e) {
                m.$parentID === e && m.$parentID !== m.$id && (avalon.log(m.$id + " close by parent: " + e),
                u._close())
            })
        })
    }
    ).defaults = {
        ctrToggle: !1,
        close: !0,
        ctrClose: !0,
        modal: !0,
        width: 336,
        height: "auto",
        style: "normal",
        onClose: avalon.noop,
        zIndex: 0,
        zIndexIncrementGlobal: 0,
        widgetElement: "",
        container: "app_dialog_container",
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon
}),
define("libs/text!component/table/table.html", [], function() {
    return '<div class="table">\n    <div ms-if="_showHead" ms-class="table__thead:!_isSpecial" ms-class-1="table__thead_special:_isSpecial" >\n        <table class="table__content">\n            <thead>\n                <tr>\n                    <th ms-if="_showSelect && _columns && _columns.length" class="table__th table__checkbox" ms-class="table__th_special:_isSpecial" >\n                        <div ms-widget="checkbox,$,$tableCheckboxOptions"></div>\n                    </th>\n                    <th class="table__th ellipsis" ms-class="table__th_special:_isSpecial" ms-repeat-column="_columns" ms-css-width="column.width" ms-css-text-align="column.align || \'center\'">{{column.label}}</th>\n                    <th ms-if="_showEdit" class="table__edit"></th>\n                </tr>\n            </thead>\n        </table>\n    </div>\n    <div class="table__body pointer" ms-css-height="_height">\n        <div class="cancel-pointer">\n            <table class="table__content">\n                <tbody>\n                    <tr ms-repeat-item="_tableData" ms-class="table__tr--special:$index % 2 === 1 && !_isSpecial" ms-class-1="table__tr--special_special:$index % 2 === 1 && _isSpecial"  class="table__tr" ms-class-2="table__tr_special:_isSpecial" ms-on-click="_onRowClick(item)">\n                        <td class="table__checkbox" ms-if="_showSelect">\n                            <div class="ellipsis" ms-widget="checkbox,$,$tableCheckboxOptionsTd" ms-data-checkbox-value="$index"></div>\n                        </td>\n                        <td class="table__td ellipsis" ms-class="table__td_special:_isSpecial" ms-repeat-col="_columns" ms-css-width="col.width" ms-css-text-align="col.align || \'center\'">\n                            <div class="ellipsis" ms-attr-title="$showTitle ? item[col.field] : \'\'">{{item[col.field]}}</div>\n                        </td>\n                        <td ms-if="_showEdit" ms-on-click="$onEdit(item)" class="table__edit pointer" >\n                            <span class="table__edit__text" ms-if="!_showOperate"><i ms-skip class="iconfont">&#xe65e;</i><span ms-widget="i18n" class="table__edit--word" data-i18n-key="编辑"></span></span>\n                            <span class="table__show__operate" ms-if="_showOperate"><span ms-widget="i18n" class="table__show__operate--word table__edit--word" data-i18n-key="编辑"></span></span>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>'
}),
define("component/table/table", ["libs/text!component/table/table.html", "component/utils"], function(f, p) {
    "use strict";
    function widget(t, e, n) {
        var r, o, a, i, l, s, c, u, d = !1, m = [], h = [];
        function _changeSelectedData() {
            var e, t, n = [];
            for (t = h.length,
            e = 0; e < t; e++)
                n.push(avalon.mix({}, a._tableData[h[e]].$model));
            s && avalon.isFunction(s[r.onSelectedChange]) ? s[r.onSelectedChange](n) : avalon.isFunction(r.onSelectedChange) && r.onSelectedChange(n)
        }
        return l = p.duplexController(e.tableOptions, {
            ctrColumns: function() {
                a._columns = [],
                a._columns = c.ctrColumns.watchHandler[c.ctrColumns.watchKey]
            },
            ctrData: function() {
                a._tableData = [],
                h = [],
                m = [],
                a._tableData = c.ctrData.watchHandler[c.ctrData.watchKey]
            }
        }),
        s = l.controller,
        c = l.ctrlInfo,
        r = l.options,
        u = l.unwatch,
        r.template = r.getTemplate(f, r),
        o = {
            $id: e.tableId,
            widgetElement: t,
            $skipArray: ["widgetElement", "template", "_showHead", "_showEdit", "_height", "_showSelect", "_showOperate"],
            $init: function(e) {
                d || (d = !0,
                t.style.display = "none",
                t.innerHTML = r.template,
                t.style.display = "",
                e())
            },
            $remove: function() {
                t.innerHTML = t.textContent = "",
                u()
            },
            _columns: r.ctrColumns,
            _tableData: r.ctrData,
            _isSpecial: !!r.ctrSpecial,
            _showHead: r.showHead,
            _showEdit: r.showEdit,
            _showOperate: r.showOperate,
            _height: r.height,
            _showSelect: r.showSelect,
            $showTitle: !is.bool(r.attrTitle) || r.attrTitle,
            $tableCheckboxOptions: {
                onChange: function(e, t) {
                    var n, o, r, a;
                    for (n = t._checked,
                    r = m.length,
                    h = [],
                    o = 0; o < r; o++)
                        a = avalon.vmodels[m[o]],
                        n ? (a._checked = !0,
                        h.push(a._value)) : a._checked = !1;
                    _changeSelectedData()
                },
                onInit: function(e) {
                    i = e.$id
                }
            },
            $tableCheckboxOptionsTd: {
                onChange: function(e, t) {
                    var n, o;
                    n = t._value,
                    t._checked ? h.push(n) : -1 !== (o = h.indexOf(n)) && h.splice(o, 1),
                    _changeSelectedData(),
                    r.showHead && (!0,
                    avalon.vmodels[i]._checked = h.length === m.length)
                },
                onInit: function(e) {
                    var t = e.$id;
                    -1 === m.indexOf(t) && m.push(e.$id),
                    i && (avalon.vmodels[i]._checked = !1)
                }
            },
            $mouseenter: function(e) {
                a._showEdit && !a._showOperate && avalon(e.target).addClass("table__tr--edit")
            },
            $mouseleave: function(e) {
                a._showEdit && !a._showOperate && avalon(e.target).removeClass("table__tr--edit")
            },
            $onEdit: function(e) {
                var t = avalon.mix({}, e.$model);
                s && avalon.isFunction(s[r.onEdit]) ? s[r.onEdit](t) : avalon.isFunction(r.onEdit) && r.onEdit(t)
            },
            _onRowClick: function(e) {
                var t = avalon.mix({}, e.$model);
                s && avalon.isFunction(s[r.onRowClick]) ? s[r.onRowClick](t) : avalon.isFunction(r.onRowClick) && r.onRowClick(t)
            }
        },
        a = avalon.define(avalon.mix(r, o))
    }
    widget.defaults = {
        ctrColumns: null,
        ctrData: null,
        onSelectedChange: avalon.noop,
        onEdit: avalon.noop,
        onRowClick: avalon.noop,
        showHead: !0,
        height: "",
        showSelect: !1,
        showEdit: !1,
        showOperate: !1,
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.table = widget
}),
define("libs/text!component/checkbox/checkbox.html", [], function() {
    return '<input \n    ms-attr-value="_value" \n    ms-attr-disabled="_disabled" \n    ms-attr-checked="_checked" \n    ms-on-change="_change" class="checkbox__input" type="checkbox" />\n<div ms-on-click="_change" \n    ms-class-3="checkbox--small: _style == \'small\'"\n    ms-class-2="checkbox--disabled:_disabled"\n    ms-class-1="checkbox--active:_checked" class="checkbox__mark">\n    <i ms-if="_checked" class="iconfont" >&#xe65c;</i>\n</div>\n<div ms-if="_label" ms-on-click="_change" class="checkbox__label" \n    ms-class-3="checkbox--small: _style == \'small\'" ms-class-1="checkbox--disabled:_disabled">{{_label}}</div>'
}),
define("component/checkbox/checkbox", ["libs/text!component/checkbox/checkbox.html", "component/utils"], function(d, m) {
    "use strict";
    function widget(t, e, n) {
        var o, r, a, i, l, s, c, u = !1;
        return i = m.duplexController(e.checkboxOptions, {
            ctrDisabled: function(e) {
                a._disabled = e
            },
            ctrChecked: function(e) {
                a._checked = e
            }
        }),
        l = i.ctrlInfo,
        o = i.options,
        c = i.unwatch,
        s = i.controller,
        o.template = o.getTemplate(d, o),
        r = {
            $id: e.checkboxId,
            widgetElement: t,
            $skipArray: ["widgetElement", "template"],
            $init: function(e) {
                u || (u = !0,
                t.style.display = "none",
                t.className = "checkbox clearfix ie-inline-block",
                t.innerHTML = o.template,
                t.style.display = "",
                a.$watch("all:i18n:change", function() {
                    a._label = tr(o.label)
                }),
                e())
            },
            $remove: function() {
                t.innerHTML = t.textContent = "",
                c()
            },
            _checked: o.ctrChecked,
            _disabled: o.ctrDisabled,
            _value: o.value,
            _label: tr(o.label),
            _style: o.style,
            _change: function(e) {
                a._disabled || (a._checked = !a._checked,
                l && l.ctrChecked && l.ctrChecked.watchHandler && l.ctrChecked.watchKey && (l.ctrChecked.watchHandler[l.ctrChecked.watchKey] = a._checked),
                s && avalon.isFunction(s[o.onChange]) ? s[o.onChange].call(e.target, e, a) : avalon.isFunction(o.onChange) && o.onChange.call(e.target, e, a))
            }
        },
        a = avalon.define(avalon.mix(o, r))
    }
    widget.defaults = {
        ctrChecked: !1,
        ctrDisabled: !1,
        value: "",
        label: "",
        style: "normal",
        onChange: avalon.noop,
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.checkbox = widget
}),
define("libs/text!component/input/input.html", [], function() {
    return '<div class="form-line rel" ms-class-1="{{styleClass}}">\r\n    <div ms-class="input-box rel" ms-class-1="input-disabled:ctrDisabled" ms-on-mouseenter="_onMouseenter" ms-on-mouseleave="_onMouseleave">\r\n        <span ms-class-1="input-column-name" labeltext="label" ms-class-2="input-focus-column:isBlur||isNull">{{labelText}}</span>\r\n        <input ms-attr-type="ctrType" ms-attr-tabindex="tabindex" class="input-txt" ms-attr-readonly="ctrDisabled" ms-attr-disabled="ctrDisabled" ms-class="input-background: errorMsg" ms-on-cut="_onCutAndPaste($event)" ms-on-paste="_onCutAndPaste($event)" autocomplete="off"/>\r\n        <span ms-class-1="input-linellae" ms-class-2="input-linellae-active:isBlur&&!ctrDisabled"></span>\r\n        <div class="input-right-info"></div>\r\n    </div>\r\n    <div class="error-content" ms-visible="showError">\r\n        <div class="triangle_border_up"></div>\r\n        <div class="error-box"><span>{{errorMsg}}</span></div>\r\n    </div>\r\n</div>'
}),
define("component/input/input", ["common/index", "libs/text!component/input/input.html"], function(o, r) {
    "use strict";
    function widget(l, e, t) {
        var s, c, u, d, m, h, f, p, n, v = !1, g = o.utils;
        return (s = e.inputOptions).template = s.getTemplate(r, s),
        n = "password" === s.ctrType ? "password" : "text",
        s.template = s.template.replace('ms-attr-type="ctrType"', 'type="' + n + '"'),
        s.label && (s.template = s.template.replace('labeltext="label"', 'ms-widget="i18n" data-i18n-key="' + s.label + '"')),
        c = {
            $id: e.inputId,
            widgetElement: l,
            ctrDisabled: avalon.vmodels[s.ctr][s.ctrDisabled],
            ctrType: n,
            ctrValue: "",
            ctrAutoFocus: s.ctrAutoFocus,
            labelWidth: s.labelWidth,
            width: s.width,
            isNull: s.isNull,
            maxLen: s.len,
            isBlur: s.isBlur,
            style: s.style,
            styleClass: "",
            tabindex: s.tabindex || "",
            showError: !1,
            isImportModule: s.ctrValue && avalon.vmodels[s.ctr],
            onKeyup: s.onKeyup,
            currVmodel: avalon.vmodels[s.ctr],
            currColumn: s.ctrValue,
            currDisabled: s.ctrDisabled,
            currErrorMsg: s.ctrErrorMsg,
            errorMsg: s.ctrErrorMsg ? avalon.vmodels[s.ctr][s.ctrErrorMsg] : "",
            $skipArray: ["widgetElement", "template"],
            labelText: {
                set: function(e) {
                    var t = s.label;
                    return s.style === s.styleArr[2] && (t = this.ctrValue),
                    tr(t)
                },
                get: function() {
                    return (f || p) && this.ctrValue ? "" : tr(s.label)
                }
            },
            $init: function(e) {
                var t, n, o, r, a = 0, i = 8 === is.IE();
                v || (l.style.display = "none",
                t = l.innerHTML,
                l.innerHTML = s.template,
                (n = g.getElementsByClassName("input-right-info", l)[0]).innerHTML = t,
                l.style.display = "",
                e(),
                m = g.getElementsByClassName("input-column-name", l)[0],
                d = g.getElementsByClassName("input-txt", l)[0],
                s.ctrAutoFocus && !i && d && u.currVmodel.$watch(s.ctrAutoFocus, function() {
                    c.ctrAutoFocus = u.currVmodel[s.ctrAutoFocus],
                    c.ctrAutoFocus && is.fn(d.focus) && d.focus()
                }),
                (s.ctrAutoFocus || s.autoFocus) && i && setTimeout(function() {
                    d && is.fn(d.focus) && d.focus()
                }, 500),
                o = g.getElementsByClassName("input-box", l)[0],
                (!(r = s.style) || s.styleArr.indexOf(r) < 0) && (r = s.styleArr[0]),
                h = r === s.styleArr[0],
                f = r === s.styleArr[1],
                p = r === s.styleArr[2],
                h && g.addEvent(m, "click", function() {
                    u.isBlur || d.focus()
                }),
                s.id && d.setAttribute("id", s.id),
                s.classname && d.setAttribute("class", d.getAttribute("class") + " " + s.classname),
                u.styleClass = "input-" + r + "-style",
                u.isImportModule && (u.currColumn && u.currVmodel[u.currColumn] && (u.ctrValue = u.currVmodel[u.currColumn],
                d.value = u.ctrValue,
                u.isNull = "" !== u.ctrValue),
                g.moduleAddEvent(s, d),
                u.$watch("ctrValue", function() {
                    u.currVmodel[u.currColumn] !== u.ctrValue && (u.currVmodel[u.currColumn] = u.ctrValue)
                }),
                u.currVmodel.$watch(c.currColumn, function(e) {
                    u.ctrValue !== e && (u.ctrValue = e,
                    d.value = e,
                    u.isNull = !!e,
                    (f || p) && (u.isNull ? m.style.display = "none" : (m.style.display = "",
                    u.labelText = tr(s.label))))
                }),
                is.set(u.currVmodel[u.currDisabled]) && u.currVmodel.$watch(u.currDisabled, function(e) {
                    u.ctrDisabled = e
                }),
                is.set(u.currVmodel[u.currErrorMsg]) && u.currVmodel.$watch(u.currErrorMsg, function(e) {
                    u.errorMsg = e,
                    "" === u.errorMsg && (u.showError = !1)
                })),
                h ? setTimeout(function() {
                    a = n.offsetWidth || 0,
                    is.number(a) && (a += "px"),
                    o.style.paddingRight = a
                }, 2e3) : f && (u.labelText += "：",
                u.width = l.offsetWidth - u.labelWidth - 8 - 11,
                m.style.width = u.labelWidth + 11 + "px"),
                (f || p) && u.ctrValue && (m.style.display = "none"),
                v = !0)
            },
            _click: function(e) {
                u.currVmodel[s.onClick](e)
            },
            _change: function(e) {
                u._keyup(e),
                !0 !== s.onChange && u.currVmodel[s.onChange](e)
            },
            _focus: function(e) {
                !0 !== s.onFocus && u.currVmodel[s.onFocus](e),
                !f && !p || u.ctrDisabled || (m.style.display = "none"),
                u.ctrDisabled || (u.isBlur = !0)
            },
            _blur: function(e) {
                var t = e.target.value;
                u.isBlur = !1,
                u.isNull = "" !== t,
                u.ctrValue = t,
                !f && !p || u.isNull || (m.style.display = ""),
                !0 !== s.onBlur && u.currVmodel[s.onBlur](e)
            },
            _keyup: function(e) {
                var t = u.maxLen
                  , n = e.target
                  , o = n.value
                  , r = e.keyCode;
                return t && o.length > t && (o = o.slice(0, t),
                d.value = o),
                u.ctrValue = o,
                u.isNull = !!u.ctrValue,
                c.isImportModule && (u.currVmodel[s.currColumn] = o),
                n && 13 === r && !0 !== s.onEnter && avalon.vmodels[s.ctr][s.onEnter](e),
                !0 !== c.onKeyup && u.currVmodel[s.onKeyup](e),
                !1
            },
            _onCutAndPaste: function(e) {
                !(e = e || window.event).target && e.srcElement && (e.target = e.srcElement),
                setTimeout(function() {
                    u._change(e)
                }, 100)
            },
            _keydown: function(e) {
                u.currVmodel[s.onKeydown](e)
            },
            _onMouseenter: function() {
                u.errorMsg ? u.showError = !0 : u.showError = !1
            },
            _onMouseleave: function() {
                u.showError = !1
            }
        },
        u = avalon.define(avalon.mix(s, c))
    }
    widget.defaults = {
        ctrDisabled: !1,
        ctrValue: "",
        ctrAutoFocus: !1,
        styleArr: ["login", "setting", "original"],
        labelText: "",
        labelWidth: 55,
        width: "100%",
        id: "",
        isNull: !1,
        maxLen: 0,
        isBlur: !1,
        style: "login",
        currVmodel: "",
        currColumn: "",
        onChange: !0,
        onBlur: !0,
        onFocus: !0,
        onKeyup: !0,
        onEnter: !0,
        ctrErrorMsg: "",
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.input = widget
}),
define("libs/text!component/select/select.html", [], function() {
    return '<div class="select rel" ms-class-1="{{_style}}">\r\n    <div class="rel select-box" ms-class-1="select-disabled:ctrDisabled" ms-class-2="select-change:isChange">\r\n        <div class="select-choose overflow-spill" ms-class-1="select-show:!_isShow" ms-click="_selectShow($event)" ms-attr-title="ctrValue">\r\n            {{ctrValue}}\r\n            <i class="iconfont trans1 select-arrow" ms-class="select-arrow--turn:!_isShow" ms-if="!($isLoginStyle && !ctrSelectData.length)">&#xe6be;</i>\r\n        </div>\r\n        <div class="select-label">{{_label}}</div>\r\n        <div class="select-list pointer" ms-class-1="hide:_isShow">\r\n            <ul class="cancel-pointer">\r\n                <li class=\'overflow-spill\' ms-repeat="ctrSelectData" ms-attr-title="el" ms-click="selectChoose($event,$index)" ms-mouseover="onOverItem($event)" ms-mouseleave="onLeaveItem($event)">\r\n                    {{el}}\r\n                    <a href="javascript:void(0);" ms-class="hide:$isShowClear" class="iconfont font12 color-999 select-del theme-hover-color" ms-click="clearChoose(el, $index)">&#xe682;</a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class="select-right-info">\r\n    </div>\r\n</div>'
}),
define("component/select/select", ["common/index", "libs/text!component/select/select.html"], function(p, i) {
    "use strict";
    function widget(l, e, t) {
        var n, s, c = e.selectOptions, u = !1, d = !1, m = !1, h = c.style === c.styleArr[0], f = c.style === c.styleArr[1], o = avalon.vmodels[c.ctr], r = o[c.onClearChoose], a = avalon.isFunction(r);
        return c.template = c.getTemplate(i, c),
        n = {
            $id: e.selectId,
            widgetElement: l,
            currDisabled: c.ctrDisabled,
            ctrDisabled: !1,
            ctrValue: o[c.ctrValue] || tr("请选择..."),
            $isShowClear: a,
            onClearChoose: a ? r : function() {}
            ,
            isChange: !1,
            ctrSelectData: [],
            _isShow: c.isShow,
            _style: "select-" + c.style + "-style",
            _label: c.label,
            _labelWidth: c.labelWidth,
            currVmodel: avalon.vmodels[c.ctr],
            currColumn: c.ctrValue,
            currSelectData: c.ctrData,
            $isLoginStyle: h,
            $skipArray: ["widgetElement", "template"],
            $init: function(e) {
                var t, n, o, r, a, i = 5;
                u || (is.number(c.ctrNum) && 0 < c.ctrNum && (i = c.ctrNum),
                l.style.display = "none",
                t = l.innerHTML,
                l.innerHTML = c.template,
                (o = p.utils.getElementsByClassName("select-right-info", l)[0]).innerHTML = t,
                l.style.display = "",
                s.currVmodel && (s.currVmodel.$watch(s.currSelectData, function(e, t) {
                    s.ctrSelectData.removeAll(),
                    s.ctrSelectData = s.currVmodel[s.currSelectData],
                    s.currVmodel[s.currSelectData] && s.ctrValue && (s.currVmodel[s.currSelectData].currIndex = s.currVmodel[s.currSelectData].indexOf(s.ctrValue)),
                    a && (s.currVmodel[s.currSelectData].length > i ? (a.style.height = "110px",
                    a.style.overflow = "auto") : (a.style.height = "auto",
                    a.style.overflow = ""))
                }),
                s.currVmodel.$watch(s.currColumn, function() {
                    s.ctrValue = s.currVmodel[s.currColumn],
                    s.currVmodel[s.currSelectData] && (s.currVmodel[s.currSelectData].currIndex = s.currVmodel[s.currSelectData].indexOf(s.ctrValue)),
                    h && s.ctrValue && (s._label = "")
                }),
                s.currDisabled && s.currVmodel.$watch(s.currDisabled, function() {
                    s.ctrDisabled = s.currVmodel[s.currDisabled]
                })),
                c.styleArr.indexOf(c.style) < 0 && (s._style = c.styleArr[0]),
                s.ctrSelectData = s.currVmodel[s.currSelectData],
                e(),
                avalon.bind(document, "click", function() {
                    m ? m = !1 : (d || (s._isShow = !0),
                    d = !d)
                }),
                a = p.utils.getElementsByClassName("select-list", l)[0],
                n = p.utils.getElementsByClassName("select-box", l)[0],
                c.style === c.styleArr[0] ? p.utils.getElementsByClassName("select-choose", l)[0].style.marginRight = (c.rightWidth || o.offsetWidth) + "px" : c.style === c.styleArr[1] ? (n.style.marginLeft = s._labelWidth + 9 + "px",
                setTimeout(function() {
                    (r = p.utils.getElementsByClassName("select-label", l)[0]) && (r.style.width = s._labelWidth + "px",
                    r.style.left = -s._labelWidth + "px")
                }),
                s._label += "：") : c.style === c.styleArr[2] && (s._label = "",
                n.style.marginRight = o.offsetWidth + "px"),
                u = !0,
                s.ctrSelectData && (s.ctrValue || (s.currVmodel[c.ctrValue] = s.ctrSelectData[0]),
                s.currVmodel[c.ctrData].currIndex = s.ctrSelectData.indexOf(s.ctrValue),
                f || (s._label = "")))
            },
            _selectShow: function(e) {
                s.ctrDisabled || (c.onClick && s.currVmodel[c.onClick].call(e),
                s.ctrSelectData.length < 1 ? s._isShow = !0 : (s._isShow = !s._isShow,
                e || (e = window.event),
                e.target || (e.target = e.srcElement),
                d = !0))
            },
            selectChoose: function(e, t) {
                m || (e || (e = window.event),
                e.target || (e.target = e.srcElement),
                s.ctrValue = s.ctrSelectData[t],
                s.isChange = !0,
                s.currVmodel[c.ctrData].currIndex = t,
                s.currColumn && s.currVmodel && (s.currVmodel[s.currColumn] = s.ctrSelectData[t]),
                s._isShow = !s._isShow,
                c.onChange && s.currVmodel[c.onChange].call(e))
            },
            clearChoose: function(e, t) {
                s.onClearChoose(e, t),
                m = !0
            },
            onOverItem: function(e) {
                var t = e.currentTarget
                  , n = "over-status";
                s.$isShowClear && t.className.indexOf(n) < 1 && (t.className += " " + n)
            },
            onLeaveItem: function(e) {
                var t = e.currentTarget;
                s.$isShowClear && (t.className = t.className.replace("over-status", ""))
            },
            _click: function() {}
        },
        s = avalon.define(avalon.mix(c, n))
    }
    widget.defaults = {
        ctrDisabled: !1,
        ctrNum: 5,
        ctrValue: "",
        ctrData: [],
        label: "",
        labelWidth: 100,
        rightWidth: 0,
        styleArr: ["login", "setting", "original"],
        style: "login",
        isShow: !0,
        selectData: [],
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.select = widget
}),
define("component/hook/loader_hook", [], function(e, t) {
    "use strict";
    avalon.ui.loaderhook = function(e, n, t) {
        return avalon.define({
            $id: n.loaderhookId,
            $init: function(e) {
                e()
            },
            $remove: function() {
                var e = n.loaderhookOptions.controller
                  , t = avalon.vmodels;
                e && t[e] && avalon.isFunction(t[e].$onBeforeUnload) && t[e].$onBeforeUnload()
            }
        })
    }
}),
define("libs/text!component/action_bar/action_bar.html", [], function() {
    return '<div class="action-bar clearfix" ms-class-1="action-bar-linux:$isUbuntuClient"  ms-class-2="no-drag:$isLinuxClient">\n    <div class="action-bar__button" ms-class="diy-action-bar__button:$diyStyle">\n        <div class="action-bar__com trans3 action-bar-back" ms-class="action-bar__back:backDisabled" ms-class-1="pr10:$isMac" ms-attr-title="allTextObj.back" ms-if="$back" ms-on-click="_onBack">\n            <i class="iconfont">&#xe65d;</i>\n        </div>\n        <div class="action-bar__com trans3" ms-attr-title="allTextObj.minimize" ms-if="$minimize" ms-on-click="_onMinimize">\n            <i class="iconfont">&#xe6ae;</i>\n        </div>\n        <div class="action-bar__com trans3" ms-attr-title="allTextObj.maxmize" ms-if="$showMaxBtn && !isMaxState" ms-on-click="_onMaximize">\n            <i class="iconfont">&#xe6af;</i>\n        </div>\n        <div class="action-bar__com trans3" ms-attr-title="allTextObj.restore" ms-if="$showMaxBtn && isMaxState" ms-on-click="_onMaximize">\n            <i class="iconfont">&#xe6a8;</i>\n        </div>\n        <div class="action-bar__com trans3 pr10" ms-attr-title="allTextObj.exit" ms-if="$exit" ms-on-click="_onExit">\n            <i class="iconfont">&#xe66c;</i>\n        </div>\n    </div>\n</div>\n'
}),
define("component/action_bar/action_bar", ["libs/text!component/action_bar/action_bar.html", "common/index"], function(v, g) {
    "use strict";
    function widget(t, e, n) {
        var o, r, a, i, l, s, c, u = !1, d = SFConfig, m = g.utils, h = SFLOG, f = "UI:action_bar", p = !1;
        return o = e.actionbarOptions,
        m.isMacClient && "service" === o.backEvent && (o.back = !1),
        (i = avalon.vmodels[o.ctr]) && (o.ctrBackDisabled && (c = o.ctrBackDisabled,
        p = i[c]),
        o.ctrMaxState && (l = o.ctrMaxState),
        is.fn(i[o.maxCallback]) && i[o.maxCallback]),
        o.template = o.getTemplate(v, o),
        h.info(f, "current back event is " + (o.backEvent || "back")),
        r = {
            $id: e.actionbarId,
            widgetElement: t,
            allTextObj: {
                back: tr("返回"),
                maxmize: tr("最大化"),
                minimize: tr("最小化"),
                exit: tr("关闭"),
                restore: tr("向下还原")
            },
            $skipArray: ["widgetElement", "template"],
            backDisabled: p,
            $back: o.back,
            $minimize: o.minimize && !m.isMacClient,
            $showMaxBtn: o.maxmize && !m.isMacClient,
            $exit: o.exit && !m.isMacClient,
            $isMac: m.isMacClient,
            $isUbuntuClient: m.isUbuntuClient,
            isMaxState: 0,
            $diyStyle: o.diyStyle || !1,
            $init: function(e) {
                u || (u = !0,
                s = o.ctr,
                t.style.display = "none",
                t.innerHTML = o.template,
                t.style.display = "",
                i && (is.bool(p) && c && i.$watch(c, function(e) {
                    p = e,
                    a.backDisabled = e
                }),
                l && i.$watch(l, function(e) {
                    a.isMaxState = e ? 1 : 0
                })),
                a.$watch("all:i18n:change", function(e) {
                    s === e && (a.allTextObj = {
                        back: tr("返回"),
                        maxmize: tr("最大化"),
                        minimize: tr("最小化"),
                        exit: tr("关闭"),
                        restore: tr("向下还原")
                    })
                }),
                e())
            },
            $remove: function() {
                t.innerHTML = t.textContent = ""
            },
            _onBack: function() {
                var e, t;
                p || (t = SF.vpnInfo.createInstance(),
                "service" === o.backEvent ? g.loader.renderPlugin({
                    name: "views/vpn_islogout"
                }) : (t.clearTempInfo(),
                h.info(f, "back to connect page,clear temp login info"),
                e = d.CONTAINER_WINDOW_PATH.CONNECT_WINDOW,
                h.info(f, "current back path is " + e),
                SF.windowMgr.moveTo(SFConfig.CONTAINER_WINDOW_ID.CONNECT_WINDOW, window.screenX, window.screenY),
                SF.windowMgr.redirect(SFConfig.CONTAINER_WINDOW_ID.CONNECT_WINDOW, e, !0),
                SF.windowMgr.close(SFConfig.CONTAINER_WINDOW_ID.CURRENT_WINDOW)))
            },
            _onMinimize: function() {
                SF.windowMgr.minimize()
            },
            _onMaximize: function() {
                SF.windowMgr.maximize()
            },
            _onExit: function() {
                "service" === o.backEvent ? SFCommon.onExit() : SF.windowMgr.exit()
            }
        },
        a = avalon.define(avalon.mix(o, r))
    }
    widget.defaults = {
        back: !1,
        minimize: !1,
        maxmize: !1,
        exit: !1,
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui.actionbar = widget
}),
define("libs/text!component/switch/switch.html", [], function() {
    return '<input type="checkbox"\n    ms-attr-value="_value" \n    ms-attr-disabled="_disabled" \n    ms-attr-checked="_checked" \n    ms-on-change="_change"\n    class="switch__input" />\n<div class="switch__item"\n    ms-on-click="_change">\n    <div class="switch__mark"\n        ms-class-1="switch__mark--checked: _checked"\n        ms-class-2="switch__mark--checked-animation: _isAnimation && _checked"\n        ms-class-3="switch__mark-animation: _isAnimation && !_checked">\n    </div>\n    <div class="switch__circle"\n        ms-class-1="switch__circle--checked: _checked"\n        ms-class-2="switch__circle--checked-animation: _isAnimation && _checked"\n        ms-class-3="switch__circle-animation: _isAnimation && !_checked">\n    </div>\n</div>'
}),
define("component/switch/switch", ["libs/text!component/switch/switch.html", "component/utils"], function(d, m) {
    "use strict";
    function widget(t, e, n) {
        var o, r, a, i, l, s, c, u = !1;
        return i = m.duplexController(e.switchOptions, {
            ctrDisabled: function(e) {
                a._disabled = e
            },
            ctrChecked: function(e) {
                a._checked = e
            }
        }),
        l = i.ctrlInfo,
        o = i.options,
        c = i.unwatch,
        s = i.controller,
        o.template = o.getTemplate(d, o),
        r = {
            $id: e.switchId,
            widgetElement: t,
            $skipArray: ["widgetElement", "template"],
            $init: function(e) {
                u || (u = !0,
                t.style.display = "none",
                t.className = "switch clearfix ie-inline-block",
                t.innerHTML = o.template,
                t.style.display = "",
                a._checked,
                e())
            },
            $remove: function() {
                t.innerHTML = t.textContent = "",
                c()
            },
            _checked: o.ctrChecked,
            _disabled: o.ctrDisabled,
            _value: o.value,
            _isAnimation: !1,
            _change: function(e) {
                a._isAnimation = !0,
                a._disabled || (a._checked = !a._checked,
                l && l.ctrChecked && l.ctrChecked.watchHandler && l.ctrChecked.watchKey && (l.ctrChecked.watchHandler[l.ctrChecked.watchKey] = a._checked),
                s && avalon.isFunction(s[o.onChange]) ? s[o.onChange].call(e.target, e, a) : avalon.isFunction(o.onChange) && o.onChange.call(e.target, e, a)),
                setTimeout(function() {
                    a._isAnimation = !1
                }, 1e3)
            }
        },
        a = avalon.define(avalon.mix(o, r))
    }
    widget.defaults = {
        ctrChecked: !1,
        ctrDisabled: !1,
        value: "",
        onChange: avalon.noop,
        getTemplate: function(e, t) {
            return e
        }
    },
    avalon.ui["switch"] = widget
}),
define("component/index", ["component/i18n/i18n", "component/button/button", "component/dialog/dialog", "component/table/table", "component/checkbox/checkbox", "component/input/input", "component/select/select", "component/hook/loader_hook", "component/action_bar/action_bar", "component/switch/switch"], function() {}),
define("views/route", ["libs/oniui/mm_router/mm_state"], function() {
    "use strict";
    var i = "avalon:route"
      , o = window.themePathConfig || {}
      , l = {
        login: {
            notNeedLogin: !1
        },
        service: {
            notNeedLogin: !1
        },
        vpn_logout: {
            notNeedLogin: !0
        },
        vpn_browser_unsupport: {
            notNeedLogin: !0
        },
        user_setting_box: {
            notNeedLogin: !0
        },
        vpn_refuse_login: {
            notNeedLogin: !0
        },
        vpn_openresource: {
            notNeedLogin: !0
        },
        independent_acc_effect: {
            notNeedLogin: !0
        },
        down_client: {
            notNeedLogin: !0
        },
        privacy_CN: {
            notNeedLogin: !0
        },
        privacy_EN: {
            notNeedLogin: !0
        },
        vpn_isupdate: {
            notNeedLogin: !0
        },
        thirdparty_auth_judgment: {
            notNeedLogin: !0
        },
        resource_browser_unsupport: {
            notNeedLogin: !0
        },
        easyconnect_update: {
            notNeedLogin: !0
        },
        wechat_bind: {
            notNeedLogin: !0
        },
        wechat_rebind: {
            notNeedLogin: !0
        },
        wechat_success: {
            notNeedLogin: !0
        }
    };
    function templateProvider(r) {
        return function() {
            return new Promise(function(n) {
                var e = getCustomURL(r, "html")
                  , t = getCustomURL(r, "css")
                  , o = [];
                e || (e = "login" === r || "service" === r ? "theme/" + r + ".html" : "views/" + r + "/" + r + ".html"),
                e = "libs/text!" + e,
                o.push(e),
                t && (t = "libs/text!" + t,
                o.push(t)),
                require(o, function(e, t) {
                    t && (e = "<style>" + t + "</style>" + e),
                    n(e)
                })
            }
            )
        }
    }
    function getCustomURL(e, t) {
        var n = o[e];
        return !(!n || !n[t]) && "theme/" + n[t]
    }
    function controllerProvider(n) {
        return function() {
            return new Promise(function(t) {
                var e = getCustomURL(n, "js");
                e || (e = "views/" + n + "/" + n),
                require([e], function(e) {
                    t(e.vmodel)
                })
            }
            )
        }
    }
    function ignoreChange(e, t) {
        var n = !1;
        return "query" === e && (n = !0),
        n
    }
    avalon.state("login", {
        url: "/login",
        views: {
            main: {
                templateProvider: templateProvider("login"),
                controllerProvider: controllerProvider("login")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("vpn_browser_unsupport", {
        url: "/vpn_browser_unsupport",
        views: {
            main: {
                templateProvider: templateProvider("vpn_browser_unsupport"),
                controllerProvider: controllerProvider("vpn_browser_unsupport")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("service", {
        url: "/service",
        views: {
            main: {
                templateProvider: templateProvider("service"),
                controllerProvider: controllerProvider("service")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("vpn_logout", {
        url: "/vpn_logout",
        views: {
            main: {
                templateProvider: templateProvider("vpn_logout"),
                controllerProvider: controllerProvider("vpn_logout")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("user_setting_box", {
        url: "/user_setting_box",
        views: {
            main: {
                templateProvider: templateProvider("user_setting_box"),
                controllerProvider: controllerProvider("user_setting_box")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("vpn_openresource", {
        url: "/vpn_openresource",
        views: {
            main: {
                templateProvider: templateProvider("vpn_openresource"),
                controllerProvider: controllerProvider("vpn_openresource")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("independent_acc_effect", {
        url: "/independent_acc_effect",
        views: {
            main: {
                templateProvider: templateProvider("independent_acc_effect"),
                controllerProvider: controllerProvider("independent_acc_effect")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("down_client", {
        url: "/down_client",
        views: {
            main: {
                templateProvider: templateProvider("down_client"),
                controllerProvider: controllerProvider("down_client")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("vpn_refuse_login", {
        url: "/vpn_refuse_login",
        views: {
            main: {
                templateProvider: templateProvider("vpn_refuse_login"),
                controllerProvider: controllerProvider("vpn_refuse_login")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("privacy_CN", {
        url: "/privacy_CN",
        views: {
            main: {
                templateProvider: templateProvider("privacy_CN"),
                controllerProvider: controllerProvider("privacy_CN")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("privacy_EN", {
        url: "/privacy_EN",
        views: {
            main: {
                templateProvider: templateProvider("privacy_EN"),
                controllerProvider: controllerProvider("privacy_EN")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("vpn_isupdate", {
        url: "/vpn_isupdate",
        views: {
            main: {
                templateProvider: templateProvider("vpn_isupdate"),
                controllerProvider: controllerProvider("vpn_isupdate")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("thirdparty_auth_judgment", {
        url: "/thirdparty_auth_judgment",
        views: {
            main: {
                templateProvider: templateProvider("thirdparty_auth_judgment"),
                controllerProvider: controllerProvider("thirdparty_auth_judgment")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("resource_browser_unsupport", {
        url: "/resource_browser_unsupport",
        views: {
            main: {
                templateProvider: templateProvider("resource_browser_unsupport"),
                controllerProvider: controllerProvider("resource_browser_unsupport")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("easyconnect_update", {
        url: "/easyconnect_update",
        views: {
            main: {
                templateProvider: templateProvider("easyconnect_update"),
                controllerProvider: controllerProvider("easyconnect_update")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("wechat_bind", {
        url: "/wechat_bind",
        views: {
            main: {
                templateProvider: templateProvider("wechat_bind"),
                controllerProvider: controllerProvider("wechat_bind")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("wechat_rebind", {
        url: "/wechat_rebind",
        views: {
            main: {
                templateProvider: templateProvider("wechat_rebind"),
                controllerProvider: controllerProvider("wechat_rebind")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state("wechat_success", {
        url: "/wechat_success",
        views: {
            main: {
                templateProvider: templateProvider("wechat_success"),
                controllerProvider: controllerProvider("wechat_success")
            }
        },
        ignoreChange: ignoreChange
    }),
    avalon.state.config({
        onError: function() {
            avalon.log(arguments)
        },
        onBeforeUnload: function(e, t) {
            return function routerGuard(o, e) {
                var r = e.stateName
                  , a = l[r]
                  , t = !1;
                return o = o && o.stateName || "login",
                a ? a.notNeedLogin ? t = !0 : a._result ? (t = a._result,
                a._result = null) : SFAPI.checkLoginStatus({
                    byServer: !0,
                    conCount: SFConfig.DEFAULT_RECONNECT_COUNT,
                    success: function(e) {
                        var t, n = SF.session.createInstance();
                        1 === e.code ? (t = SF.setting.getGlobal(KEY_GLOBAL_TWFID, ""),
                        e.data.twfID && t !== e.data.twfID && (SFLOG.info(i, "twfid change when go to other page"),
                        n.setTWFID(e.data.twfID)),
                        "login" === o && "login" === r ? (r = "service",
                        SFLOG.info(i, "Query login status  May be already login", "By User Action, Go to Page:" + r)) : "service" === o && "login" === r && setTimeout(function() {
                            location.reload()
                        }, 500)) : "login" === o && (r = "login",
                        SFLOG.info(i, "Query login status success, User not login", "By User Action, Hide loading and go to Page:" + o),
                        window.$eventManager && (window.$eventManager.$fire("all!onHideLoading", !0),
                        window.$eventManager.$fire("all!onServiceInitLoadingClose", !0))),
                        (a = l[r])._result = !0,
                        avalon.router.go(r)
                    },
                    preventOnError: !0,
                    error: function(e) {
                        SFLOG.warn(i, "Query login status error, May be logouted", "By User Action, Go to Page:" + o),
                        SFCommon.onError({
                            title: tr("请求失败"),
                            subTitle: tr("请尝试刷新后重试"),
                            btnText: tr("刷新"),
                            closeBtn: !1,
                            clickAction: function(e) {
                                window.location.reload()
                            }
                        })
                    }
                }) : avalon.router.go(e),
                t
            }(e, t)
        }
    })
}),
define("index", ["libs/text", "libs/oniui/index", "common/index", "component/index", "views/route"], function(e, t, n) {
    "use strict";
    avalon.define({
        $id: "app"
    }),
    avalon.history.start({}),
    avalon.ready(function() {
        avalon.scan(document.getElementById("app"))
    })
});
