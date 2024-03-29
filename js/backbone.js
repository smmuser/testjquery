// Backbone.js 0.9.10
// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function() {
    var n = this,
        B = n.Backbone,
        h = [],
        C = h.push,
        u = h.slice,
        D = h.splice,
        g;
    g = "undefined" !== typeof exports ? exports : n.Backbone = {};
    g.VERSION = "0.9.10";
    var f = n._;
    !f && "undefined" !== typeof require && (f = require("underscore"));
    g.$ = n.jQuery || n.Zepto || n.ender;
    g.noConflict = function() {
        n.Backbone = B;
        return this
    };
    g.emulateHTTP = !1;
    g.emulateJSON = !1;
    var v = /\s+/,
        q = function(a, b, c, d) {
            if (!c) return !0;
            if ("object" === typeof c) for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
            else if (v.test(c)) {
                c = c.split(v);
                e = 0;
                for (var f = c.length; e < f; e++) a[b].apply(a, [c[e]].concat(d))
            } else return !0
        }, w = function(a, b) {
            var c, d = -1,
                e = a.length;
            switch (b.length) {
            case 0:
                for (; ++d < e;)(c = a[d])
                    .callback.call(c.ctx);
                break;
            case 1:
                for (; ++d < e;)(c = a[d])
                    .callback.call(c.ctx, b[0]);
                break;
            case 2:
                for (; ++d < e;)(c = a[d])
                    .callback.call(c.ctx, b[0], b[1]);
                break;
            case 3:
                for (; ++d < e;)(c = a[d])
                    .callback.call(c.ctx, b[0], b[1], b[2]);
                break;
            default:
                for (; ++d < e;)(c = a[d])
                    .callback.apply(c.ctx, b)
            }
        }, h = g.Events = {
            on: function(a, b, c) {
                if (!q(this, "on", a, [b, c]) || !b) return this;
                this._events || (this._events = {});
                (this._events[a] || (this._events[a] = []))
                    .push({
                    callback: b,
                    context: c,
                    ctx: c || this
                });
                return this
            },
            once: function(a, b, c) {
                if (!q(this, "once", a, [b, c]) || !b) return this;
                var d = this,
                    e = f.once(function() {
                        d.off(a, e);
                        b.apply(this, arguments)
                    });
                e._callback = b;
                this.on(a, e, c);
                return this
            },
            off: function(a, b, c) {
                var d, e, t, g, j, l, k, h;
                if (!this._events || !q(this, "off", a, [b, c])) return this;
                if (!a && !b && !c) return this._events = {}, this;
                g = a ? [a] : f.keys(this._events);
                j = 0;
                for (l = g.length; j < l; j++) if (a = g[j], d = this._events[a]) {
                    t = [];
                    if (b || c) {
                        k = 0;
                        for (h = d.length; k < h; k++) e = d[k], (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) && t.push(e)
                    }
                    this._events[a] = t
                }
                return this
            },
            trigger: function(a) {
                if (!this._events) return this;
                var b = u.call(arguments, 1);
                if (!q(this, "trigger", a, b)) return this;
                var c = this._events[a],
                    d = this._events.all;
                c && w(c, b);
                d && w(d, arguments);
                return this
            },
            listenTo: function(a, b, c) {
                var d = this._listeners || (this._listeners = {}),
                    e = a._listenerId || (a._listenerId = f.uniqueId("l"));
                d[e] = a;
                a.on(b, "object" === typeof b ? this : c, this);
                return this
            },
            stopListening: function(a, b, c) {
                var d = this._listeners;
                if (d) {
                    if (a) a.off(b, "object" === typeof b ? this : c, this), !b && !c && delete d[a._listenerId];
                    else {
                        "object" === typeof b && (c = this);
                        for (var e in d) d[e].off(b, c, this);
                        this._listeners = {}
                    }
                    return this
                }
            }
        };
    h.bind = h.on;
    h.unbind = h.off;
    f.extend(g, h);
    var r = g.Model = function(a, b) {
        var c, d = a || {};
        this.cid = f.uniqueId("c");
        this.attributes = {};
        b && b.collection && (this.collection = b.collection);
        b && b.parse && (d = this.parse(d, b) || {});
        if (c = f.result(this, "defaults")) d = f.defaults({},
        d, c);
        this.set(d, b);
        this.changed = {};
        this.initialize.apply(this, arguments)
    };
    f.extend(r.prototype, h, {
        changed: null,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return f.clone(this.attributes)
        },
        sync: function() {
            return g.sync.apply(this, arguments)
        },
        get: function(a) {
            return this.attributes[a]
        },
        escape: function(a) {
            return f.escape(this.get(a))
        },
        has: function(a) {
            return null != this.get(a)
        },
        set: function(a, b, c) {
            var d, e, g, p, j, l, k;
            if (null == a) return this;
            "object" === typeof a ? (e = a, c = b) : (e = {})[a] = b;
            c || (c = {});
            if (!this._validate(e, c)) return !1;
            g = c.unset;
            p = c.silent;
            a = [];
            j = this._changing;
            this._changing = !0;
            j || (this._previousAttributes = f.clone(this.attributes), this.changed = {});
            k = this.attributes;
            l = this._previousAttributes;
            this.idAttribute in e && (this.id = e[this.idAttribute]);
            for (d in e) b = e[d], f.isEqual(k[d], b) || a.push(d), f.isEqual(l[d], b) ? delete this.changed[d] : this.changed[d] = b, g ? delete k[d] : k[d] = b;
            if (!p) {
                a.length && (this._pending = !0);
                b = 0;
                for (d = a.length; b < d; b++) this.trigger("change:" + a[b], this, k[a[b]], c)
            }
            if (j) return this;
            if (!p) for (; this._pending;) this._pending = !1, this.trigger("change", this, c);
            this._changing = this._pending = !1;
            return this
        },
        unset: function(a, b) {
            return this.set(a, void 0, f.extend({}, b, {
                unset: !0
            }))
        },
        clear: function(a) {
            var b = {}, c;
            for (c in this.attributes) b[c] = void 0;
            return this.set(b, f.extend({}, a, {
                unset: !0
            }))
        },
        hasChanged: function(a) {
            return null == a ? !f.isEmpty(this.changed) : f.has(this.changed, a)
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? f.clone(this.changed) : !1;
            var b, c = !1,
                d = this._changing ? this._previousAttributes : this.attributes,
                e;
            for (e in a) if (!f.isEqual(d[e], b = a[e]))(c || (c = {}))[e] = b;
            return c
        },
        previous: function(a) {
            return null == a || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function() {
            return f.clone(this._previousAttributes)
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {};
            void 0 === a.parse && (a.parse = !0);
            var b = a.success;
            a.success = function(a, d, e) {
                if (!a.set(a.parse(d, e), e)) return !1;
                b && b(a, d, e)
            };
            return this.sync("read", this, a)
        },
        save: function(a, b, c) {
            var d, e, g = this.attributes;
            null == a || "object" === typeof a ? (d = a, c = b) : (d = {})[a] = b;
            if (d && (!c || !c.wait) && !this.set(d, c)) return !1;
            c = f.extend({
                validate: !0
            }, c);
            if (!this._validate(d, c)) return !1;
            d && c.wait && (this.attributes = f.extend({}, g, d));
            void 0 === c.parse && (c.parse = !0);
            e = c.success;
            c.success = function(a, b, c) {
                a.attributes = g;
                var k = a.parse(b, c);
                c.wait && (k = f.extend(d || {}, k));
                if (f.isObject(k) && !a.set(k, c)) return !1;
                e && e(a, b, c)
            };
            a = this.isNew() ? "create" : c.patch ? "patch" : "update";
            "patch" === a && (c.attrs = d);
            a = this.sync(a, this, c);
            d && c.wait && (this.attributes = g);
            return a
        },
        destroy: function(a) {
            a = a ? f.clone(a) : {};
            var b = this,
                c = a.success,
                d = function() {
                    b.trigger("destroy", b, b.collection, a)
                };
            a.success = function(a, b, e) {
                (e.wait || a.isNew()) && d();
                c && c(a, b, e)
            };
            if (this.isNew()) return a.success(this, null, a), !1;
            var e = this.sync("delete", this, a);
            a.wait || d();
            return e
        },
        url: function() {
            var a = f.result(this, "urlRoot") || f.result(this.collection, "url") || x();
            return this.isNew() ? a : a + ("/" === a.charAt(a.length - 1) ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(a) {
            return a
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return null == this.id
        },
        isValid: function(a) {
            return !this.validate || !this.validate(this.attributes, a)
        },
        _validate: function(a, b) {
            if (!b.validate || !this.validate) return !0;
            a = f.extend({}, this.attributes, a);
            var c = this.validationError = this.validate(a, b) || null;
            if (!c) return !0;
            this.trigger("invalid", this, c, b || {});
            return !1
        }
    });
    var s = g.Collection = function(a, b) {
        b || (b = {});
        b.model && (this.model = b.model);
        void 0 !== b.comparator && (this.comparator = b.comparator);
        this.models = [];
        this._reset();
        this.initialize.apply(this,
        arguments);
        a && this.reset(a, f.extend({
            silent: !0
        }, b))
    };
    f.extend(s.prototype, h, {
        model: r,
        initialize: function() {},
        toJSON: function(a) {
            return this.map(function(b) {
                return b.toJSON(a)
            })
        },
        sync: function() {
            return g.sync.apply(this, arguments)
        },
        add: function(a, b) {
            a = f.isArray(a) ? a.slice() : [a];
            b || (b = {});
            var c, d, e, g, p, j, l, k, h, m;
            l = [];
            k = b.at;
            h = this.comparator && null == k && !1 != b.sort;
            m = f.isString(this.comparator) ? this.comparator : null;
            c = 0;
            for (d = a.length; c < d; c++)(e = this._prepareModel(g = a[c], b)) ? (p = this.get(e)) ? b.merge && (p.set(g === e ? e.attributes : g, b), h && (!j && p.hasChanged(m)) && (j = !0)) : (l.push(e), e.on("all", this._onModelEvent, this), this._byId[e.cid] = e, null != e.id && (this._byId[e.id] = e)) : this.trigger("invalid", this, g, b);
            l.length && (h && (j = !0), this.length += l.length, null != k ? D.apply(this.models, [k, 0].concat(l)) : C.apply(this.models, l));
            j && this.sort({
                silent: !0
            });
            if (b.silent) return this;
            c = 0;
            for (d = l.length; c < d; c++)(e = l[c])
                .trigger("add", e, this, b);
            j && this.trigger("sort", this, b);
            return this
        },
        remove: function(a, b) {
            a = f.isArray(a) ? a.slice() : [a];
            b || (b = {});
            var c, d, e, g;
            c = 0;
            for (d = a.length; c < d; c++) if (g = this.get(a[c])) delete this._byId[g.id], delete this._byId[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
            return this
        },
        push: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, f.extend({
                at: this.length
            }, b));
            return a
        },
        pop: function(a) {
            var b = this.at(this.length - 1);
            this.remove(b, a);
            return b
        },
        unshift: function(a, b) {
            a = this._prepareModel(a, b);
            this.add(a, f.extend({
                at: 0
            },
            b));
            return a
        },
        shift: function(a) {
            var b = this.at(0);
            this.remove(b, a);
            return b
        },
        slice: function(a, b) {
            return this.models.slice(a, b)
        },
        get: function(a) {
            if (null != a) return this._idAttr || (this._idAttr = this.model.prototype.idAttribute), this._byId[a.id || a.cid || a[this._idAttr] || a]
        },
        at: function(a) {
            return this.models[a]
        },
        where: function(a) {
            return f.isEmpty(a) ? [] : this.filter(function(b) {
                for (var c in a) if (a[c] !== b.get(c)) return !1;
                return !0
            })
        },
        sort: function(a) {
            if (!this.comparator) throw Error("Cannot sort a set without a comparator");
            a || (a = {});
            f.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(f.bind(this.comparator, this));
            a.silent || this.trigger("sort", this, a);
            return this
        },
        pluck: function(a) {
            return f.invoke(this.models, "get", a)
        },
        update: function(a, b) {
            b = f.extend({
                add: !0,
                merge: !0,
                remove: !0
            }, b);
            b.parse && (a = this.parse(a, b));
            var c, d, e, g, h = [],
                j = [],
                l = {};
            f.isArray(a) || (a = a ? [a] : []);
            if (b.add && !b.remove) return this.add(a, b);
            d = 0;
            for (e = a.length; d < e; d++) c = a[d], g = this.get(c),
            b.remove && g && (l[g.cid] = !0), (b.add && !g || b.merge && g) && h.push(c);
            if (b.remove) {
                d = 0;
                for (e = this.models.length; d < e; d++) c = this.models[d], l[c.cid] || j.push(c)
            }
            j.length && this.remove(j, b);
            h.length && this.add(h, b);
            return this
        },
        reset: function(a, b) {
            b || (b = {});
            b.parse && (a = this.parse(a, b));
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            b.previousModels = this.models.slice();
            this._reset();
            a && this.add(a, f.extend({
                silent: !0
            }, b));
            b.silent || this.trigger("reset", this, b);
            return this
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {};
            void 0 === a.parse && (a.parse = !0);
            var b = a.success;
            a.success = function(a, d, e) {
                a[e.update ? "update" : "reset"](d, e);
                b && b(a, d, e)
            };
            return this.sync("read", this, a)
        },
        create: function(a, b) {
            b = b ? f.clone(b) : {};
            if (!(a = this._prepareModel(a, b))) return !1;
            b.wait || this.add(a, b);
            var c = this,
                d = b.success;
            b.success = function(a, b, f) {
                f.wait && c.add(a, f);
                d && d(a, b, f)
            };
            a.save(null, b);
            return a
        },
        parse: function(a) {
            return a
        },
        clone: function() {
            return new this.constructor(this.models)
        },
        _reset: function() {
            this.length = 0;
            this.models.length = 0;
            this._byId = {}
        },
        _prepareModel: function(a, b) {
            if (a instanceof r) return a.collection || (a.collection = this), a;
            b || (b = {});
            b.collection = this;
            var c = new this.model(a, b);
            return !c._validate(a, b) ? !1 : c
        },
        _removeReference: function(a) {
            this === a.collection && delete a.collection;
            a.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(a, b, c, d) {
            ("add" === a || "remove" === a) && c !== this || ("destroy" === a && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], null != b.id && (this._byId[b.id] = b)), this.trigger.apply(this, arguments))
        },
        sortedIndex: function(a, b, c) {
            b || (b = this.comparator);
            var d = f.isFunction(b) ? b : function(a) {
                    return a.get(b)
                };
            return f.sortedIndex(this.models, a, d, c)
        }
    });
    f.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "), function(a) {
        s.prototype[a] = function() {
            var b = u.call(arguments);
            b.unshift(this.models);
            return f[a].apply(f, b)
        }
    });
    f.each(["groupBy", "countBy", "sortBy"], function(a) {
        s.prototype[a] = function(b, c) {
            var d = f.isFunction(b) ? b : function(a) {
                    return a.get(b)
                };
            return f[a](this.models, d, c)
        }
    });
    var y = g.Router = function(a) {
        a || (a = {});
        a.routes && (this.routes = a.routes);
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    }, E = /\((.*?)\)/g,
        F = /(\(\?)?:\w+/g,
        G = /\*\w+/g,
        H = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    f.extend(y.prototype, h, {
        initialize: function() {},
        route: function(a, b, c) {
            f.isRegExp(a) || (a = this._routeToRegExp(a));
            c || (c = this[b]);
            g.history.route(a, f.bind(function(d) {
                d = this._extractParameters(a, d);
                c && c.apply(this, d);
                this.trigger.apply(this, ["route:" + b].concat(d));
                this.trigger("route", b, d);
                g.history.trigger("route", this, b, d)
            }, this));
            return this
        },
        navigate: function(a, b) {
            g.history.navigate(a, b);
            return this
        },
        _bindRoutes: function() {
            if (this.routes) for (var a, b = f.keys(this.routes); null != (a = b.pop());) this.route(a, this.routes[a])
        },
        _routeToRegExp: function(a) {
            a = a.replace(H, "\\$&")
                .replace(E, "(?:$1)?")
                .replace(F,

            function(a, c) {
                return c ? a : "([^/]+)"
            })
                .replace(G, "(.*?)");
            return RegExp("^" + a + "$")
        },
        _extractParameters: function(a, b) {
            return a.exec(b)
                .slice(1)
        }
    });
    var m = g.History = function() {
        this.handlers = [];
        f.bindAll(this, "checkUrl");
        "undefined" !== typeof window && (this.location = window.location, this.history = window.history)
    }, z = /^[#\/]|\s+$/g,
        I = /^\/+|\/+$/g,
        J = /msie [\w.]+/,
        K = /\/$/;
    m.started = !1;
    f.extend(m.prototype, h, {
        interval: 50,
        getHash: function(a) {
            return (a = (a || this)
                .location.href.match(/#(.*)$/)) ? a[1] : ""
        },
        getFragment: function(a,
        b) {
            if (null == a) if (this._hasPushState || !this._wantsHashChange || b) {
                a = this.location.pathname;
                var c = this.root.replace(K, "");
                a.indexOf(c) || (a = a.substr(c.length))
            } else a = this.getHash();
            return a.replace(z, "")
        },
        start: function(a) {
            if (m.started) throw Error("Backbone.history has already been started");
            m.started = !0;
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a);
            this.root = this.options.root;
            this._wantsHashChange = !1 !== this.options.hashChange;
            this._wantsPushState = !! this.options.pushState;
            this._hasPushState = !(!this.options.pushState || !this.history || !this.history.pushState);
            a = this.getFragment();
            var b = document.documentMode,
                b = J.exec(navigator.userAgent.toLowerCase()) && (!b || 7 >= b);
            this.root = ("/" + this.root + "/")
                .replace(I, "/");
            b && this._wantsHashChange && (this.iframe = g.$('<iframe src="javascript:0" tabindex="-1" />')
                .hide()
                .appendTo("body")[0].contentWindow, this.navigate(a));
            if (this._hasPushState) g.$(window)
                .on("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !b) g.$(window)
                .on("hashchange", this.checkUrl);
            else this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
            this.fragment = a;
            a = this.location;
            b = a.pathname.replace(/[^\/]$/, "$&/") === this.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !b) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
            this._wantsPushState && (this._hasPushState && b && a.hash) && (this.fragment = this.getHash()
                .replace(z, ""), this.history.replaceState({}, document.title,
            this.root + this.fragment + a.search));
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            g.$(window)
                .off("popstate", this.checkUrl)
                .off("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            m.started = !1
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function() {
            var a = this.getFragment();
            a === this.fragment && this.iframe && (a = this.getFragment(this.getHash(this.iframe)));
            if (a === this.fragment) return !1;
            this.iframe && this.navigate(a);
            this.loadUrl() || this.loadUrl(this.getHash())
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a);
            return f.any(this.handlers, function(a) {
                if (a.route.test(b)) return a.callback(b), !0
            })
        },
        navigate: function(a, b) {
            if (!m.started) return !1;
            if (!b || !0 === b) b = {
                trigger: b
            };
            a = this.getFragment(a || "");
            if (this.fragment !== a) {
                this.fragment = a;
                var c = this.root + a;
                if (this._hasPushState) this.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c);
                else if (this._wantsHashChange) this._updateHash(this.location, a, b.replace), this.iframe && a !== this.getFragment(this.getHash(this.iframe)) && (b.replace || this.iframe.document.open()
                    .close(), this._updateHash(this.iframe.location, a, b.replace));
                else return this.location.assign(c);
                b.trigger && this.loadUrl(a)
            }
        },
        _updateHash: function(a, b, c) {
            c ? (c = a.href.replace(/(javascript:|#).*$/, ""), a.replace(c + "#" + b)) : a.hash = "#" + b
        }
    });
    g.history = new m;
    var A = g.View = function(a) {
        this.cid = f.uniqueId("view");
        this._configure(a || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    }, L = /^(\S+)\s*(.*)$/,
        M = "model collection el id attributes className tagName events".split(" ");
    f.extend(A.prototype, h, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            this.stopListening();
            return this
        },
        setElement: function(a, b) {
            this.$el && this.undelegateEvents();
            this.$el = a instanceof g.$ ? a : g.$(a);
            this.el = this.$el[0];
            !1 !== b && this.delegateEvents();
            return this
        },
        delegateEvents: function(a) {
            if (a || (a = f.result(this, "events"))) {
                this.undelegateEvents();
                for (var b in a) {
                    var c = a[b];
                    f.isFunction(c) || (c = this[a[b]]);
                    if (!c) throw Error('Method "' + a[b] + '" does not exist');
                    var d = b.match(L),
                        e = d[1],
                        d = d[2],
                        c = f.bind(c, this),
                        e = e + (".delegateEvents" + this.cid);
                    if ("" === d) this.$el.on(e, c);
                    else this.$el.on(e, d, c)
                }
            }
        },
        undelegateEvents: function() {
            this.$el.off(".delegateEvents" + this.cid)
        },
        _configure: function(a) {
            this.options && (a = f.extend({}, f.result(this, "options"), a));
            f.extend(this, f.pick(a, M));
            this.options = a
        },
        _ensureElement: function() {
            if (this.el) this.setElement(f.result(this, "el"), !1);
            else {
                var a = f.extend({}, f.result(this, "attributes"));
                this.id && (a.id = f.result(this, "id"));
                this.className && (a["class"] = f.result(this, "className"));
                a = g.$("<" + f.result(this, "tagName") + ">")
                    .attr(a);
                this.setElement(a, !1)
            }
        }
    });
    var N = {
        create: "POST",
        update: "PUT",
        patch: "PATCH",
        "delete": "DELETE",
        read: "GET"
    };
    g.sync = function(a, b, c) {
        var d = N[a];
        f.defaults(c || (c = {}), {
            emulateHTTP: g.emulateHTTP,
            emulateJSON: g.emulateJSON
        });
        var e = {
            type: d,
            dataType: "json"
        };
        c.url || (e.url = f.result(b, "url") || x());
        if (null == c.data && b && ("create" === a || "update" === a || "patch" === a)) e.contentType = "application/json",
        e.data = JSON.stringify(c.attrs || b.toJSON(c));
        c.emulateJSON && (e.contentType = "application/x-www-form-urlencoded", e.data = e.data ? {
            model: e.data
        } : {});
        if (c.emulateHTTP && ("PUT" === d || "DELETE" === d || "PATCH" === d)) {
            e.type = "POST";
            c.emulateJSON && (e.data._method = d);
            var h = c.beforeSend;
            c.beforeSend = function(a) {
                a.setRequestHeader("X-HTTP-Method-Override", d);
                if (h) return h.apply(this, arguments)
            }
        }
        "GET" !== e.type && !c.emulateJSON && (e.processData = !1);
        var m = c.success;
        c.success = function(a) {
            m && m(b, a, c);
            b.trigger("sync", b, a, c)
        };
        var j = c.error;
        c.error = function(a) {
            j && j(b, a, c);
            b.trigger("error", b, a, c)
        };
        a = c.xhr = g.ajax(f.extend(e, c));
        b.trigger("request", b, a, c);
        return a
    };
    g.ajax = function() {
        return g.$.ajax.apply(g.$, arguments)
    };
    r.extend = s.extend = y.extend = A.extend = m.extend = function(a, b) {
        var c = this,
            d;
        d = a && f.has(a, "constructor") ? a.constructor : function() {
            return c.apply(this, arguments)
        };
        f.extend(d, c, b);
        var e = function() {
            this.constructor = d
        };
        e.prototype = c.prototype;
        d.prototype = new e;
        a && f.extend(d.prototype, a);
        d.__super__ = c.prototype;
        return d
    };
    var x = function() {
        throw Error('A "url" property or function must be specified');
    }
})
    .call(this);