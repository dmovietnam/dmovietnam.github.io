var Config = { PLUGINS_LOCALPATH: "/bower_components/plugins/" },
    Globals = { PLUGINS: {}, LOADED_FILES: [], PAGE_SCROLLED: !1, PAGELOADER_DONE: !1 };
! function(t) {
    t.extend(t.fn, {
        isPageLoaderDone: function(e) {
            var a = t('[data-toggle="page-loader"]'),
                n = function() { t("html").addClass(".page-loader-done"), e && "function" == typeof e && e() };
            0 !== a.length && "none" != a.css("display") || n();
            var o = setInterval(function() { "none" == a.css("display") && (Globals.PAGELOADER_DONE = !0, clearInterval(o), n()) }, 500)
        },
        includeWaypoints: function(t) {
            if (void 0 === jQuery.fn.waypoint) {
                $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js"], []);
                var e = 0,
                    a = setInterval(function() { "function" == typeof jQuery.fn.waypoint && (clearInterval(a), t && "function" == typeof t && t()), ++e > 20 && (clearInterval(a), alert("Error: Waypoints plugin could not be loaded")) }, 500)
            } else t && "function" == typeof t && t()
        },
        elementInView: function(e) {
            var a = e.offset().top,
                n = a + e.outerHeight(),
                o = t(window).scrollTop(),
                i = o + t(window).height();
            return n > o && a < i
        },
        themeScrollMenus: function() {
            var e = t(this).find('[data-toggle="scroll-link"]'),
                a = t("#header"),
                n = t("body");
            t('[data-spy="scroll"]');
            if (e.length > 0) {
                var o = function(t) { var e = a.outerHeight() + (null !== t ? t : 0); return n.hasClass("header-compact-sticky") && (e -= 35), e },
                    i = function(t) {
                        if ("refresh" == t) {
                            var e = n.data("bs.scrollspy");
                            e._config.offset = o(5), n.data("bs.scrollspy", e), n.scrollspy("refresh")
                        } else n.scrollspy({ target: ".navbar-main", offset: o(5) })
                    };
                i("init"), t(window).on("resize", function() { setTimeout(function() { i("refresh") }, 200) }), e.click(function() {
                    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                        var e = t(this),
                            a = t(this.hash),
                            n = e.data("scroll-link-speed") || 1e3,
                            i = e.data("scroll-link-nooffset") || !1;
                        return t(window).trigger("resize"),
                            function() {
                                (a = a.length ? a : t("[name=" + this.hash.slice(1) + "]")).length && (offset = o(null), i && (offset = 0), t("html, body").animate({ scrollTop: a.offset().top - offset }, n))
                            }(), !1
                    }
                })
            }
        },
        themeSubMenus: function() {
            var e = t(this),
                a = t('.dropdown-menu [data-toggle="tab"], .dropdown-menu [data-toggle="pill"]');
            a.on("click", function(e) { event.preventDefault(), event.stopPropagation(), t(this).tab("show") }), a.on("shown.bs.tab", function(e) {
                var a = t(e.relatedTarget),
                    n = t(e.target).getSelector(),
                    o = a.getSelector(),
                    i = t(n),
                    s = t(o);
                i.addClass("active"), s.removeClass("active"), t(document).find('[data-target="' + n + '"]').addClass("active"), t(document).find('[data-target="' + o + '"]').removeClass("active")
            }), e.find(".dropdown-menu [data-toggle=dropdown]").on("click", function(e) { e.preventDefault(), e.stopPropagation(), t(this).parent().toggleClass("show") }), e.find(".dropdown.dropdown-persist").on({ "shown.bs.dropdown": function() { t(this).data("closable", !1) }, "hide.bs.dropdown": function(e) { return temp = t(this).data("closable"), t(this).data("closable", !0), temp } }), e.find(".dropdown.dropdown-persist .dropdown-menu").on({ click: function(e) { t(this).parent(".dropdown.dropdown-persist").data("closable", !1) } })
        },
        getSelector: function() {
            var e = t(this),
                a = e.data("target");
            a && "#" !== a || (a = e.attr("href") || "");
            try { return t(a).length > 0 ? a : null } catch (t) { return null }
        },
        calcHeightsOffset: function(e, a) { return "number" == typeof a ? e - a : ("string" == typeof a && t(a).length > 0 && t(a).each(function() { e -= t(a).height() }), e) },
        isIE: function() { if (document.documentMode || /Edge/.test(navigator.userAgent)) return !0 },
        getScriptLocation: function() { var e = t("body").data("plugins-localpath") || null; return e || Config.PLUGINS_LOCALPATH },
        themeLoadPlugin: function(e, a, n, o) {
            if (null === (t("body").data("plugins-manual") || null)) {
                var i = function(t) { if (0 === t.indexOf("http://") || 0 === t.indexOf("https://")) return t; return $document.getScriptLocation() + t };
                if (t.ajaxPrefilter("script", function(t) { t.crossDomain = !0 }), e.length > 0) {
                    var s = 0,
                        l = function(o) {
                            ++s === e.length && (t.each(a, function(e, a) {
                                if (Globals.LOADED_FILES[a] === a) return !0;
                                Globals.LOADED_FILES[a] = a, t("head").prepend('<link href="' + i(a) + '" rel="stylesheet" type="text/css" />')
                            }), n && "function" == typeof n && n())
                        };
                    t.each(e, function(e, a) {
                        if (Globals.LOADED_FILES[a] === a) return l(), !0;
                        if ("#offline" !== window.location.hash || 0 !== (0 === a.indexOf("http://") || a.indexOf("https://")))
                            if (Globals.LOADED_FILES[a] = a, void 0 === o) {
                                var n = { url: i(a), dataType: "script", success: l, cache: !0 };
                                t.ajax(n)
                            } else "append" === o ? (t('script[src*="bootstrap.min.js"]').after('<script src="' + i(a) + '"><\/script>'), l()) : "prepend" === o ? (t('script[src*="bootstrap.min.js"]').before('<script src="' + i(a) + '"><\/script>'), l()) : "head" === o && (t("head").append('<script src="' + i(a) + '"><\/script>'), l());
                        else console.log("Offline mode: " + a + " loading skipped")
                    })
                } else a.length > 0 && (t.each(a, function(e, a) {
                    if (Globals.LOADED_FILES[a] === a) return !0;
                    Globals.LOADED_FILES[a] = a, t("head").prepend('<link href="' + i(a) + '" rel="stylesheet" type="text/css" />')
                }), n && "function" == typeof n && n())
            } else n && "function" == typeof n && n()
        }
    })
}(jQuery),
function(t) {
    t.extend(t.fn, {
        themeCustomScripts: function(e) {
            function a(t, e, a) {
                var n = t.data("modal-animate-in") || "fadeIn",
                    o = t.data("modal-animate-out") || "fadeOut",
                    i = n,
                    s = o;
                "out" == e && (i = o, s = n), t.removeClass(s), t.addClass(i + "  animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() { t.removeClass(i + "  animated"), "out" == e && (t.removeClass("modal-animate-closing"), P.removeClass("modal-animate")) })
            }
            var n = t(this);
            void 0 !== n && null !== n || (n = t(document)), $document = t(document), n.themeSubMenus(), n.themeScrollMenus();
            var o = n.find("[data-hover]");
            if (o.length > 0) {
                var i = function() {
                    o.each(function() {
                        var t = jQuery(this),
                            e = t.data("hover"),
                            a = t.data("hover-out"),
                            n = t.data("hover-delay") || null,
                            o = t.data("hover-duration") || null;
                        null !== n && t.css({ "-webkit-animation-delay": n + "s", "-moz-animation-delay": n + "s", "animation-delay": n + "s" }), null !== o && t.css({ "-webkit-animation-duration": o + "s", "-moz-animation-duration": o + "s", "animation-duration": o + "s" }), t.hover(function() { t.addClass("animated " + e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() { t.removeClass("animated " + e).addClass("animated " + a) }) }, function() {})
                    })
                };
                $document.themeLoadPlugin([], ["https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"], function() { $document.isPageLoaderDone(i) })
            }
            var s = n.find('[data-toggle="full-height"]');
            if (s.length > 0) {
                var l = function() {
                    s.each(function() {
                        var e = t(this),
                            a = e.data("parent") || window,
                            n = e.data("offset") || null,
                            o = e.data("breakpoint") || null,
                            i = t(a) || null;
                        if (i) {
                            var s = i.height();
                            n && (s = function(t, e) { return $document.calcHeightsOffset(t, e) }(s, n)), o && t(window).width() <= o ? e.css("height", "auto") : e.outerHeight(s)
                        }
                    })
                };
                l(), t(window).on("resize", function() { setTimeout(function() { l() }, 400) })
            }
            var d = n.find("[data-animate]");
            if (d.length > 0) {
                var r = function() {
                    t(window).on("scroll", function() {!0 !== Globals.PAGE_SCROLLED && (P.addClass("animates-pending"), Globals.PAGE_SCROLLED = !0) }), d.each(function() {
                        var t = jQuery(this),
                            e = t.data("animate"),
                            a = t.data("animate-infinite") || null,
                            n = t.data("animate-delay") || null,
                            o = t.data("animate-duration") || null,
                            i = t.data("animate-offset") || "98%",
                            s = t.data("animate-inview") || !1;
                        !0 === $document.elementInView(t) && !1 === s && (e = null, t.removeAttr("data-animate")), null !== a && t.addClass("infinite"), null !== n && t.css({ "-webkit-animation-delay": n + "s", "-moz-animation-delay": n + "s", "animation-delay": n + "s" }), null !== o && t.css({ "-webkit-animation-duration": o + "s", "-moz-animation-duration": o + "s", "animation-duration": o + "s" }), null !== e && t.waypoint(function() { t.addClass("animated " + e).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() { t.addClass("animated-done"), t.removeClass(e) }), this.destroy() }, { offset: i })
                    })
                };
                $document.includeWaypoints(function() { $document.themeLoadPlugin([], ["https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"], function() { $document.isPageLoaderDone(r) }) })
            }
            n.find('[data-scroll="scroll-state"]').each(function() {
                var e = t(this),
                    a = t(document),
                    n = e.data("scroll-amount") || t(window).outerHeight(),
                    o = (e.data("scroll-amount-out"), e.data("scroll-setting") || null),
                    i = null !== o ? o.effectIn || null : null,
                    s = null !== o ? o.effectOut || null : null,
                    l = null !== o ? o.effectDelay || null : null,
                    d = null !== o ? o.effectDuration || null : null,
                    r = null !== o ? o.breakpoint || null : null,
                    c = null !== o ? o.fallbackState || "scroll-state-active" : null,
                    u = e.data("scroll-active") || !0,
                    f = t(window);
                e.hasClass("scroll-state-hidden") && e.data("state", "out"), null === i && null === s || (e.addClass("scroll-effect"), $document.themeLoadPlugin([], ["https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"])), null !== l && e.css({ "-webkit-animation-delay": l + "s", "-moz-animation-delay": l + "s", "animation-delay": l + "s" }), null !== d && e.css({ "-webkit-animation-duration": d + "s", "-moz-animation-duration": d + "s", "animation-duration": d + "s" }), r && f.on("resize", function() { setTimeout(function() { f.width() <= r ? (u = !1, e.addClass(c), e.removeClass(s), e.removeClass(i)) : (u = !0, e.removeClass(c)), e.data("scroll-active", u) }, 400) }), a.scroll(function() {
                    if (!1 !== e.data("scroll-active")) {
                        var a = t(this).scrollTop(),
                            o = e.data("state");
                        a >= n ? "out" === o && (e.data("state", "in"), e.addClass("scroll-state-active"), e.removeClass("scroll-state-hidden"), null !== s && e.removeClass(s), null !== i && e.addClass("animated " + i)) : "in" === o && (e.data("state", "out"), null !== s ? e.addClass("animated " + s) : (e.removeClass("scroll-state-active"), e.addClass("scroll-state-hidden")), null !== i && e.removeClass(i))
                    }
                })
            }), n.find('[data-scroll="scrollax"]').each(function() {
                var e = t(this),
                    a = t(document),
                    n = t(window),
                    o = e.data("scrollax-op-ratio") || 500,
                    i = e.data("scrollax-y-ratio") || 5;
                a.scroll(function() {
                    var t = n.scrollTop();
                    e.css({ opacity: "off" === o ? 1 : 1 - t / o, transform: "off" === i ? 0 : "translateY(" + (0 - t / i) + "px)" })
                })
            }), n.find('[data-toggle="quantity"]').each(function() {
                var e = t(this),
                    a = e.find(".quantity-down"),
                    n = e.find(".quantity-up"),
                    o = e.find(".quantity"),
                    i = function(t) { var e = parseInt(o.val()); "down" === t ? e -= 1 : "up" === t && (e += 1), e < 0 && (e = 0), o.val(e) };
                o.length > 0 && (a.on("click", function() { i("down") }), n.on("click", function() { i("up") }))
            }), n.find("[data-css]").each(function() {
                var e = t(this),
                    a = e.data("css") || "",
                    n = e.data("css") || {},
                    o = {};
                null !== n && "object" == typeof n && (o = t.extend(a, n), e.css(o))
            });
            var c = n.find("[data-toggle=overlay]");
            if (c.length > 0 && (c.each(function() {
                    var e = jQuery(this),
                        a = e.data("target") || null;
                    e.addClass("overlay-trigger"), t(a).length > 0 && (h = t(a), e.on("click", function(t) { return e.toggleClass("overlay-active"), jQuery(e.data("target")).toggleClass("overlay-active"), jQuery("html").toggleClass("overlay-open"), !1 }))
                }), n.find('[data-dismiss="overlay"]').each(function() {
                    var e = jQuery(this),
                        a = e.data("target") || ".overlay",
                        n = jQuery('[data-toggle="overlay"][data-target="' + a + '"]') || null;
                    t(a).length > 0 && (a = jQuery(a), e.on("click", function(t) { return a.removeClass("overlay-active"), jQuery("html").removeClass("overlay-open"), n.length > 0 ? n.removeClass("overlay-active") : jQuery('[data-toggle="overlay"]').removeClass("overlay-active"), !1 }))
                })), n.find("[data-url]").each(function() {
                    var e = t(this).data("url"),
                        a = function(t) { var e = document.createElement("a"); return e.href = t, e }(e);
                    t(this).addClass("clickable-element"), t(this).on("hover", function() { t(this).hover(function() { t(this).addClass("hovered") }, function() { t(this).removeClass("hovered") }) }), t(this).find("a").on("click", function(e) { t(this).attr("href") === a.href && e.preventDefault() }), t(this).on("click", function() { a.host !== location.host ? window.open(a.href, "_blank") : window.location = e })
                }), $searchForm = n.find("[data-toggle=search-form]"), $searchForm.length > 0) {
                var u = $searchForm,
                    f = u.data("target"),
                    h = t(f);
                if (0 === h.length) return;
                h.addClass("collapse"), t("[data-toggle=search-form]").click(function() { h.collapse("toggle"), t(f + " .search").focus(), u.toggleClass("open"), t("html").toggleClass("search-form-open"), t(window).trigger("resize") }), t("[data-toggle=search-form-close]").click(function() { h.collapse("hide"), u.removeClass("open"), t("html").removeClass("search-form-open"), t(window).trigger("resize") })
            }
            var m = t("body").data("colour-scheme") || "green",
                g = n.find(".theme-colours a");
            g.removeClass("active"), g.filter("." + m).addClass("active"), g.click(function() {
                var e = t(this).attr("href").replace("#", ""),
                    a = 3 * Math.floor(6 * Math.random());
                t(".theme-colours a").removeClass("active"), t(".theme-colours a." + e).addClass("active"), e !== m ? n.find("#colour-scheme").attr("href", "assets/css/colour-" + e + ".css?x=" + a) : n.find("#colour-scheme").attr("href", "#")
            }), navigator.userAgent.toLowerCase().indexOf("msie") > -1 && n.find("[placeholder]").focus(function() {
                var t = jQuery(this);
                t.val() === t.attr("placeholder") && (this.originalType && (this.type = this.originalType, delete this.originalType), t.val(""), t.removeClass("placeholder"))
            }).blur(function() { var t = jQuery(this); "" === t.val() && (t.addClass("placeholder"), t.val(t.attr("placeholder"))) }).blur();
            var p = n.find('[data-toggle="progress-bar-animated-progress"]');
            if (p.length > 0) {
                var v = function() {
                    p.each(function() {
                        var t = jQuery(this),
                            e = t.attr("style") || "";
                        t.waypoint(function() { e += "width: " + t.attr("aria-valuenow") + "% !important;", t.attr("style", e).addClass("progress-bar-animated-progress"), this.destroy() }, { offset: "98%" })
                    })
                };
                $document.includeWaypoints(function() { p.css("width", 0), $document.isPageLoaderDone(v) })
            }
            n.find('[data-toggle="collapse"]').each(function() {
                var e = t(this),
                    a = e.attr("href") || e.data("target");
                e.data("parent");
                t(a).length > 0 && t(a).hasClass("show") && e.addClass("show"), e.on({
                    click: function() {
                        e.toggleClass("show", !t(a).hasClass("show")), t(window).trigger("resize");
                        var n = e.find('input[type="checkbox"]');
                        n.length > 0 && n.prop("checked", !t(a).hasClass("show"))
                    }
                })
            }), n.find("[data-accordion-focus]").on("shown.bs.collapse", function(e) {
                var a = t(e.target).parent().offset().top,
                    n = $document.calcHeightsOffset(a, t("#header").outerHeight());
                t("html,body").animate({ scrollTop: n + 20 }, 500)
            });
            n.find('[data-toggle="radio-collapse"]').each(function(e, a) {
                var n = t(a),
                    o = t(n.data("target")),
                    i = t(n.data("parent")),
                    s = n.find("input[type=radio]"),
                    l = i.find("input[type=radio]").not(s);
                s.on("change", function() { s.is(":checked") ? o.collapse("show") : o.collapse("hide") }), s.on("click", function() { l.prop("checked", !1).trigger("change") })
            });
            var y = n.find("[data-modal-duration]");
            if (y.length > 0) {
                var b = y,
                    j = b.data("modal-duration"),
                    w = t('<div class="modal-progress"></div>');
                b.find(".modal-content").append(w), b.on("show.bs.modal", function(t) {
                    var e = 2,
                        a = setInterval(function() { w.width(e++ + "%") }, j / 100);
                    setTimeout(function() { b.modal("hide"), clearInterval(a) }, j)
                })
            }
            var C = n.find('[data-toggle="modal-onload"]');
            C.length > 0 && (C.on("shown.bs.modal", function() { t(this).data("modal-shown", !0) }), C.each(function() {
                var e = t(this),
                    a = e.data("modal-delay") || null,
                    n = (e.data("modal-force"), function(t) {
                        t.data("modal-shown");
                        t.modal()
                    });
                null !== a ? setTimeout(function() { n(e) }, a) : n(e)
            }));
            var $ = n.find("[data-backdrop=false]"),
                P = t("body");
            $.on("show.bs.modal", function(e) { t(this).data("bs.modal")._config.backdrop = !1, P.addClass("modal-no-backdrop") }), $.on("hidden.bs.modal", function(t) { P.removeClass("modal-no-backdrop") });
            var k = n.find("[data-modal-animate-in], [data-modal-animate-out]");
            if (k.length > 0) {
                var L = t("<div></div>").addClass("modal-animate-backdrop");
                L.appendTo(P), k.on("click.backdropDismiss", function(e) {
                    var a = t(e.target).hasClass("modal") ? t(e.target) : null;
                    a && a.modal("hide")
                }), k.on("show.bs.modal", function(e) {
                    var n = t(this),
                        o = n.data("bs.modal")._config.backdrop;
                    P.addClass("modal-animate"), n.data("bs.modal")._config.backdrop = !1, o && L.addClass("show"), a(n, "in")
                }).on("hide.bs.modal", function(e) {
                    var n = t(this);
                    n.addClass("modal-animate-closing"), L.removeClass("show"), a(n, "out")
                })
            }
            $document.tooltip && n.find('[data-toggle="tooltip"]').tooltip(), $document.popover && n.find('[data-toggle="popover"]').popover(), n.find("[data-page-class]").each(function() { n.find("html").addClass(jQuery(this).data("page-class")) }), n.find(".navbar-fixed-top").length > 0 && n.find("html").addClass("has-navbar-fixed-top"), n.find('[data-toggle="class"]').each(function() {
                var e = t(this),
                    a = e.data("target"),
                    n = t(a),
                    o = e.data("toggle-class") || "show",
                    i = e.data("toggle-trigger") || "click",
                    s = e.data("toggle-action") || "toggle",
                    l = function(e, a, n) { "object" == typeof a ? t.each(a, function(t, a) { "remove" === n ? e.removeClass(a) : "add" === n ? e.addClass(a) : e.toggleClass(a) }) : "remove" === n ? e.removeClass(a) : "add" === n ? e.addClass(a) : e.toggleClass(a) };
                if ("object" == typeof a) t.each(a, function(a, n) {
                    var o = n.toggleTrigger || i,
                        d = n.actions || s;
                    e.on(o, function() { return "object" == typeof d ? t.each(d, function(e, n) { l(t(a), n, e) }) : l(t(a), _toggleClass, _toggleAction), !1 })
                });
                else {
                    if (0 === n.length) return;
                    e.on(i, function() { return l(n, o, s), !1 })
                }
            }), n.find("[data-toggle=show-hide]").each(function() {
                var e = jQuery(this),
                    a = e.attr("data-target"),
                    n = t(a),
                    o = "show",
                    i = e.attr("data-target-state"),
                    s = e.attr("data-callback");
                0 !== n.length && ("show" === o && n.addClass("collapse"), e.click(function() { void 0 !== i && !1 !== i && (o = i), void 0 === o && (o = "show"), n.hasClass("show") ? e.removeClass("show") : e.addClass("show"), n.collapse("toggle"), s && "function" == typeof s && s() }))
            }), n.find("[data-clone]").each(function() {
                var e, a = t(this),
                    n = a.data("clone") || null,
                    o = a.data("clone-to") || null,
                    i = a.data("clone-placement") || "after",
                    s = a.data("clone-classes-remove") || [],
                    l = a.data("clone-classes-add") || [];
                e = a, null !== o && (e = (e = t(o)).length() > 0 ? e : a), $clone = t(n), $clone = $clone.length > 0 ? $clone : null, null !== $clone && ($clone = $clone.clone(), $clone.addClass("cloned-element"), null !== s && t.isArray(s) && t.each(s, function(t, e) { $clone.removeClass(e) }), null !== l && t.isArray(l) && t.each(l, function(t, e) { $clone.addClass(e) }), "before" === i ? $clone.prependTo(a) : $clone.appendTo(a))
            })
        }
    })
}(jQuery);
var defaultPlugins = {};
$.extend($.fn, { themePlugins: defaultPlugins }), Globals.PLUGINS.themePluginBackstretch = function(t) {
        var e = t.find("[data-toggle=backstretch]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["backstretch/jquery.backstretch.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = jQuery,
                        a = [],
                        n = { fade: 750, duration: 4e3 };
                    jQuery.each(t.data("backstretch-imgs").split(","), function(t, e) { a[t] = e }), t.data("backstretch-target") && ("self" === (e = t.data("backstretch-target")) ? e = t : $(e).length > 0 && (e = $(e))), a && ($("html").addClass("has-backstretch"), n = $.extend({}, n, t.data()), e.backstretch(a, n), !1 !== t.data("backstretch-overlay") && ($(".backstretch").prepend('<div class="backstretch-overlay"></div>'), t.data("backstretch-overlay-opacity") && $(".backstretch").find(".backstretch-overlay").css("background", "white").fadeTo(0, t.data("backstretch-overlay-opacity"))))
                })
            })
        }
    }, Globals.PLUGINS.themePluginBlazy = function(t) {
        var e, a = t.find('[data-toggle="blazy"]'),
            n = t.find("[data-bg-img]");
        if (a.length > 0 || n.length > 0) {
            $document.themeLoadPlugin(["https://cdn.jsdelivr.net/blazy/latest/blazy.min.js"], ["plugin-css/plugin-blazy.min.css"], function() {
                a.length > 0 && (a.each(function() {
                    var t = $(this),
                        e = t.attr("alt") || null;
                    e && (t.data("alt", e), t.attr("alt", ""))
                }), e = new Blazy({
                    selector: '[data-toggle="blazy"]',
                    loadInvisible: !0,
                    success: function(t) {
                        var e = $(t),
                            a = e.data("alt") || null;
                        a && (e.attr("alt", a), e.data("alt", ""))
                    }
                })), n.length > 0 && (n.addClass("bg-img blazy-bg"), e = new Blazy({ selector: "[data-bg-img]", loadInvisible: !0, src: "data-bg-img" }))
            })
        }
    }, Globals.PLUGINS.themePluginBootstrapSwitch = function(t) { var e = t.find("[data-toggle=switch]"); if (e.length > 0) { $document.themeLoadPlugin(["bootstrap-switch/build/js/bootstrap-switch.min.js"], ["plugin-css/plugin-bootstrap-switch.min.css", "bootstrap-switch/build/css/bootstrap3/bootstrap-switch.min.css"], function() { e.bootstrapSwitch() }) } }, Globals.PLUGINS.themePluginCountTo = function(t) {
        var e = t.find('[data-toggle="count-to"]');
        if (e.length > 0) {
            var a = function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("delay") || 0;
                    t.waypoint(function() { setTimeout(function() { t.countTo({ onComplete: function() { t.addClass("count-to-done") }, formatter: function(t, e) { var a = t.toFixed(e.decimals); return "-0" == a && (a = "0"), a } }) }, e), this.destroy() }, { offset: "90%" })
                })
            };
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/jquery-countto/1.2.0/jquery.countTo.min.js"], [], function() { $document.includeWaypoints(function() { $document.isPageLoaderDone(a) }) })
        }
    }, Globals.PLUGINS.themePluginCountDown = function(t) {
        var e = t.find("[data-countdown]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/jquery.countdown/2.2.0/jquery.countdown.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("countdown"),
                        a = t.data("countdown-format") || null,
                        n = t.data("countdown-expire-text") || null;
                    t.countdown(e).on("update.countdown", function(e) { null === a && (a = "%H hrs %M mins %S secs", e.offset.totalDays > 0 && (a = "%-d day%!d " + a), e.offset.weeks > 0 && (a = "%-w week%!w " + a)), t.html(e.strftime(a)) }).on("finish.countdown", function(e) { n != n && t.html(n), t.addClass("countdown-done") })
                })
            })
        }
    }, Globals.PLUGINS.themePluginCubePortfolio = function(t) {
        var e = t.find('[data-toggle="cbp"]');
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js", "cubeportfolio-jquery-plugin/cubeportfolio/js/jquery.cubeportfolio.js"], ["plugin-css/plugin-magnific-popup.min.css", "plugin-css/plugin-cube-portfolio.min.css", "cubeportfolio-jquery-plugin/cubeportfolio/css/cubeportfolio.css"], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("settings") || {},
                        a = $.extend({}, { layoutMode: "mosaic", sortToPreventGaps: !0, defaultFilter: "*", animationType: "slideDelay", gapHorizontal: 2, gapVertical: 2, gridAdjustment: "responsive", mediaQueries: [{ width: 1100, cols: 4 }, { width: 800, cols: 3 }, { width: 480, cols: 2 }, { width: 0, cols: 1 }], caption: "zoom", displayTypeSpeed: 100, lightboxDelegate: ".cbp-lightbox", lightboxGallery: !0, lightboxTitleSrc: "data-title", lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>', singlePageInlinePosition: "top", singlePageInlineInFocus: !0, singlePageAnimation: "fade" }, e);
                    a.singlePageInlineCallback = function(t, e) {
                        var a = this,
                            n = ($(a), $(e).data("content") || "ajax");
                        if ("ajax" !== n && $(n).length > 0) {
                            var o = $(n).clone(!0, !0);
                            o.themeRefresh(), a.content.html(""), a.content.append(o.contents()), a.cubeportfolio.$obj.trigger("updateSinglePageInlineStart.cbp"), a.singlePageInlineIsOpen.call(a)
                        } else "ajax" == n ? $.ajax({ url: t, type: "GET", dataType: "html", timeout: 3e4 }).done(function(t) {
                            var e = $(t);
                            e.themeRefresh(),
                                function(t, a) {
                                    var n = e.find("[data-cbp-close]") || null;
                                    null !== n && ($(a.wrap).addClass("has-custom-close"), $(a.closeButton).hide(), n.on("click", function() { a.close() }))
                                }(0, a), a.content.html(""), a.content.append(e), a.cubeportfolio.$obj.trigger("updateSinglePageInlineStart.cbp"), a.singlePageInlineIsOpen.call(a), $document.imagesLoaded && a.content.imagesLoaded(function() { a.content.find('[data-toggle="owl-carousel"]').on("translated.owl.carousel", function(t) { setTimeout(function() { a.resizeSinglePageInline() }, 200) }), setTimeout(function() { a.resizeSinglePageInline() }, 1e3) })
                        }).fail(function() { a.updateSinglePageInline("AJAX Error! Please refresh the page!") }) : a.updateSinglePageInline("Content Error! Please refresh the page!")
                    }, a.singlePageCallback = function(t, e) {
                        var a = this;
                        $.ajax({ url: t, type: "GET", dataType: "html", timeout: 3e4 }).done(function(t) {
                            var e = $(t);
                            e.themeRefresh();
                            var n;
                            a.content.addClass("cbp-popup-content").removeClass("cbp-popup-content-basic"), a.counter && (n = $(a.getCounterMarkup(a.options.singlePageCounter, a.current + 1, a.counterTotal)), a.counter.text(n.text())), a.fromAJAX = { html: e, scripts: void 0 }, a.finishOpen--, a.finishOpen <= 0 && (a.wrap.addClass("cbp-popup-ready"), a.wrap.removeClass("cbp-popup-loading"), a.content.html(""), a.content.append(e), a.checkForSocialLinks(a.content), a.cubeportfolio.$obj.trigger("updateSinglePageComplete.cbp"))
                        }).fail(function() { a.updateSinglePage("AJAX Error! Please refresh the page!") })
                    }, $document.imagesLoaded && t.imagesLoaded(function() { t.cubeportfolio(a) })
                })
            })
        }
    }, Globals.PLUGINS.themePluginDropdown = function(t) { t.find('[data-hover="dropdown"]').length > 0 && $document.themeLoadPlugin(["bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"], [], null, "append") }, Globals.PLUGINS.themePluginFakeLoader = function(t) {
        if (t.find("[data-toggle=page-loader]").length > 0) {
            $("html").addClass("has-page-loader");
            $document.themeLoadPlugin(["fakeLoader/fakeLoader.min.js"], ["fakeLoader/fakeLoader.css"], function() {
                var t = jQuery("[data-toggle=page-loader]"),
                    e = { zIndex: 9999999, spinner: t.data("spinner") || "spinner6", timeToHide: 1e3 };
                t.fakeLoader(e), $document.isPageLoaderDone(function() { $("html").removeClass("has-page-loader"), $(window).trigger("resize") })
            })
        }
    }, Globals.PLUGINS.themePluginFitVids = function(t) { if (t.find(["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"].join(",")).length > 0) { $document.themeLoadPlugin(["fitvidsjs/jquery.fitvids.js"], [], function() { $("body").fitVids({ ignore: ".no-fitvids" }) }) } }, Globals.PLUGINS.themePluginFixTo = function(t) {
        var e = t.find("[data-toggle=clingify], [data-toggle=sticky]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/fixto/0.5.0/fixto.js"], ["plugin-css/plugin-sticky-classes.min.css"], function() {
                var t = function(t, e) {
                    var a = t[0].getBoundingClientRect().top;
                    "" !== e.mind && $(e.mind).each(function(t, e) {
                        var n = $(e);
                        n.length > 0 && (a -= n.outerHeight())
                    }), "" !== t.data("fixto-instance") ? t.fixTo("setOptions", { top: a }) : t.attr("style", "top: auto;")
                };
                e.each(function(e) {
                    ! function(e, a) {
                        ! function(t) {
                            var e = t.data("settings") || {};
                            e.className = "is-sticky", e.useNativeSticky = !1, t.data("stickSettings", e)
                        }(e);
                        var n = e.data("stickSettings"),
                            o = n.parent || "body",
                            i = n.persist || !1,
                            s = (n.delay, n.breakpoint || !1),
                            l = e.find(".header") || !1,
                            d = $(window);
                        a = a || "init", e.addClass("sticky").fixTo(o, n), i && t(e, n), d.scroll(function() {
                            var t = $(window).scrollTop();
                            l && 0 === t && "" !== e.data("fixto-instance") && e.fixTo("refresh")
                        }), d.on("resize", function() { setTimeout(function() { s && ($(window).width() <= s ? (e.fixTo("destroy"), e.data("fixto-instance", "")) : "" === e.data("fixto-instance") && e.addClass("sticky").fixTo(o, e.data("stickSettings"))), i && t(e, n) }, 400) }), d.on("orientationchange", function() { l && "" !== e.data("fixto-instance") && setTimeout(function() { e.fixTo("refresh") }, 400) })
                    }($(this))
                })
            })
        }
    }, Globals.PLUGINS.themePluginFlexslider = function(t) {
        var e = t.find(".flexslider");
        if (e.length > 0) {
            $document.themeLoadPlugin(["flexslider/jquery.flexslider-min.js"], ["plugin-css/plugin-flexslider.min.css", "flexslider/flexslider.css"], function() {
                e.each(function() {
                    var t = { animation: jQuery(this).attr("data-transition"), selector: ".slides > .slide", controlNav: !0, smoothHeight: !0, start: function(t) { t.find("[data-animate-in]").each(function() { jQuery(this).css("visibility", "hidden") }), t.find(".slide-bg").each(function() { jQuery(this).css({ "background-image": "url(" + jQuery(this).data("bg-img") + ")" }), jQuery(this).css("visibility", "visible").addClass("animated").addClass(jQuery(this).data("animate-in")) }), t.find(".slide").eq(1).find("[data-animate-in]").each(function() { jQuery(this).css("visibility", "hidden"), jQuery(this).data("animate-delay") && jQuery(this).addClass(jQuery(this).data("animate-delay")), jQuery(this).data("animate-duration") && jQuery(this).addClass(jQuery(this).data("animate-duration")), jQuery(this).css("visibility", "visible").addClass("animated").addClass(jQuery(this).data("animate-in")), jQuery(this).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() { jQuery(this).removeClass(jQuery(this).data("animate-in")) }) }) }, before: function(t) { t.find(".slide-bg").each(function() { jQuery(this).removeClass(jQuery(this).data("animate-in")).removeClass("animated").css("visibility", "hidden") }), t.find(".slide").eq(t.animatingTo + 1).find("[data-animate-in]").each(function() { jQuery(this).css("visibility", "hidden") }) }, after: function(t) { t.find(".slide").find("[data-animate-in]").each(function() { jQuery(this).css("visibility", "hidden") }), t.find(".slide").eq(t.animatingTo + 1).find("[data-animate-in]").each(function() { jQuery(this).data("animate-delay") && jQuery(this).addClass(jQuery(this).data("animate-delay")), jQuery(this).data("animate-duration") && jQuery(this).addClass(jQuery(this).data("animate-duration")), jQuery(this).css("visibility", "visible").addClass("animated").addClass(jQuery(this).data("animate-in")), jQuery(this).one("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() { jQuery(this).removeClass(jQuery(this).data("animate-in")) }) }), $(window).trigger("resize") } },
                        e = jQuery(this).attr("data-slidernav");
                    "auto" !== e && (t = $.extend({}, t, { manualControls: e + " li a", controlsContainer: ".flexslider-wrapper" })), jQuery("html").addClass("has-flexslider"), jQuery(this).flexslider(t), jQuery(".flexslider").resize()
                })
            })
        }
    }, Globals.PLUGINS.themePluginHighlightJS = function(t) { if (t.find("code").length > 0) { $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"], ["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css", "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css"], function() { $("pre code").each(function(t, e) { hljs.highlightBlock(e) }) }) } }, Globals.PLUGINS.themePluginIsotope = function(t) {
        var e = t.find("[data-toggle=isotope-grid]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js", "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("isotope-options"),
                        a = t.data("isotope-filter") || null;
                    if ($document.imagesLoaded ? t.imagesLoaded(function() { t.isotope(e) }) : t.isotope(e), null !== a) {
                        var n = $(a);
                        n.on("click", function(e) {
                            e.preventDefault(), n.removeClass("active");
                            var a = $(this),
                                o = a.data("isotope-fid") || null;
                            return o && (a.addClass("active"), t.isotope({ filter: o })), !1
                        })
                    }
                    $("body").addClass("has-isotope")
                })
            })
        }
    }, Globals.PLUGINS.themePluginJpanelMenu = function(t) {
        var e = t.find("[data-toggle=jpanel-menu]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["jPanelMenu/jquery.jpanelmenu.min.js", "https://cdn.jsdelivr.net/jquery.smartresize/0.1/jquery.debouncedresize.js"], [], function() {
                var t = e,
                    a = "",
                    n = t.data("direction") || "right",
                    o = t.data("target"),
                    i = $(o),
                    s = $(window),
                    l = $("#header .is-sticky"),
                    d = $("html"),
                    r = i.find('[data-dismiss="jpanel-menu"]') || null;
                d.addClass("jpanel-menu-" + n);
                var c = jQuery.jPanelMenu({ menu: o, direction: n, trigger: "." + t.attr("class"), excludedPanelContent: ".jpanel-menu-exclude", openPosition: "280px", clone: !0, keepEventHandlers: !0, afterOpen: function() { t.addClass("open"), d.addClass("jpanel-menu-open"), s.trigger("resize") }, afterClose: function() { t.removeClass("open"), d.removeClass("jpanel-menu-open"), s.trigger("resize") }, beforeOpen: function() { l.length > 0 && (d.addClass("jpanel-menu-opening"), l.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() { d.removeClass("jpanel-menu-opening") })) } });
                s.on("debouncedresize", function() { var e = function(t) { return "block" === t.css("display") || "inline-block" === t.css("display") }(t);!0 === e && "on" !== a ? (c.on(), c.getMenu().themeRefresh(), a = "on", t.on("click.jpm", function() { return c.trigger(!0), !1 })) : !1 === e && "off" !== a && (c.off(), t.off("click.jpm"), a = "off") }), s.trigger("resize"), null !== r && r.on("click", function() { alert("kjhj"), c.close(!0) })
            })
        }
    }, Globals.PLUGINS.themePluginMagnificPopup = function(t) {
        var e = t.find('[data-toggle="magnific-popup"]');
        if (e.length > 0) {
            $document.themeLoadPlugin(["magnific-popup/dist/jquery.magnific-popup.min.js"], ["plugin-css/plugin-magnific-popup.min.css", "magnific-popup/dist/magnific-popup.css"], function() {
                var t = { disableOn: 0, key: null, midClick: !1, mainClass: "mfp-fade-zoom", preloader: !0, focus: "", closeOnContentClick: !1, closeOnBgClick: !0, closeBtnInside: !0, showCloseBtn: !0, enableEscapeKey: !0, modal: !1, alignTop: !1, removalDelay: 300, prependTo: null, fixedContentPos: "auto", fixedBgPos: "auto", overflowY: "auto", closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>', tClose: "Close (Esc)", tLoading: "Loading...", type: "image", image: { titleSrc: "data-title", verticalFit: !0 } };
                e.each(function() {
                    var e, a = {};
                    "" !== $(this).data("magnific-popup-settings") && (a = $(this).data("magnific-popup-settings")), e = jQuery.extend(t, a), $(this).magnificPopup(e), $(this).on("mfpOpen", function(t) {
                        $.magnificPopup.instance.next = function() {
                            var t = this;
                            t.wrap.removeClass("mfp-image-in"), setTimeout(function() { $.magnificPopup.proto.next.call(t) }, 120)
                        }, $.magnificPopup.instance.prev = function() {
                            var t = this;
                            t.wrap.removeClass("mfp-image-in"), setTimeout(function() { $.magnificPopup.proto.prev.call(t) }, 120)
                        }
                    }).on("mfpImageLoadComplete", function() {
                        var t = $.magnificPopup.instance;
                        setTimeout(function() { t.wrap.addClass("mfp-image-in") }, 10)
                    })
                })
            })
        }
    }, Globals.PLUGINS.themePluginNiceScroll = function(t) {
        var e = t.find('[data-toggle="scrollbar"]');
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("settings") || { emulatetouch: !0 };
                    t.niceScroll(e)
                })
            })
        }
    }, Globals.PLUGINS.themePluginOwlCarousel = function(t) {
        var e = t.find('[data-toggle="owl-carousel"]'),
            a = t.find("[data-owl-carousel-thumbs]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/owl.carousel.min.js"], ["plugin-css/plugin-owl-carousel.min.css", "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.2.1/assets/owl.carousel.min.css", "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"], function(t) {
                e.each(function() {
                    var t = $(this),
                        e = t.data("owl-carousel-settings") || null;
                    t.addClass("owl-carousel").owlCarousel(e)
                }), a.each(function() {
                    var t = $(this),
                        e = t.find(".owl-thumb"),
                        a = $(t.data("owl-carousel-thumbs")) || null,
                        n = "" !== t.data("toggle") && "owl-carousel" == t.data("toggle") || !1;
                    a && (t.find("owl-item").removeClass("active"), e.removeClass("active"), e.eq(0).addClass("active"), e.on("click", function(t) { a.trigger("to.owl.carousel", [$(this).parent().index(), 300, !0]) }), n && t.owlCarousel(), a.owlCarousel(), a.on("changed.owl.carousel", function(a) {
                        var o = a.item.index;
                        if (e.removeClass("active"), e.eq(o).addClass("active"), n && a.namespace && "position" === a.property.name) {
                            var i = a.relatedTarget.relative(a.property.value, !0);
                            t.owlCarousel("to", i, 300, !0)
                        }
                    }))
                })
            })
        }
    }, Globals.PLUGINS.themePluginSliderRevolution = function(t) {
        if ($sliderRevolutions = t.find("[data-toggle=slider-rev]"), $sliderRevolutions.length > 0) {
            var e = function() {
                0 === $sliderRevolutions.length && ($sliderRevolutions = t.find("[data-toggle=slider-rev]")), $sliderRevolutions.each(function() {
                    var t = $(this),
                        e = t.data("custom-init") || !1;
                    t.data("version", "5.4.4");
                    var a, n = t.find("li") || 0,
                        o = { extensions: "slider-revolution/revolution/js/extensions/", jsFileLocation: $document.getScriptLocation(), responsiveLevels: [1240, 1024, 778, 480], visibilityLevels: [1240, 1024, 778, 480], spinner: "spinner5", lazyType: "smart", navigation: { arrows: { enable: n.length > 1, style: "appstrap", tmp: "", rtl: !1, hide_onleave: !1, hide_onmobile: !0, hide_under: 481, hide_over: 9999, hide_delay: 200, hide_delay_mobile: 1200, left: { container: "slider", h_align: "left", v_align: "center", h_offset: 20, v_offset: 0 }, right: { container: "slider", h_align: "right", v_align: "center", h_offset: 20, v_offset: 0 } } } };
                    if (a = $.extend(o, t.data("settings")), e) t.addClass("custom-init").trigger("appstrap:sliderRev:customInit", [a]);
                    else {
                        t.hide();
                        var i = t.addClass("standard-init").show().revolution(a);
                        t.trigger("appstrap:sliderRev:standardInit", [a]), $(".modal").on("shown.bs.modal", function() { i && i.revpause() }).on("hidden.bs.modal", function(t) { i && i.revresume() })
                    }
                })
            };
            $document.themeLoadPlugin(["slider-revolution/revolution/js/jquery.themepunch.tools.min.js?v=5.4.4", "slider-revolution/revolution/js/source/jquery.themepunch.revolution.js?v=5.4.4"], ["plugin-css/plugin-slider-revolution.min.css", "slider-revolution/revolution/css/settings.css?v=5.4.4"], function() { $document.isPageLoaderDone(e) })
        }
    }, Globals.PLUGINS.themePluginTyped = function(t) {
        var e = t.find("[data-typed]");
        if (e.length > 0) {
            var a = function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("typed") || null,
                        a = t.data("typed-settings") || {},
                        n = a.delay || 0;
                    a.autoStart = !0, a.callback = function() { "" !== a.doneClass && $.each(a.doneClass, function(t, e) { $(t).addClass(e) }) }, "" !== e && ("object" == typeof e && (a.strings = e), t.waypoint(function() { setTimeout(function() { t.typeIt(a) }, n), this.destroy() }, { offset: "100%" }))
                })
            };
            $document.themeLoadPlugin(["https://cdn.jsdelivr.net/jquery.typeit/4.4.0/typeit.min.js"], [], function() { $document.includeWaypoints(function() { $document.isPageLoaderDone(a) }) })
        }
    }, Globals.PLUGINS.themePluginVide = function(t) {
        var e = t.find("[data-bg-video]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/vide/0.5.1/jquery.vide.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("bg-video") || null,
                        a = t.data("settings") || {};
                    a = jQuery.extend({ className: "bg-video-video" }, a), null !== e && t.addClass("bg-video").vide(e, a)
                })
            })
        }
    }, Globals.PLUGINS.themePluginZoom = function(t) {
        var e = t.find("[data-img-zoom]");
        if (e.length > 0) {
            $document.themeLoadPlugin(["https://cdnjs.cloudflare.com/ajax/libs/jquery-zoom/1.7.20/jquery.zoom.min.js"], [], function() {
                e.each(function() {
                    var t = $(this),
                        e = t.data("img-zoom"),
                        a = t.data("img-zoom-settings") || {};
                    a.url = e, t.addClass("d-block").zoom(a)
                })
            })
        }
    },
    function(t) {
        t.extend(t.fn, {
            themeInit: function(e) {
                var a = t(this);
                e = e || !1, "function" == typeof t.fn.themePreload && t.fn.themePreload(a, e), "function" == typeof t.fn.themeCustomScripts && a.themeCustomScripts(e), "function" == typeof t.fn.themePrePlugins && t.fn.themePrePlugins(a, e);
                var n = a.themePluginsLoad(e);
                t.each(n, function(t, n) { "function" == typeof n && n(a, e) }), "function" == typeof t.fn.themeLoaded && t.fn.themeLoaded(a, e)
            },
            themeRefresh: function() {
                var e = t(this);
                void 0 !== e.context && null !== e.context || (e.context = e), e.themeInit(!0), void 0 !== jQuery.fn.waypoint && Waypoint.refreshAll()
            },
            themePluginsLoad: function(e) {
                var a = t(this);
                void 0 !== a && null !== a || (a = t(document)), $document = t(document);
                var n = Globals.PLUGINS || {},
                    o = {},
                    i = {};
                return void 0 !== t.fn.themePlugins && (o = t.fn.themePlugins), void 0 !== t.fn.themePluginsExtras && (i = t.fn.themePluginsExtras), Globals.PLUGINS = t.extend(n, o, i), Globals.PLUGINS
            }
        })
    }(jQuery), $("html").addClass("js"), $(document).ready(function() {
        "use strict";
        $(document).themeInit()
    });