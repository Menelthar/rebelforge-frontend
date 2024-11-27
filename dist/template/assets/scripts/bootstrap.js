
"use strict";
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Popper = {})
}(this, (function(e) {
    function t(e) {
        return {
            width: (e = e.getBoundingClientRect()).width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top
        }
    }

    function n(e) {
        return "[object Window]" !== e.toString() ? (e = e.ownerDocument) && e.defaultView || window : e
    }

    function r(e) {
        return {
            scrollLeft: (e = n(e)).pageXOffset,
            scrollTop: e.pageYOffset
        }
    }

    function o(e) {
        return e instanceof n(e).Element || e instanceof Element
    }

    function i(e) {
        return e instanceof n(e).HTMLElement || e instanceof HTMLElement
    }

    function a(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }

    function s(e) {
        return ((o(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }

    function f(e) {
        return t(s(e)).left + r(e).scrollLeft
    }

    function c(e) {
        return n(e).getComputedStyle(e)
    }

    function p(e) {
        return e = c(e), /auto|scroll|overlay|hidden/.test(e.overflow + e.overflowY + e.overflowX)
    }

    function l(e, o, c) {
        void 0 === c && (c = !1);
        var l = s(o);
        e = t(e);
        var u = i(o),
            d = {
                scrollLeft: 0,
                scrollTop: 0
            },
            m = {
                x: 0,
                y: 0
            };
        return (u || !u && !c) && (("body" !== a(o) || p(l)) && (d = o !== n(o) && i(o) ? {
            scrollLeft: o.scrollLeft,
            scrollTop: o.scrollTop
        } : r(o)), i(o) ? ((m = t(o)).x += o.clientLeft, m.y += o.clientTop) : l && (m.x = f(l))), {
            x: e.left + d.scrollLeft - m.x,
            y: e.top + d.scrollTop - m.y,
            width: e.width,
            height: e.height
        }
    }

    function u(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }

    function d(e) {
        return "html" === a(e) ? e : e.assignedSlot || e.parentNode || e.host || s(e)
    }

    function m(e, t) {
        void 0 === t && (t = []);
        var r = function e(t) {
            return 0 <= ["html", "body", "#document"].indexOf(a(t)) ? t.ownerDocument.body : i(t) && p(t) ? t : e(d(t))
        }(e);
        e = "body" === a(r);
        var o = n(r);
        return r = e ? [o].concat(o.visualViewport || [], p(r) ? r : []) : r, t = t.concat(r), e ? t : t.concat(m(d(r)))
    }

    function h(e) {
        if (!i(e) || "fixed" === c(e).position) return null;
        if (e = e.offsetParent) {
            var t = s(e);
            if ("body" === a(e) && "static" === c(e).position && "static" !== c(t).position) return t
        }
        return e
    }

    function g(e) {
        for (var t = n(e), r = h(e); r && 0 <= ["table", "td", "th"].indexOf(a(r)) && "static" === c(r).position;) r = h(r);
        if (r && "body" === a(r) && "static" === c(r).position) return t;
        if (!r) e: {
            for (e = d(e); i(e) && 0 > ["html", "body"].indexOf(a(e));) {
                if ("none" !== (r = c(e)).transform || "none" !== r.perspective || r.willChange && "auto" !== r.willChange) {
                    r = e;
                    break e
                }
                e = e.parentNode
            }
            r = null
        }
        return r || t
    }

    function v(e) {
        var t = new Map,
            n = new Set,
            r = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        })), e.forEach((function(e) {
            n.has(e.name) || function e(o) {
                n.add(o.name), [].concat(o.requires || [], o.requiresIfExists || []).forEach((function(r) {
                    n.has(r) || (r = t.get(r)) && e(r)
                })), r.push(o)
            }(e)
        })), r
    }

    function b(e) {
        var t;
        return function() {
            return t || (t = new Promise((function(n) {
                Promise.resolve().then((function() {
                    t = void 0, n(e())
                }))
            }))), t
        }
    }

    function y(e) {
        return e.split("-")[0]
    }

    function O(e, t) {
        var r, o = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if ((r = o) && (r = o instanceof(r = n(o).ShadowRoot) || o instanceof ShadowRoot), r)
            do {
                if (t && e.isSameNode(t)) return !0;
                t = t.parentNode || t.host
            } while (t);
        return !1
    }

    function w(e) {
        return Object.assign(Object.assign({}, e), {}, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }

    function x(e, o) {
        if ("viewport" === o) {
            o = n(e);
            var a = s(e);
            o = o.visualViewport;
            var p = a.clientWidth;
            a = a.clientHeight;
            var l = 0,
                u = 0;
            o && (p = o.width, a = o.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (l = o.offsetLeft, u = o.offsetTop)), e = w(e = {
                width: p,
                height: a,
                x: l + f(e),
                y: u
            })
        } else i(o) ? ((e = t(o)).top += o.clientTop, e.left += o.clientLeft, e.bottom = e.top + o.clientHeight, e.right = e.left + o.clientWidth, e.width = o.clientWidth, e.height = o.clientHeight, e.x = e.left, e.y = e.top) : (u = s(e), e = s(u), l = r(u), o = u.ownerDocument.body, p = Math.max(e.scrollWidth, e.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Math.max(e.scrollHeight, e.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), u = -l.scrollLeft + f(u), l = -l.scrollTop, "rtl" === c(o || e).direction && (u += Math.max(e.clientWidth, o ? o.clientWidth : 0) - p), e = w({
            width: p,
            height: a,
            x: u,
            y: l
        }));
        return e
    }

    function j(e, t, n) {
        return t = "clippingParents" === t ? function(e) {
            var t = m(d(e)),
                n = 0 <= ["absolute", "fixed"].indexOf(c(e).position) && i(e) ? g(e) : e;
            return o(n) ? t.filter((function(e) {
                return o(e) && O(e, n) && "body" !== a(e)
            })) : []
        }(e) : [].concat(t), (n = (n = [].concat(t, [n])).reduce((function(t, n) {
            return n = x(e, n), t.top = Math.max(n.top, t.top), t.right = Math.min(n.right, t.right), t.bottom = Math.min(n.bottom, t.bottom), t.left = Math.max(n.left, t.left), t
        }), x(e, n[0]))).width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n
    }

    function M(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y"
    }

    function E(e) {
        var t = e.reference,
            n = e.element,
            r = (e = e.placement) ? y(e) : null;
        e = e ? e.split("-")[1] : null;
        var o = t.x + t.width / 2 - n.width / 2,
            i = t.y + t.height / 2 - n.height / 2;
        switch (r) {
            case "top":
                o = {
                    x: o,
                    y: t.y - n.height
                };
                break;
            case "bottom":
                o = {
                    x: o,
                    y: t.y + t.height
                };
                break;
            case "right":
                o = {
                    x: t.x + t.width,
                    y: i
                };
                break;
            case "left":
                o = {
                    x: t.x - n.width,
                    y: i
                };
                break;
            default:
                o = {
                    x: t.x,
                    y: t.y
                }
        }
        if (null != (r = r ? M(r) : null)) switch (i = "y" === r ? "height" : "width", e) {
            case "start":
                o[r] -= t[i] / 2 - n[i] / 2;
                break;
            case "end":
                o[r] += t[i] / 2 - n[i] / 2
        }
        return o
    }

    function D(e) {
        return Object.assign(Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }), e)
    }

    function P(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e, t
        }), {})
    }

    function L(e, n) {
        void 0 === n && (n = {});
        var r = n;
        n = void 0 === (n = r.placement) ? e.placement : n;
        var i = r.boundary,
            a = void 0 === i ? "clippingParents" : i,
            f = void 0 === (i = r.rootBoundary) ? "viewport" : i;
        i = void 0 === (i = r.elementContext) ? "popper" : i;
        var c = r.altBoundary,
            p = void 0 !== c && c;
        r = D("number" != typeof(r = void 0 === (r = r.padding) ? 0 : r) ? r : P(r, T));
        var l = e.elements.reference;
        c = e.rects.popper, a = j(o(p = e.elements[p ? "popper" === i ? "reference" : "popper" : i]) ? p : p.contextElement || s(e.elements.popper), a, f), p = E({
            reference: f = t(l),
            element: c,
            strategy: "absolute",
            placement: n
        }), c = w(Object.assign(Object.assign({}, c), p)), f = "popper" === i ? c : f;
        var u = {
            top: a.top - f.top + r.top,
            bottom: f.bottom - a.bottom + r.bottom,
            left: a.left - f.left + r.left,
            right: f.right - a.right + r.right
        };
        if (e = e.modifiersData.offset, "popper" === i && e) {
            var d = e[n];
            Object.keys(u).forEach((function(e) {
                var t = 0 <= ["right", "bottom"].indexOf(e) ? 1 : -1,
                    n = 0 <= ["top", "bottom"].indexOf(e) ? "y" : "x";
                u[e] += d[n] * t
            }))
        }
        return u
    }

    function k() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }))
    }

    function B(e) {
        void 0 === e && (e = {});
        var t = e.defaultModifiers,
            n = void 0 === t ? [] : t,
            r = void 0 === (e = e.defaultOptions) ? V : e;
        return function(e, t, i) {
            function a() {
                f.forEach((function(e) {
                    return e()
                })), f = []
            }
            void 0 === i && (i = r);
            var s = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign(Object.assign({}, V), r),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                },
                f = [],
                c = !1,
                p = {
                    state: s,
                    setOptions: function(i) {
                        return a(), s.options = Object.assign(Object.assign(Object.assign({}, r), s.options), i), s.scrollParents = {
                            reference: o(e) ? m(e) : e.contextElement ? m(e.contextElement) : [],
                            popper: m(t)
                        }, i = function(e) {
                            var t = v(e);
                            return N.reduce((function(e, n) {
                                return e.concat(t.filter((function(e) {
                                    return e.phase === n
                                })))
                            }), [])
                        }(function(e) {
                            var t = e.reduce((function(e, t) {
                                var n = e[t.name];
                                return e[t.name] = n ? Object.assign(Object.assign(Object.assign({}, n), t), {}, {
                                    options: Object.assign(Object.assign({}, n.options), t.options),
                                    data: Object.assign(Object.assign({}, n.data), t.data)
                                }) : t, e
                            }), {});
                            return Object.keys(t).map((function(e) {
                                return t[e]
                            }))
                        }([].concat(n, s.options.modifiers))), s.orderedModifiers = i.filter((function(e) {
                            return e.enabled
                        })), s.orderedModifiers.forEach((function(e) {
                            var t = e.name,
                                n = e.options;
                            n = void 0 === n ? {} : n, "function" == typeof(e = e.effect) && (t = e({
                                state: s,
                                name: t,
                                instance: p,
                                options: n
                            }), f.push(t || function() {}))
                        })), p.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = s.elements,
                                t = e.reference;
                            if (k(t, e = e.popper))
                                for (s.rects = {
                                        reference: l(t, g(e), "fixed" === s.options.strategy),
                                        popper: u(e)
                                    }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                        return s.modifiersData[e.name] = Object.assign({}, e.data)
                                    })), t = 0; t < s.orderedModifiers.length; t++)
                                    if (!0 === s.reset) s.reset = !1, t = -1;
                                    else {
                                        var n = s.orderedModifiers[t];
                                        e = n.fn;
                                        var r = n.options;
                                        r = void 0 === r ? {} : r, n = n.name, "function" == typeof e && (s = e({
                                            state: s,
                                            options: r,
                                            name: n,
                                            instance: p
                                        }) || s)
                                    }
                        }
                    },
                    update: b((function() {
                        return new Promise((function(e) {
                            p.forceUpdate(), e(s)
                        }))
                    })),
                    destroy: function() {
                        a(), c = !0
                    }
                };
            return k(e, t) ? (p.setOptions(i).then((function(e) {
                !c && i.onFirstUpdate && i.onFirstUpdate(e)
            })), p) : p
        }
    }

    function W(e) {
        var t, r = e.popper,
            o = e.popperRect,
            i = e.placement,
            a = e.offsets,
            f = e.position,
            c = e.gpuAcceleration,
            p = e.adaptive;
        e.roundOffsets ? (e = window.devicePixelRatio || 1, e = {
            x: Math.round(a.x * e) / e || 0,
            y: Math.round(a.y * e) / e || 0
        }) : e = a;
        var l = e;
        e = void 0 === (e = l.x) ? 0 : e, l = void 0 === (l = l.y) ? 0 : l;
        var u = a.hasOwnProperty("x");
        a = a.hasOwnProperty("y");
        var d, m = "left",
            h = "top",
            v = window;
        if (p) {
            var b = g(r);
            b === n(r) && (b = s(r)), "top" === i && (h = "bottom", l -= b.clientHeight - o.height, l *= c ? 1 : -1), "left" === i && (m = "right", e -= b.clientWidth - o.width, e *= c ? 1 : -1)
        }
        return r = Object.assign({
            position: f
        }, p && z), c ? Object.assign(Object.assign({}, r), {}, ((d = {})[h] = a ? "0" : "", d[m] = u ? "0" : "", d.transform = 2 > (v.devicePixelRatio || 1) ? "translate(" + e + "px, " + l + "px)" : "translate3d(" + e + "px, " + l + "px, 0)", d)) : Object.assign(Object.assign({}, r), {}, ((t = {})[h] = a ? l + "px" : "", t[m] = u ? e + "px" : "", t.transform = "", t))
    }

    function A(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return G[e]
        }))
    }

    function H(e) {
        return e.replace(/start|end/g, (function(e) {
            return J[e]
        }))
    }

    function R(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }), {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }

    function S(e) {
        return ["top", "right", "bottom", "left"].some((function(t) {
            return 0 <= e[t]
        }))
    }
    var T = ["top", "bottom", "right", "left"],
        q = T.reduce((function(e, t) {
            return e.concat([t + "-start", t + "-end"])
        }), []),
        C = [].concat(T, ["auto"]).reduce((function(e, t) {
            return e.concat([t, t + "-start", t + "-end"])
        }), []),
        N = "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(" "),
        V = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        },
        I = {
            passive: !0
        },
        _ = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state,
                    r = e.instance,
                    o = (e = e.options).scroll,
                    i = void 0 === o || o,
                    a = void 0 === (e = e.resize) || e,
                    s = n(t.elements.popper),
                    f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return i && f.forEach((function(e) {
                        e.addEventListener("scroll", r.update, I)
                    })), a && s.addEventListener("resize", r.update, I),
                    function() {
                        i && f.forEach((function(e) {
                            e.removeEventListener("scroll", r.update, I)
                        })), a && s.removeEventListener("resize", r.update, I)
                    }
            },
            data: {}
        },
        U = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state;
                t.modifiersData[e.name] = E({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        },
        z = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        },
        F = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = void 0 === (e = n.gpuAcceleration) || e;
                var r = n.adaptive;
                r = void 0 === r || r, n = void 0 === (n = n.roundOffsets) || n, e = {
                    placement: y(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: e
                }, null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign(Object.assign({}, t.styles.popper), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: r,
                    roundOffsets: n
                })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign(Object.assign({}, t.styles.arrow), W(Object.assign(Object.assign({}, e), {}, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: n
                })))), t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        },
        X = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach((function(e) {
                    var n = t.styles[e] || {},
                        r = t.attributes[e] || {},
                        o = t.elements[e];
                    i(o) && a(o) && (Object.assign(o.style, n), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                    })))
                }))
            },
            effect: function(e) {
                var t = e.state,
                    n = {
                        popper: {
                            position: t.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                return Object.assign(t.elements.popper.style, n.popper), t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
                    function() {
                        Object.keys(t.elements).forEach((function(e) {
                            var r = t.elements[e],
                                o = t.attributes[e] || {};
                            e = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                                return e[t] = "", e
                            }), {}), i(r) && a(r) && (Object.assign(r.style, e), Object.keys(o).forEach((function(e) {
                                r.removeAttribute(e)
                            })))
                        }))
                    }
            },
            requires: ["computeStyles"]
        },
        Y = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state,
                    n = e.name,
                    r = void 0 === (e = e.options.offset) ? [0, 0] : e,
                    o = (e = C.reduce((function(e, n) {
                        var o = t.rects,
                            i = y(n),
                            a = 0 <= ["left", "top"].indexOf(i) ? -1 : 1,
                            s = "function" == typeof r ? r(Object.assign(Object.assign({}, o), {}, {
                                placement: n
                            })) : r;
                        return o = (o = s[0]) || 0, s = ((s = s[1]) || 0) * a, i = 0 <= ["left", "right"].indexOf(i) ? {
                            x: s,
                            y: o
                        } : {
                            x: o,
                            y: s
                        }, e[n] = i, e
                    }), {}))[t.placement],
                    i = o.x;
                o = o.y, null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += o), t.modifiersData[n] = e
            }
        },
        G = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        },
        J = {
            start: "end",
            end: "start"
        },
        K = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                if (e = e.name, !t.modifiersData[e]._skip) {
                    var r = n.mainAxis;
                    r = void 0 === r || r;
                    var o = n.altAxis;
                    o = void 0 === o || o;
                    var i = n.fallbackPlacements,
                        a = n.padding,
                        s = n.boundary,
                        f = n.rootBoundary,
                        c = n.altBoundary,
                        p = n.flipVariations,
                        l = void 0 === p || p,
                        u = n.allowedAutoPlacements;
                    p = y(n = t.options.placement), i = i || (p !== n && l ? function(e) {
                        if ("auto" === y(e)) return [];
                        var t = A(e);
                        return [H(e), t, H(t)]
                    }(n) : [A(n)]);
                    var d = [n].concat(i).reduce((function(e, n) {
                        return e.concat("auto" === y(n) ? function(e, t) {
                            void 0 === t && (t = {});
                            var n = t.boundary,
                                r = t.rootBoundary,
                                o = t.padding,
                                i = t.flipVariations,
                                a = t.allowedAutoPlacements,
                                s = void 0 === a ? C : a,
                                f = t.placement.split("-")[1];
                            0 === (i = (t = f ? i ? q : q.filter((function(e) {
                                return e.split("-")[1] === f
                            })) : T).filter((function(e) {
                                return 0 <= s.indexOf(e)
                            }))).length && (i = t);
                            var c = i.reduce((function(t, i) {
                                return t[i] = L(e, {
                                    placement: i,
                                    boundary: n,
                                    rootBoundary: r,
                                    padding: o
                                })[y(i)], t
                            }), {});
                            return Object.keys(c).sort((function(e, t) {
                                return c[e] - c[t]
                            }))
                        }(t, {
                            placement: n,
                            boundary: s,
                            rootBoundary: f,
                            padding: a,
                            flipVariations: l,
                            allowedAutoPlacements: u
                        }) : n)
                    }), []);
                    n = t.rects.reference, i = t.rects.popper;
                    var m = new Map;
                    p = !0;
                    for (var h = d[0], g = 0; g < d.length; g++) {
                        var v = d[g],
                            b = y(v),
                            O = "start" === v.split("-")[1],
                            w = 0 <= ["top", "bottom"].indexOf(b),
                            x = w ? "width" : "height",
                            j = L(t, {
                                placement: v,
                                boundary: s,
                                rootBoundary: f,
                                altBoundary: c,
                                padding: a
                            });
                        if (O = w ? O ? "right" : "left" : O ? "bottom" : "top", n[x] > i[x] && (O = A(O)), x = A(O), w = [], r && w.push(0 >= j[b]), o && w.push(0 >= j[O], 0 >= j[x]), w.every((function(e) {
                                return e
                            }))) {
                            h = v, p = !1;
                            break
                        }
                        m.set(v, w)
                    }
                    if (p)
                        for (r = function(e) {
                                var t = d.find((function(t) {
                                    if (t = m.get(t)) return t.slice(0, e).every((function(e) {
                                        return e
                                    }))
                                }));
                                if (t) return h = t, "break"
                            }, o = l ? 3 : 1; 0 < o && "break" !== r(o); o--);
                    t.placement !== h && (t.modifiersData[e]._skip = !0, t.placement = h, t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        },
        Q = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.mainAxis,
                    o = void 0 === r || r;
                r = void 0 !== (r = n.altAxis) && r;
                var i = n.tether;
                i = void 0 === i || i;
                var a = n.tetherOffset,
                    s = void 0 === a ? 0 : a;
                n = L(t, {
                    boundary: n.boundary,
                    rootBoundary: n.rootBoundary,
                    padding: n.padding,
                    altBoundary: n.altBoundary
                }), a = y(t.placement);
                var f = t.placement.split("-")[1],
                    c = !f,
                    p = M(a);
                a = "x" === p ? "y" : "x";
                var l = t.modifiersData.popperOffsets,
                    d = t.rects.reference,
                    m = t.rects.popper,
                    h = "function" == typeof s ? s(Object.assign(Object.assign({}, t.rects), {}, {
                        placement: t.placement
                    })) : s;
                if (s = {
                        x: 0,
                        y: 0
                    }, l) {
                    if (o) {
                        var v = "y" === p ? "top" : "left",
                            b = "y" === p ? "bottom" : "right",
                            O = "y" === p ? "height" : "width";
                        o = l[p];
                        var w = l[p] + n[v],
                            x = l[p] - n[b],
                            j = i ? -m[O] / 2 : 0,
                            E = "start" === f ? d[O] : m[O];
                        f = "start" === f ? -m[O] : -d[O], m = t.elements.arrow, m = i && m ? u(m) : {
                            width: 0,
                            height: 0
                        };
                        var D = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        };
                        v = D[v], b = D[b], m = Math.max(0, Math.min(d[O], m[O])), E = c ? d[O] / 2 - j - m - v - h : E - m - v - h, c = c ? -d[O] / 2 + j + m + b + h : f + m + b + h, h = t.elements.arrow && g(t.elements.arrow), d = t.modifiersData.offset ? t.modifiersData.offset[t.placement][p] : 0, h = l[p] + E - d - (h ? "y" === p ? h.clientTop || 0 : h.clientLeft || 0 : 0), c = l[p] + c - d, i = Math.max(i ? Math.min(w, h) : w, Math.min(o, i ? Math.max(x, c) : x)), l[p] = i, s[p] = i - o
                    }
                    r && (r = l[a], i = Math.max(r + n["x" === p ? "top" : "left"], Math.min(r, r - n["x" === p ? "bottom" : "right"])), l[a] = i, s[a] = i - r), t.modifiersData[e] = s
                }
            },
            requiresIfExists: ["offset"]
        },
        Z = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, n = e.state;
                e = e.name;
                var r = n.elements.arrow,
                    o = n.modifiersData.popperOffsets,
                    i = y(n.placement),
                    a = M(i);
                if (i = 0 <= ["left", "right"].indexOf(i) ? "height" : "width", r && o) {
                    var s = n.modifiersData[e + "#persistent"].padding,
                        f = u(r),
                        c = "y" === a ? "top" : "left",
                        p = "y" === a ? "bottom" : "right",
                        l = n.rects.reference[i] + n.rects.reference[a] - o[a] - n.rects.popper[i];
                    o = o[a] - n.rects.reference[a], l = (r = (r = g(r)) ? "y" === a ? r.clientHeight || 0 : r.clientWidth || 0 : 0) / 2 - f[i] / 2 + (l / 2 - o / 2), i = Math.max(s[c], Math.min(l, r - f[i] - s[p])), n.modifiersData[e] = ((t = {})[a] = i, t.centerOffset = i - l, t)
                }
            },
            effect: function(e) {
                var t = e.state,
                    n = e.options;
                e = e.name;
                var r = n.element;
                if (r = void 0 === r ? "[data-popper-arrow]" : r, n = void 0 === (n = n.padding) ? 0 : n, null != r) {
                    if ("string" == typeof r && !(r = t.elements.popper.querySelector(r))) return;
                    O(t.elements.popper, r) && (t.elements.arrow = r, t.modifiersData[e + "#persistent"] = {
                        padding: D("number" != typeof n ? n : P(n, T))
                    })
                }
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        },
        $ = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state;
                e = e.name;
                var n = t.rects.reference,
                    r = t.rects.popper,
                    o = t.modifiersData.preventOverflow,
                    i = L(t, {
                        elementContext: "reference"
                    }),
                    a = L(t, {
                        altBoundary: !0
                    });
                n = R(i, n), r = R(a, r, o), o = S(n), a = S(r), t.modifiersData[e] = {
                    referenceClippingOffsets: n,
                    popperEscapeOffsets: r,
                    isReferenceHidden: o,
                    hasPopperEscaped: a
                }, t.attributes.popper = Object.assign(Object.assign({}, t.attributes.popper), {}, {
                    "data-popper-reference-hidden": o,
                    "data-popper-escaped": a
                })
            }
        },
        ee = B({
            defaultModifiers: [_, U, F, X]
        }),
        te = [_, U, F, X, Y, K, Q, Z, $],
        ne = B({
            defaultModifiers: te
        });
    e.applyStyles = X, e.arrow = Z, e.computeStyles = F, e.createPopper = ne, e.createPopperLite = ee, e.defaultModifiers = te, e.detectOverflow = L, e.eventListeners = _, e.flip = K, e.hide = $, e.offset = Y, e.popperGenerator = B, e.popperOffsets = U, e.preventOverflow = Q, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));

/*! * Bootstrap v5.2.2 (https://getbootstrap.com/)  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)*/
! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper)
}(this, (function(t) {
    "use strict";

    function e(t) {
        if (t && t.__esModule) return t;
        const e = Object.create(null, {
            [Symbol.toStringTag]: {
                value: "Module"
            }
        });
        if (t)
            for (const i in t)
                if ("default" !== i) {
                    const s = Object.getOwnPropertyDescriptor(t, i);
                    Object.defineProperty(e, i, s.get ? s : {
                        enumerable: !0,
                        get: () => t[i]
                    })
                } return e.default = t, Object.freeze(e)
    }
    const i = e(t),
        s = "transitionend",
        n = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), e = i && "#" !== i ? i.trim() : null
            }
            return e
        },
        o = t => {
            const e = n(t);
            return e && document.querySelector(e) ? e : null
        },
        r = t => {
            const e = n(t);
            return e ? document.querySelector(e) : null
        },
        a = t => {
            t.dispatchEvent(new Event(s))
        },
        l = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), void 0 !== t.nodeType),
        c = t => l(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null,
        h = t => {
            if (!l(t) || 0 === t.getClientRects().length) return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"),
                i = t.closest("details:not([open])");
            if (!i) return e;
            if (i !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== i) return !1;
                if (null === e) return !1
            }
            return e
        },
        d = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")),
        u = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? u(t.parentNode) : null
        },
        _ = () => {},
        g = t => {
            t.offsetHeight
        },
        f = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null,
        p = [],
        m = () => "rtl" === document.documentElement.dir,
        b = t => {
            var e;
            e = () => {
                const e = f();
                if (e) {
                    const i = t.NAME,
                        s = e.fn[i];
                    e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = s, t.jQueryInterface)
                }
            }, "loading" === document.readyState ? (p.length || document.addEventListener("DOMContentLoaded", (() => {
                for (const t of p) t()
            })), p.push(e)) : e()
        },
        v = t => {
            "function" == typeof t && t()
        },
        y = (t, e, i = !0) => {
            if (!i) return void v(t);
            const n = (t => {
                if (!t) return 0;
                let {
                    transitionDuration: e,
                    transitionDelay: i
                } = window.getComputedStyle(t);
                const s = Number.parseFloat(e),
                    n = Number.parseFloat(i);
                return s || n ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0
            })(e) + 5;
            let o = !1;
            const r = ({
                target: i
            }) => {
                i === e && (o = !0, e.removeEventListener(s, r), v(t))
            };
            e.addEventListener(s, r), setTimeout((() => {
                o || a(e)
            }), n)
        },
        w = (t, e, i, s) => {
            const n = t.length;
            let o = t.indexOf(e);
            return -1 === o ? !i && s ? t[n - 1] : t[0] : (o += i ? 1 : -1, s && (o = (o + n) % n), t[Math.max(0, Math.min(o, n - 1))])
        },
        A = /[^.]*(?=\..*)\.|.*/,
        E = /\..*/,
        C = /::\d+$/,
        T = {};
    let k = 1;
    const L = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        },
        O = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);

    function I(t, e) {
        return e && `${e}::${k++}` || t.uidEvent || k++
    }

    function S(t) {
        const e = I(t);
        return t.uidEvent = e, T[e] = T[e] || {}, T[e]
    }

    function D(t, e, i = null) {
        return Object.values(t).find((t => t.callable === e && t.delegationSelector === i))
    }

    function N(t, e, i) {
        const s = "string" == typeof e,
            n = s ? i : e || i;
        let o = j(t);
        return O.has(o) || (o = t), [s, n, o]
    }

    function P(t, e, i, s, n) {
        if ("string" != typeof e || !t) return;
        let [o, r, a] = N(e, i, s);
        if (e in L) {
            const t = t => function(e) {
                if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e)
            };
            r = t(r)
        }
        const l = S(t),
            c = l[a] || (l[a] = {}),
            h = D(c, r, o ? i : null);
        if (h) return void(h.oneOff = h.oneOff && n);
        const d = I(r, e.replace(A, "")),
            u = o ? function(t, e, i) {
                return function s(n) {
                    const o = t.querySelectorAll(e);
                    for (let {
                            target: r
                        } = n; r && r !== this; r = r.parentNode)
                        for (const a of o)
                            if (a === r) return F(n, {
                                delegateTarget: r
                            }), s.oneOff && $.off(t, n.type, e, i), i.apply(r, [n])
                }
            }(t, i, r) : function(t, e) {
                return function i(s) {
                    return F(s, {
                        delegateTarget: t
                    }), i.oneOff && $.off(t, s.type, e), e.apply(t, [s])
                }
            }(t, r);
        u.delegationSelector = o ? i : null, u.callable = r, u.oneOff = n, u.uidEvent = d, c[d] = u, t.addEventListener(a, u, o)
    }

    function x(t, e, i, s, n) {
        const o = D(e[i], s, n);
        o && (t.removeEventListener(i, o, Boolean(n)), delete e[i][o.uidEvent])
    }

    function M(t, e, i, s) {
        const n = e[i] || {};
        for (const o of Object.keys(n))
            if (o.includes(s)) {
                const s = n[o];
                x(t, e, i, s.callable, s.delegationSelector)
            }
    }

    function j(t) {
        return t = t.replace(E, ""), L[t] || t
    }
    const $ = {
        on(t, e, i, s) {
            P(t, e, i, s, !1)
        },
        one(t, e, i, s) {
            P(t, e, i, s, !0)
        },
        off(t, e, i, s) {
            if ("string" != typeof e || !t) return;
            const [n, o, r] = N(e, i, s), a = r !== e, l = S(t), c = l[r] || {}, h = e.startsWith(".");
            if (void 0 === o) {
                if (h)
                    for (const i of Object.keys(l)) M(t, l, i, e.slice(1));
                for (const i of Object.keys(c)) {
                    const s = i.replace(C, "");
                    if (!a || e.includes(s)) {
                        const e = c[i];
                        x(t, l, r, e.callable, e.delegationSelector)
                    }
                }
            } else {
                if (!Object.keys(c).length) return;
                x(t, l, r, o, n ? i : null)
            }
        },
        trigger(t, e, i) {
            if ("string" != typeof e || !t) return null;
            const s = f();
            let n = null,
                o = !0,
                r = !0,
                a = !1;
            e !== j(e) && s && (n = s.Event(e, i), s(t).trigger(n), o = !n.isPropagationStopped(), r = !n.isImmediatePropagationStopped(), a = n.isDefaultPrevented());
            let l = new Event(e, {
                bubbles: o,
                cancelable: !0
            });
            return l = F(l, i), a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && n && n.preventDefault(), l
        }
    };

    function F(t, e) {
        for (const [i, s] of Object.entries(e || {})) try {
            t[i] = s
        } catch (e) {
            Object.defineProperty(t, i, {
                configurable: !0,
                get: () => s
            })
        }
        return t
    }
    const z = new Map,
        H = {
            set(t, e, i) {
                z.has(t) || z.set(t, new Map);
                const s = z.get(t);
                s.has(e) || 0 === s.size ? s.set(e, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`)
            },
            get: (t, e) => z.has(t) && z.get(t).get(e) || null,
            remove(t, e) {
                if (!z.has(t)) return;
                const i = z.get(t);
                i.delete(e), 0 === i.size && z.delete(t)
            }
        };

    function q(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ("" === t || "null" === t) return null;
        if ("string" != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t))
        } catch (e) {
            return t
        }
    }

    function B(t) {
        return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`))
    }
    const W = {
        setDataAttribute(t, e, i) {
            t.setAttribute(`data-bs-${B(e)}`, i)
        },
        removeDataAttribute(t, e) {
            t.removeAttribute(`data-bs-${B(e)}`)
        },
        getDataAttributes(t) {
            if (!t) return {};
            const e = {},
                i = Object.keys(t.dataset).filter((t => t.startsWith("bs") && !t.startsWith("bsConfig")));
            for (const s of i) {
                let i = s.replace(/^bs/, "");
                i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = q(t.dataset[s])
            }
            return e
        },
        getDataAttribute: (t, e) => q(t.getAttribute(`data-bs-${B(e)}`))
    };
    class R {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t
        }
        _mergeConfigObj(t, e) {
            const i = l(e) ? W.getDataAttribute(e, "config") : {};
            return {
                ...this.constructor.Default,
                ..."object" == typeof i ? i : {},
                ...l(e) ? W.getDataAttributes(e) : {},
                ..."object" == typeof t ? t : {}
            }
        }
        _typeCheckConfig(t, e = this.constructor.DefaultType) {
            for (const s of Object.keys(e)) {
                const n = e[s],
                    o = t[s],
                    r = l(o) ? "element" : null == (i = o) ? `${i}` : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(n).test(r)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${r}" but expected type "${n}".`)
            }
            var i
        }
    }
    class V extends R {
        constructor(t, e) {
            super(), (t = c(t)) && (this._element = t, this._config = this._getConfig(e), H.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            H.remove(this._element, this.constructor.DATA_KEY), $.off(this._element, this.constructor.EVENT_KEY);
            for (const t of Object.getOwnPropertyNames(this)) this[t] = null
        }
        _queueCallback(t, e, i = !0) {
            y(t, e, i)
        }
        _getConfig(t) {
            return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        static getInstance(t) {
            return H.get(c(t), this.DATA_KEY)
        }
        static getOrCreateInstance(t, e = {}) {
            return this.getInstance(t) || new this(t, "object" == typeof e ? e : null)
        }
        static get VERSION() {
            return "5.2.2"
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`
        }
        static eventName(t) {
            return `${t}${this.EVENT_KEY}`
        }
    }
    const K = (t, e = "hide") => {
        const i = `click.dismiss${t.EVENT_KEY}`,
            s = t.NAME;
        $.on(document, i, `[data-bs-dismiss="${s}"]`, (function(i) {
            if (["A", "AREA"].includes(this.tagName) && i.preventDefault(), d(this)) return;
            const n = r(this) || this.closest(`.${s}`);
            t.getOrCreateInstance(n)[e]()
        }))
    };
    class Q extends V {
        static get NAME() {
            return "alert"
        }
        close() {
            if ($.trigger(this._element, "close.bs.alert").defaultPrevented) return;
            this._element.classList.remove("show");
            const t = this._element.classList.contains("fade");
            this._queueCallback((() => this._destroyElement()), this._element, t)
        }
        _destroyElement() {
            this._element.remove(), $.trigger(this._element, "closed.bs.alert"), this.dispose()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Q.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    K(Q, "close"), b(Q);
    const X = '[data-bs-toggle="button"]';
    class Y extends V {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Y.getOrCreateInstance(this);
                "toggle" === t && e[t]()
            }))
        }
    }
    $.on(document, "click.bs.button.data-api", X, (t => {
        t.preventDefault();
        const e = t.target.closest(X);
        Y.getOrCreateInstance(e).toggle()
    })), b(Y);
    const U = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
            parents(t, e) {
                const i = [];
                let s = t.parentNode.closest(e);
                for (; s;) i.push(s), s = s.parentNode.closest(e);
                return i
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.previousElementSibling
                }
                return []
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (; i;) {
                    if (i.matches(e)) return [i];
                    i = i.nextElementSibling
                }
                return []
            },
            focusableChildren(t) {
                const e = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t => `${t}:not([tabindex^="-"])`)).join(",");
                return this.find(e, t).filter((t => !d(t) && h(t)))
            }
        },
        G = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        },
        J = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
    class Z extends R {
        constructor(t, e) {
            super(), this._element = t, t && Z.isSupported() && (this._config = this._getConfig(e), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents())
        }
        static get Default() {
            return G
        }
        static get DefaultType() {
            return J
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            $.off(this._element, ".bs.swipe")
        }
        _start(t) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX
        }
        _end(t) {
            this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), v(this._config.endCallback)
        }
        _move(t) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const t = Math.abs(this._deltaX);
            if (t <= 40) return;
            const e = t / this._deltaX;
            this._deltaX = 0, e && v(e > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? ($.on(this._element, "pointerdown.bs.swipe", (t => this._start(t))), $.on(this._element, "pointerup.bs.swipe", (t => this._end(t))), this._element.classList.add("pointer-event")) : ($.on(this._element, "touchstart.bs.swipe", (t => this._start(t))), $.on(this._element, "touchmove.bs.swipe", (t => this._move(t))), $.on(this._element, "touchend.bs.swipe", (t => this._end(t))))
        }
        _eventIsPointerPenTouch(t) {
            return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType)
        }
        static isSupported() {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const tt = "next",
        et = "prev",
        it = "left",
        st = "right",
        nt = "slid.bs.carousel",
        ot = "carousel",
        rt = "active",
        at = {
            ArrowLeft: st,
            ArrowRight: it
        },
        lt = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        },
        ct = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
    class ht extends V {
        constructor(t, e) {
            super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = U.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === ot && this.cycle()
        }
        static get Default() {
            return lt
        }
        static get DefaultType() {
            return ct
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(tt)
        }
        nextWhenVisible() {
            !document.hidden && h(this._element) && this.next()
        }
        prev() {
            this._slide(et)
        }
        pause() {
            this._isSliding && a(this._element), this._clearInterval()
        }
        cycle() {
            this._clearInterval(), this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? $.one(this._element, nt, (() => this.cycle())) : this.cycle())
        }
        to(t) {
            const e = this._getItems();
            if (t > e.length - 1 || t < 0) return;
            if (this._isSliding) return void $.one(this._element, nt, (() => this.to(t)));
            const i = this._getItemIndex(this._getActive());
            if (i === t) return;
            const s = t > i ? tt : et;
            this._slide(s, e[t])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.defaultInterval = t.interval, t
        }
        _addEventListeners() {
            this._config.keyboard && $.on(this._element, "keydown.bs.carousel", (t => this._keydown(t))), "hover" === this._config.pause && ($.on(this._element, "mouseenter.bs.carousel", (() => this.pause())), $.on(this._element, "mouseleave.bs.carousel", (() => this._maybeEnableCycle()))), this._config.touch && Z.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const t of U.find(".carousel-item img", this._element)) $.on(t, "dragstart.bs.carousel", (t => t.preventDefault()));
            const t = {
                leftCallback: () => this._slide(this._directionToOrder(it)),
                rightCallback: () => this._slide(this._directionToOrder(st)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new Z(this._element, t)
        }
        _keydown(t) {
            if (/input|textarea/i.test(t.target.tagName)) return;
            const e = at[t.key];
            e && (t.preventDefault(), this._slide(this._directionToOrder(e)))
        }
        _getItemIndex(t) {
            return this._getItems().indexOf(t)
        }
        _setActiveIndicatorElement(t) {
            if (!this._indicatorsElement) return;
            const e = U.findOne(".active", this._indicatorsElement);
            e.classList.remove(rt), e.removeAttribute("aria-current");
            const i = U.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
            i && (i.classList.add(rt), i.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const t = this._activeElement || this._getActive();
            if (!t) return;
            const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
            this._config.interval = e || this._config.defaultInterval
        }
        _slide(t, e = null) {
            if (this._isSliding) return;
            const i = this._getActive(),
                s = t === tt,
                n = e || w(this._getItems(), i, s, this._config.wrap);
            if (n === i) return;
            const o = this._getItemIndex(n),
                r = e => $.trigger(this._element, e, {
                    relatedTarget: n,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(i),
                    to: o
                });
            if (r("slide.bs.carousel").defaultPrevented) return;
            if (!i || !n) return;
            const a = Boolean(this._interval);
            this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = n;
            const l = s ? "carousel-item-start" : "carousel-item-end",
                c = s ? "carousel-item-next" : "carousel-item-prev";
            n.classList.add(c), g(n), i.classList.add(l), n.classList.add(l), this._queueCallback((() => {
                n.classList.remove(l, c), n.classList.add(rt), i.classList.remove(rt, c, l), this._isSliding = !1, r(nt)
            }), i, this._isAnimated()), a && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return U.findOne(".active.carousel-item", this._element)
        }
        _getItems() {
            return U.find(".carousel-item", this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval), this._interval = null)
        }
        _directionToOrder(t) {
            return m() ? t === it ? et : tt : t === it ? tt : et
        }
        _orderToDirection(t) {
            return m() ? t === et ? it : st : t === et ? st : it
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = ht.getOrCreateInstance(this, t);
                if ("number" != typeof t) {
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]()
                    }
                } else e.to(t)
            }))
        }
    }
    $.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(t) {
        const e = r(this);
        if (!e || !e.classList.contains(ot)) return;
        t.preventDefault();
        const i = ht.getOrCreateInstance(e),
            s = this.getAttribute("data-bs-slide-to");
        return s ? (i.to(s), void i._maybeEnableCycle()) : "next" === W.getDataAttribute(this, "slide") ? (i.next(), void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle())
    })), $.on(window, "load.bs.carousel.data-api", (() => {
        const t = U.find('[data-bs-ride="carousel"]');
        for (const e of t) ht.getOrCreateInstance(e)
    })), b(ht);
    const dt = "show",
        ut = "collapse",
        _t = "collapsing",
        gt = '[data-bs-toggle="collapse"]',
        ft = {
            parent: null,
            toggle: !0
        },
        pt = {
            parent: "(null|element)",
            toggle: "boolean"
        };
    class mt extends V {
        constructor(t, e) {
            super(t, e), this._isTransitioning = !1, this._triggerArray = [];
            const i = U.find(gt);
            for (const t of i) {
                const e = o(t),
                    i = U.find(e).filter((t => t === this._element));
                null !== e && i.length && this._triggerArray.push(t)
            }
            this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle()
        }
        static get Default() {
            return ft
        }
        static get DefaultType() {
            return pt
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown()) return;
            let t = [];
            if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t => t !== this._element)).map((t => mt.getOrCreateInstance(t, {
                    toggle: !1
                })))), t.length && t[0]._isTransitioning) return;
            if ($.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
            for (const e of t) e.hide();
            const e = this._getDimension();
            this._element.classList.remove(ut), this._element.classList.add(_t), this._element.style[e] = 0, this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
            const i = `scroll${e[0].toUpperCase()+e.slice(1)}`;
            this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(_t), this._element.classList.add(ut, dt), this._element.style[e] = "", $.trigger(this._element, "shown.bs.collapse")
            }), this._element, !0), this._element.style[e] = `${this._element[i]}px`
        }
        hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if ($.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
            const t = this._getDimension();
            this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, g(this._element), this._element.classList.add(_t), this._element.classList.remove(ut, dt);
            for (const t of this._triggerArray) {
                const e = r(t);
                e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
            }
            this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback((() => {
                this._isTransitioning = !1, this._element.classList.remove(_t), this._element.classList.add(ut), $.trigger(this._element, "hidden.bs.collapse")
            }), this._element, !0)
        }
        _isShown(t = this._element) {
            return t.classList.contains(dt)
        }
        _configAfterMerge(t) {
            return t.toggle = Boolean(t.toggle), t.parent = c(t.parent), t
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent) return;
            const t = this._getFirstLevelChildren(gt);
            for (const e of t) {
                const t = r(e);
                t && this._addAriaAndCollapsedClass([e], this._isShown(t))
            }
        }
        _getFirstLevelChildren(t) {
            const e = U.find(":scope .collapse .collapse", this._config.parent);
            return U.find(t, this._config.parent).filter((t => !e.includes(t)))
        }
        _addAriaAndCollapsedClass(t, e) {
            if (t.length)
                for (const i of t) i.classList.toggle("collapsed", !e), i.setAttribute("aria-expanded", e)
        }
        static jQueryInterface(t) {
            const e = {};
            return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each((function() {
                const i = mt.getOrCreateInstance(this, e);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t]()
                }
            }))
        }
    }
    $.on(document, "click.bs.collapse.data-api", gt, (function(t) {
        ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
        const e = o(this),
            i = U.find(e);
        for (const t of i) mt.getOrCreateInstance(t, {
            toggle: !1
        }).toggle()
    })), b(mt);
    const bt = "dropdown",
        vt = "ArrowUp",
        yt = "ArrowDown",
        wt = "click.bs.dropdown.data-api",
        At = "keydown.bs.dropdown.data-api",
        Et = "show",
        Ct = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        Tt = `${Ct}.show`,
        kt = ".dropdown-menu",
        Lt = m() ? "top-end" : "top-start",
        Ot = m() ? "top-start" : "top-end",
        It = m() ? "bottom-end" : "bottom-start",
        St = m() ? "bottom-start" : "bottom-end",
        Dt = m() ? "left-start" : "right-start",
        Nt = m() ? "right-start" : "left-start",
        Pt = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle"
        },
        xt = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
    class Mt extends V {
        constructor(t, e) {
            super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = U.next(this._element, kt)[0] || U.prev(this._element, kt)[0] || U.findOne(kt, this._parent), this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return Pt
        }
        static get DefaultType() {
            return xt
        }
        static get NAME() {
            return bt
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (d(this._element) || this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            if (!$.trigger(this._element, "show.bs.dropdown", t).defaultPrevented) {
                if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const t of [].concat(...document.body.children)) $.on(t, "mouseover", _);
                this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Et), this._element.classList.add(Et), $.trigger(this._element, "shown.bs.dropdown", t)
            }
        }
        hide() {
            if (d(this._element) || !this._isShown()) return;
            const t = {
                relatedTarget: this._element
            };
            this._completeHide(t)
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(), this._popper && this._popper.update()
        }
        _completeHide(t) {
            if (!$.trigger(this._element, "hide.bs.dropdown", t).defaultPrevented) {
                if ("ontouchstart" in document.documentElement)
                    for (const t of [].concat(...document.body.children)) $.off(t, "mouseover", _);
                this._popper && this._popper.destroy(), this._menu.classList.remove(Et), this._element.classList.remove(Et), this._element.setAttribute("aria-expanded", "false"), W.removeDataAttribute(this._menu, "popper"), $.trigger(this._element, "hidden.bs.dropdown", t)
            }
        }
        _getConfig(t) {
            if ("object" == typeof(t = super._getConfig(t)).reference && !l(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${bt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
            return t
        }
        _createPopper() {
            if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let t = this._element;
            "parent" === this._config.reference ? t = this._parent : l(this._config.reference) ? t = c(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
            const e = this._getPopperConfig();
            this._popper = i.createPopper(t, this._menu, e)
        }
        _isShown() {
            return this._menu.classList.contains(Et)
        }
        _getPlacement() {
            const t = this._parent;
            if (t.classList.contains("dropend")) return Dt;
            if (t.classList.contains("dropstart")) return Nt;
            if (t.classList.contains("dropup-center")) return "top";
            if (t.classList.contains("dropdown-center")) return "bottom";
            const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return t.classList.contains("dropup") ? e ? Ot : Lt : e ? St : It
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _getPopperConfig() {
            const t = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (W.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]), {
                ...t,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(t) : this._config.popperConfig
            }
        }
        _selectMenuItem({
            key: t,
            target: e
        }) {
            const i = U.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t => h(t)));
            i.length && w(i, e, t === yt, !i.includes(e)).focus()
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Mt.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
        static clearMenus(t) {
            if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
            const e = U.find(Tt);
            for (const i of e) {
                const e = Mt.getInstance(i);
                if (!e || !1 === e._config.autoClose) continue;
                const s = t.composedPath(),
                    n = s.includes(e._menu);
                if (s.includes(e._element) || "inside" === e._config.autoClose && !n || "outside" === e._config.autoClose && n) continue;
                if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                const o = {
                    relatedTarget: e._element
                };
                "click" === t.type && (o.clickEvent = t), e._completeHide(o)
            }
        }
        static dataApiKeydownHandler(t) {
            const e = /input|textarea/i.test(t.target.tagName),
                i = "Escape" === t.key,
                s = [vt, yt].includes(t.key);
            if (!s && !i) return;
            if (e && !i) return;
            t.preventDefault();
            const n = this.matches(Ct) ? this : U.prev(this, Ct)[0] || U.next(this, Ct)[0] || U.findOne(Ct, t.delegateTarget.parentNode),
                o = Mt.getOrCreateInstance(n);
            if (s) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
            o._isShown() && (t.stopPropagation(), o.hide(), n.focus())
        }
    }
    $.on(document, At, Ct, Mt.dataApiKeydownHandler), $.on(document, At, kt, Mt.dataApiKeydownHandler), $.on(document, wt, Mt.clearMenus), $.on(document, "keyup.bs.dropdown.data-api", Mt.clearMenus), $.on(document, wt, Ct, (function(t) {
        t.preventDefault(), Mt.getOrCreateInstance(this).toggle()
    })), b(Mt);
    const jt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        $t = ".sticky-top",
        Ft = "padding-right",
        zt = "margin-right";
    class Ht {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const t = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - t)
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(), this._setElementAttributes(this._element, Ft, (e => e + t)), this._setElementAttributes(jt, Ft, (e => e + t)), this._setElementAttributes($t, zt, (e => e - t))
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Ft), this._resetElementAttributes(jt, Ft), this._resetElementAttributes($t, zt)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden"
        }
        _setElementAttributes(t, e, i) {
            const s = this.getWidth();
            this._applyManipulationCallback(t, (t => {
                if (t !== this._element && window.innerWidth > t.clientWidth + s) return;
                this._saveInitialAttribute(t, e);
                const n = window.getComputedStyle(t).getPropertyValue(e);
                t.style.setProperty(e, `${i(Number.parseFloat(n))}px`)
            }))
        }
        _saveInitialAttribute(t, e) {
            const i = t.style.getPropertyValue(e);
            i && W.setDataAttribute(t, e, i)
        }
        _resetElementAttributes(t, e) {
            this._applyManipulationCallback(t, (t => {
                const i = W.getDataAttribute(t, e);
                null !== i ? (W.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e)
            }))
        }
        _applyManipulationCallback(t, e) {
            if (l(t)) e(t);
            else
                for (const i of U.find(t, this._element)) e(i)
        }
    }
    const qt = "show",
        Bt = "mousedown.bs.backdrop",
        Wt = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        },
        Rt = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
    class Vt extends R {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null
        }
        static get Default() {
            return Wt
        }
        static get DefaultType() {
            return Rt
        }
        static get NAME() {
            return "backdrop"
        }
        show(t) {
            if (!this._config.isVisible) return void v(t);
            this._append();
            const e = this._getElement();
            this._config.isAnimated && g(e), e.classList.add(qt), this._emulateAnimation((() => {
                v(t)
            }))
        }
        hide(t) {
            this._config.isVisible ? (this._getElement().classList.remove(qt), this._emulateAnimation((() => {
                this.dispose(), v(t)
            }))) : v(t)
        }
        dispose() {
            this._isAppended && ($.off(this._element, Bt), this._element.remove(), this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const t = document.createElement("div");
                t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), this._element = t
            }
            return this._element
        }
        _configAfterMerge(t) {
            return t.rootElement = c(t.rootElement), t
        }
        _append() {
            if (this._isAppended) return;
            const t = this._getElement();
            this._config.rootElement.append(t), $.on(t, Bt, (() => {
                v(this._config.clickCallback)
            })), this._isAppended = !0
        }
        _emulateAnimation(t) {
            y(t, this._getElement(), this._config.isAnimated)
        }
    }
    const Kt = ".bs.focustrap",
        Qt = "backward",
        Xt = {
            autofocus: !0,
            trapElement: null
        },
        Yt = {
            autofocus: "boolean",
            trapElement: "element"
        };
    class Ut extends R {
        constructor(t) {
            super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null
        }
        static get Default() {
            return Xt
        }
        static get DefaultType() {
            return Yt
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(), $.off(document, Kt), $.on(document, "focusin.bs.focustrap", (t => this._handleFocusin(t))), $.on(document, "keydown.tab.bs.focustrap", (t => this._handleKeydown(t))), this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1, $.off(document, Kt))
        }
        _handleFocusin(t) {
            const {
                trapElement: e
            } = this._config;
            if (t.target === document || t.target === e || e.contains(t.target)) return;
            const i = U.focusableChildren(e);
            0 === i.length ? e.focus() : this._lastTabNavDirection === Qt ? i[i.length - 1].focus() : i[0].focus()
        }
        _handleKeydown(t) {
            "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? Qt : "forward")
        }
    }
    const Gt = "hidden.bs.modal",
        Jt = "show.bs.modal",
        Zt = "modal-open",
        te = "show",
        ee = "modal-static",
        ie = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        },
        se = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
    class ne extends V {
        constructor(t, e) {
            super(t, e), this._dialog = U.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, this._scrollBar = new Ht, this._addEventListeners()
        }
        static get Default() {
            return ie
        }
        static get DefaultType() {
            return se
        }
        static get NAME() {
            return "modal"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || this._isTransitioning || $.trigger(this._element, Jt, {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), document.body.classList.add(Zt), this._adjustDialog(), this._backdrop.show((() => this._showElement(t))))
        }
        hide() {
            this._isShown && !this._isTransitioning && ($.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1, this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(te), this._queueCallback((() => this._hideModal()), this._element, this._isAnimated())))
        }
        dispose() {
            for (const t of [window, this._dialog]) $.off(t, ".bs.modal");
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new Vt({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new Ut({
                trapElement: this._element
            })
        }
        _showElement(t) {
            document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
            const e = U.findOne(".modal-body", this._dialog);
            e && (e.scrollTop = 0), g(this._element), this._element.classList.add(te), this._queueCallback((() => {
                this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, $.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: t
                })
            }), this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            $.on(this._element, "keydown.dismiss.bs.modal", (t => {
                if ("Escape" === t.key) return this._config.keyboard ? (t.preventDefault(), void this.hide()) : void this._triggerBackdropTransition()
            })), $.on(window, "resize.bs.modal", (() => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            })), $.on(this._element, "mousedown.dismiss.bs.modal", (t => {
                $.one(this._element, "click.dismiss.bs.modal", (e => {
                    this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                }))
            }))
        }
        _hideModal() {
            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = !1, this._backdrop.hide((() => {
                document.body.classList.remove(Zt), this._resetAdjustments(), this._scrollBar.reset(), $.trigger(this._element, Gt)
            }))
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if ($.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented) return;
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._element.style.overflowY;
            "hidden" === e || this._element.classList.contains(ee) || (t || (this._element.style.overflowY = "hidden"), this._element.classList.add(ee), this._queueCallback((() => {
                this._element.classList.remove(ee), this._queueCallback((() => {
                    this._element.style.overflowY = e
                }), this._dialog)
            }), this._dialog), this._element.focus())
        }
        _adjustDialog() {
            const t = this._element.scrollHeight > document.documentElement.clientHeight,
                e = this._scrollBar.getWidth(),
                i = e > 0;
            if (i && !t) {
                const t = m() ? "paddingLeft" : "paddingRight";
                this._element.style[t] = `${e}px`
            }
            if (!i && t) {
                const t = m() ? "paddingRight" : "paddingLeft";
                this._element.style[t] = `${e}px`
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
        }
        static jQueryInterface(t, e) {
            return this.each((function() {
                const i = ne.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                    i[t](e)
                }
            }))
        }
    }
    $.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(t) {
        const e = r(this);
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), $.one(e, Jt, (t => {
            t.defaultPrevented || $.one(e, Gt, (() => {
                h(this) && this.focus()
            }))
        }));
        const i = U.findOne(".modal.show");
        i && ne.getInstance(i).hide(), ne.getOrCreateInstance(e).toggle(this)
    })), K(ne), b(ne);
    const oe = "show",
        re = "showing",
        ae = "hiding",
        le = ".offcanvas.show",
        ce = "hidePrevented.bs.offcanvas",
        he = "hidden.bs.offcanvas",
        de = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        },
        ue = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
    class _e extends V {
        constructor(t, e) {
            super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners()
        }
        static get Default() {
            return de
        }
        static get DefaultType() {
            return ue
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        show(t) {
            this._isShown || $.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: t
            }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new Ht).hide(), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), this._element.classList.add(re), this._queueCallback((() => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(oe), this._element.classList.remove(re), $.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: t
                })
            }), this._element, !0))
        }
        hide() {
            this._isShown && ($.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = !1, this._element.classList.add(ae), this._backdrop.hide(), this._queueCallback((() => {
                this._element.classList.remove(oe, ae), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || (new Ht).reset(), $.trigger(this._element, he)
            }), this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose()
        }
        _initializeBackDrop() {
            const t = Boolean(this._config.backdrop);
            return new Vt({
                className: "offcanvas-backdrop",
                isVisible: t,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: t ? () => {
                    "static" !== this._config.backdrop ? this.hide() : $.trigger(this._element, ce)
                } : null
            })
        }
        _initializeFocusTrap() {
            return new Ut({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            $.on(this._element, "keydown.dismiss.bs.offcanvas", (t => {
                "Escape" === t.key && (this._config.keyboard ? this.hide() : $.trigger(this._element, ce))
            }))
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = _e.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    $.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(t) {
        const e = r(this);
        if (["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this)) return;
        $.one(e, he, (() => {
            h(this) && this.focus()
        }));
        const i = U.findOne(le);
        i && i !== e && _e.getInstance(i).hide(), _e.getOrCreateInstance(e).toggle(this)
    })), $.on(window, "load.bs.offcanvas.data-api", (() => {
        for (const t of U.find(le)) _e.getOrCreateInstance(t).show()
    })), $.on(window, "resize.bs.offcanvas", (() => {
        for (const t of U.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && _e.getOrCreateInstance(t).hide()
    })), K(_e), b(_e);
    const ge = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
        fe = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        pe = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i,
        me = (t, e) => {
            const i = t.nodeName.toLowerCase();
            return e.includes(i) ? !ge.has(i) || Boolean(fe.test(t.nodeValue) || pe.test(t.nodeValue)) : e.filter((t => t instanceof RegExp)).some((t => t.test(i)))
        },
        be = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        ve = {
            allowList: be,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        },
        ye = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        },
        we = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
    class Ae extends R {
        constructor(t) {
            super(), this._config = this._getConfig(t)
        }
        static get Default() {
            return ve
        }
        static get DefaultType() {
            return ye
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map((t => this._resolvePossibleFunction(t))).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(t) {
            return this._checkContent(t), this._config.content = {
                ...this._config.content,
                ...t
            }, this
        }
        toHtml() {
            const t = document.createElement("div");
            t.innerHTML = this._maybeSanitize(this._config.template);
            for (const [e, i] of Object.entries(this._config.content)) this._setContent(t, i, e);
            const e = t.children[0],
                i = this._resolvePossibleFunction(this._config.extraClass);
            return i && e.classList.add(...i.split(" ")), e
        }
        _typeCheckConfig(t) {
            super._typeCheckConfig(t), this._checkContent(t.content)
        }
        _checkContent(t) {
            for (const [e, i] of Object.entries(t)) super._typeCheckConfig({
                selector: e,
                entry: i
            }, we)
        }
        _setContent(t, e, i) {
            const s = U.findOne(i, t);
            s && ((e = this._resolvePossibleFunction(e)) ? l(e) ? this._putElementInTemplate(c(e), s) : this._config.html ? s.innerHTML = this._maybeSanitize(e) : s.textContent = e : s.remove())
        }
        _maybeSanitize(t) {
            return this._config.sanitize ? function(t, e, i) {
                if (!t.length) return t;
                if (i && "function" == typeof i) return i(t);
                const s = (new window.DOMParser).parseFromString(t, "text/html"),
                    n = [].concat(...s.body.querySelectorAll("*"));
                for (const t of n) {
                    const i = t.nodeName.toLowerCase();
                    if (!Object.keys(e).includes(i)) {
                        t.remove();
                        continue
                    }
                    const s = [].concat(...t.attributes),
                        n = [].concat(e["*"] || [], e[i] || []);
                    for (const e of s) me(e, n) || t.removeAttribute(e.nodeName)
                }
                return s.body.innerHTML
            }(t, this._config.allowList, this._config.sanitizeFn) : t
        }
        _resolvePossibleFunction(t) {
            return "function" == typeof t ? t(this) : t
        }
        _putElementInTemplate(t, e) {
            if (this._config.html) return e.innerHTML = "", void e.append(t);
            e.textContent = t.textContent
        }
    }
    const Ee = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Ce = "fade",
        Te = "show",
        ke = ".modal",
        Le = "hide.bs.modal",
        Oe = "hover",
        Ie = "focus",
        Se = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: m() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: m() ? "right" : "left"
        },
        De = {
            allowList: be,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 0],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        },
        Ne = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
    class Pe extends V {
        constructor(t, e) {
            if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle()
        }
        static get Default() {
            return De
        }
        static get DefaultType() {
            return Ne
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout), $.off(this._element.closest(ke), Le, this._hideModalHandler), this.tip && this.tip.remove(), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose()
        }
        show() {
            if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const t = $.trigger(this._element, this.constructor.eventName("show")),
                e = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (t.defaultPrevented || !e) return;
            this.tip && (this.tip.remove(), this.tip = null);
            const i = this._getTipElement();
            this._element.setAttribute("aria-describedby", i.getAttribute("id"));
            const {
                container: s
            } = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (s.append(i), $.trigger(this._element, this.constructor.eventName("inserted"))), this._popper ? this._popper.update() : this._popper = this._createPopper(i), i.classList.add(Te), "ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) $.on(t, "mouseover", _);
            this._queueCallback((() => {
                $.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), this._isHovered = !1
            }), this.tip, this._isAnimated())
        }
        hide() {
            if (!this._isShown()) return;
            if ($.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) return;
            const t = this._getTipElement();
            if (t.classList.remove(Te), "ontouchstart" in document.documentElement)
                for (const t of [].concat(...document.body.children)) $.off(t, "mouseover", _);
            this._activeTrigger.click = !1, this._activeTrigger.focus = !1, this._activeTrigger.hover = !1, this._isHovered = null, this._queueCallback((() => {
                this._isWithActiveTrigger() || (this._isHovered || t.remove(), this._element.removeAttribute("aria-describedby"), $.trigger(this._element, this.constructor.eventName("hidden")), this._disposePopper())
            }), this.tip, this._isAnimated())
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip
        }
        _createTipElement(t) {
            const e = this._getTemplateFactory(t).toHtml();
            if (!e) return null;
            e.classList.remove(Ce, Te), e.classList.add(`bs-${this.constructor.NAME}-auto`);
            const i = (t => {
                do {
                    t += Math.floor(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            })(this.constructor.NAME).toString();
            return e.setAttribute("id", i), this._isAnimated() && e.classList.add(Ce), e
        }
        setContent(t) {
            this._newContent = t, this._isShown() && (this._disposePopper(), this.show())
        }
        _getTemplateFactory(t) {
            return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Ae({
                ...this._config,
                content: t,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }), this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(t) {
            return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(Ce)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(Te)
        }
        _createPopper(t) {
            const e = "function" == typeof this._config.placement ? this._config.placement.call(this, t, this._element) : this._config.placement,
                s = Se[e.toUpperCase()];
            return i.createPopper(this._element, t, this._getPopperConfig(s))
        }
        _getOffset() {
            const {
                offset: t
            } = this._config;
            return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t
        }
        _resolvePossibleFunction(t) {
            return "function" == typeof t ? t.call(this._element) : t
        }
        _getPopperConfig(t) {
            const e = {
                placement: t,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: t => {
                        this._getTipElement().setAttribute("data-popper-placement", t.state.placement)
                    }
                }]
            };
            return {
                ...e,
                ..."function" == typeof this._config.popperConfig ? this._config.popperConfig(e) : this._config.popperConfig
            }
        }
        _setListeners() {
            const t = this._config.trigger.split(" ");
            for (const e of t)
                if ("click" === e) $.on(this._element, this.constructor.eventName("click"), this._config.selector, (t => {
                    this._initializeOnDelegatedTarget(t).toggle()
                }));
                else if ("manual" !== e) {
                const t = e === Oe ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"),
                    i = e === Oe ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                $.on(this._element, t, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusin" === t.type ? Ie : Oe] = !0, e._enter()
                })), $.on(this._element, i, this._config.selector, (t => {
                    const e = this._initializeOnDelegatedTarget(t);
                    e._activeTrigger["focusout" === t.type ? Ie : Oe] = e._element.contains(t.relatedTarget), e._leave()
                }))
            }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }, $.on(this._element.closest(ke), Le, this._hideModalHandler)
        }
        _fixTitle() {
            const t = this._element.getAttribute("title");
            t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, this._setTimeout((() => {
                this._isHovered && this.show()
            }), this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout((() => {
                this._isHovered || this.hide()
            }), this._config.delay.hide))
        }
        _setTimeout(t, e) {
            clearTimeout(this._timeout), this._timeout = setTimeout(t, e)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(t) {
            const e = W.getDataAttributes(this._element);
            for (const t of Object.keys(e)) Ee.has(t) && delete e[t];
            return t = {
                ...e,
                ..."object" == typeof t && t ? t : {}
            }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t
        }
        _configAfterMerge(t) {
            return t.container = !1 === t.container ? document.body : c(t.container), "number" == typeof t.delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), t
        }
        _getDelegateConfig() {
            const t = {};
            for (const e in this._config) this.constructor.Default[e] !== this._config[e] && (t[e] = this._config[e]);
            return t.selector = !1, t.trigger = "manual", t
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), this._popper = null)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Pe.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    b(Pe);
    const xe = {
            ...Pe.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        },
        Me = {
            ...Pe.DefaultType,
            content: "(null|string|element|function)"
        };
    class je extends Pe {
        static get Default() {
            return xe
        }
        static get DefaultType() {
            return Me
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = je.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    b(je);
    const $e = "click.bs.scrollspy",
        Fe = "active",
        ze = "[href]",
        He = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [.1, .5, 1]
        },
        qe = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
    class Be extends V {
        constructor(t, e) {
            super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            }, this.refresh()
        }
        static get Default() {
            return He
        }
        static get DefaultType() {
            return qe
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const t of this._observableSections.values()) this._observer.observe(t)
        }
        dispose() {
            this._observer.disconnect(), super.dispose()
        }
        _configAfterMerge(t) {
            return t.target = c(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t => Number.parseFloat(t)))), t
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && ($.off(this._config.target, $e), $.on(this._config.target, $e, ze, (t => {
                const e = this._observableSections.get(t.target.hash);
                if (e) {
                    t.preventDefault();
                    const i = this._rootElement || window,
                        s = e.offsetTop - this._element.offsetTop;
                    if (i.scrollTo) return void i.scrollTo({
                        top: s,
                        behavior: "smooth"
                    });
                    i.scrollTop = s
                }
            })))
        }
        _getNewObserver() {
            const t = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver((t => this._observerCallback(t)), t)
        }
        _observerCallback(t) {
            const e = t => this._targetLinks.get(`#${t.target.id}`),
                i = t => {
                    this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t))
                },
                s = (this._rootElement || document.documentElement).scrollTop,
                n = s >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = s;
            for (const o of t) {
                if (!o.isIntersecting) {
                    this._activeTarget = null, this._clearActiveClass(e(o));
                    continue
                }
                const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (n && t) {
                    if (i(o), !s) return
                } else n || t || i(o)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map, this._observableSections = new Map;
            const t = U.find(ze, this._config.target);
            for (const e of t) {
                if (!e.hash || d(e)) continue;
                const t = U.findOne(e.hash, this._element);
                h(t) && (this._targetLinks.set(e.hash, e), this._observableSections.set(e.hash, t))
            }
        }
        _process(t) {
            this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, t.classList.add(Fe), this._activateParents(t), $.trigger(this._element, "activate.bs.scrollspy", {
                relatedTarget: t
            }))
        }
        _activateParents(t) {
            if (t.classList.contains("dropdown-item")) U.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(Fe);
            else
                for (const e of U.parents(t, ".nav, .list-group"))
                    for (const t of U.prev(e, ".nav-link, .nav-item > .nav-link, .list-group-item")) t.classList.add(Fe)
        }
        _clearActiveClass(t) {
            t.classList.remove(Fe);
            const e = U.find("[href].active", t);
            for (const t of e) t.classList.remove(Fe)
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Be.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    $.on(window, "load.bs.scrollspy.data-api", (() => {
        for (const t of U.find('[data-bs-spy="scroll"]')) Be.getOrCreateInstance(t)
    })), b(Be);
    const We = "ArrowLeft",
        Re = "ArrowRight",
        Ve = "ArrowUp",
        Ke = "ArrowDown",
        Qe = "active",
        Xe = "fade",
        Ye = "show",
        Ue = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        Ge = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Ue}`;
    class Je extends V {
        constructor(t) {
            super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), $.on(this._element, "keydown.bs.tab", (t => this._keydown(t))))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const t = this._element;
            if (this._elemIsActive(t)) return;
            const e = this._getActiveElem(),
                i = e ? $.trigger(e, "hide.bs.tab", {
                    relatedTarget: t
                }) : null;
            $.trigger(t, "show.bs.tab", {
                relatedTarget: e
            }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e))
        }
        _activate(t, e) {
            t && (t.classList.add(Qe), this._activate(r(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), this._toggleDropDown(t, !0), $.trigger(t, "shown.bs.tab", {
                    relatedTarget: e
                })) : t.classList.add(Ye)
            }), t, t.classList.contains(Xe)))
        }
        _deactivate(t, e) {
            t && (t.classList.remove(Qe), t.blur(), this._deactivate(r(t)), this._queueCallback((() => {
                "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), this._toggleDropDown(t, !1), $.trigger(t, "hidden.bs.tab", {
                    relatedTarget: e
                })) : t.classList.remove(Ye)
            }), t, t.classList.contains(Xe)))
        }
        _keydown(t) {
            if (![We, Re, Ve, Ke].includes(t.key)) return;
            t.stopPropagation(), t.preventDefault();
            const e = [Re, Ke].includes(t.key),
                i = w(this._getChildren().filter((t => !d(t))), t.target, e, !0);
            i && (i.focus({
                preventScroll: !0
            }), Je.getOrCreateInstance(i).show())
        }
        _getChildren() {
            return U.find(Ge, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find((t => this._elemIsActive(t))) || null
        }
        _setInitialAttributes(t, e) {
            this._setAttributeIfNotExists(t, "role", "tablist");
            for (const t of e) this._setInitialAttributesOnChild(t)
        }
        _setInitialAttributesOnChild(t) {
            t = this._getInnerElement(t);
            const e = this._elemIsActive(t),
                i = this._getOuterElement(t);
            t.setAttribute("aria-selected", e), i !== t && this._setAttributeIfNotExists(i, "role", "presentation"), e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), this._setInitialAttributesOnTargetPanel(t)
        }
        _setInitialAttributesOnTargetPanel(t) {
            const e = r(t);
            e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `#${t.id}`))
        }
        _toggleDropDown(t, e) {
            const i = this._getOuterElement(t);
            if (!i.classList.contains("dropdown")) return;
            const s = (t, s) => {
                const n = U.findOne(t, i);
                n && n.classList.toggle(s, e)
            };
            s(".dropdown-toggle", Qe), s(".dropdown-menu", Ye), i.setAttribute("aria-expanded", e)
        }
        _setAttributeIfNotExists(t, e, i) {
            t.hasAttribute(e) || t.setAttribute(e, i)
        }
        _elemIsActive(t) {
            return t.classList.contains(Qe)
        }
        _getInnerElement(t) {
            return t.matches(Ge) ? t : U.findOne(Ge, t)
        }
        _getOuterElement(t) {
            return t.closest(".nav-item, .list-group-item") || t
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = Je.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                    e[t]()
                }
            }))
        }
    }
    $.on(document, "click.bs.tab", Ue, (function(t) {
        ["A", "AREA"].includes(this.tagName) && t.preventDefault(), d(this) || Je.getOrCreateInstance(this).show()
    })), $.on(window, "load.bs.tab", (() => {
        for (const t of U.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) Je.getOrCreateInstance(t)
    })), b(Je);
    const Ze = "hide",
        ti = "show",
        ei = "showing",
        ii = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        si = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
    class ni extends V {
        constructor(t, e) {
            super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, this._setListeners()
        }
        static get Default() {
            return si
        }
        static get DefaultType() {
            return ii
        }
        static get NAME() {
            return "toast"
        }
        show() {
            $.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(Ze), g(this._element), this._element.classList.add(ti, ei), this._queueCallback((() => {
                this._element.classList.remove(ei), $.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide()
            }), this._element, this._config.animation))
        }
        hide() {
            this.isShown() && ($.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(ei), this._queueCallback((() => {
                this._element.classList.add(Ze), this._element.classList.remove(ei, ti), $.trigger(this._element, "hidden.bs.toast")
            }), this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(), this.isShown() && this._element.classList.remove(ti), super.dispose()
        }
        isShown() {
            return this._element.classList.contains(ti)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
                this.hide()
            }), this._config.delay)))
        }
        _onInteraction(t, e) {
            switch (t.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = e;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = e
            }
            if (e) return void this._clearTimeout();
            const i = t.relatedTarget;
            this._element === i || this._element.contains(i) || this._maybeScheduleHide()
        }
        _setListeners() {
            $.on(this._element, "mouseover.bs.toast", (t => this._onInteraction(t, !0))), $.on(this._element, "mouseout.bs.toast", (t => this._onInteraction(t, !1))), $.on(this._element, "focusin.bs.toast", (t => this._onInteraction(t, !0))), $.on(this._element, "focusout.bs.toast", (t => this._onInteraction(t, !1)))
        }
        _clearTimeout() {
            clearTimeout(this._timeout), this._timeout = null
        }
        static jQueryInterface(t) {
            return this.each((function() {
                const e = ni.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                    e[t](this)
                }
            }))
        }
    }
    return K(ni), b(ni), {
        Alert: Q,
        Button: Y,
        Carousel: ht,
        Collapse: mt,
        Dropdown: Mt,
        Modal: ne,
        Offcanvas: _e,
        Popover: je,
        ScrollSpy: Be,
        Tab: Je,
        Toast: ni,
        Tooltip: Pe
    }
}));

/*! * Splide.js * Version: Enabled Modified * License  : MIT * Copyright: Naotoshi Fujita */
! function() {
    "use strict";
    var t = {
            d: function(n, e) {
                for (var i in e) t.o(e, i) && !t.o(n, i) && Object.defineProperty(n, i, {
                    enumerable: !0,
                    get: e[i]
                })
            },
            o: function(t, n) {
                return Object.prototype.hasOwnProperty.call(t, n)
            },
            r: function(t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
        },
        n = {};
    t.r(n), t.d(n, {
        CREATED: function() {
            return R
        },
        DESTROYED: function() {
            return X
        },
        IDLE: function() {
            return F
        },
        MOUNTED: function() {
            return B
        },
        MOVING: function() {
            return G
        }
    });

    function e() {
        return (e = Object.assign || function(t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        }).apply(this, arguments)
    }
    var i = Object.keys;

    function o(t, n) {
        i(t).some((function(e, i) {
            return n(t[e], e, i)
        }))
    }

    function r(t) {
        return i(t).map((function(n) {
            return t[n]
        }))
    }

    function s(t) {
        return "object" == typeof t
    }

    function a(t, n) {
        var i = e({}, t);
        return o(n, (function(t, n) {
            s(t) ? (s(i[n]) || (i[n] = {}), i[n] = a(i[n], t)) : i[n] = t
        })), i
    }

    function u(t) {
        return Array.isArray(t) ? t : [t]
    }

    function c(t, n, e) {
        return Math.min(Math.max(t, n > e ? e : n), n > e ? n : e)
    }

    function d(t, n) {
        var e = 0;
        return t.replace(/%s/g, (function() {
            return u(n)[e++]
        }))
    }

    function f(t) {
        var n = typeof t;
        return "number" === n && t > 0 ? parseFloat(t) + "px" : "string" === n ? t : ""
    }

    function l(t) {
        return t < 10 ? "0" + t : t
    }

    function h(t, n) {
        if ("string" == typeof n) {
            var e = m("div", {});
            E(e, {
                position: "absolute",
                width: n
            }), w(t, e), n = e.clientWidth, b(e)
        }
        return +n || 0
    }

    function p(t, n) {
        return t ? t.querySelector(n.split(" ")[0]) : null
    }

    function g(t, n) {
        return v(t, n)[0]
    }

    function v(t, n) {
        return t ? r(t.children).filter((function(t) {
            return P(t, n.split(" ")[0]) || t.tagName === n
        })) : []
    }

    function m(t, n) {
        var e = document.createElement(t);
        return o(n, (function(t, n) {
            return C(e, n, t)
        })), e
    }

    function y(t) {
        var n = m("div", {});
        return n.innerHTML = t, n.firstChild
    }

    function b(t) {
        u(t).forEach((function(t) {
            if (t) {
                var n = t.parentElement;
                n && n.removeChild(t)
            }
        }))
    }

    function w(t, n) {
        t && t.appendChild(n)
    }

    function x(t, n) {
        if (t && n) {
            var e = n.parentElement;
            e && e.insertBefore(t, n)
        }
    }

    function E(t, n) {
        t && o(n, (function(n, e) {
            null !== n && (t.style[e] = n)
        }))
    }

    function _(t, n, e) {
        t && u(n).forEach((function(n) {
            n && t.classList[e ? "remove" : "add"](n)
        }))
    }

    function k(t, n) {
        _(t, n, !1)
    }

    function S(t, n) {
        _(t, n, !0)
    }

    function P(t, n) {
        return !!t && t.classList.contains(n)
    }

    function C(t, n, e) {
        t && t.setAttribute(n, e)
    }

    function z(t, n) {
        return t ? t.getAttribute(n) : ""
    }

    function I(t, n) {
        u(n).forEach((function(n) {
            u(t).forEach((function(t) {
                return t && t.removeAttribute(n)
            }))
        }))
    }

    function M(t) {
        return t.getBoundingClientRect()
    }
    var T = "slide",
        A = "loop",
        O = "fade",
        L = function(t, n) {
            var e, i;
            return {
                mount: function() {
                    e = n.Elements.list, t.on("transitionend", (function(t) {
                        t.target === e && i && i()
                    }), e)
                },
                start: function(o, r, s, a, u) {
                    var c = t.options,
                        d = n.Controller.edgeIndex,
                        f = c.speed;
                    i = u, t.is(T) && (0 === s && r >= d || s >= d && 0 === r) && (f = c.rewindSpeed || f), E(e, {
                        transition: "transform " + f + "ms " + c.easing,
                        transform: "translate(" + a.x + "px," + a.y + "px)"
                    })
                }
            }
        },
        W = function(t, n) {
            function e(e) {
                var i = t.options;
                E(n.Elements.slides[e], {
                    transition: "opacity " + i.speed + "ms " + i.easing
                })
            }
            return {
                mount: function() {
                    e(t.index)
                },
                start: function(t, i, o, r, s) {
                    var a = n.Elements.track;
                    E(a, {
                        height: f(a.clientHeight)
                    }), e(i), setTimeout((function() {
                        s(), E(a, {
                            height: ""
                        })
                    }))
                }
            }
        };

    function H(t) {
        console.error("[SPLIDE] " + t)
    }

    function j(t, n) {
        if (!t) throw new Error(n)
    }
    var q = "splide",
        D = {
            active: "is-active",
            visible: "is-visible",
            loading: "is-loading"
        },
        N = {
            type: "slide",
            rewind: !1,
            speed: 400,
            rewindSpeed: 0,
            waitForTransition: !0,
            width: 0,
            height: 0,
            fixedWidth: 0,
            fixedHeight: 0,
            heightRatio: 0,
            autoWidth: !1,
            autoHeight: !1,
            perPage: 1,
            perMove: 0,
            clones: 0,
            start: 0,
            focus: !1,
            gap: 0,
            padding: 0,
            arrows: !0,
            arrowPath: "",
            pagination: !0,
            autoplay: !1,
            interval: 5e3,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            resetProgress: !0,
            lazyLoad: !1,
            preloadPages: 1,
            easing: "cubic-bezier(.42,.65,.27,.99)",
            keyboard: "global",
            drag: !0,
            dragAngleThreshold: 30,
            swipeDistanceThreshold: 150,
            flickVelocityThreshold: .6,
            flickPower: 600,
            flickMaxPages: 1,
            direction: "ltr",
            cover: !1,
            accessibility: !0,
            slideFocus: !0,
            isNavigation: !1,
            trimSpace: !0,
            updateOnMove: !1,
            throttle: 100,
            destroy: !1,
            breakpoints: !1,
            classes: {
                root: q,
                slider: q + "__slider",
                track: q + "__track",
                list: q + "__list",
                slide: q + "__slide",
                container: q + "__slide__container",
                arrows: q + "__arrows",
                arrow: q + "__arrow",
                prev: q + "__arrow--prev",
                next: q + "__arrow--next",
                pagination: q + "__pagination",
                page: q + "__pagination__page",
                clone: q + "__slide--clone",
                progress: q + "__progress",
                bar: q + "__progress__bar",
                autoplay: q + "__autoplay",
                play: q + "__play",
                pause: q + "__pause",
                spinner: q + "__spinner",
                sr: q + "__sr"
            },
            i18n: {
                prev: "Previous slide",
                next: "Next slide",
                first: "Go to first slide",
                last: "Go to last slide",
                slideX: "Go to slide %s",
                pageX: "Go to page %s",
                play: "Start autoplay",
                pause: "Pause autoplay"
            }
        },
        R = 1,
        B = 2,
        F = 3,
        G = 4,
        X = 5;

    function V(t, n) {
        for (var e = 0; e < n.length; e++) {
            var i = n[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }
    var U = function() {
            function t(t, e, i) {
                var o;
                void 0 === e && (e = {}), void 0 === i && (i = {}), this.root = t instanceof Element ? t : document.querySelector(t), j(this.root, "An invalid element/selector was given."), this.Components = null, this.Event = function() {
                    var t = [];

                    function n(t) {
                        t.elm && t.elm.removeEventListener(t.event, t.handler, t.options)
                    }
                    return {
                        on: function(n, e, i, o) {
                            void 0 === i && (i = null), void 0 === o && (o = {}), n.split(" ").forEach((function(n) {
                                i && i.addEventListener(n, e, o), t.push({
                                    event: n,
                                    handler: e,
                                    elm: i,
                                    options: o
                                })
                            }))
                        },
                        off: function(e, i) {
                            void 0 === i && (i = null), e.split(" ").forEach((function(e) {
                                t = t.filter((function(t) {
                                    return !t || t.event !== e || t.elm !== i || (n(t), !1)
                                }))
                            }))
                        },
                        emit: function(n) {
                            for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) i[o - 1] = arguments[o];
                            t.forEach((function(t) {
                                t.elm || t.event.split(".")[0] !== n || t.handler.apply(t, i)
                            }))
                        },
                        destroy: function() {
                            t.forEach(n), t = []
                        }
                    }
                }(), this.State = (o = R, {
                    set: function(t) {
                        o = t
                    },
                    is: function(t) {
                        return t === o
                    }
                }), this.STATES = n, this._o = a(N, e), this._i = 0, this._c = i, this._e = {}, this._t = null
            }
            var e, i, s, u = t.prototype;
            return u.mount = function(t, n) {
                var e = this;
                void 0 === t && (t = this._e), void 0 === n && (n = this._t), this.State.set(R), this._e = t, this._t = n, this.Components = function(t, n, e) {
                    var i = {};
                    return o(n, (function(n, e) {
                        i[e] = n(t, i, e.toLowerCase())
                    })), e || (e = t.is(O) ? W : L), i.Transition = e(t, i), i
                }(this, a(this._c, t), n);
                try {
                    o(this.Components, (function(t, n) {
                        var i = t.required;
                        void 0 === i || i ? t.mount && t.mount() : delete e.Components[n]
                    }))
                } catch (t) {
                    return void H(t.message)
                }
                var i = this.State;
                return i.set(B), o(this.Components, (function(t) {
                    t.mounted && t.mounted()
                })), this.emit("mounted"), i.set(F), this.emit("ready"), E(this.root, {
                    visibility: "visible"
                }), this.on("move drag", (function() {
                    return i.set(G)
                })).on("moved dragged", (function() {
                    return i.set(F)
                })), this
            }, u.sync = function(t) {
                return this.sibling = t, this
            }, u.on = function(t, n, e, i) {
                return void 0 === e && (e = null), void 0 === i && (i = {}), this.Event.on(t, n, e, i), this
            }, u.off = function(t, n) {
                return void 0 === n && (n = null), this.Event.off(t, n), this
            }, u.emit = function(t) {
                for (var n, e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++) i[o - 1] = arguments[o];
                return (n = this.Event).emit.apply(n, [t].concat(i)), this
            }, u.go = function(t, n) {
                return void 0 === n && (n = this.options.waitForTransition), (this.State.is(F) || this.State.is(G) && !n) && this.Components.Controller.go(t, !1), this
            }, u.is = function(t) {
                return t === this._o.type
            }, u.add = function(t, n) {
                return void 0 === n && (n = -1), this.Components.Elements.add(t, n, this.refresh.bind(this)), this
            }, u.remove = function(t) {
                return this.Components.Elements.remove(t), this.refresh(), this
            }, u.refresh = function() {
                return this.emit("refresh:before").emit("refresh").emit("resize"), this
            }, u.destroy = function(t) {
                var n = this;
                if (void 0 === t && (t = !0), !this.State.is(R)) return r(this.Components).reverse().forEach((function(n) {
                    n.destroy && n.destroy(t)
                })), this.emit("destroy", t), this.Event.destroy(), this.State.set(X), this;
                this.on("ready", (function() {
                    return n.destroy(t)
                }))
            }, e = t, (i = [{
                key: "index",
                get: function() {
                    return this._i
                },
                set: function(t) {
                    this._i = parseInt(t)
                }
            }, {
                key: "length",
                get: function() {
                    return this.Components.Elements.length
                }
            }, {
                key: "options",
                get: function() {
                    return this._o
                },
                set: function(t) {
                    var n = this.State.is(R);
                    n || this.emit("update"), this._o = a(this._o, t), n || this.emit("updated", this._o)
                }
            }, {
                key: "classes",
                get: function() {
                    return this._o.classes
                }
            }, {
                key: "i18n",
                get: function() {
                    return this._o.i18n
                }
            }]) && V(e.prototype, i), s && V(e, s), t
        }(),
        Y = function(t) {
            var n = z(t.root, "data-splide");
            if (n) try {
                t.options = JSON.parse(n)
            } catch (t) {
                H(t.message)
            }
            return {
                mount: function() {
                    t.State.is(R) && (t.index = t.options.start)
                }
            }
        },
        J = "rtl",
        K = "ttb",
        Q = "update.slide",
        Z = function(t, n) {
            var e = t.root,
                i = t.classes,
                s = [];
            if (!e.id) {
                window.splide = window.splide || {};
                var a = window.splide.uid || 0;
                window.splide.uid = ++a, e.id = "splide" + l(a)
            }
            var u = {
                mount: function() {
                    var n = this;
                    this.init(), t.on("refresh", (function() {
                        n.destroy(), n.init()
                    })).on("updated", (function() {
                        S(e, c()), k(e, c())
                    }))
                },
                destroy: function() {
                    s.forEach((function(t) {
                        t.destroy()
                    })), s = [], S(e, c())
                },
                init: function() {
                    var t = this;
                    ! function() {
                        u.slider = g(e, i.slider), u.track = p(e, "." + i.track), u.list = g(u.track, i.list), j(u.track && u.list, "Track or list was not found."), u.slides = v(u.list, i.slide);
                        var t = d(i.arrows);
                        u.arrows = {
                            prev: p(t, "." + i.prev),
                            next: p(t, "." + i.next)
                        };
                        var n = d(i.autoplay);
                        u.bar = p(d(i.progress), "." + i.bar), u.play = p(n, "." + i.play), u.pause = p(n, "." + i.pause), u.track.id = u.track.id || e.id + "-track", u.list.id = u.list.id || e.id + "-list"
                    }(), k(e, c()), this.slides.forEach((function(n, e) {
                        t.register(n, e, -1)
                    }))
                },
                register: function(n, e, i) {
                    var o = function(t, n, e, i) {
                        var o = t.options.updateOnMove,
                            s = "ready.slide updated.slide resized.slide moved.slide" + (o ? " move.slide" : ""),
                            a = {
                                slide: i,
                                index: n,
                                realIndex: e,
                                container: g(i, t.classes.container),
                                isClone: e > -1,
                                mount: function() {
                                    var r = this;
                                    this.isClone || (i.id = t.root.id + "-slide" + l(n + 1)), t.on(s, (function() {
                                        return r.update()
                                    })).on(Q, c).on("click", (function() {
                                        return t.emit("click", r)
                                    }), i), o && t.on("move.slide", (function(t) {
                                        t === e && u(!0, !1)
                                    })), E(i, {
                                        display: ""
                                    }), this.styles = z(i, "style") || ""
                                },
                                destroy: function() {
                                    t.off(s).off(Q).off("click", i), S(i, r(D)), c(), I(this.container, "style")
                                },
                                update: function() {
                                    u(this.isActive(), !1), u(this.isVisible(), !0)
                                },
                                isActive: function() {
                                    return t.index === n
                                },
                                isVisible: function() {
                                    var n = this.isActive();
                                    if (t.is(O) || n) return n;
                                    var e = Math.ceil,
                                        o = M(t.Components.Elements.track),
                                        r = M(i);
                                    return t.options.direction === K ? o.top <= r.top && r.bottom <= e(o.bottom) : o.left <= r.left && r.right <= e(o.right)
                                },
                                isWithin: function(e, i) {
                                    var o = Math.abs(e - n);
                                    return t.is(T) || this.isClone || (o = Math.min(o, t.length - o)), o < i
                                }
                            };

                        function u(n, e) {
                            var o = e ? "visible" : "active",
                                r = D[o];
                            n ? (k(i, r), t.emit("" + o, a)) : P(i, r) && (S(i, r), t.emit(e ? "hidden" : "inactive", a))
                        }

                        function c() {
                            C(i, "style", a.styles)
                        }
                        return a
                    }(t, e, i, n);
                    o.mount(), s.push(o)
                },
                getSlide: function(t) {
                    return s.filter((function(n) {
                        return n.index === t
                    }))[0]
                },
                getSlides: function(t) {
                    return t ? s : s.filter((function(t) {
                        return !t.isClone
                    }))
                },
                getSlidesByPage: function(e) {
                    var i = n.Controller.toIndex(e),
                        o = t.options,
                        r = !1 !== o.focus ? 1 : o.perPage;
                    return s.filter((function(t) {
                        var n = t.index;
                        return i <= n && n < i + r
                    }))
                },
                add: function(t, n, e) {
                    if ("string" == typeof t && (t = y(t)), t instanceof Element) {
                        var i = this.slides[n];
                        E(t, {
                                display: "none"
                            }), i ? (x(t, i), this.slides.splice(n, 0, t)) : (w(this.list, t), this.slides.push(t)),
                            function(t, n) {
                                var e = t.querySelectorAll("img"),
                                    i = e.length;
                                if (i) {
                                    var r = 0;
                                    o(e, (function(t) {
                                        t.onload = t.onerror = function() {
                                            ++r === i && n()
                                        }
                                    }))
                                } else n()
                            }(t, (function() {
                                e && e(t)
                            }))
                    }
                },
                remove: function(t) {
                    b(this.slides.splice(t, 1)[0])
                },
                each: function(t) {
                    s.forEach(t)
                },
                get length() {
                    return this.slides.length
                },
                get total() {
                    return s.length
                }
            };

            function c() {
                var n = i.root,
                    e = t.options;
                return [n + "--" + e.type, n + "--" + e.direction, e.drag ? n + "--draggable" : "", e.isNavigation ? n + "--nav" : "", D.active]
            }

            function d(t) {
                return g(e, t) || g(u.slider, t)
            }
            return u
        },
        $ = Math.floor,
        tt = function(t, n) {
            var e, i, o = {
                mount: function() {
                    e = t.options, i = t.is(A), t.on("move", (function(n) {
                        t.index = n
                    })).on("updated refresh", (function(n) {
                        e = n || e, t.index = c(t.index, 0, o.edgeIndex)
                    }))
                },
                go: function(t, e) {
                    var i = this.trim(this.parse(t));
                    n.Track.go(i, this.rewind(i), e)
                },
                parse: function(n) {
                    var i = t.index,
                        r = String(n).match(/([+\-<>]+)(\d+)?/),
                        s = r ? r[1] : "",
                        a = r ? parseInt(r[2]) : 0;
                    switch (s) {
                        case "+":
                            i += a || 1;
                            break;
                        case "-":
                            i -= a || 1;
                            break;
                        case ">":
                        case "<":
                            i = function(t, n, i) {
                                if (t > -1) return o.toIndex(t);
                                var r = e.perMove,
                                    s = i ? -1 : 1;
                                if (r) return n + r * s;
                                return o.toIndex(o.toPage(n) + s)
                            }(a, i, "<" === s);
                            break;
                        default:
                            i = parseInt(n)
                    }
                    return i
                },
                toIndex: function(n) {
                    if (r()) return n;
                    var i = t.length,
                        o = e.perPage,
                        s = n * o;
                    return i - o <= (s -= (this.pageLength * o - i) * $(s / i)) && s < i && (s = i - o), s
                },
                toPage: function(n) {
                    if (r()) return n;
                    var i = t.length,
                        o = e.perPage;
                    return $(i - o <= n && n < i ? (i - 1) / o : n / o)
                },
                trim: function(t) {
                    return i || (t = e.rewind ? this.rewind(t) : c(t, 0, this.edgeIndex)), t
                },
                rewind: function(t) {
                    var n = this.edgeIndex;
                    if (i) {
                        for (; t > n;) t -= n + 1;
                        for (; t < 0;) t += n + 1
                    } else t > n ? t = 0 : t < 0 && (t = n);
                    return t
                },
                isRtl: function() {
                    return e.direction === J
                },
                get pageLength() {
                    var n = t.length;
                    return r() ? n : Math.ceil(n / e.perPage)
                },
                get edgeIndex() {
                    var n = t.length;
                    return n ? r() || e.isNavigation || i ? n - 1 : n - e.perPage : 0
                },
                get prevIndex() {
                    var n = t.index - 1;
                    return (i || e.rewind) && (n = this.rewind(n)), n > -1 ? n : -1
                },
                get nextIndex() {
                    var n = t.index + 1;
                    return (i || e.rewind) && (n = this.rewind(n)), t.index < n && n <= this.edgeIndex || 0 === n ? n : -1
                }
            };

            function r() {
                return !1 !== e.focus
            }
            return o
        },
        nt = Math.abs,
        et = function(t, n) {
            var e, i, o, r = t.options.direction === K,
                s = t.is(O),
                a = t.options.direction === J,
                u = !1,
                d = a ? 1 : -1,
                f = {
                    sign: d,
                    mount: function() {
                        i = n.Elements, e = n.Layout, o = i.list
                    },
                    mounted: function() {
                        var n = this;
                        s || (this.jump(0), t.on("mounted resize updated", (function() {
                            n.jump(t.index)
                        })))
                    },
                    go: function(e, i, o) {
                        var r = h(e),
                            a = t.index;
                        t.State.is(G) && u || (u = e !== i, o || t.emit("move", i, a, e), Math.abs(r - this.position) >= 1 || s ? n.Transition.start(e, i, a, this.toCoord(r), (function() {
                            l(e, i, a, o)
                        })) : e !== a && "move" === t.options.trimSpace ? n.Controller.go(e + e - a, o) : l(e, i, a, o))
                    },
                    jump: function(t) {
                        this.translate(h(t))
                    },
                    translate: function(t) {
                        E(o, {
                            transform: "translate" + (r ? "Y" : "X") + "(" + t + "px)"
                        })
                    },
                    cancel: function() {
                        t.is(A) ? this.shift() : this.translate(this.position), E(o, {
                            transition: ""
                        })
                    },
                    shift: function() {
                        var n = nt(this.position),
                            e = nt(this.toPosition(0)),
                            i = nt(this.toPosition(t.length)),
                            o = i - e;
                        n < e ? n += o : n > i && (n -= o), this.translate(d * n)
                    },
                    trim: function(n) {
                        return !t.options.trimSpace || t.is(A) ? n : c(n, d * (e.totalSize() - e.size - e.gap), 0)
                    },
                    toIndex: function(t) {
                        var n = this,
                            e = 0,
                            o = 1 / 0;
                        return i.getSlides(!0).forEach((function(i) {
                            var r = i.index,
                                s = nt(n.toPosition(r) - t);
                            s < o && (o = s, e = r)
                        })), e
                    },
                    toCoord: function(t) {
                        return {
                            x: r ? 0 : t,
                            y: r ? t : 0
                        }
                    },
                    toPosition: function(t) {
                        var n = e.totalSize(t) - e.slideSize(t) - e.gap;
                        return d * (n + this.offset(t))
                    },
                    offset: function(n) {
                        var i = t.options.focus,
                            o = e.slideSize(n);
                        return "center" === i ? -(e.size - o) / 2 : -(parseInt(i) || 0) * (o + e.gap)
                    },
                    get position() {
                        var t = r ? "top" : a ? "right" : "left";
                        return M(o)[t] - (M(i.track)[t] - e.padding[t] * d)
                    }
                };

            function l(n, e, i, r) {
                E(o, {
                    transition: ""
                }), u = !1, s || f.jump(e), r || t.emit("moved", e, i, n)
            }

            function h(t) {
                return f.trim(f.toPosition(t))
            }
            return f
        },
        it = function(t, n) {
            var e = [],
                i = 0,
                o = n.Elements,
                r = {
                    mount: function() {
                        var n = this;
                        t.is(A) && (s(), t.on("refresh:before", (function() {
                            n.destroy()
                        })).on("refresh", s).on("resize", (function() {
                            i !== a() && (n.destroy(), t.refresh())
                        })))
                    },
                    destroy: function() {
                        b(e), e = []
                    },
                    get clones() {
                        return e
                    },
                    get length() {
                        return e.length
                    }
                };

            function s() {
                r.destroy(),
                    function(t) {
                        var n = o.length,
                            i = o.register;
                        if (n) {
                            for (var r = o.slides; r.length < t;) r = r.concat(r);
                            r.slice(0, t).forEach((function(t, r) {
                                var s = u(t);
                                w(o.list, s), e.push(s), i(s, r + n, r % n)
                            })), r.slice(-t).forEach((function(o, s) {
                                var a = u(o);
                                x(a, r[0]), e.push(a), i(a, s - t, (n + s - t % n) % n)
                            }))
                        }
                    }(i = a())
            }

            function a() {
                var n = t.options;
                if (n.clones) return n.clones;
                var e = n.autoWidth || n.autoHeight ? o.length : n.perPage,
                    i = n.direction === K ? "Height" : "Width",
                    r = h(t.root, n["fixed" + i]);
                return r && (e = Math.ceil(o.track["client" + i] / r)), e * (n.drag ? n.flickMaxPages + 1 : 1)
            }

            function u(n) {
                var e = n.cloneNode(!0);
                return k(e, t.classes.clone), I(e, "id"), e
            }
            return r
        };

    function ot(t, n) {
        var e;
        return function() {
            e || (e = setTimeout((function() {
                t(), e = null
            }), n))
        }
    }
    var rt = function(t, n) {
            var e, o, r = n.Elements,
                s = t.options.direction === K,
                a = (e = {
                    mount: function() {
                        t.on("resize load", ot((function() {
                            t.emit("resize")
                        }), t.options.throttle), window).on("resize", c).on("updated refresh", u), u(), this.totalSize = s ? this.totalHeight : this.totalWidth, this.slideSize = s ? this.slideHeight : this.slideWidth
                    },
                    destroy: function() {
                        I([r.list, r.track], "style")
                    },
                    get size() {
                        return s ? this.height : this.width
                    }
                }, o = s ? function(t, n) {
                    var e, i, o = n.Elements,
                        r = t.root;
                    return {
                        margin: "marginBottom",
                        init: function() {
                            this.resize()
                        },
                        resize: function() {
                            i = t.options, e = o.track, this.gap = h(r, i.gap);
                            var n = i.padding,
                                s = h(r, n.top || n),
                                a = h(r, n.bottom || n);
                            this.padding = {
                                top: s,
                                bottom: a
                            }, E(e, {
                                paddingTop: f(s),
                                paddingBottom: f(a)
                            })
                        },
                        totalHeight: function(n) {
                            void 0 === n && (n = t.length - 1);
                            var e = o.getSlide(n);
                            return e ? M(e.slide).bottom - M(o.list).top + this.gap : 0
                        },
                        slideWidth: function() {
                            return h(r, i.fixedWidth || this.width)
                        },
                        slideHeight: function(t) {
                            if (i.autoHeight) {
                                var n = o.getSlide(t);
                                return n ? n.slide.offsetHeight : 0
                            }
                            var e = i.fixedHeight || (this.height + this.gap) / i.perPage - this.gap;
                            return h(r, e)
                        },
                        get width() {
                            return e.clientWidth
                        },
                        get height() {
                            var t = i.height || this.width * i.heightRatio;
                            return j(t, '"height" or "heightRatio" is missing.'), h(r, t) - this.padding.top - this.padding.bottom
                        }
                    }
                }(t, n) : function(t, n) {
                    var e, i = n.Elements,
                        o = t.root,
                        r = t.options;
                    return {
                        margin: "margin" + (r.direction === J ? "Left" : "Right"),
                        height: 0,
                        init: function() {
                            this.resize()
                        },
                        resize: function() {
                            r = t.options, e = i.track, this.gap = h(o, r.gap);
                            var n = r.padding,
                                s = h(o, n.left || n),
                                a = h(o, n.right || n);
                            this.padding = {
                                left: s,
                                right: a
                            }, E(e, {
                                paddingLeft: f(s),
                                paddingRight: f(a)
                            })
                        },
                        totalWidth: function(n) {
                            void 0 === n && (n = t.length - 1);
                            var e = i.getSlide(n),
                                o = 0;
                            if (e) {
                                var s = M(e.slide),
                                    a = M(i.list);
                                o = r.direction === J ? a.right - s.left : s.right - a.left, o += this.gap
                            }
                            return o
                        },
                        slideWidth: function(t) {
                            if (r.autoWidth) {
                                var n = i.getSlide(t);
                                return n ? n.slide.offsetWidth : 0
                            }
                            var e = r.fixedWidth || (this.width + this.gap) / r.perPage - this.gap;
                            return h(o, e)
                        },
                        slideHeight: function() {
                            var t = r.height || r.fixedHeight || this.width * r.heightRatio;
                            return h(o, t)
                        },
                        get width() {
                            return e.clientWidth - this.padding.left - this.padding.right
                        }
                    }
                }(t, n), i(o).forEach((function(t) {
                    e[t] || Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t))
                })), e);

            function u() {
                a.init(), E(t.root, {
                    maxWidth: f(t.options.width)
                }), r.each((function(t) {
                    t.slide.style[a.margin] = f(a.gap)
                })), c()
            }

            function c() {
                var n = t.options;
                a.resize(), E(r.track, {
                    height: f(a.height)
                });
                var e = n.autoHeight ? null : f(a.slideHeight());
                r.each((function(t) {
                    E(t.container, {
                        height: e
                    }), E(t.slide, {
                        width: n.autoWidth ? null : f(a.slideWidth(t.index)),
                        height: t.container ? null : e
                    })
                })), t.emit("resized")
            }
            return a
        },
        st = Math.abs,
        at = function(t, n) {
            var e, i, r, s, a = n.Track,
                u = n.Controller,
                d = t.options.direction === K,
                f = d ? "y" : "x",
                l = {
                    disabled: !1,
                    mount: function() {
                        var e = this,
                            i = n.Elements,
                            r = i.track;
                        t.on("touchstart mousedown", h, r).on("touchmove mousemove", g, r, {
                            passive: !1
                        }).on("touchend touchcancel mouseleave mouseup dragend", v, r).on("mounted refresh", (function() {
                            o(i.list.querySelectorAll("img, a"), (function(n) {
                                t.off("dragstart", n).on("dragstart", (function(t) {
                                    t.preventDefault()
                                }), n, {
                                    passive: !1
                                })
                            }))
                        })).on("mounted updated", (function() {
                            e.disabled = !t.options.drag
                        }))
                    }
                };

            function h(t) {
                l.disabled || s || p(t)
            }

            function p(t) {
                e = a.toCoord(a.position), i = m(t, {}), r = i
            }

            function g(n) {
                if (i)
                    if (r = m(n, i), s) {
                        if (n.cancelable && n.preventDefault(), !t.is(O)) {
                            var o = e[f] + r.offset[f];
                            a.translate(function(n) {
                                if (t.is(T)) {
                                    var e = a.sign,
                                        i = e * a.trim(a.toPosition(0)),
                                        o = e * a.trim(a.toPosition(u.edgeIndex));
                                    (n *= e) < i ? n = i - 7 * Math.log(i - n) : n > o && (n = o + 7 * Math.log(n - o)), n *= e
                                }
                                return n
                            }(o))
                        }
                    } else(function(n) {
                        var e = n.offset;
                        if (t.State.is(G) && t.options.waitForTransition) return !1;
                        var i = 180 * Math.atan(st(e.y) / st(e.x)) / Math.PI;
                        d && (i = 90 - i);
                        return i < t.options.dragAngleThreshold
                    })(r) && (t.emit("drag", i), s = !0, a.cancel(), p(n))
            }

            function v() {
                i = null, s && (t.emit("dragged", r), function(e) {
                    var i = e.velocity[f],
                        o = st(i);
                    if (o > 0) {
                        var r = t.options,
                            s = t.index,
                            d = i < 0 ? -1 : 1,
                            l = s;
                        if (!t.is(O)) {
                            var h = a.position;
                            o > r.flickVelocityThreshold && st(e.offset[f]) < r.swipeDistanceThreshold && (h += d * Math.min(o * r.flickPower, n.Layout.size * (r.flickMaxPages || 1))), l = a.toIndex(h)
                        }
                        l === s && o > .1 && (l = s + d * a.sign), t.is(T) && (l = c(l, 0, u.edgeIndex)), u.go(l, r.isNavigation)
                    }
                }(r), s = !1)
            }

            function m(t, n) {
                var e = t.timeStamp,
                    i = t.touches,
                    o = i ? i[0] : t,
                    r = o.clientX,
                    s = o.clientY,
                    a = n.to || {},
                    u = a.x,
                    c = void 0 === u ? r : u,
                    d = a.y,
                    f = {
                        x: r - c,
                        y: s - (void 0 === d ? s : d)
                    },
                    l = e - (n.time || 0);
                return {
                    to: {
                        x: r,
                        y: s
                    },
                    offset: f,
                    time: e,
                    velocity: {
                        x: f.x / l,
                        y: f.y / l
                    }
                }
            }
            return l
        },
        ut = function(t, n) {
            var e = !1;

            function i(t) {
                e && (t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation())
            }
            return {
                required: t.options.drag,
                mount: function() {
                    t.on("click", i, n.Elements.track, {
                        capture: !0
                    }).on("drag", (function() {
                        e = !0
                    })).on("dragged", (function() {
                        setTimeout((function() {
                            e = !1
                        }))
                    }))
                }
            }
        },
        ct = 1,
        dt = 2,
        ft = 3,
        lt = function(t, n, e) {
            var i, o, r, s = t.classes,
                a = t.root,
                u = n.Elements;

            function c() {
                var r = n.Controller,
                    s = r.prevIndex,
                    a = r.nextIndex,
                    u = t.length > t.options.perPage || t.is(A);
                i.disabled = s < 0 || !u, o.disabled = a < 0 || !u, t.emit(e + ":updated", i, o, s, a)
            }

            function d(n) {
                return y('<button class="' + s.arrow + " " + (n ? s.prev : s.next) + '" type="button"><svg xmlns="http://www.w3.org/2000/svg"\tviewBox="0 0 40 40"\twidth="40"\theight="40"><path d="' + (t.options.arrowPath || "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z") + '" />')
            }
            return {
                required: t.options.arrows,
                mount: function() {
                    i = u.arrows.prev, o = u.arrows.next, i && o || !t.options.arrows || (i = d(!0), o = d(!1), r = !0, function() {
                        var n = m("div", {
                            class: s.arrows
                        });
                        w(n, i), w(n, o);
                        var e = u.slider,
                            r = "slider" === t.options.arrows && e ? e : a;
                        x(n, r.firstElementChild)
                    }()), i && o && t.on("click", (function() {
                        t.go("<")
                    }), i).on("click", (function() {
                        t.go(">")
                    }), o).on("mounted move updated refresh", c), this.arrows = {
                        prev: i,
                        next: o
                    }
                },
                mounted: function() {
                    t.emit(e + ":mounted", i, o)
                },
                destroy: function() {
                    I([i, o], "disabled"), r && b(i.parentElement)
                }
            }
        },
        ht = "move.page",
        pt = "updated.page refresh.page",
        gt = function(t, n, e) {
            var i = {},
                o = n.Elements,
                r = {
                    mount: function() {
                        var n = t.options.pagination;
                        if (n) {
                            i = function() {
                                var n = t.options,
                                    e = t.classes,
                                    i = m("ul", {
                                        class: e.pagination
                                    }),
                                    r = o.getSlides(!1).filter((function(t) {
                                        return !1 !== n.focus || t.index % n.perPage == 0
                                    })).map((function(n, r) {
                                        var s = m("li", {}),
                                            a = m("button", {
                                                class: e.page,
                                                type: "button"
                                            });
                                        return w(s, a), w(i, s), t.on("click", (function() {
                                            t.go(">" + r)
                                        }), a), {
                                            li: s,
                                            button: a,
                                            page: r,
                                            Slides: o.getSlidesByPage(r)
                                        }
                                    }));
                                return {
                                    list: i,
                                    items: r
                                }
                            }();
                            var e = o.slider;
                            w("slider" === n && e ? e : t.root, i.list), t.on(ht, s)
                        }
                        t.off(pt).on(pt, (function() {
                            r.destroy(), t.options.pagination && (r.mount(), r.mounted())
                        }))
                    },
                    mounted: function() {
                        if (t.options.pagination) {
                            var n = t.index;
                            t.emit(e + ":mounted", i, this.getItem(n)), s(n, -1)
                        }
                    },
                    destroy: function() {
                        b(i.list), i.items && i.items.forEach((function(n) {
                            t.off("click", n.button)
                        })), t.off(ht), i = {}
                    },
                    getItem: function(t) {
                        return i.items[n.Controller.toPage(t)]
                    },
                    get data() {
                        return i
                    }
                };

            function s(n, o) {
                var s = r.getItem(o),
                    a = r.getItem(n),
                    u = D.active;
                s && S(s.button, u), a && k(a.button, u), t.emit(e + ":updated", i, s, a)
            }
            return r
        },
        vt = "data-splide-lazy",
        mt = "data-splide-lazy-srcset",
        yt = "aria-current",
        bt = "aria-controls",
        wt = "aria-label",
        xt = "aria-hidden",
        Et = "tabindex",
        _t = {
            ltr: {
                ArrowLeft: "<",
                ArrowRight: ">",
                Left: "<",
                Right: ">"
            },
            rtl: {
                ArrowLeft: ">",
                ArrowRight: "<",
                Left: ">",
                Right: "<"
            },
            ttb: {
                ArrowUp: "<",
                ArrowDown: ">",
                Up: "<",
                Down: ">"
            }
        },
        kt = function(t, n) {
            var e = t.i18n,
                i = n.Elements,
                o = [xt, Et, bt, wt, yt, "role"];

            function r(n, e) {
                C(n, xt, !e), t.options.slideFocus && C(n, Et, e ? 0 : -1)
            }

            function s(t, n) {
                var e = i.track.id;
                C(t, bt, e), C(n, bt, e)
            }

            function a(n, i, o, r) {
                var s = t.index,
                    a = o > -1 && s < o ? e.last : e.prev,
                    u = r > -1 && s > r ? e.first : e.next;
                C(n, wt, a), C(i, wt, u)
            }

            function u(n, i) {
                i && C(i.button, yt, !0), n.items.forEach((function(n) {
                    var i = t.options,
                        o = d(!1 === i.focus && i.perPage > 1 ? e.pageX : e.slideX, n.page + 1),
                        r = n.button,
                        s = n.Slides.map((function(t) {
                            return t.slide.id
                        }));
                    C(r, bt, s.join(" ")), C(r, wt, o)
                }))
            }

            function c(t, n, e) {
                n && I(n.button, yt), e && C(e.button, yt, !0)
            }

            function f(t) {
                i.each((function(n) {
                    var i = n.slide,
                        o = n.realIndex;
                    h(i) || C(i, "role", "button");
                    var r = o > -1 ? o : n.index,
                        s = d(e.slideX, r + 1),
                        a = t.Components.Elements.getSlide(r);
                    C(i, wt, s), a && C(i, bt, a.slide.id)
                }))
            }

            function l(t, n) {
                var e = t.slide;
                n ? C(e, yt, !0) : I(e, yt)
            }

            function h(t) {
                return "BUTTON" === t.tagName
            }
            return {
                required: t.options.accessibility,
                mount: function() {
                    t.on("visible", (function(t) {
                        r(t.slide, !0)
                    })).on("hidden", (function(t) {
                        r(t.slide, !1)
                    })).on("arrows:mounted", s).on("arrows:updated", a).on("pagination:mounted", u).on("pagination:updated", c).on("refresh", (function() {
                        I(n.Clones.clones, o)
                    })), t.options.isNavigation && t.on("navigation:mounted navigation:updated", f).on("active", (function(t) {
                        l(t, !0)
                    })).on("inactive", (function(t) {
                        l(t, !1)
                    })), ["play", "pause"].forEach((function(t) {
                        var n = i[t];
                        n && (h(n) || C(n, "role", "button"), C(n, bt, i.track.id), C(n, wt, e[t]))
                    }))
                },
                destroy: function() {
                    var t = n.Arrows,
                        e = t ? t.arrows : {};
                    I(i.slides.concat([e.prev, e.next, i.play, i.pause]), o)
                }
            }
        },
        St = "move.sync",
        Pt = "mouseup touchend",
        Ct = [" ", "Enter", "Spacebar"],
        zt = {
            Options: Y,
            Breakpoints: function(t) {
                var n, e, i = t.options.breakpoints,
                    o = ot(s, 50),
                    r = [];

                function s() {
                    var o, s = (o = r.filter((function(t) {
                        return t.mql.matches
                    }))[0]) ? o.point : -1;
                    if (s !== e) {
                        e = s;
                        var a = t.State,
                            u = i[s] || n,
                            c = u.destroy;
                        c ? (t.options = n, t.destroy("completely" === c)) : (a.is(X) && t.mount(), t.options = u)
                    }
                }
                return {
                    required: i && matchMedia,
                    mount: function() {
                        r = Object.keys(i).sort((function(t, n) {
                            return +t - +n
                        })).map((function(t) {
                            return {
                                point: t,
                                mql: matchMedia("(max-width:" + t + "px)")
                            }
                        })), this.destroy(!0), addEventListener("resize", o), n = t.options, s()
                    },
                    destroy: function(t) {
                        t && removeEventListener("resize", o)
                    }
                }
            },
            Controller: tt,
            Elements: Z,
            Track: et,
            Clones: it,
            Layout: rt,
            Drag: at,
            Click: ut,
            Autoplay: function(t, n, e) {
                var i, o = [],
                    r = n.Elements,
                    s = {
                        required: t.options.autoplay,
                        mount: function() {
                            var n = t.options;
                            r.slides.length > n.perPage && (i = function(t, n, e) {
                                var i, o, r, s = window.requestAnimationFrame,
                                    a = !0,
                                    u = function u(c) {
                                        a || (i || (i = c, r && r < 1 && (i -= r * n)), r = (o = c - i) / n, o >= n && (i = 0, r = 1, t()), e && e(r), s(u))
                                    };
                                return {
                                    pause: function() {
                                        a = !0, i = 0
                                    },
                                    play: function(t) {
                                        i = 0, t && (r = 0), a && (a = !1, s(u))
                                    }
                                }
                            }((function() {
                                t.go(">")
                            }), n.interval, (function(n) {
                                t.emit(e + ":playing", n), r.bar && E(r.bar, {
                                    width: 100 * n + "%"
                                })
                            })), function() {
                                var n = t.options,
                                    e = t.sibling,
                                    i = [t.root, e ? e.root : null];
                                n.pauseOnHover && (a(i, "mouseleave", ct, !0), a(i, "mouseenter", ct, !1));
                                n.pauseOnFocus && (a(i, "focusout", dt, !0), a(i, "focusin", dt, !1));
                                r.play && t.on("click", (function() {
                                    s.play(dt), s.play(ft)
                                }), r.play);
                                r.pause && a([r.pause], "click", ft, !1);
                                t.on("move refresh", (function() {
                                    s.play()
                                })).on("destroy", (function() {
                                    s.pause()
                                }))
                            }(), this.play())
                        },
                        play: function(n) {
                            void 0 === n && (n = 0), (o = o.filter((function(t) {
                                return t !== n
                            }))).length || (t.emit(e + ":play"), i.play(t.options.resetProgress))
                        },
                        pause: function(n) {
                            void 0 === n && (n = 0), i.pause(), -1 === o.indexOf(n) && o.push(n), 1 === o.length && t.emit(e + ":pause")
                        }
                    };

                function a(n, e, i, o) {
                    n.forEach((function(n) {
                        t.on(e, (function() {
                            s[o ? "play" : "pause"](i)
                        }), n)
                    }))
                }
                return s
            },
            Cover: function(t, n) {
                function e(t) {
                    n.Elements.each((function(n) {
                        var e = g(n.slide, "IMG") || g(n.container, "IMG");
                        e && e.src && i(e, t)
                    }))
                }

                function i(t, n) {
                    E(t.parentElement, {
                        background: n ? "" : 'center/cover no-repeat url("' + t.src + '")'
                    }), E(t, {
                        display: n ? "" : "none"
                    })
                }
                return {
                    required: t.options.cover,
                    mount: function() {
                        t.on("lazyload:loaded", (function(t) {
                            i(t, !1)
                        })), t.on("mounted updated refresh", (function() {
                            return e(!1)
                        }))
                    },
                    destroy: function() {
                        e(!0)
                    }
                }
            },
            Arrows: lt,
            Pagination: gt,
            LazyLoad: function(t, n, e) {
                var i, r, s = t.options,
                    a = "sequential" === s.lazyLoad;

                function u() {
                    r = [], i = 0
                }

                function c(n) {
                    n = isNaN(n) ? t.index : n, (r = r.filter((function(t) {
                        return !t.Slide.isWithin(n, s.perPage * (s.preloadPages + 1)) || (d(t.img, t.Slide), !1)
                    })))[0] || t.off("moved." + e)
                }

                function d(n, e) {
                    k(e.slide, D.loading);
                    var i = m("span", {
                        class: t.classes.spinner
                    });
                    w(n.parentElement, i), n.onload = function() {
                        l(n, i, e, !1)
                    }, n.onerror = function() {
                        l(n, i, e, !0)
                    }, C(n, "srcset", z(n, mt) || ""), C(n, "src", z(n, vt) || "")
                }

                function f() {
                    if (i < r.length) {
                        var t = r[i];
                        d(t.img, t.Slide)
                    }
                    i++
                }

                function l(n, i, o, r) {
                    S(o.slide, D.loading), r || (b(i), E(n, {
                        display: ""
                    }), t.emit(e + ":loaded", n).emit("resize")), a && f()
                }
                return {
                    required: s.lazyLoad,
                    mount: function() {
                        t.on("mounted refresh", (function() {
                            u(), n.Elements.each((function(t) {
                                o(t.slide.querySelectorAll("[data-splide-lazy], [" + mt + "]"), (function(n) {
                                    n.src || n.srcset || (r.push({
                                        img: n,
                                        Slide: t
                                    }), E(n, {
                                        display: "none"
                                    }))
                                }))
                            })), a && f()
                        })), a || t.on("mounted refresh moved." + e, c)
                    },
                    destroy: u
                }
            },
            Keyboard: function(t) {
                var n;
                return {
                    mount: function() {
                        t.on("mounted updated", (function() {
                            var e = t.options,
                                i = t.root,
                                o = _t[e.direction],
                                r = e.keyboard;
                            n && (t.off("keydown", n), I(i, Et)), r && ("focused" === r ? (n = i, C(i, Et, 0)) : n = document, t.on("keydown", (function(n) {
                                o[n.key] && t.go(o[n.key])
                            }), n))
                        }))
                    }
                }
            },
            Sync: function(t) {
                var n = t.sibling,
                    e = n && n.options.isNavigation;

                function i() {
                    t.on(St, (function(t, e, i) {
                        n.off(St).go(n.is(A) ? i : t, !1), o()
                    }))
                }

                function o() {
                    n.on(St, (function(n, e, o) {
                        t.off(St).go(t.is(A) ? o : n, !1), i()
                    }))
                }

                function r() {
                    n.Components.Elements.each((function(n) {
                        var e = n.slide,
                            i = n.index;
                        t.off(Pt, e).on(Pt, (function(t) {
                            t.button && 0 !== t.button || s(i)
                        }), e), t.off("keyup", e).on("keyup", (function(t) {
                            Ct.indexOf(t.key) > -1 && (t.preventDefault(), s(i))
                        }), e, {
                            passive: !1
                        })
                    }))
                }

                function s(e) {
                    t.State.is(F) && n.go(e)
                }
                return {
                    required: !!n,
                    mount: function() {
                        i(), o(), e && (r(), t.on("refresh", (function() {
                            setTimeout((function() {
                                r(), n.emit("navigation:updated", t)
                            }))
                        })))
                    },
                    mounted: function() {
                        e && n.emit("navigation:mounted", t)
                    }
                }
            },
            A11y: kt
        };
    var It = function(t) {
        var n, e;

        function i(n, e) {
            return t.call(this, n, e, zt) || this
        }
        return e = t, (n = i).prototype = Object.create(e.prototype), n.prototype.constructor = n, n.__proto__ = e, i
    }(U);
    window.Splide = It
}();

/*! * LazyLoad.jsVersion 17 - https://github.com/verlok/vanilla-lazyload*/
! function(t, n) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).LazyLoad = n()
}(this, (function() {
    "use strict";

    function t() {
        return (t = Object.assign || function(t) {
            for (var n = 1; n < arguments.length; n++) {
                var e = arguments[n];
                for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i])
            }
            return t
        }).apply(this, arguments)
    }
    var n = "undefined" != typeof window,
        e = n && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        i = n && "IntersectionObserver" in window,
        o = n && "classList" in document.createElement("p"),
        r = n && window.devicePixelRatio > 1,
        a = {
            elements_selector: ".preload-img",
            container: e || n ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "src",
            data_bg_hidpi: "bg-hidpi",
            data_bg_multi: "bg-multi",
            data_bg_multi_hidpi: "bg-multi-hidpi",
            data_poster: "poster",
            class_applied: "applied",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            class_entered: "entered",
            class_exited: "exited",
            unobserve_completed: !0,
            unobserve_entered: !1,
            cancel_on_exit: !0,
            callback_enter: null,
            callback_exit: null,
            callback_applied: null,
            callback_loading: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            callback_cancel: null,
            use_native: !1
        },
        c = function(n) {
            return t({}, a, n)
        },
        s = function(t, n) {
            var e, i = "LazyLoad::Initialized",
                o = new t(n);
            try {
                e = new CustomEvent(i, {
                    detail: {
                        instance: o
                    }
                })
            } catch (t) {
                (e = document.createEvent("CustomEvent")).initCustomEvent(i, !1, !1, {
                    instance: o
                })
            }
            window.dispatchEvent(e)
        },
        l = "loading",
        u = "loaded",
        d = "applied",
        f = "error",
        _ = "native",
        g = "data-",
        v = "ll-status",
        p = function(t, n) {
            return t.getAttribute(g + n)
        },
        b = function(t) {
            return p(t, v)
        },
        h = function(t, n) {
            return function(t, n, e) {
                var i = "data-ll-status";
                null !== e ? t.setAttribute(i, e) : t.removeAttribute(i)
            }(t, 0, n)
        },
        m = function(t) {
            return h(t, null)
        },
        E = function(t) {
            return null === b(t)
        },
        y = function(t) {
            return b(t) === _
        },
        A = [l, u, d, f],
        I = function(t, n, e, i) {
            t && (void 0 === i ? void 0 === e ? t(n) : t(n, e) : t(n, e, i))
        },
        L = function(t, n) {
            o ? t.classList.add(n) : t.className += (t.className ? " " : "") + n
        },
        w = function(t, n) {
            o ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
        },
        k = function(t) {
            return t.llTempImage
        },
        O = function(t, n) {
            if (n) {
                var e = n._observer;
                e && e.unobserve(t)
            }
        },
        x = function(t, n) {
            t && (t.loadingCount += n)
        },
        z = function(t, n) {
            t && (t.toLoadCount = n)
        },
        C = function(t) {
            for (var n, e = [], i = 0; n = t.children[i]; i += 1) "SOURCE" === n.tagName && e.push(n);
            return e
        },
        N = function(t, n, e) {
            e && t.setAttribute(n, e)
        },
        M = function(t, n) {
            t.removeAttribute(n)
        },
        R = function(t) {
            return !!t.llOriginalAttrs
        },
        G = function(t) {
            if (!R(t)) {
                var n = {};
                n.src = t.getAttribute("src"), n.srcset = t.getAttribute("srcset"), n.sizes = t.getAttribute("sizes"), t.llOriginalAttrs = n
            }
        },
        T = function(t) {
            if (R(t)) {
                var n = t.llOriginalAttrs;
                N(t, "src", n.src), N(t, "srcset", n.srcset), N(t, "sizes", n.sizes)
            }
        },
        j = function(t, n) {
            N(t, "sizes", p(t, n.data_sizes)), N(t, "srcset", p(t, n.data_srcset)), N(t, "src", p(t, n.data_src))
        },
        D = function(t) {
            M(t, "src"), M(t, "srcset"), M(t, "sizes")
        },
        F = function(t, n) {
            var e = t.parentNode;
            e && "PICTURE" === e.tagName && C(e).forEach(n)
        },
        P = {
            IMG: function(t, n) {
                F(t, (function(t) {
                    G(t), j(t, n)
                })), G(t), j(t, n)
            },
            IFRAME: function(t, n) {
                N(t, "src", p(t, n.data_src))
            },
            VIDEO: function(t, n) {
                ! function(t, e) {
                    C(t).forEach((function(t) {
                        N(t, "src", p(t, n.data_src))
                    }))
                }(t), N(t, "poster", p(t, n.data_poster)), N(t, "src", p(t, n.data_src)), t.load()
            }
        },
        S = function(t, n) {
            var e = P[t.tagName];
            e && e(t, n)
        },
        V = function(t, n, e) {
            x(e, 1), L(t, n.class_loading), h(t, l), I(n.callback_loading, t, e)
        },
        U = ["IMG", "IFRAME", "VIDEO"],
        $ = function(t, n) {
            !n || function(t) {
                return t.loadingCount > 0
            }(n) || function(t) {
                return t.toLoadCount > 0
            }(n) || I(t.callback_finish, n)
        },
        q = function(t, n, e) {
            t.addEventListener(n, e), t.llEvLisnrs[n] = e
        },
        H = function(t, n, e) {
            t.removeEventListener(n, e)
        },
        B = function(t) {
            return !!t.llEvLisnrs
        },
        J = function(t) {
            if (B(t)) {
                var n = t.llEvLisnrs;
                for (var e in n) {
                    var i = n[e];
                    H(t, e, i)
                }
                delete t.llEvLisnrs
            }
        },
        K = function(t, n, e) {
            ! function(t) {
                delete t.llTempImage
            }(t), x(e, -1),
                function(t) {
                    t && (t.toLoadCount -= 1)
                }(e), w(t, n.class_loading), n.unobserve_completed && O(t, e)
        },
        Q = function(t, n, e) {
            var i = k(t) || t;
            B(i) || function(t, n, e) {
                B(t) || (t.llEvLisnrs = {});
                var i = "VIDEO" === t.tagName ? "loadeddata" : "load";
                q(t, i, n), q(t, "error", e)
            }(i, (function(o) {
                ! function(t, n, e, i) {
                    var o = y(n);
                    K(n, e, i), L(n, e.class_loaded), h(n, u), I(e.callback_loaded, n, i), o || $(e, i)
                }(0, t, n, e), J(i)
            }), (function(o) {
                ! function(t, n, e, i) {
                    var o = y(n);
                    K(n, e, i), L(n, e.class_error), h(n, f), I(e.callback_error, n, i), o || $(e, i)
                }(0, t, n, e), J(i)
            }))
        },
        W = function(t, n, e) {
            ! function(t) {
                t.llTempImage = document.createElement("IMG")
            }(t), Q(t, n, e),
                function(t, n, e) {
                    var i = p(t, n.data_bg),
                        o = p(t, n.data_bg_hidpi),
                        a = r && o ? o : i;
                    a && (t.style.backgroundImage = 'url("'.concat(a, '")'), k(t).setAttribute("src", a), V(t, n, e))
                }(t, n, e),
                function(t, n, e) {
                    var i = p(t, n.data_bg_multi),
                        o = p(t, n.data_bg_multi_hidpi),
                        a = r && o ? o : i;
                    a && (t.style.backgroundImage = a, function(t, n, e) {
                        L(t, n.class_applied), h(t, d), n.unobserve_completed && O(t, n), I(n.callback_applied, t, e)
                    }(t, n, e))
                }(t, n, e)
        },
        X = function(t, n, e) {
            ! function(t) {
                return U.indexOf(t.tagName) > -1
            }(t) ? W(t, n, e): function(t, n, e) {
                Q(t, n, e), S(t, n), V(t, n, e)
            }(t, n, e)
        },
        Y = ["IMG", "IFRAME"],
        Z = function(t) {
            return t.use_native && "loading" in HTMLImageElement.prototype
        },
        tt = function(t, n, e) {
            t.forEach((function(t) {
                return function(t) {
                    return t.isIntersecting || t.intersectionRatio > 0
                }(t) ? function(t, n, e, i) {
                    h(t, "entered"), L(t, e.class_entered), w(t, e.class_exited),
                        function(t, n, e) {
                            n.unobserve_entered && O(t, e)
                        }(t, e, i), I(e.callback_enter, t, n, i),
                        function(t) {
                            return A.indexOf(b(t)) >= 0
                        }(t) || X(t, e, i)
                }(t.target, t, n, e) : function(t, n, e, i) {
                    E(t) || (L(t, e.class_exited), function(t, n, e, i) {
                        e.cancel_on_exit && function(t) {
                            return b(t) === l
                        }(t) && "IMG" === t.tagName && (J(t), function(t) {
                            F(t, (function(t) {
                                D(t)
                            })), D(t)
                        }(t), function(t) {
                            F(t, (function(t) {
                                T(t)
                            })), T(t)
                        }(t), w(t, e.class_loading), x(i, -1), m(t), I(e.callback_cancel, t, n, i))
                    }(t, n, e, i), I(e.callback_exit, t, n, i))
                }(t.target, t, n, e)
            }))
        },
        nt = function(t) {
            return Array.prototype.slice.call(t)
        },
        et = function(t) {
            return t.container.querySelectorAll(t.elements_selector)
        },
        it = function(t) {
            return function(t) {
                return b(t) === f
            }(t)
        },
        ot = function(t, n) {
            return function(t) {
                return nt(t).filter(E)
            }(t || et(n))
        },
        rt = function(t, e) {
            var o = c(t);
            this._settings = o, this.loadingCount = 0,
                function(t, n) {
                    i && !Z(t) && (n._observer = new IntersectionObserver((function(e) {
                        tt(e, t, n)
                    }), function(t) {
                        return {
                            root: t.container === document ? null : t.container,
                            rootMargin: t.thresholds || t.threshold + "px"
                        }
                    }(t)))
                }(o, this),
                function(t, e) {
                    n && window.addEventListener("online", (function() {
                        ! function(t, n) {
                            var e;
                            (e = et(t), nt(e).filter(it)).forEach((function(n) {
                                w(n, t.class_error), m(n)
                            })), n.update()
                        }(t, e)
                    }))
                }(o, this), this.update(e)
        };
    return rt.prototype = {
        update: function(t) {
            var n, o, r = this._settings,
                a = ot(t, r);
            z(this, a.length), !e && i ? Z(r) ? function(t, n, e) {
                t.forEach((function(t) {
                    -1 !== Y.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function(t, n, e) {
                        Q(t, n, e), S(t, n), h(t, _)
                    }(t, n, e))
                })), z(e, 0)
            }(a, r, this) : (o = a, function(t) {
                t.disconnect()
            }(n = this._observer), function(t, n) {
                n.forEach((function(n) {
                    t.observe(n)
                }))
            }(n, o)) : this.loadAll(a)
        },
        destroy: function() {
            this._observer && this._observer.disconnect(), et(this._settings).forEach((function(t) {
                delete t.llOriginalAttrs
            })), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount
        },
        loadAll: function(t) {
            var n = this,
                e = this._settings;
            ot(t, e).forEach((function(t) {
                O(t, n), X(t, e, n)
            }))
        }
    }, rt.load = function(t, n) {
        var e = c(n);
        X(t, e)
    }, rt.resetStatus = function(t) {
        m(t)
    }, n && function(t, n) {
        if (n)
            if (n.length)
                for (var e, i = 0; e = n[i]; i += 1) s(t, e);
            else s(t, n)
    }(rt, window.lazyLoadOptions), rt
}));

/*Enabled AJAX Custom SWUP Plugin*/
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Swup = t() : e.Swup = t()
}(window, function() {
    return function(e) {
        var t = {};

        function n(i) {
            if (t[i]) return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = e, n.c = t, n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }, n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, n.t = function(e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var r in e) n.d(i, r, function(t) {
                    return e[t]
                }.bind(null, r));
            return i
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 2)
    }([function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Link = t.markSwupElements = t.getCurrentUrl = t.transitionEnd = t.fetch = t.getDataFromHtml = t.createHistoryRecord = t.classify = void 0;
        var i = d(n(8)),
            r = d(n(9)),
            o = d(n(10)),
            a = d(n(11)),
            s = d(n(12)),
            u = d(n(13)),
            l = d(n(14)),
            c = d(n(15));

        function d(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.classify = i.default, t.createHistoryRecord = r.default, t.getDataFromHtml = o.default, t.fetch = a.default, t.transitionEnd = s.default, t.getCurrentUrl = u.default, t.markSwupElements = l.default, t.Link = c.default
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.query = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            return "string" != typeof e ? e : t.querySelector(e)
        }, t.queryAll = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
            return "string" != typeof e ? e : Array.prototype.slice.call(t.querySelectorAll(e))
        }
    }, function(e, t, n) {
        "use strict";
        var i, r = (i = n(3)) && i.__esModule ? i : {
            default: i
        };
        e.exports = r.default
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            },
            r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            o = y(n(4)),
            a = y(n(6)),
            s = y(n(7)),
            u = y(n(16)),
            l = y(n(17)),
            c = y(n(18)),
            d = y(n(19)),
            f = y(n(20)),
            h = y(n(21)),
            p = y(n(22)),
            m = n(23),
            g = n(1),
            v = n(0);

        function y(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var w = function() {
            function e(t) {
                ! function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                var n = {
                        animateHistoryBrowsing: !1,
                        animationSelector: '[class*="transition-"]',
                        linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
                        cache: !0,
                        containers: ["#swup"],
                        requestHeaders: {
                            "X-Requested-With": "swup",
                            Accept: "text/html, application/xhtml+xml"
                        },
                        plugins: [],
                        skipPopStateHandling: function(e) {
                            return !(e.state && "swup" === e.state.source)
                        }
                    },
                    r = i({}, n, t);
                this._handlers = {
                    animationInDone: [],
                    animationInStart: [],
                    animationOutDone: [],
                    animationOutStart: [],
                    animationSkipped: [],
                    clickLink: [],
                    contentReplaced: [],
                    disabled: [],
                    enabled: [],
                    openPageInNewTab: [],
                    pageLoaded: [],
                    pageRetrievedFromCache: [],
                    pageView: [],
                    popState: [],
                    samePage: [],
                    samePageWithHash: [],
                    serverError: [],
                    transitionStart: [],
                    transitionEnd: [],
                    willReplaceContent: []
                }, this.scrollToElement = null, this.preloadPromise = null, this.options = r, this.plugins = [], this.transition = {}, this.delegatedListeners = {}, this.boundPopStateHandler = this.popStateHandler.bind(this), this.cache = new a.default, this.cache.swup = this, this.loadPage = s.default, this.renderPage = u.default, this.triggerEvent = l.default, this.on = c.default, this.off = d.default, this.updateTransition = f.default, this.getAnimationPromises = h.default, this.getPageData = p.default, this.log = function() {}, this.use = m.use, this.unuse = m.unuse, this.findPlugin = m.findPlugin, this.enable()
            }
            return r(e, [{
                key: "enable",
                value: function() {
                    var e = this;
                    if ("undefined" != typeof Promise) {
                        this.delegatedListeners.click = (0, o.default)(document, this.options.linkSelector, "click", this.linkClickHandler.bind(this)), window.addEventListener("popstate", this.boundPopStateHandler);
                        var t = (0, v.getDataFromHtml)(document.documentElement.outerHTML, this.options.containers);
                        t.url = t.responseURL = (0, v.getCurrentUrl)(), this.options.cache && this.cache.cacheUrl(t), (0, v.markSwupElements)(document.documentElement, this.options.containers), this.options.plugins.forEach(function(t) {
                            e.use(t)
                        }), window.history.replaceState(Object.assign({}, window.history.state, {
                            url: window.location.href,
                            random: Math.random(),
                            source: "swup"
                        }), document.title, window.location.href), this.triggerEvent("enabled"), document.documentElement.classList.add("swup-enabled"), this.triggerEvent("pageView")
                    } else console.warn("Promise is not supported")
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this;
                    this.delegatedListeners.click.destroy(), window.removeEventListener("popstate", this.boundPopStateHandler), this.cache.empty(), this.options.plugins.forEach(function(t) {
                        e.unuse(t)
                    }), (0, g.queryAll)("[data-swup]").forEach(function(e) {
                        e.removeAttribute("data-swup")
                    }), this.off(), this.triggerEvent("disabled"), document.documentElement.classList.remove("swup-enabled")
                }
            }, {
                key: "linkClickHandler",
                value: function(e) {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) this.triggerEvent("openPageInNewTab", e);
                    else if (0 === e.button) {
                        this.triggerEvent("clickLink", e), e.preventDefault();
                        var t = new v.Link(e.delegateTarget);
                        if (t.getAddress() == (0, v.getCurrentUrl)() || "" == t.getAddress()) "" != t.getHash() ? (this.triggerEvent("samePageWithHash", e), null != document.querySelector(t.getHash()) ? history.replaceState({
                            url: t.getAddress() + t.getHash(),
                            random: Math.random(),
                            source: "swup"
                        }, document.title, t.getAddress() + t.getHash()) : console.warn("Element for offset not found (" + t.getHash() + ")")) : this.triggerEvent("samePage", e);
                        else {
                            "" != t.getHash() && (this.scrollToElement = t.getHash());
                            var n = e.delegateTarget.getAttribute("data-swup-transition");
                            this.loadPage({
                                url: t.getAddress(),
                                customTransition: n
                            }, !1)
                        }
                    }
                }
            }, {
                key: "popStateHandler",
                value: function(e) {
                    if (!this.options.skipPopStateHandling(e)) {
                        var t = new v.Link(e.state ? e.state.url : window.location.pathname);
                        "" !== t.getHash() ? this.scrollToElement = t.getHash() : e.preventDefault(), this.triggerEvent("popState", e), this.loadPage({
                            url: t.getAddress()
                        }, e)
                    }
                }
            }]), e
        }();
        t.default = w
    }, function(e, t, n) {
        var i = n(5);
        e.exports = function(e, t, n, r, o) {
            var a = function(e, t, n, r) {
                return function(n) {
                    n.delegateTarget = i(n.target, t), n.delegateTarget && r.call(e, n)
                }
            }.apply(this, arguments);
            return e.addEventListener(n, a, o), {
                destroy: function() {
                    e.removeEventListener(n, a, o)
                }
            }
        }
    }, function(e, t) {
        if ("undefined" != typeof Element && !Element.prototype.matches) {
            var n = Element.prototype;
            n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
        }
        e.exports = function(e, t) {
            for (; e && 9 !== e.nodeType;) {
                if ("function" == typeof e.matches && e.matches(t)) return e;
                e = e.parentNode
            }
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            r = t.Cache = function() {
                function e() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.pages = {}, this.last = null
                }
                return i(e, [{
                    key: "cacheUrl",
                    value: function(e) {
                        e.url in this.pages == 0 && (this.pages[e.url] = e), this.last = this.pages[e.url], this.swup.log("Cache (" + Object.keys(this.pages).length + ")", this.pages)
                    }
                }, {
                    key: "getPage",
                    value: function(e) {
                        return this.pages[e]
                    }
                }, {
                    key: "getCurrentPage",
                    value: function() {
                        return this.getPage(window.location.pathname + window.location.search)
                    }
                }, {
                    key: "exists",
                    value: function(e) {
                        return e in this.pages
                    }
                }, {
                    key: "empty",
                    value: function() {
                        this.pages = {}, this.last = null, this.swup.log("Cache cleared")
                    }
                }, {
                    key: "remove",
                    value: function(e) {
                        delete this.pages[e]
                    }
                }]), e
            }();
        t.default = r
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            },
            r = n(0);
        t.default = function(e, t) {
            var n = this,
                o = [],
                a = void 0;
            this.triggerEvent("transitionStart", t), null != e.customTransition ? (this.updateTransition(window.location.pathname, e.url, e.customTransition), document.documentElement.classList.add("to-" + (0, r.classify)(e.customTransition))) : this.updateTransition(window.location.pathname, e.url), !t || this.options.animateHistoryBrowsing ? function() {
                if (n.triggerEvent("animationOutStart"), document.documentElement.classList.add("is-changing"), document.documentElement.classList.add("is-leaving"), document.documentElement.classList.add("is-animating"), t && document.documentElement.classList.add("is-popstate"), document.documentElement.classList.add("to-" + (0, r.classify)(e.url)), o = n.getAnimationPromises("out"), Promise.all(o).then(function() {
                        n.triggerEvent("animationOutDone")
                    }), !t) {
                    var i;
                    i = null != n.scrollToElement ? e.url + n.scrollToElement : e.url, (0, r.createHistoryRecord)(i)
                }
            }() : this.triggerEvent("animationSkipped"), this.cache.exists(e.url) ? (a = new Promise(function(e) {
                e()
            }), this.triggerEvent("pageRetrievedFromCache")) : a = this.preloadPromise && this.preloadPromise.route == e.url ? this.preloadPromise : new Promise(function(t, o) {
                (0, r.fetch)(i({}, e, {
                    headers: n.options.requestHeaders
                }), function(i) {
                    if (500 === i.status) return n.triggerEvent("serverError"), void o(e.url);
                    var r = n.getPageData(i);
                    null != r ? (r.url = e.url, n.cache.cacheUrl(r), n.triggerEvent("pageLoaded"), t()) : o(e.url)
                })
            }), document.getElementById("preloader").classList.remove("preloader-hide"), setTimeout(function() {
                Promise.all(o.concat([a])).then(function() {
                    n.renderPage(n.cache.getPage(e.url), t), n.preloadPromise = null, setTimeout(function() {
                        document.getElementById("preloader").classList.add("preloader-hide")
                    }, 0 /*was50*/ )
                }).catch(function(e) {
                    n.options.skipPopStateHandling = function() {
                        return window.location = e, !0
                    }, window.history.go(-1)
                }), window.scrollTo(0, 0)
            }, 180)
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e) {
            var t = e.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
            return "/" === t[0] && (t = t.splice(1)), "" === t && (t = "homepage"), t
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e) {
            window.history.pushState({
                url: e || window.location.href.split(window.location.hostname)[1],
                random: Math.random(),
                source: "swup"
            }, document.getElementsByTagName("title")[0].innerText, e || window.location.href.split(window.location.hostname)[1])
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            r = n(1);
        t.default = function(e, t) {
            var n = document.createElement("html");
            n.innerHTML = e;
            for (var o = [], a = function(e) {
                    if (null == n.querySelector(t[e])) return {
                        v: null
                    };
                    (0, r.queryAll)(t[e]).forEach(function(i, a) {
                        (0, r.queryAll)(t[e], n)[a].setAttribute("data-swup", o.length), o.push((0, r.queryAll)(t[e], n)[a].outerHTML)
                    })
                }, s = 0; s < t.length; s++) {
                var u = a(s);
                if ("object" === (void 0 === u ? "undefined" : i(u))) return u.v
            }
            var l = {
                title: n.querySelector("title").innerText,
                pageClass: n.querySelector("body").className,
                originalContent: e,
                blocks: o
            };
            return n.innerHTML = "", n = null, l
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        };
        t.default = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = {
                    url: window.location.pathname + window.location.search,
                    method: "GET",
                    data: null,
                    headers: {}
                },
                r = i({}, n, e),
                o = new XMLHttpRequest;
            return o.onreadystatechange = function() {
                4 === o.readyState && (o.status, t(o))
            }, o.open(r.method, r.url, !0), Object.keys(r.headers).forEach(function(e) {
                o.setRequestHeader(e, r.headers[e])
            }), o.send(r.data), o
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function() {
            var e = document.createElement("div"),
                t = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd otransitionend",
                    transition: "transitionend"
                };
            for (var n in t)
                if (void 0 !== e.style[n]) return t[n];
            return !1
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function() {
            return window.location.pathname + window.location.search
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(1);
        t.default = function(e, t) {
            for (var n = 0, r = function(r) {
                    null == e.querySelector(t[r]) ? console.warn("Element " + t[r] + " is not in current page.") : (0, i.queryAll)(t[r]).forEach(function(o, a) {
                        (0, i.queryAll)(t[r], e)[a].setAttribute("data-swup", n), n++
                    })
                }, o = 0; o < t.length; o++) r(o)
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                    }
                }
                return function(t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t
                }
            }(),
            r = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), t instanceof Element || t instanceof SVGElement ? this.link = t : (this.link = document.createElement("a"), this.link.href = t)
                }
                return i(e, [{
                    key: "getPath",
                    value: function() {
                        var e = this.link.pathname;
                        return "/" !== e[0] && (e = "/" + e), e
                    }
                }, {
                    key: "getAddress",
                    value: function() {
                        var e = this.link.pathname + this.link.search;
                        return this.link.getAttribute("xlink:href") && (e = this.link.getAttribute("xlink:href")), "/" !== e[0] && (e = "/" + e), e
                    }
                }, {
                    key: "getHash",
                    value: function() {
                        return this.link.hash
                    }
                }]), e
            }();
        t.default = r
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                }
                return e
            },
            r = (n(1), n(0));
        t.default = function(e, t) {
            var n = this;
            document.documentElement.classList.remove("is-leaving");
            var o = new r.Link(e.responseURL);
            window.location.pathname !== o.getPath() && (window.history.replaceState({
                url: o.getPath(),
                random: Math.random(),
                source: "swup"
            }, document.title, o.getPath()), this.cache.cacheUrl(i({}, e, {
                url: o.getPath()
            }))), t && !this.options.animateHistoryBrowsing || document.documentElement.classList.add("is-rendering"), this.triggerEvent("willReplaceContent", t);
            for (var a = 0; a < e.blocks.length; a++) document.body.querySelector('[data-swup="' + a + '"]').outerHTML = e.blocks[a];
            if (document.title = e.title, this.triggerEvent("contentReplaced", t), this.triggerEvent("pageView", t), this.options.cache || this.cache.empty(), setTimeout(function() {
                    t && !n.options.animateHistoryBrowsing || (n.triggerEvent("animationInStart"), document.documentElement.classList.remove("is-animating"))
                }, 10), !t || this.options.animateHistoryBrowsing) {
                var s = this.getAnimationPromises("in");
                Promise.all(s).then(function() {
                    n.triggerEvent("animationInDone"), n.triggerEvent("transitionEnd", t), document.documentElement.className.split(" ").forEach(function(e) {
                        (new RegExp("^to-").test(e) || "is-changing" === e || "is-rendering" === e || "is-popstate" === e) && document.documentElement.classList.remove(e)
                    })
                })
            } else this.triggerEvent("transitionEnd", t);
            this.scrollToElement = null
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e, t) {
            this._handlers[e].forEach(function(e) {
                try {
                    e(t)
                } catch (e) {
                    console.error(e)
                }
            });
            var n = new CustomEvent("swup:" + e, {
                detail: e
            });
            document.dispatchEvent(n)
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e, t) {
            this._handlers[e] ? this._handlers[e].push(t) : console.warn("Unsupported event " + e + ".")
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e, t) {
            var n = this;
            if (null != e)
                if (null != t)
                    if (this._handlers[e] && this._handlers[e].filter(function(e) {
                            return e === t
                        }).length) {
                        var i = this._handlers[e].filter(function(e) {
                                return e === t
                            })[0],
                            r = this._handlers[e].indexOf(i);
                        r > -1 && this._handlers[e].splice(r, 1)
                    } else console.warn("Handler for event '" + e + "' no found.");
            else this._handlers[e] = [];
            else Object.keys(this._handlers).forEach(function(e) {
                n._handlers[e] = []
            })
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function(e, t, n) {
            this.transition = {
                from: e,
                to: t,
                custom: n
            }
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(1),
            r = n(0);
        t.default = function() {
            var e = [];
            return (0, i.queryAll)(this.options.animationSelector).forEach(function(t) {
                var n = new Promise(function(e) {
                    t.addEventListener((0, r.transitionEnd)(), function(n) {
                        t == n.target && e()
                    })
                });
                e.push(n)
            }), e
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(0);
        t.default = function(e) {
            var t = e.responseText,
                n = (0, i.getDataFromHtml)(t, this.options.containers);
            return n ? (n.responseURL = e.responseURL ? e.responseURL : window.location.href, n) : (console.warn("The link you are hovering over does not exist (404 ERROR) Please make sure your link is pointing to a valid location."), null)
        }
    }, function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.use = function(e) {
            if (e.isSwupPlugin) return this.plugins.push(e), e.swup = this, "function" == typeof e._beforeMount && e._beforeMount(), e.mount(), this.plugins;
            console.warn("Not swup plugin instance " + e + ".")
        }, t.unuse = function(e) {
            var t = void 0;
            if (t = "string" == typeof e ? this.plugins.find(function(t) {
                    return e === t.name
                }) : e) {
                t.unmount(), "function" == typeof t._afterUnmount && t._afterUnmount();
                var n = this.plugins.indexOf(t);
                return this.plugins.splice(n, 1), this.plugins
            }
            console.warn("No such plugin.")
        }, t.findPlugin = function(e) {
            return this.plugins.find(function(t) {
                return e === t.name
            })
        }
    }])
});

/*Enabled AJAX Custom Preload SWUP Function*/
(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r();
    else if (typeof define === "function" && define.amd) define([], r);
    else if (typeof exports === "object") exports["SwupPreloadPlugin"] = r();
    else t["SwupPreloadPlugin"] = r()
})(window, function() {
    return function(e) {
        var t = {};

        function r(n) {
            if (t[n]) {
                return t[n].exports
            }
            var o = t[n] = {
                i: n,
                l: false,
                exports: {}
            };
            e[n].call(o.exports, o, o.exports, r);
            o.l = true;
            return o.exports
        }
        r.m = e;
        r.c = t;
        r.d = function(e, t, n) {
            if (!r.o(e, t)) {
                Object.defineProperty(e, t, {
                    enumerable: true,
                    get: n
                })
            }
        };
        r.r = function(e) {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: true
            })
        };
        r.t = function(e, t) {
            if (t & 1) e = r(e);
            if (t & 8) return e;
            if (t & 4 && typeof e === "object" && e && e.__esModule) return e;
            var n = Object.create(null);
            r.r(n);
            Object.defineProperty(n, "default", {
                enumerable: true,
                value: e
            });
            if (t & 2 && typeof e != "string")
                for (var o in e) r.d(n, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return n
        };
        r.n = function(e) {
            var t = e && e.__esModule ? function t() {
                return e["default"]
            } : function t() {
                return e
            };
            r.d(t, "a", t);
            return t
        };
        r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        };
        r.p = "";
        return r(r.s = 1)
    }([function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = t.query = function e(t) {
            var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
            if (typeof t !== "string") {
                return t
            }
            return r.querySelector(t)
        };
        var o = t.queryAll = function e(t) {
            var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
            if (typeof t !== "string") {
                return t
            }
            return Array.prototype.slice.call(r.querySelectorAll(t))
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(2);
        var o = a(n);

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        e.exports = o.default
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || false;
                    n.configurable = true;
                    if ("value" in n) n.writable = true;
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                if (r) e(t.prototype, r);
                if (n) e(t, n);
                return t
            }
        }();
        var o = r(3);
        var a = s(o);
        var u = r(4);
        var i = s(u);
        var l = r(0);
        var f = r(6);

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function c(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }

        function d(e, t) {
            if (!e) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
            return t && (typeof t === "object" || typeof t === "function") ? t : e
        }

        function p(e, t) {
            if (typeof t !== "function" && t !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof t)
            }
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
        }
        var v = function(e) {
            p(t, e);

            function t() {
                var e;
                var r, n, o;
                c(this, t);
                for (var a = arguments.length, u = Array(a), i = 0; i < a; i++) {
                    u[i] = arguments[i]
                }
                return o = (r = (n = d(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(u))), n), n.name = "PreloadPlugin", n.onContentReplaced = function() {
                    n.swup.preloadPages()
                }, n.onMouseover = function(e) {
                    var t = n.swup;
                    t.triggerEvent("hoverLink", e);
                    var r = new f.Link(e.delegateTarget);
                    if (r.getAddress() !== (0, f.getCurrentUrl)() && !t.cache.exists(r.getAddress()) && t.preloadPromise == null) {
                        t.preloadPromise = t.preloadPage(r.getAddress());
                        t.preloadPromise.route = r.getAddress();
                        t.preloadPromise.finally(function() {
                            t.preloadPromise = null
                        })
                    }
                }, n.preloadPage = function(e) {
                    var t = n.swup;
                    var r = new f.Link(e);
                    return new Promise(function(e, n) {
                        if (r.getAddress() != (0, f.getCurrentUrl)() && !t.cache.exists(r.getAddress())) {
                            (0, f.fetch)({
                                url: r.getAddress(),
                                headers: t.options.requestHeaders
                            }, function(o) {
                                if (o.status === 500) {
                                    t.triggerEvent("serverError");
                                    n()
                                } else {
                                    var a = t.getPageData(o);
                                    if (a != null) {
                                        a.url = r.getAddress();
                                        t.cache.cacheUrl(a, t.options.debugMode);
                                        t.triggerEvent("pagePreloaded")
                                    } else {
                                        n(r.getAddress());
                                        return
                                    }
                                    e(t.cache.getPage(r.getAddress()))
                                }
                            })
                        } else {
                            e(t.cache.getPage(r.getAddress()))
                        }
                    })
                }, n.preloadPages = function() {
                    (0, l.queryAll)("[data-swup-preload]").forEach(function(e) {
                        n.swup.preloadPage(e.href)
                    })
                }, r), d(n, o)
            }
            n(t, [{
                key: "mount",
                value: function e() {
                    var t = this.swup;
                    t._handlers.pagePreloaded = [];
                    t._handlers.hoverLink = [];
                    t.preloadPage = this.preloadPage;
                    t.preloadPages = this.preloadPages;
                    t.delegatedListeners.mouseover = (0, i.default)(document.body, t.options.linkSelector, "mouseover", this.onMouseover.bind(this));
                    t.preloadPages();
                    t.on("contentReplaced", this.onContentReplaced)
                }
            }, {
                key: "unmount",
                value: function e() {
                    var t = this.swup;
                    t._handlers.pagePreloaded = null;
                    t._handlers.hoverLink = null;
                    t.preloadPage = null;
                    t.preloadPages = null;
                    t.delegatedListeners.mouseover.destroy();
                    t.off("contentReplaced", this.onContentReplaced)
                }
            }]);
            return t
        }(a.default);
        t.default = v
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || false;
                    n.configurable = true;
                    if ("value" in n) n.writable = true;
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                if (r) e(t.prototype, r);
                if (n) e(t, n);
                return t
            }
        }();

        function o(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var a = function() {
            function e() {
                o(this, e);
                this.isSwupPlugin = true
            }
            n(e, [{
                key: "mount",
                value: function e() {}
            }, {
                key: "unmount",
                value: function e() {}
            }, {
                key: "_beforeMount",
                value: function e() {}
            }, {
                key: "_afterUnmount",
                value: function e() {}
            }]);
            return e
        }();
        t.default = a
    }, function(e, t, r) {
        var n = r(5);

        function o(e, t, r, n, o) {
            var a = u.apply(this, arguments);
            e.addEventListener(r, a, o);
            return {
                destroy: function() {
                    e.removeEventListener(r, a, o)
                }
            }
        }

        function a(e, t, r, n, a) {
            if (typeof e.addEventListener === "function") {
                return o.apply(null, arguments)
            }
            if (typeof r === "function") {
                return o.bind(null, document).apply(null, arguments)
            }
            if (typeof e === "string") {
                e = document.querySelectorAll(e)
            }
            return Array.prototype.map.call(e, function(e) {
                return o(e, t, r, n, a)
            })
        }

        function u(e, t, r, o) {
            return function(r) {
                r.delegateTarget = n(r.target, t);
                if (r.delegateTarget) {
                    o.call(e, r)
                }
            }
        }
        e.exports = a
    }, function(e, t) {
        var r = 9;
        if (typeof Element !== "undefined" && !Element.prototype.matches) {
            var n = Element.prototype;
            n.matches = n.matchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector || n.webkitMatchesSelector
        }

        function o(e, t) {
            while (e && e.nodeType !== r) {
                if (typeof e.matches === "function" && e.matches(t)) {
                    return e
                }
                e = e.parentNode
            }
        }
        e.exports = o
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        t.Link = t.markSwupElements = t.getCurrentUrl = t.transitionEnd = t.fetch = t.getDataFromHTML = t.createHistoryRecord = t.classify = undefined;
        var n = r(7);
        var o = b(n);
        var a = r(8);
        var u = b(a);
        var i = r(9);
        var l = b(i);
        var f = r(10);
        var s = b(f);
        var c = r(11);
        var d = b(c);
        var p = r(12);
        var v = b(p);
        var y = r(13);
        var h = b(y);
        var g = r(14);
        var m = b(g);

        function b(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var w = t.classify = o.default;
        var P = t.createHistoryRecord = u.default;
        var _ = t.getDataFromHTML = l.default;
        var k = t.fetch = s.default;
        var M = t.transitionEnd = d.default;
        var j = t.getCurrentUrl = v.default;
        var O = t.markSwupElements = h.default;
        var E = t.Link = m.default
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function e(t) {
            var r = t.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
            if (r[0] === "/") r = r.splice(1);
            if (r === "") r = "homepage";
            return r
        };
        t.default = n
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function e(t) {
            window.history.pushState({
                url: t || window.location.href.split(window.location.hostname)[1],
                random: Math.random(),
                source: "swup"
            }, document.getElementsByTagName("title")[0].innerText, t || window.location.href.split(window.location.hostname)[1])
        };
        t.default = n
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
            return typeof e
        } : function(e) {
            return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        var o = r(0);
        var a = function e(t, r) {
            var a = t.replace("<body", '<div id="swupBody"').replace("</body>", "</div>");
            var u = document.createElement("div");
            u.innerHTML = a;
            var i = [];
            var l = function e(t) {
                if (u.querySelector(r[t]) == null) {
                    return {
                        v: null
                    }
                } else {
                    (0, o.queryAll)(r[t]).forEach(function(e, n) {
                        (0, o.queryAll)(r[t], u)[n].dataset.swup = i.length;
                        i.push((0, o.queryAll)(r[t], u)[n].outerHTML)
                    })
                }
            };
            for (var f = 0; f < r.length; f++) {
                var s = l(f);
                if ((typeof s === "undefined" ? "undefined" : n(s)) === "object") return s.v
            }
            var c = {
                title: u.querySelector("title").innerText,
                pageClass: u.querySelector("#swupBody").className,
                originalContent: t,
                blocks: i
            };
            u.innerHTML = "";
            u = null;
            return c
        };
        t.default = a
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) {
                    if (Object.prototype.hasOwnProperty.call(r, n)) {
                        e[n] = r[n]
                    }
                }
            }
            return e
        };
        var o = function e(t) {
            var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var o = {
                url: window.location.pathname + window.location.search,
                method: "GET",
                data: null,
                headers: {}
            };
            var a = n({}, o, t);
            var u = new XMLHttpRequest;
            u.onreadystatechange = function() {
                if (u.readyState === 4) {
                    if (u.status !== 500) {
                        r(u)
                    } else {
                        r(u)
                    }
                }
            };
            u.open(a.method, a.url, true);
            Object.keys(a.headers).forEach(function(e) {
                u.setRequestHeader(e, a.headers[e])
            });
            u.send(a.data);
            return u
        };
        t.default = o
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function e() {
            var t = document.createElement("div");
            var r = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
            for (var n in r) {
                if (t.style[n] !== undefined) {
                    return r[n]
                }
            }
            return false
        };
        t.default = n
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function e() {
            return window.location.pathname + window.location.search
        };
        t.default = n
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = r(0);
        var o = function e(t, r) {
            var o = 0;
            var a = function e(a) {
                if (t.querySelector(r[a]) == null) {
                    console.warn("Element " + r[a] + " is not in current page.")
                } else {
                    (0, n.queryAll)(r[a]).forEach(function(e, u) {
                        (0, n.queryAll)(r[a], t)[u].dataset.swup = o;
                        o++
                    })
                }
            };
            for (var u = 0; u < r.length; u++) {
                a(u)
            }
        };
        t.default = o
    }, function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var n = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var n = t[r];
                    n.enumerable = n.enumerable || false;
                    n.configurable = true;
                    if ("value" in n) n.writable = true;
                    Object.defineProperty(e, n.key, n)
                }
            }
            return function(t, r, n) {
                if (r) e(t.prototype, r);
                if (n) e(t, n);
                return t
            }
        }();

        function o(e, t) {
            if (!(e instanceof t)) {
                throw new TypeError("Cannot call a class as a function")
            }
        }
        var a = function() {
            function e(t) {
                o(this, e);
                if (t instanceof Element || t instanceof SVGElement) {
                    this.link = t
                } else {
                    this.link = document.createElement("a");
                    this.link.href = t
                }
            }
            n(e, [{
                key: "getPath",
                value: function e() {
                    var t = this.link.pathname;
                    if (t[0] !== "/") {
                        t = "/" + t
                    }
                    return t
                }
            }, {
                key: "getAddress",
                value: function e() {
                    var t = this.link.pathname + this.link.search;
                    if (this.link.getAttribute("xlink:href")) {
                        t = this.link.getAttribute("xlink:href")
                    }
                    if (t[0] !== "/") {
                        t = "/" + t
                    }
                    return t
                }
            }, {
                key: "getHash",
                value: function e() {
                    return this.link.hash
                }
            }]);
            return e
        }();
        t.default = a
    }])
});